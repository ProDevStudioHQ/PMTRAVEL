import {
  MIN_LOGS_TO_PUBLISH,
  type DriveLog,
  type RouteRecord,
} from "./types";

/**
 * Derives what may be shown publicly for a route.
 *
 * The only input is the drive log. There is no code path that lets a figure
 * reach a page without a logged run behind it, which is the point: the rule is
 * enforced by the type system rather than by whoever is editing the file.
 */

export type PublishedRoute = {
  /** Median across logged runs, rounded. */
  distanceKm: number;
  movingMinutes: number;
  elapsedMinutes: number;
  /** How many runs the figures are drawn from. Always shown. */
  sampleSize: number;
  firstLoggedOn: string;
  lastLoggedOn: string;
  drivers: string[];
};

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[middle] ?? 0;
  return Math.round(((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2);
}

function isUsableLog(log: DriveLog): boolean {
  return (
    log.drivenOn.length > 0 &&
    log.driver.trim().length > 0 &&
    log.distanceKm > 0 &&
    log.movingMinutes > 0 &&
    log.elapsedMinutes >= log.movingMinutes
  );
}

export function publishedFigures(route: RouteRecord): PublishedRoute | null {
  const logs = route.driveLogs.filter(isUsableLog);
  if (logs.length < MIN_LOGS_TO_PUBLISH) return null;

  const dates = logs.map((log) => log.drivenOn).sort();
  return {
    distanceKm: Math.round(median(logs.map((log) => log.distanceKm))),
    movingMinutes: median(logs.map((log) => log.movingMinutes)),
    elapsedMinutes: median(logs.map((log) => log.elapsedMinutes)),
    sampleSize: logs.length,
    firstLoggedOn: dates[0] ?? "",
    lastLoggedOn: dates[dates.length - 1] ?? "",
    drivers: [...new Set(logs.map((log) => log.driver))],
  };
}

export const isPublished = (route: RouteRecord): boolean =>
  publishedFigures(route) !== null;

/** Claims older than 12 months are flagged for re-verification. */
export function needsReverification(
  route: RouteRecord,
  now: Date = new Date()
): boolean {
  const figures = publishedFigures(route);
  if (!figures) return false;
  const last = new Date(figures.lastLoggedOn);
  const months =
    (now.getFullYear() - last.getFullYear()) * 12 +
    (now.getMonth() - last.getMonth());
  return months >= 12;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest}m`;
  return rest === 0 ? `${hours}h` : `${hours}h ${String(rest).padStart(2, "0")}m`;
}
