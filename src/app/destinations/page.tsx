import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/Button";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { Section, SectionIntro } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
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
        title="Where we operate"
        standfirst="Each destination gets a page when there is genuine operational content behind it: how it is reached, what constrains it, and what we check before we confirm anything. We do not generate these in bulk."
      />

      <Section tone="paper-2">
        <SectionIntro title="Published destinations">
          <p>Written from how we operate them, not from what they look like.</p>
        </SectionIntro>
        <div className="mt-12">
          <DestinationRail />
        </div>
      </Section>

      <Section>
        <SectionIntro title="Operated, not yet written up">
          <p>
            We work in these already. They do not have pages yet, because a page
            here has to say something an operator cannot get elsewhere, and we
            would rather have six pages worth reading than seventeen worth
            skimming. Ask us about any of them directly in the meantime.
          </p>
        </SectionIntro>
        {/* A ruled register, not links: none of these has a page. */}
        <ul className="mt-12 grid grid-cols-2 border-t border-rule sm:grid-cols-3 sm:gap-x-12 lg:grid-cols-4">
          {PLANNED_DESTINATIONS.map((name) => (
            <li key={name} className="border-b border-rule py-4 text-base text-ink-500">
              {name}
            </li>
          ))}
        </ul>
        <div className="measure mt-8">
          <Evidence note="No destination page on this site carries a distance, drive time or capacity that PM Travel has not measured. Where a figure would normally sit, the page states that verification is in progress instead." />
        </div>
      </Section>

      <FaqSection heading="Questions about planning Morocco" faqs={FAQS} tone="paper-2" />

      <Section>
        <SectionIntro title="Send us the itinerary">
          <p>
            Draft itineraries are welcome, including rough ones. We will tell you
            which sections are comfortable, which are tight, and which we cannot
            yet give you a measured timing for. The measured position on each leg
            is on <TextLink href="/routes">route intelligence</TextLink>.
          </p>
        </SectionIntro>
        <div className="mt-8">
          <ButtonLink href={RFQ_HREF}>Request a B2B quote</ButtonLink>
        </div>
      </Section>
    </>
  );
}
