import Link from "next/link";
import { StatusChip } from "@/components/StatusChip";
import { Evidence } from "@/components/Evidence";
import { routeBySlug } from "@/features/routes/data";
import { formatDuration, publishedFigures } from "@/features/routes/publish";

/**
 * Shows the measured position for one leg on a destination page.
 *
 * Reads the same drive logs as /routes, so a destination page can never claim
 * a timing the route table does not have. When the leg is unmeasured it says
 * so plainly rather than omitting the question.
 */
export function RouteStatus({ slug }: { slug: string }) {
  const route = routeBySlug(slug);
  if (!route) return null;

  const figures = publishedFigures(route);
  const label = `${route.origin} → ${route.destination}`;

  return (
    <div className="rounded-[var(--radius-data)] border border-line-soft p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-ink">{label}</h3>
        {figures ? (
          <StatusChip status="verified" label={`Driven ${figures.sampleSize}×`} />
        ) : (
          <StatusChip status="pending" />
        )}
      </div>

      {figures ? (
        <>
          <dl className="tabular mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <dt className="text-2xs font-medium uppercase tracking-[0.12em] text-meta">
                Distance
              </dt>
              <dd className="mt-1 text-lg text-ink">{figures.distanceKm} km</dd>
            </div>
            <div>
              <dt className="text-2xs font-medium uppercase tracking-[0.12em] text-meta">
                Driving
              </dt>
              <dd className="mt-1 text-lg text-ink">
                {formatDuration(figures.movingMinutes)}
              </dd>
            </div>
            <div>
              <dt className="text-2xs font-medium uppercase tracking-[0.12em] text-meta">
                Door to door
              </dt>
              <dd className="mt-1 text-lg text-ink">
                {formatDuration(figures.elapsedMinutes)}
              </dd>
            </div>
          </dl>
          <p className="mt-5 text-sm text-meta">
            Full record on{" "}
            <Link href={`/routes/${route.slug}`} className="text-petrol underline">
              {label}
            </Link>
            .
          </p>
        </>
      ) : (
        <div className="mt-5">
          <p className="text-sm text-meta">
            We have not published a distance or a drive time for this leg,
            because we have not finished measuring it. When our drivers have
            logged it, the figures appear here and on{" "}
            <Link href="/routes" className="text-petrol underline">
              route intelligence
            </Link>{" "}
            at the same time.
          </p>
          <div className="mt-4">
            <Evidence note="We will give you a timing for this leg in a quote when we have driven it. We will not give you one from a mapping service and present it as ours." />
          </div>
        </div>
      )}
    </div>
  );
}
