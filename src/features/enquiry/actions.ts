"use server";

import { headers } from "next/headers";
import { randomBytes } from "node:crypto";
import { getDb, isDatabaseConfigured } from "@/features/rfq/db";
import { enquiries } from "@/features/rfq/schema";
import { clientIpFrom, hashIp, rateLimit } from "@/features/rfq/rate-limit";
import { COMPANY } from "@/lib/company";
import { SCHEMAS } from "./validation";
import { isEmailConfigured, sendAcknowledgement, sendEnquiryNotification } from "./email";
import type { EnquiryKind, EnquiryState } from "./options";

const PREFIX: Record<EnquiryKind, string> = { quote: "Q", partner: "P", contact: "C", newsletter: "N" };

function reference(kind: EnquiryKind) {
  const now = new Date();
  const yymm = `${String(now.getUTCFullYear()).slice(2)}${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const suffix = randomBytes(4).toString("base64url").replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 4).padEnd(4, "X");
  return `PM${PREFIX[kind]}-${yymm}-${suffix}`;
}

const SKIP = new Set(["kind", "website_url", "path"]);

/** FormData to a plain object; the destinations checkbox group becomes an array. */
function toObject(formData: FormData) {
  const out: Record<string, string | string[]> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string" || key.startsWith("$") || SKIP.has(key)) continue;
    if (key === "destinations") {
      const list = Array.isArray(out[key]) ? (out[key] as string[]) : [];
      out[key] = [...list, value];
    } else {
      out[key] = value;
    }
  }
  return out;
}

const previousAttempt = (state: EnquiryState) => ("attempt" in state ? state.attempt : 0);

export async function submitEnquiry(previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const attempt = previousAttempt(previous) + 1;
  const kind = String(formData.get("kind")) as EnquiryKind;
  const schema = SCHEMAS[kind as keyof typeof SCHEMAS];
  if (!schema) return { status: "error", message: "Unknown form.", attempt };

  const values = toObject(formData);
  const sourcePath = String(formData.get("path") ?? "").slice(0, 300) || undefined;

  // Honeypot: answered like a success so bots learn nothing. Nothing is stored or sent.
  if (String(formData.get("website_url") ?? "") !== "") {
    return { status: "success", reference: reference(kind), attempt };
  }

  const requestHeaders = await headers();
  const ipHash = hashIp(clientIpFrom(requestHeaders));
  const limit = rateLimit(kind === "quote" || kind === "partner" ? "rfq" : "contact", ipHash);
  if (!limit.allowed) {
    return {
      status: "error",
      message: `Too many submissions from this connection. Please try again later, or email ${COMPANY.email.b2b}.`,
      values,
      attempt,
    };
  }

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values, attempt };
  }

  const data = parsed.data as Record<string, unknown>;
  const ref = reference(kind);
  const canStore = isDatabaseConfigured();
  const canEmail = isEmailConfigured();

  if (!canStore && !canEmail) {
    // Fail loudly rather than silently dropping a commercial enquiry.
    console.error(`Enquiry refused (${kind}): neither DATABASE_URL nor SMTP is configured`);
    return {
      status: "error",
      message: `We couldn't send your message right now. Please email ${COMPANY.email.b2b} or WhatsApp ${COMPANY.phone.mobile.display} and we'll pick it up straight away.`,
      values,
      attempt,
    };
  }

  // 1. Store first, so a mail failure can never lose an enquiry.
  let stored = false;
  if (canStore) {
    try {
      await getDb()
        .insert(enquiries)
        .values({
          reference: ref,
          kind,
          email: String(data.email),
          data,
          sourcePath,
          sourceIpHash: ipHash,
          userAgent: requestHeaders.get("user-agent")?.slice(0, 500) ?? null,
        });
      stored = true;
    } catch (error) {
      console.error(`Enquiry ${ref}: store failed`, error);
    }
  }

  // 2. Notify the team, then acknowledge the sender.
  let notified = false;
  if (canEmail) {
    try {
      await sendEnquiryNotification(kind, ref, data, sourcePath);
      notified = true;
    } catch (error) {
      console.error(`Enquiry ${ref}: notification failed`, error);
    }
    if (notified || stored) {
      try {
        await sendAcknowledgement(kind, ref, data);
      } catch (error) {
        console.error(`Enquiry ${ref}: acknowledgement failed`, error);
      }
    }
  }

  if (!stored && !notified) {
    return { status: "error", message: `Something went wrong. Please email ${COMPANY.email.b2b}.`, values, attempt };
  }

  return { status: "success", reference: ref, attempt };
}

/**
 * Partner Login. The partner portal backend is not built yet, so this never
 * pretends to authenticate: it tells the partner where to get what they need.
 */
export async function partnerLogin(previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const attempt = previousAttempt(previous) + 1;
  const requestHeaders = await headers();
  const limit = rateLimit("auth", hashIp(clientIpFrom(requestHeaders)));
  const values = { email: String(formData.get("email") ?? "") };
  if (!limit.allowed) return { status: "error", message: "Too many attempts. Please try again later.", values, attempt };
  return {
    status: "error",
    message: `The online partner portal is opening soon. Until then, your rates, files and documents come from your ops contact or ${COMPANY.email.b2b}.`,
    values,
    attempt,
  };
}
