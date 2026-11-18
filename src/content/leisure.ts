import type { IconName } from "@/components/Icon";

/**
 * Experiences (/experiences/[slug]) and Tours (/tours/[slug]).
 *
 * These are the product showcase partners sell to their clients. Sample
 * itineraries are illustrative formats; durations are in days and nights only
 * (no drive times, no prices: everything is costed per request at net rates).
 * `programmes` and `excursions` link to the fully written B2B product pages
 * already on the site.
 */

export type ItineraryDay = { day: string; title: string; body: string };

export type SampleItinerary = {
  title: string;
  length: string;
  summary: string;
  days: ItineraryDay[];
};

export type LeisureProduct = {
  kind: "experience" | "tour";
  slug: string;
  name: string;
  menuBlurb: string;
  cardLine: string;
  icon: IconName;
  heroImage: string;
  galleryImages: string[];
  eyebrow: string;
  h1: string;
  standfirst: string;
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  highlights: string[];
  itineraries: SampleItinerary[];
  inclusions: string[];
  /** Slugs in src/features/programmes/data.ts */
  programmes: string[];
  /** Slugs in src/features/excursions/data.ts */
  excursions: string[];
  related: string[];
};

const STANDARD_INCLUSIONS = [
  "Accommodation at the agreed service level",
  "Private or shared transfers in insured vehicles",
  "Licensed guides in the client's language",
  "Activities and entrance fees as listed in the proposal",
  "One dedicated operations contact on WhatsApp",
  "24/7 on-trip assistance in Morocco",
];

