import { B2B_MENU } from "@/content/b2b";
import { EXPERIENCES, TOURS, leisureHref } from "@/content/leisure";
import { LOGIN_HREF, PARTNER_HREF, RFQ_HREF } from "@/lib/company";

/**
 * Navigation: the single source for the header, mobile menu and footer.
 * Everything here is plain data so it can be passed to the Client header.
 * Every href points at a real page (checked by `npm run verify:data`).
 */
export { COMPANY, addressOneLine, RFQ_HREF, SITE_URL, PARTNER_HREF, LOGIN_HREF } from "@/lib/company";

export type NavLink = { href: string; label: string; blurb?: string };

export type NavEntry = {
  id: string;
  label: string;
  href: string;
  /** "list": small dropdown. "mega": wide panel with descriptions and a quote card. */
  menu?: { kind: "list" | "mega"; items: NavLink[]; allLabel?: string };
  emphasis?: boolean;
};

export const NAV: NavEntry[] = [
  { id: "home", label: "Home", href: "/" },
  {
    id: "experiences",
    label: "Experiences",
    href: "/experiences",
    menu: {
      kind: "list",
      allLabel: "All experiences",
      items: EXPERIENCES.map((e) => ({ href: leisureHref(e), label: e.name, blurb: e.menuBlurb })),
    },
  },
  {
    id: "tours",
    label: "Tours",
    href: "/tours",
    menu: {
      kind: "list",
      allLabel: "All tours",
      items: TOURS.map((t) => ({ href: leisureHref(t), label: t.name, blurb: t.menuBlurb })),
    },
  },
  {
    id: "b2b",
    label: "B2B & DMC",
    href: "/b2b",
    emphasis: true,
    menu: {
      kind: "mega",
      allLabel: "B2B overview",
      items: [
        ...B2B_MENU.map((a) => ({ href: `/b2b/${a.slug}`, label: a.name, blurb: a.menuBlurb })),
        { href: PARTNER_HREF, label: "Become a Partner", blurb: "Open a trade account and get our partner rates." },
      ],
    },
  },
  { id: "about", label: "About", href: "/about" },
  { id: "journal", label: "Journal", href: "/journal" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const FOOTER_B2B: NavLink[] = [
  ...B2B_MENU.map((a) => ({ href: `/b2b/${a.slug}`, label: a.slug === "mice" ? "MICE" : a.name })),
  { href: PARTNER_HREF, label: "Become a Partner" },
  { href: LOGIN_HREF, label: "Partner Login" },
];

export const FOOTER_EXPLORE: NavLink[] = [
  { href: "/experiences", label: "Experiences" },
  { href: "/tours", label: "Tours" },
  { href: "/destinations", label: "Destinations" },
  { href: "/programmes", label: "B2B Programmes" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const LEGAL_LINKS: NavLink[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
];

/** Static routes for the sitemap. Dynamic collections are added in sitemap.ts. */
export const STATIC_ROUTES: string[] = [
  "/",
  "/experiences",
  "/tours",
  "/b2b",
  PARTNER_HREF,
  RFQ_HREF,
  LOGIN_HREF,
  "/about",
  "/journal",
  "/gallery",
  "/contact",
  "/destinations",
  "/programmes",
  "/excursions",
  "/privacy",
  "/terms",
  "/cookies",
];
