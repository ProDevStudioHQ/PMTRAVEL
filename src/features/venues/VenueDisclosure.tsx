import { Card } from "@/components/Card";
import { Evidence } from "@/components/Evidence";
import { StatusChip } from "@/components/StatusChip";
import type { PublicVenue } from "@/features/venues/types";

/**
 * Renders the PUBLIC level only.
 *
 * This component takes PublicVenue, never VenueRecord. It is structurally
 * incapable of printing a venue name, an exact capacity, a floor plan, AV
 * detail, a backup venue or anything from `internal`, because those fields do
 * not exist on the type it receives.
 */
export function VenueDisclosure({ venues }: { venues: PublicVenue[] }) {
  if (venues.length === 0) {
    return (
      <div className="rounded-card border border-rule bg-paper p-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="text-lg font-semibold text-ink-900">No venue has been inspected yet</h3>
          <StatusChip status="pending" label="Inspections under way" />
        </div>
        <p className="measure mt-4 text-base text-ink-500">
          We are not going to populate this from supplier brochures. A venue
          appears here after someone from PM Travel has stood in the room,
          measured it, and recorded what limited the capacity. Until then the
          honest answer is that we do not have the data, and you should treat
          anyone who produces it instantly with the same suspicion.
        </p>
        <div className="measure mt-6">
          <Evidence note="Capacities are published as bands drawn from our own on-site measurement, with the inspection date. Exact capacity by layout, floor plans and AV detail are shared with agents directly rather than published." />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {venues.map((venue) => (
        <Card
          key={venue.slug}
          variant="destination"
          eyebrow={venue.destination}
          title={`${venue.venueType}, ${venue.indoorOutdoor}`}
        >
          <dl className="flex flex-col gap-3">
            {[
              ["Capacity", venue.capacityBands.join(", ")],
              ["Access", venue.access],
              ["Coaches", venue.coachConsiderations],
              ["Parking", venue.parking],
              ["Weather risk", venue.weatherRisk],
              ["Wet weather plan", venue.wetWeatherPlan],
              ["Transfers", venue.transferLogistics],
              ["Seasonality", venue.seasonality],
            ]
              .filter(([, value]) => Boolean(value))
              .map(([label, value]) => (
                <div key={label}>
                  <dt className="text-sm text-ink-500">{label}</dt>
                  <dd className="mt-1 text-base text-ink-900">{value}</dd>
                </div>
              ))}
          </dl>
          <div className="mt-4">
            <Evidence
              source="PM Travel venue inspection"
              method="Measured on site"
              verifiedOn={venue.inspectedOn}
              confidence="high"
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
