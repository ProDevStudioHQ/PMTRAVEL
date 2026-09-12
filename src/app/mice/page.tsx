import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { Section, SectionIntro } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { VenueDisclosure } from "@/features/venues/VenueDisclosure";
import { VENUES } from "@/features/venues/data";
import { toPublicVenue } from "@/features/venues/disclosure";
import { RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "Morocco MICE and Events Operations",
  description:
    "Meetings, incentives and events in Morocco, planned on venue data PM Travel has measured on site rather than copied from suppliers.",
  path: "/mice",
});

const HANDLED = [
  {
    title: "Venue sourcing",
    body: "Matched against what we have inspected, with the gaps named rather than filled in.",
  },
  {
    title: "Arrival and transfer logistics",
    body: "Manifests, coach movements and timings built against measured drive data where we have it.",
  },
  {
    title: "Gala and dining",
    body: "Timing, dietary handling and service flow against the rest of the programme.",
  },
  {
    title: "Group movement",
    body: "Coach access, turning space, parking and marshalling.",
  },
  {
    title: "On-site coordination",
    body: "Our people on the ground for the duration, not a phone number.",
  },
  {
    title: "Backup planning",
    body: "A stated fallback for the venue, the weather and the vehicles.",
  },
];

/** Three levels in increasing order of access: a genuine sequence, so it is numbered. */
const DISCLOSURE = [
  {
    title: "Published here",
    body: "Venue type, destination, access, coach considerations, parking, indoor or outdoor, weather risk, the wet-weather plan, transfer logistics, seasonality, and capacity as a band with the inspection date.",
  },
  {
    title: "Shared with you directly",
    body: "The named venue, exact capacity by layout, floor plans, AV detail, breakout rooms, operational notes and the backup venue. Sent when you have a live brief.",
  },
  {
    title: "Kept internal",
    body: "Rates, terms, release periods, allotments, supplier performance, incident history and negotiation notes. These are ours, and publishing them would fund our competitors' content.",
  },
];

const FAQS = [
  {
    question: "What should MICE planners verify before booking a Morocco venue?",
    answer:
      "Capacity in the specific layout you need, coach access and turning space, the wet-weather plan, curfew and noise limits, and what the backup venue is. Capacity in one layout tells you almost nothing about another, and an outdoor Moroccan venue without a stated wet-weather plan is an unpriced risk you are carrying rather than the supplier.",
  },
  {
    question: "Why does this page not name venues?",
    answer:
      "Because named venues with capacities and floor plans are the commercial asset, and publishing them means a competitor has them within the week at no cost. The public level here describes the destination honestly enough for you to decide whether a conversation is worth having. The rest comes to you directly once you have a brief.",
  },
  {
    question: "Where do your capacity figures come from?",
    answer:
      "From our own inspections. Someone from PM Travel stands in the room, measures it, records what limits the capacity — floor area, exits, sightlines or service access — and signs the record. A supplier's stated capacity is recorded as unconfirmed until that happens, because supplier capacities are routinely the theatre-style maximum with no service access.",
  },
  {
    question: "Is Agafay suitable for corporate groups?",
    answer:
      "We are not answering that until we have inspected the sites and can tell you which ones, at what group size, in which months, and with what wet-weather plan. A yes with no numbers behind it is worth nothing to you, and it is what you will get almost everywhere else.",
  },
];

export default function MicePage() {
  // The only path from the venue record to the page. Never spread a
  // VenueRecord into a component.
  const publicVenues = VENUES.map(toPublicVenue).filter((venue) => venue !== null);

  return (
    <>
      {/*
        Hero treatment: a deep band. This page's one red-900 section, running
        straight on from the solid site bar, for the page that sells events.
      */}
      <section className="surface-deep bg-red-900 text-paper">
        <Container className="py-24 lg:py-32">
          <h1 className="max-w-[18ch] text-3xl font-bold tracking-tight lg:text-4xl">
            Events planned on venue data we measured
          </h1>
          <p className="measure mt-6 text-lg text-paper/90">
            Researching venue specifications is the hardest single stage of
            sourcing an event. We are building a venue record from our own
            inspections instead of repeating what supplier websites claim.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={RFQ_HREF} tone="dark">
              Request a B2B quote
            </ButtonLink>
            <ButtonLink href="#venues" variant="secondary" tone="dark">
              Inspected venues
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section>
        <div className="measure flex flex-col gap-6 text-base text-ink-900">
          <p>
            Ask three Morocco suppliers for a capacity and you will get three
            numbers, all of them theatre-style, none of them accounting for the
            service access the caterer needs or the sightline the stage blocks.
            That is not usually dishonesty. It is that nobody measured, and the
            number has been repeated until it became a fact.
          </p>
          <p>
            The consequence lands on you. A venue that holds 300 in a brochure
            and 190 in the layout your client actually asked for is a problem
            discovered late, in a country where your options that week are
            limited and your client is watching.
          </p>
          <p>
            So we are doing the slow version: inspecting venues ourselves,
            measuring capacity layout by layout, recording what limits it, and
            signing the record. It means this page fills up more slowly than a
            competitor&rsquo;s. It also means that when we tell you a number, we
            can tell you who measured it and when.
          </p>
        </div>
      </Section>

      <Section tone="paper-2">
        <SectionIntro title="What we handle" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HANDLED.map((item) => (
            <li key={item.title}>
              <Card title={item.title} className="h-full">
                {item.body}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionIntro title="What we publish, and what we do not">
          <p>
            Being explicit about this is fairer than letting you assume. Three
            levels, and we will tell you which one any answer comes from.
          </p>
        </SectionIntro>
        <ol className="mt-12 grid gap-x-12 border-t border-rule lg:grid-cols-3">
          {DISCLOSURE.map((level, index) => (
            <li key={level.title} className="border-b border-rule py-8 lg:border-b-0">
              <span className="tabular font-display text-2xl font-bold text-ink-500">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink-900">{level.title}</h3>
              <p className="mt-3 text-base text-ink-500">{level.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper-2" id="venues">
        <SectionIntro title="Inspected venues">
          <p>
            The public level, as described above: enough to judge whether a venue
            type suits your brief, without handing our supplier research to the
            next operator who visits this page.
          </p>
        </SectionIntro>
        <div className="mt-12">
          <VenueDisclosure venues={publicVenues} />
        </div>
      </Section>

      <FaqSection heading="What planners ask us" faqs={FAQS} />

      <Section tone="paper-2">
        <SectionIntro title="Send us the brief">
          <p>
            Tell us the group size, the layout you need and the month. We will
            tell you what we have inspected, what we have not, and what we would
            need to go and check. More on the method in{" "}
            <TextLink href="/how-we-work">how we work</TextLink>.
          </p>
        </SectionIntro>
        <div className="mt-8">
          <ButtonLink href={RFQ_HREF}>Request a B2B quote</ButtonLink>
        </div>
        <div className="measure mt-8">
          <Evidence note="No venue capacity, floor plan or availability appears anywhere on this site that PM Travel has not measured on site. Where we have not inspected, we say so." />
        </div>
      </Section>
    </>
  );
}
