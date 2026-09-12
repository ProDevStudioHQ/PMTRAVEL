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
  title: "Essaouira Ground Operations",
  description:
    "Operating Essaouira from Marrakech: coach parking and drop-off, medina access on foot, wind, and whether a day trip is the right call.",
  alternates: { canonical: "/destinations/essaouira" },
};

const FAQS = [
  {
    question: "Is Essaouira worth doing as a day trip?",
    answer:
      "Often yes, and sometimes it is the wrong call — a day trip spends a large share of the day on the road, and for a group that has already had two early starts it can be the point at which the week stops being enjoyable. We will tell you when an overnight serves your client better, even though the day trip is the easier thing to operate.",
  },
  {
    question: "What is the operational constraint at Essaouira?",
    answer:
      "Not the driving. It is where the coach stops, how far the group then walks, and whether that walk works for everyone in it. The driving part of an Essaouira day is the straightforward part, which is why itineraries that only account for driving run into trouble at the destination.",
  },
  {
    question: "Does the wind affect programmes there?",
    answer:
      "It affects anything outdoors — seated lunches, staged activities, anything freestanding. It is a coastal town and the wind is a normal condition rather than an exception, so an outdoor element needs an indoor version rather than optimism. We plan the alternative at the same time as the main arrangement.",
  },
];

export default function EssaouiraPage() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { href: "/destinations", label: "Destinations" },
          { href: "/destinations/essaouira", label: "Essaouira" },
        ]}
      />
      <PageIntro
        eyebrow="Destination"
        title="Essaouira"
        standfirst="The most commonly sold single day out of Marrakech. The driving is the easy part, which is exactly why it catches people out."
      />

      <Container as="section" className="py-16 lg:py-24">
        <div className="measure flex flex-col gap-6 text-base text-meta">
          <p>
            Essaouira is usually the first day trip an operator adds to a
            Marrakech week, and for good reason: it changes the register of the
            programme completely, from inland city to Atlantic coast. It is also
            the day where the itinerary most often accounts for the road and
            nothing else.
          </p>
          <p>
            The operational questions are all at the destination. Where does the
            coach actually stop, how far is the group from there to where the
            day begins, and does that walk work for everyone on the vehicle? A
            group that includes people who cannot manage an extended walk on
            uneven ground has a different version of this day, and the time to
            establish that is when the programme is built rather than when
            forty people are standing beside a coach.
          </p>
          <p>
            Timing is the second thing. A day trip that leaves late arrives with
            less usable time than the itinerary suggests, and the return is
            rarely planned with the same care as the outward leg. We plan the
            return as its own movement, with a departure time that reflects what
            the group will actually be doing rather than an optimistic pickup.
          </p>
          <p>
            Then there is wind. It is a coastal town; wind is the normal
            condition rather than the exception, and it is the thing that undoes
            outdoor arrangements. A seated lunch outdoors, a staged activity on
            the beach, anything freestanding — each needs an indoor version
            planned at the same time, not improvised when the day arrives.
          </p>
          <p>
            Finally, the honest question of whether the day belongs in the
            programme at all. A day trip here costs a meaningful share of the
            day in transit, and for a group that has already had two early
            starts it can be the point where a good week becomes a tiring one.
            An overnight changes the whole character of the visit. We will say
            so when we think it is the better answer for your client, even
            though the day trip is the simpler thing for us to operate.
          </p>
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          The leg from Marrakech
        </h2>
        <div className="mt-8 max-w-2xl">
          <RouteStatus slug="marrakech-essaouira" />
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          What we operate here
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Day trips from Marrakech">
            Planned as two movements plus a destination, with the return timed
            deliberately.
          </Card>
          <Card title="Overnight programmes">
            Where the extra night serves the client better than the round trip.
          </Card>
          <Card title="Coach drop-off and marshalling">
            Where the vehicle stops, where it waits, and where it collects.
          </Card>
          <Card title="Guiding">
            Guides briefed on the walking involved and on what to drop if the
            group is slower than expected.
          </Card>
          <Card title="Dining">
            Arrangements with an indoor version planned alongside the outdoor
            one.
          </Card>
          <Card title="Group access planning">
            The walking stretch established against the mobility of the actual
            group.
          </Card>
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          What we establish before confirming a day
        </h2>
        <ul className="measure mt-8 flex flex-col gap-3">
          {[
            "Where the coach stops, and the walking stretch from there",
            "Mobility across the group, and the version that keeps it together",
            "Departure time out of Marrakech, and what it costs the day",
            "The return movement, planned rather than assumed",
            "An indoor alternative for every outdoor element",
            "Whether an overnight would serve the client better than the day trip",
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
          <Evidence note="No distance or drive time for this leg is published, because it has not been driven and logged by us yet. It is one of the nine routes in the measurement programme." />
        </div>
      </Container>

      <FaqSection heading="What operators ask about Essaouira" faqs={FAQS} />

      <Container as="section" className="py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Planning an Essaouira day
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Send us the week the day sits in, not just the day. Where it falls in
          the programme changes whether it should be there at all. Other
          destinations are on the{" "}
          <Link href="/destinations" className="text-petrol underline">
            hub
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
