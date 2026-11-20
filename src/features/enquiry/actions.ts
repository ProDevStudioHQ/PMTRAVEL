"use server";

import { cookies, headers } from "next/headers";
import { randomBytes } from "node:crypto";
import { getDb, isDatabaseConfigured } from "@/features/rfq/db";
import { enquiries } from "@/features/rfq/schema";
import { UNKNOWN_IP, clientIpFrom, hashIp, rateLimit } from "@/features/rfq/rate-limit";
import { COMPANY, SITE_URL } from "@/lib/company";
import { getSite } from "@/lib/cms";
import { UTM_COOKIE, isCrmLeadsConfigured, mapCrmFieldErrors, parseUtmCookie, sendLeadToCrm, toLeadInput } from "./crm";
import { SCHEMAS } from "./validation";
import { isEmailConfigured, sendAcknowledgement, sendEnquiryNotification } from "./email";
import type { EnquiryKind, EnquiryState } from "./options";

const PREFIX: Record<EnquiryKind, string> = { quote: "Q", partner: "P", contact: "C", newsletter: "N", pdf: "D" };

/** The local enquiries table predates PDF requests; they are stored as quotes, marked in their data. */
const STORED_KIND = { quote: "quote", partner: "partner", contact: "contact", newsletter: "newsletter", pdf: "quote" } as const;

function reference(kind: EnquiryKind) {
  const now = new Date();
  const yymm = `${String(now.getUTCFullYear()).slice(2)}${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const suffix = randomBytes(4).toString("base64url").replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 4).padEnd(4, "X");
  return `PM${PREFIX[kind]}-${yymm}-${suffix}`;
}

const SKIP = new Set(["kind", "website_url", "path", "consent", "cf-turnstile-response"]);

/** "Thank you — We reply within 24 hours", with the promise edited in the CRM settings. */
async function thankYou() {
  const promise = (await getSite()).settings.quoteReplyPromise.trim();
  return promise ? `Thank you — ${promise}` : "Thank you — we will be in touch shortly.";
}

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
  const visitorIp = clientIpFrom(requestHeaders);
  const ipHash = hashIp(visitorIp);

  const parsed = schema.safeParse(values);
  const consent = formData.get("consent") === "on";
  if (!parsed.success || !consent) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.success ? [] : parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    if (!consent) fieldErrors.consent = "Please accept the privacy policy to send this form.";
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values, attempt };
  }

  // Counted only once the form is valid, so correcting a mistake never uses up the allowance.
  if (visitorIp !== UNKNOWN_IP) {
    const limit = rateLimit(kind === "newsletter" ? "newsletter" : kind === "contact" ? "contact" : "rfq", ipHash);
    if (!limit.allowed) {
      const minutes = Math.max(1, Math.ceil(limit.retryAfterSeconds / 60));
      return {
        status: "error",
        message: `You have already sent several messages. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}, or email ${COMPANY.email.b2b} directly.`,
        values,
        attempt,
      };
    }
  }

  const data = parsed.data as Record<string, unknown>;
  const ref = reference(kind);

  // 0. The CRM is the system of record for leads (docs/api-contract.md 6.1).
  //    It verifies the captcha, rate-limits per hashed IP and notifies the team.
  //    If it cannot be reached, the local store-then-email path below takes the
  //    lead instead, so an outage never loses one.
  if (kind !== "newsletter" && isCrmLeadsConfigured()) {
    const captchaToken = String(formData.get("cf-turnstile-response") ?? "");
    if (process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY && !captchaToken) {
      return { status: "error", message: "Please complete the security check, then send again.", fieldErrors: { captcha: "Please complete the security check." }, values, attempt };
    }
    const lead = toLeadInput(kind, data, {
      pageUrl: `${SITE_URL}${sourcePath && sourcePath.startsWith("/") ? sourcePath : "/"}`,
      visitorIp: clientIpFrom(requestHeaders),
      captchaToken,
      utm: parseUtmCookie((await cookies()).get(UTM_COOKIE)?.value),
      reference: ref,
    });
    const result = lead ? await sendLeadToCrm(lead) : null;
    if (result?.status === "created") {
      console.info(`Enquiry ${ref}: sent to CRM as ${result.id}`);
      return { status: "success", reference: ref, attempt, message: await thankYou() };
    }
    if (result?.status === "invalid") {
      const fieldErrors = mapCrmFieldErrors(kind, result.fields);
      const message = fieldErrors.captcha ?? fieldErrors.form ?? "Please check the highlighted fields.";
      return { status: "error", message, fieldErrors, values, attempt };
    }
    if (result?.status === "rate_limited") {
      return {
        status: "error",
        message: `You have sent several requests in a few minutes. Please wait a little and try again, or email ${COMPANY.email.b2b}.`,
        values,
        attempt,
      };
    }
    if (result?.status === "failed") console.error(`Enquiry ${ref}: CRM unavailable (${result.reason}); using the local fallback`);
  }
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
          kind: STORED_KIND[kind],
          email: String(data.email),
          data: kind === "pdf" ? { ...data, request: "Programme PDF" } : data,
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

  return { status: "success", reference: ref, attempt, ...(kind === "newsletter" ? {} : { message: await thankYou() }) };
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
