import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import { Evidence } from "@/components/Evidence";
import { Section, SectionIntro } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
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

      <section className="bg-paper">
        <Container className="pb-16 pt-8 lg:pb-24">
          <h1 className="max-w-[18ch] text-3xl font-bold tracking-tight text-ink-900 lg:text-4xl">
            {route.origin} to {route.destination}
          </h1>
          <p className="measure mt-6 text-lg text-ink-500">
            Measured by PM Travel drivers over {figures.sampleSize} logged runs between{" "}
            {figures.firstLoggedOn} and {figures.lastLoggedOn}.
          </p>
        </Container>
      </section>

      <Section tone="paper-2">
        {/* The same instrument treatment as the route table: red-900, tabular figures, method underneath. */}
        <div className="rounded-card bg-red-900 text-paper">
          <dl className="grid gap-8 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-paper/80">{fact.label}</dt>
                <dd className="tabular mt-2 font-display text-3xl font-bold">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="border-t border-paper/15 px-6 py-5">
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

        <div className="measure mt-12 flex flex-col gap-6 text-base text-ink-900">
          {route.roadAndPasses ? <p>{route.roadAndPasses}</p> : null}
          {route.seasonalNotes ? <p>{route.seasonalNotes}</p> : null}
          {route.weatherNotes ? <p>{route.weatherNotes}</p> : null}
          {route.vehicleClass ? (
            <p>
              <span className="font-medium">Vehicle class:</span> {route.vehicleClass}
            </p>
          ) : null}
        </div>

        {route.recommendedStops.length > 0 ? (
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-ink-900">Stops we use</h2>
            <ul className="measure mt-8 border-t border-rule">
              {route.recommendedStops.map((stop) => (
                <li key={stop} className="border-b border-rule py-4 text-base text-ink-900">
                  {stop}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      <Section>
        <SectionIntro title="Planning a day around this leg">
          <p>
            Send us the itinerary and we will tell you whether the day works
            against these timings. Every other leg on{" "}
            <TextLink href="/routes">route intelligence</TextLink> states whether
            it has been measured yet.
          </p>
        </SectionIntro>
        <div className="mt-8">
          <ButtonLink href={RFQ_HREF}>Request a B2B quote</ButtonLink>
        </div>
      </Section>
    </>
  );
}
