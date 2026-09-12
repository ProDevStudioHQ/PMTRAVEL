import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { PageIntro } from "@/components/PageIntro";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "Marrakech Ground Operations",
  description:
    "Marrakech ground handling for travel trade: arrivals, riad access, medina logistics, guiding and group movement, run from our Gueliz office.",
  path: "/destinations/marrakech",
});

const FAQS = [
  {
    question: "What is the hardest part of operating Marrakech?",
    answer:
      "Getting people and luggage to the door of the property they booked. Vehicle access varies address by address inside the medina, and it is not something you can infer from a hotel's own description or a map pin. We check it per property before we confirm a transfer, because the alternative is a group standing in a derb at midnight with suitcases.",
  },
  {
    question: "Do you handle airport arrivals?",
    answer:
      "Yes. We work from the arrival manifest rather than the rooming list, monitor flights, and brief drivers on who is on which vehicle before the day starts. Split arrivals across a morning are normal for group programmes and are planned as separate movements, not as one pickup that waits.",
  },
  {
    question: "Can you operate under our brand in Marrakech?",
    answer:
      "Yes. Meet boards, vehicles and briefings carry your name, and our staff introduce themselves on your behalf. The client relationship stays yours, including at the arrivals hall where ground operators most often introduce themselves instead.",
  },
];

export default function MarrakechPage() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { href: "/destinations", label: "Destinations" },
          { href: "/destinations/marrakech", label: "Marrakech" },
        ]}
      />
      <PageIntro
        title="Marrakech"
        standfirst="Our base. Most programmes we run start and end here, and most of what decides whether they run well is settled before anyone reaches a hotel."
      />

      <Section tone="paper-2">
        <div className="measure flex flex-col gap-6 text-base text-ink-900">
          <p>
            Marrakech is the easiest Moroccan city to sell and one of the more
            deceptive ones to operate. The selling points are obvious and the
            operational problems are invisible from abroad, which is a
            combination that produces confident itineraries that do not survive
            contact with the ground.
          </p>
          <p>
            The single most common failure is access. A riad address in the
            medina and a hotel address in Gueliz are not the same kind of
            logistical object, and the difference does not show up in a booking
            confirmation. Some medina addresses take a vehicle to the door;
            some take a vehicle to a point and then a porter; some take a
            different vehicle entirely. We establish which, per property, before
            we confirm a transfer — because the version where you find out on
            arrival involves a group, luggage, and a narrow street after dark.
          </p>
          <p>
            The second is timing. Marrakech absorbs a lot of movement, and the
            same transfer does not take the same time at every hour of every
            day. We plan around the departure time rather than an average, and
            where we have not yet measured a leg ourselves we tell you that
            rather than handing you a number we took from a mapping service.
          </p>
          <p>
            The third is the gap between a guide being licensed and a guide
            being briefed. A licensed guide knows the city. A briefed guide
            knows that your client is a repeat traveller who has seen the
            tanneries, that the group has two people who cannot manage steps,
            and that dinner has been moved forward an hour. We brief to the
            itinerary you sold, not to a standard tour.
          </p>
          <p>
            Our office is in Gueliz, which matters more than it sounds. When a
            vehicle fails or a property turns out to be unreachable, the useful
            question is how quickly someone can physically be there. We are not
            coordinating Marrakech from another city or another country.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="max-w-[24ch] text-2xl font-bold tracking-tight text-ink-900">
          What we operate here
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Airport arrivals and departures">
            Manifest-led, with flight monitoring and split-arrival planning
            rather than one pickup that waits.
          </Card>
          <Card title="Riad and hotel transfers">
            Access checked per property, with the last-stretch arrangement
            agreed before the transfer is confirmed.
          </Card>
          <Card title="Guiding">
            Licensed guides briefed to your itinerary and your client&rsquo;s
            history, in the languages we operate in.
          </Card>
          <Card title="Dining and gala">
            Restaurant and gala coordination, timed against the rest of the day
            rather than in isolation.
          </Card>
          <Card title="Group movement">
            Coach access, marshalling points and walking stretches planned as
            part of the day, not discovered during it.
          </Card>
          <Card title="Excursion staging">
            Marrakech as the base for Agafay, the Atlas, Essaouira and the
            longer southern routes.
          </Card>
        </div>
      </Section>

      <Section tone="paper-2">
        <h2 className="max-w-[24ch] text-2xl font-bold tracking-tight text-ink-900">
          What we check before confirming
        </h2>
        <ul className="measure mt-8 border-t border-rule">
          {[
            "Vehicle access to the specific property address, not the district",
            "Where luggage is handed over, and who carries it from there",
            "Arrival spread across the day, and how many separate movements it implies",
            "Walking stretches in the programme, against the mobility of the group",
            "Departure timing for each transfer, not an average for the city",
            "Guide briefing against the itinerary you sold, including what to skip",
          ].map((item) => (
            <li
              key={item}
              className="flex gap-4 border-b border-rule py-4 text-base text-ink-900"
            >
              <span aria-hidden="true" className="text-ink-500">
                &mdash;
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="measure mt-8">
          <Evidence note="This page describes how we operate Marrakech. It carries no distances, drive times or capacities, because none has been measured and logged by us yet. Legs we have driven appear on route intelligence with the date and the number of runs behind them." />
        </div>
      </Section>

      <FaqSection heading="What operators ask about Marrakech" faqs={FAQS} />

      <Section tone="paper-2">
        <h2 className="max-w-[24ch] text-2xl font-bold tracking-tight text-ink-900">
          Send us a Marrakech programme
        </h2>
        <p className="measure mt-6 text-lg text-ink-500">
          Send the itinerary and the property list. We will tell you which
          addresses are straightforward, which need a different arrangement, and
          where the day is tighter than it looks. Other destinations are on the{" "}
          <TextLink href="/destinations">
            destination hub
          </TextLink>
          .
        </p>
        <div className="measure mt-8">
          <ButtonLink href={RFQ_HREF}>
            Request a B2B quote
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
