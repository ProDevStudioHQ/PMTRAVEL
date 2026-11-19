/**
 * Option lists and form state types, with no zod import, so Client form
 * components can use them without shipping zod (which the CSP-blocked eval
 * probe would also flag) to the browser.
 */
export const BUSINESS_TYPES = [
  "Travel agency",
  "Tour operator",
  "Travel advisor",
  "MICE / event agency",
  "Group organiser",
  "Corporate",
  "Online travel company",
  "Other",
] as const;

export const SERVICE_LEVELS = ["Boutique riads", "4-star", "5-star", "Luxury / palace", "Mixed", "Not sure yet"] as const;

export const QUOTE_DESTINATIONS = [
  "Marrakech",
  "Agafay",
  "Atlas Mountains",
  "Sahara / Merzouga",
  "Ouarzazate",
  "Fes",
  "Essaouira",
  "Chefchaouen",
  "Casablanca",
  "Rabat",
  "Tangier",
  "Other",
] as const;

export const ANNUAL_PAX = ["Under 50", "50–200", "200–500", "500–1,000", "1,000+", "Not sure yet"] as const;

/** "pdf": a programme PDF request (programme pages, PDF access "on request"). */
export type EnquiryKind = "quote" | "partner" | "contact" | "newsletter" | "pdf";

export type EnquiryState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string>; values?: Record<string, string | string[]>; attempt: number }
  | { status: "success"; reference: string; attempt: number };

export const initialEnquiryState: EnquiryState = { status: "idle" };
