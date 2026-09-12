import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/Button";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { PLANNED_DESTINATIONS } from "@/features/destinations/registry";
import { DestinationRail } from "@/features/images/DestinationRail";
import { RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "Morocco Destinations We Operate",
  description:
    "The Moroccan destinations PM Travel operates from Marrakech, described in operational terms: access, timing, vehicles and what we verify.",
  path: "/destinations",
});

const FAQS = [
  {
    question: "How many days are needed for Morocco's main cities?",
    answer:
      "More than most itineraries allow, and the shortfall is almost always in the last city on the list. The useful way to check is to count usable hours rather than nights: a late arrival after a long crossing and an early departure the next morning is one compressed day, not two. Send us a draft itinerary and we will tell you where it is over-committed.",
  },
  {
    question: "How many days for a first Morocco itinerary?",
    answer:
      "Fewer places than the client will want. A first visit that takes in Marrakech properly, one contrasting destination and one long journey tends to be remembered better than one that covers twice as much ground at speed. The long southern legs are where itineraries most often break.",
  },
  {
    question: "Are Imperial Cities and Sahara destinations?",
    answer:
      "No. They are itinerary groupings, useful for selling and not for operating. What we plan against is a specific place, a specific road and a specific night's accommodation, which is why each destination here gets its own page rather than being folded into a region.",
  },
];

export default function DestinationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Destinations"
        title="Where we operate"
        standfirst="Each destination gets a page when there is genuine operational content behind it: how it is reached, what constrains it, and what we check before we confirm anything. We do not generate these in bulk."
      />

      <Container as="section" className="py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Published destinations
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Written from how we operate them, not from what they look like.
        </p>
        <div className="mt-10">
          <DestinationRail />
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Operated, not yet written up
        </h2>
        <p className="measure mt-4 text-base text-meta">
          We work in these already. They do not have pages yet, because a page
          here has to say something an operator cannot get elsewhere, and we
          would rather have six pages worth reading than seventeen worth
          skimming. Ask us about any of them directly in the meantime.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {PLANNED_DESTINATIONS.map((name) => (
            <li
              key={name}
              className="rounded-[var(--radius-data)] border border-line-soft px-3 py-2 text-sm text-meta"
            >
              {name}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Evidence note="No destination page on this site carries a distance, drive time or capacity that PM Travel has not measured. Where a figure would normally sit, the page states that verification is in progress instead." />
        </div>
      </Container>

      <FaqSection heading="Questions about planning Morocco" faqs={FAQS} />

      <Container as="section" className="py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Send us the itinerary
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Draft itineraries are welcome, including rough ones. We will tell you
          which sections are comfortable, which are tight, and which we cannot
          yet give you a measured timing for. The measured position on each leg
          is on{" "}
          <Link href="/routes" className="text-petrol underline">
            route intelligence
          </Link>
          .
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
