import { Car, Compass, Hotel, Mountain, Route, ShieldCheck } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Dades Valley and Gorges Ground Operations",
  description:
    "Operating the Dades Valley: the gorge road and its hairpins, vehicle choice, overnights in the gorge, walks and the seasons from roses to winter.",
  path: "/destinations/dades",
});

const FAQS = [
  {
    question: "Is the Dades Gorge road suitable for coaches?",
    answer:
      "It depends on the section and the size of the vehicle. The hairpins and narrower stretches favour smaller vehicles, and we match the vehicle to the road rather than to the headcount.",
  },
  {
    question: "Should the Dades be a drive-through or an overnight?",
    answer:
      "An overnight whenever the circuit allows. The gorge is at its best in the morning light, and a night there turns a long driving day into two good ones.",
  },
  {
    question: "When is the best season?",
    answer:
      "Spring and autumn for walking weather, with the rose harvest around Kelaat M'Gouna in spring. Summer works with early and late activity; winter needs a plan for cold nights and weather higher up.",
  },
];

export default function DadesPage() {
  return (
    <DestinationPage
      slug="dades"
      title="Dades Valley"
      standfirst="Palm groves, kasbahs and a gorge road that climbs in hairpins. The road is the experience, and it is also the constraint."
      routeSlug="marrakech-dades"
      body={
        <>
          <p>
            The Dades Valley runs east from Ouarzazate between the High Atlas and
            the Jebel Saghro, past palm groves, earthen kasbahs and the rose
            fields around Kelaat M&rsquo;Gouna, before the valley narrows into
            the Dades Gorges. It is the classic road-trip section of a southern
            circuit, and for adventure groups it is the reason to come.
          </p>
          <p>
            The road is both the experience and the constraint. The climb into
            the gorges includes the famous series of hairpin bends, and further
            along the valley the road narrows. Vehicle class matters, driving
            takes longer than the distance suggests, and photo stops need to be
            places where a vehicle can actually stop safely.
          </p>
          <p>
            The valley rewards an overnight rather than a drive-through.
            Guesthouses and kasbah hotels in the gorge let a group walk in the
            morning, when the light is at its best, before moving on towards the
            Todra Gorge and Merzouga.
          </p>
          <p>
            Season changes the programme. Spring brings the rose harvest and mild
            walking weather; summer heat shifts activity to early and late;
            winter can bring cold nights and weather higher up. We plan the
            version that fits the month, not a generic one.
          </p>
        </>
      }
      services={[
        {
          icon: Route,
          title: "Road-trip circuits",
          body: "The valley planned as a sequence of stops, not only a transfer.",
        },
        {
          icon: Car,
          title: "Vehicle matching",
          body: "Vehicles chosen for the gorge road, with safe photo stops identified.",
        },
        {
          icon: Mountain,
          title: "Gorge walks",
          body: "Guided walks graded to the group, in the morning light.",
        },
        {
          icon: Hotel,
          title: "Kasbah stays",
          body: "Overnights in the gorge placed where they serve the next day.",
        },
        {
          icon: Compass,
          title: "Adventure activities",
          body: "Hiking, mountain biking and 4x4 routes with local guides.",
        },
        {
          icon: ShieldCheck,
          title: "Backup planning",
          body: "An alternative for weather, road conditions and vehicles.",
        },
      ]}
      mice={[
        { kind: "seminar", body: "Small-group retreats in kasbah hotels in the valley and the gorge." },
        { kind: "teambuilding", body: "Guided canyon hikes, orienteering and 4x4 convoys." },
        { kind: "gala", body: "Dinners in kasbah courtyards with Amazigh music." },
        { kind: "culture", body: "The Valley of Roses, earthen kasbahs and Amazigh villages along the river." },
        { kind: "incentive", body: "Mountain biking, climbing in the gorges and a combined day with the Todra Gorge." },
      ]}
      checklist={{
        title: "What we establish before confirming the Dades",
        items: [
          "Vehicle class for the gorge road, not only the headcount",
          "Safe places for photo stops along the hairpins",
          "Where the group sleeps, and whether the morning is free to walk",
          "Walking grades against the mobility of the group",
          "The month: roses, heat or cold, and what it changes",
          "The onward leg to the Todra Gorge or Merzouga",
        ],
        evidence:
          "No drive time into the Dades Valley is published here, because the leg has not been driven and logged by us yet. It is one of the routes in the measurement programme.",
      }}
      faq={{ heading: "What operators ask about the Dades", faqs: FAQS }}
      cta={{
        title: "Planning a Dades road trip",
        body: "Send the circuit and the group profile. We will tell you where the overnights should fall and which vehicles the road calls for.",
      }}
    />
  );
}
