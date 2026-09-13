import { z } from "zod";
import { DESTINATIONS, PROGRAMME_TYPES } from "./options";

/**
 * Server-side validation for the RFQ. The client form mirrors these rules for
 * usability only - nothing is trusted until it has been through here.
 */

/*
 * The option lists live in ./options, a module with no zod import, so the
 * client form can use them without shipping zod to the browser. Re-exported
 * here so server code that already imports them from this file is unchanged.
 */
export { DESTINATIONS, PROGRAMME_TYPES };

const trimmed = (min: number, max: number) =>
  z.string().trim().min(min).max(max);

/** Company and contact steps. Together these are the required set. */
export const step1Schema = z.object({
  company: trimmed(2, 200),
  country: trimmed(2, 100),
  city: z.string().trim().max(100).optional(),
  website: z.string().trim().max(300).optional(),
  contactName: trimmed(2, 200),
  role: trimmed(2, 120),
  email: z.string().trim().toLowerCase().email().max(320),
  travellers: z.coerce.number().int().min(1).max(10000),
  programmeType: z.enum(PROGRAMME_TYPES.map((p) => p.value)),
});

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
