import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { Evidence } from "@/components/Evidence";
import { CtaBanner, ProseCard, SectionHeading } from "@/components/Modern";
import { Section } from "@/components/Section";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { ROUTES, routeBySlug } from "@/features/routes/data";
import {
  formatDuration,
  isPublished,
  publishedFigures,
} from "@/features/routes/publish";
import { RFQ_HREF } from "@/lib/nav";

/**
 * A route gets its own URL only once it has logged runs behind it.
 *
 * generateStaticParams returns published routes only, and dynamicParams is
 * false, so an unverified route 404s rather than rendering an empty page.
 * Today that means this file produces no pages at all - which is correct, and
 * is the anti-thin-content rule enforced in code rather than in review.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return ROUTES.filter(isPublished).map((route) => ({ slug: route.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = routeBySlug(slug);
  if (!route) return {};
  return pageMetadata({
    title: `${route.origin} to ${route.destination} by Road`,
    description: `Measured driving distance and time from ${route.origin} to ${route.destination}, logged by PM Travel drivers.`,
    path: `/routes/${route.slug}`,
  });
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const route = routeBySlug(slug);
  const figures = route ? publishedFigures(route) : null;

  // Belt and braces: even if a slug reached us, no figures means no page.
  if (!route || !figures) notFound();

  const label = `${route.origin} to ${route.destination}`;
  const notes = [route.roadAndPasses, route.seasonalNotes, route.weatherNotes].filter(Boolean);

  return (
    <>
      <DestinationHero
        title={label}
        standfirst={`Measured by PM Travel drivers over ${figures.sampleSize} logged runs between ${figures.firstLoggedOn} and ${figures.lastLoggedOn}.`}
        imageKey="c8b-dades-hairpins"
        kicker="Measured route"
        trail={[
          { href: "/routes", label: "Route intelligence" },
          { href: `/routes/${route.slug}`, label },
        ]}
        stats={[
          { value: `${figures.distanceKm} km`, label: "Distance" },
          { value: formatDuration(figures.movingMinutes), label: "Driving time" },
          { value: formatDuration(figures.elapsedMinutes), label: "Door to door" },
          { value: String(figures.sampleSize), label: "Runs logged" },
        ]}
      />

      <Section tone="paper-2">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <div className="self-start lg:sticky lg:top-24">
            <SectionHeading eyebrow="The evidence" title="How this leg was measured" />
            <div className="surface-deep mt-8 rounded-2xl bg-red-900 p-6 text-paper">
              <Evidence
                onDark
                source="PM Travel drive logs"
                method="Driven and logged"
                verifiedBy={figures.drivers.join(", ")}
                verifiedOn={figures.lastLoggedOn}
                confidence="high"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {notes.length > 0 || route.vehicleClass ? (
              <ProseCard>
                {notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
                {route.vehicleClass ? (
                  <p>
                    <span className="font-medium">Vehicle class:</span> {route.vehicleClass}
                  </p>
                ) : null}
              </ProseCard>
            ) : null}

            {route.recommendedStops.length > 0 ? (
              <div className="rounded-3xl border border-rule bg-paper p-6 sm:p-10">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink-900">Stops we use</h2>
                <ol className="mt-6 flex flex-col gap-3">
                  {route.recommendedStops.map((stop, index) => (
                    <li key={stop} className="flex items-center gap-4 text-base text-ink-900">
                      <span
                        aria-hidden="true"
                        className="tabular flex size-8 shrink-0 items-center justify-center rounded-full bg-red-600 font-display text-sm font-bold text-paper"
                      >
                        {index + 1}
                      </span>
                      {stop}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      <Section>
        <CtaBanner
          title="Planning a day around this leg"
          primary={{ href: RFQ_HREF, label: "Request a B2B quote" }}
          secondary={{ href: "/routes", label: "All routes" }}
        >
          <p>
            Send us the itinerary and we will tell you whether the day works
            against these timings. Every other leg on route intelligence states
            whether it has been measured yet.
          </p>
        </CtaBanner>
      </Section>
    </>
  );
}
