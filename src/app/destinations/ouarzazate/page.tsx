import { Clapperboard, Hotel, Landmark, Mountain, Route, Sun } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Ouarzazate Ground Operations",
  description:
    "Operating Ouarzazate: the Tizi n'Tichka crossing from Marrakech, film studio visits, kasbahs and placing the overnight in a southern circuit.",
  path: "/destinations/ouarzazate",
});

const FAQS = [
  {
    question: "Is the drive from Marrakech to Ouarzazate difficult?",
    answer:
      "It is demanding rather than difficult. The road crosses the High Atlas by the Tizi n'Tichka pass, with long stretches of bends and conditions that vary with the season. We plan it with stops, a vehicle suited to the road and an agreed point at which the plan changes if the weather closes in.",
  },
  {
    question: "Can groups visit the film studios?",
    answer:
      "Yes, studio tours are a common part of a Ouarzazate stay. Access can depend on production activity, so we confirm the visit close to the date and keep an alternative ready.",
  },
  {
    question: "How long should a group stay in Ouarzazate?",
    answer:
      "Usually one night on a southern circuit, two if the programme includes the studios, Aït Ben Haddou and time to recover from the crossing. The right answer depends on where the group goes next.",
  },
];

export default function OuarzazatePage() {
  return (
    <DestinationPage
      slug="ouarzazate"
      title="Ouarzazate"
      standfirst="Where the High Atlas gives way to the desert. Morocco's film capital, and the gateway to every southern circuit."
      body={
        <>
          <p>
            Ouarzazate is where the High Atlas gives way to the desert, and the
            town has made two industries of that position. It is the centre of
            Morocco&rsquo;s film production, with studios that have hosted
            international productions, and it is the gateway for southern
            circuits heading to the Draa valley, the Dades and the dunes.
          </p>
          <p>
            The crossing from Marrakech is the first thing to plan. The road over
            the Tizi n&rsquo;Tichka pass is spectacular and demanding, with
            bends, altitude and weather that change through the year. It takes a
            full day&rsquo;s energy, and we plan it with deliberate stops, a
            vehicle suited to the road and a decision point if conditions turn.
          </p>
          <p>
            The second is what the group does on arrival. The studios, the
            Taourirt Kasbah and nearby Aït Ben Haddou are all worth time, but a
            group that arrives tired after the pass rarely enjoys a packed
            afternoon. We would rather move a visit to the next morning than run
            it through fatigue.
          </p>
          <p>
            The third is onward planning. Ouarzazate is usually a night on the
            way somewhere else, so the value of the stop depends on where the
            group sleeps next. We plan the circuit as a whole, with each
            overnight placed where it serves the following day.
          </p>
        </>
      }
      services={[
        {
          icon: Clapperboard,
          title: "Film studio visits",
          body: "Studio tours scheduled around production activity and access.",
        },
        {
          icon: Mountain,
          title: "Tichka crossings",
          body: "Planned with deliberate stops, the right vehicle and an agreed decision point.",
        },
        {
          icon: Route,
          title: "Southern circuits",
          body: "Ouarzazate placed in the circuit where the overnight serves the next day.",
        },
        {
          icon: Landmark,
          title: "Kasbah visits",
          body: "The Taourirt Kasbah and Aït Ben Haddou, timed away from the midday heat.",
        },
        {
          icon: Sun,
          title: "Seasonal scheduling",
          body: "Summer heat and winter conditions on the pass planned for, not discovered.",
        },
        {
          icon: Hotel,
          title: "Hotel logistics",
          body: "Arrival, luggage and dinner timed against a long road day.",
        },
      ]}
      mice={[
        { kind: "seminar", body: "Meetings in kasbah hotels and resort properties on the edge of the desert." },
        { kind: "teambuilding", body: "Film-set challenges, desert orienteering and 4x4 convoys." },
        { kind: "gala", body: "Dinners in kasbah courtyards or under caidal tents beneath the stars." },
        { kind: "culture", body: "Film studio tours, the Taourirt Kasbah and nearby Aït Ben Haddou." },
        { kind: "incentive", body: "Quad and 4x4 excursions, mountain biking and a visit to the Fint oasis." },
      ]}
      checklist={{
        title: "What we establish before confirming Ouarzazate",
        items: [
          "Conditions on the Tizi n'Tichka pass for the month, and the decision point",
          "Vehicle class for the mountain road, not only the headcount",
          "Stops with usable facilities along the crossing",
          "Studio access, and whether production activity affects the visit",
          "Energy left for the afternoon after the crossing",
          "Where the group sleeps next, and what that asks of the morning",
        ],
        evidence:
          "No drive time over the Tizi n'Tichka pass is published here, because the leg has not been driven and logged by us yet. It is one of the routes in the measurement programme.",
      }}
      faq={{ heading: "What operators ask about Ouarzazate", faqs: FAQS }}
      cta={{
        title: "Planning a southern circuit through Ouarzazate",
        body: "Send the circuit with each overnight marked. We will tell you whether the crossing day is realistic and where the itinerary asks too much of the group.",
      }}
    />
  );
}
