/**
 * The home page's editable sections and their built-in content.
 *
 * The page renders these defaults; the CRM (Website → Page sections) can hide
 * a section, change or hide its texts and replace its cards. The same list is
 * published at GET /api/content-slots so the CRM editor starts from what the
 * site shows today. Keyed by page path + section id.
 */
import { HOME_AUDIENCES, PARTNER_PROCESS } from "@/content/b2b";
import { EXPERIENCES, leisureHref } from "@/content/leisure";
import { DMC_SERVICES, PARTNER_BENEFITS, TRADE_FAQS } from "@/content/home";
import { PARTNER_HREF, RFQ_HREF, TRUST_POINTS } from "@/lib/company";
import { en } from "@/i18n/dictionaries/en";

/** Which card inputs a section uses (the CRM shows only these). */
export type CardField = "icon" | "title" | "body" | "href" | "image";

export type SectionCard = {
  title: string;
  body: string;
  icon: string | null;
  /** A photo from the site's own image record. */
  imageKey: string | null;
  href: string | null;
};

export type SectionDefaults = {
  eyebrow: string | null;
  title: string | null;
  intro: string | null;
  cards: SectionCard[];
};

export type SectionSpec = {
  path: string;
  id: string;
  label: string;
  /** Texts the section has (others are not shown in the CRM). */
  texts: ("eyebrow" | "title" | "intro")[];
  cardLabel: string | null;
  cardFields: CardField[];
  maxCards: number;
  canHide: boolean;
  defaults: SectionDefaults;
};

const card = (c: Partial<SectionCard> & { title: string }): SectionCard => ({ body: "", icon: null, imageKey: null, href: null, ...c });

export const HOME_SECTIONS: SectionSpec[] = [
  {
    path: "/",
    id: "hero",
    label: "Hero (top of the page)",
    texts: ["eyebrow", "title", "intro"],
    cardLabel: "Button",
    cardFields: ["title", "href"],
    maxCards: 3,
    canHide: false,
    defaults: {
      eyebrow: "Morocco DMC · Marrakech",
      title: "Your Ground Partner in Morocco.",
      intro:
        "We design and operate Morocco programmes for travel agencies, tour operators, advisors and MICE planners — net rates, white-label service and one local team from arrival to departure.",
      cards: [card({ title: en.cta.b2bQuote, href: RFQ_HREF }), card({ title: en.cta.partner, href: PARTNER_HREF })],
    },
  },
  {
    path: "/",
    id: "trust",
    label: "Key figures (under the hero)",
    texts: [],
    cardLabel: "Figure",
    cardFields: ["title", "body"],
    maxCards: 8,
    canHide: true,
    defaults: {
      eyebrow: null,
      title: null,
      intro: null,
      cards: TRUST_POINTS.map((p) => card({ title: p.value !== null ? `${p.prefix ?? ""}${p.value}${p.suffix ?? ""}` : (p.text ?? ""), body: p.caption })),
    },
  },
  {
    path: "/",
    id: "who",
    label: "Who we work with",
    texts: ["eyebrow", "title", "intro"],
    cardLabel: "Card",
    cardFields: ["icon", "title", "body", "href"],
    maxCards: 12,
    canHide: true,
    defaults: {
      eyebrow: "Who we work with",
      title: "Built for the travel trade",
      intro: "One Marrakech team for every kind of travel professional selling Morocco.",
      cards: HOME_AUDIENCES.map((a) => card({ icon: a.icon, title: a.name, body: a.cardLine, href: `/b2b/${a.slug}` })),
    },
  },
  {
    path: "/",
    id: "benefits",
    label: "What partners get",
    texts: ["eyebrow", "title", "intro"],
    cardLabel: "Benefit",
    cardFields: ["icon", "title", "body"],
    maxCards: 12,
    canHide: true,
    defaults: {
      eyebrow: "What partners get",
      title: "Everything a ground partner should be",
      intro: "Net rates, your brand, fast proposals and a team that answers — before, during and after the trip.",
      cards: PARTNER_BENEFITS.map((b) => card({ icon: b.icon, title: b.title, body: b.body })),
    },
  },
  {
    path: "/",
    id: "services",
    label: "DMC services",
    texts: ["eyebrow", "title"],
    cardLabel: "Service",
    cardFields: ["icon", "title", "href"],
    maxCards: 16,
    canHide: true,
    defaults: {
      eyebrow: "DMC services",
      title: "Every ground service, one local team",
      intro: null,
      cards: DMC_SERVICES.map((s) => card({ icon: s.icon, title: s.title, href: RFQ_HREF })),
    },
  },
  {
    path: "/",
    id: "process",
    label: "How partnership works",
    texts: ["eyebrow", "title"],
    cardLabel: "Step",
    cardFields: ["title", "body"],
    maxCards: 6,
    canHide: true,
    defaults: {
      eyebrow: "How partnership works",
      title: "From brief to departure in four steps",
      intro: null,
      cards: PARTNER_PROCESS.map((s) => card({ title: s.title, body: s.body })),
    },
  },
  {
    path: "/",
    id: "experiences",
    label: "Signature experiences",
    texts: ["eyebrow", "title", "intro"],
    cardLabel: "Experience card",
    cardFields: ["image", "title", "body", "href"],
    maxCards: 12,
    canHide: true,
    defaults: {
      eyebrow: "Signature experiences",
      title: "What your clients will remember",
      intro: "The product we build into your programmes, from palace stays to desert nights.",
      cards: EXPERIENCES.map((e) => card({ title: e.h1, body: e.cardLine, imageKey: e.heroImage, href: leisureHref(e) })),
    },
  },
  {
    path: "/",
    id: "faq",
    label: "Trade FAQ",
    texts: ["eyebrow", "title", "intro"],
    cardLabel: "Question",
    cardFields: ["title", "body"],
    maxCards: 20,
    canHide: true,
    defaults: {
      eyebrow: "Trade FAQ",
      title: "Questions travel professionals ask us",
      intro: "Anything else? Ask the ops desk on WhatsApp.",
      cards: TRADE_FAQS.map((f) => card({ title: f.question, body: f.answer })),
    },
  },
  {
    path: "/",
    id: "cta",
    label: "Final call to action",
    texts: ["title", "intro"],
    cardLabel: null,
    cardFields: [],
    maxCards: 0,
    canHide: true,
    defaults: {
      eyebrow: null,
      title: "Let's build your next Morocco programme.",
      intro: "Send your brief and receive a costed proposal at net rates — or message our operations desk now.",
      cards: [],
    },
  },
];

/** Every editable section on the site (the home page for now). */
export const EDITABLE_SECTIONS: SectionSpec[] = [...HOME_SECTIONS];
