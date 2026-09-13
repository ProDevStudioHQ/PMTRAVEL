import type { RouteRecord } from "./types";
import { DRIVE_LOGS } from "./drive-logs";

/**
 * The target routes from Marrakech.
 *
 * Drive logs come from data/drive-logs.csv, imported and validated by
 * `npm run import:drive-logs` into ./drive-logs.ts. A route with fewer than
 * two usable logs renders as "Verification in progress".
 *
 * Do NOT type a distance or a drive time anywhere in this file - there is no
 * field for one. Figures are derived from logs in publish.ts, so the only way
 * to put a number on the site is to have driven the route. See
 * docs/route-verification.md.
 */

const TARGETS: { destination: string; slug: string }[] = [
  // The three routes behind the B2B programmes and excursions come first.
  { destination: "Agafay", slug: "marrakech-agafay" },
  { destination: "Imlil", slug: "marrakech-imlil" },
  { destination: "Ourika", slug: "marrakech-ourika" },
  { destination: "Essaouira", slug: "marrakech-essaouira" },
  { destination: "Ouarzazate", slug: "marrakech-ouarzazate" },
  { destination: "Dades", slug: "marrakech-dades" },
  { destination: "Merzouga", slug: "marrakech-merzouga" },
  { destination: "Fes", slug: "marrakech-fes" },
  { destination: "Casablanca", slug: "marrakech-casablanca" },
  { destination: "Rabat", slug: "marrakech-rabat" },
  { destination: "Tangier", slug: "marrakech-tangier" },
];

export const ROUTES: RouteRecord[] = TARGETS.map(({ destination, slug }) => ({
  slug,
  origin: "Marrakech",
  destination,
  driveLogs: DRIVE_LOGS[slug] ?? [],
  vehicleClass: null,
  roadAndPasses: null,
  recommendedStops: [],
  seasonalNotes: null,
  weatherNotes: null,
  evidence: [],
}));

export const routeBySlug = (slug: string): RouteRecord | undefined =>
  ROUTES.find((route) => route.slug === slug);
