/**
 * Journal articles. Written for travel professionals; no invented figures,
 * prices or drive times. Each article links into B2B, experiences and tours.
 */

export type JournalCategory = { slug: string; name: string; description: string };

export const JOURNAL_CATEGORIES: JournalCategory[] = [
  { slug: "trade-guides", name: "Trade Guides", description: "How to brief, sell and operate Morocco for your clients." },
  { slug: "destinations", name: "Destinations", description: "Where to send clients, and when." },
  { slug: "mice", name: "MICE & Events", description: "Incentives, meetings and events in Morocco." },
];

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  /** ISO date */
  published: string;
  image: string;
  readMinutes: number;
  excerpt: string;
  body: ArticleBlock[];
  links: { href: string; label: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "how-to-brief-a-morocco-dmc",
    title: "How to brief a Morocco DMC for a fast, accurate quote",
    seoTitle: "How to Brief a Morocco DMC for a Fast Quote",
    description:
      "What to include when you send a Morocco request to a DMC — dates, pax, service level, client profile — so the first proposal is the right one.",
    category: "trade-guides",
    published: "2026-11-10",
    image: "d7-dmc-covered-souk",
    readMinutes: 4,
    excerpt: "The fastest quotes start with the right six details. Here is the checklist our operations team works from.",
    body: [
      { type: "p", text: "A good brief saves a round of emails and gets you a proposal you can send to your client the same day. These are the details that change the price and the programme most." },
      { type: "h2", text: "1. Dates and flexibility" },
      { type: "p", text: "Exact dates if you have them, or a month and a trip length if not. Say whether dates can move: shifting by a few days can open better hotels in busy periods." },
      { type: "h2", text: "2. Number of travellers and rooming" },
      { type: "p", text: "Adults, children and their ages, and how they will share rooms. For groups, give a minimum and maximum so we can cost both." },
      { type: "h2", text: "3. Service level" },
      { type: "p", text: "Boutique riad, 4-star, 5-star or palace — or a mix. One example hotel the client liked elsewhere tells us more than a star rating." },
      { type: "h2", text: "4. Destinations and must-dos" },
      { type: "p", text: "Where the client wants to go and anything non-negotiable: a desert night, a cooking class, a specific hotel. We will tell you honestly if a route is too ambitious for the time available." },
      { type: "h2", text: "5. Budget per person" },
      { type: "p", text: "A range is enough. It lets us propose the right hotels first instead of costing three versions." },
      { type: "h2", text: "6. Client profile" },
      { type: "list", items: ["First visit to Morocco or returning?", "Active, relaxed or somewhere in between?", "Dietary, mobility or accessibility needs?", "White-label documents in your brand?"] },
      { type: "p", text: "Send what you have — even a two-line brief is a start. Our team will come back with questions only where they change the proposal." },
    ],
    links: [
      { href: "/request-a-quote", label: "Request a B2B quote" },
      { href: "/b2b/travel-agencies", label: "Morocco DMC for travel agencies" },
      { href: "/tours/tailor-made", label: "Tailor-made tours" },
    ],
  },
  {
    slug: "agafay-or-merzouga",
    title: "Agafay or Merzouga: choosing the right desert for your clients",
    seoTitle: "Agafay or Merzouga? Choosing a Morocco Desert",
    description:
      "Agafay's stony hills near Marrakech or the Sahara dunes of Merzouga? How to choose the right Moroccan desert experience for each client profile.",
    category: "destinations",
    published: "2026-11-03",
    image: "b9-erg-chebbi-camels",
    readMinutes: 4,
    excerpt: "Two very different deserts, two very different trips. A practical guide to which one to sell, and to whom.",
    body: [
      { type: "p", text: "\"Desert\" is the most requested word in Morocco briefs. But Agafay and Merzouga are completely different products, and choosing the wrong one is the most common reason a client comes home disappointed." },
      { type: "h2", text: "Agafay: the desert close to Marrakech" },
      { type: "p", text: "Agafay is a stony desert of rolling hills, with the High Atlas on the horizon. It is close enough to Marrakech for an evening or a single night, which makes it ideal for short stays, events and clients who do not want long days on the road." },
      { type: "list", items: ["Best for: short breaks, couples, families, incentive dinners", "Format: sunset, dinner and one night in a camp", "Activities: camel rides, quads, e-bikes, stargazing"] },
      { type: "h2", text: "Merzouga: the Sahara dunes" },
      { type: "p", text: "Merzouga sits at the edge of Erg Chebbi, the classic sand-dune Sahara. Reaching it is a journey across the Atlas, usually built into a multi-day circuit via Ouarzazate and the Dades valley." },
      { type: "list", items: ["Best for: first-time visitors with time, photographers, adventure travellers", "Format: part of a 3-day or longer southern circuit", "Activities: camel treks into the dunes, sunrise, desert camps, 4x4"] },
      { type: "h2", text: "How to decide" },
      { type: "p", text: "If your client has fewer than five days in Morocco, Agafay is almost always the better choice. If they want sand dunes and have time for the journey, Merzouga is unforgettable. Tell us the profile and we will recommend the right format." },
    ],
    links: [
      { href: "/destinations/agafay", label: "Agafay for operators" },
      { href: "/destinations/merzouga", label: "Merzouga for operators" },
      { href: "/experiences/adventure", label: "Adventure experiences" },
    ],
  },
  {
    slug: "planning-an-incentive-in-marrakech",
    title: "Planning an incentive in Marrakech: what to decide first",
    seoTitle: "Planning an Incentive Trip in Marrakech",
    description:
      "The decisions that shape an incentive programme in Marrakech — dates, hotel, format and the signature evening — and how a local DMC helps you make them.",
    category: "mice",
    published: "2026-10-27",
    image: "d3-mice-bahia-palace",
    readMinutes: 5,
    excerpt: "Dates, hotel, signature evening: the four decisions that shape every Marrakech incentive.",
    body: [
      { type: "p", text: "Marrakech is one of the most requested incentive destinations within easy reach of Europe. The programmes that work best are designed around a few early decisions." },
      { type: "h2", text: "1. Dates first" },
      { type: "p", text: "Spring and autumn are the most popular periods, so the best hotels and venues fill early. Check public holidays and Ramadan dates for your year: they change the rhythm of the city and some services." },
      { type: "h2", text: "2. One hotel or several riads" },
      { type: "p", text: "Large groups usually need a single resort hotel for logistics and meeting space. Smaller, high-end groups can take over several riads close to each other for a more exclusive feel." },
      { type: "h2", text: "3. The signature evening" },
      { type: "p", text: "Most Marrakech incentives are remembered for one night: a desert dinner in Agafay, a palace courtyard, a riad terrace. Decide it early — it drives the budget and the production." },
      { type: "h2", text: "4. Balance activity and free time" },
      { type: "list", items: ["One cultural morning in the medina", "One active option: Atlas walk, e-bike, quad", "One free afternoon for the souks or the spa", "Transfers kept short and staged for large groups"] },
      { type: "p", text: "Send us your dates, headcount and objectives and we will come back with venue options and a costed outline." },
    ],
    links: [
      { href: "/b2b/mice", label: "MICE & incentive travel in Marrakech" },
      { href: "/b2b/corporate", label: "Corporate offsites" },
      { href: "/experiences/private", label: "Private experiences" },
    ],
  },
  {
    slug: "white-label-dmc-explained",
    title: "White-label ground handling: how it works with a Morocco DMC",
    seoTitle: "White-Label Ground Handling in Morocco",
    description:
      "How white-label service works with a Morocco DMC: your brand on documents, guides who represent you, and a local team that stays behind the scenes.",
    category: "trade-guides",
    published: "2026-10-20",
    image: "d5-dmc-menara-airport",
    readMinutes: 3,
    excerpt: "Your brand on the documents, our team on the ground. What white-label means in practice.",
    body: [
      { type: "p", text: "White-label means your client experiences your brand from booking to departure, while we operate everything on the ground in Morocco." },
      { type: "h2", text: "What can carry your brand" },
      { type: "list", items: ["Itineraries and travel documents", "Vouchers and welcome letters", "Airport welcome signs", "How guides and drivers introduce themselves"] },
      { type: "h2", text: "What stays the same" },
      { type: "p", text: "Net rates, written confirmations, one operations contact and 24/7 assistance. We never market to your clients or ask them to book with us directly." },
      { type: "h2", text: "How to set it up" },
      { type: "p", text: "Tell us at the brief stage. Send your logo and any wording you want used, and we prepare documents accordingly for every file." },
    ],
    links: [
      { href: "/b2b/dmc-services", label: "DMC services" },
      { href: "/b2b/become-a-partner", label: "Become a partner" },
      { href: "/b2b/tour-operators", label: "Ground handler for tour operators" },
    ],
  },
];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const categoryBySlug = (slug: string) => JOURNAL_CATEGORIES.find((c) => c.slug === slug);
export const articlesInCategory = (slug: string) => ARTICLES.filter((a) => a.category === slug);
