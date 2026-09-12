import { z } from "zod";

/**
 * Server-side validation for the RFQ. The client form mirrors these rules for
 * usability only - nothing is trusted until it has been through here.
 */

export const DESTINATIONS = [
  "Marrakech",
  "Agafay",
  "Atlas",
  "Essaouira",
  "Merzouga",
  "Fes",
  "Ouarzazate",
  "Casablanca",
  "Rabat",
  "Tangier",
  "Chefchaouen",
  "Agadir",
  "Other",
] as const;

export const PROGRAMME_TYPES = [
  { value: "leisure_group", label: "Leisure group" },
  { value: "leisure_fit", label: "Leisure FIT" },
  { value: "incentive", label: "Incentive" },
  { value: "conference_event", label: "Conference or event" },
  { value: "educational", label: "Educational" },
  { value: "special_interest", label: "Special interest" },
  { value: "other", label: "Other" },
] as const;

const trimmed = (min: number, max: number) =>
  z.string().trim().min(min).max(max);

/** Step 1. This alone must be submittable. */
export const step1Schema = z
  .object({
    company: trimmed(2, 200),
    country: trimmed(2, 100),
    contactName: trimmed(2, 200),
    role: trimmed(2, 120),
    email: z.string().trim().toLowerCase().email().max(320),
    destinations: z
      .array(z.enum(DESTINATIONS))
      .min(1, "Choose at least one destination"),
    datesFlexible: z.boolean(),
    dateFrom: z.string().date().optional().or(z.literal("")),
    dateTo: z.string().date().optional().or(z.literal("")),
    travellers: z.coerce.number().int().min(1).max(10000),
    programmeType: z.enum(PROGRAMME_TYPES.map((p) => p.value)),
    brief: trimmed(20, 5000),
  })
  .refine(
    (value) => value.datesFlexible || (value.dateFrom && value.dateTo),
    {
      message: "Give travel dates, or mark the dates as flexible",
      path: ["dateFrom"],
    }
  )
  .refine(
    (value) =>
      !value.dateFrom || !value.dateTo || value.dateFrom <= value.dateTo,
    { message: "The end date is before the start date", path: ["dateTo"] }
  );

/** Step 2. Entirely optional. */
export const step2Schema = z.object({
  rooms: z.coerce.number().int().min(0).max(5000).optional(),
  nights: z.coerce.number().int().min(0).max(365).optional(),
  hotelCategory: z.string().trim().max(120).optional(),
  transport: z.string().trim().max(500).optional(),
  guideLanguage: z.string().trim().max(200).optional(),
  meals: z.string().trim().max(500).optional(),
  activities: z.string().trim().max(1000).optional(),
  budgetRange: z.string().trim().max(200).optional(),
  quoteDeadline: z.string().date().optional().or(z.literal("")),
});

/** Step 3. Entirely optional. */
export const step3Schema = z.object({
  accessibilityNeeds: z.string().trim().max(2000).optional(),
  specialRequirements: z.string().trim().max(2000).optional(),
  previousMorocco: z.string().trim().max(500).optional(),
  foundUs: z.string().trim().max(200).optional(),
});

/**
 * The honeypot. A real browser leaves it empty; most bots fill it in.
 * Named plausibly on purpose - "honeypot" is itself a tell.
 */
export const honeypotSchema = z.object({
  companyWebsite: z.literal("", {
    message: "Rejected",
  }),
});

export const rfqSubmissionSchema = z.object({
  ...step2Schema.shape,
  ...step3Schema.shape,
});

export type Step1Input = z.infer<typeof step1Schema>;
export type Step2Input = z.infer<typeof step2Schema>;
export type Step3Input = z.infer<typeof step3Schema>;

export type FieldErrors = Record<string, string[]>;

export type RfqFormState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: FieldErrors }
  | { status: "success"; reference: string };