export const EXPERIENCES: LeisureProduct[] = [
  {
    kind: "experience",
    slug: "luxury",
    name: "Luxury",
    menuBlurb: "Palace hotels, private riads and luxury desert camps.",
    cardLine: "Palace hotels, private riads and quiet luxury.",
    icon: "gem",
    heroImage: "d2-mice-riad-rooftop-pool",
    galleryImages: ["d6-dmc-riad-patio", "e29-desert-camp-night", "e14-majorelle-villa"],
    eyebrow: "Experiences · Luxury",
    h1: "Luxury Morocco, quietly done well",
    standfirst:
      "Palace hotels and private riads, private guides, luxury camps in Agafay and the Sahara — paced for clients who expect every detail to be right.",
    seoTitle: "Luxury Morocco Experiences for Your Clients",
    seoDescription:
      "Luxury Morocco experiences for travel professionals: palace hotels, private riads, luxury desert camps and private guides, operated by our Marrakech DMC team.",
    intro: [
      "Luxury in Morocco is less about gold taps than about access, timing and calm: the right riad in the right corner of the medina, a guide who knows when to step back, a desert camp that is genuinely quiet at night.",
      "We build each luxury programme around the client's pace and preferences, then check every component before arrival.",
    ],
    highlights: [
      "Palace hotels and boutique riads in Marrakech and Fes",
      "Private, licensed guides and dedicated drivers",
      "Luxury camps in Agafay and Merzouga",
      "Private dinners, rooftop terraces and after-hours visits where possible",
    ],
    itineraries: [
      {
        title: "Marrakech & Agafay in Style",
        length: "5 days / 4 nights",
        summary: "A palace stay in Marrakech, a private medina day and a night under the stars in a luxury Agafay camp.",
        days: [
          { day: "Day 1", title: "Arrival in Marrakech", body: "Meet & assist at Menara Airport, private transfer to a palace hotel or private riad." },
          { day: "Day 2", title: "Private Marrakech", body: "Medina, Bahia Palace and Ben Youssef with a private guide; afternoon at leisure; rooftop dinner." },
          { day: "Day 3", title: "Gardens & design", body: "Majorelle Garden and Le Jardin Secret, lunch in Gueliz, spa time at the hotel." },
          { day: "Day 4", title: "Agafay desert", body: "Transfer to a luxury camp in Agafay for sunset, dinner and stargazing." },
          { day: "Day 5", title: "Departure", body: "Breakfast in the desert, private transfer to the airport." },
        ],
      },
    ],
    inclusions: [...STANDARD_INCLUSIONS, "Private guide throughout", "Meet & assist on arrival"],
    programmes: ["private-atlas-desert", "taste-of-marrakech"],
    excursions: ["agafay-stargazing-dinner", "majorelle-jardin-secret-gardens"],
    related: ["private", "wellness", "honeymoon"],
  },
  {
    kind: "experience",
    slug: "adventure",
    name: "Adventure",
    menuBlurb: "Atlas treks, e-bikes, quads and desert expeditions.",
    cardLine: "Atlas treks, e-bikes, quads and the Sahara.",
    icon: "mountain",
    heroImage: "e01-merzouga-quads",
    galleryImages: ["e11-toubkal-hikers", "e03-atlas-pass-cyclist", "e05-agafay-camel-caravan"],
    eyebrow: "Experiences · Adventure",
    h1: "Adventure in the Atlas and the Sahara",
    standfirst:
      "Trekking from Imlil, e-bike rides through Ourika and Agafay, quads and camels in the dunes — active days with licensed guides and proper safety briefings.",
    seoTitle: "Adventure Travel Morocco | Atlas & Sahara",
    seoDescription:
      "Adventure experiences in Morocco for agencies and operators: High Atlas treks, e-bike, quad and camel rides in Agafay and Merzouga, with licensed guides.",
    intro: [
      "Morocco's mountains and deserts start close to Marrakech. The High Atlas villages around Imlil, the Ourika valley and the stony Agafay desert all work as day trips, and the Sahara dunes at Merzouga reward a longer journey.",
      "Every activity is run with licensed mountain guides or vetted activity suppliers, with rules on minimum age and fitness confirmed per booking.",
    ],
    highlights: [
      "Guided treks in the High Atlas from Imlil",
      "E-bike rides in Ourika and Agafay",
      "Quad and camel rides in Agafay and Merzouga",
      "Desert camps in the Sahara",
    ],
    itineraries: [
      {
        title: "Atlas to Sahara Active Week",
        length: "7 days / 6 nights",
        summary: "Trek in the Atlas, cross the mountains via Ouarzazate and reach the Erg Chebbi dunes.",
        days: [
          { day: "Day 1", title: "Marrakech", body: "Arrival and transfer to a riad; evening walk to Jemaa el-Fna." },
          { day: "Day 2", title: "Imlil trek", body: "Village trek in the High Atlas with a licensed mountain guide; night in a mountain lodge." },
          { day: "Day 3", title: "Over the Atlas", body: "Cross the Tizi n'Tichka pass to Aït Ben Haddou and Ouarzazate." },
          { day: "Day 4", title: "Dades Gorges", body: "Via the Valley of Roses to the Dades Gorges; short walk in the canyon." },
          { day: "Day 5", title: "Merzouga", body: "Drive to Merzouga; camel ride into the Erg Chebbi dunes and night in a desert camp." },
          { day: "Day 6", title: "Dunes to Ouarzazate", body: "Sunrise on the dunes, optional quad ride, return west." },
          { day: "Day 7", title: "Marrakech & departure", body: "Return to Marrakech for departure." },
        ],
      },
    ],
    inclusions: [...STANDARD_INCLUSIONS, "Licensed mountain guide for treks", "Safety briefing and equipment for activities"],
    programmes: ["marrakech-active-week", "trek-and-taste-atlas", "atlas-agafay-escape"],
    excursions: ["high-atlas-trek-day", "agafay-quad-camel-sunset", "ourika-valley-ebike", "agafay-ebike-adventure"],
    related: ["culture", "group-tours", "family"],
  },
  {
    kind: "experience",
    slug: "culture",
    name: "Culture",
    menuBlurb: "Medinas, palaces, crafts and Amazigh villages.",
    cardLine: "Medinas, palaces, crafts and Amazigh villages.",
    icon: "landmark",
    heroImage: "e16-ben-youssef-madrasa",
    galleryImages: ["e17-saadian-tombs", "b7-fes-medina", "c7-ait-ben-haddou"],
    eyebrow: "Experiences · Culture",
    h1: "Morocco's culture, with guides who live it",
    standfirst:
      "The medinas of Marrakech and Fes, palaces and madrasas, artisans at work and lunch with a family in the Atlas — told by licensed guides who know the stories.",
    seoTitle: "Cultural Tours in Morocco for Travel Trade",
    seoDescription:
      "Cultural experiences in Morocco for travel professionals: Marrakech and Fes medinas, palaces, artisans and Amazigh village visits with licensed local guides.",
    intro: [
      "Morocco's heritage is lived in, not behind glass. A good cultural day combines the monuments — Bahia Palace, Ben Youssef Madrasa, the Saadian Tombs — with the working medina, its craftspeople and its food.",
      "We match guides to the group: historians for special-interest tours, storytellers for families, specialists for architecture or crafts.",
    ],
    highlights: [
      "Marrakech medina, souks and palaces",
      "Fes el-Bali and its artisans' quarters",
      "UNESCO-listed Aït Ben Haddou",
      "Lunch with a family in an Atlas village",
    ],
    itineraries: [
      {
        title: "Imperial Cities & Medinas",
        length: "8 days / 7 nights",
        summary: "Marrakech, Rabat, Fes and Chefchaouen: four cities, four very different medinas.",
        days: [
          { day: "Day 1–2", title: "Marrakech", body: "Arrival; guided medina, palaces and madrasa; evening at Jemaa el-Fna." },
          { day: "Day 3", title: "Casablanca & Rabat", body: "Hassan II Mosque, then the Hassan Tower and Kasbah of the Udayas in Rabat." },
          { day: "Day 4–5", title: "Fes", body: "Fes el-Bali with a licensed guide: tanneries, madrasas and artisans; optional Volubilis and Meknes." },
          { day: "Day 6–7", title: "Chefchaouen", body: "The blue town of the Rif; free time and a walk above the medina." },
          { day: "Day 8", title: "Departure", body: "Transfer to Fes or Tangier airport." },
        ],
      },
    ],
    inclusions: [...STANDARD_INCLUSIONS, "Monument entrance fees", "Local guide in each city"],
    programmes: ["taste-of-marrakech", "atlas-agafay-escape"],
    excursions: ["marrakech-souk-medina-walk", "imlil-villages-lunch-chez-habitant", "ourika-villages-crafts-argan"],
    related: ["gastronomy", "private-tours", "group-tours"],
  },
  {
    kind: "experience",
    slug: "wellness",
    name: "Wellness",
    menuBlurb: "Hammams, spa riads, yoga and quiet gardens.",
    cardLine: "Hammams, spa riads, gardens and slow days.",
    icon: "leaf",
    heroImage: "e15-jardin-secret",
    galleryImages: ["d6-dmc-riad-patio", "e28-lalla-takerkoust-lake", "e34-oukaimeden-plateau"],
    eyebrow: "Experiences · Wellness",
    h1: "Wellness retreats in Marrakech and the Atlas",
    standfirst:
      "Traditional hammams, spa riads, garden mornings and mountain air — slow, restorative programmes for individuals and small groups.",
    seoTitle: "Wellness Retreats Morocco | Marrakech Spa",
    seoDescription:
      "Wellness experiences in Morocco for agencies and advisors: hammam rituals, spa riads, yoga, Atlas mountain retreats and slow days in Marrakech gardens.",
    intro: [
      "The hammam is part of everyday Moroccan life, and Marrakech's spa riads have turned it into a ritual worth travelling for. Combine it with garden mornings, yoga, and a few nights in the Atlas foothills.",
      "We build wellness stays at a deliberately slow pace, with transfers kept short and free time protected.",
    ],
    highlights: [
      "Traditional and spa hammam rituals",
      "Riads and hotels with spa and pool",
      "Yoga and meditation sessions on request",
      "Atlas foothill retreats and lake days",
    ],
    itineraries: [
      {
        title: "Slow Marrakech & Atlas Retreat",
        length: "6 days / 5 nights",
        summary: "Three nights in a spa riad, two in an Atlas retreat, and nothing rushed.",
        days: [
          { day: "Day 1", title: "Arrival", body: "Private transfer to a spa riad; welcome hammam ritual." },
          { day: "Day 2", title: "Gardens", body: "Morning at Le Jardin Secret and Majorelle; afternoon massage." },
          { day: "Day 3", title: "Medina at your pace", body: "Short guided walk, lunch on a rooftop, free afternoon." },
          { day: "Day 4–5", title: "Atlas retreat", body: "Transfer to a mountain retreat; yoga, gentle walks and village visits." },
          { day: "Day 6", title: "Departure", body: "Return to Marrakech for departure." },
        ],
      },
    ],
    inclusions: [...STANDARD_INCLUSIONS, "Hammam and spa treatments as listed"],
    programmes: ["atlas-agafay-escape"],
    excursions: ["majorelle-jardin-secret-gardens", "lalla-takerkoust-lake-agafay", "menara-gardens-caleche-ride"],
    related: ["luxury", "honeymoon", "private"],
  },
  {
    kind: "experience",
    slug: "gastronomy",
    name: "Gastronomy",
    menuBlurb: "Cooking classes, food walks and dinners in riads.",
    cardLine: "Cooking classes, food walks and riad dinners.",
    icon: "utensils",
    heroImage: "e20-spice-shop",
    galleryImages: ["e19-spice-shop-arch", "e18-jemaa-el-fna-dusk", "e32-ourika-pottery"],
    eyebrow: "Experiences · Gastronomy",
    h1: "Moroccan gastronomy, from souk to table",
    standfirst:
      "Market walks, cooking classes, lunch with a family in the Atlas and dinners in riad courtyards — the food of Morocco, the way Moroccans eat it.",
    seoTitle: "Food & Gastronomy Tours in Morocco",
    seoDescription:
      "Gastronomy experiences in Morocco for the travel trade: Marrakech food walks, cooking classes, family lunches in the Atlas and riad dinners, white-label.",
    intro: [
      "Moroccan cooking is regional and seasonal: tagines slow-cooked in the Atlas, street food around Jemaa el-Fna, fish on the Essaouira harbour, pastries in Fes.",
      "Our gastronomy programmes combine markets, kitchens and tables, with every dietary requirement agreed before arrival.",
    ],
    highlights: [
      "Guided food walks in the Marrakech medina",
      "Hands-on cooking classes",
      "Lunch chez l'habitant in an Atlas village",
      "Private dinners in riads and desert camps",
    ],
    itineraries: [
      {
        title: "A Taste of Marrakech",
        length: "4 days / 3 nights",
        summary: "A short culinary break: market, kitchen, village lunch and a desert dinner.",
        days: [
          { day: "Day 1", title: "Arrival & street food", body: "Transfer to a riad; evening food walk around Jemaa el-Fna." },
          { day: "Day 2", title: "Souk & cooking class", body: "Spice souk with a guide, then a hands-on cooking class and lunch." },
          { day: "Day 3", title: "Atlas family lunch", body: "Day in the Atlas villages with lunch in a family home." },
          { day: "Day 4", title: "Departure", body: "Breakfast and transfer to the airport." },
        ],
      },
    ],
    inclusions: [...STANDARD_INCLUSIONS, "Meals and tastings as listed", "Dietary requirements agreed in advance"],
    programmes: ["taste-of-marrakech", "trek-and-taste-atlas"],
    excursions: ["imlil-villages-lunch-chez-habitant", "agafay-sunset-camp-dinner", "marrakech-souk-medina-walk"],
    related: ["culture", "luxury", "private-tours"],
  },
  {
    kind: "experience",
    slug: "private",
    name: "Private Experiences",
    menuBlurb: "Exclusive access, private dinners and VIP moments.",
    cardLine: "Exclusive moments, privately arranged.",
    icon: "key",
    heroImage: "e29-desert-camp-night",
    galleryImages: ["e30-milky-way-tree", "d3-mice-bahia-palace", "e26-menara-pavilion"],
    eyebrow: "Experiences · Private",
    h1: "Private experiences, arranged for one client",
    standfirst:
      "A private dinner under the stars, a palace courtyard after hours, a chef in your client's riad — moments arranged for one party only.",
    seoTitle: "Private & VIP Experiences in Morocco",
    seoDescription:
      "Private and VIP experiences in Morocco for advisors and agencies: private desert dinners, exclusive venue access, personal chefs and private guides.",
    intro: [
      "Some moments only work in private. We arrange them with venues, camps and chefs we work with directly, and confirm every detail in writing before we propose it.",
      "Availability depends on dates and venues, so we always present private experiences as options until confirmed.",
    ],
    highlights: [
      "Private dinners in the Agafay desert",
      "Exclusive-use riads and villas",
      "Personal chefs and private cooking sessions",
      "Private guides and drivers throughout",
    ],
    itineraries: [
      {
        title: "Private Desert Evening",
        length: "Evening",
        summary: "A table for two — or twelve — set in the Agafay hills at sunset.",
        days: [
          { day: "Afternoon", title: "Private transfer", body: "Pick-up from the hotel in a private vehicle." },
          { day: "Sunset", title: "Agafay", body: "Aperitif overlooking the Atlas as the light goes." },
          { day: "Evening", title: "Dinner & stars", body: "Private dinner, music on request, stargazing; return to Marrakech." },
        ],
      },
    ],
    inclusions: ["Private transfers", "Private guide or host", "Exclusive set-up as confirmed", "One dedicated operations contact", "24/7 on-trip assistance"],
    programmes: ["private-atlas-desert"],
    excursions: ["agafay-stargazing-dinner", "agafay-sunset-camp-dinner"],
    related: ["luxury", "honeymoon", "tailor-made"],
  },
];

