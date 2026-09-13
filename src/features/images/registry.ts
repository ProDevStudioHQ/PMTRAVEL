/**
 * The image record.
 *
 * "If an image has no row in this sheet, it does not go on the website."
 * That rule is enforced here rather than in a spreadsheet: SiteImage takes a
 * key into this registry, so an image with no record cannot be rendered, and
 * `npm run verify:data` fails the build if a file appears in public/images
 * without an entry.
 *
 * The array is empty because no photography has been taken yet. That is the
 * honest state, and it is why the site currently carries no images.
 *
 * TODO(images): add a record per delivered photograph. Never add one without
 * a licence you can produce - a stock agency sending an invoice in two years
 * is an avoidable and expensive mistake for a new company.
 * See docs/images.md and pm-travel-photo-layout.html.
 */

export type ImageSource =
  | "pm_original"
  | "commissioned"
  | "unsplash"
  | "pexels"
  | "wikimedia"
  | "adobe_stock"
  | "getty"
  | "shutterstock"
  | "stocksy"
  | "onmt";

/**
 * Sources that may depict PM Travel's own operation, staff, vehicles or
 * premises. Anything else is scenery only.
 *
 * Stock photography of people must never be presented as our staff or our
 * clients, and no generated image of any kind is permitted.
 */
export const OPERATIONAL_SOURCES: ImageSource[] = ["pm_original", "commissioned"];

export type ImageRecord = {
  /** Key used in code. Also the filename stem under public/images/. */
  key: string;
  /** Path under public/, e.g. "/images/office-gueliz.jpg". */
  src: string;
  /** Intrinsic size. Required, so the page cannot shift while loading. */
  width: number;
  height: number;
  /**
   * What is actually in the image, for someone who cannot see it.
   * Accessibility first - keyword stuffing here is both useless and wrong.
   */
  alt: string;
  source: ImageSource;
  /** Photographer or contributor. */
  creator: string;
  /** The exact licence, e.g. "Unsplash Licence", "Adobe Standard". */
  licence: string;
  /** Link or file reference to the certificate, invoice or written permission. */
  licenceProof: string;
  /** ISO date. */
  acquiredOn: string;
  commercialUse: true;
  restrictions?: string;
  location?: string;
  /**
   * Whether a signed model release exists for every recognisable person.
   * No release, no publication.
   */
  modelRelease?: boolean;
  /** True for the single hero image only. Everything else loads lazily. */
  priority?: boolean;
};

