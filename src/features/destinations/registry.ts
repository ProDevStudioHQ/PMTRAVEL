/**
 * The destinations that have a published page.
 *
 * A destination is added here only when its page exists and carries genuine
 * operational content - 400+ words, a distinct buyer intent, and a route to
 * the RFQ. This list drives the hub page and the sitemap, so adding a slug
 * without writing the page produces a broken link rather than a thin one.
 *
 * "Imperial Cities" and "Sahara" are itinerary groupings, not destinations.
 * They do not get records here.
 */
export type DestinationEntry = {
  slug: string;
  name: string;
  /** One line for the hub page. Operational, not promotional. */
  summary: string;
  /** The route slug for the leg from Marrakech, where there is one. */
  routeSlug?: string;
};

export const DESTINATIONS: DestinationEntry[] = [
  {
    slug: "marrakech",
    name: "Marrakech",
    summary:
      "Our base, and the arrival point for most programmes. Riad access and medina logistics decide more than the hotel choice does.",
  },
  {
    slug: "agafay",
    name: "Agafay",
    summary:
      "Close enough to Marrakech to work as an evening. Wind, transfer waves and the wet-weather plan decide whether it does.",
    routeSlug: "marrakech-agafay",
  },
  {
    slug: "atlas",
    name: "Atlas Mountains",
    summary:
      "A day trip or a crossing, and the two are entirely different operations. Passes, vehicle class and winter closures govern both.",
  },
  {
    slug: "essaouira",
    name: "Essaouira",
    summary:
      "The most common single day out of Marrakech. Coach parking and medina access are the constraints, not the driving.",
    routeSlug: "marrakech-essaouira",
  },
  {
    slug: "merzouga",
    name: "Merzouga",
    summary:
      "The longest standard leg we run. Whether it should be two days or three is the question an operator actually needs answered.",
    routeSlug: "marrakech-merzouga",
  },
  {
    slug: "fes",
    name: "Fes",
    summary:
      "Usually reached as a crossing rather than a transfer. The medina is the operational problem, and it is a serious one.",
    routeSlug: "marrakech-fes",
  },
];

/** Named for a later release. No page, no URL, no record. */
export const PLANNED_DESTINATIONS = [
  "Ouarzazate",
  "Ait Ben Haddou",
  "Dades",
  "Zagora",
  "Casablanca",
  "Rabat",
  "Tangier",
  "Chefchaouen",
  "Meknes",
  "Agadir",
  "Dakhla",
];

export const destinationBySlug = (slug: string): DestinationEntry | undefined =>
  DESTINATIONS.find((destination) => destination.slug === slug);
