import { Building2, Landmark, Languages, ShieldCheck, TrainFront, UtensilsCrossed } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Rabat MICE and Delegation Operations",
  description:
    "Rabat for delegations, congresses and corporate groups: official appointments, protocol and access, and the capital's UNESCO-listed heritage.",
  path: "/destinations/rabat",
});

const FAQS = [
  {
    question: "Do you handle institutional and government delegations?",
    answer:
      "Yes. The difference from a corporate group is that the timetable belongs to someone else and changes at short notice. We plan slack around fixed appointments, agree access procedures in advance, and keep one named contact responsible for changes during the day.",
  },
  {
    question: "Is Rabat worth a visit for a leisure or incentive group?",
    answer:
      "Often yes. The Kasbah of the Udayas, the Hassan Tower and the Chellah are close together and the city is calm to walk, which makes a well-paced half or full day. It works particularly well combined with Casablanca.",
  },
  {
    question: "How do groups usually reach Rabat?",
    answer:
      "By the Al Boraq high-speed service from Tangier or by train from Casablanca, by air into Rabat-Salé, or by road. The choice changes the shape of arrival day, and we set out what each does to the programme before recommending one.",
  },
];

export default function RabatPage() {
  return (
    <DestinationPage
      slug="rabat"
      title="Rabat"
      standfirst="The capital: the palace, the ministries and the embassies. Programmes here run to someone else's timetable, and planning for that is most of the job."
      routeSlug="marrakech-rabat"
      body={
        <>
          <p>
            Rabat is Morocco&rsquo;s political and administrative capital, home
            to the Royal Palace, Parliament, the ministries and the embassies.
            For institutional delegations, association congresses and corporate
            groups with government business, it is often the destination rather
            than a stop on the way to one.
          </p>
          <p>
            That brings a different kind of operation. Programmes built around
            official meetings run to someone else&rsquo;s timetable, and the
            timetable moves. We plan with slack around fixed appointments, keep a
            named contact for each change, and treat security and access at
            institutional venues as something to agree in advance rather than
            discover at the gate.
          </p>
          <p>
            The city is also one of the most rewarding in the country to show a
            group. The Kasbah of the Udayas, the Hassan Tower, the Mausoleum of
            Mohammed V and the Chellah are close together, and Rabat&rsquo;s
            modern and historic centre is a UNESCO World Heritage site. It is a
            calmer city than Marrakech or Fes, which suits delegations that have
            come to work.
          </p>
          <p>
            Access is straightforward. Rabat is served by the Al Boraq
            high-speed service to Tangier, by trains to Casablanca and by its own
            airport at Salé, so many programmes combine it with Casablanca on the
            same trip. We plan the connection as part of the day, not as an
            afterthought.
          </p>
        </>
      }
      services={[
        {
          icon: Landmark,
          title: "Institutional delegations",
          body: "Programmes built around official appointments, with slack and a named contact for changes.",
        },
        {
          icon: ShieldCheck,
          title: "Protocol and access",
          body: "Security procedures and access at institutional venues agreed before the day.",
        },
        {
          icon: Building2,
          title: "Congress logistics",
          body: "Delegate flow, accreditation desks and transfers between venues.",
        },
        {
          icon: TrainFront,
          title: "Rail and airport connections",
          body: "Rail arrivals from Tangier and Casablanca, and flights into Rabat-Salé.",
        },
        {
          icon: Languages,
          title: "Guiding",
          body: "Licensed guides for the kasbah, the Hassan Tower and the Chellah, in the delegation's language.",
        },
        {
          icon: UtensilsCrossed,
          title: "Official dinners",
          body: "Seating, protocol and timing handled with the venue ahead of the evening.",
        },
      ]}
      mice={[
        { kind: "seminar", body: "Congresses and seminars in business hotels and institutional venues." },
        { kind: "teambuilding", body: "Activities along the Bouregreg river and cultural challenges in the medina." },
        { kind: "gala", body: "Official dinners and receptions in riads and private venues near the kasbah." },
        { kind: "culture", body: "The Kasbah of the Udayas, the Hassan Tower, the Mausoleum of Mohammed V and the Chellah." },
        { kind: "incentive", body: "Golf, sailing on the Bouregreg and surfing on the Atlantic beaches." },
      ]}
      checklist={{
        title: "What we establish before confirming Rabat",
        items: [
          "Fixed appointments, and the slack each one needs around it",
          "Security and access procedures at each institutional venue",
          "Protocol for official dinners: seating, speeches and timing",
          "Arrival by rail, air or road, and the transfer that follows",
          "Accreditation and badge collection for congress delegates",
          "A named contact for every change on the day",
        ],
        evidence:
          "No drive time from Marrakech to Rabat is published here, because it has not been driven and logged by us yet. The leg is one of the routes in the measurement programme.",
      }}
      faq={{ heading: "What operators ask about Rabat", faqs: FAQS }}
      cta={{
        title: "Planning a Rabat programme",
        body: "Send the fixed appointments and the delegation profile. We will tell you where the day needs slack and what we would agree with each venue in advance.",
      }}
    />
  );
}
