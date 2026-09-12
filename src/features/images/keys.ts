/**
 * Named image slots.
 *
 * A slot is a place on the site that becomes photographic the moment a record
 * with this key exists. Until then the page renders its own quiet fallback -
 * deliberately, not as a broken state.
 *
 * The keys match the shot references in pm-travel-photo-layout.html, so a
 * photographer's delivery maps straight onto the site.
 */
export const IMAGE_SLOTS = {
  /** B1 - the single priority-loaded image on the site. */
  homeHero: "b1-marrakech-hero",
  /** A1 - office, Gueliz. The most important trust image. */
  office: "a1-office-gueliz",
  /** A3 - vehicle at a hotel entrance. */
  vehicle: "a3-vehicle-hotel-entrance",
  /** A5 - airport meet and assist. */
  airportMeet: "a5-airport-meet",
  /** A9 - loading luggage, group departure. */
  groupDeparture: "a9-group-departure",
} as const;

/** B2-B9, keyed by destination slug so the rail fills itself in. */
export const DESTINATION_IMAGE_KEYS: Record<string, string> = {
  marrakech: "b2-marrakech-medersa",
  agafay: "b3-agafay",
  atlas: "b4-atlas-imlil",
  essaouira: "b5-essaouira",
  merzouga: "b6-merzouga",
  fes: "b7-fes",
};
