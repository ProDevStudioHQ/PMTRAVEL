"use server";

import { headers } from "next/headers";
import { randomBytes } from "node:crypto";
import { getDb, isDatabaseConfigured } from "@/features/rfq/db";
import {
  rfqRequests,
  rfqStatusEvents,
  rfqAttachments,
} from "@/features/rfq/schema";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  honeypotSchema,
  type FieldErrors,
  type RfqFormState,
} from "@/features/rfq/validation";
import { checkUpload, MAX_FILES } from "@/features/rfq/files";
import {
  buildStorageKey,
  isStorageConfigured,
  putAttachment,
} from "@/features/rfq/storage";
import {
  isEmailConfigured,
  sendAcknowledgement,
  sendInternalNotification,
} from "@/features/rfq/email";
import { clientIpFrom, hashIp, rateLimit } from "@/features/rfq/rate-limit";

/** e.g. PM-2609-7QF3. Short enough to quote on the phone, once we have one. */
function buildReference(): string {
  const now = new Date();
  const yy = String(now.getUTCFullYear()).slice(2);
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const suffix = randomBytes(3)
    .toString("base64url")
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .slice(0, 4)
    .padEnd(4, "X");
  return `PM-${yy}${mm}-${suffix}`;
}

function flatten(error: {
  issues: { path: PropertyKey[]; message: string }[];
}): FieldErrors {
  const fieldErrors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    (fieldErrors[key] ??= []).push(issue.message);
  }
  return fieldErrors;
}

const text = (data: FormData, key: string) => {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
};

