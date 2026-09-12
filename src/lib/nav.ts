/**
 * The single source of truth for company facts and navigation.
 *
 * Never retype a company fact into a page. Import it from here.
 *
 * Deliberately absent, because they are not confirmed and must not appear
 * anywhere on the site - not even as placeholder text:
 *   - telephone number / tel: link / WhatsApp link
 *   - registered entity name, RC, ICE, TVA, ODV licence, IATA
 * See docs/START.md, "What must never be published".
 */
export const COMPANY = {
  name: "PM Travel Agency",
  brandLine: "By Prestige Majestic Project & Events",
  positioning: "Your Morocco Ground Partner",
  proofLine: "You sell Morocco. We operate it on the ground.",
  address: {
    line1: "Bureau 3, Residence Al Manar",
    district: "Gueliz",
    city: "Marrakech",
    postalCode: "40000",
    country: "Morocco",
  },
  email: {
    b2b: "b2b@pm-travelagency.com",
    general: "contact@pm-travelagency.com",
  },
  languages: ["English", "French", "Arabic", "Italian", "Spanish"] as const,
} as const;

export const addressOneLine = [
  COMPANY.address.line1,
  COMPANY.address.district,
  `${COMPANY.address.city} ${COMPANY.address.postalCode}`,
  COMPANY.address.country,
].join(", ");

export type NavItem = {
  href: string;
  label: string;
  /** Short line used in the footer and on hub pages. */
  blurb?: string;
};

export const PRIMARY_NAV: NavItem[] = [
  { href: "/morocco-dmc", label: "Morocco DMC", blurb: "What we operate" },
  { href: "/mice", label: "MICE & Events", blurb: "Meetings, incentives, events" },
  { href: "/b2b", label: "For Travel Trade", blurb: "How we work with agencies" },
  { href: "/routes", label: "Route Intelligence", blurb: "Measured drive data" },
  { href: "/destinations", label: "Destinations", blurb: "Where we operate" },
  { href: "/how-we-work", label: "How We Work", blurb: "Workflow and verification" },
];

export const SECONDARY_NAV: NavItem[] = [
  { href: "/about", label: "About", blurb: "Who we are" },
  { href: "/contact", label: "Contact", blurb: "Reach the operations desk" },
];

export const RFQ_HREF = "/request-a-quote";

/** Every public route, used by the sitemap. Keep in sync with src/app. */
export const ALL_ROUTES: string[] = [
  "/",
  ...PRIMARY_NAV.map((item) => item.href),
  ...SECONDARY_NAV.map((item) => item.href),
  RFQ_HREF,
];

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
