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
];

export const excursionBySlug = (slug: string): Excursion | undefined =>
  EXCURSIONS.find((excursion) => excursion.slug === slug);

export const excursionHref = (excursion: Excursion) => `/excursions/${excursion.slug}`;
