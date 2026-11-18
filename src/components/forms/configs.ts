import type { FieldConfig } from "@/components/forms/fields";
import { ANNUAL_PAX, BUSINESS_TYPES, QUOTE_DESTINATIONS, SERVICE_LEVELS } from "@/features/enquiry/options";

/** Request a Quote: the fields from the brief. Sent to b2b@pm-travelagency.com. */
export const QUOTE_FIELDS: FieldConfig[] = [
  { name: "agency", label: "Agency name", type: "text", required: true, autoComplete: "organization" },
  { name: "businessType", label: "Type of business", type: "select", options: BUSINESS_TYPES },
  { name: "contactName", label: "Contact name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "whatsapp", label: "WhatsApp", type: "tel", autoComplete: "tel", hint: "With country code, e.g. +33 6 12 34 56 78" },
  { name: "pax", label: "Number of travellers (pax)", type: "number", required: true, min: 1 },
  { name: "dateFrom", label: "Travel dates: from", type: "date" },
  { name: "dateTo", label: "Travel dates: to", type: "date" },
  { name: "serviceLevel", label: "Service level", type: "select", options: SERVICE_LEVELS },
  { name: "budget", label: "Budget per person", type: "text", hint: "A range is fine, e.g. €1,500–2,000 land only" },
  { name: "destinations", label: "Destinations", type: "checkboxes", options: QUOTE_DESTINATIONS },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    placeholder: "Client profile, must-dos, flights, rooming, white-label requirements…",
    rows: 5,
  },
];

/** Short version for B2B and product pages. */
export const QUICK_QUOTE_FIELDS: FieldConfig[] = [
  { name: "agency", label: "Agency name", type: "text", required: true, autoComplete: "organization" },
  { name: "contactName", label: "Contact name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "whatsapp", label: "WhatsApp", type: "tel", autoComplete: "tel" },
  { name: "pax", label: "Pax", type: "number", required: true, min: 1 },
  { name: "dateFrom", label: "Travel from", type: "date" },
  { name: "notes", label: "Your brief", type: "textarea", rows: 4, placeholder: "Dates, destinations, service level, budget per person…" },
];

export const PARTNER_FIELDS: FieldConfig[] = [
  { name: "company", label: "Company name", type: "text", required: true, autoComplete: "organization" },
  { name: "country", label: "Country", type: "text", required: true, autoComplete: "country-name" },
  { name: "businessType", label: "Type of business", type: "select", required: true, options: BUSINESS_TYPES },
  { name: "website", label: "Website", type: "url", autoComplete: "url", placeholder: "https://" },
  { name: "licence", label: "IATA / licence no.", type: "text", hint: "Optional" },
  { name: "contactName", label: "Contact name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "whatsapp", label: "Phone / WhatsApp", type: "tel", autoComplete: "tel" },
  { name: "markets", label: "Source markets", type: "text", hint: "e.g. UK, Italy, USA" },
  { name: "annualPax", label: "Annual pax estimate to Morocco", type: "select", options: ANNUAL_PAX },
  { name: "message", label: "Message", type: "textarea", rows: 4, placeholder: "Tell us about your clients and what you sell." },
];

export const CONTACT_FIELDS: FieldConfig[] = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", autoComplete: "tel" },
  { name: "subject", label: "Subject", type: "text", wide: true },
  { name: "message", label: "Message", type: "textarea", required: true, rows: 5 },
];

export const NEWSLETTER_FIELDS: FieldConfig[] = [
  { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization" },
];
