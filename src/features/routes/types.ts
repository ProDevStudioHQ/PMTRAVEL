import type { Confidence } from "../../lib/evidence";

/**
 * A single logged run of a route.
 *
 * This is the ONLY thing that can put a number on the public site. Figures are
 * derived from these records; they are never typed directly into a route.
 * No entry here may be created from a mapping service, a supplier, or memory.
 */
export type DriveLog = {
  /** ISO date the run was driven. */
  drivenOn: string;
  /** The person who drove it. A run with no named driver is not evidence. */
  driver: string;
  vehicle: string;
  /** Odometer end minus odometer start, in kilometres. */
  distanceKm: number;
  /** Wheels-moving to wheels-stopped, in minutes, excluding planned stops. */
  movingMinutes: number;
  /** Total elapsed time including stops, in minutes. */
  elapsedMinutes: number;
  departedAt: string;
  conditions: string;
  notes?: string;
};

/** Superseded evidence is kept. New evidence is appended, never overwritten. */
export type EvidenceEntry = {
  claim: string;
  source: string;
  sourceType: "pm_measurement" | "pm_site_visit" | "official" | "supplier" | "trade_press" | "web";
  sourceUrl?: string;
  retrievedOn: string;
  verifiedOn: string;
  verifiedBy: string;
  confidence: Confidence;
  /** Set when a later entry replaces this one. The entry itself stays. */
  supersededOn?: string;
};

export type RouteRecord = {
  slug: string;
  origin: string;
  destination: string;

  /**
   * Every logged run of this route. A route with an empty array publishes no
   * figures and renders as "Verification in progress".
   */
  driveLogs: DriveLog[];

  /** Descriptive fields. Null until someone has been there to write them. */
  vehicleClass: string | null;
  roadAndPasses: string | null;
  recommendedStops: string[];
  seasonalNotes: string | null;
  weatherNotes: string | null;

  evidence: EvidenceEntry[];
};

/** A route needs at least this many logged runs before figures are published. */
export const MIN_LOGS_TO_PUBLISH = 2;

/** /routes publishes measured figures once this many routes are complete. */
export const ROUTES_PAGE_THRESHOLD = 3;
