import type { Faq } from "@/components/FaqSection";

/**
 * B2B excursions: day, half-day and evening experiences around Marrakech,
 * sold on their own or added to a programme by travel agencies and tour
 * operators, white-label.
 *
 * Same rules as the programmes:
 *   - no drive times, distances or clock times: timings are confirmed per booking
 *   - no retail prices: net rates are quoted per partner and season
 *   - activity suppliers and camps are not named until contracted
 */

export type ExcursionStep = { moment: string; title: string; body: string };

export type ExcursionSpec = { requirement: string; answer: string; pending?: boolean };

export type Excursion = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  summary: string;
  /** Renders with " | PM Travel Agency" appended, so keep it under 42 characters. */
  seoTitle: string;
  /** 155 characters or fewer. */
  seoDescription: string;
  region: "Marrakech" | "Imlil" | "Ourika" | "Agafay" | "Imlil & Agafay" | "Essaouira";
  duration: "Half day" | "Full day" | "Evening" | "Afternoon & evening";
  level: "Easy" | "Moderate" | "Active";
  experiences: string[];
  groupType: string;
  heroImage: string;
  cardImage: string;
  highlights: string[];
  steps: ExcursionStep[];
  includes: string[];
  options: string[];
  bring: string[];
  idealFor: string[];
  buyers: string[];
  extraSpecs?: ExcursionSpec[];
  faqs: Faq[];
};

const ACTIVITY_SPEC: ExcursionSpec = {
  requirement: "Activity rules",
  answer: "Minimum age, driving rules and safety briefings set by the activity supplier, confirmed per booking",
  pending: true,
};

