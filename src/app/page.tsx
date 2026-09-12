import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { StatusChip } from "@/components/StatusChip";
import { Evidence } from "@/components/Evidence";
import { RouteTable } from "@/features/routes/RouteTable";
import { HomeHero } from "@/features/images/HomeHero";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: `${COMPANY.positioning} | ${COMPANY.name}`,
  description:
    "B2B Morocco ground operations: transfers, airport handling, hotels, guiding, groups, FIT and events, planned on verified operational data.",
  path: "/",
});

/*
 * Four of these point at /morocco-dmc. Phase 4 gives that page anchor
 * sections for them, or the card count comes down (SOP Phase 4).
 */
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

const INLINE_LINK = "text-red-600 underline underline-offset-4 hover:text-red-900";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="bg-paper">
        <Container className="py-16 lg:py-24">
          <h2 className="max-w-[20ch] text-2xl font-bold tracking-tight text-ink-900">
            What we can operate for your clients
          </h2>
          <p className="measure mt-6 text-lg text-ink-500">
            Everything below runs out of our office in Gueliz, Marrakech. You keep
            the client, the brand and the margin; we run what happens after the
            aircraft doors open.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((capability) => (
              <li key={capability.title}>
                <Card
                  variant="service"
                  title={capability.title}
                  href={capability.href}
                  className="h-full"
                >
                  {capability.body}
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* The page's one bold element: the route table. Everything around it stays quiet. */}
      <section className="bg-paper-2">
        <Container className="py-16 lg:py-24">
          <h2 className="max-w-[20ch] text-2xl font-bold tracking-tight text-ink-900">
            Verified route intelligence
          </h2>
          <p className="measure mt-6 text-lg text-ink-500">
            Almost every Morocco drive time you will find online came from a
            mapping service or from repetition. Ours are published only after one
            of our drivers has driven the route and logged it. Everything still
            being measured says so, in the table itself.
          </p>
          <div className="mt-12">
            <RouteTable />
          </div>
          <p className="measure mt-8 text-base text-ink-500">
            More on the standard behind this table in{" "}
            <Link href="/how-we-work" className={INLINE_LINK}>
              how we work
            </Link>
            , and the full list on{" "}
            <Link href="/routes" className={INLINE_LINK}>
              route intelligence
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-16 lg:py-24">
          <h2 className="max-w-[20ch] text-2xl font-bold tracking-tight text-ink-900">
            Current capability
          </h2>
          <p className="measure mt-6 text-lg text-ink-500">
            What we operate today, and what is not in place yet. The second half of
            this list is what should make the first half worth believing.
          </p>
          {/*
            A ruled list rather than cards: this is a status register. Rows that
            are not in place keep their place in the list, with the label dimmed
            and the status stated in words beside it.
          */}
          <ul className="mt-12 grid border-t border-rule sm:grid-cols-2 sm:gap-x-12">
            {CAPABILITY_STATUS.map((item) => (
              <li
                key={item.label}
                className="grid min-h-16 content-center gap-2 border-b border-rule py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6"
              >
                <span
                  className={`text-base ${
                    item.status === "verified" ? "text-ink-900" : "text-ink-500"
                  }`}
                >
                  {item.label}
                </span>
                <StatusChip status={item.status} label={item.note} />
              </li>
            ))}
          </ul>
          <div className="measure mt-8">
            <Evidence note="Capability statements describe what PM Travel operates directly from its Marrakech office. Items shown as in progress are being measured and will be published with a date and a method, or not at all." />
          </div>
        </Container>
      </section>

      <section className="bg-paper-2">
        <Container className="py-16 lg:py-24">
          <h2 className="max-w-[20ch] text-2xl font-bold tracking-tight text-ink-900">
            Send us a requirement
          </h2>
          <p className="measure mt-6 text-lg text-ink-500">
            Step one takes a company name, dates, destinations, traveller numbers
            and a brief. The rest is optional and can follow. If you would rather
            write an email, the{" "}
            <Link href="/contact" className={INLINE_LINK}>
              operations desk
            </Link>{" "}
            reads the same way.
          </p>
          <div className="mt-8">
            <ButtonLink href={RFQ_HREF}>Request a B2B quote</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
