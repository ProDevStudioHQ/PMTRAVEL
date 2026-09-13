import { Compass, Landmark, Route, ShieldCheck, Sun, Tent } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Zagora Desert Ground Operations",
  description:
    "Operating Zagora and the Draa valley: a desert night closer to Marrakech, what it offers compared with Merzouga, the road through Agdz and camp logistics.",
  path: "/destinations/zagora",
});

const FAQS = [
  {
    question: "Is Zagora a good alternative to Merzouga?",
    answer:
      "For some programmes, yes. It is closer to Marrakech and offers desert camps and the Draa valley, but not the large dune fields of Merzouga. If high dunes are the point of the trip, we will say that Merzouga or Erg Chigaga serves the client better.",
  },
  {
    question: "Can a Zagora desert night work in a short itinerary?",
    answer:
      "It can, as two days with a night in camp, but the drive is long in both directions. We set out what that does to the rest of the week before recommending it.",
  },
  {
    question: "What else is there to see around Zagora?",
    answer:
      "The palm groves of the Draa valley, kasbahs and ksour along the river, and Tamegroute with its pottery workshops and historic library.",
  },
];

export default function ZagoraPage() {
  return (
    <DestinationPage
      slug="zagora"
      title="Zagora"
      standfirst="The Draa valley and a desert night within closer reach of Marrakech. Worth selling, provided the client knows what kind of desert it is."
      body={
        <>
          <p>
            Zagora sits in the Draa valley, along one of the longest palm groves
            in Morocco, and it has long been sold as the desert within reach of
            Marrakech. For a programme that wants a Sahara night without the long
            road east to Merzouga, it is the obvious alternative.
          </p>
          <p>
            The honest trade-off is the dunes. Zagora offers desert camps, palm
            groves and stony desert landscapes; the large dune fields most
            clients picture are further south towards M&rsquo;Hamid and Erg
            Chigaga, or in Merzouga. We would rather set that out before a
            programme is sold than let a client discover it on arrival.
          </p>
          <p>
            The road is the second consideration. The route from Marrakech
            crosses the High Atlas and follows the Draa valley south through
            Agdz, which makes for a long but beautiful day. We plan the stops and
            the arrival time so the group reaches camp in daylight.
          </p>
          <p>
            Zagora&rsquo;s strengths are its valley: kasbahs and ksour along the
            river, the pottery and historic library of Tamegroute, and the palm
            groves themselves. A programme that makes the most of those, rather
            than promising Erg Chebbi, tends to leave clients well satisfied.
          </p>
        </>
      }
      services={[
        {
          icon: Tent,
          title: "Desert camps",
          body: "Camp nights matched to the group, with the transfer from the road planned.",
        },
        {
          icon: Route,
          title: "Draa valley circuits",
          body: "The road through Agdz planned with stops and a daylight arrival.",
        },
        {
          icon: Landmark,
          title: "Kasbahs and ksour",
          body: "Visits along the Draa valley with local guides.",
        },
        {
          icon: Compass,
          title: "Desert activities",
          body: "Camel treks, 4x4 excursions and walks in the palm groves.",
        },
        {
          icon: Sun,
          title: "Seasonal scheduling",
          body: "Daytime heat and cold nights planned for, month by month.",
        },
        {
          icon: ShieldCheck,
          title: "Backup planning",
          body: "A fallback for weather, vehicles and the camp.",
        },
      ]}
      mice={[
        { kind: "seminar", body: "Small retreats in kasbah hotels and desert lodges in the Draa valley." },
        { kind: "teambuilding", body: "Desert orienteering, camel caravans and 4x4 convoys." },
        { kind: "gala", body: "Dinners under caidal tents with fire and live music." },
        { kind: "culture", body: "The Tamegroute library and potteries, and the kasbahs of the Draa valley." },
        { kind: "incentive", body: "Camel treks at sunset, stargazing nights and 4x4 excursions towards M'Hamid." },
      ]}
      checklist={{
        title: "What we establish before recommending Zagora",
        items: [
          "Whether the client expects large dunes, and what Zagora offers instead",
          "Arrival time at camp, and the stops that make it achievable",
          "Camp capacity in the configuration the group needs",
          "The transfer from where vehicles stop to the camp",
          "The month, and what heat or cold nights change",
          "The onward route, back to Marrakech or on to the south",
        ],
        evidence:
          "No drive time from Marrakech to Zagora is published here, because none has been measured and logged by us yet. Figures appear on route intelligence only once a leg has been driven.",
      }}
      faq={{ heading: "What operators ask about Zagora", faqs: FAQS }}
      cta={{
        title: "Planning a Zagora desert programme",
        body: "Tell us what the client expects to see in the desert. We will tell you whether Zagora delivers it, and how to build the road days around it.",
      }}
    />
  );
}
