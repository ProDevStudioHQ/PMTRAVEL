import type { MetadataRoute } from "next";
import { STATIC_ROUTES } from "@/lib/nav";
import { LOGIN_HREF, SITE_URL } from "@/lib/company";
import { hreflangAlternates } from "@/i18n/config";
import { AUDIENCES } from "@/content/b2b";
import { EXPERIENCES, TOURS, leisureHref } from "@/content/leisure";
import { ARTICLES, JOURNAL_CATEGORIES } from "@/content/journal";
import { DESTINATIONS } from "@/features/destinations/registry";
import { PROGRAMMES, programmeHref } from "@/features/programmes/data";
import { EXCURSIONS, excursionHref } from "@/features/excursions/data";
import { getSitemap } from "@/lib/cms";

const priorityFor = (path: string) => {
  if (path === "/") return 1;
  if (path.startsWith("/b2b") || path === "/request-a-quote") return 0.9;
  if (path.startsWith("/experiences") || path.startsWith("/tours")) return 0.8;
  return 0.6;
};

/**
 * Static pages plus every category and programme the CRM publishes (GET
 * /sitemap, tag "sitemap": the CRM revalidates it on publish / unpublish, so
 * an unpublished programme drops out). CRM paths carry their own updatedAt.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const cms = (await getSitemap()) ?? [];
  const cmsUpdated = new Map(cms.map((e) => [e.path, e.updatedAt]));
  const paths = [
    ...STATIC_ROUTES.filter((p) => p !== LOGIN_HREF), // noindex
    ...AUDIENCES.map((a) => `/b2b/${a.slug}`),
    ...EXPERIENCES.map(leisureHref),
    ...TOURS.map(leisureHref),
    ...ARTICLES.map((a) => `/journal/${a.slug}`),
    ...JOURNAL_CATEGORIES.map((c) => `/journal/category/${c.slug}`),
    ...DESTINATIONS.map((d) => `/destinations/${d.slug}`),
    ...PROGRAMMES.map(programmeHref),
    ...EXCURSIONS.map(excursionHref),
    ...cms.map((e) => e.path).filter((path) => /^\/(experiences|tours)\/[a-z0-9-]+(\/[a-z0-9-]+)?$/.test(path)),
  ];
  const unique = [...new Set(paths)];

  return unique.map((path) => {
    const languages = Object.fromEntries(
      Object.entries(hreflangAlternates(path)).map(([lang, href]) => [lang, `${SITE_URL}${href === "/" ? "" : href}`])
    );
    const updated = cmsUpdated.get(path);
    const cmsDate = updated ? new Date(updated) : null;
    return {
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: cmsDate && !Number.isNaN(cmsDate.getTime()) ? cmsDate : lastModified,
      changeFrequency: "monthly" as const,
      priority: priorityFor(path),
      alternates: { languages },
    };
  });
}
