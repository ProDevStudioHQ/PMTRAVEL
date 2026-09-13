import { Briefcase, Hotel, Landmark, Route, Ship, TrainFront } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Tangier Corporate and Group Operations",
  description:
    "Tangier for travel trade: Strait of Gibraltar crossings, industrial and company visits, high-speed rail connections and the city's kasbah and coast.",
  path: "/destinations/tangier",
});

const FAQS = [
  {
    question: "Can a programme combine Spain and Morocco through Tangier?",
    answer:
      "Yes. Ferries across the Strait make it practical, provided the crossing is planned as one sequence: transfer, formalities, sailing, arrival and onward transfer. We agree a fallback sailing in advance, because a missed crossing moves the whole day.",
  },
  {
    question: "Do you arrange industrial or company visits?",
    answer:
      "We handle the logistics around them: transport, timing and the security and access rules of the host site. The visit itself is arranged with the host company, and we plan the rest of the day around its constraints.",
  },
  {
    question: "How is Tangier connected to the rest of Morocco?",
    answer:
      "By the Al Boraq high-speed service to Rabat and Casablanca, by air, and by road. It is also the usual starting point for Chefchaouen and the north.",
  },
];

export default function TangierPage() {
  return (
    <DestinationPage
      slug="tangier"
      title="Tangier"
      standfirst="Where Morocco faces Europe. A business and port city, the shortest crossing to Spain, and the start of the high-speed line south."
      routeSlug="marrakech-tangier"
      body={
        <>
          <p>
            Tangier faces Europe across the Strait of Gibraltar, and that
            position explains most of what it offers a programme. It is an
            industrial and logistics hub built around the Tanger Med port, a city
            with a long international history, and for many groups the point
            where Morocco and Spain meet in the same itinerary.
          </p>
          <p>
            The crossing is the first thing to plan. Ferries to Tarifa and
            Algeciras make combined Spain and Morocco programmes practical, but a
            group on a fixed sailing needs border formalities, luggage and the
            transfer on each side planned as one sequence. A missed sailing moves
            the whole day, so we build in margin and agree a fallback sailing in
            advance.
          </p>
          <p>
            The second is the corporate side. Industrial visits, supplier
            meetings and site tours are a real reason groups come, and they run
            on the host company&rsquo;s security and timing rules rather than a
            tour timetable. We plan the transport and the rest of the day around
            those rules.
          </p>
          <p>
            The city itself rewards time. The kasbah and medina above the port,
            the Grand Socco, Cap Spartel where the Atlantic meets the
            Mediterranean and the Caves of Hercules nearby make an easy, varied
            day. Tangier is also the northern end of the Al Boraq high-speed
            service and the natural starting point for Chefchaouen.
          </p>
        </>
      }
      services={[
        {
          icon: Ship,
          title: "Strait crossings",
          body: "Ferry sailings to Spain planned with border formalities, luggage and a fallback sailing.",
        },
        {
          icon: Briefcase,
          title: "Industrial and site visits",
          body: "Company visits scheduled around the host's security and access rules.",
        },
        {
          icon: TrainFront,
          title: "Rail connections",
          body: "Transfers for Al Boraq departures to Rabat and Casablanca.",
        },
        {
          icon: Landmark,
          title: "City programmes",
          body: "The kasbah, the medina, Cap Spartel and the Caves of Hercules.",
        },
        {
          icon: Route,
          title: "Northern circuits",
          body: "Tangier as the start for Chefchaouen and the north.",
        },
        {
          icon: Hotel,
          title: "Hotel and venue logistics",
          body: "Arrival, coach holding and luggage handled at each property.",
        },
      ]}
      mice={[
        { kind: "seminar", body: "Meetings in business hotels and venues overlooking the Strait." },
        { kind: "teambuilding", body: "Coastal challenges at Cap Spartel and treasure hunts through the medina." },
        { kind: "gala", body: "Dinners in historic villas and palace venues in the kasbah." },
        { kind: "culture", body: "The Kasbah Museum, the Grand Socco, the American Legation and the Caves of Hercules." },
        { kind: "incentive", body: "Day crossings to Spain, golf, horse riding on the Atlantic beaches and a day in Chefchaouen." },
      ]}
      checklist={{
        title: "What we establish before confirming Tangier",
        items: [
          "Ferry sailings, border formalities and the fallback if one is missed",
          "Luggage handling at the port on both sides of the crossing",
          "Host company access and security rules for industrial visits",
          "Transfer timing to the Al Boraq station",
          "Coach access to the kasbah and medina drop-off points",
          "Wind and sea conditions for any crossing or coastal activity",
        ],
        evidence:
          "No drive time from Marrakech to Tangier is published here, because it has not been driven and logged by us yet. The leg is one of the routes in the measurement programme.",
      }}
      faq={{ heading: "What operators ask about Tangier", faqs: FAQS }}
      cta={{
        title: "Planning a Tangier programme",
        body: "Tell us whether the group crosses the Strait, and when. That single fact decides how the rest of the programme should be built.",
      }}
    />
  );
}
