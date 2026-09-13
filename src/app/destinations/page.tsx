import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { Section, SectionIntro } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { PLANNED_DESTINATIONS } from "@/features/destinations/registry";
import { DestinationRail } from "@/features/images/DestinationRail";
import { DESTINATIONS_HUB_HERO } from "@/features/images/keys";
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

const pill =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-colors duration-200";

export default function DestinationsPage() {
  return (
    <>
      <DestinationHero
        title="Where we operate"
        standfirst="Each destination gets a page when there is genuine operational content behind it: how it is reached, what constrains it, and what we check before we confirm anything. We do not generate these in bulk."
        imageKey={DESTINATIONS_HUB_HERO}
        trail={[{ href: "/destinations", label: "Destinations" }]}
        kicker="Operated from Marrakech"
      >
        <a href="#published" className={`${pill} bg-paper text-red-900 hover:bg-red-050`}>
          Explore destinations
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </a>
        <Link href={RFQ_HREF} className={`${pill} border border-paper/60 text-paper hover:bg-paper hover:text-ink-900`}>
          Request a B2B quote
        </Link>
      </DestinationHero>

      <Section tone="paper-2" id="published">
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
        {/* Chips, not links: none of these has a page. */}
        <ul className="mt-10 flex flex-wrap gap-3">
          {PLANNED_DESTINATIONS.map((name) => (
            <li
              key={name}
              className="inline-flex items-center gap-2 rounded-full border border-rule bg-paper-2 px-4 py-2 text-sm text-ink-900"
            >
              <Clock aria-hidden="true" size={14} strokeWidth={1.75} className="text-ink-500" />
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
        <div className="surface-deep rounded-3xl bg-red-900 px-6 py-12 text-paper sm:px-12 lg:py-16">
          <h2 className="max-w-[24ch] text-2xl font-bold tracking-tight text-paper">Send us the itinerary</h2>
          <p className="measure mt-5 text-lg text-paper/90">
            Draft itineraries are welcome, including rough ones. We will tell you
            which sections are comfortable, which are tight, and which we cannot
            yet give you a measured timing for.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={RFQ_HREF} className={`${pill} bg-paper text-red-900 hover:bg-red-050`}>
              Request a B2B quote
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
            </Link>
            <Link href="/routes" className={`${pill} border border-paper/60 text-paper hover:bg-paper hover:text-ink-900`}>
              Route intelligence
            </Link>
          </div>
        </div>
        <p className="measure mt-6 text-base text-ink-500">
          The measured position on each leg is on{" "}
          <TextLink href="/routes">route intelligence</TextLink>.
        </p>
      </Section>
    </>
  );
}
