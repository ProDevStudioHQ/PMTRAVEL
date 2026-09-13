import type { MetadataRoute } from "next";
import { ALL_ROUTES, SITE_URL } from "@/lib/nav";
import { ROUTES } from "@/features/routes/data";
import { DESTINATIONS } from "@/features/destinations/registry";
import { PROGRAMMES, programmeHref } from "@/features/programmes/data";
import { EXCURSIONS, excursionHref } from "@/features/excursions/data";
import { isPublished } from "@/features/routes/publish";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Only verified routes have pages, so only verified routes are listed.
  const routePages = ROUTES.filter(isPublished).map(
    (route) => `/routes/${route.slug}`
  );

  const destinationPages = DESTINATIONS.map(
    (destination) => `/destinations/${destination.slug}`
  );

  // Hand-built programme pages are already in ALL_ROUTES through the nav.
  const programmePages = PROGRAMMES.filter((programme) => !programme.customPage).map(programmeHref);

  const excursionPages = EXCURSIONS.map(excursionHref);

  return [...ALL_ROUTES, ...destinationPages, ...programmePages, ...excursionPages, ...routePages].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
