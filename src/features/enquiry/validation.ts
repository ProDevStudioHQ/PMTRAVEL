import "server-only";
import { z } from "zod";
import { ANNUAL_PAX, BUSINESS_TYPES, QUOTE_DESTINATIONS, SERVICE_LEVELS } from "./options";

const req = (label: string, max = 200) =>
  z.string().trim().min(2, `Enter ${label}.`).max(max, `Keep ${label} under ${max} characters.`);
const opt = (max = 500) => z.string().trim().max(max).optional().or(z.literal(""));
const email = z.string().trim().toLowerCase().email("Enter a valid email address, like name@agency.com.").max(320);
const phone = z
  .string()
  .trim()
  .max(40)
  .regex(/^[+()\d\s.-]*$/, "Use digits, spaces and + only.")
  .optional()
  .or(z.literal(""));

export const quoteSchema = z.object({
  agency: req("your agency name"),
  businessType: z.enum(BUSINESS_TYPES).optional().or(z.literal("")),
  contactName: req("a contact name"),
  email,
  whatsapp: phone,
  dateFrom: opt(20),
  dateTo: opt(20),
  pax: z.coerce.number({ message: "Enter the number of travellers." }).int().min(1, "Enter at least 1 traveller.").max(5000),
  serviceLevel: z.enum(SERVICE_LEVELS).optional().or(z.literal("")),
  destinations: z.array(z.enum(QUOTE_DESTINATIONS)).max(QUOTE_DESTINATIONS.length).default([]),
  budget: opt(100),
  notes: opt(4000),
  product: opt(200),
});

export const partnerSchema = z.object({
  company: req("your company name"),
  country: req("your country", 100),
  businessType: z.enum(BUSINESS_TYPES, { message: "Choose a type of business." }),
  website: opt(300),
  licence: opt(100),
  contactName: req("a contact name"),
  email,
  whatsapp: phone,
  markets: opt(300),
  annualPax: z.enum(ANNUAL_PAX).optional().or(z.literal("")),
  message: opt(4000),
});

export const contactSchema = z.object({
  name: req("your name"),
  company: opt(200),
  email,
  phone,
  subject: opt(200),
  message: z.string().trim().min(10, "Tell us a little more (10 characters or more).").max(4000),
});

export const newsletterSchema = z.object({
  email,
  company: opt(200),
});

export const SCHEMAS = { quote: quoteSchema, partner: partnerSchema, contact: contactSchema, newsletter: newsletterSchema } as const;
