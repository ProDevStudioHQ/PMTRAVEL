import { Plane, ShieldCheck, Ship, Tent, UtensilsCrossed, Wind } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Dakhla Kitesurf and Incentive Operations",
  description:
    "Operating Dakhla: flight-led logistics, kitesurfing on the lagoon, wind and tide planning, eco-lodges and distinctive incentive programmes.",
  path: "/destinations/dakhla",
});

const FAQS = [
  {
    question: "How do groups get to Dakhla?",
    answer:
      "Almost always by air, most often with a connection through Casablanca. Flight schedules decide the arrival and departure days, so we build the programme around the flights available on the actual dates.",
  },
  {
    question: "Do you need experience to kitesurf in Dakhla?",
    answer:
      "No. The flat, sheltered water of the lagoon suits beginners, and lessons can be arranged at every level. Wind conditions still decide when sessions happen.",
  },
  {
    question: "Is Dakhla suitable for corporate groups?",
    answer:
      "For small and medium-sized groups looking for something distinctive, yes. Lodge capacity and flight seats set the limit, so we confirm both before recommending it.",
  },
];

export default function DakhlaPage() {
  return (
    <DestinationPage
      slug="dakhla"
      title="Dakhla"
      standfirst="A lagoon between the desert and the Atlantic in Morocco's far south. Wind makes it famous; flights and distance decide how it is operated."
      body={
        <>
          <p>
            Dakhla sits on a long peninsula in Morocco&rsquo;s far south,
            between the Atlantic Ocean and a vast, sheltered lagoon. Steady winds
            and flat water have made the lagoon one of the best-known
            kitesurfing destinations in the world, and a growing number of
            eco-lodges and premium camps have followed.
          </p>
          <p>
            Distance is the first thing to plan. Dakhla is a long way from
            Marrakech and the north, and almost every group arrives by air, most
            often via Casablanca. Flight schedules, not road times, decide the
            shape of arrival and departure days, and we build the programme
            around them.
          </p>
          <p>
            The second is the wind, which is the reason to come and a constraint
            on everything else. It makes the kitesurfing, and it affects boat
            trips, outdoor dining and anything freestanding. We plan activities
            by time of day and keep sheltered alternatives ready.
          </p>
          <p>
            For corporate and incentive groups, Dakhla offers something unusual:
            space, silence and a sense of remoteness that is hard to find
            elsewhere. Lagoon excursions, the White Dune, oyster farms and nights
            at a lodge on the water make a distinctive programme, provided the
            logistics of a remote destination are handled with care.
          </p>
        </>
      }
      services={[
        {
          icon: Plane,
          title: "Flight-led logistics",
          body: "Arrival and departure days built around flight schedules, usually via Casablanca.",
        },
        {
          icon: Wind,
          title: "Kitesurf programmes",
          body: "Lessons and sessions on the lagoon with established kite schools, planned by wind and tide.",
        },
        {
          icon: Ship,
          title: "Lagoon excursions",
          body: "Boat trips to the White Dune and Dragon Island, timed against wind and tide.",
        },
        {
          icon: Tent,
          title: "Lodge and camp stays",
          body: "Eco-lodges and premium camps matched to the group.",
        },
        {
          icon: UtensilsCrossed,
          title: "Dining",
          body: "Oyster farm visits and lagoon-side dinners with a sheltered alternative.",
        },
        {
          icon: ShieldCheck,
          title: "Remote-destination planning",
          body: "Fallbacks for flights, weather and supplies.",
        },
      ]}
      mice={[
        { kind: "seminar", body: "Retreats in eco-lodges and premium camps on the edge of the lagoon." },
        { kind: "teambuilding", body: "Kitesurf and paddleboard initiations, beach challenges and 4x4 convoys in the desert." },
        { kind: "gala", body: "Dinners on the lagoon shore or in the dunes, under the stars." },
        { kind: "culture", body: "Oyster farms, fishing villages and the landscapes of the Saharan coast." },
        { kind: "incentive", body: "Kitesurfing, boat trips to the White Dune and Dragon Island, and spa stays." },
      ]}
      checklist={{
        title: "What we establish before confirming Dakhla",
        items: [
          "Flight schedules into Dakhla, and the connections they depend on",
          "Wind and tide for each activity, by time of day",
          "Lodge or camp capacity in the configuration the group needs",
          "A sheltered alternative for every outdoor element",
          "Kite school and equipment arrangements for the group's level",
          "Supplies and fallbacks for a remote destination",
        ],
        evidence:
          "No flight or transfer times for Dakhla are published here, because none has been measured and logged by us. Timings in a quote are based on the flight schedule for the actual dates.",
      }}
      faq={{ heading: "What operators ask about Dakhla", faqs: FAQS }}
      cta={{
        title: "Planning a Dakhla programme",
        body: "Send the dates, the group size and the activities the client wants. We will check flights and lodge capacity first, because in Dakhla everything else follows from them.",
      }}
    />
  );
}
