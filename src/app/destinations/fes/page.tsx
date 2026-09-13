import { Hotel, Languages, Lightbulb, Luggage, Route, UtensilsCrossed } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Fes Ground Operations",
  description:
    "Operating Fes for travel trade: medina access and luggage handling, guiding that holds a group together, and arriving by road from Marrakech.",
  path: "/destinations/fes",
});

const FAQS = [
  {
    question: "What makes Fes harder to operate than Marrakech?",
    answer:
      "The medina, and specifically the combination of vehicle access, luggage and group cohesion inside it. The problems are the same in kind as Marrakech's and larger in degree, which means arrangements that work adequately there can fail here. We plan arrival and luggage as a distinct operation rather than as part of the transfer.",
  },
  {
    question: "How many days does Fes need?",
    answer:
      "More than the day and a half it is often given, if the client is there for the medina rather than to tick it off. The common pattern is arriving late after a long crossing, one compressed day, and an early departure, which produces a visit nobody enjoyed. We will say when the itinerary has under-allowed it.",
  },
  {
    question: "Is Fes reached by road or by air?",
    answer:
      "Both, and the choice changes the whole shape of the programme. A road crossing is a full commitment of a day with the group arriving tired; flying changes the pacing and the cost in different directions. We will lay out what each does to the itinerary rather than assuming the road because we are a ground operator.",
  },
  {
    question: "What should a guide brief cover in Fes?",
    answer:
      "Pace, the route through the medina, and what gets dropped if the group is slower than expected. A guide who knows the city but not the group will take the interesting route rather than the one forty people can stay together on, and a group that fragments in a medina is the incident everyone remembers.",
  },
];

export default function FesPage() {
  return (
    <DestinationPage
      slug="fes"
      title="Fes"
      standfirst="Usually reached as a crossing rather than a transfer, and usually given less time than it needs. The medina is the operational problem, and it is a serious one."
      routeSlug="marrakech-fes"
      body={
        <>
          <p>
            Fes is the destination where the gap between how a programme is sold
            and how it is operated tends to be widest. It arrives in most
            itineraries as one of the imperial cities, generally reached by a
            long road crossing, generally allotted about a day and a half. That
            allocation is the root of most of what then goes wrong.
          </p>
          <p>
            The pattern is familiar: the group arrives in the evening after a
            long day on the road, tired; the following day is compressed to fit
            everything that was promised; and departure is early. The client
            sees the city through fatigue. None of that is a failure of
            execution — it is the itinerary doing what it was always going to
            do. We would rather point it out while there is still time to change
            the shape of the week.
          </p>
          <p>
            Operationally, the medina is the centre of the problem. The
            questions are the familiar ones from Marrakech, larger: where the
            vehicle can reach, where luggage is handed over and who moves it,
            and how a group stays together once inside. Arrangements that work
            adequately in Marrakech can fail here, so we plan arrival and
            luggage as their own operation rather than as the tail end of a
            transfer.
          </p>
          <p>
            Guiding carries more weight here than almost anywhere else we work.
            The difference between a guide who knows the city and a guide
            briefed on the group is the difference between an interesting route
            and a route that forty people can actually follow together. We brief
            on pace and on what to drop, because a group that fragments in a
            medina becomes an incident rather than an inconvenience.
          </p>
          <p>
            Whether to arrive by road or by air is a real decision and we treat
            it as one. A crossing commits a full day and delivers a tired group;
            flying reshapes the pacing and the budget in different directions.
            We will set out what each does to the itinerary rather than
            defaulting to the road because road is what ground operators do.
          </p>
        </>
      }
      services={[
        {
          icon: Luggage,
          title: "Arrival and luggage",
          body: "Planned as a distinct operation, with the handover point and the carry agreed before the day.",
        },
        {
          icon: Languages,
          title: "Medina guiding",
          body: "Guides briefed on pace, route and what to drop, not only on content.",
        },
        {
          icon: Hotel,
          title: "Riad and hotel transfers",
          body: "Access established per address rather than per district.",
        },
        {
          icon: Route,
          title: "Crossings from Marrakech",
          body: "Planned with slack and a decision point, like any long leg.",
        },
        {
          icon: UtensilsCrossed,
          title: "Dining",
          body: "Timed against a day that frequently runs longer than planned.",
        },
        {
          icon: Lightbulb,
          title: "Itinerary advice",
          body: "Including telling you when a day and a half is not enough.",
        },
      ]}
      checklist={{
        title: "What we establish before confirming Fes",
        items: [
          "How the group arrives, and what state they arrive in",
          "Vehicle access to each specific address, and where luggage is handed over",
          "Group size against the route the guide intends to take",
          "Mobility, and the version of the medina day that holds together",
          "How many usable hours the itinerary actually gives the city",
          "Departure timing, and what it removes from the final morning",
        ],
        evidence:
          "No distance or drive time from Marrakech to Fes is published here. It is one of the nine routes being logged, and the figures will appear with the number of runs behind them.",
      }}
      mice={[
        { kind: "seminar", body: "Meetings in palace riads and the city’s historic hotels." },
        { kind: "teambuilding", body: "Artisan challenges in zellige, pottery and brass workshops." },
        { kind: "gala", body: "Dinners in privatised palaces, with Andalusian music." },
        { kind: "culture", body: "The medina, its medersas and tanneries, and the Merinid Tombs viewpoint." },
        { kind: "incentive", body: "Cooking classes, hammam and spa, and day trips to Meknes and Volubilis." },
      ]}
      faq={{ heading: "What operators ask about Fes", faqs: FAQS }}
      cta={{
        title: "Planning a Fes section",
        body: "Send the itinerary with the arrival and departure times as they currently stand. That is usually enough for us to tell you whether the city has been given enough of the week.",
      }}
    />
  );
}