export const TOURS: LeisureProduct[] = [
  {
    kind: "tour",
    slug: "private-tours",
    name: "Private Tours",
    menuBlurb: "Private car, private guide, your clients' pace.",
    cardLine: "Private car and guide, at your clients' pace.",
    icon: "car",
    heroImage: "e33-oukaimeden-road",
    galleryImages: ["c8-dades-gorge", "c6-ouarzazate-kasbah", "c4-chefchaouen"],
    eyebrow: "Tours · Private",
    h1: "Private tours of Morocco",
    standfirst:
      "A private vehicle, a professional driver and licensed guides in each city — the classic way to discover Morocco, at your clients' pace.",
    seoTitle: "Private Tours of Morocco for Travel Agencies",
    seoDescription:
      "Private tours of Morocco for travel agencies and advisors: private driver and vehicle, licensed city guides, hand-picked riads and hotels, net rates.",
    intro: [
      "Private touring gives clients the freedom to stop, change pace and go further. We plan realistic days, choose hotels that suit the route, and brief drivers and guides on the client before arrival.",
    ],
    highlights: ["Private vehicle and professional driver", "Licensed guides in each city", "Flexible daily pace", "Hotels from riads to 5-star"],
    itineraries: [
      {
        title: "Grand Tour of Morocco",
        length: "10 days / 9 nights",
        summary: "Marrakech, the Atlas, the Sahara, Fes and Chefchaouen by private car.",
        days: [
          { day: "Day 1–2", title: "Marrakech", body: "Arrival, private guided medina tour and free time." },
          { day: "Day 3", title: "Aït Ben Haddou", body: "Over the Atlas to the ksar of Aït Ben Haddou and Ouarzazate." },
          { day: "Day 4", title: "Dades", body: "Valley of Roses and the Dades Gorges." },
          { day: "Day 5", title: "Merzouga", body: "To the Erg Chebbi dunes; camel ride and desert camp." },
          { day: "Day 6", title: "Middle Atlas", body: "North through the Ziz valley and cedar forests to Fes." },
          { day: "Day 7", title: "Fes", body: "Full day in Fes el-Bali with a licensed guide." },
          { day: "Day 8–9", title: "Chefchaouen", body: "The blue town of the Rif mountains." },
          { day: "Day 10", title: "Departure", body: "Transfer to Fes or Tangier airport." },
        ],
      },
    ],
    inclusions: [...STANDARD_INCLUSIONS, "Private vehicle and driver throughout"],
    programmes: ["private-atlas-desert"],
    excursions: ["atlas-agafay-day-combo", "asni-ouirgane-atlas-villages"],
    related: ["tailor-made", "honeymoon", "culture"],
  },
  {
    kind: "tour",
    slug: "group-tours",
    name: "Group Tours",
    menuBlurb: "Coach tours and departures for groups of all sizes.",
    cardLine: "Coach circuits and departures for groups.",
    icon: "bus",
    heroImage: "d8-dmc-jemaa-el-fnaa-sunset",
    galleryImages: ["b1-marrakech-hero", "c1b-casablanca-mosque", "c2-rabat-hassan-tower"],
    eyebrow: "Tours · Groups",
    h1: "Group tours in Morocco",
    standfirst:
      "Coach circuits and fixed departures for groups — Imperial Cities, the South and the desert — with guides, hotels and meals planned for the whole group.",
    seoTitle: "Group Tours in Morocco | Coach Circuits",
    seoDescription:
      "Group tours in Morocco for tour operators and agencies: Imperial Cities and Sahara coach circuits with licensed guides, group hotels and set menus.",
    intro: [
      "Group touring in Morocco works when the logistics disappear: rooms ready on arrival, coaches parked where the group can reach them, meals served on time. That is what we plan for.",
    ],
    highlights: ["Imperial Cities and Sahara circuits", "Coaches sized to the group", "Licensed guide per coach", "Group hotels and set menus"],
    itineraries: [
      {
        title: "Imperial Cities by Coach",
        length: "8 days / 7 nights",
        summary: "Casablanca, Rabat, Meknes, Fes and Marrakech for groups.",
        days: [
          { day: "Day 1", title: "Casablanca", body: "Arrival, Hassan II Mosque, transfer to hotel." },
          { day: "Day 2", title: "Rabat", body: "Hassan Tower, Mausoleum of Mohammed V and the Udayas." },
          { day: "Day 3", title: "Meknes & Volubilis", body: "Roman Volubilis and the imperial city of Meknes; on to Fes." },
          { day: "Day 4", title: "Fes", body: "Guided day in the medina with group lunch." },
          { day: "Day 5", title: "Middle Atlas", body: "Ifrane and the cedar forests, south to Beni Mellal." },
          { day: "Day 6–7", title: "Marrakech", body: "Palaces, souks and a group dinner with entertainment." },
          { day: "Day 8", title: "Departure", body: "Transfer to Marrakech airport." },
        ],
      },
    ],
    inclusions: [...STANDARD_INCLUSIONS, "Coach with driver", "Group meals as listed"],
    programmes: ["atlas-agafay-team-challenge", "marrakech-weekend-express"],
    excursions: ["marrakech-souk-medina-walk", "ourika-valley-walk-waterfalls"],
    related: ["culture", "adventure", "family"],
  },
  {
    kind: "tour",
    slug: "family",
    name: "Family",
    menuBlurb: "Kid-friendly pacing, camels, gardens and pools.",
    cardLine: "Easy pacing, camels, gardens and pools.",
    icon: "baby",
    heroImage: "e25-palmeraie-camels-standing",
    galleryImages: ["e36-imlil-mule", "e27-caleche-horse", "e01-merzouga-quads"],
    eyebrow: "Tours · Family",
    h1: "Family holidays in Morocco",
    standfirst:
      "Shorter driving days, family rooms and riads with pools, camel rides, mule treks and cooking classes — Morocco planned around children's energy.",
    seoTitle: "Family Tours in Morocco for Travel Agents",
    seoDescription:
      "Family tours in Morocco for agents and advisors: kid-friendly pacing, family rooms, camel and mule rides, gardens and cooking classes from Marrakech.",
    intro: [
      "Families need different things from Morocco: shorter days on the road, hotels with space and a pool, and activities that are fun at seven and at seventy. We plan around nap times and appetites as much as around monuments.",
    ],
    highlights: ["Family rooms and riads with pools", "Camel and mule rides", "Cooking classes for all ages", "Short transfers, flexible days"],
    itineraries: [
      {
        title: "Marrakech Family Adventure",
        length: "6 days / 5 nights",
        summary: "Gardens, camels in the Palmeraie, a mule ride in the Atlas and a night in Agafay.",
        days: [
          { day: "Day 1", title: "Arrival", body: "Transfer to a family-friendly riad or hotel with pool." },
          { day: "Day 2", title: "Marrakech for kids", body: "Calèche ride, Majorelle Garden, short medina walk." },
          { day: "Day 3", title: "Palmeraie", body: "Camel ride among the palms; afternoon at the pool." },
          { day: "Day 4", title: "Atlas", body: "Mule ride and tea with a family in an Atlas village." },
          { day: "Day 5", title: "Agafay", body: "Easy activities and a night in a desert camp." },
          { day: "Day 6", title: "Departure", body: "Return to Marrakech for departure." },
        ],
      },
    ],
    inclusions: [...STANDARD_INCLUSIONS, "Family rooms or connecting rooms", "Child seats on request"],
    programmes: ["family-adventure"],
    excursions: ["imlil-mule-ride-family-tea", "menara-gardens-caleche-ride", "agafay-quad-camel-sunset"],
    related: ["adventure", "private-tours", "wellness"],
  },
  {
    kind: "tour",
    slug: "honeymoon",
    name: "Honeymoon",
    menuBlurb: "Romantic riads, desert nights and the coast.",
    cardLine: "Romantic riads, desert nights and the coast.",
    icon: "heart",
    heroImage: "e30-milky-way-tree",
    galleryImages: ["d2-mice-riad-rooftop-pool", "e22-essaouira-citadel", "e29-desert-camp-night"],
    eyebrow: "Tours · Honeymoon",
    h1: "Honeymoons in Morocco",
    standfirst:
      "A rooftop in Marrakech, a private dinner in the desert, a quiet riad by the sea in Essaouira — honeymoon itineraries with time to simply be together.",
    seoTitle: "Morocco Honeymoon Packages for Agents",
    seoDescription:
      "Morocco honeymoon packages for travel agents and advisors: romantic riads, private desert dinners, Sahara camps and Essaouira, with private transfers.",
    intro: [
      "Honeymooners want romance without logistics. We keep transfers private, choose intimate riads and camps, and add touches arranged quietly in advance.",
    ],
    highlights: ["Boutique riads and suites", "Private desert dinners", "Sahara or Agafay camps", "Essaouira by the Atlantic"],
    itineraries: [
      {
        title: "Marrakech, Desert & Sea",
        length: "8 days / 7 nights",
        summary: "Three nights in Marrakech, two in the desert and two on the Atlantic coast.",
        days: [
          { day: "Day 1–3", title: "Marrakech", body: "Boutique riad, private medina tour, hammam for two, rooftop dinner." },
          { day: "Day 4–5", title: "Agafay or Sahara", body: "Luxury camp, sunset camel ride and a private dinner under the stars." },
          { day: "Day 6–7", title: "Essaouira", body: "Seafront riad, the ramparts and the port, slow days by the sea." },
          { day: "Day 8", title: "Departure", body: "Private transfer to Marrakech or Essaouira airport." },
        ],
      },
    ],
    inclusions: [...STANDARD_INCLUSIONS, "Private transfers throughout", "Honeymoon touches on request"],
    programmes: ["private-atlas-desert", "atlas-agafay-escape"],
    excursions: ["agafay-stargazing-dinner", "majorelle-jardin-secret-gardens"],
    related: ["luxury", "private", "wellness"],
  },
  {
    kind: "tour",
    slug: "tailor-made",
    name: "Tailor-Made",
    menuBlurb: "Built from scratch around your client's brief.",
    cardLine: "Built from scratch around your brief.",
    icon: "pen-tool",
    heroImage: "c4-chefchaouen",
    galleryImages: ["c10-dakhla-lagoon", "c5-agadir-taghazout", "c3-tangier-night"],
    eyebrow: "Tours · Tailor-Made",
    h1: "Tailor-made Morocco, built from your brief",
    standfirst:
      "Tell us who is travelling, when and what matters to them. We design the route, choose the hotels and cost every line — no templates.",
    seoTitle: "Tailor-Made Morocco Tours for Travel Trade",
    seoDescription:
      "Tailor-made Morocco tours for travel agencies, operators and advisors: itineraries designed from your brief, costed at net rates and operated locally.",
    intro: [
      "Tailor-made is where a local DMC earns its keep. We know which routes work in which season, which hotels suit which clients, and where a day can be made easier — and we tell you honestly when an idea will not work.",
    ],
    highlights: ["Designed from a blank page", "Any region of Morocco", "Any service level", "Costed line by line"],
    itineraries: [
      {
        title: "Your brief, our proposal",
        length: "Any length",
        summary: "How a tailor-made request becomes an operated trip.",
        days: [
          { day: "Step 1", title: "Brief", body: "Dates, pax, profile, interests and budget per person." },
          { day: "Step 2", title: "Proposal", body: "A costed day-by-day itinerary with hotel options and alternatives." },
          { day: "Step 3", title: "Refine", body: "We adjust until it fits — pace, hotels, activities, price." },
          { day: "Step 4", title: "Operate", body: "Written confirmation, documents and 24/7 support during the trip." },
        ],
      },
    ],
    inclusions: STANDARD_INCLUSIONS,
    programmes: ["marrakech-active-week", "trek-and-taste-atlas"],
    excursions: ["oukaimeden-high-plateau", "lalla-takerkoust-lake-agafay"],
    related: ["private-tours", "luxury", "culture"],
  },
];

export const experienceBySlug = (slug: string) => EXPERIENCES.find((e) => e.slug === slug);
export const tourBySlug = (slug: string) => TOURS.find((t) => t.slug === slug);
export const leisureBySlug = (slug: string) => experienceBySlug(slug) ?? tourBySlug(slug);
export const leisureHref = (p: LeisureProduct) => `/${p.kind === "experience" ? "experiences" : "tours"}/${p.slug}`;