export const EXCURSIONS: Excursion[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "marrakech-souk-medina-walk",
    code: "E1",
    name: "Marrakech Souk & Medina Walk",
    tagline: "The Souks with Someone Who Knows Them",
    summary:
      "A guided half-day walk through the Marrakech medina: the spice and craft souks, artisans at work, the Bahia Palace and a mint tea on a rooftop, at a pace the group can follow.",
    seoTitle: "Marrakech Souk and Medina Walk",
    seoDescription:
      "A half-day B2B guided walk through the Marrakech souks and medina: spices, artisans, the Bahia Palace and mint tea on a rooftop. White-label.",
    region: "Marrakech",
    duration: "Half day",
    level: "Easy",
    experiences: ["Souk", "Guided walk", "Mint tea"],
    groupType: "Private or small groups, 2 to 25",
    heroImage: "d7-dmc-covered-souk",
    cardImage: "e12-souk-lanterns",
    highlights: [
      "The spice, leather, metal and dyers' souks",
      "Artisans at work in their workshops",
      "The Bahia Palace",
      "Mint tea on a rooftop above the medina",
      "No shopping stops the guests did not ask for",
    ],
    steps: [
      { moment: "Start", title: "Meet the guide", body: "Pickup at the hotel, or at the nearest meeting point for riads the vehicle cannot reach, and a short briefing on the medina." },
      { moment: "Morning", title: "Into the souks", body: "The spice market, the leather and metal workers and the dyers' quarter, with time to watch the artisans at work." },
      { moment: "Late morning", title: "The Bahia Palace", body: "Carved cedar, zellige and courtyards, with the story of the palace told by the guide." },
      { moment: "End", title: "Rooftop mint tea", body: "Mint tea on a rooftop over the medina, then return to the hotel or free time in the medina." },
    ],
    includes: ["Licensed local guide", "Hotel pickup and return", "Bahia Palace entrance", "Mint tea on a rooftop"],
    options: ["Afternoon or evening version", "Personal shopper for the souks", "Add the Majorelle Garden", "Food tasting stops"],
    bring: ["Comfortable walking shoes", "Shoulders and knees covered", "Small cash for purchases"],
    idealFor: ["First-time visitors", "Cruise and short-stay guests", "Groups before a programme starts"],
    buyers: ["Tour operators adding a Marrakech day", "Travel agencies selling city stays", "MICE groups with a free half day"],
    faqs: [
      { question: "Will the guide take guests to shops for commission?", answer: "No. Shopping stops happen only when guests ask for them." },
      { question: "Can riads inside the medina be collected?", answer: "Where a vehicle cannot reach the riad, the guide meets guests at the nearest meeting point, agreed per property." },
      { question: "Is it suitable for large groups?", answer: "Yes, split into smaller walking groups of up to about 12, each with its own guide." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "imlil-villages-lunch-chez-habitant",
    code: "E2",
    name: "Imlil Villages & Lunch chez l'Habitant",
    tagline: "A Day in the High Atlas with a Local Family",
    summary:
      "A full day in the High Atlas: a guided walk between Amazigh villages in the Imlil valley, walnut groves and mountain views, and lunch at a local family's home before returning to Marrakech.",
    seoTitle: "Imlil Villages and Lunch with a Family",
    seoDescription:
      "A full-day B2B excursion from Marrakech to Imlil: a guided walk between Amazigh villages and lunch chez l'habitant with a local family.",
    region: "Imlil",
    duration: "Full day",
    level: "Easy",
    experiences: ["Village walk", "Lunch chez l'habitant", "Mint tea"],
    groupType: "Private or shared, 2 to 30",
    heroImage: "e09-imlil-from-aroumd",
    cardImage: "e10-imlil-village",
    highlights: [
      "The Imlil valley under the High Atlas peaks",
      "A guided walk between Amazigh villages",
      "Lunch at a local family's home",
      "Bread from the family oven and mint tea",
      "Easy walking, adapted to the group",
    ],
    steps: [
      { moment: "Morning", title: "Into the mountains", body: "Pickup in Marrakech and the drive into the High Atlas, with a stop for the view over the valley." },
      { moment: "Late morning", title: "Walk between villages", body: "A mountain guide leads an easy walk through walnut groves and terraced fields between Amazigh villages." },
      { moment: "Midday", title: "Lunch chez l'habitant", body: "Lunch at a local family's home: bread from the oven, a seasonal tajine, salads and mint tea." },
      { moment: "Afternoon", title: "Back to Marrakech", body: "Free time in Imlil, then the return drive to the hotel." },
    ],
    includes: ["Transport from Marrakech", "Mountain guide", "Lunch chez l'habitant", "Mint tea"],
    options: ["Longer walk for active groups", "Mule ride for part of the walk", "Private vehicle and guide", "Combine with an Agafay sunset (see E9)"],
    bring: ["Walking shoes", "A warm layer, even in summer", "Sun protection", "Water"],
    idealFor: ["Travellers who want to meet local families", "Families and seniors", "Photography lovers"],
    buyers: ["Tour operators adding an Atlas day", "Agencies selling Marrakech stays", "Incentive planners"],
    faqs: [
      { question: "How much walking is involved?", answer: "An easy walk on mountain paths, adapted to the group. Mules are available for anyone who prefers to ride." },
      { question: "Who are the families?", answer: "Local families in the valley, selected and briefed in advance, who host guests in their homes for lunch." },
      { question: "Can dietary needs be handled at the family lunch?", answer: "Yes, vegetarian and most allergies, if we know at booking." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "ourika-valley-ebike",
    code: "E3",
    name: "Ourika Valley by E-bike",
    tagline: "Ride the River, Lunch with a Family",
    summary:
      "An electric-assisted bike ride through the Ourika valley, along the river and past terraced villages, with a guide and support vehicle, and lunch chez l'habitant in a valley village.",
    seoTitle: "Ourika Valley E-bike Excursion",
    seoDescription:
      "A full-day B2B e-bike excursion in the Ourika valley from Marrakech: a guided ride along the river and villages and lunch chez l'habitant.",
    region: "Ourika",
    duration: "Full day",
    level: "Easy",
    experiences: ["E-bike", "Lunch chez l'habitant", "Village visit"],
    groupType: "Private or shared, 2 to 20",
    heroImage: "c11b-ourika-road",
    cardImage: "e04-atlas-road-cyclists",
    highlights: [
      "Electric-assisted bikes, easy for any regular cyclist",
      "Along the Ourika river and through its villages",
      "Guide and support vehicle throughout",
      "Lunch chez l'habitant in a valley village",
      "Mountain views without the mountain effort",
    ],
    steps: [
      { moment: "Morning", title: "To the valley", body: "Pickup in Marrakech and the drive to the Ourika valley, where the bikes are fitted and the guide gives a safety briefing." },
      { moment: "Late morning", title: "The ride", body: "A guided e-bike ride along the river and through terraced villages, with stops for the views and the villages." },
      { moment: "Midday", title: "Lunch chez l'habitant", body: "Lunch at a local family's home in the valley." },
      { moment: "Afternoon", title: "Return", body: "A short ride or a walk by the river, then the drive back to Marrakech." },
    ],
    includes: ["Transport from Marrakech", "E-bike, helmet and safety briefing", "Cycling guide and support vehicle", "Lunch chez l'habitant"],
    options: ["Longer ride for active groups", "Private departure", "Herb and saffron garden visit", "Photographer on the ride"],
    bring: ["Comfortable sports clothes", "Closed shoes", "Sunglasses and sun protection", "Water"],
    idealFor: ["Active couples and friends", "Families with teenagers", "Travellers who want to move without a trek"],
    buyers: ["Active and adventure travel operators", "Agencies selling Marrakech stays", "Incentive planners"],
    extraSpecs: [ACTIVITY_SPEC],
    faqs: [
      { question: "Do guests need to be fit?", answer: "No. The bikes are electric-assisted and the guide sets an easy pace, with the support vehicle available." },
      { question: "Is there a minimum age?", answer: "Yes, set by the e-bike supplier for safety and bike sizes, and confirmed at booking." },
      { question: "What happens if it rains?", answer: "The ride is shortened or replaced with a village walk and the family lunch." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "agafay-quad-camel-sunset",
    code: "E4",
    name: "Agafay Quad & Camel Sunset",
    tagline: "Quads, Camels & Dinner Under the Stars",
    summary:
      "An afternoon and evening in the Agafay desert: a guided quad ride across the stone hills, a camel ride as the sun goes down, and dinner in a desert camp with Moroccan tea and music.",
    seoTitle: "Agafay Quad and Camel Sunset",
    seoDescription:
      "A B2B afternoon and evening in the Agafay desert near Marrakech: a guided quad ride, a sunset camel ride and dinner in a desert camp.",
    region: "Agafay",
    duration: "Afternoon & evening",
    level: "Moderate",
    experiences: ["Quad", "Camel ride", "Camp dinner"],
    groupType: "Private or shared, 2 to 60",
    heroImage: "e05-agafay-camel-caravan",
    cardImage: "e01-merzouga-quads",
    highlights: [
      "A guided quad ride across the Agafay hills",
      "A camel ride at sunset",
      "Dinner in a desert camp",
      "Moroccan tea and music under the stars",
      "Back in Marrakech the same night",
    ],
    steps: [
      { moment: "Afternoon", title: "To Agafay", body: "Pickup in Marrakech and the drive to the stone desert of Agafay." },
      { moment: "Late afternoon", title: "Quad ride", body: "Safety briefing and equipment, then a guided quad ride through the hills and dry river beds." },
      { moment: "Sunset", title: "Camel ride", body: "A camel ride as the light turns gold over the hills." },
      { moment: "Evening", title: "Dinner in camp", body: "Dinner in a desert camp with Moroccan tea and music, then the return to Marrakech." },
    ],
    includes: ["Transport from Marrakech", "Quad, helmet and safety briefing", "Quad guide", "Camel ride", "Dinner in camp"],
    options: ["Overnight in camp", "Buggy instead of quad", "Premium camp dinner", "Private dinner table"],
    bring: ["Closed shoes", "A scarf against the dust", "A warm layer for the evening", "Sunglasses"],
    idealFor: ["Friends and couples", "Adventure lovers", "Groups and incentives"],
    buyers: ["Tour operators and agencies", "Incentive and MICE planners", "Online travel agencies"],
    extraSpecs: [ACTIVITY_SPEC],
    faqs: [
      { question: "Do guests need a driving licence for the quad?", answer: "Driving rules and minimum ages are set by the quad supplier and confirmed at booking. Passengers can ride with a guide." },
      { question: "Can guests stay the night?", answer: "Yes, an overnight in camp can be added, with breakfast and a return the next morning." },
      { question: "What if a guest does not want to drive?", answer: "They can ride as a passenger or join only the camel ride and dinner." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "agafay-sunset-camp-dinner",
    code: "E5",
    name: "Agafay Sunset Dinner in Camp",
    tagline: "The Desert Evening, Without the Adrenaline",
    summary:
      "The gentle desert evening: sunset over the Agafay hills with a short camel ride or walk, then a Moroccan dinner in a camp with tea, music and the stars, and back to Marrakech the same night.",
    seoTitle: "Agafay Sunset Dinner in Camp",
    seoDescription:
      "A B2B evening excursion from Marrakech to the Agafay desert: sunset, a short camel ride or walk and a Moroccan dinner in camp with music.",
    region: "Agafay",
    duration: "Evening",
    level: "Easy",
    experiences: ["Sunset", "Camel ride", "Camp dinner"],
    groupType: "Private or shared, 2 to 120",
    heroImage: "e07-agafay-tent",
    cardImage: "e06-agafay-tracks",
    highlights: [
      "Sunset over the Agafay hills",
      "A short camel ride or a sunset walk",
      "Moroccan dinner in a desert camp",
      "Tea, music and the stars",
      "Easy for all ages",
    ],
    steps: [
      { moment: "Late afternoon", title: "To Agafay", body: "Pickup in Marrakech and the drive to the desert, timed for the sunset of the date." },
      { moment: "Sunset", title: "Camel or walk", body: "A short camel ride or a walk to a viewpoint as the sun sets." },
      { moment: "Evening", title: "Dinner in camp", body: "Welcome tea, then a Moroccan dinner in camp with music under the stars." },
      { moment: "Night", title: "Return", body: "Drive back to the hotel in Marrakech." },
    ],
    includes: ["Transport from Marrakech", "Short camel ride or guided walk", "Dinner in camp", "Tea and music"],
    options: ["Private table or private-use camp", "Gala set-up for groups", "Overnight in camp", "Stargazing session"],
    bring: ["A warm layer for the evening", "Comfortable shoes"],
    idealFor: ["Couples and families", "Seniors", "Large groups and gala evenings"],
    buyers: ["Travel agencies and tour operators", "MICE planners for gala dinners", "Wedding and event planners"],
    extraSpecs: [
      { requirement: "Group dinners", answer: "Camp capacity and layout confirmed for the group size", pending: true },
      { requirement: "Weather", answer: "A covered fallback space confirmed with the camp for wind or rain", pending: true },
    ],
    faqs: [
      { question: "Is it suitable for large groups?", answer: "Yes, for groups the camp can seat in the layout needed, confirmed before booking, with a covered fallback for bad weather." },
      { question: "Is the camel ride compulsory?", answer: "No. Guests can walk to the sunset viewpoint instead." },
      { question: "Can it become a gala dinner?", answer: "Yes, with a private-use camp, set-up, entertainment and a stage on request." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "high-atlas-trek-day",
    code: "E6",
    name: "High Atlas Trek Day from Imlil",
    tagline: "A Real Mountain Day for Walkers",
    summary:
      "A full day of mountain walking from Imlil with a mountain guide: up through villages and walnut groves to a high viewpoint over the valley, with a picnic or lunch chez l'habitant on the way down.",
    seoTitle: "High Atlas Trek Day from Imlil",
    seoDescription:
      "A full-day B2B trek from Imlil in the High Atlas: a guided mountain walk through villages to a high viewpoint, with lunch chez l'habitant.",
    region: "Imlil",
    duration: "Full day",
    level: "Active",
    experiences: ["Trek", "Lunch chez l'habitant", "Mountain views"],
    groupType: "Private or small groups, 2 to 15",
    heroImage: "e11-toubkal-hikers",
    cardImage: "e09-imlil-from-aroumd",
    highlights: [
      "A full day of mountain walking",
      "Mountain guide who sets the pace to the group",
      "Villages, walnut groves and high viewpoints",
      "Lunch chez l'habitant or a mountain picnic",
      "Mules for bags on request",
    ],
    steps: [
      { moment: "Early morning", title: "To Imlil", body: "Early pickup in Marrakech and the drive to Imlil, where the mountain guide meets the group." },
      { moment: "Morning", title: "The climb", body: "Up through villages and walnut groves on mountain paths to a high viewpoint over the valley." },
      { moment: "Midday", title: "Lunch", body: "Lunch chez l'habitant in a village on the way down, or a picnic with a view." },
      { moment: "Afternoon", title: "Down and back", body: "The descent to Imlil and the drive back to Marrakech." },
    ],
    includes: ["Transport from Marrakech", "Mountain guide", "Lunch chez l'habitant or picnic", "Water and mint tea"],
    options: ["Mule for bags", "Private departure", "Overnight in a mountain gîte", "Longer or higher route for fit walkers"],
    bring: ["Walking boots", "Daypack and water", "Warm and waterproof layers", "Sun protection"],
    idealFor: ["Regular walkers in good health", "Active travellers", "Walking clubs"],
    buyers: ["Walking and adventure travel operators", "Active holiday specialists", "Agencies with active clients"],
    extraSpecs: [
      { requirement: "Fitness", answer: "Good: a full day of mountain walking with climbs and descents" },
      { requirement: "Season", answer: "Route checked against season and conditions before confirming" },
    ],
    faqs: [
      { question: "How fit do guests need to be?", answer: "Regular walkers in good health. It is a full mountain day with climbs; for an easier day, see Imlil Villages & Lunch chez l'Habitant (E2)." },
      { question: "Does it climb Toubkal?", answer: "No. It is a day trek in the valleys and ridges around Imlil. Toubkal needs at least two days." },
      { question: "Can it run in winter?", answer: "The route is checked against season and conditions, and adapted to a lower route when needed." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "agafay-ebike-adventure",
    code: "E7",
    name: "Agafay E-bike Adventure",
    tagline: "The Stone Desert on Two Wheels",
    summary:
      "A half-day guided e-bike ride through the Agafay desert's hills and tracks, with the Atlas on the horizon, ending with mint tea in a desert camp.",
    seoTitle: "Agafay E-bike Adventure",
    seoDescription:
      "A half-day B2B e-bike excursion in the Agafay desert near Marrakech: a guided ride on desert tracks with Atlas views and mint tea in camp.",
    region: "Agafay",
    duration: "Half day",
    level: "Moderate",
    experiences: ["E-bike", "Mint tea in camp"],
    groupType: "Private or shared, 2 to 20",
    heroImage: "e13-agafay-desert-track",
    cardImage: "e03-atlas-pass-cyclist",
    highlights: [
      "Electric-assisted mountain bikes",
      "Desert tracks with the Atlas on the horizon",
      "A guide and support vehicle",
      "Mint tea in a desert camp",
      "Morning or late afternoon departures",
    ],
    steps: [
      { moment: "Start", title: "To Agafay", body: "Pickup in Marrakech and the drive to the desert, where the bikes are fitted and the guide gives a briefing." },
      { moment: "Ride", title: "Desert tracks", body: "A guided ride over the hills and along dry river beds, with stops for the views of the Atlas." },
      { moment: "Break", title: "Mint tea in camp", body: "Mint tea and Moroccan pastries in a desert camp." },
      { moment: "End", title: "Return", body: "Drive back to Marrakech, or stay on for a sunset dinner (see E5)." },
    ],
    includes: ["Transport from Marrakech", "E-bike, helmet and briefing", "Cycling guide and support vehicle", "Mint tea and pastries in camp"],
    options: ["Add sunset dinner in camp", "Private departure", "Longer ride for experienced riders"],
    bring: ["Sports clothes", "Closed shoes", "Scarf against the dust", "Sun protection"],
    idealFor: ["Active couples and friends", "Families with teenagers", "Incentive groups"],
    buyers: ["Active travel operators", "Agencies selling Marrakech stays", "Incentive planners"],
    extraSpecs: [ACTIVITY_SPEC],
    faqs: [
      { question: "Is desert riding difficult?", answer: "The tracks are rolling rather than steep, and electric assistance does most of the work. The guide adapts the route." },
      { question: "Can it be combined with dinner?", answer: "Yes. A late-afternoon ride combines naturally with the sunset dinner in camp." },
      { question: "Is there a minimum age?", answer: "Yes, set by the e-bike supplier and confirmed at booking." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "ourika-valley-walk-waterfalls",
    code: "E8",
    name: "Ourika Valley Walk & Waterfalls",
    tagline: "Along the River to the Setti Fatma Falls",
    summary:
      "A full day in the Ourika valley: a walk along the river through valley villages to the waterfalls above Setti Fatma, and lunch chez l'habitant before the return to Marrakech.",
    seoTitle: "Ourika Valley Walk and Waterfalls",
    seoDescription:
      "A full-day B2B excursion from Marrakech to the Ourika valley: a guided walk to the Setti Fatma waterfalls and lunch chez l'habitant.",
    region: "Ourika",
    duration: "Full day",
    level: "Moderate",
    experiences: ["Walk", "Waterfalls", "Lunch chez l'habitant"],
    groupType: "Private or shared, 2 to 25",
    heroImage: "c11-ourika-valley",
    cardImage: "e08-setti-fatma-cascade",
    highlights: [
      "The Ourika valley and its river",
      "A guided walk to the waterfalls above Setti Fatma",
      "Valley villages and terraced fields",
      "Lunch chez l'habitant",
      "A cooler day out of Marrakech in the warm months",
    ],
    steps: [
      { moment: "Morning", title: "Into the valley", body: "Pickup in Marrakech and the drive up the Ourika valley, with a stop in a valley village." },
      { moment: "Late morning", title: "To the waterfalls", body: "A guided walk from Setti Fatma up the rocky path to the waterfalls." },
      { moment: "Midday", title: "Lunch chez l'habitant", body: "Lunch at a local family's home in the valley." },
      { moment: "Afternoon", title: "Return", body: "Free time by the river, then the drive back to Marrakech." },
    ],
    includes: ["Transport from Marrakech", "Local guide", "Lunch chez l'habitant", "Mint tea"],
    options: ["Herb and saffron garden visit", "Private departure", "Easier riverside walk instead of the falls"],
    bring: ["Shoes with good grip", "Water", "Sun protection", "A change of socks"],
    idealFor: ["Nature lovers", "Families with older children", "Travellers escaping the city heat"],
    buyers: ["Tour operators and agencies", "Online travel agencies", "Family travel specialists"],
    extraSpecs: [{ requirement: "Path", answer: "Rocky path with some scrambling to the falls; an easier riverside walk is available" }],
    faqs: [
      { question: "Is the path to the waterfalls difficult?", answer: "It is rocky with some scrambling in places. Guests who prefer can take the easier riverside walk." },
      { question: "Is it busy?", answer: "It is popular, especially at weekends in summer. We recommend weekdays and an earlier start." },
      { question: "Can it be combined with the e-bike ride?", answer: "The e-bike excursion (E3) covers the lower valley; the two are best on separate days." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "atlas-agafay-day-combo",
    code: "E9",
    name: "Atlas & Agafay Day Combo",
    tagline: "Mountain Lunch, Desert Sunset",
    summary:
      "The best of both in one long day: a walk in the Imlil valley and lunch chez l'habitant in the morning, then down to Agafay for a sunset camel ride and dinner in a desert camp.",
    seoTitle: "Atlas and Agafay Day Combo",
    seoDescription:
      "A long-day B2B excursion from Marrakech: an Imlil village walk with lunch chez l'habitant, then a sunset camel ride and camp dinner in Agafay.",
    region: "Imlil & Agafay",
    duration: "Full day",
    level: "Easy",
    experiences: ["Village walk", "Lunch chez l'habitant", "Camel ride", "Camp dinner"],
    groupType: "Private or shared, 2 to 30",
    heroImage: "e05-agafay-camel-caravan",
    cardImage: "b4-atlas-imlil",
    highlights: [
      "Mountains and desert in one day",
      "An Imlil village walk",
      "Lunch chez l'habitant",
      "A sunset camel ride in Agafay",
      "Dinner in a desert camp",
    ],
    steps: [
      { moment: "Morning", title: "Imlil valley", body: "Pickup in Marrakech, the drive into the High Atlas and an easy village walk with a mountain guide." },
      { moment: "Midday", title: "Lunch chez l'habitant", body: "Lunch at a local family's home in the valley." },
      { moment: "Afternoon", title: "Down to Agafay", body: "The drive down to the Agafay desert and time to settle in at the camp." },
      { moment: "Sunset & evening", title: "Camel and dinner", body: "A camel ride at sunset, dinner in camp with music, and the return to Marrakech." },
    ],
    includes: ["Transport throughout", "Mountain guide in Imlil", "Lunch chez l'habitant", "Camel ride", "Dinner in camp"],
    options: ["Overnight in camp", "Add a quad ride in Agafay", "Private vehicle and guide"],
    bring: ["Walking shoes", "A warm layer for the evening", "Sun protection"],
    idealFor: ["Guests with only one free day", "Couples and families", "Cruise and short-stay guests"],
    buyers: ["Tour operators adding one day to a programme", "Agencies selling short Marrakech stays", "Incentive planners"],
    extraSpecs: [{ requirement: "Long day", answer: "A long day with two drives; the camp night is recommended for families with young children" }],
    faqs: [
      { question: "Is it a very long day?", answer: "It is a long day with two drives. For families with young children we recommend adding the night in camp." },
      { question: "Can the quad be added?", answer: "Yes, a quad ride can be added in Agafay before the camel ride." },
      { question: "Is the walk demanding?", answer: "No. It is an easy village walk, adapted to the group." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "majorelle-jardin-secret-gardens",
    code: "E10",
    name: "Majorelle & Jardin Secret Gardens",
    tagline: "The Two Gardens of Marrakech",
    summary:
      "A guided half day between the two great gardens of Marrakech: the blue villa and cactus garden of Majorelle in Gueliz, then Le Jardin Secret, a restored riad garden hidden in the medina.",
    seoTitle: "Majorelle and Jardin Secret Gardens",
    seoDescription:
      "A half-day B2B guided visit to the Majorelle Garden and Le Jardin Secret in Marrakech, with hotel pickup and timed entry. White-label.",
    region: "Marrakech",
    duration: "Half day",
    level: "Easy",
    experiences: ["Gardens", "Guided visit", "Mint tea"],
    groupType: "Private or small groups, 2 to 25",
    heroImage: "e14-majorelle-villa",
    cardImage: "e15-jardin-secret",
    highlights: [
      "The blue villa and cactus garden of Majorelle",
      "Timed entry arranged in advance",
      "Le Jardin Secret, a riad garden inside the medina",
      "The story of the gardens and the people who made them",
      "Mint tea in the medina",
    ],
    steps: [
      { moment: "Start", title: "Meet the guide", body: "Pickup at the hotel and the short drive to Gueliz, with a briefing on the gardens on the way." },
      { moment: "Morning", title: "The Majorelle Garden", body: "The cobalt villa, bamboo alleys and cactus garden, visited on a pre-booked entry slot." },
      { moment: "Late morning", title: "Le Jardin Secret", body: "Into the medina for the restored riad garden, its water channels and the view from its tower." },
      { moment: "End", title: "Mint tea", body: "Mint tea in the medina, then return to the hotel or free time in the souks." },
    ],
    includes: ["Licensed local guide", "Hotel pickup and return", "Majorelle Garden entrance", "Le Jardin Secret entrance", "Mint tea"],
    options: ["Add the YSL Museum", "Afternoon version", "Combine with the Souk & Medina Walk (see E1)", "Lunch in Gueliz"],
    bring: ["Comfortable shoes", "Sun protection", "A hat in the warm months"],
    idealFor: ["Garden and design lovers", "Seniors and families", "Short-stay and cruise guests"],
    buyers: ["Tour operators adding a Marrakech half day", "Agencies selling city stays", "MICE groups with a free morning"],
    extraSpecs: [
      { requirement: "Entry slots", answer: "Majorelle entry is timed and sells out in high season; slots confirmed per booking", pending: true },
    ],
    faqs: [
      { question: "Are the garden tickets included?", answer: "Yes. Entry to both gardens is included and the Majorelle slot is booked in advance." },
      { question: "Can the YSL Museum be added?", answer: "Yes, as an option next to the Majorelle Garden, on the same visit." },
      { question: "Is it suitable for guests with limited mobility?", answer: "Largely yes. Paths are flat, with some steps; we confirm access for the group at booking." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "historic-marrakech-palaces-tombs",
    code: "E11",
    name: "Historic Marrakech: Madrasa & Tombs",
    tagline: "Eight Centuries of Marrakech in a Morning",
    summary:
      "A guided half day through the monuments of the medina: the Koutoubia, the Saadian Tombs, the ruins of the El Badi Palace and the carved courtyard of the Ben Youssef Madrasa.",
    seoTitle: "Historic Marrakech Monuments Tour",
    seoDescription:
      "A half-day B2B guided tour of historic Marrakech: the Koutoubia, Saadian Tombs, El Badi Palace and Ben Youssef Madrasa. White-label.",
    region: "Marrakech",
    duration: "Half day",
    level: "Easy",
    experiences: ["Monuments", "Guided walk", "History"],
    groupType: "Private or small groups, 2 to 25",
    heroImage: "e16-ben-youssef-madrasa",
    cardImage: "e17-saadian-tombs",
    highlights: [
      "The Koutoubia minaret and its gardens",
      "The Saadian Tombs and the Hall of Twelve Columns",
      "The ruins and storks of the El Badi Palace",
      "The Ben Youssef Madrasa courtyard",
      "A guide who tells the history, not just the dates",
    ],
    steps: [
      { moment: "Start", title: "The Koutoubia", body: "Pickup at the hotel and a start at the Koutoubia, where the guide sets out the story of the city." },
      { moment: "Morning", title: "Saadian Tombs & El Badi", body: "The carved burial halls of the Saadian dynasty, then the vast ruined courtyards of the El Badi Palace." },
      { moment: "Late morning", title: "Ben Youssef Madrasa", body: "Across the medina to the madrasa: cedar, stucco and zellige around the courtyard pool." },
      { moment: "End", title: "Return", body: "Return to the hotel, or free time in the northern souks near the madrasa." },
    ],
    includes: ["Licensed local guide", "Hotel pickup and return", "Monument entrances", "Bottled water"],
    options: ["Swap a monument for the Bahia Palace", "Add the Dar El Bacha museum", "Lunch in a medina riad", "Private vehicle between monuments"],
    bring: ["Comfortable walking shoes", "Shoulders and knees covered", "Sun protection"],
    idealFor: ["History and architecture lovers", "School and cultural groups", "First-time visitors"],
    buyers: ["Cultural tour operators", "Agencies selling city stays", "Educational travel organisers"],
    extraSpecs: [
      { requirement: "Opening days", answer: "Monument opening days and hours checked against the date before confirming", pending: true },
    ],
    faqs: [
      { question: "Can guests enter the Koutoubia mosque?", answer: "No. Non-Muslims cannot enter; the visit covers the minaret, the exterior and the gardens." },
      { question: "Does it overlap with the Souk & Medina Walk?", answer: "Very little. E1 is about the souks and the Bahia Palace; this tour covers the other monuments, and the two combine well." },
      { question: "Is it suitable for large groups?", answer: "Yes, split into smaller groups with their own guide, as the Saadian Tombs are narrow." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "jemaa-el-fna-evening-food-walk",
    code: "E12",
    name: "Jemaa el-Fna Evening Food Walk",
    tagline: "The Square After Dark, One Tasting at a Time",
    summary:
      "An evening food walk through Jemaa el-Fna and the lanes around it as the square fills with smoke and music: street food stalls chosen by the guide, spice and sweet shops, and a rooftop view at dusk.",
    seoTitle: "Jemaa el-Fna Evening Food Walk",
    seoDescription:
      "A B2B evening food walk in Marrakech: a guided tasting route through Jemaa el-Fna stalls, spice and sweet shops, with a rooftop view at dusk.",
    region: "Marrakech",
    duration: "Evening",
    level: "Easy",
    experiences: ["Food tasting", "Guided walk", "Night market"],
    groupType: "Private or small groups, 2 to 16",
    heroImage: "e18-jemaa-el-fna-dusk",
    cardImage: "e21-spice-market-roses",
    highlights: [
      "Jemaa el-Fna as it comes alive at dusk",
      "Stalls chosen by the guide for quality and hygiene",
      "Tastings from harira and grills to msemen and sweets",
      "Spice and pastry shops in the lanes around the square",
      "A rooftop view over the square",
    ],
    steps: [
      { moment: "Dusk", title: "Rooftop over the square", body: "Pickup at the hotel and a first mint tea on a rooftop as the stalls light up below." },
      { moment: "Evening", title: "The food stalls", body: "Down into the square for tastings at the guide's chosen stalls, from soups and grills to snails for the curious." },
      { moment: "Later", title: "Into the lanes", body: "Spice shops, bread ovens and a pastry stop in the lanes around the square." },
      { moment: "End", title: "Return", body: "Return to the hotel, or stay on for the music and storytellers in the square." },
    ],
    includes: ["Licensed local guide", "Hotel pickup and return", "Food and drink tastings", "Rooftop mint tea"],
    options: ["Vegetarian tasting route", "Dinner in a riad instead of the last tastings", "Gnawa music stop", "Earlier start for families"],
    bring: ["An appetite", "Comfortable shoes", "Small cash for extra purchases"],
    idealFor: ["Food lovers", "Couples and friends", "Guests on a first night in Marrakech"],
    buyers: ["Food and culinary tour operators", "Agencies selling city stays", "Incentive planners with a free evening"],
    faqs: [
      { question: "Is the street food safe?", answer: "The guide uses stalls chosen for quality and hygiene, and guests only taste what they want." },
      { question: "Can dietary needs be handled?", answer: "Yes, vegetarian and most allergies, if we know at booking. A vegetarian route is available." },
      { question: "Is it too busy for groups?", answer: "The square is crowded in the evening, so groups are kept small, with one guide for up to about 8 guests." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "spice-market-cooking-class",
    code: "E13",
    name: "Spice Market & Cooking Class",
    tagline: "Shop the Souk, Cook the Tajine",
    summary:
      "A half-day cooking experience: a guided shop for spices and fresh produce in the medina, then a hands-on class in a riad kitchen to cook a tajine, salads and bread, and lunch on what the group has made.",
    seoTitle: "Marrakech Spice Market and Cooking Class",
    seoDescription:
      "A half-day B2B cooking class in Marrakech: a guided shop in the spice market, a hands-on tajine class in a riad kitchen and lunch. White-label.",
    region: "Marrakech",
    duration: "Half day",
    level: "Easy",
    experiences: ["Cooking class", "Spice market", "Lunch"],
    groupType: "Private or small groups, 2 to 20",
    heroImage: "e20-spice-shop",
    cardImage: "e19-spice-shop-arch",
    highlights: [
      "A guided shop in the spice market",
      "The spices of Moroccan cooking explained",
      "A hands-on class in a riad kitchen",
      "Cook a tajine, salads and bread",
      "Lunch on what the group has cooked",
    ],
    steps: [
      { moment: "Morning", title: "The spice market", body: "Pickup at the hotel and a guided walk through the spice and produce stalls to buy the day's ingredients." },
      { moment: "Late morning", title: "In the kitchen", body: "Aprons on in a riad kitchen: the spice blends, a tajine, seasonal salads and bread, with a local cook." },
      { moment: "Midday", title: "Lunch", body: "Lunch together on the dishes the group has made, with mint tea." },
      { moment: "End", title: "Return", body: "Recipes to take home, then return to the hotel." },
    ],
    includes: ["Guide for the market", "Hotel pickup and return", "Cooking class with a local cook", "Ingredients and lunch", "Printed recipes"],
    options: ["Afternoon class with dinner", "Pastry and bread class", "Team cooking challenge for groups", "Class in a countryside kitchen"],
    bring: ["Comfortable shoes", "Hair ties for the kitchen", "Small cash for spice purchases"],
    idealFor: ["Food lovers", "Families with older children", "Team-building groups"],
    buyers: ["Culinary tour operators", "Agencies selling city stays", "MICE planners for team building"],
    extraSpecs: [
      { requirement: "Kitchen capacity", answer: "Class size and number of cooking stations confirmed with the kitchen for the group", pending: true },
    ],
    faqs: [
      { question: "Do guests need cooking experience?", answer: "No. The cook works at the pace of the group and everyone takes part." },
      { question: "Can dietary needs be handled?", answer: "Yes, vegetarian, vegan and most allergies, if we know at booking." },
      { question: "Can it work as team building?", answer: "Yes, as a team cooking challenge, for groups the kitchen can seat, confirmed before booking." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "essaouira-day-trip",
    code: "E14",
    name: "Essaouira Day Trip",
    tagline: "Blue Boats, Ramparts & the Atlantic",
    summary:
      "A full day on the Atlantic coast: the drive through argan country to Essaouira, a guided walk on the ramparts, in the medina and around the fishing port, and fresh fish for lunch before the return to Marrakech.",
    seoTitle: "Essaouira Day Trip from Marrakech",
    seoDescription:
      "A full-day B2B excursion from Marrakech to Essaouira: argan country, a guided walk on the ramparts, medina and fishing port, and fish lunch.",
    region: "Essaouira",
    duration: "Full day",
    level: "Easy",
    experiences: ["Coast", "Guided walk", "Argan cooperative", "Fish lunch"],
    groupType: "Private or shared, 2 to 30",
    heroImage: "e22-essaouira-citadel",
    cardImage: "e23-essaouira-skala",
    highlights: [
      "The Atlantic ramparts of the Skala",
      "The blue boats of the fishing port",
      "A walk in the medina, a UNESCO World Heritage site",
      "A women's argan cooperative on the way",
      "Fresh fish for lunch by the port",
    ],
    steps: [
      { moment: "Morning", title: "Argan country", body: "Pickup in Marrakech and the drive west, with a stop at a women's argan cooperative." },
      { moment: "Late morning", title: "Ramparts and port", body: "A guided walk on the Skala ramparts and around the fishing port and its blue boats." },
      { moment: "Midday", title: "Fish lunch", body: "Fresh fish for lunch at the port or in the medina." },
      { moment: "Afternoon", title: "Medina and return", body: "Free time in the medina and on the beach, then the drive back to Marrakech." },
    ],
    includes: ["Transport from Marrakech", "Local guide in Essaouira", "Argan cooperative visit", "Fish lunch"],
    options: ["Overnight in an Essaouira riad", "Private vehicle and guide", "Surf or kitesurf lesson", "Wine estate lunch on the way"],
    bring: ["A windproof layer, even in summer", "Comfortable shoes", "Sun protection"],
    idealFor: ["Guests who want the sea after the city", "Couples and families", "Photography lovers"],
    buyers: ["Tour operators adding a coast day", "Agencies selling Marrakech stays", "Incentive planners"],
    extraSpecs: [{ requirement: "Long day", answer: "A long day with a return drive; an overnight in Essaouira is recommended for a slower pace" }],
    faqs: [
      { question: "Is it a very long day?", answer: "It is a long day with a drive each way. For a slower pace we recommend adding a night in Essaouira." },
      { question: "Is the argan stop a shopping stop?", answer: "It is a visit to a women's cooperative to see how the oil is made. Buying is optional." },
      { question: "Is it windy?", answer: "Often, which is why it is a kitesurfing town. We advise guests to bring a warm, windproof layer." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "palmeraie-camel-ride",
    code: "E15",
    name: "Palmeraie Camel Ride & Mint Tea",
    tagline: "Camels Under the Palms, Minutes from the City",
    summary:
      "A gentle camel ride through the palm groves of the Marrakech Palmeraie, with a camel handler leading each group, followed by mint tea and bread in a traditional house on the edge of the palms.",
    seoTitle: "Palmeraie Camel Ride in Marrakech",
    seoDescription:
      "A B2B camel ride in the Marrakech Palmeraie: a guided ride through the palm groves and mint tea in a traditional house. Morning or sunset. White-label.",
    region: "Marrakech",
    duration: "Half day",
    level: "Easy",
    experiences: ["Camel ride", "Palm groves", "Mint tea"],
    groupType: "Private or shared, 2 to 40",
    heroImage: "e24-palmeraie-camels-resting",
    cardImage: "e25-palmeraie-camels-standing",
    highlights: [
      "A camel ride through the Palmeraie palm groves",
      "Camel handlers leading on foot",
      "Traditional dress for photos, if guests want it",
      "Mint tea and bread in a traditional house",
      "Close to the city, easy for all ages",
    ],
    steps: [
      { moment: "Start", title: "To the Palmeraie", body: "Pickup at the hotel and the short drive to the palm groves on the edge of Marrakech." },
      { moment: "Ride", title: "Among the palms", body: "A briefing, then a camel ride through the palm groves, each camel led by a handler on foot." },
      { moment: "Break", title: "Mint tea", body: "Mint tea, bread and olive oil in a traditional house on the edge of the palms." },
      { moment: "End", title: "Return", body: "Return to the hotel, or on to a sunset dinner." },
    ],
    includes: ["Hotel pickup and return", "Camel ride with handlers", "Mint tea and bread"],
    options: ["Sunset departure", "Quad or buggy ride in the Palmeraie", "Lunch or dinner in a Palmeraie villa", "Private departure"],
    bring: ["Long trousers", "Closed shoes", "Sun protection"],
    idealFor: ["Families with children", "Short-stay and cruise guests", "Guests without time for the desert"],
    buyers: ["Travel agencies selling city stays", "Online travel agencies", "MICE groups with a free half day"],
    extraSpecs: [ACTIVITY_SPEC],
    faqs: [
      { question: "Is it suitable for children?", answer: "Yes. The camels are led on foot at a walk; the minimum age is set by the supplier and confirmed at booking." },
      { question: "How is it different from the Agafay camel ride?", answer: "The Palmeraie is palm grove on the edge of the city, closer and shorter. Agafay is stone desert and pairs with a camp dinner." },
      { question: "Can guests ride two to a camel?", answer: "A parent can ride with a young child where the supplier allows it, confirmed at booking." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "menara-gardens-caleche-ride",
    code: "E16",
    name: "Menara Gardens & Calèche Ride",
    tagline: "Marrakech at the Pace of a Horse",
    summary:
      "A relaxed half day around the city by horse-drawn calèche: the ramparts and gates of the medina, the olive groves and pavilion of the Menara Gardens with the Atlas behind, and the palm-lined avenues of the Hivernage.",
    seoTitle: "Menara Gardens and Calèche Ride",
    seoDescription:
      "A half-day B2B calèche ride in Marrakech: the medina ramparts and gates, the Menara Gardens pavilion and the Hivernage by horse carriage. White-label.",
    region: "Marrakech",
    duration: "Half day",
    level: "Easy",
    experiences: ["Calèche ride", "Gardens", "Ramparts"],
    groupType: "Private or small groups, 2 to 20",
    heroImage: "e26-menara-pavilion",
    cardImage: "e27-caleche-horse",
    highlights: [
      "A horse-drawn calèche around the city",
      "The ramparts and the monumental gates of the medina",
      "The Menara pavilion and basin, with the Atlas behind",
      "The olive groves of the Menara",
      "No walking needed, ideal for seniors",
    ],
    steps: [
      { moment: "Start", title: "Board the calèche", body: "Pickup at the hotel and boarding the calèche, with a guide or a briefing for the driver on the route." },
      { moment: "Ride", title: "Ramparts and gates", body: "Along the medina walls, past Bab Agnaou and the other gates, with stops for photos." },
      { moment: "Gardens", title: "The Menara", body: "A walk in the olive groves to the pavilion and its basin, with mint tea nearby." },
      { moment: "End", title: "The Hivernage", body: "Back through the palm-lined avenues of the Hivernage to the hotel." },
    ],
    includes: ["Calèche and driver", "Guide on request", "Hotel pickup and return", "Mint tea"],
    options: ["Add the Agdal Gardens", "Sunset departure", "Drop-off at Jemaa el-Fna", "Combine with the gardens half day (see E10)"],
    bring: ["Sun protection", "A layer for the evening in winter"],
    idealFor: ["Seniors and guests with limited mobility", "Couples", "Families with young children"],
    buyers: ["Travel agencies selling city stays", "Senior travel specialists", "Cruise and short-stay operators"],
    extraSpecs: [
      { requirement: "Carriages", answer: "Licensed calèches, with the number of carriages confirmed for the group size", pending: true },
    ],
    faqs: [
      { question: "How many guests per calèche?", answer: "Usually up to four adults, or a family with young children. Larger groups ride in several carriages." },
      { question: "Is there a lot of walking?", answer: "Very little: a short, flat walk in the Menara Gardens, which guests can skip." },
      { question: "Can a guide join?", answer: "Yes. A licensed guide can ride along and tell the story of the city." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "lalla-takerkoust-lake-agafay",
    code: "E17",
    name: "Lalla Takerkoust Lake & Agafay",
    tagline: "A Lakeside Lunch at the Edge of the Desert",
    summary:
      "A slow day at the Lalla Takerkoust lake, where the Agafay hills meet the Atlas: a walk or kayak on the water, a long lunch by the lake, and an afternoon drive back through the stone desert.",
    seoTitle: "Lalla Takerkoust Lake and Agafay",
    seoDescription:
      "A full-day B2B excursion from Marrakech to the Lalla Takerkoust lake: a lakeside walk or kayak, lunch by the water and the Agafay desert road.",
    region: "Agafay",
    duration: "Full day",
    level: "Easy",
    experiences: ["Lake", "Kayak", "Lakeside lunch"],
    groupType: "Private or shared, 2 to 40",
    heroImage: "e28-lalla-takerkoust-lake",
    cardImage: "e13-agafay-desert-track",
    highlights: [
      "The Lalla Takerkoust lake below the Atlas",
      "A walk along the shore or a kayak on the water",
      "A long lunch by the lake",
      "The Agafay desert road on the way back",
      "An easy, slow day away from the city",
    ],
    steps: [
      { moment: "Morning", title: "To the lake", body: "Pickup in Marrakech and the drive south to the lake, with the Atlas ahead." },
      { moment: "Late morning", title: "On the water", body: "A walk along the shore, or a kayak or paddle board on the lake with an instructor." },
      { moment: "Midday", title: "Lakeside lunch", body: "A long Moroccan lunch by the water, with time to rest." },
      { moment: "Afternoon", title: "Through Agafay", body: "The drive back through the Agafay hills, with a stop for the view, then the return to the hotel." },
    ],
    includes: ["Transport from Marrakech", "Lakeside lunch", "Walk along the shore", "Mint tea"],
    options: ["Kayak or paddle board", "Stay on for sunset dinner in an Agafay camp (see E5)", "Quad ride in Agafay", "Private-use lunch set-up for groups"],
    bring: ["Swimwear and a towel for water activities", "Sun protection", "A warm layer for the afternoon"],
    idealFor: ["Families", "Groups wanting a relaxed day", "Returning visitors"],
    buyers: ["Tour operators and agencies", "Incentive planners", "Family travel specialists"],
    extraSpecs: [
      ACTIVITY_SPEC,
      { requirement: "Water level", answer: "Lake level and water activities checked against the season before confirming", pending: true },
    ],
    faqs: [
      { question: "Can guests swim in the lake?", answer: "Water activities depend on the season and the lake level, and are confirmed at booking." },
      { question: "Can it end with dinner in Agafay?", answer: "Yes. The day combines naturally with a sunset dinner in an Agafay camp." },
      { question: "Is it suitable for large groups?", answer: "Yes, with a private lunch set-up for groups, confirmed before booking." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "agafay-stargazing-dinner",
    code: "E18",
    name: "Agafay Stargazing Night",
    tagline: "Dinner, a Fire and the Desert Sky",
    summary:
      "An evening under the dark skies of the Agafay desert: sunset from the hills, dinner in a camp away from the city lights, then a guided stargazing session by the fire with a telescope.",
    seoTitle: "Agafay Stargazing Night",
    seoDescription:
      "A B2B evening in the Agafay desert near Marrakech: sunset, dinner in a desert camp and a guided stargazing session with a telescope by the fire.",
    region: "Agafay",
    duration: "Evening",
    level: "Easy",
    experiences: ["Stargazing", "Camp dinner", "Sunset"],
    groupType: "Private or shared, 2 to 40",
    heroImage: "e29-desert-camp-night",
    cardImage: "e30-milky-way-tree",
    highlights: [
      "Dark skies away from the city lights",
      "Sunset over the Agafay hills",
      "Dinner in a desert camp",
      "A guided stargazing session with a telescope",
      "Tea by the fire",
    ],
    steps: [
      { moment: "Late afternoon", title: "To Agafay", body: "Pickup in Marrakech and the drive to the desert, timed for the sunset of the date." },
      { moment: "Sunset", title: "The hills", body: "The sunset from a viewpoint in the hills, then on to the camp." },
      { moment: "Evening", title: "Dinner in camp", body: "A Moroccan dinner in camp, with the lights kept low." },
      { moment: "Night", title: "The stars", body: "A guided stargazing session by the fire, with a telescope, then the return to Marrakech." },
    ],
    includes: ["Transport from Marrakech", "Dinner in camp", "Guided stargazing session", "Tea by the fire"],
    options: ["Overnight in camp", "Short camel ride at sunset", "Private table or private-use camp", "Night photography guide"],
    bring: ["A warm layer, the desert is cold at night", "Comfortable shoes"],
    idealFor: ["Couples", "Families with curious children", "Photography lovers"],
    buyers: ["Travel agencies and tour operators", "Honeymoon specialists", "Incentive planners"],
    extraSpecs: [
      { requirement: "Moon and weather", answer: "Best around the new moon and on clear nights; the date is checked before confirming", pending: true },
    ],
    faqs: [
      { question: "What if the sky is cloudy?", answer: "The dinner goes ahead and the stargazing is replaced with music by the fire. We check the forecast and advise on the date." },
      { question: "When is the best time?", answer: "Nights around the new moon, when the sky is darkest. We advise on dates at booking." },
      { question: "Can guests stay the night?", answer: "Yes, an overnight in camp can be added, with breakfast and a return the next morning." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "ourika-villages-crafts-argan",
    code: "E19",
    name: "Ourika Villages, Crafts & Argan",
    tagline: "Potters, Weavers and a Valley Lunch",
    summary:
      "A full day of valley life in the Ourika: roadside potters and carpet weavers, a women's argan cooperative, a saffron and herb garden, an Amazigh house and lunch chez l'habitant by the river.",
    seoTitle: "Ourika Villages, Crafts and Argan",
    seoDescription:
      "A full-day B2B excursion from Marrakech to the Ourika valley: potters and weavers, an argan cooperative, a saffron garden and lunch chez l'habitant.",
    region: "Ourika",
    duration: "Full day",
    level: "Easy",
    experiences: ["Crafts", "Argan cooperative", "Lunch chez l'habitant"],
    groupType: "Private or shared, 2 to 30",
    heroImage: "e31-ourika-village",
    cardImage: "e32-ourika-pottery",
    highlights: [
      "Potters and carpet weavers along the valley road",
      "A women's argan cooperative",
      "A saffron and herb garden",
      "A visit to a traditional Amazigh house",
      "Lunch chez l'habitant by the river",
    ],
    steps: [
      { moment: "Morning", title: "Into the valley", body: "Pickup in Marrakech and the drive into the Ourika, with a stop at the potters and weavers on the road." },
      { moment: "Late morning", title: "Argan and saffron", body: "A women's argan cooperative, then a saffron and herb garden in the valley." },
      { moment: "Midday", title: "Lunch chez l'habitant", body: "A visit to a traditional Amazigh house and lunch with the family." },
      { moment: "Afternoon", title: "By the river", body: "Free time by the river, then the drive back to Marrakech." },
    ],
    includes: ["Transport from Marrakech", "Local guide", "Argan cooperative and garden visits", "Lunch chez l'habitant"],
    options: ["Add the Anima Garden", "Short walk to a valley waterfall", "Private vehicle and guide", "Monday valley souk"],
    bring: ["Comfortable shoes", "Sun protection", "Small cash for crafts"],
    idealFor: ["Families and seniors", "Travellers interested in crafts", "Guests who prefer little walking"],
    buyers: ["Tour operators and agencies", "Online travel agencies", "Cultural travel specialists"],
    faqs: [
      { question: "Are the craft stops shopping stops?", answer: "They are visits to see the work being done. Buying is always optional." },
      { question: "How much walking is involved?", answer: "Very little. Most stops are by the road, with short walks in the garden and the village." },
      { question: "Can it be combined with the waterfalls?", answer: "A short waterfall walk can be added; for the full walk to the Setti Fatma falls, see E8." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "oukaimeden-high-plateau",
    code: "E20",
    name: "Oukaïmeden High Plateau",
    tagline: "Above the Ourika, to the High Pastures",
    summary:
      "A full day high above the Ourika valley on the Oukaïmeden plateau: the mountain road, the high summer pastures and shepherds' huts, prehistoric rock engravings, and snow and a ski lift in winter.",
    seoTitle: "Oukaïmeden High Plateau Day Trip",
    seoDescription:
      "A full-day B2B excursion from Marrakech to Oukaïmeden above the Ourika valley: the mountain road, high pastures, rock engravings and winter snow.",
    region: "Ourika",
    duration: "Full day",
    level: "Moderate",
    experiences: ["Mountain road", "Rock engravings", "Walk", "Snow in winter"],
    groupType: "Private or shared, 2 to 25",
    heroImage: "e33-oukaimeden-road",
    cardImage: "e34-oukaimeden-plateau",
    highlights: [
      "The mountain road up from the Ourika valley",
      "The high pastures of the Oukaïmeden plateau",
      "Prehistoric rock engravings",
      "Snow and the ski lift in winter",
      "Lunch with a view of the peaks",
    ],
    steps: [
      { moment: "Morning", title: "Up the valley", body: "Pickup in Marrakech, the drive up the Ourika and the climb on the mountain road to the plateau." },
      { moment: "Late morning", title: "The plateau", body: "A guided walk across the pastures to the rock engravings and the shepherds' huts, or time in the snow in winter." },
      { moment: "Midday", title: "Lunch", body: "Lunch with a view of the peaks, in a mountain restaurant or as a picnic." },
      { moment: "Afternoon", title: "Down to Marrakech", body: "The descent through the Ourika valley, with a stop in a valley village." },
    ],
    includes: ["Transport from Marrakech", "Mountain guide", "Lunch", "Mint tea"],
    options: ["Ski or sledge hire in winter", "Ski lift ticket in season", "Longer walk for active groups", "Private vehicle and guide"],
    bring: ["Warm and waterproof layers in every season", "Walking shoes, or snow boots in winter", "Sun protection"],
    idealFor: ["Nature lovers", "Families wanting snow in winter", "Returning visitors"],
    buyers: ["Tour operators adding a mountain day", "Agencies selling winter Marrakech stays", "Active travel specialists"],
    extraSpecs: [
      { requirement: "Season and road", answer: "Road access, snow and ski lift operation checked against the date before confirming", pending: true },
      { requirement: "Altitude", answer: "The plateau is high and cold; walking is at an easy pace but guests should be in good health" },
    ],
    faqs: [
      { question: "Is there always snow?", answer: "No. Snow depends on the winter. Outside the snow season the day is about the pastures, the engravings and walking." },
      { question: "Can guests ski?", answer: "In a good snow season, with equipment hire and the lift if it is running, confirmed close to the date." },
      { question: "Is the altitude a problem?", answer: "The plateau is high, so we keep the walking easy. Guests with heart or breathing conditions should check with their doctor." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "imlil-mule-ride-family-tea",
    code: "E21",
    name: "Imlil Mule Ride & Family Tea",
    tagline: "Up to Aroumd Without the Climb",
    summary:
      "A mountain day for guests who would rather ride than walk: a mule ride from Imlil up the valley to the village of Aroumd under the Toubkal massif, with mint tea and lunch in a village family's home.",
    seoTitle: "Imlil Mule Ride to Aroumd",
    seoDescription:
      "A full-day B2B excursion from Marrakech to Imlil: a led mule ride up to the village of Aroumd, mint tea and lunch in a local family's home.",
    region: "Imlil",
    duration: "Full day",
    level: "Easy",
    experiences: ["Mule ride", "Village visit", "Lunch chez l'habitant"],
    groupType: "Private or small groups, 2 to 15",
    heroImage: "e35-aroumd-village",
    cardImage: "e36-imlil-mule",
    highlights: [
      "A led mule ride up the Imlil valley",
      "The village of Aroumd under the Toubkal massif",
      "Mint tea on a village terrace",
      "Lunch in a local family's home",
      "Mountain views with almost no walking",
    ],
    steps: [
      { moment: "Morning", title: "To Imlil", body: "Pickup in Marrakech and the drive into the High Atlas to Imlil, where the mules and muleteers are waiting." },
      { moment: "Late morning", title: "Ride to Aroumd", body: "A mule ride up the valley path, each mule led by a muleteer, to the village of Aroumd." },
      { moment: "Midday", title: "Tea and lunch", body: "Mint tea on a terrace with the view, then lunch in a village family's home." },
      { moment: "Afternoon", title: "Down and back", body: "Ride or walk back down to Imlil, then the drive to Marrakech." },
    ],
    includes: ["Transport from Marrakech", "Mule and muleteer for each guest", "Mountain guide", "Lunch chez l'habitant"],
    options: ["Walk up and ride down", "Private vehicle and guide", "Overnight in a mountain gîte", "Bread-making with the family"],
    bring: ["Long trousers", "Closed shoes", "A warm layer", "Sun protection"],
    idealFor: ["Seniors", "Families with children", "Guests who want the mountains without a trek"],
    buyers: ["Tour operators adding an Atlas day", "Senior and family travel specialists", "Agencies selling Marrakech stays"],
    extraSpecs: [ACTIVITY_SPEC],
    faqs: [
      { question: "Is riding a mule safe?", answer: "Each mule is led on foot by a muleteer at a walk. Rider weight limits and minimum ages are confirmed at booking." },
      { question: "Can guests walk instead?", answer: "Yes. Many guests walk up and ride down, or walk the whole way with the group." },
      { question: "How is it different from the Imlil village walk?", answer: "E2 is an easy walk between lower villages; this day rides higher, to Aroumd, for guests who prefer not to walk." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "asni-ouirgane-atlas-villages",
    code: "E22",
    name: "Asni & Ouirgane Atlas Villages",
    tagline: "The Road to Imlil, Taken Slowly",
    summary:
      "A full day on the mountain roads below Imlil: the market town of Asni, earthen villages clinging to the valley sides, the red hills and river of Ouirgane, and a long lunch in the valley.",
    seoTitle: "Asni and Ouirgane Atlas Villages",
    seoDescription:
      "A full-day B2B excursion from Marrakech to Asni and Ouirgane in the High Atlas: mountain villages, the Asni market town and lunch in the valley.",
    region: "Imlil",
    duration: "Full day",
    level: "Easy",
    experiences: ["Scenic drive", "Village walk", "Valley lunch"],
    groupType: "Private or shared, 2 to 30",
    heroImage: "e37-tamguist-valley",
    cardImage: "e38-amssakrou-village",
    highlights: [
      "The mountain road from Marrakech to Asni",
      "The Saturday market in Asni, on the right day",
      "Earthen Amazigh villages on the valley sides",
      "The red hills and river of Ouirgane",
      "A long lunch in the valley",
    ],
    steps: [
      { moment: "Morning", title: "To Asni", body: "Pickup in Marrakech and the drive into the High Atlas to Asni, with the market on Saturdays." },
      { moment: "Late morning", title: "Villages", body: "A short guided walk through an earthen village and its terraced fields." },
      { moment: "Midday", title: "Lunch in Ouirgane", body: "The drive over to the Ouirgane valley and a long lunch with the view." },
      { moment: "Afternoon", title: "Return", body: "A walk by the river or time at leisure, then the drive back to Marrakech." },
    ],
    includes: ["Transport from Marrakech", "Local guide", "Lunch in the valley", "Mint tea"],
    options: ["Saturday departure for the Asni market", "Continue to Imlil for the afternoon", "Horse ride in Ouirgane", "Private vehicle and guide"],
    bring: ["Comfortable shoes", "A warm layer", "Sun protection"],
    idealFor: ["Seniors and families", "Photography lovers", "Returning visitors who have seen Imlil"],
    buyers: ["Tour operators adding an Atlas day", "Agencies selling Marrakech stays", "Photography tour organisers"],
    faqs: [
      { question: "Is the Asni market every day?", answer: "No, the weekly market is on Saturdays. On other days the stop is the village and its views." },
      { question: "How much walking is involved?", answer: "Short, easy village and riverside walks, adapted to the group." },
      { question: "Can it include Imlil?", answer: "Yes, the afternoon can continue to Imlil instead of Ouirgane, on request." },
    ],
  },
];

export const excursionBySlug = (slug: string): Excursion | undefined =>
  EXCURSIONS.find((excursion) => excursion.slug === slug);

export const excursionHref = (excursion: Excursion) => `/excursions/${excursion.slug}`;
