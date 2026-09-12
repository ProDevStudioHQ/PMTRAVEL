import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
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
      <PageIntro
        eyebrow="MICE and events"
        title="Events planned on venue data we measured"
        standfirst="Researching venue specifications is the hardest single stage of sourcing an event. We are building a venue record from our own inspections instead of repeating what supplier websites claim."
      />

      <Container as="section" className="py-16 lg:py-24">
        <div className="measure flex flex-col gap-6 text-base text-meta">
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
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          What we handle
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Venue sourcing">
            Matched against what we have inspected, with the gaps named rather
            than filled in.
          </Card>
          <Card title="Arrival and transfer logistics">
            Manifests, coach movements and timings built against measured drive
            data where we have it.
          </Card>
          <Card title="Gala and dining">
            Timing, dietary handling and service flow against the rest of the
            programme.
          </Card>
          <Card title="Group movement">
            Coach access, turning space, parking and marshalling.
          </Card>
          <Card title="On-site coordination">
            Our people on the ground for the duration, not a phone number.
          </Card>
          <Card title="Backup planning">
            A stated fallback for the venue, the weather and the vehicles.
          </Card>
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          What we publish, and what we do not
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Being explicit about this is fairer than letting you assume. Three
          levels, and we will tell you which one any answer comes from.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {DISCLOSURE.map((level) => (
            <Card key={level.title} title={level.title}>
              {level.body}
            </Card>
          ))}
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Inspected venues
        </h2>
        <p className="measure mt-4 text-base text-meta">
          The public level, as described above: enough to judge whether a venue
          type suits your brief, without handing our supplier research to the
          next operator who visits this page.
        </p>
        <div className="mt-10">
          <VenueDisclosure venues={publicVenues} />
        </div>
      </Container>

      <FaqSection heading="What planners ask us" faqs={FAQS} />

      <Container as="section" className="py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Send us the brief
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Tell us the group size, the layout you need and the month. We will
          tell you what we have inspected, what we have not, and what we would
          need to go and check. More on the method in{" "}
          <Link href="/how-we-work" className="text-petrol underline">
            how we work
          </Link>
          .
        </p>
        <div className="mt-8">
          <ButtonLink href={RFQ_HREF} variant="accent">
            Request a B2B quote
          </ButtonLink>
        </div>
        <div className="mt-8">
          <Evidence note="No venue capacity, floor plan or availability appears anywhere on this site that PM Travel has not measured on site. Where we have not inspected, we say so." />
        </div>
      </Container>
    </>
  );
}
