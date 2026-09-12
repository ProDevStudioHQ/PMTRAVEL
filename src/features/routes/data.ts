import type { RouteRecord } from "./types";

/**
 * The nine target routes from Marrakech.
 *
 * `driveLogs` is empty on every route because none has been driven and logged
 * yet. That is the honest state, and it is what makes the table say
 * "Verification in progress".
 *
 * TODO(verify): add a DriveLog entry per completed run. Do NOT type a distance
 * or a drive time anywhere in this file - there is no field for one. Figures
 * are derived from logs in publish.ts, so the only way to put a number on the
 * site is to have driven the route. See docs/route-verification.md.
 */

const TARGETS: { destination: string; slug: string }[] = [
  { destination: "Agafay", slug: "marrakech-agafay" },
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
  driveLogs: [],
  vehicleClass: null,
  roadAndPasses: null,
  recommendedStops: [],
  seasonalNotes: null,
  weatherNotes: null,
  evidence: [],
}));

export const routeBySlug = (slug: string): RouteRecord | undefined =>
  ROUTES.find((route) => route.slug === slug);
