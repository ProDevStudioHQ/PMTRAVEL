import type { Faq } from "@/components/FaqSection";
import type { IconName } from "@/components/Icon";

/**
 * B2B audience pages under /b2b/[slug].
 *
 * Copy rules: written for travel professionals, short, no invented figures.
 * Claims used here come from the business brief (net rates, white-label,
 * 24h quotes, FIT to 200+ pax, 24/7 on-trip assistance, five languages).
 */

export type Offer = { icon: IconName; title: string; body: string };

export type Audience = {
  slug: string;
  name: string;
  /** One line under the item in the mega menu. */
  menuBlurb: string;
  /** One line on the home "Who we work with" card. */
  cardLine: string;
  icon: IconName;
  heroImage: string;
  eyebrow: string;
  h1: string;
  standfirst: string;
  /** <title> without the brand suffix. */
  seoTitle: string;
  seoDescription: string;
  whoFor: string[];
  offers: Offer[];
  faqs: Faq[];
  related: string[];
  /** Pre-selects the business type on the quote form. */
  formType: string;
};

export const PARTNER_PROCESS = [
  {
    title: "Send your brief",
    body: "Dates, pax, service level and the client profile. A rough brief is fine — we ask the right questions.",
  },
  {
    title: "Receive a costed proposal",
    body: "A day-by-day programme at net rates with clear inclusions, options and written terms.",
  },
  {
    title: "Confirm & we operate",
    body: "Written confirmation, vouchers in your brand if needed, and one ops contact for the whole file.",
  },
  {
    title: "24/7 support on the ground",
    body: "Our Marrakech team follows every arrival, transfer and activity until departure.",
  },
] as const;

