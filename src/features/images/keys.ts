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
  /**
   * The home hero - the single priority-loaded image on the site. Currently
   * camels crossing Erg Chebbi (B9, Unsplash), which HomeHero loads eagerly
   * itself; the B1 Marrakech record stays registered for reuse.
   */
  homeHero: "b9-erg-chebbi-camels",
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
  essaouira: "b5-essaouira-port",
  merzouga: "b6-merzouga",
  fes: "b7-fes-medina",
  casablanca: "c1-casablanca-sea",
  rabat: "c2-rabat-hassan-tower",
  tangier: "c3-tangier-night",
  chefchaouen: "c4-chefchaouen",
  agadir: "c5-agadir-taghazout",
  ouarzazate: "c6-ouarzazate-kasbah",
  "ait-ben-haddou": "c7-ait-ben-haddou",
  dades: "c8-dades-gorge",
  zagora: "c9-zagora-dunes",
  dakhla: "c10-dakhla-lagoon",
};

/**
 * The photographs on each destination page: a wide banner, and an optional
 * second image beside the introduction. Scenery only, all licensed.
 */
export const DESTINATION_PAGE_IMAGES: Record<string, { hero: string; detail?: string }> = {
  marrakech: { hero: "b1-marrakech-hero", detail: "b2-marrakech-medersa" },
  agafay: { hero: "b3b-agafay-camp", detail: "b3-agafay" },
  atlas: { hero: "b4-atlas-imlil" },
  essaouira: { hero: "b5-essaouira-port" },
  merzouga: { hero: "b9-erg-chebbi-camels", detail: "b6-merzouga" },
  fes: { hero: "b7-fes-medina", detail: "b7b-fes-alley" },
  casablanca: { hero: "c1-casablanca-sea", detail: "c1b-casablanca-mosque" },
  rabat: { hero: "c2-rabat-hassan-tower", detail: "c2b-rabat-tower-detail" },
  tangier: { hero: "c3-tangier-night", detail: "c3b-tangier-cave" },
  chefchaouen: { hero: "c4-chefchaouen", detail: "c4b-chefchaouen-steps" },
  agadir: { hero: "c5-agadir-taghazout", detail: "c5b-agadir-surf" },
  ouarzazate: { hero: "c6-ouarzazate-kasbah", detail: "c6b-ouarzazate-village" },
  "ait-ben-haddou": { hero: "c7-ait-ben-haddou", detail: "c7b-ait-ben-haddou-ksar" },
  dades: { hero: "c8-dades-gorge", detail: "c8b-dades-hairpins" },
  zagora: { hero: "c9-zagora-dunes", detail: "c9b-zagora-cliffs" },
  dakhla: { hero: "c10-dakhla-lagoon", detail: "c10b-dakhla-beach" },
};

/** The banner on the destinations hub. */
export const DESTINATIONS_HUB_HERO = "b1-marrakech-hero";
