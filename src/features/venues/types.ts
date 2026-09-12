import type { Confidence } from "../../lib/evidence";

/**
 * Three levels of disclosure.
 *
 * If we publish our supplier intelligence, competitors copy it in a week at
 * zero cost and we have funded their content. The public level describes the
 * destination. The gated level is the commercial asset. The internal level is
 * the business.
 *
 * The split is enforced by types, not by care: PublicVenue simply has no field
 * that could hold a venue name, a rate or a floor plan, and the only way to
 * produce one is toPublicVenue() in disclosure.ts.
 */

export type LayoutName =
  | "theatre"
  | "cabaret"
  | "banquet"
  | "reception"
  | "classroom"
  | "boardroom"
  | "u_shape";

/** A capacity we measured ourselves, for one specific layout. */
export type MeasuredCapacity = {
  layout: LayoutName;
  /** Seats or standing places counted on site. INTERNAL AND GATED ONLY. */
  capacity: number;
  /** What limited it: floor area, exits, sightlines, service access. */
  limitedBy: string;
};

export type VenueInspection = {
  /** ISO date of the inspection. */
  inspectedOn: string;
  /** Named PM Travel inspector. An unattributed inspection is not evidence. */
  inspector: string;
  measuredCapacities: MeasuredCapacity[];
  accessNotes: string;
  parking: string;
  coachAccess: string;
  av: string;
  weatherPlan: string;
  noiseRestrictions: string | null;
  curfew: string | null;
  permits: string | null;
  /** What we would move to if this venue failed. Never published. */
  backupVenue: string | null;
  confidence: Confidence;
};

/**
 * The full record. This type is server-only: see data.ts, which imports
 * "server-only" so that any attempt to pull it into a Client Component fails
 * the build rather than shipping rates to a browser.
 */
export type VenueRecord = {
  slug: string;
  /** GATED. Never rendered publicly. */
  name: string;
  destination: string;
  venueType: string;

  // --- Public-safe descriptive fields ---
  indoorOutdoor: "indoor" | "outdoor" | "both";
  access: string;
  coachConsiderations: string;
  parking: string;
  weatherRisk: string;
  wetWeatherPlan: string;
  transferLogistics: string;
  seasonality: string;

  inspections: VenueInspection[];

  // --- INTERNAL ONLY. Never leaves the office. ---
  internal: {
    rates: string | null;
    terms: string | null;
    releasePeriod: string | null;
    allotments: string | null;
    supplierPerformance: string | null;
    incidentHistory: string | null;
    negotiationNotes: string | null;
  };
};

/**
 * What may be indexed by a search engine.
 *
 * Note what is absent: no name, no exact capacity, no floor plan, no AV detail,
 * no backup venue, nothing from `internal`. Capacity appears only as a band.
 */
export type PublicVenue = {
  slug: string;
  destination: string;
  venueType: string;
  indoorOutdoor: "indoor" | "outdoor" | "both";
  access: string;
  coachConsiderations: string;
  parking: string;
  weatherRisk: string;
  wetWeatherPlan: string;
  transferLogistics: string;
  seasonality: string;
  /** Bands only, e.g. "150–200 (banquet)". Never an exact measured figure. */
  capacityBands: string[];
  inspectedOn: string;
  inspectorCount: number;
};

export const LAYOUT_LABELS: Record<LayoutName, string> = {
  theatre: "theatre",
  cabaret: "cabaret",
  banquet: "banquet",
  reception: "reception",
  classroom: "classroom",
  boardroom: "boardroom",
  u_shape: "U-shape",
};
