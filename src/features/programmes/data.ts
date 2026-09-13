import type { Faq } from "@/components/FaqSection";

/**
 * The B2B programme portfolio.
 *
 * Each programme is designed for a buyer market (see the Morocco Programme
 * Playbook) and sold white-label by travel agencies and tour operators.
 *
 * Rules for this file, the same as the rest of the site:
 *   - no drive times or distances: legs are timed only once logged in /routes
 *   - no retail prices: proposals are costed per departure from net rates
 *   - suppliers (hotels, camps, restaurants) are not named until contracted
 *   - guiding only in the languages PM Travel operates (see COMPANY.languages)
 *
 * A programme with `customPage` has its own hand-built page under
 * src/app/programmes and is excluded from the generated [slug] route.
 */

export type RouteStop = { place: string; nights: string };

export type ProgrammeDay = {
  day: string;
  title: string;
  place: string;
  body: string;
  overnight: string;
  imageKey?: string;
};

export type ProgrammeSpec = { requirement: string; answer: string; pending?: boolean };

export type Programme = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  summary: string;
  /** Renders with " | PM Travel Agency" appended, so keep it under 42 characters. */
  seoTitle: string;
  /** 155 characters or fewer. */
  seoDescription: string;
  markets: string[];
  groupType: string;
  guiding: string;
  hotels: string;
  format: string;
  days?: number;
  nights?: number;
  heroImage: string;
  cardImage: string;
  route: RouteStop[];
  highlights: string[];
  itinerary: ProgrammeDay[];
  idealFor: string[];
  buyers: string[];
  whyItSells: string[];
  includes: string[];
  options: string[];
  extraSpecs?: ProgrammeSpec[];
  faqs: Faq[];
  customPage?: boolean;
};

