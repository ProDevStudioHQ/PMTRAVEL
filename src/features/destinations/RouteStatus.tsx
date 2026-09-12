import { StatusChip } from "@/components/StatusChip";
import { Evidence } from "@/components/Evidence";
import { TextLink } from "@/components/TextLink";
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
  const label = `${route.origin} to ${route.destination}`;

  return (
    <div className="rounded-card border border-rule bg-paper p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink-900">{label}</h3>
        {figures ? (
          <StatusChip status="verified" label={`Driven ${figures.sampleSize}×`} />
        ) : (
          <StatusChip status="pending" />
        )}
      </div>

      {figures ? (
        <>
          <dl className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              ["Distance", `${figures.distanceKm} km`],
              ["Driving", formatDuration(figures.movingMinutes)],
              ["Door to door", formatDuration(figures.elapsedMinutes)],
            ].map(([term, value]) => (
              <div key={term}>
                <dt className="text-sm text-ink-500">{term}</dt>
                <dd className="tabular mt-1 font-display text-2xl font-bold text-ink-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-base text-ink-500">
            Full record on <TextLink href={`/routes/${route.slug}`}>{label}</TextLink>.
          </p>
        </>
      ) : (
        <div className="mt-6">
          <p className="text-base text-ink-500">
            We have not published a distance or a drive time for this leg,
            because we have not finished measuring it. When our drivers have
            logged it, the figures appear here and on{" "}
            <TextLink href="/routes">route intelligence</TextLink> at the same time.
          </p>
          <div className="mt-4">
            <Evidence note="We will give you a timing for this leg in a quote when we have driven it. We will not give you one from a mapping service and present it as ours." />
          </div>
        </div>
      )}
    </div>
  );
}
