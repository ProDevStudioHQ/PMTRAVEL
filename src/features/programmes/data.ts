import type { Faq } from "@/components/FaqSection";

/**
 * The B2B programme portfolio.
 *
 * Every programme runs only in Marrakech, Imlil (High Atlas), Ourika and
 * Agafay, and mixes the same core experiences differently: lunch with a local
 * family, the souks, trekking, e-bike, quad, camel rides and dinner in a
 * desert camp. Sold white-label by travel agencies and tour operators.
 *
 * Rules for this file, the same as the rest of the site:
 *   - no drive times or distances: legs are timed only once logged in /routes
 *   - no retail prices: proposals are costed per departure from net rates
 *   - suppliers (hotels, camps, activity providers) are not named until contracted
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

/** The signature experiences each programme mixes. */
export type Experience = "Souk" | "Lunch chez l'habitant" | "Trek" | "E-bike" | "Quad" | "Camel ride" | "Camp dinner";

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
  experiences: Experience[];
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

const GUIDING = "English, French, Italian or Spanish";

const QUAD_SPEC: ProgrammeSpec = {
  requirement: "Quad and e-bike",
  answer: "Minimum age, driving rules and safety briefings set by the activity supplier, confirmed per departure",
  pending: true,
};

export const PROGRAMMES: Programme[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "atlas-agafay-escape",
    code: "P1",
    name: "Atlas & Agafay Escape",
    tagline: "Souks, a Mountain Trek & a Night in the Desert",
    summary:
      "Five days that give first-time visitors the essential mix: the Marrakech souks, a trek in the Imlil valley with lunch at a local family's home, and an Agafay afternoon of quad and camel ending with dinner and a night in camp.",
    seoTitle: "Atlas and Agafay Escape",
    seoDescription:
      "A 5-day B2B programme around Marrakech: souks, an Imlil trek with lunch chez l'habitant, quad and camel in Agafay and a desert camp dinner.",
    markets: ["France", "Spain", "Italy", "UK"],
    experiences: ["Souk", "Trek", "Lunch chez l'habitant", "Quad", "Camel ride", "Camp dinner"],
    groupType: "FIT and small groups",
    guiding: GUIDING,
    hotels: "Riad in Marrakech, desert camp in Agafay",
    format: "5 days / 4 nights",
    days: 5,
    nights: 4,
    heroImage: "b3b-agafay-camp",
    cardImage: "b3b-agafay-camp",
    route: [
      { place: "Marrakech", nights: "3N" },
      { place: "Agafay", nights: "1N" },
    ],
    highlights: [
      "A guided walk through the Marrakech souks",
      "A half-day trek in the Imlil valley",
      "Lunch at the home of a local Amazigh family",
      "Quad ride and sunset camel ride in Agafay",
      "Dinner under the stars and a night in camp",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Marrakech",
        place: "Marrakech",
        body: "Airport welcome and private transfer to a riad in the medina. Mint tea on arrival and a first dinner on the terrace.",
        overnight: "Marrakech",
      },
      {
        day: "Day 2",
        title: "The souks of Marrakech",
        place: "Marrakech medina",
        body: "A guided morning through the souks: spice sellers, leather and metal workers, the dyers' quarter. Afternoon free, evening on Jemaa el-Fna.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 3",
        title: "Imlil trek and lunch chez l'habitant",
        place: "Imlil · High Atlas",
        body: "Into the High Atlas for a guided half-day trek between Amazigh villages, then lunch at a local family's home: bread from the oven, tajine and mint tea. Return to Marrakech.",
        overnight: "Marrakech",
        imageKey: "b4-atlas-imlil",
      },
      {
        day: "Day 4",
        title: "Quad, camels and a desert camp",
        place: "Agafay",
        body: "A slow morning, then to Agafay for a quad ride across the stone desert and a camel ride at sunset. Dinner in camp with Moroccan tea and music, and a night under the stars.",
        overnight: "Agafay camp",
        imageKey: "b3b-agafay-camp",
      },
      {
        day: "Day 5",
        title: "Departure",
        place: "Agafay · Marrakech",
        body: "Breakfast in the desert and transfer to Marrakech airport, timed to the flight.",
        overnight: "—",
      },
    ],
    idealFor: ["First-time visitors to Morocco", "Couples and friends", "Short breaks with a real taste of adventure"],
    buyers: ["European tour operators and agencies", "UK short-break specialists", "Online travel agencies selling packages"],
    whyItSells: [
      "The four experiences clients ask for most, in five days.",
      "Short transfers from one Marrakech base keep the programme easy to sell and to operate.",
      "Fits a long weekend plus two days, ideal for spring and autumn.",
    ],
    includes: [
      "3 nights in a riad in Marrakech and 1 night in an Agafay camp",
      "Breakfast daily, lunch chez l'habitant in Imlil and dinner in camp",
      "Airport and excursion transfers",
      "Local guide for the souks and a mountain guide for the trek",
      "Quad ride and camel ride in Agafay",
    ],
    options: [
      "Upgrade to a 5-star riad and a premium camp",
      "Add an e-bike morning in Agafay",
      "Hammam in Marrakech",
      "Fully private version",
    ],
    extraSpecs: [QUAD_SPEC],
    faqs: [
      {
        question: "How difficult is the Imlil trek?",
        answer:
          "It is a half-day walk on mountain paths between villages, suitable for anyone in reasonable health. The mountain guide adapts the route to the group.",
      },
      {
        question: "Can clients skip the quad?",
        answer: "Yes. The quad can be replaced by an e-bike ride or a longer camel ride at no change to the rest of the day.",
      },
      {
        question: "What is lunch chez l'habitant?",
        answer:
          "Lunch at the home of a local family in a mountain village, with home-cooked Moroccan dishes. Families are selected and briefed in advance.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "marrakech-active-week",
    code: "P2",
    name: "Marrakech Active Week",
    tagline: "E-bike Ourika, Trek Imlil, Ride Agafay",
    summary:
      "A full week of movement around Marrakech: an e-bike ride through the Ourika valley with lunch chez l'habitant, a two-day Imlil trek with a night in a mountain gîte, and quads, camels and a camp dinner in Agafay.",
    seoTitle: "Marrakech Active Week",
    seoDescription:
      "A 7-day active B2B programme: souks, e-bike in Ourika with lunch chez l'habitant, a 2-day Imlil trek, quad, camel and a camp dinner in Agafay.",
    markets: ["UK", "Europe", "USA"],
    experiences: ["Souk", "E-bike", "Lunch chez l'habitant", "Trek", "Quad", "Camel ride", "Camp dinner"],
    groupType: "Active FIT and small groups",
    guiding: GUIDING,
    hotels: "Riad in Marrakech, mountain gîte in Imlil, desert camp in Agafay",
    format: "7 days / 6 nights",
    days: 7,
    nights: 6,
    heroImage: "c11b-ourika-road",
    cardImage: "c11b-ourika-road",
    route: [
      { place: "Marrakech", nights: "3N" },
      { place: "Imlil", nights: "1N" },
      { place: "Agafay", nights: "1N" },
      { place: "Marrakech", nights: "1N" },
    ],
    highlights: [
      "E-bike ride along the Ourika valley",
      "Lunch chez l'habitant in an Ourika village",
      "A two-day Imlil trek with a night in a mountain gîte",
      "Quad and camel rides in the Agafay desert",
      "Dinner and a night in a desert camp",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Marrakech",
        place: "Marrakech",
        body: "Airport welcome, private transfer to a riad and a briefing on the week ahead over dinner.",
        overnight: "Marrakech",
      },
      {
        day: "Day 2",
        title: "Souks on foot",
        place: "Marrakech medina",
        body: "A guided walk through the souks and the artisans' quarters, the Bahia Palace, and an evening on Jemaa el-Fna.",
        overnight: "Marrakech",
        imageKey: "b2-marrakech-medersa",
      },
      {
        day: "Day 3",
        title: "E-bike the Ourika valley",
        place: "Ourika",
        body: "An e-bike ride through the Ourika valley along the river and past terraced villages, then lunch chez l'habitant with a local family. Return to Marrakech.",
        overnight: "Marrakech",
        imageKey: "c11b-ourika-road",
      },
      {
        day: "Day 4",
        title: "Imlil trek, day one",
        place: "Imlil · High Atlas",
        body: "To Imlil and a guided trek up through walnut groves and Amazigh villages to a mountain gîte, with dinner cooked by the family who runs it.",
        overnight: "Imlil gîte",
        imageKey: "b4-atlas-imlil",
      },
      {
        day: "Day 5",
        title: "Trek down, ride into the desert",
        place: "Imlil · Agafay",
        body: "A morning trek back down the valley and a picnic, then to Agafay for a quad ride, a sunset camel ride, dinner in camp and a night under the stars.",
        overnight: "Agafay camp",
        imageKey: "b3b-agafay-camp",
      },
      {
        day: "Day 6",
        title: "Back to Marrakech",
        place: "Marrakech",
        body: "Breakfast in the desert and a free afternoon in Marrakech: hammam, shopping or rest. Farewell dinner.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 7",
        title: "Departure",
        place: "Marrakech",
        body: "Transfer to Marrakech airport.",
        overnight: "—",
      },
    ],
    idealFor: ["Active travellers aged 25 to 60", "Friends and couples who like to move", "Clients who have seen the classic Morocco"],
    buyers: ["UK adventure and active travel brands", "European active-holiday operators", "US adventure travel advisors"],
    whyItSells: [
      "Active and adventure trips are among the top luxury travel trends for 2026.",
      "Three different activities in three different landscapes, all within reach of Marrakech.",
      "No long crossings: more time moving on foot and on bikes, less time in vehicles.",
    ],
    includes: [
      "4 nights in a Marrakech riad, 1 night in an Imlil gîte, 1 night in an Agafay camp",
      "Breakfast daily, lunch chez l'habitant, gîte dinner, picnic and camp dinner",
      "E-bike with helmet and guide in Ourika",
      "Mountain guide for the two-day trek",
      "Quad ride and camel ride in Agafay",
      "All transfers",
    ],
    options: [
      "Mule support for luggage on the trek",
      "Upgrade to a mountain lodge instead of a gîte",
      "Extra trekking day",
      "Premium desert camp",
    ],
    extraSpecs: [
      QUAD_SPEC,
      { requirement: "Fitness", answer: "Moderate: two days of mountain walking and a guided e-bike ride" },
    ],
    faqs: [
      {
        question: "Do clients need to be experienced cyclists?",
        answer: "No. The e-bikes are electric-assisted and the ride is guided at an easy pace, with a support vehicle.",
      },
      {
        question: "What is a mountain gîte like?",
        answer:
          "A simple family-run guesthouse in the village, with shared or private rooms and a home-cooked dinner. A lodge upgrade is available.",
      },
      {
        question: "Can the trek be replaced with something gentler?",
        answer: "Yes. The two-day trek can become a village walk with a night in an Imlil lodge.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "family-adventure",
    code: "P3",
    name: "Marrakech Family Adventure",
    tagline: "Treasure Hunts, Camels & a Family Camp",
    summary:
      "Six easy days built for families: a souk treasure hunt, a gentle Ourika walk and lunch chez l'habitant, a mule-assisted walk in Imlil, and camels, kids' quads and a family camp night in Agafay.",
    seoTitle: "Marrakech Family Adventure",
    seoDescription:
      "A 6-day family B2B programme: a souk treasure hunt, Ourika with lunch chez l'habitant, an Imlil mule walk, camels, quads and a camp night in Agafay.",
    markets: ["USA", "Canada", "UK", "France"],
    experiences: ["Souk", "Lunch chez l'habitant", "Trek", "Camel ride", "Quad", "Camp dinner"],
    groupType: "Private families, 4 to 16 travellers",
    guiding: GUIDING,
    hotels: "Family riad with pool in Marrakech, family tents in Agafay",
    format: "6 days / 5 nights",
    days: 6,
    nights: 5,
    heroImage: "b3-agafay",
    cardImage: "b3-agafay",
    route: [
      { place: "Marrakech", nights: "4N" },
      { place: "Agafay", nights: "1N" },
    ],
    highlights: [
      "A souk treasure hunt with a family guide",
      "A gentle walk and lunch chez l'habitant in Ourika",
      "A mule-assisted walk to an Imlil village",
      "Camel rides and kids' quads in Agafay",
      "A family dinner and a night in camp",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Welcome to Marrakech",
        place: "Marrakech",
        body: "Private arrival with child seats ready, a family riad with a pool and an early family dinner.",
        overnight: "Marrakech",
      },
      {
        day: "Day 2",
        title: "The souk treasure hunt",
        place: "Marrakech medina",
        body: "A family guide turns the souks into a treasure hunt of spices, lanterns and slippers, then a pool afternoon at the riad.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 3",
        title: "Ourika river day",
        place: "Ourika",
        body: "A gentle walk along the Ourika river and through a village, then lunch chez l'habitant with a local family. Back to the pool by mid-afternoon.",
        overnight: "Marrakech",
        imageKey: "c11-ourika-valley",
      },
      {
        day: "Day 4",
        title: "Mules and mountains",
        place: "Imlil · High Atlas",
        body: "To Imlil for a short walk to a mountain village, with mules for younger children and anyone who prefers to ride, and a picnic with a view.",
        overnight: "Marrakech",
        imageKey: "b4-atlas-imlil",
      },
      {
        day: "Day 5",
        title: "Camels, quads and stars",
        place: "Agafay",
        body: "To Agafay for camel rides, kids' quads for older children, games in the desert, a family dinner under the stars and a night in family tents.",
        overnight: "Agafay camp",
        imageKey: "b3b-agafay-camp",
      },
      {
        day: "Day 6",
        title: "Home",
        place: "Agafay · Marrakech",
        body: "Breakfast in the desert and transfer to Marrakech airport.",
        overnight: "—",
      },
    ],
    idealFor: ["Families with children from 5 years", "Grandparents travelling with grandchildren", "Family celebrations"],
    buyers: ["Family and luxury travel advisors", "Family holiday specialists", "Multigenerational travel planners"],
    whyItSells: [
      "Family and multigenerational travel are the top two luxury trends for 2026 in Virtuoso's advisor survey.",
      "One Marrakech base with a pool, and no day longer than families can enjoy.",
      "Every activity has a gentler version for younger children and grandparents.",
    ],
    includes: [
      "4 nights in a family riad with pool and 1 night in family tents in Agafay",
      "Breakfast daily, lunch chez l'habitant, picnic and camp dinner",
      "Private vehicle with child seats",
      "Family guide in Marrakech and the mountains",
      "Treasure hunt, mule-assisted walk, camel rides and kids' quads",
    ],
    options: [
      "Kids' cooking class in Marrakech",
      "Extra pool day",
      "Private chef dinner at the riad",
      "Upgrade to a premium family camp",
    ],
    extraSpecs: [
      QUAD_SPEC,
      { requirement: "Children", answer: "Child seats, family rooms and children's menus arranged per departure" },
    ],
    faqs: [
      {
        question: "From what age can children ride a quad?",
        answer:
          "Kids' quads have a minimum age set by the activity supplier, and children under that age enjoy the camel ride instead. The rule is confirmed for each departure.",
      },
      {
        question: "Is the mountain walk suitable for young children?",
        answer: "Yes. It is short, and mules carry younger children or anyone who prefers to ride.",
      },
      {
        question: "Can the family stay in one riad the whole time?",
        answer: "Yes. The family keeps the same Marrakech riad for four nights; only the camp night is elsewhere.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "private-atlas-desert",
    code: "P4",
    name: "Private Atlas & Desert Journey",
    tagline: "Luxury Lodge, Private Guides & a Desert Dinner for Two",
    summary:
      "A private, unhurried journey for luxury travellers: a private souk walk, two nights in a High Atlas lodge with a trek and lunch chez l'habitant, a private e-bike ride in Ourika and a luxury Agafay camp with a private dinner.",
    seoTitle: "Private Atlas and Desert Journey",
    seoDescription:
      "A 6-day private luxury B2B programme: a private souk walk, an Imlil lodge with a trek and lunch chez l'habitant, Ourika by e-bike and a luxury Agafay camp.",
    markets: ["USA", "Canada", "UK"],
    experiences: ["Souk", "Trek", "Lunch chez l'habitant", "E-bike", "Camel ride", "Camp dinner"],
    groupType: "Private couples and small private groups",
    guiding: GUIDING,
    hotels: "5-star riad or palace hotel, luxury mountain lodge, luxury desert camp",
    format: "6 days / 5 nights",
    days: 6,
    nights: 5,
    heroImage: "b4-atlas-imlil",
    cardImage: "b4-atlas-imlil",
    route: [
      { place: "Marrakech", nights: "2N" },
      { place: "Imlil", nights: "2N" },
      { place: "Agafay", nights: "1N" },
    ],
    highlights: [
      "Private guides and a private vehicle throughout",
      "Two nights in a luxury High Atlas lodge",
      "A private trek and lunch chez l'habitant",
      "A private e-bike ride in the Ourika valley",
      "Luxury Agafay camp with a private dinner",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Private arrival",
        place: "Marrakech",
        body: "Meet and assist at the airport and a private transfer to a 5-star riad. Dinner on a rooftop over the medina.",
        overnight: "Marrakech",
        imageKey: "b2-marrakech-medersa",
      },
      {
        day: "Day 2",
        title: "The souks with a private guide",
        place: "Marrakech medina",
        body: "A private guided morning in the souks with a personal shopper, the Bahia Palace and the Majorelle Garden, then a hammam ritual.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 3",
        title: "Up to the mountains",
        place: "Imlil · High Atlas",
        body: "A private drive to a luxury lodge in the Imlil valley, a short walk to a village and dinner at the lodge with views of the peaks.",
        overnight: "Imlil lodge",
        imageKey: "b4-atlas-imlil",
      },
      {
        day: "Day 4",
        title: "Private trek and lunch chez l'habitant",
        place: "Imlil · Ourika",
        body: "A private trek with a mountain guide and lunch at a local family's home, then an afternoon e-bike ride in the Ourika valley.",
        overnight: "Imlil lodge",
        imageKey: "c11b-ourika-road",
      },
      {
        day: "Day 5",
        title: "Luxury desert camp",
        place: "Agafay",
        body: "Down to a luxury camp in Agafay, a sunset camel ride and a private dinner for two under the stars.",
        overnight: "Agafay luxury camp",
        imageKey: "b3b-agafay-camp",
      },
      {
        day: "Day 6",
        title: "Departure",
        place: "Agafay · Marrakech",
        body: "Breakfast in the desert and a private transfer to Marrakech airport.",
        overnight: "—",
      },
    ],
    idealFor: ["Honeymooners and couples", "Luxury travellers 40+", "Clients adding Morocco to a European trip"],
    buyers: ["Luxury travel advisors and host agencies", "Virtuoso-type advisor networks", "Honeymoon specialists"],
    whyItSells: [
      "Luxury advisors ranked Morocco among their top five destinations for 2026.",
      "Mountains, valley and desert in six days, all private and all close to Marrakech.",
      "Easy to combine with a stay in Spain, Portugal or Paris.",
    ],
    includes: [
      "2 nights in a 5-star riad, 2 nights in a luxury lodge, 1 night in a luxury camp",
      "Breakfast daily, lunch chez l'habitant, lodge dinners and a private camp dinner",
      "Private vehicle, driver and guides throughout",
      "Private trek, private e-bike ride and camel ride",
      "Meet and assist and a hammam ritual",
    ],
    options: [
      "Hot-air balloon flight over the Marrakech plains",
      "Private cooking class in the riad",
      "Extra night at the lodge",
      "Palace hotel upgrade in Marrakech",
    ],
    extraSpecs: [QUAD_SPEC],
    faqs: [
      {
        question: "Is everything private?",
        answer: "Yes. Vehicle, driver, guides and activities are private, and dates are set by the client.",
      },
      {
        question: "Which lodge and camp are used?",
        answer:
          "Properties are confirmed per departure from our selected shortlist, matched to budget and availability, and named in the proposal.",
      },
      {
        question: "Can a quad ride be added?",
        answer: "Yes. A private quad ride can be added in Agafay before sunset.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "marrakech-weekend-express",
    code: "P5",
    name: "Marrakech Weekend Express",
    tagline: "Souk, Ourika & a Desert Night in Three Days",
    summary:
      "The long-weekend format: an evening in the souks, a morning in the Ourika valley with lunch chez l'habitant, a sunset camel ride and dinner in an Agafay camp, and a sunrise quad before the flight home.",
    seoTitle: "Marrakech Weekend Express",
    seoDescription:
      "A 3-day short-break B2B programme: Marrakech souks, Ourika with lunch chez l'habitant, a sunset camel ride, camp dinner and a sunrise quad in Agafay.",
    markets: ["UK", "France", "Spain", "Italy"],
    experiences: ["Souk", "Lunch chez l'habitant", "Camel ride", "Camp dinner", "Quad"],
    groupType: "FIT, friends and couples",
    guiding: GUIDING,
    hotels: "Riad in Marrakech, desert camp in Agafay",
    format: "3 days / 2 nights",
    days: 3,
    nights: 2,
    heroImage: "b1-marrakech-hero",
    cardImage: "b1-marrakech-hero",
    route: [
      { place: "Marrakech", nights: "1N" },
      { place: "Agafay", nights: "1N" },
    ],
    highlights: [
      "An evening souk walk on arrival",
      "Ourika valley and lunch chez l'habitant",
      "A sunset camel ride in Agafay",
      "Dinner and a night in a desert camp",
      "A sunrise quad ride before the flight",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Souks at dusk",
        place: "Marrakech medina",
        body: "Arrival and transfer to a riad, then an evening guided walk through the souks to Jemaa el-Fna and dinner in the medina.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 2",
        title: "Ourika, then the desert",
        place: "Ourika · Agafay",
        body: "A morning in the Ourika valley with a village walk and lunch chez l'habitant, then to Agafay for a sunset camel ride, dinner in camp and a night under the stars.",
        overnight: "Agafay camp",
        imageKey: "c11-ourika-valley",
      },
      {
        day: "Day 3",
        title: "Sunrise quad and home",
        place: "Agafay",
        body: "An early quad ride in the morning light, breakfast in camp and transfer to Marrakech airport.",
        overnight: "—",
        imageKey: "b3-agafay",
      },
    ],
    idealFor: ["Weekend travellers from Europe", "Friends and birthday trips", "Couples on a short break"],
    buyers: ["UK and European short-break operators", "City-break specialists", "Online travel agencies"],
    whyItSells: [
      "Short flights from Europe make a Marrakech weekend an easy impulse buy.",
      "Five experiences in three days, sold as one package.",
      "Works on Friday to Sunday or any three days of the week.",
    ],
    includes: [
      "1 night in a Marrakech riad and 1 night in an Agafay camp",
      "Breakfast both days, lunch chez l'habitant and dinner in camp",
      "Airport and excursion transfers",
      "Local guide for the souks and Ourika",
      "Camel ride and quad ride",
    ],
    options: [
      "Extra night in Marrakech",
      "Replace the quad with an e-bike ride",
      "Premium camp upgrade",
      "Hammam before the flight",
    ],
    extraSpecs: [QUAD_SPEC],
    faqs: [
      {
        question: "Is three days really enough?",
        answer:
          "For a first taste, yes. The programme is designed around short flights from Europe, and an extra Marrakech night is the most popular add-on.",
      },
      {
        question: "What time is the sunrise quad?",
        answer: "It is timed to the sunrise for the date and to the flight time, so nobody misses their plane.",
      },
      {
        question: "Can it start on any day?",
        answer: "Yes. It runs any three days of the week, subject to camp availability.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "atlas-agafay-team-challenge",
    code: "P6",
    name: "Atlas & Agafay Team Challenge",
    tagline: "An Incentive Built on Movement and the Table",
    summary:
      "A four-day incentive for corporate groups: a souk challenge, an e-bike relay in Ourika with lunch chez l'habitant, a team trek in Imlil and a quad convoy, camel ride and gala dinner in an Agafay camp.",
    seoTitle: "Atlas and Agafay Team Challenge",
    seoDescription:
      "A 4-day MICE incentive: a souk challenge, e-bike relay in Ourika with lunch chez l'habitant, a team trek in Imlil and a quad convoy and gala in Agafay.",
    markets: ["Europe", "USA", "Canada"],
    experiences: ["Souk", "E-bike", "Lunch chez l'habitant", "Trek", "Quad", "Camel ride", "Camp dinner"],
    groupType: "Corporate incentive groups, 15 to 80",
    guiding: GUIDING,
    hotels: "4-star or 5-star hotel in Marrakech, private-use desert camp",
    format: "4 days / 3 nights",
    days: 4,
    nights: 3,
    heroImage: "b3b-agafay-camp",
    cardImage: "c11-ourika-valley",
    route: [
      { place: "Marrakech", nights: "2N" },
      { place: "Agafay", nights: "1N" },
    ],
    highlights: [
      "Souk challenge in teams",
      "E-bike relay through the Ourika valley",
      "Lunch chez l'habitant for the whole group",
      "Team trek in the Imlil valley",
      "Quad convoy, camels and a gala dinner in camp",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and the souk challenge",
        place: "Marrakech",
        body: "Group arrival and hotel check-in, then teams race through the souks on a challenge of clues, bargaining and tasting. Welcome dinner.",
        overnight: "Marrakech",
        imageKey: "b1-marrakech-hero",
      },
      {
        day: "Day 2",
        title: "Ourika e-bike relay",
        place: "Ourika",
        body: "Teams ride e-bike relay stages through the Ourika valley, finishing at a village for lunch chez l'habitant hosted across several family homes.",
        overnight: "Marrakech",
        imageKey: "c11b-ourika-road",
      },
      {
        day: "Day 3",
        title: "Imlil trek to an Agafay gala",
        place: "Imlil · Agafay",
        body: "A morning team trek in the Imlil valley, then to Agafay for a quad convoy, a sunset camel ride and a gala dinner with music in a private-use camp.",
        overnight: "Agafay camp",
        imageKey: "b3b-agafay-camp",
      },
      {
        day: "Day 4",
        title: "Departure",
        place: "Agafay · Marrakech",
        body: "Breakfast in the desert, an awards moment and group transfers to Marrakech airport.",
        overnight: "—",
      },
    ],
    idealFor: ["Sales incentive winners", "Team offsites and leadership groups", "Company anniversary trips"],
    buyers: ["MICE agencies and incentive houses", "Corporate travel managers", "Event planners"],
    whyItSells: [
      "Team activities, local culture and a gala in four days: the incentive formula in one programme.",
      "Every activity is scalable, from 15 to 80 participants, with parallel groups.",
      "All within reach of Marrakech airport, so no internal flights or long transfers.",
    ],
    includes: [
      "2 nights in a Marrakech hotel and 1 night in a private-use Agafay camp",
      "Breakfast daily, welcome dinner, lunch chez l'habitant, picnic and gala dinner",
      "Group transfers throughout",
      "Challenge design and on-site activity coordinators",
      "E-bikes, mountain guides, quads and camels",
      "PM Travel coordinator with the group throughout",
    ],
    options: [
      "Branded challenge materials and awards",
      "Conference session in Marrakech",
      "Private-use riad dinner instead of a restaurant",
      "Hot-air balloon flight for VIPs",
    ],
    extraSpecs: [
      QUAD_SPEC,
      { requirement: "Group size", answer: "15 to 80 participants, run as parallel teams" },
      { requirement: "Camp capacity", answer: "Private-use camp confirmed for the group size and layout", pending: true },
    ],
    faqs: [
      {
        question: "Can the group be larger than 80?",
        answer:
          "Possibly, by splitting activities across parallel groups and more than one camp. We confirm what works for your numbers before proposing it.",
      },
      {
        question: "Can non-sporty participants take part?",
        answer: "Yes. Every challenge has a lighter role, and the trek and e-bike stages have gentler versions.",
      },
      {
        question: "Can the programme include a meeting?",
        answer: "Yes. A conference or workshop session can be added in Marrakech on day 1 or day 2.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "trek-and-taste-atlas",
    code: "P7",
    name: "Trek & Taste the High Atlas",
    tagline: "From Imlil to Ourika on Foot, Village to Village",
    summary:
      "An eight-day trekking programme across the High Atlas from Imlil to the Ourika valley, sleeping in village gîtes and eating with local families, then down to Agafay for a camel ride and dinner in camp.",
    seoTitle: "Trek and Taste the High Atlas",
    seoDescription:
      "An 8-day trekking B2B programme from Imlil to Ourika with village gîtes and lunch chez l'habitant, then a camel ride and camp dinner in Agafay.",
    markets: ["UK", "France", "Spain", "Italy"],
    experiences: ["Souk", "Trek", "Lunch chez l'habitant", "Camel ride", "Camp dinner"],
    groupType: "Trekking groups and active FIT",
    guiding: GUIDING,
    hotels: "Riad in Marrakech, village gîtes in the mountains, desert camp",
    format: "8 days / 7 nights",
    days: 8,
    nights: 7,
    heroImage: "c11-ourika-valley",
    cardImage: "b4-atlas-imlil",
    route: [
      { place: "Marrakech", nights: "1N" },
      { place: "Imlil", nights: "1N" },
      { place: "Tacheddirt", nights: "1N" },
      { place: "Ourika", nights: "1N" },
      { place: "Marrakech", nights: "1N" },
      { place: "Agafay", nights: "1N" },
      { place: "Marrakech", nights: "1N" },
    ],
    highlights: [
      "A three-day trek from Imlil over to the Ourika valley",
      "Nights in family-run village gîtes",
      "Lunches and dinners with mountain families",
      "Mules carry the luggage between villages",
      "A camel ride and dinner in an Agafay camp to finish",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Marrakech",
        place: "Marrakech",
        body: "Airport welcome, transfer to a riad and a trek briefing with the mountain guide.",
        overnight: "Marrakech",
      },
      {
        day: "Day 2",
        title: "To Imlil and the first walk",
        place: "Imlil",
        body: "Morning in the souks to pick up a headscarf and snacks, then to Imlil for a warm-up walk and dinner in a village gîte.",
        overnight: "Imlil gîte",
        imageKey: "b4-atlas-imlil",
      },
      {
        day: "Day 3",
        title: "Over to Tacheddirt",
        place: "High Atlas",
        body: "A full trekking day up through the valley to Tacheddirt, one of the highest villages in the area, with lunch chez l'habitant on the way.",
        overnight: "Tacheddirt gîte",
      },
      {
        day: "Day 4",
        title: "Down into the Ourika valley",
        place: "Ourika",
        body: "Over the pass and down into the Ourika valley, through terraced fields and walnut trees, to a village gîte and a family dinner.",
        overnight: "Ourika gîte",
        imageKey: "c11-ourika-valley",
      },
      {
        day: "Day 5",
        title: "Along the river to Marrakech",
        place: "Ourika",
        body: "A final morning walk along the Ourika river, lunch chez l'habitant, and the drive back to Marrakech for a hammam and a riad night.",
        overnight: "Marrakech",
        imageKey: "c11b-ourika-road",
      },
      {
        day: "Day 6",
        title: "Camels and camp",
        place: "Agafay",
        body: "A free morning in Marrakech, then to Agafay for a sunset camel ride, dinner in camp and a night under the stars.",
        overnight: "Agafay camp",
        imageKey: "b3b-agafay-camp",
      },
      {
        day: "Day 7",
        title: "Marrakech souks",
        place: "Marrakech",
        body: "Back to Marrakech for a guided souk walk, free time and a farewell dinner.",
        overnight: "Marrakech",
        imageKey: "b2-marrakech-medersa",
      },
      {
        day: "Day 8",
        title: "Departure",
        place: "Marrakech",
        body: "Transfer to Marrakech airport.",
        overnight: "—",
      },
    ],
    idealFor: ["Keen walkers and trekking groups", "Travellers who want to meet mountain families", "Walking clubs"],
    buyers: ["UK and European walking holiday operators", "Trekking clubs and associations", "Adventure travel brands"],
    whyItSells: [
      "The Imlil to Ourika crossing is a real mountain route, not a day walk repackaged.",
      "Village gîtes and family meals give the authenticity trekking clients buy.",
      "Marrakech and a desert night at each end make it an easy full week to sell.",
    ],
    includes: [
      "3 nights in a Marrakech riad, 3 nights in village gîtes, 1 night in an Agafay camp",
      "Full board on the trek, lunches chez l'habitant, camp dinner",
      "Mountain guide and mules for luggage",
      "Camel ride in Agafay and a guided souk walk",
      "All transfers",
    ],
    options: [
      "Extra trekking day towards the higher passes",
      "Hammam and massage after the trek",
      "Add an e-bike or quad session in Agafay",
      "Private departures for clubs",
    ],
    extraSpecs: [
      { requirement: "Fitness", answer: "Good: three consecutive days of mountain trekking with ascents and descents" },
      { requirement: "Trek conditions", answer: "Route and season checked before confirming; winter departures adapted" },
    ],
    faqs: [
      {
        question: "How hard is the trek?",
        answer:
          "It is a real mountain crossing with climbs and descents over three days, suited to regular walkers in good health. Luggage goes by mule.",
      },
      {
        question: "What are the gîtes like?",
        answer: "Simple family-run village guesthouses with home-cooked meals. They are part of the experience rather than hotels.",
      },
      {
        question: "Can it run in winter?",
        answer: "The route is checked against season and conditions before confirming, and winter departures use an adapted lower route.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "taste-of-marrakech",
    code: "P8",
    name: "Taste of Marrakech",
    tagline: "Morocco Through the Table",
    summary:
      "A 7-night culinary journey through Marrakech, Imlil, the Ourika valley and Agafay, with hands-on cooking, the souks, lunch chez l'habitant, mountain activities and a desert dinner.",
    seoTitle: "Taste of Marrakech Culinary Programme",
    seoDescription:
      "A 7-night B2B culinary programme around Marrakech, Imlil, Ourika and Agafay: hands-on cooking, souks, mountains and curated dining.",
    markets: ["USA", "UK", "Europe"],
    experiences: ["Souk", "Lunch chez l'habitant", "Trek", "E-bike", "Camel ride", "Quad", "Camp dinner"],
    groupType: "FIT, small groups, incentives",
    guiding: GUIDING,
    hotels: "4-star, 5-star and luxury versions",
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
];

export const programmeBySlug = (slug: string): Programme | undefined =>
  PROGRAMMES.find((programme) => programme.slug === slug);

export const programmeHref = (programme: Programme) => `/programmes/${programme.slug}`;
