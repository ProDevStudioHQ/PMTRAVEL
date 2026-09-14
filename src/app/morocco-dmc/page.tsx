import { pageMetadata } from "@/lib/metadata";
import { FaqSection } from "@/components/FaqSection";
import { ShowcaseCta, ShowcaseHero, ShowcaseRows, type ShowcaseService } from "@/components/Showcase";
import { COMPANY, SITE_URL } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "Morocco DMC and Ground Handling",
  description:
    "What a Morocco DMC does, what ground handling includes, and what PM Travel operates for tour operators and agencies from Marrakech.",
  path: "/morocco-dmc",
});

/**
 * Service schema. Only the services we actually operate, with no price, no
 * offer and no rating - none of which we could back.
 */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Destination management and ground handling",
  provider: {
    "@type": "TravelAgency",
    name: COMPANY.name,
    url: SITE_URL,
  },
  areaServed: { "@type": "Country", name: "Morocco" },
  audience: {
    "@type": "BusinessAudience",
    name: "Tour operators, travel agencies and destination specialists",
  },
  availableLanguage: [...COMPANY.languages],
};

/**
 * Eight services in four rows. The home page links to #transport,
 * #accommodation, #guiding and #airport, so every former anchor still lands
 * on the row that covers it.
 */
const SERVICES: ShowcaseService[] = [
  {
    id: "transport",
    aliases: ["airport"],
    title: "Transport & Airport Operations",
    body: "Vehicles matched to the group and to the road, and arrivals handled from the manifest rather than from a sign held up at the gate.",
    points: [
      "Vehicle class chosen for group size and the specific road",
      "Drivers briefed to the day plan",
      "Flight monitoring, meet and greet at arrivals",
      "Split arrivals planned as separate movements",
      "A stated backup for every movement",
    ],
    imageKey: "d5-dmc-menara-airport",
  },
  {
    id: "accommodation",
    aliases: ["dining"],
    title: "Accommodation & Dining",
    body: "Hotels, riads and camps matched to the group, and meals timed against the rest of the day instead of booked in isolation.",
    points: [
      "Hotel, riad and desert camp sourcing",
      "Rooming lists and check-in coordination",
      "Vehicle access checked per address, not per district",
      "Restaurants, private dinners and gala evenings",
      "Dietary requirements handled end to end",
    ],
    imageKey: "d6-dmc-riad-patio",
  },
  {
    id: "guiding",
    aliases: ["excursions"],
    title: "Guides & Excursions",
    body: "Licensed guides briefed on your itinerary and your client, and excursions planned around real daylight and the group's pace.",
    points: [
      `Licensed guides in ${COMPANY.languages.length} working languages`,
      "Briefed on your itinerary, not a standard tour",
      "Told in advance what to drop if the day runs long",
      "Day trips and multi-day circuits",
      "Activities scheduled against where the group sleeps",
    ],
    imageKey: "d7-dmc-covered-souk",
  },
  {
    id: "groups",
    aliases: ["white-label"],
    title: "Groups & White-label Execution",
    body: "One-off groups, repeating series and individual travellers, all run under your brand and the same operational file.",
    points: [
      "Groups, FIT and repeating series",
      "One coordinator from brief to last departure",
      "Meet boards, vehicles and briefings in your brand",
      "Staff introduce themselves on your behalf",
      "Every quote line marked requested, on option or confirmed",
    ],
    imageKey: "d8-dmc-jemaa-el-fnaa-sunset",
  },
];

const FAQS = [
  {
    question: "What does a Morocco DMC do?",
    answer:
      "A DMC — a destination management company — is the operator on the ground in the destination, working for the company that sold the trip rather than for the traveller. In Morocco that means arranging and running transport, airport handling, accommodation bookings, guides, meals, activities and events, and making the decisions when something changes mid-programme. The selling agency keeps the client relationship; the DMC makes the itinerary happen.",
  },
  {
    question: "What does Morocco ground handling include?",
    answer:
      "Everything between arrival and departure: meeting flights, moving people and luggage, hotel and riad check-ins, guides, dining, excursions, and the coordination that holds it together when a flight is late or a vehicle fails. Ground handling is often described as a list of services, but the part that matters is the coordination — any supplier can send a vehicle, and the difference shows on the day something goes wrong.",
  },
  {
    question: "What is the difference between a DMC and a travel agency?",
    answer:
      "A travel agency sells to travellers; a DMC operates for the trade in one destination. The agency owns the client, the marketing and the margin, and carries the commercial risk of the sale. The DMC owns the local suppliers, the operational knowledge and the execution, and carries the risk of the programme running badly. The two are not competitors, and a DMC that starts selling direct to your clients has stopped being one.",
  },
  {
    question: "Do you work with suppliers or own the vehicles?",
    answer:
      "We work with suppliers, and we would rather say so than imply a fleet we do not have. What we take responsibility for is which supplier is used, how they are briefed, and what happens when they fail — including a stated backup for every movement. Ownership claims are common in this market and are worth checking whoever you are talking to.",
  },
];

export default function MoroccoDmcPage() {
  return (
    <>
      <ShowcaseHero
        badge="Morocco DMC"
        title="Our Ground Services"
        standfirst="You sell Morocco. We run the ground programme: the vehicles, the arrivals, the hotels, the guides, and the decisions when something changes."
        trail={[{ href: "/morocco-dmc", label: "Morocco DMC" }]}
        highlights={[
          { value: "8", label: "Core services" },
          { value: String(COMPANY.languages.length), label: "Working languages" },
          { value: "B2B", label: "Travel trade only" },
        ]}
      />

      <ShowcaseRows services={SERVICES} />

      <FaqSection heading="What buyers ask first" faqs={FAQS} tone="paper-2" />

      <ShowcaseCta title="Send Us a Programme">
        <p>
          The quickest way to judge a ground partner is to send a real
          requirement and read what comes back.
        </p>
      </ShowcaseCta>

      <script
        type="application/ld+json"
        // Static, developer-authored. No price, offer or rating is asserted.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
