import { LOGIN_HREF, PARTNER_HREF, RFQ_HREF } from "@/lib/company";

/**
 * Navigation now comes from the CRM (GET /site, docs/api-contract.md 5.1):
 * header, dropdowns, buttons, top bar and footer columns are edited there.
 * The offline copy is src/content/fallback-site.json. This file keeps the
 * company re-exports older pages import, the nav types and the static routes
 * the sitemap lists.
 */
export { COMPANY, addressOneLine, RFQ_HREF, SITE_URL, PARTNER_HREF, LOGIN_HREF } from "@/lib/company";
export type { NavEntry, NavLink } from "@/lib/site-layout";

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
