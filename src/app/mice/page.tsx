import Link from "next/link";
import { ArrowRight, CircleCheck, Handshake } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { FaqSection } from "@/components/FaqSection";
import { PILL } from "@/components/Modern";
import { SiteImage } from "@/components/SiteImage";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "Morocco MICE and Events Operations",
  description:
    "Seminars, incentives, corporate events and logistics in Morocco, operated white-label for travel agencies and MICE planners from Marrakech.",
  path: "/mice",
});

type Service = {
  id: string;
  title: string;
  body: string;
  points: string[];
  imageKey: string;
};

const SERVICES: Service[] = [
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

const HIGHLIGHTS = [
  { value: String(SERVICES.length), label: "MICE services" },
  { value: COMPANY.address.city, label: "Where we are based" },
  { value: "B2B", label: "Travel trade only" },
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

/** Red into ink and back: the page's two deep bands share it. */
const GRADIENT = "bg-linear-to-br from-red-600 via-ink-900 to-red-900";

export default function MicePage() {
  return (
    <>
      <section className={`surface-deep relative isolate overflow-hidden text-paper ${GRADIENT}`}>
        <Container className="pt-4 pb-20 lg:pb-28">
          <Breadcrumbs trail={[{ href: "/mice", label: "MICE & Events" }]} onDark />
          <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center text-center lg:mt-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-1.5 text-xs font-bold tracking-wide text-red-600 uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-red-600" />
              MICE &amp; Events
              <span aria-hidden="true" className="size-1.5 rounded-full bg-red-600" />
            </span>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-paper sm:text-4xl lg:text-[4rem] lg:leading-none">
              Our MICE Services
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-paper/90">
              From the first concept to the last departure, we run every detail of
              your corporate events in Morocco, white-label and on the ground.
            </p>
            <dl className="mt-10 grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-3">
              {HIGHLIGHTS.map(({ value, label }) => (
                <div key={label} className="flex min-w-0 flex-col-reverse rounded-2xl bg-paper px-2 py-4 shadow-raised sm:px-4">
                  <dt className="mt-1 text-xs text-ink-500 sm:text-sm">{label}</dt>
                  <dd className="font-display text-base font-bold text-red-600 sm:text-2xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="flex flex-col gap-20 py-16 lg:gap-28 lg:py-24">
          {SERVICES.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-red-050"
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-paper-2 shadow-raised">
                  <SiteImage
                    imageKey={service.imageKey}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="tabular absolute top-5 left-5 flex size-12 items-center justify-center rounded-full border-2 border-red-600 bg-paper font-display text-base font-bold text-red-600"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute right-5 bottom-5 inline-flex items-center gap-2 rounded-lg bg-paper px-3 py-1.5 text-xs font-semibold text-red-900">
                    <Handshake aria-hidden="true" size={14} strokeWidth={2} />
                    B2B · White-label
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-red-600 lg:text-[2.25rem] lg:leading-[1.1]">
                  {service.title}
                </h2>
                <p className="mt-4 text-lg text-ink-500">{service.body}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-base text-ink-900">
                      <CircleCheck
                        aria-hidden="true"
                        size={20}
                        strokeWidth={1.75}
                        className="mt-0.5 shrink-0 text-red-600"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link href={RFQ_HREF} className={`${PILL.primary} mt-8`}>
                  Request a quote
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                </Link>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <FaqSection heading="What planners ask us" faqs={FAQS} tone="paper-2" />

      <section className={`surface-deep relative isolate overflow-hidden text-paper ${GRADIENT}`}>
        <Container className="py-20 lg:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-1.5 text-xs font-bold tracking-wide text-red-600 uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-red-600" />
              Ready to start?
              <span aria-hidden="true" className="size-1.5 rounded-full bg-red-600" />
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-paper lg:text-[3rem] lg:leading-[1.05]">
              Ready to Plan Your Next Event?
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-paper/90">
              Send the group size, the format and the month. We come back with a
              ground plan and a proposal where every line is clear.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href={RFQ_HREF} className={PILL.onDarkSolid}>
                Request a B2B quote
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
              </Link>
              <Link href="/contact" className={PILL.onDarkOutline}>
                Contact us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