export const PROGRAMMES: Programme[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "taste-of-marrakech",
    code: "P4",
    name: "Taste of Marrakech",
    tagline: "Morocco Through the Table",
    summary:
      "A 7-night culinary journey through Marrakech, the Atlas Mountains, Agafay and Essaouira, with hands-on cooking, markets, mountain activities and curated dining.",
    seoTitle: "Taste of Marrakech Culinary Programme",
    seoDescription:
      "A 7-night B2B culinary programme around Marrakech, the Atlas, Agafay and Essaouira: hands-on cooking, markets, mountains and curated dining.",
    markets: ["USA", "UK", "Europe"],
    groupType: "FIT, small groups, incentives",
    guiding: "English, French, Italian or Spanish",
    hotels: "4★, 5★ and luxury versions",
    format: "8 days / 7 nights",
    days: 8,
    nights: 7,
    heroImage: "b1-marrakech-hero",
    cardImage: "b2-marrakech-medersa",
    route: [],
    highlights: [],
    itinerary: [],
    idealFor: [],
    buyers: [],
    whyItSells: [],
    includes: [],
    options: [],
    faqs: [],
    customPage: true,
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "maroc-en-liberte",
    code: "P1",
    name: "Maroc en Liberté",
    tagline: "Marrakech, Atlas & Océan",
    summary:
      "Three landscapes in one relaxed week: the Marrakech medina, a night in a High Atlas kasbah, a night under the Agafay sky and two days on the Atlantic in Essaouira, with a French-speaking host throughout.",
    seoTitle: "Maroc en Liberté: Atlas and Ocean",
    seoDescription:
      "An 8-day French-guided B2B programme: Marrakech, a High Atlas kasbah, an Agafay desert camp and Essaouira on the Atlantic. White-label for agencies.",
    markets: ["France", "Belgium", "Switzerland"],
    groupType: "FIT and small groups",
    guiding: "French-speaking host and guides",
    hotels: "Riads, mountain kasbah, desert camp; 4★ or 5★",
    format: "8 days / 7 nights",
    days: 8,
    nights: 7,
    heroImage: "b4-atlas-imlil",
    cardImage: "b4-atlas-imlil",
    route: [
      { place: "Marrakech", nights: "3N" },
      { place: "Imlil", nights: "1N" },
      { place: "Agafay", nights: "1N" },
      { place: "Essaouira", nights: "2N" },
    ],
    highlights: [
      "City, mountains, desert and ocean in eight days",
      "A night in an Atlas kasbah and a night in an Agafay camp",
      "French-speaking host from arrival to departure",
      "Free time built in, not squeezed out",
      "No long crossing days",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Bienvenue à Marrakech",
        place: "Marrakech",
        body: "A French-speaking host meets the group at the airport. Private transfer to a riad in the medina, mint tea on arrival and a first dinner on the terrace.",
        overnight: "Marrakech",
      },
      {
        day: "Day 2",
        title: "The essential Marrakech",
        place: "Marrakech",
        body: "Guided morning through the Koutoubia, the Bahia Palace, the souks and the artisans' quarters. Afternoon in the Majorelle Garden, evening on Jemaa el-Fna.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 3",
        title: "Marrakech at your own pace",
        place: "Marrakech",
        body: "A free day with ready-made suggestions: a hammam, a cooking class, the Yves Saint Laurent Museum, or a guided shopping walk on request.",
        overnight: "Marrakech",
        imageKey: "b2-marrakech-medersa",
      },
      {
        day: "Day 4",
        title: "High Atlas and Imlil",
        place: "Atlas Mountains",
        body: "Into the mountains for a welcome tea, a village walk with a mountain guide and lunch with a local family. Night in a mountain kasbah with views of the peaks.",
        overnight: "Imlil",
        imageKey: "b4-atlas-imlil",
      },
      {
        day: "Day 5",
        title: "The Agafay desert",
        place: "Agafay",
        body: "A slow morning in the valley, then down to Agafay's stone desert. Camel ride or walk at sunset, dinner under the stars and a night in camp.",
        overnight: "Agafay camp",
        imageKey: "b3b-agafay-camp",
      },
      {
        day: "Day 6",
        title: "To the Atlantic",
        place: "Essaouira",
        body: "The road west to the coast, with a stop at a women's argan cooperative. Afternoon on the ramparts and the Skala, dinner by the sea.",
        overnight: "Essaouira",
        imageKey: "b5-essaouira-port",
      },
      {
        day: "Day 7",
        title: "Essaouira, ocean day",
        place: "Essaouira",
        body: "The fishing port in the morning and a grilled-fish lunch, then a free afternoon on the beach or among the medina's woodworkers and galleries.",
        overnight: "Essaouira",
      },
      {
        day: "Day 8",
        title: "Au revoir",
        place: "Marrakech",
        body: "Transfer back to Marrakech airport, timed to the flight.",
        overnight: "—",
      },
    ],
    idealFor: ["Couples and friends", "First-time visitors to Morocco", "Travellers who want variety without long drives"],
    buyers: ["French agency networks", "Specialist tour operators", "Works-council (CSE) and association groups", "Belgian and Swiss agencies"],
    whyItSells: [
      "France is Morocco's largest market, 29% of 2025 arrivals.",
      "A short flight makes eight days an easy sell for spring, autumn and school holidays.",
      "It replaces the tiring imperial-cities loop that most catalogues repeat.",
    ],
    includes: [
      "7 nights: riad, mountain kasbah, desert camp and coastal hotel",
      "Breakfast daily, plus lunch with a local family and dinner in camp",
      "Airport and intercity transfers",
      "French-speaking host and guides on guided days",
      "Entrance fees for guided visits",
      "24-hour contact with our Marrakech office during the stay",
    ],
    options: [
      "Upgrade to 5★ riads and a premium camp",
      "Fully private version",
      "Hammam and spa package",
      "Moroccan cooking class in Marrakech",
      "Extra night in Essaouira",
    ],
    faqs: [
      {
        question: "Is the programme only for French-speaking clients?",
        answer:
          "It is designed for French-speaking markets, with a French-speaking host and guides. The same itinerary can run in English, Italian or Spanish for other markets.",
      },
      {
        question: "Can it run as a small group with fixed departures?",
        answer:
          "Yes. It works for FIT on any date and for small groups on fixed departures. Group size and departure dates are agreed per partner and season.",
      },
      {
        question: "How demanding is the Atlas day?",
        answer:
          "It is a village walk, not a trek. The mountain guide adapts the route to the group, and there is always a version for travellers who prefer to stay close to the village.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "ciudades-imperiales-y-desierto",
    code: "P2",
    name: "Ciudades Imperiales y Desierto",
    tagline: "Imperial Cities, Sahara & Marrakech",
    summary:
      "The classic Morocco circuit, built for Spanish groups and run properly: Casablanca, Rabat, Meknes and Fes, a night in the Merzouga dunes, the Dades gorges and Aït Ben Haddou, ending with two days in Marrakech.",
    seoTitle: "Imperial Cities and Desert for Spain",
    seoDescription:
      "A 9-day Spanish-guided B2B circuit: Casablanca, Rabat, Fes, a Merzouga desert camp, the Dades gorges, Aït Ben Haddou and Marrakech, for group series.",
    markets: ["Spain"],
    groupType: "Group series and guaranteed departures",
    guiding: "Spanish-speaking guide throughout",
    hotels: "4★ hotels, riad option, standard or premium desert camp",
    format: "9 days / 8 nights",
    days: 9,
    nights: 8,
    heroImage: "c7-ait-ben-haddou",
    cardImage: "b7-fes-medina",
    route: [
      { place: "Casablanca", nights: "1N" },
      { place: "Fes", nights: "2N" },
      { place: "Merzouga", nights: "1N" },
      { place: "Dades", nights: "1N" },
      { place: "Marrakech", nights: "3N" },
    ],
    highlights: [
      "All four imperial cities in one circuit",
      "A night in a camp in the Erg Chebbi dunes",
      "Dades and Todra gorges and the ksar of Aït Ben Haddou",
      "Spanish-speaking guide from the first day to the last",
      "Two full days to enjoy Marrakech at the end",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Casablanca",
        place: "Casablanca",
        body: "Arrival and transfer. Visit to the Hassan II Mosque and a drive along the Corniche, welcome dinner.",
        overnight: "Casablanca",
        imageKey: "c1-casablanca-sea",
      },
      {
        day: "Day 2",
        title: "Rabat, Meknes and Volubilis",
        place: "Rabat · Meknes",
        body: "The Kasbah of the Udayas and the Hassan Tower in Rabat, the Roman ruins of Volubilis and the monumental gates of Meknes, then on to Fes.",
        overnight: "Fes",
        imageKey: "c2-rabat-hassan-tower",
      },
      {
        day: "Day 3",
        title: "Fes el-Bali",
        place: "Fes",
        body: "A full day in the world's largest living medina: the tanneries, the Bou Inania medersa, the craftsmen's souks and the royal palace gates.",
        overnight: "Fes",
        imageKey: "b7-fes-medina",
      },
      {
        day: "Day 4",
        title: "Across the Middle Atlas to the Sahara",
        place: "Ifrane · Merzouga",
        body: "Through the cedar forests and Ifrane, down the Ziz valley to Merzouga. Camel ride into the dunes at sunset and dinner in camp.",
        overnight: "Merzouga camp",
        imageKey: "b9-erg-chebbi-camels",
      },
      {
        day: "Day 5",
        title: "Sunrise, Rissani and the gorges",
        place: "Todra · Dades",
        body: "Sunrise over the dunes, the market town of Rissani, a walk in the Todra Gorge and the road into the Dades valley.",
        overnight: "Dades",
        imageKey: "c8-dades-gorge",
      },
      {
        day: "Day 6",
        title: "Road of the kasbahs to Marrakech",
        place: "Aït Ben Haddou",
        body: "The Valley of Roses, Ouarzazate and a guided visit to the ksar of Aït Ben Haddou, then over the High Atlas to Marrakech.",
        overnight: "Marrakech",
        imageKey: "c7-ait-ben-haddou",
      },
      {
        day: "Day 7",
        title: "Marrakech",
        place: "Marrakech",
        body: "Guided visit to the Koutoubia, the Bahia Palace, the souks and the Majorelle Garden. Evening on Jemaa el-Fna.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 8",
        title: "Free day in Marrakech",
        place: "Marrakech",
        body: "Free day for shopping, a hammam or an optional excursion to Essaouira or the Atlas. Farewell dinner.",
        overnight: "Marrakech",
      },
      {
        day: "Day 9",
        title: "Departure",
        place: "Marrakech",
        body: "Transfer to Marrakech airport.",
        overnight: "—",
      },
    ],
    idealFor: ["Groups on a first trip to Morocco", "Senior and association groups", "Travellers who want the complete classic circuit"],
    buyers: ["Spanish high-street agency networks", "Group wholesalers", "Senior and association travel programmes"],
    whyItSells: [
      "Spain is Morocco's second-largest market, 23% of 2025 arrivals.",
      "The circuit Spanish buyers already recognise, delivered with dependable group logistics.",
      "The long southern days are where our backup planning and honest timings protect your groups.",
    ],
    includes: [
      "8 nights in 4★ hotels and a desert camp",
      "Half board throughout",
      "Air-conditioned coach or minibus matched to group size",
      "Spanish-speaking guide throughout",
      "Camel ride in Merzouga and guided visits with entrance fees",
      "Airport transfers on arrival and departure",
    ],
    options: [
      "Premium desert camp",
      "Riads in Fes and Marrakech",
      "Chefchaouen extension (1 night)",
      "Essaouira extension (2 nights)",
      "Cooking class or hammam in Marrakech",
    ],
    extraSpecs: [
      { requirement: "Long road days", answer: "Days 4 to 6 are long travel days; we plan stops and a backup for each" },
    ],
    faqs: [
      {
        question: "Is this a coach tour for large groups?",
        answer:
          "It is built for group series. Vehicle size is matched to the group, and the programme also runs for smaller guaranteed departures.",
      },
      {
        question: "How long are the driving days in the south?",
        answer:
          "Days 4 to 6 are long travel days, which is the nature of this circuit. We will give measured timings only once our drivers have logged these legs; until then proposals state that verification is in progress.",
      },
      {
        question: "Can the circuit start in Marrakech instead of Casablanca?",
        answer:
          "Yes. The loop can run in either direction depending on flight availability for your market.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "private-grand-journey",
    code: "P3",
    name: "Morocco Private Grand Journey",
    tagline: "Imperial Cities, Sahara & Marrakech, Privately",
    summary:
      "An 11-day private journey for luxury advisors: Fes with a private guide, two unhurried nights in a luxury Erg Chebbi camp, a boutique kasbah in the Skoura palm grove and a Marrakech finale, all by private vehicle.",
    seoTitle: "Morocco Private Grand Journey",
    seoDescription:
      "An 11-day private B2B journey for luxury advisors: Casablanca, Fes, a luxury Sahara camp, the Dades valley, Aït Ben Haddou and Marrakech.",
    markets: ["USA", "Canada"],
    groupType: "Private departures, couples to small families",
    guiding: "English-speaking private guides and driver",
    hotels: "5★ hotels, palace riads, luxury desert camp, boutique kasbah",
    format: "11 days / 10 nights",
    days: 11,
    nights: 10,
    heroImage: "b9-erg-chebbi-camels",
    cardImage: "b9-erg-chebbi-camels",
    route: [
      { place: "Casablanca", nights: "1N" },
      { place: "Fes", nights: "3N" },
      { place: "Merzouga", nights: "2N" },
      { place: "Skoura", nights: "1N" },
      { place: "Marrakech", nights: "3N" },
    ],
    highlights: [
      "Private vehicle and guides for the whole journey",
      "Two nights in a luxury camp in the Erg Chebbi dunes",
      "Private guided Fes and a day at Volubilis",
      "A boutique kasbah night in the Skoura palm grove",
      "Cooking class, hammam and a farewell dinner in Marrakech",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Casablanca",
        place: "Casablanca",
        body: "Private meet and assist at Mohammed V airport. Guided visit to the Hassan II Mosque and dinner on the Corniche.",
        overnight: "Casablanca",
        imageKey: "c1-casablanca-sea",
      },
      {
        day: "Day 2",
        title: "Rabat, the capital, to Fes",
        place: "Rabat",
        body: "The Kasbah of the Udayas, the Hassan Tower and the Mausoleum of Mohammed V, then on to a palace riad in Fes.",
        overnight: "Fes",
        imageKey: "c2-rabat-hassan-tower",
      },
      {
        day: "Day 3",
        title: "Fes el-Bali with a private guide",
        place: "Fes",
        body: "The medina at an unhurried pace: the tanneries, the Bou Inania medersa, master artisans at work, and a private dinner in a riad.",
        overnight: "Fes",
        imageKey: "b7-fes-medina",
      },
      {
        day: "Day 4",
        title: "Volubilis and Meknes",
        place: "Volubilis · Meknes",
        body: "The Roman mosaics of Volubilis, the imperial gates of Meknes and lunch in a family home in the countryside.",
        overnight: "Fes",
        imageKey: "b7b-fes-alley",
      },
      {
        day: "Day 5",
        title: "To the Sahara",
        place: "Merzouga",
        body: "Through the cedar forests of the Middle Atlas and the Ziz valley, then by private 4x4 into Erg Chebbi and a luxury camp.",
        overnight: "Merzouga luxury camp",
        imageKey: "b9-erg-chebbi-camels",
      },
      {
        day: "Day 6",
        title: "A full day in the dunes",
        place: "Erg Chebbi",
        body: "Sunrise from the crest, Gnaoua music at Khamlia, a visit to a nomad family and a sunset camel ride before dinner under the stars.",
        overnight: "Merzouga luxury camp",
        imageKey: "b6-merzouga",
      },
      {
        day: "Day 7",
        title: "Todra, Dades and Skoura",
        place: "Dades Valley",
        body: "A walk in the Todra Gorge, the road through the Dades valley and a night in a boutique kasbah in the Skoura palm grove.",
        overnight: "Skoura",
        imageKey: "c8-dades-gorge",
      },
      {
        day: "Day 8",
        title: "Aït Ben Haddou and the High Atlas",
        place: "Aït Ben Haddou",
        body: "A private guided visit to the ksar, lunch in a kasbah, then over the Tizi n'Tichka pass to Marrakech.",
        overnight: "Marrakech",
        imageKey: "c7-ait-ben-haddou",
      },
      {
        day: "Day 9",
        title: "Private Marrakech",
        place: "Marrakech",
        body: "The Bahia Palace and the souks with a private guide and a personal shopper, the Majorelle Garden, and dinner on a rooftop.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 10",
        title: "Marrakech, your way",
        place: "Marrakech",
        body: "A choice of a private cooking class, a hammam ritual or lunch in the Atlas foothills, then a farewell dinner.",
        overnight: "Marrakech",
        imageKey: "b2-marrakech-medersa",
      },
      {
        day: "Day 11",
        title: "Departure",
        place: "Marrakech",
        body: "Private transfer to Marrakech airport.",
        overnight: "—",
      },
    ],
    idealFor: ["Couples and honeymooners", "Travellers 45+ seeking comfort and depth", "Small private families"],
    buyers: ["Luxury travel advisors and host agencies", "Virtuoso-type advisor networks", "US and Canadian specialist tour operators"],
    whyItSells: [
      "Luxury advisors ranked Morocco among their top five destinations for 2026.",
      "Advisors get a private departure under their own brand, below the price point of the big-name small groups.",
      "Two nights in the desert and three in Fes remove the rushed feeling of most grand tours.",
    ],
    includes: [
      "10 nights in 5★ hotels, palace riads, a luxury camp and a boutique kasbah",
      "Breakfast daily and selected lunches and dinners",
      "Private vehicle and driver throughout, private 4x4 in the desert",
      "Private English-speaking guides in each city",
      "Meet and assist on arrival and departure",
      "Entrance fees, camel ride and all activities listed",
    ],
    options: [
      "Domestic flight to shorten the Fes to desert or desert to Marrakech leg",
      "Hot-air balloon flight over the Marrakech plains",
      "Extension to Essaouira or the Atlas Mountains",
      "Private photographer for a day",
      "Upgrade to palace hotels in Marrakech",
    ],
    faqs: [
      {
        question: "Is the journey fully private?",
        answer:
          "Yes. Vehicle, driver and guides are private for the whole journey, and dates are set by the client.",
      },
      {
        question: "Can the long driving days be shortened?",
        answer:
          "Yes. A domestic flight can replace one of the long road legs, depending on the schedule for the travel dates. We set out both versions in the proposal.",
      },
      {
        question: "Which hotels are included?",
        answer:
          "Properties are confirmed per departure from our selected shortlist, matched to the client's budget and availability, and named in the proposal.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "mountains-and-sahara-modules",
    code: "P5",
    name: "Marrakech, Mountains & Sahara Modules",
    tagline: "Building Blocks for Tailor-Made Morocco",
    summary:
      "Six ground modules that tailor-made specialists combine into bespoke trips: a Marrakech base, an Atlas retreat, an Agafay night, a deep Sahara loop, the Atlantic coast and a Toubkal weekend.",
    seoTitle: "Marrakech, Mountains and Sahara Modules",
    seoDescription:
      "Six tailor-made Morocco modules for UK and Irish specialists: Marrakech, the Atlas, Agafay, the Sahara, Essaouira and a Toubkal ascent.",
    markets: ["UK", "Ireland"],
    groupType: "Tailor-made FIT and private groups",
    guiding: "English-speaking guides",
    hotels: "Riads, mountain lodges, desert camps; 4★ to luxury",
    format: "Combine 5 to 12 nights",
    heroImage: "b3-agafay",
    cardImage: "b3-agafay",
    route: [
      { place: "Marrakech", nights: "2–3N" },
      { place: "Atlas", nights: "2N" },
      { place: "Agafay", nights: "1N" },
      { place: "Sahara", nights: "2N" },
      { place: "Essaouira", nights: "2N" },
    ],
    highlights: [
      "Six modules, each ready to quote on its own",
      "Consistent service status on every line, whatever the combination",
      "Short-trip desert in Agafay or the deep Sahara in Erg Chebbi",
      "An active Toubkal weekend for adventure clients",
      "One Marrakech office behind every module",
    ],
    itinerary: [
      {
        day: "Module A",
        title: "Marrakech Base",
        place: "2–3 nights",
        body: "A riad in the medina, a private guided day through the palaces and souks, the Majorelle Garden and an evening food walk.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Module B",
        title: "Atlas Retreat",
        place: "2 nights",
        body: "A mountain lodge in the Imlil valley with guided walks graded to the client, a village lunch and time to do nothing at all.",
        overnight: "Imlil valley",
        imageKey: "b4-atlas-imlil",
      },
      {
        day: "Module C",
        title: "Agafay Night",
        place: "1 night",
        body: "The desert for short trips: afternoon arrival, sunset over the stone desert, dinner under the stars and a night in camp.",
        overnight: "Agafay camp",
        imageKey: "b3b-agafay-camp",
      },
      {
        day: "Module D",
        title: "Sahara Deep",
        place: "3 nights",
        body: "Over the High Atlas via Aït Ben Haddou and the Dades valley to two nights in an Erg Chebbi camp, with a return through the gorges.",
        overnight: "Dades · Merzouga camp",
        imageKey: "b9-erg-chebbi-camels",
      },
      {
        day: "Module E",
        title: "Atlantic Coast",
        place: "2 nights",
        body: "A riad in Essaouira: the port, the ramparts, the beach and the medina's galleries, at the slower pace of the coast.",
        overnight: "Essaouira",
        imageKey: "b5-essaouira-port",
      },
      {
        day: "Module F",
        title: "Toubkal Weekend",
        place: "3 nights",
        body: "A guided ascent of Jebel Toubkal, North Africa's highest peak at 4,167 m, with a night at the mountain refuge and a lodge night either side.",
        overnight: "Imlil · Toubkal refuge",
        imageKey: "c6b-ouarzazate-village",
      },
    ],
    idealFor: ["Tailor-made couples and families", "Active clients adding a trek", "Repeat visitors who know what they want"],
    buyers: ["UK tailor-made specialists", "Adventure and walking travel brands", "Irish tour operators"],
    whyItSells: [
      "UK arrivals to Morocco grew 18% in 2025.",
      "UK specialists build bespoke trips; they need reliable blocks with clear service status, not fixed tours.",
      "The same modules serve a long weekend or a two-week itinerary.",
    ],
    includes: [
      "Accommodation as specified in each module",
      "Breakfast daily; dinner in camps and lodges",
      "Private transfers between modules",
      "English-speaking guides on guided days",
      "Mountain guide and refuge for the Toubkal module",
    ],
    options: [
      "Classic week: A (3N) + B (2N) + C (1N) + transfer day",
      "Grand fortnight: A (3N) + D (3N) + B (2N) + E (2N) + A (2N)",
      "Active week: A (2N) + F (3N) + C (1N)",
      "Upgrade any module to luxury properties",
      "Add a cooking class, hammam or hot-air balloon flight",
    ],
    extraSpecs: [
      { requirement: "Toubkal module", answer: "Requires good fitness; season and conditions are checked before confirming" },
    ],
    faqs: [
      {
        question: "Can we sell the modules under our own itinerary names?",
        answer:
          "Yes. The modules are ground building blocks; the itinerary, name and brand are yours.",
      },
      {
        question: "Is the Toubkal ascent suitable for everyone?",
        answer:
          "No. It is a demanding high-altitude trek that needs good fitness. We check the season and conditions before confirming and offer the Atlas Retreat as the gentler alternative.",
      },
      {
        question: "Can modules be quoted separately?",
        answer:
          "Yes. Each module is quoted on its own and combined in one proposal, with a service status on every line.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "citta-imperiali-e-deserto",
    code: "P6",
    name: "Città Imperiali, Chefchaouen & Deserto",
    tagline: "Imperial Cities, the Blue Town & the Sahara",
    summary:
      "A 9-day Italian-guided circuit that goes beyond the imperial cities most catalogues stop at: Chefchaouen in the Rif, Fes, a night in the Merzouga dunes, the Dades valley and Marrakech.",
    seoTitle: "Imperial Cities and Desert for Italy",
    seoDescription:
      "A 9-day Italian-guided B2B circuit: Casablanca, Rabat, Chefchaouen, Fes, a Merzouga desert camp, the Dades valley and Marrakech.",
    markets: ["Italy"],
    groupType: "Groups and guaranteed departures",
    guiding: "Italian-speaking guide throughout",
    hotels: "4★ hotels and riads, desert camp",
    format: "9 days / 8 nights",
    days: 9,
    nights: 8,
    heroImage: "c4-chefchaouen",
    cardImage: "c4-chefchaouen",
    route: [
      { place: "Casablanca", nights: "1N" },
      { place: "Chefchaouen", nights: "1N" },
      { place: "Fes", nights: "2N" },
      { place: "Merzouga", nights: "1N" },
      { place: "Dades", nights: "1N" },
      { place: "Marrakech", nights: "2N" },
    ],
    highlights: [
      "The imperial cities plus Chefchaouen, the blue town",
      "A night in the Merzouga dunes",
      "Italian-speaking guide throughout",
      "Volubilis, the Roman city of Morocco",
      "Aït Ben Haddou and the road of the kasbahs",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Casablanca",
        place: "Casablanca",
        body: "Arrival, the Hassan II Mosque and the Corniche, welcome dinner.",
        overnight: "Casablanca",
        imageKey: "c1b-casablanca-mosque",
      },
      {
        day: "Day 2",
        title: "Rabat to the blue town",
        place: "Rabat · Chefchaouen",
        body: "Rabat's kasbah and the Hassan Tower, then north into the Rif mountains to Chefchaouen for the evening light.",
        overnight: "Chefchaouen",
        imageKey: "c4-chefchaouen",
      },
      {
        day: "Day 3",
        title: "Chefchaouen, Volubilis and Meknes",
        place: "Chefchaouen · Meknes",
        body: "An early walk through the quiet blue alleys, the Roman ruins of Volubilis, the gates of Meknes and on to Fes.",
        overnight: "Fes",
        imageKey: "c4b-chefchaouen-steps",
      },
      {
        day: "Day 4",
        title: "Fes el-Bali",
        place: "Fes",
        body: "A full guided day in the medina: tanneries, medersas, artisans and souks.",
        overnight: "Fes",
        imageKey: "b7-fes-medina",
      },
      {
        day: "Day 5",
        title: "To the Sahara",
        place: "Merzouga",
        body: "Across the Middle Atlas and down the Ziz valley to Merzouga, a camel ride at sunset and a night in camp.",
        overnight: "Merzouga camp",
        imageKey: "b6-merzouga",
      },
      {
        day: "Day 6",
        title: "Dunes and gorges",
        place: "Todra · Dades",
        body: "Sunrise in the dunes, the Todra Gorge and the Dades valley.",
        overnight: "Dades",
        imageKey: "c8b-dades-hairpins",
      },
      {
        day: "Day 7",
        title: "Aït Ben Haddou to Marrakech",
        place: "Aït Ben Haddou",
        body: "Ouarzazate and the ksar of Aït Ben Haddou, then over the High Atlas to Marrakech.",
        overnight: "Marrakech",
        imageKey: "c7b-ait-ben-haddou-ksar",
      },
      {
        day: "Day 8",
        title: "Marrakech",
        place: "Marrakech",
        body: "The Koutoubia, the Bahia Palace, the souks and the Majorelle Garden, with a farewell dinner.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 9",
        title: "Departure",
        place: "Marrakech",
        body: "Transfer to Marrakech airport.",
        overnight: "—",
      },
    ],
    idealFor: ["Italian groups on a first trip to Morocco", "Culture and photography lovers", "Travellers who want the desert without a two-week trip"],
    buyers: ["Italian tour operators with Morocco product managers", "Group and association agencies", "Guaranteed-departure catalogues"],
    whyItSells: [
      "Italian catalogues mostly stop at the imperial cities; this adds Chefchaouen and the desert.",
      "One extra day compared with a 7 or 8-day imperial circuit, with far more to sell.",
      "Italian-speaking guiding is operated by our own team, not subcontracted.",
    ],
    includes: [
      "8 nights in 4★ hotels, riads and a desert camp",
      "Half board throughout",
      "Coach or minibus matched to group size",
      "Italian-speaking guide throughout",
      "Guided visits with entrance fees and camel ride",
      "Airport transfers",
    ],
    options: [
      "Premium desert camp",
      "Essaouira extension (2 nights)",
      "Cooking class in Fes or Marrakech",
      "Upgrade to 5★ hotels",
    ],
    faqs: [
      {
        question: "Why include Chefchaouen?",
        answer:
          "It is one of the most requested names in Morocco, and on this route it costs only one night. An evening and early morning there show it at its quietest.",
      },
      {
        question: "Can the programme run with fewer days?",
        answer:
          "Yes. A 7-night version removes the Dades night and returns to Marrakech on day 6, with longer driving that day.",
      },
      {
        question: "Is the guide the same for the whole circuit?",
        answer:
          "Yes, one Italian-speaking guide accompanies the group throughout, with local guides in the medinas where required.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "three-generations",
    code: "P7",
    name: "Morocco for Three Generations",
    tagline: "A Family Journey at Everyone's Pace",
    summary:
      "An 8-day private family programme with short drives and no one-night stops: Marrakech with a family guide, an Atlas lodge with a pool, a night in an Agafay camp and a day on the beach in Essaouira.",
    seoTitle: "Morocco for Three Generations",
    seoDescription:
      "An 8-day private Morocco programme for multigenerational families: Marrakech, an Atlas lodge, an Agafay desert camp and Essaouira, with short drives.",
    markets: ["USA", "Canada", "UK"],
    groupType: "Private families, 4 to 16 travellers",
    guiding: "English, French, Italian or Spanish",
    hotels: "Family riads and suites, Atlas lodge with pool, family tents",
    format: "8 days / 7 nights",
    days: 8,
    nights: 7,
    heroImage: "b3b-agafay-camp",
    cardImage: "b5-essaouira-port",
    route: [
      { place: "Marrakech", nights: "3N" },
      { place: "Atlas", nights: "2N" },
      { place: "Agafay", nights: "1N" },
      { place: "Essaouira", nights: "1N" },
    ],
    highlights: [
      "Short drives and no one-night stops before the desert",
      "A family guide who plans around children and grandparents",
      "Kids' cooking class and a souk treasure hunt",
      "Camels, a family tent and dinner under the stars in Agafay",
      "One coordinator for the whole family",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Welcome to Marrakech",
        place: "Marrakech",
        body: "Private arrival with child seats ready, a riad with family suites, mint tea and an early family dinner.",
        overnight: "Marrakech",
      },
      {
        day: "Day 2",
        title: "The souk treasure hunt",
        place: "Marrakech",
        body: "A family guide turns the souks into a treasure hunt, then the Majorelle Garden and a pool afternoon at the riad.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 3",
        title: "Cooks and kings",
        place: "Marrakech",
        body: "A kids' cooking class in the morning while the adults enjoy a hammam, then the Bahia Palace in the gentle late-afternoon light.",
        overnight: "Marrakech",
        imageKey: "b2-marrakech-medersa",
      },
      {
        day: "Day 4",
        title: "Up to the mountains",
        place: "Atlas Mountains",
        body: "A short drive into the Atlas to a lodge with a pool, and a mule-assisted walk to a nearby village.",
        overnight: "Atlas lodge",
        imageKey: "b4-atlas-imlil",
      },
      {
        day: "Day 5",
        title: "A day in the valley",
        place: "Atlas Mountains",
        body: "A picnic by the river, a visit to a women's weaving cooperative and free time at the lodge for the grandparents.",
        overnight: "Atlas lodge",
      },
      {
        day: "Day 6",
        title: "Camels and stars",
        place: "Agafay",
        body: "Down to Agafay for camel rides, games in the stone desert, a family dinner under the stars and a night in family tents.",
        overnight: "Agafay camp",
        imageKey: "b3b-agafay-camp",
      },
      {
        day: "Day 7",
        title: "The Atlantic",
        place: "Essaouira",
        body: "The fishing port with its blue boats, a beach afternoon and a seafood dinner.",
        overnight: "Essaouira",
        imageKey: "b5-essaouira-port",
      },
      {
        day: "Day 8",
        title: "Home",
        place: "Marrakech",
        body: "Transfer to Marrakech airport, timed to the flight.",
        overnight: "—",
      },
    ],
    idealFor: ["Grandparents travelling with children and grandchildren", "Families with children from 5 years", "Family celebrations and milestone trips"],
    buyers: ["Luxury and family travel advisors", "Family travel specialists", "Advisor networks focused on multigenerational trips"],
    whyItSells: [
      "Family and multigenerational travel are the top two luxury trends for 2026 in Virtuoso's advisor survey.",
      "Short drives and flexible days solve the two things families worry about most.",
      "One coordinator handles mobility, children's meals and rooming for the whole family.",
    ],
    includes: [
      "7 nights in family riads, an Atlas lodge, a family camp and a coastal hotel",
      "Breakfast daily and selected family lunches and dinners",
      "Private vehicle with child seats and a driver throughout",
      "Family guide in Marrakech and the Atlas",
      "Kids' cooking class, treasure hunt, camel rides and mule-assisted walk",
    ],
    options: [
      "Extra night on the coast",
      "Private chef dinner at the riad",
      "Babysitting on request",
      "Hot-air balloon flight for older children and adults",
    ],
    extraSpecs: [
      { requirement: "Children", answer: "Child seats, family rooms and children's menus arranged per departure" },
      { requirement: "Mobility", answer: "A lower-walking version for older or less mobile travellers" },
    ],
    faqs: [
      {
        question: "What age is the programme suitable for?",
        answer:
          "It is designed for children from about five years old, and for grandparents who prefer short walks. Each activity has a gentler version.",
      },
      {
        question: "Can less mobile family members join everything?",
        answer:
          "Most of it. We plan a lower-walking version of the medina days and the Atlas walk, so nobody is left waiting.",
      },
      {
        question: "How large can the family group be?",
        answer:
          "From four to about sixteen travellers. Riads are selected so the whole family can stay together.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "jewish-heritage",
    code: "P8",
    name: "Jewish Heritage of Morocco",
    tagline: "Mellahs, Synagogues & Living Memory",
    summary:
      "A 10-day heritage journey through two thousand years of Jewish life in Morocco: Casablanca's museum and synagogues, the Fes mellah and Sefrou, Marrakech, and the House of Memory in Essaouira.",
    seoTitle: "Jewish Heritage of Morocco Programme",
    seoDescription:
      "A 10-day B2B Jewish heritage programme: Casablanca, Rabat, Fes and Sefrou, Marrakech and Essaouira, with kosher and Shabbat options.",
    markets: ["USA", "Canada", "UK"],
    groupType: "Community groups, private families and FIT",
    guiding: "English or French-speaking heritage guides",
    hotels: "4★ and 5★ hotels and riads",
    format: "10 days / 9 nights",
    days: 10,
    nights: 9,
    heroImage: "b7b-fes-alley",
    cardImage: "b7b-fes-alley",
    route: [
      { place: "Casablanca", nights: "2N" },
      { place: "Fes", nights: "3N" },
      { place: "Marrakech", nights: "2N" },
      { place: "Essaouira", nights: "2N" },
    ],
    highlights: [
      "The Museum of Moroccan Judaism in Casablanca",
      "The Fes mellah, the Ibn Danan Synagogue and Sefrou",
      "The Lazama Synagogue in the Marrakech mellah",
      "Bayt Dakira, the House of Memory in Essaouira",
      "Kosher meal and Shabbat arrangements available",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Casablanca",
        place: "Casablanca",
        body: "Meet and assist at the airport, check-in, welcome dinner with a kosher option.",
        overnight: "Casablanca",
      },
      {
        day: "Day 2",
        title: "Jewish Casablanca",
        place: "Casablanca",
        body: "The Museum of Moroccan Judaism, Temple Beth-El and the old mellah, with the Hassan II Mosque in the afternoon.",
        overnight: "Casablanca",
        imageKey: "c1-casablanca-sea",
      },
      {
        day: "Day 3",
        title: "Rabat to Fes",
        place: "Rabat",
        body: "The Rabat mellah and the Kasbah of the Udayas, then on to Fes.",
        overnight: "Fes",
        imageKey: "c2-rabat-hassan-tower",
      },
      {
        day: "Day 4",
        title: "The Fes mellah",
        place: "Fes",
        body: "The Ibn Danan Synagogue, the Jewish cemetery and the mellah's streets, then the heart of the medina.",
        overnight: "Fes",
        imageKey: "b7-fes-medina",
      },
      {
        day: "Day 5",
        title: "Sefrou, Little Jerusalem",
        place: "Sefrou",
        body: "A day in Sefrou, once home to one of Morocco's largest Jewish communities, and its long history of shared life.",
        overnight: "Fes",
        imageKey: "b7b-fes-alley",
      },
      {
        day: "Day 6",
        title: "To Marrakech",
        place: "Marrakech",
        body: "Transfer to Marrakech by road or train, with Shabbat arrangements planned around the day where required.",
        overnight: "Marrakech",
      },
      {
        day: "Day 7",
        title: "The Marrakech mellah",
        place: "Marrakech",
        body: "The Lazama Synagogue, the Miara Jewish cemetery and the spice market of the mellah, then the Bahia Palace.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 8",
        title: "Essaouira, the city of merchants",
        place: "Essaouira",
        body: "The road to the Atlantic and Bayt Dakira, the House of Memory, dedicated to the city's Jewish and Muslim coexistence.",
        overnight: "Essaouira",
        imageKey: "b5-essaouira-port",
      },
      {
        day: "Day 9",
        title: "Heritage by the sea",
        place: "Essaouira",
        body: "The old mellah, the Jewish cemetery and the ramparts, and a farewell dinner.",
        overnight: "Essaouira",
      },
      {
        day: "Day 10",
        title: "Departure",
        place: "Marrakech",
        body: "Transfer to Marrakech airport.",
        overnight: "—",
      },
    ],
    idealFor: ["Synagogue and community groups", "Families tracing Moroccan roots", "Travellers interested in shared Jewish and Muslim history"],
    buyers: ["Jewish heritage tour operators", "Community and synagogue travel organisers", "Advisors serving heritage and roots travellers"],
    whyItSells: [
      "An established niche in North America with repeat group demand.",
      "Kosher dining and Shabbat logistics decide whether a ground partner is trusted, and we plan them from the start.",
      "It combines heritage sites with the Morocco highlights clients also want to see.",
    ],
    includes: [
      "9 nights in 4★ or 5★ hotels and riads",
      "Breakfast daily and a welcome and farewell dinner",
      "Private vehicle and driver throughout",
      "Specialist heritage guides in each city",
      "Entrance fees to synagogues, museums and sites listed",
    ],
    options: [
      "Fully kosher meal plan",
      "Shabbat programme with local communities where available",
      "Roots research support for family history",
      "Extension to Tangier or Tetouan",
      "Upgrade to 5★ throughout",
    ],
    extraSpecs: [
      { requirement: "Kosher dining", answer: "Kosher meals through specialist suppliers, confirmed per departure", pending: true },
      { requirement: "Shabbat", answer: "Arranged with local communities where available", pending: true },
    ],
    faqs: [
      {
        question: "Can the whole programme be kosher?",
        answer:
          "Kosher meals can be arranged through specialist suppliers. Availability varies by city, so the meal plan is confirmed for each departure and stated in the proposal.",
      },
      {
        question: "Is Shabbat observed during the programme?",
        answer:
          "The itinerary can be arranged so that no travel falls on Shabbat, and services with local communities are arranged where available.",
      },
      {
        question: "Can the itinerary include a family's hometown?",
        answer:
          "Often yes. Tell us the town and we will say whether it can be included and how it changes the route.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "kasbahs-et-oasis",
    code: "P9",
    name: "Kasbahs et Oasis en 4x4",
    tagline: "The Deep South, Premium & Small Group",
    summary:
      "An 11-day premium small-group journey by 4x4 for French-speaking travellers: the Tichka pass, Aït Ben Haddou, the Dades and Todra gorges, two nights in the Erg Chebbi dunes, the Draa valley palm groves and Agafay.",
    seoTitle: "Kasbahs and Oases 4x4 Journey",
    seoDescription:
      "An 11-day premium French-guided 4x4 journey for small groups: Aït Ben Haddou, Dades, Erg Chebbi, the Draa valley, Agafay and Marrakech.",
    markets: ["Canada (Québec)", "France"],
    groupType: "Premium small groups, up to 16 travellers",
    guiding: "French-speaking guide throughout",
    hotels: "5★ and boutique hotels, kasbahs, premium desert camp",
    format: "11 days / 10 nights",
    days: 11,
    nights: 10,
    heroImage: "c8-dades-gorge",
    cardImage: "c6-ouarzazate-kasbah",
    route: [
      { place: "Marrakech", nights: "2N" },
      { place: "Ouarzazate", nights: "1N" },
      { place: "Dades", nights: "1N" },
      { place: "Merzouga", nights: "2N" },
      { place: "Zagora", nights: "1N" },
      { place: "Agafay", nights: "1N" },
      { place: "Marrakech", nights: "2N" },
    ],
    highlights: [
      "4x4 vehicles with at most four travellers each",
      "Two nights in a premium Erg Chebbi camp",
      "Off-road tracks to the Draa valley palm groves",
      "Kasbah nights in Ouarzazate and the Dades",
      "Gastronomy and a gala farewell in Marrakech",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrivée à Marrakech",
        place: "Marrakech",
        body: "Airport welcome with the French-speaking guide, a boutique hotel and a welcome dinner.",
        overnight: "Marrakech",
      },
      {
        day: "Day 2",
        title: "Marrakech",
        place: "Marrakech",
        body: "Palaces, souks and the Majorelle Garden, with a dinner of Moroccan gastronomy.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 3",
        title: "The Tichka pass by 4x4",
        place: "Aït Ben Haddou",
        body: "Over the High Atlas by 4x4, a guided visit to Aït Ben Haddou and a night in a kasbah near Ouarzazate.",
        overnight: "Ouarzazate",
        imageKey: "c6-ouarzazate-kasbah",
      },
      {
        day: "Day 4",
        title: "Skoura, the Valley of Roses and the Dades",
        place: "Dades Valley",
        body: "The palm grove of Skoura, the Valley of Roses and the gorge road of the Dades.",
        overnight: "Dades",
        imageKey: "c8-dades-gorge",
      },
      {
        day: "Day 5",
        title: "Todra to the dunes",
        place: "Merzouga",
        body: "A walk in the Todra Gorge, then east to a premium camp in Erg Chebbi.",
        overnight: "Merzouga camp",
        imageKey: "b9-erg-chebbi-camels",
      },
      {
        day: "Day 6",
        title: "A day in Erg Chebbi",
        place: "Erg Chebbi",
        body: "Sunrise over the dunes, Gnaoua music at Khamlia, a 4x4 loop around the erg and a sunset camel ride.",
        overnight: "Merzouga camp",
        imageKey: "b6-merzouga",
      },
      {
        day: "Day 7",
        title: "Tracks to the Draa valley",
        place: "Zagora",
        body: "Off-road tracks south and west through remote villages to the Draa valley, and the pottery of Tamegroute.",
        overnight: "Zagora",
        imageKey: "c9-zagora-dunes",
      },
      {
        day: "Day 8",
        title: "Palm groves and back over the Atlas",
        place: "Draa · Agafay",
        body: "The Draa valley palm groves and Agdz, then over the Atlas to an Agafay camp for a night under the stars.",
        overnight: "Agafay camp",
        imageKey: "b3b-agafay-camp",
      },
      {
        day: "Day 9",
        title: "Return to Marrakech",
        place: "Marrakech",
        body: "A slow morning in the desert, then Marrakech and an evening of fine Moroccan dining.",
        overnight: "Marrakech",
        imageKey: "b2-marrakech-medersa",
      },
      {
        day: "Day 10",
        title: "Hammam and gala farewell",
        place: "Marrakech",
        body: "A free morning, a hammam ritual and a gala farewell dinner.",
        overnight: "Marrakech",
      },
      {
        day: "Day 11",
        title: "Départ",
        place: "Marrakech",
        body: "Transfer to Marrakech airport.",
        overnight: "—",
      },
    ],
    idealFor: ["Experienced travellers who have seen the imperial cities", "Couples and friends seeking adventure in comfort", "Photography lovers"],
    buyers: ["Québec tour operators and premium agencies", "French adventure-in-comfort specialists", "Small-group travel clubs"],
    whyItSells: [
      "Premium 4x4 small groups capped at 16 are already selling in Québec for 2026.",
      "It sells the deep south that grand tours rush through.",
      "French-speaking guiding throughout, operated by our own team.",
    ],
    includes: [
      "10 nights in 5★ and boutique hotels, kasbahs and premium camps",
      "Full board in the south, half board in Marrakech",
      "4x4 vehicles with experienced drivers, maximum four travellers per vehicle",
      "French-speaking guide throughout",
      "Guided visits, camel ride, music evening and hammam",
      "Airport transfers",
    ],
    options: [
      "Private departure for a single group",
      "Extension to Essaouira (2 nights)",
      "Premium luxury camp upgrade",
      "Photography guide for the south",
    ],
    extraSpecs: [
      { requirement: "Off-road days", answer: "Days 7 and 8 include tracks; routes are confirmed against season and conditions" },
    ],
    faqs: [
      {
        question: "How many travellers per 4x4?",
        answer:
          "A maximum of four, so every traveller has a window seat. A group of sixteen travels in four vehicles.",
      },
      {
        question: "Are the off-road sections uncomfortable?",
        answer:
          "They are tracks rather than roads, driven by experienced desert drivers. Routes are confirmed against the season and conditions, and a paved alternative is always available.",
      },
      {
        question: "Can the journey run in English?",
        answer:
          "Yes. It is designed for French-speaking markets, and the same programme runs with an English-speaking guide.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "desert-riad-wellness",
    code: "P10",
    name: "Desert & Riad Wellness Journey",
    tagline: "Yoga, Hammam & the Quiet of the Desert",
    summary:
      "A 9-day wellness journey built around a retreat host: riad yoga and hammam rituals in Marrakech, women-led workshops, Atlas walks and meditation, a quiet night in Agafay and slow days on the Atlantic.",
    seoTitle: "Desert and Riad Wellness Journey",
    seoDescription:
      "A 9-day B2B wellness programme for retreat hosts: riad yoga, hammam, women-led workshops, Atlas walks, an Agafay camp night and Essaouira.",
    markets: ["USA", "Canada", "UK"],
    groupType: "Retreat groups of 8 to 20, women's groups",
    guiding: "English, French, Italian or Spanish",
    hotels: "Boutique riads, Atlas lodge, premium camp, coastal riad",
    format: "9 days / 8 nights",
    days: 9,
    nights: 8,
    heroImage: "b2-marrakech-medersa",
    cardImage: "b3-agafay",
    route: [
      { place: "Marrakech", nights: "3N" },
      { place: "Atlas", nights: "2N" },
      { place: "Agafay", nights: "1N" },
      { place: "Essaouira", nights: "2N" },
    ],
    highlights: [
      "Built around the retreat host's own programme",
      "Riad yoga spaces and hammam rituals",
      "Women-led cooking and textile workshops",
      "Sunrise practice in the Agafay desert",
      "Slow, unscheduled days by the ocean",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and opening circle",
        place: "Marrakech",
        body: "Private transfers to a boutique riad, a welcome tea and an opening circle led by the retreat host.",
        overnight: "Marrakech",
      },
      {
        day: "Day 2",
        title: "Movement and the medina",
        place: "Marrakech",
        body: "Morning practice on the riad terrace, a gentle guided walk through the medina and a traditional hammam ritual.",
        overnight: "Marrakech",
        imageKey: "b2-marrakech-medersa",
      },
      {
        day: "Day 3",
        title: "Hands and table",
        place: "Marrakech",
        body: "A women-led cooking class and a textile and henna workshop with local artisans, then a free evening.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 4",
        title: "Into the mountains",
        place: "Atlas Mountains",
        body: "To an Atlas lodge, a mindful walk through the valley and meditation as the light goes.",
        overnight: "Atlas lodge",
        imageKey: "b4-atlas-imlil",
      },
      {
        day: "Day 5",
        title: "The women of the valley",
        place: "Atlas Mountains",
        body: "A visit to a women's argan cooperative, restorative practice and a free afternoon at the lodge.",
        overnight: "Atlas lodge",
      },
      {
        day: "Day 6",
        title: "Desert silence",
        place: "Agafay",
        body: "To Agafay for sunset, a sound session, dinner under the stars and a quiet night in camp.",
        overnight: "Agafay camp",
        imageKey: "b3-agafay",
      },
      {
        day: "Day 7",
        title: "Sunrise and the sea",
        place: "Essaouira",
        body: "Sunrise practice in the desert, then the road to a riad in Essaouira.",
        overnight: "Essaouira",
        imageKey: "b5-essaouira-port",
      },
      {
        day: "Day 8",
        title: "Slow day by the ocean",
        place: "Essaouira",
        body: "A beach walk, free time in the medina and a closing circle dinner.",
        overnight: "Essaouira",
      },
      {
        day: "Day 9",
        title: "Departure",
        place: "Marrakech",
        body: "Transfer to Marrakech airport.",
        overnight: "—",
      },
    ],
    idealFor: ["Yoga and wellness retreat groups", "Women's travel groups", "Travellers seeking a slower Morocco"],
    buyers: ["Retreat organisers and yoga teachers", "Wellness travel brands", "Women's travel companies"],
    whyItSells: [
      "Retreat hosts bring their own audience and need a ground partner for everything else.",
      "Wellness retreats in Morocco for 2026 are selling at 9 to 10 days with boutique stays.",
      "The programme is a frame: the host's practice schedule slots into it.",
    ],
    includes: [
      "8 nights in boutique riads, an Atlas lodge and a premium camp",
      "Full board with vegetarian-forward menus",
      "Private transfers throughout",
      "Practice spaces reserved at each property",
      "Hammam ritual, cooking class, workshops and cooperative visit",
    ],
    options: [
      "Female guides and hosts on request",
      "Private use of a riad for the whole group",
      "Additional spa treatments",
      "Extra night in the desert",
    ],
    extraSpecs: [
      { requirement: "Practice spaces", answer: "Confirmed with each property for the group size", pending: true },
      { requirement: "Female guides", answer: "On request, confirmed per departure", pending: true },
    ],
    faqs: [
      {
        question: "Does PM Travel provide the yoga teacher?",
        answer:
          "No. The programme is built for retreat hosts who bring their own practice. We provide the properties, practice spaces, experiences and all ground logistics.",
      },
      {
        question: "Can the group be women only?",
        answer:
          "Yes. Female guides and hosts can be requested, and are confirmed for each departure.",
      },
      {
        question: "Can the menus be fully vegetarian or vegan?",
        answer:
          "Yes. Menus are agreed with each property in advance and stated in the proposal.",
      },
    ],
  },
];

export const programmeBySlug = (slug: string): Programme | undefined =>
  PROGRAMMES.find((programme) => programme.slug === slug);

export const programmeHref = (programme: Programme) => `/programmes/${programme.slug}`;
