/**
 * Company facts and site-wide constants, with no other imports.
 *
 * Kept apart from nav.ts on purpose: nav.ts pulls in the destination,
 * programme and excursion data to build the menus, and anything imported by a
 * Client Component (the header, the quote form, the logo) ships to the
 * browser. Importing facts from here keeps that data out of the bundle.
 *
 * Never retype a company fact into a page. Import it from here (or from
 * nav.ts, which re-exports everything below).
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

export const RFQ_HREF = "/request-a-quote";

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