export const AUDIENCES: Audience[] = [
  {
    slug: "travel-agencies",
    name: "Travel Agencies",
    menuBlurb: "Net-rate Morocco packages you can resell under your brand.",
    cardLine: "Packages and FIT files at net rates, ready to resell.",
    icon: "store",
    heroImage: "d6-dmc-riad-patio",
    eyebrow: "B2B · Travel Agencies",
    h1: "Morocco ground services for travel agencies",
    standfirst:
      "Sell Morocco with confidence. We build, cost and operate your clients' trips at net rates, white-label if you wish, with one local team from arrival to departure.",
    seoTitle: "Morocco DMC for Travel Agencies | Net Rates",
    seoDescription:
      "Morocco DMC for travel agencies: net rates, white-label service, fast costed proposals and 24/7 on-trip support from our Marrakech operations team.",
    whoFor: [
      "Retail and online agencies selling Morocco to couples, families and small groups",
      "Agencies that need a reliable local partner without building a Morocco desk",
      "Teams who want fast quotes they can mark up and send the same day",
    ],
    offers: [
      { icon: "badge-percent", title: "Net rates, clear inclusions", body: "Every proposal lists exactly what is included. You set your margin; we never contact your client to sell direct." },
      { icon: "layers", title: "White-label documents", body: "Itineraries and vouchers can carry your brand. Guides and drivers introduce themselves as your local team if you prefer." },
      { icon: "clock", title: "Quotes within 24h", body: "A costed day-by-day proposal for standard requests, with alternatives at different service levels." },
      { icon: "message-circle", title: "One ops contact on WhatsApp", body: "A named coordinator follows the file from first quote to final transfer and answers in your working hours." },
      { icon: "hotel", title: "From riads to 5-star", body: "Boutique riads in the medina, design hotels in Gueliz, palace hotels, desert camps and mountain lodges." },
      { icon: "life-buoy", title: "24/7 on-trip assistance", body: "If a flight is late or plans change, our team on the ground handles it and keeps you informed." },
    ],
    faqs: [
      { question: "Do you work with small agencies?", answer: "Yes. We handle single FIT bookings as well as series." },
      { question: "Will you contact my clients directly?", answer: "Only for operational reasons during the trip, and only as your local team if you work white-label. We never market to your clients." },
      { question: "Can I get a quote for a couple's trip in 24 hours?", answer: "Yes, for standard requests. Complex multi-city or peak-season files may need longer for hotel availability, and we tell you up front." },
    ],
    related: ["tour-operators", "travel-advisors", "dmc-services"],
    formType: "Travel agency",
  },
  {
    slug: "tour-operators",
    name: "Tour Operators",
    menuBlurb: "Contracted ground handling for series, packages and departures.",
    cardLine: "Ground handling for series, packages and fixed departures.",
    icon: "map",
    heroImage: "c7-ait-ben-haddou",
    eyebrow: "B2B · Tour Operators",
    h1: "Ground handler in Morocco for tour operators",
    standfirst:
      "Contracted rates, consistent delivery and a team that runs your departures the same way every time — from Marrakech circuits to Sahara and Imperial Cities programmes.",
    seoTitle: "Ground Handler in Morocco for Tour Operators",
    seoDescription:
      "Ground handler in Morocco for tour operators: contracted rates for series and departures, licensed guides, insured transport and one Marrakech ops desk.",
    whoFor: [
      "Operators running fixed-date series or brochure programmes in Morocco",
      "Specialists building circuits: Imperial Cities, Atlas, Sahara, coast",
      "Operators looking to replace or back up an existing Morocco ground handler",
    ],
    offers: [
      { icon: "file-text", title: "Contracted seasonal rates", body: "Net rates per season and service level, with written release and cancellation terms for each component." },
      { icon: "route", title: "Circuits built to your format", body: "We operate your itinerary or propose one: Marrakech, Atlas, Ouarzazate, Merzouga, Fes, Chefchaouen and the coast." },
      { icon: "bus", title: "Insured transport", body: "Vehicles matched to group size, from private cars to coaches, with licensed drivers." },
      { icon: "languages", title: "Licensed multilingual guides", body: "Official guides in English, French, Italian, Spanish and Arabic." },
      { icon: "clipboard-check", title: "Written confirmations", body: "Every service confirmed in writing before departure, so your rooming lists and vouchers match reality." },
      { icon: "life-buoy", title: "One ops desk, 24/7", body: "A single coordinator per departure and on-trip assistance around the clock." },
    ],
    faqs: [
      { question: "Can you operate our existing itinerary?", answer: "Yes. Send it as it is; we cost it line by line and flag anything we would run differently, with the reason." },
      { question: "Do you hold allotments?", answer: "For series we request hotel and camp allocations per season. Release and cancellation terms are agreed per contract and stated in writing." },
      { question: "Which circuits do you operate most?", answer: "Marrakech-based programmes, Atlas and Agafay, the southern route via Ouarzazate to Merzouga, and Imperial Cities to Fes." },
    ],
    related: ["groups", "dmc-services", "travel-agencies"],
    formType: "Tour operator",
  },
  {
    slug: "travel-advisors",
    name: "Travel Advisors",
    menuBlurb: "Tailor-made luxury trips for your private clients.",
    cardLine: "Tailor-made, high-touch trips for private clients.",
    icon: "compass",
    heroImage: "d2-mice-riad-rooftop-pool",
    eyebrow: "B2B · Travel Advisors",
    h1: "Tailor-made Morocco for travel advisors",
    standfirst:
      "Independent and host-agency advisors use us as their own team in Morocco: private guides, hand-picked riads and palace hotels, and every detail checked before your client lands.",
    seoTitle: "Luxury Morocco DMC for Travel Advisors",
    seoDescription:
      "Luxury Morocco DMC for travel advisors: tailor-made private trips, hand-picked riads and palace hotels, private guides and white-label service from Marrakech.",
    whoFor: [
      "Independent advisors and host-agency members selling luxury and tailor-made travel",
      "Advisors who need a trusted on-the-ground partner for high-value clients",
      "Honeymoon, family and special-occasion specialists",
    ],
    offers: [
      { icon: "sparkles", title: "Truly tailor-made", body: "Each itinerary is designed around your client's pace, interests and hotel style — never a copied template." },
      { icon: "gem", title: "Luxury and boutique stays", body: "Palace hotels, private riads, luxury desert camps and Atlas lodges, chosen for the client, not the commission." },
      { icon: "user-check", title: "Private guides and drivers", body: "Licensed private guides and dedicated drivers, briefed on your client before arrival." },
      { icon: "layers", title: "Your brand, our team", body: "White-label documents and on-trip communication in your name if you prefer." },
      { icon: "message-circle", title: "Direct WhatsApp line", body: "One coordinator you can reach while your client travels, with live updates." },
      { icon: "plane-landing", title: "Meet & assist", body: "Airport welcome, fast-track where available, and a smooth transfer to the hotel." },
    ],
    faqs: [
      { question: "Do you pay commission or offer net rates?", answer: "We work at net rates so you set your own margin. Ask us if your host agency needs a different arrangement." },
      { question: "Can you handle VIP or high-profile clients?", answer: "Yes. Tell us what discretion and security the client expects and we plan transport, guides and venues around it." },
      { question: "Can I visit before I sell?", answer: "We organise fam trips and site inspections for partners — ask us about the next dates." },
    ],
    related: ["travel-agencies", "dmc-services", "groups"],
    formType: "Travel advisor",
  },
  {
    slug: "groups",
    name: "Groups",
    menuBlurb: "Leisure, special-interest and educational groups of any size.",
    cardLine: "Leisure, special-interest and student groups, any size.",
    icon: "users",
    heroImage: "e05-agafay-camel-caravan",
    eyebrow: "B2B · Groups",
    h1: "Group travel in Morocco, operated end to end",
    standfirst:
      "From a 12-person special-interest tour to a 200-guest group, we plan the rooming, the coaches, the guides and the timings so the day runs as one movement.",
    seoTitle: "Group Tours Morocco | DMC for Group Travel",
    seoDescription:
      "Group travel in Morocco operated end to end: hotels, coaches, licensed guides and activities for leisure, special-interest and student groups up to 200+ pax.",
    whoFor: [
      "Leisure and special-interest groups (culture, food, photography, trekking)",
      "Associations, clubs, schools and universities",
      "Operators moving larger groups that need multiple coaches and guides",
    ],
    offers: [
      { icon: "users", title: "FIT to 200+ pax", body: "Programmes sized to the group, with coach and guide ratios planned in advance." },
      { icon: "hotel", title: "Group-friendly hotels", body: "Properties that can take the whole group together, or split stays across riads close to each other." },
      { icon: "bus", title: "Coaches and logistics", body: "Luggage handling, staged transfers and parking plans for the medina and busy sites." },
      { icon: "utensils", title: "Group dining", body: "Restaurants, riad dinners and desert camp evenings with menus agreed in advance, including dietary needs." },
      { icon: "languages", title: "Guides per coach", body: "Licensed guides in five languages, one per coach or sub-group." },
      { icon: "shield-check", title: "Contingency plans", body: "Weather, closures and late flights planned for before the group arrives." },
    ],
    faqs: [
      { question: "What group sizes do you handle?", answer: "From FIT and small groups up to 200+ passengers. Larger movements are planned with staged transfers and multiple guides." },
      { question: "Can you split the group across activities?", answer: "Yes. We run parallel options — for example a trek, a cooking class and a medina walk — and bring everyone back together for dinner." },
      { question: "Do you handle student groups?", answer: "Yes, with programmes adapted for educational content, budgets and supervision ratios." },
    ],
    related: ["mice", "tour-operators", "dmc-services"],
    formType: "Group organiser",
  },
  {
    slug: "mice",
    name: "MICE & Incentives",
    menuBlurb: "Meetings, incentives, conferences and events in Marrakech.",
    cardLine: "Incentives, meetings and events in Marrakech and beyond.",
    icon: "presentation",
    heroImage: "d1-mice-conference-hall",
    eyebrow: "B2B · MICE",
    h1: "MICE and incentive travel in Marrakech",
    standfirst:
      "Incentive trips, conferences, product launches and gala dinners. We source venues, design the experience and run the logistics so your event team can focus on the guests.",
    seoTitle: "MICE Morocco & Incentive Travel Marrakech",
    seoDescription:
      "MICE in Morocco and incentive travel in Marrakech: venues, gala dinners, team activities, transfers and on-site event management by a local DMC team.",
    whoFor: [
      "Incentive houses and event agencies planning Morocco programmes",
      "Corporate event planners organising meetings, conferences and launches",
      "Association and congress organisers",
    ],
    offers: [
      { icon: "building", title: "Venue sourcing", body: "Hotels with meeting space, palaces, private riads and desert locations, matched to format and headcount." },
      { icon: "party-popper", title: "Gala dinners & themed nights", body: "From a riad courtyard dinner to a desert evening in Agafay, with production, catering and entertainment." },
      { icon: "trophy", title: "Incentive experiences", body: "Team challenges in the Atlas, private cooking classes, desert evenings and exclusive cultural visits." },
      { icon: "bus", title: "Event logistics", body: "Airport arrivals for large groups, branded transfers, hospitality desks and staged movements." },
      { icon: "clipboard-check", title: "On-site management", body: "Our team on site from the first arrival to the last departure, with a run-of-show for every day." },
      { icon: "badge-percent", title: "Transparent budgets", body: "Itemised costings at net rates so you can build your own client price." },
    ],
    faqs: [
      { question: "How far ahead should we plan an incentive in Marrakech?", answer: "As early as possible for peak months — popular venues and hotels book out. Send dates early and we hold options while you decide." },
      { question: "Can you work as our local DMC for an event agency?", answer: "Yes, white-label. Your agency keeps the client relationship; we deliver on the ground." },
      { question: "Do you handle event production?", answer: "We coordinate staging, sound, lighting, décor and entertainment with local production partners as part of the programme." },
    ],
    related: ["corporate", "groups", "dmc-services"],
    formType: "MICE / event agency",
  },
  {
    slug: "corporate",
    name: "Corporate",
    menuBlurb: "Business travel, offsites and leadership retreats.",
    cardLine: "Offsites, leadership retreats and business travel.",
    icon: "briefcase",
    heroImage: "d3-mice-bahia-palace",
    eyebrow: "B2B · Corporate",
    h1: "Corporate offsites and retreats in Morocco",
    standfirst:
      "Leadership retreats, team offsites and business visits, organised with the same operational discipline we apply to every partner file.",
    seoTitle: "Corporate Offsites & Retreats in Morocco",
    seoDescription:
      "Corporate offsites, leadership retreats and business travel in Morocco: venues, transfers and team experiences in Marrakech, Agafay and the High Atlas.",
    whoFor: [
      "Companies planning offsites, retreats or board meetings",
      "Travel managers booking business visits to Morocco",
      "Corporate travel agencies needing a local ground partner",
    ],
    offers: [
      { icon: "building", title: "Retreat venues", body: "Private villas, riads, Atlas lodges and desert camps that can be booked exclusively." },
      { icon: "presentation", title: "Meeting set-up", body: "Meeting rooms, AV and breakout spaces, combined with time outside." },
      { icon: "mountain", title: "Team experiences", body: "Atlas walks, e-bike rides, cooking classes and desert evenings that bring a team together." },
      { icon: "car", title: "Executive transfers", body: "Private vehicles with professional drivers for arrivals, meetings and departures." },
      { icon: "file-text", title: "Clear invoicing", body: "Itemised quotes and invoices that match your company's approval process." },
      { icon: "life-buoy", title: "24/7 support", body: "One contact for the organiser, available throughout the stay." },
    ],
    faqs: [
      { question: "Can you organise a retreat for a small leadership team?", answer: "Yes. Small, private formats are often the best fit for Marrakech and the Atlas." },
      { question: "Do you work directly with companies or only through agencies?", answer: "Both. If your company already uses a travel agency, we can work through them." },
    ],
    related: ["mice", "groups", "dmc-services"],
    formType: "Corporate",
  },
  {
    slug: "dmc-services",
    name: "DMC Services",
    menuBlurb: "Hotels, transfers, guides, activities and full ground handling.",
    cardLine: "Every ground service, booked and operated locally.",
    icon: "layers",
    heroImage: "d5-dmc-menara-airport",
    eyebrow: "B2B · DMC Services",
    h1: "Morocco DMC services, from one local team",
    standfirst:
      "Everything your clients need on the ground in Morocco — accommodation, transfers, guides, activities, dining and events — contracted, coordinated and operated from Marrakech.",
    seoTitle: "Morocco DMC Services | Marrakech DMC",
    seoDescription:
      "Marrakech DMC services: hotel contracting, transfers and fleet, licensed guides, excursions, MICE, dining, meet & assist and full ground handling in Morocco.",
    whoFor: [
      "Agencies and operators who want one supplier for the whole Morocco file",
      "Partners who need a single service — a transfer, a guide, a dinner — done well",
      "Event agencies looking for a local DMC",
    ],
    offers: [
      { icon: "hotel", title: "Accommodation contracting", body: "Riads, boutique and 5-star hotels, desert camps and Atlas lodges at negotiated rates." },
      { icon: "car", title: "Transfers & fleet", body: "Private cars, minivans and coaches with licensed, insured drivers." },
      { icon: "languages", title: "Licensed guides", body: "Official city and mountain guides in five languages." },
      { icon: "mountain", title: "Excursions & activities", body: "Atlas, Agafay, Ourika, Essaouira, quad, camel, e-bike and more." },
      { icon: "presentation", title: "MICE & events", body: "Venues, gala dinners, incentives and conferences." },
      { icon: "utensils", title: "Dining & gastronomy", body: "Restaurants, riad dinners, cooking classes and food walks." },
      { icon: "plane-landing", title: "Meet & assist", body: "Airport welcome and assistance on arrival and departure." },
      { icon: "clipboard-check", title: "Full ground handling", body: "The whole programme, operated by one team with one contact." },
    ],
    faqs: [
      { question: "Can I book a single service, like a transfer?", answer: "Yes. Partners book anything from one airport transfer to a full multi-week programme." },
      { question: "Do you subcontract?", answer: "We contract hotels, camps, transport companies and guides directly and coordinate them ourselves, so you deal with one accountable team." },
      { question: "Which cities do you cover?", answer: "We are based in Marrakech and operate across Morocco: Agafay, the High Atlas, Ouarzazate, Merzouga, Fes, Essaouira, Chefchaouen, Casablanca, Rabat, Tangier and beyond." },
    ],
    related: ["travel-agencies", "tour-operators", "mice"],
    formType: "Other",
  },
];

export const audienceBySlug = (slug: string) => AUDIENCES.find((a) => a.slug === slug);

/** The six on the home "Who we work with" grid, in the brief's order. */
export const HOME_AUDIENCES = ["travel-agencies", "tour-operators", "travel-advisors", "groups", "mice", "corporate"]
  .map((slug) => audienceBySlug(slug)!)
  .filter(Boolean);

/** Items in the B2B mega menu, in the brief's order. */
export const B2B_MENU = ["travel-agencies", "tour-operators", "travel-advisors", "groups", "mice", "dmc-services"]
  .map((slug) => audienceBySlug(slug)!)
  .filter(Boolean);
