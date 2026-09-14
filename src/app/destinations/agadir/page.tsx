import { Flag, Hotel, Mountain, Plane, UtensilsCrossed, Waves } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Agadir Resort and Golf Ground Operations",
  description:
    "Agadir for leisure and incentive groups: resort programmes, golf, beach and surf days, and excursions to Paradise Valley and Taroudant.",
  path: "/destinations/agadir",
});

const FAQS = [
  {
    question: "Is Agadir suitable for large incentive groups?",
    answer:
      "Yes. Its resort hotels are among the few in Morocco that can keep a large group in a single property. The planning effort goes into the days out, so the week does not become the same day repeated.",
  },
  {
    question: "Can you organise golf programmes?",
    answer:
      "Yes. We plan tee times across courses, club transport and a parallel programme for those not playing, so that golfers and partners meet again at the right time.",
  },
  {
    question: "Is Agadir good year-round?",
    answer:
      "It is one of Morocco's milder destinations through the year, which is part of its appeal for winter programmes. The Atlantic wind and swell still affect beach and sea activities, so each outdoor element has an alternative.",
  },
];

export default function AgadirPage() {
  return (
    <DestinationPage
      slug="agadir"
      title="Agadir"
      standfirst="Morocco's Atlantic resort city: beaches, large hotels and golf. The capacity is easy to sell; the week built around it is where planning matters."
      body={
        <>
          <p>
            Agadir is Morocco&rsquo;s main Atlantic beach resort, rebuilt as a
            modern city after the 1960 earthquake. It has a long sandy bay, a
            large supply of resort hotels, several golf courses and its own
            international airport, which makes it one of the few places in the
            country where big leisure and incentive groups can stay together in
            one property.
          </p>
          <p>
            That capacity is the strength, and it is easy to lean on too
            heavily. A group that spends a week in one resort needs days out that
            are planned rather than improvised: the kasbah viewpoint above the
            city, Souk El Had, Paradise Valley in the foothills and the surf
            villages to the north, Taghazout among them.
          </p>
          <p>
            Golf is a real reason groups come, and it needs its own operation:
            tee times across several courses, club transport, and a programme for
            the partners who are not playing. We plan the courses and the
            transfers together so the day holds its shape.
          </p>
          <p>
            Agadir is also a gateway to the south, with Taroudant within reach
            inland and the road towards Tiznit and the Anti-Atlas. For a group
            combining beach and culture, we plan those days so the time on the
            road does not undo the rest of the week.
          </p>
        </>
      }
      services={[
        {
          icon: Hotel,
          title: "Resort programmes",
          body: "Large groups kept together in one property, with the week planned around it.",
        },
        {
          icon: Flag,
          title: "Golf programmes",
          body: "Tee times, club transport and a partner programme planned together.",
        },
        {
          icon: Plane,
          title: "Airport handling",
          body: "Arrivals at Agadir Al Massira, with split flights planned as separate movements.",
        },
        {
          icon: Waves,
          title: "Beach and surf days",
          body: "Surf lessons and beach activities in Taghazout and along the bay.",
        },
        {
          icon: Mountain,
          title: "Excursions",
          body: "Paradise Valley, Taroudant and the Anti-Atlas, timed against the road.",
        },
        {
          icon: UtensilsCrossed,
          title: "Dining",
          body: "Restaurants and beach venues coordinated with the resort schedule.",
        },
      ]}
      mice={[
        { kind: "seminar", body: "Conferences in large resort hotels with their own meeting space." },
        { kind: "teambuilding", body: "Beach games, surf lessons and camel rides along the Atlantic shore." },
        { kind: "gala", body: "Beach and poolside dinners, or evenings under caidal tents with folklore shows." },
        { kind: "culture", body: "The Agadir Oufella kasbah, Souk El Had and argan cooperatives." },
        { kind: "incentive", body: "Golf, quad biking in the dunes, surfing in Taghazout, spa and wellness." },
      ]}
      checklist={{
        title: "What we establish before confirming Agadir",
        items: [
          "Whether one resort can hold the whole group, and in which room mix",
          "Tee times across the courses, and transport for players and clubs",
          "A programme for partners and non-players",
          "Road time for each excursion, against the rest of the day",
          "Arrival spread across flights into Al Massira",
          "Wind and sea conditions for beach and surf activities",
        ],
        evidence:
          "No drive times for Agadir excursions are published here, because none has been measured and logged by us.",
      }}
      faq={{ heading: "What operators ask about Agadir", faqs: FAQS }}
      cta={{
        title: "Planning an Agadir programme",
        body: "Send the group size, the dates and how many will play golf. We will tell you which properties can hold the group together and how to build the days around them.",
      }}
    />
  );
}