export async function submitRfq(
  _previous: RfqFormState,
  formData: FormData
): Promise<RfqFormState> {
  // 1. Honeypot. Answered the same way as a success so a bot learns nothing,
  //    but nothing is stored and nothing is sent.
  const honeypot = honeypotSchema.safeParse({
    companyWebsite: text(formData, "companyWebsite"),
  });
  if (!honeypot.success) {
    return { status: "success", reference: buildReference() };
  }

  // 2. Rate limit: 5 per hour per IP.
  const requestHeaders = await headers();
  const ip = clientIpFrom(requestHeaders);
  const ipHash = hashIp(ip);
  const limit = rateLimit("rfq", ipHash);
  if (!limit.allowed) {
    const minutes = Math.ceil(limit.retryAfterSeconds / 60);
    return {
      status: "error",
      message: `Too many requests from this connection. Try again in ${minutes} minutes, or email us directly.`,
    };
  }

  // 3. Validate. Step 1 alone is a valid submission.
  const step1 = step1Schema.safeParse({
    company: text(formData, "company"),
    country: text(formData, "country"),
    contactName: text(formData, "contactName"),
    role: text(formData, "role"),
    email: text(formData, "email"),
    destinations: formData.getAll("destinations").filter((v) => typeof v === "string"),
    datesFlexible: text(formData, "datesFlexible") === "on",
    dateFrom: text(formData, "dateFrom"),
    dateTo: text(formData, "dateTo"),
    travellers: text(formData, "travellers"),
    programmeType: text(formData, "programmeType"),
    brief: text(formData, "brief"),
  });

  if (!step1.success) {
    return {
      status: "error",
      message: "Some required details are missing or not valid.",
      fieldErrors: flatten(step1.error),
    };
  }

  const step2 = step2Schema.safeParse({
    rooms: text(formData, "rooms") || undefined,
    nights: text(formData, "nights") || undefined,
    hotelCategory: text(formData, "hotelCategory") || undefined,
    transport: text(formData, "transport") || undefined,
    guideLanguage: text(formData, "guideLanguage") || undefined,
    meals: text(formData, "meals") || undefined,
    activities: text(formData, "activities") || undefined,
    budgetRange: text(formData, "budgetRange") || undefined,
    quoteDeadline: text(formData, "quoteDeadline") || undefined,
  });

  const step3 = step3Schema.safeParse({
    accessibilityNeeds: text(formData, "accessibilityNeeds") || undefined,
    specialRequirements: text(formData, "specialRequirements") || undefined,
    previousMorocco: text(formData, "previousMorocco") || undefined,
    foundUs: text(formData, "foundUs") || undefined,
  });

  if (!step2.success || !step3.success) {
    return {
      status: "error",
      message: "Some optional details are not valid.",
      fieldErrors: {
        ...(step2.success ? {} : flatten(step2.error)),
        ...(step3.success ? {} : flatten(step3.error)),
      },
    };
  }

  // 4. Validate uploads by magic bytes before anything is stored.
  const uploads = formData
    .getAll("attachments")
    .filter((value): value is File => value instanceof File && value.size > 0)
    .slice(0, MAX_FILES);

  const accepted: { filename: string; contentType: string; bytes: Uint8Array }[] = [];
  for (const upload of uploads) {
    const check = await checkUpload(upload);
    if (!check.ok) {
      return {
        status: "error",
        message: check.reason,
        fieldErrors: { attachments: [check.reason] },
      };
    }
    accepted.push({
      filename: check.filename,
      contentType: check.contentType,
      bytes: new Uint8Array(await upload.arrayBuffer()),
    });
  }

  if (!isDatabaseConfigured()) {
    // Fail loudly rather than silently dropping a commercial enquiry.
    console.error("RFQ submission refused: DATABASE_URL is not configured");
    return {
      status: "error",
      message:
        "We could not record your request. Please email it to us directly and it will enter the same workflow.",
    };
  }

  const reference = buildReference();
  const datesFlexible = step1.data.datesFlexible;

  try {
    const db = getDb();

    const inserted = await db
      .insert(rfqRequests)
      .values({
        reference,
        company: step1.data.company,
        country: step1.data.country,
        contactName: step1.data.contactName,
        role: step1.data.role,
        email: step1.data.email,
        destinations: step1.data.destinations,
        dateFrom: datesFlexible ? null : step1.data.dateFrom || null,
        dateTo: datesFlexible ? null : step1.data.dateTo || null,
        datesFlexible: String(datesFlexible),
        travellers: step1.data.travellers,
        programmeType: step1.data.programmeType,
        brief: step1.data.brief,
        optionalDetail: { ...step2.data, ...step3.data },
        sourceIpHash: ipHash,
        userAgent: requestHeaders.get("user-agent")?.slice(0, 500) ?? null,
      })
      .returning({ id: rfqRequests.id });

    const requestId = inserted[0]?.id;
    if (!requestId) throw new Error("Insert returned no id");

    // The first status event. Every later change records timestamp, actor,
    // previous status and new status - this is the response-time measurement.
    await db.insert(rfqStatusEvents).values({
      requestId,
      previousStatus: null,
      newStatus: "received",
      actor: "system",
      note: "Submitted through the website form",
    });

    if (accepted.length > 0) {
      if (!isStorageConfigured()) {
        console.error(
          `RFQ ${reference}: ${accepted.length} attachment(s) could not be stored, S3 is not configured`
        );
      } else {
        for (const file of accepted) {
          const key = buildStorageKey(reference, file.filename);
          await putAttachment(key, file.bytes, file.contentType);
          await db.insert(rfqAttachments).values({
            requestId,
            filename: file.filename,
            contentType: file.contentType,
            byteSize: file.bytes.byteLength,
            storageKey: key,
          });
        }
      }
    }
  } catch (error) {
    console.error("RFQ submission failed", error);
    return {
      status: "error",
      message:
        "Something went wrong recording your request. Please email it to us directly.",
    };
  }

  // 5. Email. A failure here must not lose a request that is already stored.
  if (isEmailConfigured()) {
    try {
      await sendInternalNotification({
        reference,
        company: step1.data.company,
        country: step1.data.country,
        contactName: step1.data.contactName,
        role: step1.data.role,
        email: step1.data.email,
        destinations: step1.data.destinations,
        dates: datesFlexible
          ? "Flexible"
          : `${step1.data.dateFrom} to ${step1.data.dateTo}`,
        travellers: step1.data.travellers,
        programmeType: step1.data.programmeType,
        brief: step1.data.brief,
        attachmentCount: accepted.length,
      });
      await sendAcknowledgement({
        reference,
        contactName: step1.data.contactName,
        email: step1.data.email,
      });
    } catch (error) {
      console.error(`RFQ ${reference}: stored but email failed`, error);
    }
  } else {
    console.warn(`RFQ ${reference}: stored, but SMTP is not configured`);
  }

  return { status: "success", reference };
}
