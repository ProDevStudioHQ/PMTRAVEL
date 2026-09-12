import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { StatusChip } from "@/components/StatusChip";
import { Evidence } from "@/components/Evidence";
import { RouteTable } from "@/features/routes/RouteTable";
import { HomeHero } from "@/features/images/HomeHero";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: `${COMPANY.positioning} | ${COMPANY.name}`,
  description:
    "B2B Morocco ground operations: transfers, airport handling, hotels, guiding, groups, FIT and events, planned on verified operational data.",
  alternates: { canonical: "/" },
};

const CAPABILITIES = [
  {
    title: "Transport and transfers",
    body: "Vehicle class matched to group size and route, drivers briefed to the day plan, and a stated backup for every movement.",
    href: "/morocco-dmc",
  },
  {
    title: "Airport operations",
    body: "Arrival manifests, flight monitoring, meet and greet, and a clean handover into the ground programme.",
    href: "/morocco-dmc",
  },
  {
    title: "Hotels and riads",
    body: "Sourcing, rooming lists and check-in coordination across Marrakech and the wider circuit.",
    href: "/morocco-dmc",
  },
  {
    title: "Guiding",
    body: "Licensed guides briefed to your itinerary, working in the languages we actually operate in.",
    href: "/morocco-dmc",
  },
  {
    title: "Dining and gala",
    body: "Restaurant and gala coordination, including dietary handling and timing against the rest of the day.",
    href: "/mice",
  },
  {
    title: "Activities and experiences",
    body: "Excursions scheduled against real drive times and real daylight, not brochure timings.",
    href: "/destinations",
  },
  {
    title: "Groups and FIT",
    body: "Series groups, one-off groups and individual travellers, run under the same operational file.",
    href: "/b2b",
  },
  {
    title: "MICE and events",
    body: "Meetings, incentives and events, built on venue data we have inspected rather than repeated.",
    href: "/mice",
  },
];

const CAPABILITY_STATUS = [
  {
    label: "Ground operations across the Marrakech circuit",
    status: "verified" as const,
  },
  { label: "Groups, FIT and series programmes", status: "verified" as const },
  { label: "White-label operation under your brand", status: "verified" as const },
  {
    label: `Working languages: ${COMPANY.languages.join(", ")}`,
    status: "verified" as const,
  },
  {
    label: "German-language operation",
    status: "unverified" as const,
    note: "Not available",
  },
  { label: "Published route measurements", status: "pending" as const },
  { label: "Published venue capacities by layout", status: "pending" as const },
  { label: "Published response-time figures", status: "pending" as const },
  { label: "Italian and Spanish site versions", status: "future" as const },
  { label: "Travel trade portal", status: "future" as const },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          What we can operate for your clients
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Everything below runs out of our office in Gueliz, Marrakech. You keep
          the client, the brand and the margin; we run what happens after the
          aircraft doors open.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((capability) => (
            <Card
              key={capability.title}
              title={capability.title}
              href={capability.href}
            >
              {capability.body}
            </Card>
          ))}
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Verified route intelligence
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Almost every Morocco drive time you will find online came from a
          mapping service or from repetition. Ours are published only after one
          of our drivers has driven the route and logged it. Everything still
          being measured says so, in the table itself.
        </p>
        <div className="mt-10">
          <RouteTable />
        </div>
        <p className="measure mt-8 text-sm text-meta">
          More on the standard behind this table in{" "}
          <Link href="/how-we-work" className="text-petrol underline">
            how we work
          </Link>
          , and the full list on{" "}
          <Link href="/routes" className="text-petrol underline">
            route intelligence
          </Link>
          .
        </p>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Current capability
        </h2>
        <p className="measure mt-4 text-base text-meta">
          What we operate today, and what is not in place yet. The second half of
          this list is what should make the first half worth believing.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {CAPABILITY_STATUS.map((item) => (
            <li
              key={item.label}
              className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-data)] border border-line-soft px-4 py-4"
            >
              <span className="text-sm text-ink">{item.label}</span>
              <StatusChip status={item.status} label={item.note} />
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Evidence note="Capability statements describe what PM Travel operates directly from its Marrakech office. Items shown as in progress are being measured and will be published with a date and a method, or not at all." />
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Send us a requirement
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Step one takes a company name, dates, destinations, traveller numbers
          and a brief. The rest is optional and can follow. If you would rather
          write an email, the{" "}
          <Link href="/contact" className="text-petrol underline">
            operations desk
          </Link>{" "}
          reads the same way.
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
