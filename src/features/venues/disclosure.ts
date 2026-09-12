import {
  LAYOUT_LABELS,
  type PublicVenue,
  type VenueRecord,
} from "./types";

/**
 * The single gate between what we know and what we publish.
 *
 * toPublicVenue() builds a PublicVenue field by field. It never spreads the
 * source record, which is deliberate: `{ ...venue }` would silently publish
 * every field added to VenueRecord in future, including the next one someone
 * adds to `internal`. Adding a field here has to be a decision.
 */

/**
 * Rounds a measured capacity outwards to a band.
 *
 * We publish "150–200", not "184". The exact figure is the commercial asset and
 * it is what a competitor would copy; the band is what a planner needs to know
 * whether the venue is worth a conversation.
 */
export function capacityBand(capacity: number): string {
  const width = capacity < 100 ? 25 : capacity < 500 ? 50 : 100;
  const lower = Math.floor(capacity / width) * width;
  return `${lower}–${lower + width}`;
}

export function toPublicVenue(venue: VenueRecord): PublicVenue | null {
  const inspections = venue.inspections.filter(
    (inspection) =>
      inspection.inspectedOn.length > 0 && inspection.inspector.trim().length > 0
  );

  // No inspection, nothing published. A supplier's own claim is never enough:
  // if a camp's website says 52 tents, that stays unconfirmed until someone
  // from PM Travel has been there and counted.
  if (inspections.length === 0) return null;

  const latest = [...inspections].sort((a, b) =>
    a.inspectedOn < b.inspectedOn ? 1 : -1
  )[0]!;

  const capacityBands = latest.measuredCapacities
    .filter((measured) => measured.capacity > 0)
    .map(
      (measured) =>
        `${capacityBand(measured.capacity)} (${LAYOUT_LABELS[measured.layout]})`
    );

  return {
    slug: venue.slug,
    destination: venue.destination,
    venueType: venue.venueType,
    indoorOutdoor: venue.indoorOutdoor,
    access: venue.access,
    coachConsiderations: venue.coachConsiderations,
    parking: venue.parking,
    weatherRisk: venue.weatherRisk,
    wetWeatherPlan: venue.wetWeatherPlan,
    transferLogistics: venue.transferLogistics,
    seasonality: venue.seasonality,
    capacityBands,
    inspectedOn: latest.inspectedOn,
    inspectorCount: new Set(inspections.map((i) => i.inspector)).size,
  };
}

/** Claims older than 12 months are flagged for re-inspection. */
export function needsReinspection(
  venue: VenueRecord,
  now: Date = new Date()
): boolean {
  const published = toPublicVenue(venue);
  if (!published) return false;
  const last = new Date(published.inspectedOn);
  const months =
    (now.getFullYear() - last.getFullYear()) * 12 +
    (now.getMonth() - last.getMonth());
  return months >= 12;
}
