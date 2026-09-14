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
  /** The buyer segments the destination serves, shown as tags. */
  segments?: string[];
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
  },
  {
    slug: "merzouga",
    name: "Merzouga",
    summary:
      "The longest standard leg we run. Whether it should be two days or three is the question an operator actually needs answered.",
  },
  {
    slug: "fes",
    name: "Fes",
    summary:
      "Usually reached as a crossing rather than a transfer. The medina is the operational problem, and it is a serious one.",
  },
  // Ordered by commercial priority for the travel trade.
  {
    slug: "casablanca",
    name: "Casablanca",
    summary:
      "Morocco's largest business gateway and main international airport. Arrival handling and city traffic decide more than the venue does.",
    segments: ["Business", "MICE", "Airport"],
  },
  {
    slug: "agadir",
    name: "Agadir",
    summary:
      "Atlantic resort city with beaches, large hotels and golf. Resort capacity is the strength; the days built around it are where planning matters.",
    segments: ["Leisure", "Groups", "Golf"],
  },
  {
    slug: "rabat",
    name: "Rabat",
    summary:
      "The capital: ministries, embassies and institutions. Protocol, security and access govern the programme more than distance does.",
    segments: ["MICE", "Corporate", "Cultural"],
  },
  {
    slug: "tangier",
    name: "Tangier",
    summary:
      "Business city, major port and the shortest crossing to Spain. Ferries and connections shape the programme.",
    segments: ["Corporate", "Groups", "Leisure"],
  },
  {
    slug: "chefchaouen",
    name: "Chefchaouen",
    summary:
      "The blue town in the Rif. Stepped streets, no vehicles in the medina and the pace of a small town decide the visit.",
    segments: ["FIT", "Groups", "Photography"],
  },
  {
    slug: "ouarzazate",
    name: "Ouarzazate",
    summary:
      "Morocco's film capital and the gateway to the Sahara. The Tizi n'Tichka crossing decides the day more than the destination does.",
    segments: ["Film", "Adventure", "Circuits"],
  },
  {
    slug: "ait-ben-haddou",
    name: "Aït Ben Haddou",
    summary:
      "A UNESCO-listed earthen ksar and one of Morocco's most filmed places. The climb and the heat decide how a group experiences it.",
    segments: ["Cultural", "Film", "Excursions"],
  },
  {
    slug: "dades",
    name: "Dades Valley",
    summary:
      "Gorges, kasbahs and one of Morocco's most photographed roads. The road is the experience, and also the constraint.",
    segments: ["Adventure", "Groups"],
  },
  {
    slug: "dakhla",
    name: "Dakhla",
    summary:
      "An Atlantic lagoon in the far south, known for kitesurfing and eco-lodges. Flights and distance shape everything.",
    segments: ["Kitesurf", "Corporate", "Luxury"],
  },
  {
    slug: "zagora",
    name: "Zagora",
    summary:
      "The Draa valley and a desert night closer to Marrakech than Merzouga. The trade-off between distance and dunes is the decision to make.",
    segments: ["Desert", "Adventure"],
  },
];

/** Named for a later release. No page, no URL, no record. */
export const PLANNED_DESTINATIONS = ["Meknes"];

export const destinationBySlug = (slug: string): DestinationEntry | undefined =>
  DESTINATIONS.find((destination) => destination.slug === slug);