export const IMAGES: ImageRecord[] = [
  {
    key: "b1-marrakech-hero",
    src: "/images/b1-marrakech-hero.jpg",
    width: 2400,
    height: 1596,
    alt: "The Koutoubia minaret rising above the rooftops of Marrakech, with the snow-covered peaks of the High Atlas behind the city.",
    source: "unsplash",
    creator: "Paul Macallan (@pemacallan)",
    licence: "Unsplash Licence",
    licenceProof:
      "https://unsplash.com/photos/koutoubia-mosque-minaret-in-marrakesh-CFKksjYRSQ8",
    acquiredOn: "2026-09-12",
    commercialUse: true,
    restrictions:
      "Free commercial use, no attribution required under the Unsplash Licence. Credit given anyway on /about. Destination scenery only - never usable for anything depicting PM Travel's own operation.",
    location: "Marrakech, Morocco",
  },
  {
    key: "b2-marrakech-medersa",
    src: "/images/b2-marrakech-medersa.jpg",
    width: 1100,
    height: 1650,
    alt: "The courtyard of the Ben Youssef Medersa in Marrakech, seen through a carved archway, with zellige tilework and a still central pool.",
    source: "unsplash",
    creator: "Alex Azabache",
    licence: "Unsplash Licence",
    licenceProof:
      "https://unsplash.com/photos/medersa-ben-youssef-during-daytime-YSabBvW1aR4",
    acquiredOn: "2026-09-12",
    commercialUse: true,
    restrictions:
      "Destination scenery only. Never usable for anything depicting PM Travel's own operation.",
    location: "Marrakech, Morocco",
  },
  {
    key: "b4-atlas-imlil",
    src: "/images/b4-atlas-imlil.jpg",
    width: 1600,
    height: 1067,
    alt: "A High Atlas village of earth-built houses on a mountainside above a wooded valley, with the access road visible cut into the slope.",
    source: "unsplash",
    creator: "Louis Hansel",
    licence: "Unsplash Licence",
    licenceProof:
      "https://unsplash.com/photos/photo-of-brown-houses-surrounded-by-green-trees-erg9zCloOgs",
    acquiredOn: "2026-09-12",
    commercialUse: true,
    restrictions:
      "Destination scenery only. Never usable for anything depicting PM Travel's own operation.",
    location: "High Atlas, Morocco",
  },
  {
    key: "b6-merzouga",
    src: "/images/b6-merzouga.jpg",
    width: 1600,
    height: 1200,
    alt: "Wind-rippled orange sand of the Erg Chebbi dunes near Merzouga, rising to a clean horizon under a clear sky.",
    source: "unsplash",
    creator: "Mark Kuiper",
    licence: "Unsplash Licence",
    licenceProof:
      "https://unsplash.com/photos/brown-sand-under-blue-and-white-sky-_UJTBae6whA",
    acquiredOn: "2026-09-12",
    commercialUse: true,
    restrictions:
      "Destination scenery only. Never usable for anything depicting PM Travel's own operation.",
    location: "Erg Chebbi, Merzouga, Morocco",
  },
  {
    key: "b9-erg-chebbi-camels",
    src: "/images/b9-erg-chebbi-camels.jpg",
    width: 2400,
    height: 1800,
    alt: "A line of camels walking along the crest of the orange Erg Chebbi dunes near Merzouga in early morning light, under a deep blue sky.",
    source: "unsplash",
    creator: "Carlos Leret (@leret)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/camels-in-a-desert-kiYzznir-uo",
    acquiredOn: "2026-09-12",
    commercialUse: true,
    restrictions:
      "Destination scenery only, no people in frame. Resized from the 4060x3045 original. Never usable for anything depicting PM Travel's own operation.",
    location: "Erg Chebbi, Merzouga, Morocco",
  },
  {
    key: "b3-agafay",
    src: "/images/b3-agafay.jpg",
    width: 1100,
    height: 1467,
    alt: "A dirt track winding between the bare, rounded brown hills of the Agafay desert, with the blue ridges of the Atlas Mountains on the horizon.",
    source: "unsplash",
    creator: "Chloé Lefleur (@chloe_lefleur)",
    licence: "Unsplash Licence",
    licenceProof:
      "https://unsplash.com/photos/a-view-of-a-desert-landscape-with-mountains-in-the-distance-jMb3w4jsorA",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions:
      "Destination scenery only, no people in frame. Resized from the original. Never usable for anything depicting PM Travel's own operation.",
    location: "Agafay, Morocco",
  },
  {
    key: "b3b-agafay-camp",
    src: "/images/b3b-agafay-camp.jpg",
    width: 1920,
    height: 1280,
    alt: "A shade canopy and low seating on stony ground at the edge of the Agafay desert, looking out over rolling brown hills towards distant mountains in haze.",
    source: "unsplash",
    creator: "Kostas Fotiadis (@kosfoti)",
    licence: "Unsplash Licence",
    licenceProof:
      "https://unsplash.com/photos/a-tent-set-up-in-the-middle-of-a-desert-cqR7hPZmA8w",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions:
      "Destination scenery only. One distant figure, not identifiable. Not a PM Travel site or camp, and never usable as one.",
    location: "Agafay, Morocco",
  },
  {
    key: "b5-essaouira-port",
    src: "/images/b5-essaouira-port.jpg",
    width: 1920,
    height: 1275,
    alt: "The fishing port of Essaouira, with rows of blue wooden boats moored inside the harbour wall, a boat under construction on the quay and the Atlantic beyond.",
    source: "unsplash",
    creator: "Ma He (@maihe)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/xiBE9G0godc",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions:
      "Destination scenery only. Distant passers-by on the quay, none identifiable. Never usable for anything depicting PM Travel's own operation.",
    location: "Essaouira, Morocco",
  },
  {
    key: "b7-fes-medina",
    src: "/images/b7-fes-medina.jpg",
    width: 1920,
    height: 1281,
    alt: "The densely packed flat rooftops of the Fes medina seen from above, a sea of sand-coloured and white buildings stretching to the hills.",
    source: "unsplash",
    creator: "Kyle Frost (@kylefrost)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/uuFcJnLi540",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions:
      "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Fes, Morocco",
  },
  {
    key: "b7b-fes-alley",
    src: "/images/b7b-fes-alley.jpg",
    width: 1100,
    height: 1467,
    alt: "Looking up a narrow alley in the Fes medina, past a carved stucco doorway and cedar eaves towards a strip of pale sky.",
    source: "unsplash",
    creator: "moroccan zest (@moroccanzest)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/JLNhr2TTsJA",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions:
      "Destination scenery only, no people in frame. Resized from the original. Never usable for anything depicting PM Travel's own operation.",
    location: "Fes, Morocco",
  },
];

export const imageByKey = (key: string): ImageRecord | undefined =>
  IMAGES.find((image) => image.key === key);

/** Only one image on the site may be priority-loaded: the LCP hero. */
export const priorityImageCount = IMAGES.filter((image) => image.priority).length;
