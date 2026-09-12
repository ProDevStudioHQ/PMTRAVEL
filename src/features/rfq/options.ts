/**
 * The RFQ's option lists, in a module with no zod import.
 *
 * The client form needs these lists; the schema in ./validation needs them
 * too. Kept here, the form can import them without pulling zod into the
 * browser bundle. Zod probes for eval support when it loads, which the CSP
 * blocks and Chrome reports as a Content Security Policy issue.
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
