import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
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

/**
 * Each capability card carries its own tone: the number, the link, the top
 * tab and the hover fill. Every tone was measured before use - chalk text on
 * it, hamada body text on it, and the tone itself on chalk all clear 4.5:1.
 * No gold (forbidden); ochre is kept dark and brown for that reason.
 *
 * The tone is a Tailwind arbitrary-property class that sets --tone, not a
 * style attribute (verify:data forbids hand-written styles). The full class
 * string must appear literally here so Tailwind generates it.
 */
const CAPABILITIES = [
  {
    title: "Transport and transfers",
    body: "Vehicle class matched to group size and route, drivers briefed to the day plan, and a stated backup for every movement.",
    href: "/morocco-dmc",
    tone: "[--tone:#8c1c2c]", // garnet red - chalk 8.02, hamada 6.19
  },
  {
    title: "Airport operations",
    body: "Arrival manifests, flight monitoring, meet and greet, and a clean handover into the ground programme.",
    href: "/morocco-dmc",
    tone: "[--tone:#9a3b1b]", // terracotta - chalk 6.17, hamada 4.76
  },
  {
    title: "Hotels and riads",
    body: "Sourcing, rooming lists and check-in coordination across Marrakech and the wider circuit.",
    href: "/morocco-dmc",
    tone: "[--tone:#7a5212]", // ochre - chalk 6.11, hamada 4.71
  },
  {
    title: "Guiding",
    body: "Licensed guides briefed to your itinerary, working in the languages we actually operate in.",
    href: "/morocco-dmc",
    tone: "[--tone:#4f5b1e]", // olive - chalk 6.53, hamada 5.04
  },
  {
    title: "Dining and gala",
    body: "Restaurant and gala coordination, including dietary handling and timing against the rest of the day.",
    href: "/mice",
    tone: "[--tone:#0f5c5c]", // teal - chalk 6.87, hamada 5.30
  },
  {
    title: "Activities and experiences",
    body: "Excursions scheduled against real drive times and real daylight, not brochure timings.",
    href: "/destinations",
    tone: "[--tone:#1f4e8c]", // blue - chalk 7.36, hamada 5.68
  },
  {
    title: "Groups and FIT",
    body: "Series groups, one-off groups and individual travellers, run under the same operational file.",
    href: "/b2b",
    tone: "[--tone:#5e2a5e]", // plum - chalk 9.44, hamada 7.28
  },
  {
    title: "MICE and events",
    body: "Meetings, incentives and events, built on venue data we have inspected rather than repeated.",
    href: "/mice",
    tone: "[--tone:#2f2d2a]", // charcoal - chalk 12.15, hamada 9.37
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

      <Container as="section" className="py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            {/* oxide on chalk: 5.80:1 */}
            <p className="flex items-center gap-3 text-2xs font-medium uppercase tracking-[0.28em] text-oxide">
              <span aria-hidden="true" className="h-px w-10 bg-oxide" />
              Ground operations
            </p>
            <h2 className="mt-5 text-2xl font-medium leading-[1.08] tracking-[-0.02em] text-ink lg:text-3xl">
              What we can operate for your clients
            </h2>
          </div>
          <p className="text-base text-meta lg:col-span-5">
            Everything below runs out of our office in Gueliz, Marrakech. You keep
            the client, the brand and the margin; we run what happens after the
            aircraft doors open.
          </p>
        </div>

        {/*
          Hairline grid: 1px gaps over a line-soft ground. Each card sets
          --tone (see CAPABILITIES). At rest the tone shows as a short tab
          across the top, the number and the link; on hover or focus the tab
          sweeps full width, the card fills with its tone and the text turns
          chalk and hamada - state changes only.
        */}
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((capability, index) => (
            <li key={capability.title} className={`pm-rise bg-chalk ${capability.tone}`}>
              <Link
                href={capability.href}
                className="group relative flex h-full flex-col p-7 transition-colors duration-300 hover:bg-[var(--tone)] focus-visible:bg-[var(--tone)] focus-visible:outline-offset-[-4px] lg:min-h-[19rem]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.22] bg-[var(--tone)] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="tabular text-2xs font-semibold tracking-[0.2em] text-[var(--tone)] transition-colors duration-300 group-hover:text-hamada group-focus-visible:text-hamada">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-base font-semibold leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-chalk group-focus-visible:text-chalk">
                  {capability.title}
                </h3>
                <p className="mt-3 text-xs text-meta transition-colors duration-300 group-hover:text-hamada group-focus-visible:text-hamada">
                  {capability.body}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-2xs font-semibold uppercase tracking-[0.16em] text-[var(--tone)] transition-colors duration-300 group-hover:text-chalk group-focus-visible:text-chalk">
                  Learn more
                  <svg
                    viewBox="0 0 16 10"
                    aria-hidden="true"
                    className="h-2.5 w-4 transition-transform duration-300 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
                  >
                    <path d="M0 5h14M10 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
