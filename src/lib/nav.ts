import { DESTINATIONS } from "@/features/destinations/registry";
import { PROGRAMMES, programmeHref } from "@/features/programmes/data";
import { EXCURSIONS, excursionHref } from "@/features/excursions/data";
import { RFQ_HREF } from "@/lib/company";

/**
 * Navigation: the page lists behind the header, footer and sitemap.
 *
 * Company facts live in ./company and are re-exported here so existing
 * server-side imports keep working. Client Components must import from
 * ./company directly and receive the menus as props - importing this module
 * in the browser would ship the full destination, programme and excursion
 * data with it.
 */
export { COMPANY, addressOneLine, RFQ_HREF, SITE_URL } from "@/lib/company";

export type NavItem = {
  href: string;
  label: string;
  /** Short line used in the footer and on hub pages. */
  blurb?: string;
};

export const PRIMARY_NAV: NavItem[] = [
  { href: "/morocco-dmc", label: "Morocco DMC", blurb: "What we operate" },
  { href: "/mice", label: "MICE & Events", blurb: "Meetings, incentives, events" },
  { href: "/programmes", label: "B2B Programmes", blurb: "Ready-to-contract packages" },
  { href: "/excursions", label: "B2B Excursions", blurb: "Day trips around Marrakech" },
  {
    href: "/programmes/taste-of-marrakech",
    label: "Taste of Marrakech",
    blurb: "Signature 7-night culinary programme",
  },
  { href: "/b2b", label: "For Travel Trade", blurb: "How we work with agencies" },
  { href: "/destinations", label: "Destinations", blurb: "Where we operate" },
  { href: "/how-we-work", label: "How We Work", blurb: "Workflow and verification" },
];

export const SECONDARY_NAV: NavItem[] = [
  { href: "/about", label: "About", blurb: "Who we are" },
  { href: "/contact", label: "Contact", blurb: "Reach the operations desk" },
];

/** A dropdown group in the header (SOP 3.1). */
export type NavGroup = {
  id: string;
  label: string;
  /** When set, the label itself links to this hub page; a chevron opens the menu. */
  href?: string;
  items: NavItem[];
};

/** Look a page up in the full list, so labels and blurbs are never retyped. */
const byHref = (href: string): NavItem => {
  const item = [...PRIMARY_NAV, ...SECONDARY_NAV].find((entry) => entry.href === href);
  if (!item) throw new Error(`No navigation entry for ${href}`);
  return item;
};

/** A destination's one-line description: the first sentence of its summary. */
const firstSentence = (text: string) => text.split(/(?<=\.)\s/)[0] ?? text;

/**
 * The header's arrangement. PRIMARY_NAV and SECONDARY_NAV stay the full list
 * for the footer and sitemap. The header groups everything into five
 * dropdowns, so every page stays reachable from the header.
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    id: "operations",
    label: "Operations",
    items: ["/morocco-dmc", "/mice", "/b2b"].map(byHref),
  },
  {
    id: "programmes",
    label: "B2B Programmes",
    href: "/programmes",
    items: [
      ...PROGRAMMES.map((programme) => ({
        href: programmeHref(programme),
        label: programme.name,
        blurb: programme.markets.join(" · "),
      })),
      { ...byHref("/programmes"), label: "All programmes" },
    ],
  },
  {
    id: "excursions",
    label: "B2B Excursions",
    href: "/excursions",
    items: [
      ...EXCURSIONS.map((excursion) => ({
        href: excursionHref(excursion),
        label: excursion.name,
        blurb: `${excursion.region} · ${excursion.duration}`,
      })),
      { ...byHref("/excursions"), label: "All excursions" },
    ],
  },
  {
    id: "destinations",
    label: "Destinations",
    href: "/destinations",
    items: [
      ...DESTINATIONS.map((destination) => ({
        href: `/destinations/${destination.slug}`,
        label: destination.name,
        blurb: firstSentence(destination.summary),
      })),
      { ...byHref("/destinations"), label: "All destinations" },
    ],
  },
  {
    // The company pages share one dropdown so the full bar fits on laptops.
    id: "company",
    label: "Company",
    items: ["/how-we-work", "/about", "/contact"].map(byHref),
  },
];

/** Top-level header links after the dropdowns. */
export const NAV_LINKS: NavItem[] = [];

/** Every public route, used by the sitemap. Keep in sync with src/app. */
export const ALL_ROUTES: string[] = [
  "/",
  ...PRIMARY_NAV.map((item) => item.href),
  ...SECONDARY_NAV.map((item) => item.href),
  RFQ_HREF,
];
