import "server-only";
import nodemailer from "nodemailer";
import { COMPANY } from "@/lib/nav";

/**
 * Two emails leave on submission: an internal notification and an
 * acknowledgement to the sender.
 *
 * The acknowledgement must NOT promise a response time. We have no measured
 * data yet. Build the measurement first, publish the number later.
 */

type Transport = ReturnType<typeof nodemailer.createTransport>;
let transport: Transport | undefined;

export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);
}

function getTransport(): Transport {
  if (!isEmailConfigured()) throw new Error("SMTP is not configured");
  transport ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASSWORD!,
    },
  });
  return transport;
}

const from = () =>
  process.env.SMTP_FROM ?? `${COMPANY.name} <${COMPANY.email.general}>`;

export type NotificationInput = {
  reference: string;
  company: string;
  country: string;
  contactName: string;
  role: string;
  email: string;
  destinations: string[];
  dates: string;
  travellers: number;
  programmeType: string;
  brief: string;
  attachmentCount: number;
};

export async function sendInternalNotification(input: NotificationInput) {
  const to = process.env.B2B_EMAIL ?? COMPANY.email.b2b;
  const lines = [
    `Reference: ${input.reference}`,
    `Company: ${input.company} (${input.country})`,
    `Contact: ${input.contactName}, ${input.role}`,
    `Email: ${input.email}`,
    `Destinations: ${input.destinations.join(", ")}`,
    `Dates: ${input.dates}`,
    `Travellers: ${input.travellers}`,
    `Programme: ${input.programmeType}`,
    `Attachments: ${input.attachmentCount}`,
    "",
    "Brief:",
    input.brief,
  ];

  await getTransport().sendMail({
    from: from(),
    to,
    replyTo: input.email,
    subject: `RFQ ${input.reference} - ${input.company} (${input.country})`,
    text: lines.join("\n"),
  });
}

export async function sendAcknowledgement(input: {
  reference: string;
  contactName: string;
  email: string;
}) {
  const text = [
    `Dear ${input.contactName},`,
    "",
    `We have your requirement. Its reference is ${input.reference}; please quote it on anything you send us about this request.`,
    "",
    "What happens next:",
    "",
    "1. We qualify the brief - dates, group profile, destinations, and what would make the programme fail.",
    "2. We match it against suppliers and venues we have verified ourselves.",
    "3. We cost it, and every line states whether the service is requested, on option, held or confirmed. Nothing unconfirmed will be presented to you as confirmed.",
    "",
    "If anything in the brief changes in the meantime, reply to this message and it will reach the same file.",
    "",
    `${COMPANY.name}`,
    `${COMPANY.brandLine}`,
    `${COMPANY.address.district}, ${COMPANY.address.city}`,
  ].join("\n");

  await getTransport().sendMail({
    from: from(),
    to: input.email,
    replyTo: process.env.B2B_EMAIL ?? COMPANY.email.b2b,
    subject: `Your requirement, reference ${input.reference}`,
    text,
  });
}
