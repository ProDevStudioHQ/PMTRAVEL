import { Briefcase, Building2, Bus, Landmark, Plane, TrainFront } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Casablanca Business and MICE Operations",
  description:
    "Casablanca for travel trade and corporate groups: airport arrivals at Mohammed V, conference logistics, city traffic and onward rail connections.",
  path: "/destinations/casablanca",
});

const FAQS = [
  {
    question: "Can Casablanca work as the arrival point for a Marrakech programme?",
    answer:
      "Yes, and it often does, because Mohammed V is Morocco's main international hub. The cost is a transfer or a train on arrival day, which changes how the first evening should be planned. We set out both versions so the choice is made before the programme is sold.",
  },
  {
    question: "Is Casablanca suitable for large conferences?",
    answer:
      "It has the largest supply of business venues in Morocco, so capacity is rarely the limit. What limits a conference is arrival, coach access and room changeovers, which is what we check at the specific venue before recommending it.",
  },
  {
    question: "How much time should a city visit take?",
    answer:
      "Half a day is enough for the Hassan II Mosque and the Corniche if it is planned around traffic and visiting times. Squeezing it between sessions usually produces a coach tour through congestion rather than a visit.",
  },
];

export default function CasablancaPage() {
  return (
    <DestinationPage
      slug="casablanca"
      title="Casablanca"
      standfirst="Morocco's business capital and its main international gateway. For many groups it is where the programme begins, even when the programme is somewhere else."
      routeSlug="marrakech-casablanca"
      body={
        <>
          <p>
            Casablanca is where a great deal of corporate Morocco begins. It is
            the country&rsquo;s commercial capital and home to most head
            offices, and Mohammed V International Airport is the main
            international hub, which makes the city the arrival point for many
            groups whose programme is actually somewhere else.
          </p>
          <p>
            That dual role is the first thing to plan around. A group landing
            for a Marrakech or Rabat programme needs a transfer plan that starts
            with the manifest, not with the hotel. A group staying in the city
            needs one that accepts how long cross-town movements take at the
            hours business travellers actually move. We plan both from the
            flight list and the departure times, not from an average.
          </p>
          <p>
            The second is the venue. Casablanca has the largest stock of
            business hotels and conference space in the country, and the useful
            questions are the ones a brochure skips: how delegates and luggage
            reach the door, where coaches can wait, and how long the changeover
            between plenary and breakouts really takes.
          </p>
          <p>
            The third is the city itself. The Hassan II Mosque, the Corniche and
            the Art Deco centre give a business programme a half day worth
            having, provided it is timed around the working day rather than
            squeezed into its margins.
          </p>
          <p>
            Onward connections close the loop. The Al Boraq high-speed service
            north to Rabat and Tangier and the road south to Marrakech make
            Casablanca a natural start for multi-city programmes, and we plan
            the transfer to the station or the road as carefully as the arrival.
          </p>
        </>
      }
      services={[
        {
          icon: Plane,
          title: "Airport meet and assist",
          body: "Manifest-led arrivals at Mohammed V, with split arrivals planned as separate movements.",
        },
        {
          icon: Building2,
          title: "Conference logistics",
          body: "Delegate arrival, coach holding and breakout changeovers planned with the venue.",
        },
        {
          icon: Bus,
          title: "City transfers",
          body: "Timed against the hour of the day, not a city average.",
        },
        {
          icon: TrainFront,
          title: "Rail connections",
          body: "Station transfers for high-speed departures to Rabat and Tangier.",
        },
        {
          icon: Landmark,
          title: "City programmes",
          body: "The Hassan II Mosque, the Corniche and the Art Deco centre, fitted around the working day.",
        },
        {
          icon: Briefcase,
          title: "Corporate roadshows",
          body: "Multi-site days across the city, sequenced against traffic rather than a map.",
        },
      ]}
      mice={[
        { kind: "seminar", body: "Conference hotels and business venues in the city centre and along the Corniche." },
        { kind: "teambuilding", body: "Urban challenges, cooking workshops and beach activities at Ain Diab." },
        { kind: "gala", body: "Dinners in Art Deco venues, seafront restaurants or private villas." },
        { kind: "culture", body: "Guided visits to the Hassan II Mosque, the old medina and the Habous quarter." },
        { kind: "incentive", body: "Golf, surfing off the Corniche and day trips to Rabat or El Jadida." },
      ]}
      checklist={{
        title: "What we establish before confirming Casablanca",
        items: [
          "Arrival times across the manifest, and how many separate movements they imply",
          "Traffic at the actual hours of each transfer, not an average",
          "Coach access and holding at the venue door",
          "Changeover time between plenary and breakout rooms",
          "Onward connections by rail or road, and the margin each needs",
          "Security and access procedures at the venue, agreed in advance",
        ],
        evidence:
          "No transfer time from the airport or across the city is published here, because none has been measured and logged by us yet. The leg from Marrakech is one of the routes in the measurement programme.",
      }}
      faq={{ heading: "What operators ask about Casablanca", faqs: FAQS }}
      cta={{
        title: "Planning a Casablanca programme",
        body: "Send the flight list and the venue shortlist. We will tell you how the arrivals group together, where the day is tight, and what we would check at each venue.",
      }}
    />
  );
}
