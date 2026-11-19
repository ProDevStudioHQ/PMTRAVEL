/**
 * Website forms -> CRM leads (docs/api-contract.md 4.10 and 6.1).
 *
 * The mapping functions are pure so they can be unit-tested. sendLeadToCrm()
 * is called only from the enquiry Server Action, never from the browser: it
 * carries CRM_LEADS_KEY.
 */
import type { LeadClientType, LeadFormType, LeadInput } from "@/types/cms";
import type { EnquiryKind } from "./options";

export const isCrmLeadsConfigured = () => Boolean((process.env.CRM_API_URL ?? "").trim() && process.env.CRM_LEADS_KEY);

const FORM_TYPE: Partial<Record<EnquiryKind, LeadFormType>> = {
  quote: "B2B_QUOTE",
  partner: "PARTNER_REQUEST",
  contact: "CONTACT",
  pdf: "PDF_REQUEST",
};

/** Business types on the website form -> CRM client types. Others go into the message. */
const CLIENT_TYPE: Record<string, LeadClientType> = {
  "Travel agency": "TRAVEL_AGENCY",
  "Tour operator": "TOUR_OPERATOR",
  "Travel advisor": "TRAVEL_ADVISOR",
  "MICE / event agency": "MICE",
  Corporate: "CORPORATE",
};

/** Which website field each CRM field comes from, per form (used to place 422 errors). */
const FIELD_SOURCE: Record<string, Partial<Record<keyof LeadInput, string>>> = {
  quote: { name: "contactName", company: "agency", groupSize: "pax", travelDates: "dateFrom", message: "notes", clientType: "businessType" },
  partner: { name: "contactName", clientType: "businessType" },
  contact: { whatsapp: "phone" },
  pdf: {},
};

export type LeadContext = {
  pageUrl: string;
  visitorIp: string;
  captchaToken: string;
  utm?: LeadInput["utm"];
  reference: string;
};

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

function lines(entries: [string, unknown][]) {
  return entries
    .map(([label, value]) => {
      const text = Array.isArray(value) ? value.join(", ") : str(value);
      return text ? `${label}: ${text}` : null;
    })
    .filter((l): l is string => l !== null);
}

const clip = (text: string | undefined, max: number) => (text && text.length > max ? `${text.slice(0, max - 1)}…` : text);

/** One website enquiry as a CRM LeadInput, or null for forms the CRM does not take (newsletter). */
export function toLeadInput(kind: EnquiryKind, data: Record<string, unknown>, ctx: LeadContext): LeadInput | null {
  const formType = FORM_TYPE[kind];
  if (!formType) return null;
  const businessType = str(data.businessType);
  const clientType = businessType ? CLIENT_TYPE[businessType] : undefined;

  let name = str(data.name);
  let company = str(data.company);
  let whatsapp = str(data.whatsapp);
  let groupSize: number | undefined;
  let travelDates: string | undefined;
  let body: string | undefined;
  let extra: string[] = [];

  if (kind === "quote") {
    name = str(data.contactName);
    company = str(data.agency);
    const pax = Number(data.pax);
    groupSize = Number.isInteger(pax) && pax > 0 ? pax : undefined;
    const from = str(data.dateFrom);
    const to = str(data.dateTo);
    travelDates = from && to ? `${from} to ${to}` : from ? `From ${from}` : to ? `Until ${to}` : undefined;
    body = str(data.notes);
    extra = lines([
      ["Requested product", data.product],
      ["Service level", data.serviceLevel],
      ["Budget per person", data.budget],
      ["Destinations", data.destinations],
      ["Business type", clientType ? undefined : businessType],
    ]);
  } else if (kind === "partner") {
    name = str(data.contactName);
    body = str(data.message);
    extra = lines([
      ["Website", data.website],
      ["IATA / licence no.", data.licence],
      ["Source markets", data.markets],
      ["Annual pax to Morocco", data.annualPax],
      ["Business type", clientType ? undefined : businessType],
    ]);
  } else if (kind === "contact") {
    whatsapp = str(data.phone);
    const subject = str(data.subject);
    body = subject ? `Subject: ${subject}\n\n${str(data.message) ?? ""}` : str(data.message);
  } else if (kind === "pdf") {
    body = str(data.message);
    extra = lines([["Programme", data.product]]);
  }

  const message = [body, extra.length ? extra.join("\n") : undefined, `Website reference: ${ctx.reference}`].filter(Boolean).join("\n\n");

  return {
    formType,
    name: name ?? "",
    email: str(data.email) ?? "",
    ...(company ? { company: clip(company, 160) } : {}),
    ...(str(data.country) ? { country: clip(str(data.country), 80) } : {}),
    ...(whatsapp ? { whatsapp: clip(whatsapp, 40) } : {}),
    ...(clientType ? { clientType } : {}),
    ...(groupSize ? { groupSize } : {}),
    ...(travelDates ? { travelDates: clip(travelDates, 120) } : {}),
    message: clip(message, 3000),
    ...(str(data.programmeSlug) ? { programmeSlug: str(data.programmeSlug) } : {}),
    pageUrl: ctx.pageUrl,
    ...(ctx.utm && Object.values(ctx.utm).some(Boolean) ? { utm: ctx.utm } : {}),
    consent: true,
    captchaToken: ctx.captchaToken,
    visitorIp: ctx.visitorIp,
  };
}

