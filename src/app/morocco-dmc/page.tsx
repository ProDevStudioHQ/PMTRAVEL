import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Bus,
  CircleX,
  Map as MapIcon,
  PlaneLanding,
  Tag,
  UserRound,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { CtaBanner, IconCards, PILL, ProseCard, SectionHeading, type IconItem } from "@/components/Modern";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { COMPANY, RFQ_HREF, SITE_URL } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "Morocco DMC and Ground Handling",
  description:
    "What a Morocco DMC does, what ground handling includes, and what PM Travel operates for tour operators and agencies from Marrakech.",
  path: "/morocco-dmc",
});

/**
 * Service schema. Only the services we actually operate, with no price, no
 * offer and no rating - none of which we could back.
 */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Destination management and ground handling",
  provider: {
    "@type": "TravelAgency",
    name: COMPANY.name,
    url: SITE_URL,
  },
  areaServed: { "@type": "Country", name: "Morocco" },
  audience: {
    "@type": "BusinessAudience",
    name: "Tour operators, travel agencies and destination specialists",
  },
  availableLanguage: [...COMPANY.languages],
};

const FAQS = [
  {
    question: "What does a Morocco DMC do?",
    answer:
      "A DMC — a destination management company — is the operator on the ground in the destination, working for the company that sold the trip rather than for the traveller. In Morocco that means arranging and running transport, airport handling, accommodation bookings, guides, meals, activities and events, and making the decisions when something changes mid-programme. The selling agency keeps the client relationship; the DMC makes the itinerary happen.",
  },
  {
    question: "What does Morocco ground handling include?",
    answer:
      "Everything between arrival and departure: meeting flights, moving people and luggage, hotel and riad check-ins, guides, dining, excursions, and the coordination that holds it together when a flight is late or a vehicle fails. Ground handling is often described as a list of services, but the part that matters is the coordination — any supplier can send a vehicle, and the difference shows on the day something goes wrong.",
  },
  {
    question: "What is the difference between a DMC and a travel agency?",
    answer:
      "A travel agency sells to travellers; a DMC operates for the trade in one destination. The agency owns the client, the marketing and the margin, and carries the commercial risk of the sale. The DMC owns the local suppliers, the operational knowledge and the execution, and carries the risk of the programme running badly. The two are not competitors, and a DMC that starts selling direct to your clients has stopped being one.",
  },
  {
    question: "Do you work with suppliers or own the vehicles?",
    answer:
      "We work with suppliers, and we would rather say so than imply a fleet we do not have. What we take responsibility for is which supplier is used, how they are briefed, and what happens when they fail — including a stated backup for every movement. Ownership claims are common in this market and are worth checking whoever you are talking to.",
  },
];

/**
 * Each service is its own anchor, so the home page's operations cards land on
 * the service they name instead of the top of this page.
 */
const SERVICES: IconItem[] = [
  {
    id: "transport",
    icon: Bus,
    title: "Transport and transfers",
    body: "Vehicle class matched to group size and to the specific road, with drivers briefed to the day plan and a stated backup for every movement.",
  },
  {
    id: "airport",
    icon: PlaneLanding,
    title: "Airport operations",
    body: "Manifest-led arrivals, flight monitoring, meet and greet, and a clean handover into the programme. Split arrivals are planned as separate movements.",
  },
  {
    id: "accommodation",
    icon: BedDouble,
    title: "Accommodation",
    body: "Hotel and riad sourcing, rooming lists, check-in coordination, and vehicle access established per address rather than per district.",
  },
  {
    id: "guiding",
    icon: UserRound,
    title: "Guiding",
    body: "Licensed guides briefed on your itinerary, your client's history and what to drop if the day runs long — not on a standard tour.",
  },
  {
    id: "dining",
    icon: UtensilsCrossed,
    title: "Dining and events",
    body: "Restaurants, gala dinners and dietary handling, timed against the rest of the day rather than booked in isolation.",
  },
  {
    id: "excursions",
    icon: MapIcon,
    title: "Excursions and activities",
    body: "Scheduled against real drive times and real daylight. Where we have not measured a leg, we say so rather than guessing.",
  },
  {
    id: "groups",
    icon: Users,
    title: "Groups, FIT and series",
    body: "One-off groups, repeating series and individual travellers, run under the same operational file and the same standards.",
  },
  {
    id: "white-label",
    icon: Tag,
    title: "White-label execution",
    body: "Meet boards, vehicles and briefings carry your brand. Our staff introduce themselves on your behalf, including at the arrivals hall.",
  },
];

