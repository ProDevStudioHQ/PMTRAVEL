import { pageMetadata } from "@/lib/metadata";
import { FaqSection } from "@/components/FaqSection";
import { ShowcaseCta, ShowcaseHero, ShowcaseRows, type ShowcaseService } from "@/components/Showcase";
import { COMPANY } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "Morocco MICE and Events Operations",
  description:
    "Seminars, incentives, corporate events and logistics in Morocco, operated white-label for travel agencies and MICE planners from Marrakech.",
  path: "/mice",
});

const SERVICES: ShowcaseService[] = [
  {
    id: "seminars",
    title: "Seminars & Conferences",
    body: "Your professional events organised end to end, from choosing the venue to coordinating the technical side on the day.",
    points: [
      "Venue sourcing, checked before it is proposed",
      "Audiovisual and IT coordination",
      "Participant registration and badges",
      "Coffee breaks and networking lunches",
      "Room layouts matched to the group and the format",
    ],
    imageKey: "b2-marrakech-medersa",
  },
  {
    id: "incentives",
    title: "Incentives & Reward Travel",
    body: "Programmes built to reward and motivate teams, with experiences that belong to Morocco rather than to any destination.",
    points: [
      "Exclusive activities and team building",
      "Selected riads, hotels and desert camps",
      "Authentic cultural experiences",
      "Gala dinners in memorable settings",
      "Private transport and tailored logistics",
    ],
    imageKey: "b3b-agafay-camp",
  },
  {
    id: "corporate-events",
    title: "Corporate Events & Launches",
    body: "Product launches and company events, from the first concept to the last guest leaving.",
    points: [
      "Event design and staging",
      "Sound, lighting and video production",
      "Entertainment and hosting",
      "Invitations and guest management",
      "Full coordination on the day",
    ],
    imageKey: "c3-tangier-night",
  },
  {
    id: "logistics",
    title: "Logistics & Hospitality",
    body: "Everything around the event handled from arrival to departure, so participants only notice that it worked.",
    points: [
      "Airport meet and assist, and transfers",
      "Hotel bookings at negotiated rates",
      "Group movements and transport",
      "On-site coordination for the whole programme",
      "Local suppliers we work with directly",
    ],
    imageKey: "b1-marrakech-hero",
  },
];

const FAQS = [
  {
    question: "What should MICE planners verify before booking a Morocco venue?",
    answer:
      "Capacity in the specific layout you need, coach access and turning space, the wet-weather plan, curfew and noise limits, and what the backup venue is. Capacity in one layout tells you almost nothing about another, and an outdoor Moroccan venue without a stated wet-weather plan is an unpriced risk you are carrying rather than the supplier.",
  },
  {
    question: "Why does this page not name venues?",
    answer:
      "Because named venues with capacities and floor plans are the commercial asset, and publishing them means a competitor has them within the week at no cost. Named venues, exact capacities and floor plans come to you directly once you have a live brief.",
  },
  {
    question: "Where do your capacity figures come from?",
    answer:
      "From our own inspections. Someone from PM Travel stands in the room, measures it, records what limits the capacity — floor area, exits, sightlines or service access — and signs the record. A supplier's stated capacity is recorded as unconfirmed until that happens.",
  },
  {
    question: "Do you operate under our brand?",
    answer:
      "Yes. We work for travel agencies, tour operators and MICE planners only, and run the programme white-label, so your client deals with your brand throughout.",
  },
];

export default function MicePage() {
  return (
    <>
      <ShowcaseHero
        badge="MICE & Events"
        title="Our MICE Services"
        standfirst="From the first concept to the last departure, we run every detail of your corporate events in Morocco, white-label and on the ground."
        trail={[{ href: "/mice", label: "MICE & Events" }]}
        highlights={[
          { value: String(SERVICES.length), label: "MICE services" },
          { value: COMPANY.address.city, label: "Where we are based" },
          { value: "B2B", label: "Travel trade only" },
        ]}
      />

      <ShowcaseRows services={SERVICES} />

      <FaqSection heading="What planners ask us" faqs={FAQS} tone="paper-2" />

      <ShowcaseCta title="Ready to Plan Your Next Event?">
        <p>
          Send the group size, the format and the month. We come back with a
          ground plan and a proposal where every line is clear.
        </p>
      </ShowcaseCta>
    </>
  );
}
