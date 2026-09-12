import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import { Evidence } from "@/components/Evidence";
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

  const facts = [
    { label: "Distance", value: `${figures.distanceKm} km` },
    { label: "Driving time", value: formatDuration(figures.movingMinutes) },
    { label: "Door to door", value: formatDuration(figures.elapsedMinutes) },
    { label: "Runs logged", value: String(figures.sampleSize) },
  ];

  return (
    <>
      <Breadcrumbs
        trail={[
          { href: "/routes", label: "Route intelligence" },
          {
            href: `/routes/${route.slug}`,
            label: `${route.origin} to ${route.destination}`,
          },
        ]}
      />
      <PageIntro
        eyebrow="Route intelligence"
        title={`${route.origin} to ${route.destination}`}
        standfirst={`Measured by PM Travel drivers over ${figures.sampleSize} logged runs between ${figures.firstLoggedOn} and ${figures.lastLoggedOn}.`}
      />

      <Container as="section" className="py-16 lg:py-24">
        <div className="surface-deep rounded-[var(--radius-data)] bg-petrol-deep px-6 py-8 text-chalk">
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-2xs font-medium uppercase tracking-[0.12em] text-hamada">
                  {fact.label}
                </dt>
                <dd className="tabular mt-2 text-xl text-chalk">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 border-t border-chalk/20 pt-6">
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

        <div className="measure mt-10 flex flex-col gap-6 text-base text-meta">
          {route.roadAndPasses ? <p>{route.roadAndPasses}</p> : null}
          {route.seasonalNotes ? <p>{route.seasonalNotes}</p> : null}
          {route.weatherNotes ? <p>{route.weatherNotes}</p> : null}
          {route.vehicleClass ? (
            <p>
              <span className="text-ink">Vehicle class:</span> {route.vehicleClass}
            </p>
          ) : null}
        </div>

        {route.recommendedStops.length > 0 ? (
          <div className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              Stops we use
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {route.recommendedStops.map((stop) => (
                <li
                  key={stop}
                  className="measure rounded-[var(--radius-data)] border border-line-soft px-4 py-3 text-sm text-ink"
                >
                  {stop}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Planning a day around this leg
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Send us the itinerary and we will tell you whether the day works
          against these timings. Every other leg on{" "}
          <Link href="/routes" className="text-petrol underline">
            route intelligence
          </Link>{" "}
          states whether it has been measured yet.
        </p>
        <div className="mt-8">
          <ButtonLink href={RFQ_HREF} variant="accent">
            Request a B2B quote
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
