import "server-only";
import type { VenueRecord } from "./types";

/**
 * The venue record. SERVER ONLY.
 *
 * The "server-only" import above is load-bearing: this module holds rates,
 * terms, negotiation notes and named venues, and importing it from a Client
 * Component fails the build rather than shipping any of that to a browser.
 * Pages must go through toPublicVenue() in disclosure.ts.
 *
 * The array is empty because no venue has been inspected yet. That is the
 * honest state.
 *
 * TODO(verify): add a VenueRecord per completed inspection, starting with the
 * Marrakech venues that appear most often in the briefs we are actually asked
 * to quote. Never create a record from a supplier's website, a brochure or a
 * floor plan PDF - a capacity is measured on site or it does not exist.
 * See docs/venue-inspection.md.
 */
export const VENUES: VenueRecord[] = [];

export const venueBySlug = (slug: string): VenueRecord | undefined =>
  VENUES.find((venue) => venue.slug === slug);
