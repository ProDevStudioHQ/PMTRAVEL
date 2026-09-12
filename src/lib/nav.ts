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

/**
 * The header's own arrangement. PRIMARY_NAV and SECONDARY_NAV stay the site's
 * full list (footer, sitemap); the header shows five top-level links and
 * keeps the remaining pages one click away in a Services dropdown, so no page
 * loses its link from the header.
 */
export const HEADER_HOME: NavItem = { href: "/", label: "Home" };

/** The header links that follow Home and the Services dropdown. */
export const HEADER_NAV: NavItem[] = [
  { href: "/mice", label: "MICE Services", blurb: "Meetings, incentives, events" },
  { href: "/destinations", label: "Destinations", blurb: "Where we operate" },
  { href: "/about", label: "About Us", blurb: "Who we are" },
  { href: "/contact", label: "Contact Us", blurb: "Reach the operations desk" },
];

const HEADER_SERVICE_HREFS = ["/morocco-dmc", "/b2b", "/routes", "/how-we-work"];

export const HEADER_SERVICES: NavItem[] = PRIMARY_NAV.filter((item) =>
  HEADER_SERVICE_HREFS.includes(item.href)
);

/** Every public route, used by the sitemap. Keep in sync with src/app. */
export const ALL_ROUTES: string[] = [
  "/",
  ...PRIMARY_NAV.map((item) => item.href),
  ...SECONDARY_NAV.map((item) => item.href),
  RFQ_HREF,
];

const SITE_URL_FALLBACK = "http://localhost:3000";

/**
 * The canonical origin, used by metadataBase, the sitemap and robots.txt.
 *
 * Must never throw. `??` alone is not enough: Docker's `ARG` with no
 * `--build-arg` sets an empty *string*, which passes a nullish check and then
 * crashes `new URL("")` during the build. An unparseable value is treated the
 * same way, so a typo degrades to localhost rather than failing the build in
 * a page it has nothing to do with.
 *
 * A missing value in a production build is caught explicitly by the Dockerfile,
 * which would otherwise bake localhost canonicals into the deployed site.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return SITE_URL_FALLBACK;
  try {
    new URL(configured);
  } catch {
    return SITE_URL_FALLBACK;
  }
  return configured.replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl();