const LIMITS = [
  "We do not own a fleet. We select, brief and take responsibility for suppliers.",
  "We do not operate in German. Five working languages, and that is not one of them.",
  "We do not publish drive times we have not driven, including on routes everybody quotes.",
  "We do not publish venue capacities we have not measured, including ones suppliers publish themselves.",
  "We do not have published response-time figures yet, because we have not measured our own.",
];

export default function MoroccoDmcPage() {
  return (
    <>
      <DestinationHero
        title="What we operate on the ground"
        standfirst="You sell Morocco. We run the ground programme: the vehicles, the drivers, the arrivals, the hotels, the guides, and the decisions at eleven at night when something has changed."
        imageKey="b4-atlas-imlil"
        kicker="Morocco DMC"
        trail={[{ href: "/morocco-dmc", label: "Morocco DMC" }]}
        stats={[
          { value: String(SERVICES.length), label: "Core services" },
          { value: String(COMPANY.languages.length), label: "Working languages" },
        ]}
      >
        <Link href={RFQ_HREF} className={PILL.onDarkSolid}>
          Request a B2B quote
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </Link>
        <a href="#services" className={PILL.onDarkOutline}>
          What we operate
        </a>
      </DestinationHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <div className="self-start lg:sticky lg:top-24">
            <SectionHeading eyebrow="The real question" title="A service list is not the argument">
              <p>What separates operators is what happens in the gaps.</p>
            </SectionHeading>
            <nav aria-labelledby="dmc-index" className="mt-8">
              <h2 id="dmc-index" className="text-sm font-semibold text-ink-900">
                Jump to a service
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <a
                      href={`#${service.id}`}
                      className="inline-flex min-h-10 items-center rounded-full border border-rule bg-paper-2 px-4 text-sm text-ink-900 transition-colors duration-200 hover:border-red-600 hover:text-red-600"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <ProseCard>
            <p>
              Most DMC pages are a list of services, and the list is always the
              same, because every operator in the market offers the same things.
              Transport, guides, hotels, excursions. The list tells you almost
              nothing about whether a programme will run well.
            </p>
            <p>
              What separates operators is what happens in the gaps. A flight lands
              late and the restaurant is holding a table for forty. A vehicle
              fails on a mountain road. A property turns out to be unreachable by
              the vehicle you sent. A guide takes a route half the group cannot
              follow. None of those appear on a service list, and all of them are
              the reason you are choosing a ground partner rather than booking
              suppliers yourself.
            </p>
            <p>
              So the useful questions are different ones. Who decides, and how
              fast? What is the backup, specifically, and has anyone confirmed it
              exists? Is the drive time in the itinerary something someone
              measured, or something everyone repeats? When a service is on the
              quote, is it confirmed or merely requested — and does the quote make
              that distinction at all?
            </p>
            <p>
              We answer those in the same way each time: with a named backup for
              every movement, with drive data we measured ourselves
              or an honest statement that we have not measured it yet, and with a
              quote where every line states whether it is requested, on option,
              held or confirmed. The service list below is real, but it is not the
              argument.
            </p>
          </ProseCard>
        </div>
      </Section>

      <Section tone="paper-2" id="services">
        <SectionHeading eyebrow="What we operate" title="Eight services, one operational file" />
        <div className="mt-12">
          <IconCards items={SERVICES} columns={4} />
        </div>
      </Section>

      {/* The page's one deep section: the limits, stated plainly. */}
      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <SectionHeading eyebrow="Honest limits" title="What we do not claim" onDark>
            <p>
              Being specific about the limits is more useful to you than another
              paragraph about passion for the destination.
            </p>
          </SectionHeading>
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {LIMITS.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-paper/15 bg-paper/[0.06] p-5 text-base text-paper"
                >
                  <CircleX aria-hidden="true" size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-paper/70" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Evidence
                onDark
                note="Capability statements on this page describe what PM Travel operates directly from its Marrakech office. Nothing here carries a figure that has not been measured and logged by us."
              />
            </div>
          </div>
        </div>
      </Section>

      <FaqSection heading="What buyers ask first" faqs={FAQS} />

      <Section tone="paper-2">
        <CtaBanner
          title="Send us a programme"
          imageKey="b1-marrakech-hero"
          primary={{ href: RFQ_HREF, label: "Request a B2B quote" }}
          secondary={{ href: "/how-we-work", label: "How we work" }}
        >
          <p>
            The quickest way to judge a ground partner is to send a real
            requirement and read what comes back. Trade terms are on{" "}
            <TextLink href="/b2b" onDark>
              for travel trade
            </TextLink>
            .
          </p>
        </CtaBanner>
      </Section>

      <script
        type="application/ld+json"
        // Static, developer-authored. No price, offer or rating is asserted.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