/** CRM 422 field errors -> the website form's own field names. Unplaceable errors return under "form". */
export function mapCrmFieldErrors(kind: EnquiryKind, fields: Record<string, string>): Record<string, string> {
  const source = FIELD_SOURCE[kind] ?? {};
  const out: Record<string, string> = {};
  for (const [crmField, message] of Object.entries(fields)) {
    const key = crmField.split(".")[0] as keyof LeadInput;
    if (key === "captchaToken") {
      out.captcha = "The security check failed. Please try again.";
      continue;
    }
    if (key === "consent") {
      out.consent = "Please accept the privacy policy.";
      continue;
    }
    const target = source[key] ?? (["name", "email", "company", "country", "whatsapp", "message"].includes(key) ? key : undefined);
    if (target) out[target] ??= message;
    else out.form ??= message;
  }
  return out;
}

export type CrmLeadResult =
  | { status: "created"; id: string }
  | { status: "invalid"; message: string; fields: Record<string, string> }
  | { status: "rate_limited" }
  | { status: "failed"; reason: string };

/** POST /leads. Never throws. "failed" means the caller should use its local fallback. */
export async function sendLeadToCrm(input: LeadInput): Promise<CrmLeadResult> {
  const base = (process.env.CRM_API_URL ?? "").trim().replace(/\/+$/, "");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(`${base}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "x-api-key": process.env.CRM_LEADS_KEY ?? "" },
      body: JSON.stringify(input),
      cache: "no-store",
      signal: controller.signal,
    });
    const body = (await res.json().catch(() => ({}))) as { id?: string; error?: { message?: string; fields?: Record<string, string> } };
    if (res.status === 201) return { status: "created", id: String(body.id ?? "") };
    if (res.status === 422) return { status: "invalid", message: body.error?.message ?? "Please check the form", fields: body.error?.fields ?? {} };
    if (res.status === 429) return { status: "rate_limited" };
    return { status: "failed", reason: `CRM answered ${res.status}` };
  } catch (error) {
    return { status: "failed", reason: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

/** First-party UTM cookie written by src/proxy.ts. */
export const UTM_COOKIE = "pm_utm";

export function parseUtmCookie(raw: string | undefined): LeadInput["utm"] | undefined {
  if (!raw) return undefined;
  try {
    const v = JSON.parse(raw) as Record<string, unknown>;
    const pick = (k: string, max: number) => (typeof v[k] === "string" && v[k] ? (v[k] as string).slice(0, max) : undefined);
    const utm = { source: pick("source", 100), medium: pick("medium", 100), campaign: pick("campaign", 150) };
    return utm.source || utm.medium || utm.campaign ? utm : undefined;
  } catch {
    return undefined;
  }
}
