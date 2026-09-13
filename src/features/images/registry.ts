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
  {
    key: "c1-casablanca-sea",
    src: "/images/c1-casablanca-sea.jpg",
    width: 1920,
    height: 1280,
    alt: "The Hassan II Mosque and its tall minaret seen across the Atlantic from the Casablanca shoreline, with apartment blocks along the coast.",
    source: "unsplash",
    creator: "Maria Krasnova (@salty_morning)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/_Faweyea_10",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Casablanca, Morocco",
  },
  {
    key: "c1b-casablanca-mosque",
    src: "/images/c1b-casablanca-mosque.jpg",
    width: 1920,
    height: 1275,
    alt: "The minaret of the Hassan II Mosque in Casablanca rising above the arcaded esplanade and green-tiled roofs, under a clear sky.",
    source: "unsplash",
    creator: "Hans-Jürgen Weinhardt (@hansjuergen)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/xijil3cOsis",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only. Distant visitors on the esplanade, none identifiable. Never usable for anything depicting PM Travel's own operation.",
    location: "Casablanca, Morocco",
  },
  {
    key: "c2-rabat-hassan-tower",
    src: "/images/c2-rabat-hassan-tower.jpg",
    width: 1920,
    height: 1440,
    alt: "The unfinished Hassan Tower in Rabat at dusk, with rows of stone column bases standing on the esplanade in front of it.",
    source: "unsplash",
    creator: "Hongbin (@hbsun2013)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/QOse_cZFWzo",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only. Distant visitors, none identifiable. Never usable for anything depicting PM Travel's own operation.",
    location: "Rabat, Morocco",
  },
  {
    key: "c2b-rabat-tower-detail",
    src: "/images/c2b-rabat-tower-detail.jpg",
    width: 1100,
    height: 1650,
    alt: "Close view of the carved sandstone face of the Hassan Tower in Rabat, with its interlaced arch patterns.",
    source: "unsplash",
    creator: "mehdi lamaaffar (@mehdi_lamaaffar)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/eoY93dm3UvQ",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Rabat, Morocco",
  },
  {
    key: "c3-tangier-night",
    src: "/images/c3-tangier-night.jpg",
    width: 1920,
    height: 1280,
    alt: "Tangier at dusk from above, the lit medina and seafront road curving along the bay towards the port.",
    source: "unsplash",
    creator: "Raúl Cacho Oses (@raulcachophoto)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/atwIEcpyeSM",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Tangier, Morocco",
  },
  {
    key: "c3b-tangier-cave",
    src: "/images/c3b-tangier-cave.jpg",
    width: 1100,
    height: 1397,
    alt: "The Atlantic seen through the rock opening of a sea cave near Tangier, waves breaking below.",
    source: "unsplash",
    creator: "Michael Starkie (@starkie_pics)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/UnzkvCEk1Mg",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Tangier, Morocco",
  },
  {
    key: "c4-chefchaouen",
    src: "/images/c4-chefchaouen.jpg",
    width: 1920,
    height: 1280,
    alt: "The blue and white houses of Chefchaouen stacked up the hillside below a wooded ridge.",
    source: "unsplash",
    creator: "Pretty Pink (@infinitexplorer)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/NncAbldgViA",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Chefchaouen, Morocco",
  },
  {
    key: "c4b-chefchaouen-steps",
    src: "/images/c4b-chefchaouen-steps.jpg",
    width: 1100,
    height: 1650,
    alt: "A stepped blue alley in the Chefchaouen medina, with tiled walls, a painted door and wrought-iron railings.",
    source: "unsplash",
    creator: "Mauro Lima (@limamauro23)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/1SiIhR2uGvo",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Private doors: never cropped to single out a residence. Never usable for anything depicting PM Travel's own operation.",
    location: "Chefchaouen, Morocco",
  },
  {
    key: "c5-agadir-taghazout",
    src: "/images/c5-agadir-taghazout.jpg",
    width: 1920,
    height: 1440,
    alt: "Whitewashed houses and blue fishing boats above the beach at Taghazout, the surf village north of Agadir.",
    source: "unsplash",
    creator: "Louis Hansel (@louishansel)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/aqJfoLKFz6c",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Taken at Taghazout, not Agadir city; the alt text says so. Destination scenery only. Never usable for anything depicting PM Travel's own operation.",
    location: "Taghazout, near Agadir, Morocco",
  },
  {
    key: "c5b-agadir-surf",
    src: "/images/c5b-agadir-surf.jpg",
    width: 1100,
    height: 1375,
    alt: "Atlantic waves rolling onto a wide beach near Agadir, with rocky headlands in the sea mist behind.",
    source: "unsplash",
    creator: "Juli Kosolapova (@yuli_superson)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/CEeXw7a_5LA",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Agadir, Morocco",
  },
  {
    key: "c6-ouarzazate-kasbah",
    src: "/images/c6-ouarzazate-kasbah.jpg",
    width: 1920,
    height: 1280,
    alt: "The earthen towers of a kasbah near Ouarzazate against a deep blue sky, with a palm tree in the foreground.",
    source: "unsplash",
    creator: "Desert Morocco Adventure (@dmadventure)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/DbdUWca18g0",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Published by a tour company; never usable to imply that company's services are ours.",
    location: "Ouarzazate, Morocco",
  },
  {
    key: "c6b-ouarzazate-village",
    src: "/images/c6b-ouarzazate-village.jpg",
    width: 1920,
    height: 1282,
    alt: "An earthen village among green fields and trees below red and grey mountains in the Ouarzazate region.",
    source: "unsplash",
    creator: "Abdou Faiz (@abdoufaiz)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/KMcqhDEb03c",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Ouarzazate region, Morocco",
  },
  {
    key: "c7-ait-ben-haddou",
    src: "/images/c7-ait-ben-haddou.jpg",
    width: 1920,
    height: 1080,
    alt: "The ksar of Aït Ben Haddou climbing its hillside, earthen houses and towers below the granary at the summit.",
    source: "unsplash",
    creator: "Abdou Faiz (@abdoufaiz)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/lA-P8-vagrI",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Aït Ben Haddou, Morocco",
  },
  {
    key: "c7b-ait-ben-haddou-ksar",
    src: "/images/c7b-ait-ben-haddou-ksar.jpg",
    width: 1100,
    height: 1650,
    alt: "The earthen village of Aït Ben Haddou spread along the hillside above palm trees and desert scrub.",
    source: "unsplash",
    creator: "Marcel L. (@ml_75)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/hTtHe8UAJRg",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Aït Ben Haddou, Morocco",
  },
  {
    key: "c8-dades-gorge",
    src: "/images/c8-dades-gorge.jpg",
    width: 1920,
    height: 1336,
    alt: "The road into the Dades Gorges climbing in tight hairpin bends between steep, eroded rock walls.",
    source: "unsplash",
    creator: "Abdou Faiz (@abdoufaiz)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/AWPNSJVIwkg",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation or vehicles.",
    location: "Dades Gorges, Morocco",
  },
  {
    key: "c8b-dades-hairpins",
    src: "/images/c8b-dades-hairpins.jpg",
    width: 1100,
    height: 1100,
    alt: "The hairpin road of the Dades Gorges near Boumalne Dades, winding up a narrow canyon in low evening light.",
    source: "unsplash",
    creator: "Mohamed Abira (@moroccopictures)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/bq_u2CZXFb8",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Boumalne Dades, Morocco",
  },
  {
    key: "c9-zagora-dunes",
    src: "/images/c9-zagora-dunes.jpg",
    width: 1920,
    height: 1280,
    alt: "Smooth orange sand dunes near Zagora rising to a crest under a clear blue sky.",
    source: "unsplash",
    creator: "Marius Zetzmann (@simplepic)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/yb38Gt1mQ1c",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Zagora, Morocco",
  },
  {
    key: "c9b-zagora-cliffs",
    src: "/images/c9b-zagora-cliffs.jpg",
    width: 1100,
    height: 1650,
    alt: "A flat-topped rocky ridge near Zagora catching the sun against a wide, clear blue sky.",
    source: "unsplash",
    creator: "Raúl Mermans García (@raulmermans)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/oWzVpeYyJ-w",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Never usable for anything depicting PM Travel's own operation.",
    location: "Zagora, Morocco",
  },
  {
    key: "c10-dakhla-lagoon",
    src: "/images/c10-dakhla-lagoon.jpg",
    width: 1920,
    height: 1078,
    alt: "Aerial view of the shallow green water and sand of the Dakhla lagoon, with a kite and a small white boat on the shore.",
    source: "unsplash",
    creator: "Dekeister Leopold (@eyesgroup)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/Cn-EpLcknlY",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, no people in frame. Branding on the kite is incidental. Never usable for anything depicting PM Travel's own operation.",
    location: "Dakhla lagoon, Morocco",
  },
  {
    key: "c10b-dakhla-beach",
    src: "/images/c10b-dakhla-beach.jpg",
    width: 1100,
    height: 1650,
    alt: "An off-road vehicle crossing the sandy shore at Dakhla, with low dunes and the calm sea behind it.",
    source: "unsplash",
    creator: "Khalid El Hadrami (@khalid02)",
    licence: "Unsplash Licence",
    licenceProof: "https://unsplash.com/photos/31ZGtXBhIG4",
    acquiredOn: "2026-09-13",
    commercialUse: true,
    restrictions: "Destination scenery only, driver not visible. Not a PM Travel vehicle and never usable as one.",
    location: "Dakhla, Morocco",
  },
];

export const imageByKey = (key: string): ImageRecord | undefined =>
  IMAGES.find((image) => image.key === key);

/** Only one image on the site may be priority-loaded: the LCP hero. */
export const priorityImageCount = IMAGES.filter((image) => image.priority).length;
