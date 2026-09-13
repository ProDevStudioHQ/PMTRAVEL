import { Compass, Hotel, Languages, PlaneLanding, Users, UtensilsCrossed } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

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
    <DestinationPage
      slug="marrakech"
      title="Marrakech"
      standfirst="Our base. Most programmes we run start and end here, and most of what decides whether they run well is settled before anyone reaches a hotel."
      body={
        <>
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
        </>
      }
      services={[
        {
          icon: PlaneLanding,
          title: "Airport arrivals and departures",
          body: "Manifest-led, with flight monitoring and split-arrival planning rather than one pickup that waits.",
        },
        {
          icon: Hotel,
          title: "Riad and hotel transfers",
          body: "Access checked per property, with the last-stretch arrangement agreed before the transfer is confirmed.",
        },
        {
          icon: Languages,
          title: "Guiding",
          body: "Licensed guides briefed to your itinerary and your client’s history, in the languages we operate in.",
        },
        {
          icon: UtensilsCrossed,
          title: "Dining and gala",
          body: "Restaurant and gala coordination, timed against the rest of the day rather than in isolation.",
        },
        {
          icon: Users,
          title: "Group movement",
          body: "Coach access, marshalling points and walking stretches planned as part of the day, not discovered during it.",
        },
        {
          icon: Compass,
          title: "Excursion staging",
          body: "Marrakech as the base for Agafay, the Atlas, Essaouira and the longer southern routes.",
        },
      ]}
      checklist={{
        title: "What we check before confirming",
        items: [
          "Vehicle access to the specific property address, not the district",
          "Where luggage is handed over, and who carries it from there",
          "Arrival spread across the day, and how many separate movements it implies",
          "Walking stretches in the programme, against the mobility of the group",
          "Departure timing for each transfer, not an average for the city",
          "Guide briefing against the itinerary you sold, including what to skip",
        ],
        evidence:
          "This page describes how we operate Marrakech. It carries no distances, drive times or capacities, because none has been measured and logged by us yet. Legs we have driven appear on route intelligence with the date and the number of runs behind them.",
      }}
      faq={{ heading: "What operators ask about Marrakech", faqs: FAQS }}
      cta={{
        title: "Send us a Marrakech programme",
        body: "Send the itinerary and the property list. We will tell you which addresses are straightforward, which need a different arrangement, and where the day is tighter than it looks.",
      }}
    />
  );
}
