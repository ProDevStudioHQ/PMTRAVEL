import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { RouteStatus } from "@/features/destinations/RouteStatus";
import { RFQ_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Agafay Ground Operations and Events",
  description:
    "Operating Agafay from Marrakech: transfer waves, coach limits, wind and wet-weather planning, and what to verify before booking a camp.",
  alternates: { canonical: "/destinations/agafay" },
};

const FAQS = [
  {
    question: "How far is Agafay from Marrakech?",
    answer:
      "We have not published that figure because we have not finished measuring it. Agafay is one of the nine routes we are logging, and the distance and drive time will appear here and on route intelligence together, with the number of logged runs behind them. Anyone can give you a mapping estimate; the reason to ask us is that our number will be one we drove.",
  },
  {
    question: "Is Agafay suitable for corporate groups?",
    answer:
      "It depends on three things we would need to check for your specific group: the transfer arrangement at the size you are running, the wet-weather and wind plan at the site in question, and the month. We are inspecting Agafay sites now and will answer with capacities by layout and an inspection date. A yes without those is worth nothing to you.",
  },
  {
    question: "What is the biggest operational risk at Agafay?",
    answer:
      "Weather, and specifically the difference between a site that has a wet-weather plan and one that says it has a wet-weather plan. An outdoor dinner with no covered fallback is an unpriced risk that you are carrying, not the supplier. We ask what the fallback is, where it is, and how many it actually holds.",
  },
  {
    question: "Can coaches reach the camps?",
    answer:
      "That varies by site and is one of the things our inspections record, because the answer determines whether your group arrives in one movement or several. Where a coach cannot complete the journey, the transfer becomes waves of smaller vehicles, which changes both the timing of the evening and its cost.",
  },
];

export default function AgafayPage() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { href: "/destinations", label: "Destinations" },
          { href: "/destinations/agafay", label: "Agafay" },
        ]}
      />
      <PageIntro
        eyebrow="Destination"
        title="Agafay"
        standfirst="Close enough to Marrakech to work as an evening, which is exactly why it gets sold without being planned. Three things decide whether it works."
      />

      <Container as="section" className="py-16 lg:py-24">
        <div className="measure flex flex-col gap-6 text-base text-meta">
          <p>
            Agafay has become the standard answer when a Marrakech programme
            needs a desert evening without the drive south. That popularity is
            deserved and it is also the problem: it is sold as a simple add-on,
            and operationally it is not one.
          </p>
          <p>
            The first thing that decides the evening is the transfer. Whether
            your group arrives in a single movement or in waves of smaller
            vehicles is a site-specific question, and it is not a detail. Waves
            change the shape of the evening — the first arrivals wait, the last
            arrivals miss the light, and dinner either starts late or starts
            twice. We establish the arrangement before the programme is
            confirmed and build the timings around it, rather than discovering
            it on the night.
          </p>
          <p>
            The second is weather, and it is more than rain. Wind is the
            condition that most often ruins an Agafay evening, and it affects
            outdoor dining, lighting, sound and anything freestanding. The
            question we ask a site is not whether it has a wet-weather plan but
            where the covered space is, how many it actually holds, and how long
            the changeover takes. A plan that exists on paper and holds half the
            group is not a plan.
          </p>
          <p>
            The third is the month. Agafay in the shoulder seasons and Agafay in
            high summer are different products, and the sensible answer for a
            given group changes with it. We would rather tell you the month is
            wrong for what you have sold than operate it and let your client
            discover why.
          </p>
          <p>
            We are inspecting Agafay sites now. Until that is done we will not
            publish capacities, and we will not repeat the ones the camps
            publish themselves — those are routinely the maximum in the most
            generous layout, with no allowance for service access or the space a
            band takes.
          </p>
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          The leg from Marrakech
        </h2>
        <div className="mt-8 max-w-2xl">
          <RouteStatus slug="marrakech-agafay" />
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          What we operate here
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Transfers and waves">
            Vehicle mix matched to the site&rsquo;s actual access, with the
            evening timed around the arrival pattern.
          </Card>
          <Card title="Dinners and gala evenings">
            Service flow, dietary handling and a stated fallback if the weather
            turns.
          </Card>
          <Card title="Incentive activities">
            Scheduled against daylight and wind rather than against a brochure
            running order.
          </Card>
          <Card title="Return movements">
            The part most often under-planned. Late departures in waves need as
            much thought as arrivals.
          </Card>
          <Card title="Site selection">
            Matched to group size, layout and month, from sites we have
            inspected rather than sites we have been sent photographs of.
          </Card>
          <Card title="Backup planning">
            A named fallback for the venue, the weather and the vehicles.
          </Card>
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          What we verify before recommending a site
        </h2>
        <ul className="measure mt-8 flex flex-col gap-3">
          {[
            "Whether a coach can complete the journey, or where it stops",
            "How many vehicles the transfer actually needs at your group size",
            "The covered space: where it is, and how many it holds measured",
            "Wind exposure and what it affects at that specific site",
            "Service access for catering, and what it takes out of the capacity",
            "Curfew, noise limits and any permit the evening depends on",
          ].map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-[var(--radius-data)] border border-line-soft px-4 py-3 text-sm text-ink"
            >
              <span aria-hidden="true" className="text-meta">
                &mdash;
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Evidence note="No Agafay distance, drive time or camp capacity appears on this page, because none has been measured and logged by PM Travel yet. Inspections and route logging are under way, and the figures will be published with their dates when they exist." />
        </div>
      </Container>

      <FaqSection heading="What operators ask about Agafay" faqs={FAQS} />

      <Container as="section" className="py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Planning an Agafay evening
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Tell us the group size, the month and what the evening has to achieve.
          We will tell you what we have inspected, what we have not, and what we
          would go and check before recommending anything. The measured position
          on every leg is on{" "}
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
