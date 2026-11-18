import "server-only";
import nodemailer from "nodemailer";
import { COMPANY } from "@/lib/company";
import type { EnquiryKind } from "./options";

type Transport = ReturnType<typeof nodemailer.createTransport>;
let transport: Transport | undefined;

export const isEmailConfigured = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);

function getTransport(): Transport {
  if (!isEmailConfigured()) throw new Error("SMTP is not configured");
  const port = Number(process.env.SMTP_PORT ?? 587);
  transport ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASSWORD! },
  });
  return transport;
}

const from = () => process.env.SMTP_FROM ?? `${COMPANY.name} <${COMPANY.email.general}>`;

const SUBJECTS: Record<EnquiryKind, string> = {
  quote: "B2B quote request",
  partner: "Partner application",
  contact: "Contact message",
  newsletter: "Trade newsletter sign-up",
};

const LABELS: Record<string, string> = {
  agency: "Agency",
  company: "Company",
  businessType: "Business type",
  contactName: "Contact",
  name: "Name",
  email: "Email",
  whatsapp: "WhatsApp / phone",
  phone: "Phone",
  dateFrom: "Travel from",
  dateTo: "Travel to",
  pax: "Pax",
  serviceLevel: "Service level",
  destinations: "Destinations",
  budget: "Budget per person",
  notes: "Notes",
  product: "Requested product",
  country: "Country",
  website: "Website",
  licence: "IATA / licence no.",
  markets: "Markets",
  annualPax: "Annual pax estimate",
  message: "Message",
  subject: "Subject",
};

function format(data: Record<string, unknown>) {
  return Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => `${LABELS[k] ?? k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
    .join("\n");
}

export async function sendEnquiryNotification(kind: EnquiryKind, reference: string, data: Record<string, unknown>, sourcePath?: string) {
  const to =
    kind === "contact" ? (process.env.CONTACT_EMAIL ?? COMPANY.email.general) : (process.env.B2B_EMAIL ?? COMPANY.email.b2b);
  const who = String(data.agency ?? data.company ?? data.name ?? data.email ?? "");
  await getTransport().sendMail({
    from: from(),
    to,
    replyTo: String(data.email),
    subject: `${SUBJECTS[kind]} ${reference}${who ? ` – ${who}` : ""}`,
    text: `Reference: ${reference}\nSent from: ${sourcePath ?? "website"}\n\n${format(data)}`,
  });
}

export async function sendAcknowledgement(kind: EnquiryKind, reference: string, data: Record<string, unknown>) {
  if (kind === "newsletter") return;
  const name = String(data.contactName ?? data.name ?? "");
  const text = [
    name ? `Dear ${name},` : "Hello,",
    "",
    `Thank you, we have received your ${SUBJECTS[kind].toLowerCase()}. Your reference is ${reference}.`,
    "",
    kind === "quote"
      ? "Our operations team will review your brief and come back with a costed proposal, within 24 hours for standard requests."
      : "A member of our team will reply shortly.",
    "",
    `For anything urgent, WhatsApp our ops desk on ${COMPANY.phone.mobile.display}.`,
    "",
    COMPANY.name,
    COMPANY.parent,
    `${COMPANY.address.line1}, ${COMPANY.address.street}, ${COMPANY.address.city}`,
  ].join("\n");
  await getTransport().sendMail({
    from: from(),
    to: String(data.email),
    replyTo: process.env.B2B_EMAIL ?? COMPANY.email.b2b,
    subject: `We received your request (${reference})`,
    text,
  });
}
