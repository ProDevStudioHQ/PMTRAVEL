/**
 * GET /api/content-slots - what the CRM can control on this site.
 *
 * The CRM's "Website → Pages" and "Website → Images" screens list these, so the
 * list always matches the deployed site: every page whose header and search
 * snippet can be overridden (keyed by path), and every photo in the image
 * record that can be replaced (keyed by image key). Experience and Tour
 * category pages are listed by the CRM itself, from its own categories. Public information only:
 * the same paths are in the sitemap and the same files are under /images.
 */
import { NextResponse } from "next/server";
import { STATIC_ROUTES } from "@/lib/nav";
import { LOGIN_HREF } from "@/lib/company";
import { AUDIENCES } from "@/content/b2b";
import { JOURNAL_CATEGORIES } from "@/content/journal";
import { DESTINATIONS } from "@/features/destinations/registry";
import { PROGRAMMES, programmeHref } from "@/features/programmes/data";
import { EXCURSIONS, excursionHref } from "@/features/excursions/data";
import { IMAGES } from "@/features/images/registry";

export const dynamic = "force-static";

const MAIN_LABELS: Record<string, string> = {
  "/": "Home",
  "/experiences": "Experiences",
  "/tours": "Tours",
  "/b2b": "B2B & DMC",
  "/about": "About us",
  "/journal": "Journal",
  "/gallery": "Gallery",
  "/contact": "Contact",
  "/destinations": "Destinations",
  "/programmes": "Programmes",
  "/excursions": "Excursions",
  "/privacy": "Privacy",
  "/terms": "Terms",
  "/cookies": "Cookies",
};

const titleCase = (slug: string) => slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

type Slot = { path: string; label: string; group: string };

export function GET() {
  const pages: Slot[] = [
    ...STATIC_ROUTES.filter((p) => p !== LOGIN_HREF).map((path) => ({
      path,
      label: MAIN_LABELS[path] ?? titleCase(path.split("/").pop() ?? path),
      group: "Main pages",
    })),
    ...AUDIENCES.map((a) => ({ path: `/b2b/${a.slug}`, label: a.name, group: "B2B" })),
    ...DESTINATIONS.map((d) => ({ path: `/destinations/${d.slug}`, label: d.name, group: "Destinations" })),
    ...EXCURSIONS.map((e) => ({ path: excursionHref(e), label: titleCase(excursionHref(e).split("/").pop()!), group: "Excursions" })),
    ...PROGRAMMES.map((p) => ({ path: programmeHref(p), label: titleCase(programmeHref(p).split("/").pop()!), group: "Programmes" })),
    ...JOURNAL_CATEGORIES.map((c) => ({ path: `/journal/category/${c.slug}`, label: c.name, group: "Journal" })),
  ];
  const seen = new Set<string>();
  const unique = pages.filter((p) => (seen.has(p.path) ? false : (seen.add(p.path), true)));

  const images = IMAGES.map((i) => ({ key: i.key, src: i.src, alt: i.alt, width: i.width, height: i.height }));

  return NextResponse.json({ pages: unique, images }, { headers: { "Access-Control-Allow-Origin": "*" } });
}
