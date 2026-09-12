import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { Section, SectionIntro } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
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
const SERVICES = [
  {
    id: "transport",
    title: "Transport and transfers",
    body: "Vehicle class matched to group size and to the specific road, with drivers briefed to the day plan and a stated backup for every movement.",
  },
  {
    id: "airport",
    title: "Airport operations",
    body: "Manifest-led arrivals, flight monitoring, meet and greet, and a clean handover into the programme. Split arrivals are planned as separate movements.",
  },
  {
    id: "accommodation",
    title: "Accommodation",
    body: "Hotel and riad sourcing, rooming lists, check-in coordination, and vehicle access established per address rather than per district.",
  },
  {
    id: "guiding",
    title: "Guiding",
    body: "Licensed guides briefed on your itinerary, your client's history and what to drop if the day runs long — not on a standard tour.",
  },
  {
    id: "dining",
    title: "Dining and events",
    body: "Restaurants, gala dinners and dietary handling, timed against the rest of the day rather than booked in isolation.",
  },
  {
    id: "excursions",
    title: "Excursions and activities",
    body: "Scheduled against real drive times and real daylight. Where we have not measured a leg, we say so rather than guessing.",
  },
  {
    id: "groups",
    title: "Groups, FIT and series",
    body: "One-off groups, repeating series and individual travellers, run under the same operational file and the same standards.",
  },
  {
    id: "white-label",
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
      {/*
        Hero treatment: an index. The headline sits beside a ruled jump list of
        the eight services, because this page is the reference the rest of the
        site links into.
      */}
      <section className="border-b border-rule bg-paper">
        <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <h1 className="max-w-[16ch] text-3xl font-bold tracking-tight text-ink-900 lg:text-4xl">
              What we operate on the ground
            </h1>
            <p className="measure mt-6 text-lg text-ink-500">
              You sell Morocco. We run the ground programme: the vehicles, the
              drivers, the arrivals, the hotels, the guides, and the decisions at
              eleven at night when something has changed.
            </p>
            <div className="mt-8">
              <ButtonLink href={RFQ_HREF}>Request a B2B quote</ButtonLink>
            </div>
          </div>
          <nav aria-labelledby="dmc-index" className="lg:col-span-4 lg:col-start-9">
            <h2 id="dmc-index" className="text-sm font-medium text-ink-500">
              On this page
            </h2>
            <ul className="mt-4 border-t border-rule">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#${service.id}`}
                    className="flex min-h-11 items-center border-b border-rule py-2 text-base text-ink-900 underline-offset-4 transition-colors duration-200 hover:text-red-600 hover:underline"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <Section tone="paper-2">
        <div className="measure flex flex-col gap-6 text-base text-ink-900">
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
            every movement, with{" "}
            <TextLink href="/routes">drive data we measured ourselves</TextLink>{" "}
            or an honest statement that we have not measured it yet, and with a
            quote where every line states whether it is requested, on option,
            held or confirmed. The service list below is real, but it is not the
            argument.
          </p>
        </div>
      </Section>

      <Section>
        <SectionIntro title="What we operate" />
        <ul className="mt-12 grid border-t border-rule md:grid-cols-2 md:gap-x-12">
          {SERVICES.map((service) => (
            <li key={service.id} id={service.id} className="scroll-mt-16 border-b border-rule py-8">
              <h3 className="text-lg font-semibold text-ink-900">{service.title}</h3>
              <p className="mt-3 text-base text-ink-500">{service.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* The page's one deep section: the limits, stated plainly. */}
      <Section tone="deep">
        <SectionIntro title="What we do not claim" onDark>
          <p>
            Being specific about the limits is more useful to you than another
            paragraph about passion for the destination.
          </p>
        </SectionIntro>
        <ul className="mt-12 grid border-t border-paper/15 md:grid-cols-2 md:gap-x-12">
          {LIMITS.map((item) => (
            <li
              key={item}
              className="flex gap-4 border-b border-paper/15 py-5 text-base text-paper"
            >
              <span aria-hidden="true" className="text-paper/60">
                &mdash;
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="measure mt-8">
          <Evidence
            onDark
            note="Capability statements on this page describe what PM Travel operates directly from its Marrakech office. Nothing here carries a figure that has not been measured and logged by us."
          />
        </div>
      </Section>

      <FaqSection heading="What buyers ask first" faqs={FAQS} />

      <Section tone="paper-2">
        <SectionIntro title="Send us a programme">
          <p>
            The quickest way to judge a ground partner is to send a real
            requirement and read what comes back. More on how we handle it in{" "}
            <TextLink href="/how-we-work">how we work</TextLink>, and on trade
            terms in <TextLink href="/b2b">for travel trade</TextLink>.
          </p>
        </SectionIntro>
        <div className="mt-8">
          <ButtonLink href={RFQ_HREF}>Request a B2B quote</ButtonLink>
        </div>
      </Section>

      <script
        type="application/ld+json"
        // Static, developer-authored. No price, offer or rating is asserted.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
