import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BedDouble,
  Briefcase,
  Bus,
  ClipboardList,
  Compass,
  FileText,
  Gem,
  Globe,
  Handshake,
  Headset,
  Languages,
  Layers,
  ListChecks,
  Map as MapIcon,
  MapPin,
  PlaneLanding,
  Presentation,
  Route,
  ScanSearch,
  Send,
  ShieldCheck,
  Store,
  UserRound,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/Container";
import { SiteImage } from "@/components/SiteImage";
import { StatusChip, type Status } from "@/components/StatusChip";
import { HomeHero } from "@/features/images/HomeHero";
import { imageByKey } from "@/features/images/registry";
import { routeBySlug } from "@/features/routes/data";
import { publishedFigures } from "@/features/routes/publish";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: `${COMPANY.positioning} | ${COMPANY.name}`,
  description:
    "The Morocco ground partner for travel professionals: accommodation, transport, guides, MICE and full ground handling, run from Marrakech.",
  path: "/",
});

const pill =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-colors duration-200";

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

const TRUST: { icon: LucideIcon; title: string; detail: string }[] = [
  { icon: Compass, title: "Morocco Ground Operations", detail: "We run what happens on the ground" },
  { icon: Handshake, title: "B2B Focused", detail: "Travel trade only, white-label" },
  { icon: MapPin, title: "Marrakech Based", detail: `Office in ${COMPANY.address.district}` },
  { icon: Languages, title: "Multilingual Team", detail: `${COMPANY.languages.length} working languages` },
  { icon: Headset, title: "Human Support", detail: "A person, not a ticket queue" },
];

const SERVICES: { icon: LucideIcon; title: string; body: string; href: string }[] = [
  {
    icon: BedDouble,
    title: "Accommodation",
    body: "Hotels, riads and desert camps sourced and matched to the group, with rooming handled end to end.",
    href: "/morocco-dmc#accommodation",
  },
  {
    icon: Bus,
    title: "Transport",
    body: "Vehicle class matched to the road and the group, drivers briefed to the day plan.",
    href: "/morocco-dmc#transport",
  },
  {
    icon: UserRound,
    title: "Guides & Experiences",
    body: "Licensed guides briefed to your itinerary, and experiences timed against the real day.",
    href: "/morocco-dmc#guiding",
  },
  {
    icon: Presentation,
    title: "MICE & Events",
    body: "Meetings, incentives, conferences and gala evenings, with venues checked before they are proposed.",
    href: "/mice",
  },
  {
    icon: UtensilsCrossed,
    title: "Dining",
    body: "Restaurants, private dinners and galas, with dietary handling and timing coordinated.",
    href: "/mice",
  },
  {
    icon: MapIcon,
    title: "Excursions & Circuits",
    body: "Day trips and multi-day circuits planned around where the group sleeps each night.",
    href: "/destinations",
  },
  {
    icon: PlaneLanding,
    title: "Meet & Assist",
    body: "Manifest-led airport arrivals, flight monitoring and a clean handover into the programme.",
    href: "/morocco-dmc#airport",
  },
  {
    icon: Layers,
    title: "Full Ground Handling",
    body: "Everything above under one file, one coordinator and one point of contact.",
    href: "/morocco-dmc",
  },
];

const WHY: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: BadgeCheck,
    title: "Verified Information",
    body: "What we tell you has been checked on the ground. What has not been checked is labelled, never guessed.",
  },
  {
    icon: ListChecks,
    title: "Clear Service Status",
    body: "Every service is marked requested, on option or confirmed, so nothing unconfirmed ever looks confirmed.",
  },
  {
    icon: ShieldCheck,
    title: "Backup Thinking",
    body: "Every vehicle, venue and outdoor moment has a named fallback before the day, not during it.",
  },
  {
    icon: Headset,
    title: "One Point of Coordination",
    body: "One coordinator holds your file from the brief to the last departure, and answers when things change.",
  },
];

const GLANCE: { slug: string; name: string; line: string; imageKey: string; feature?: boolean }[] = [
  { slug: "marrakech", name: "Marrakech", line: "Our base and the arrival hub for most programmes", imageKey: "b1-marrakech-hero", feature: true },
  { slug: "agafay", name: "Agafay", line: "Desert evenings close to the city", imageKey: "b3b-agafay-camp" },
  { slug: "atlas", name: "Atlas / Imlil", line: "Mountain days and crossings south", imageKey: "b4-atlas-imlil" },
  { slug: "essaouira", name: "Essaouira", line: "The Atlantic coast", imageKey: "b5-essaouira-port" },
  { slug: "fes", name: "Fes", line: "Imperial city and medina", imageKey: "b7-fes-medina" },
  { slug: "merzouga", name: "Merzouga", line: "Sahara dunes and camps", imageKey: "b6-merzouga" },
];

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Send,
    title: "Send Your Brief",
    body: "Dates, destinations, group profile and what the programme has to achieve. A rough outline is enough to start.",
  },
  {
    icon: ClipboardList,
    title: "We Build the Ground Plan",
    body: "Suppliers, vehicles, guides and timings matched to the itinerary, with a backup for every movement.",
  },
  {
    icon: FileText,
    title: "Receive Your Proposal",
    body: "A costed proposal where every line states whether the service is requested, on option or confirmed.",
  },
  {
    icon: Headset,
    title: "We Coordinate on the Ground",
    body: "One coordinator runs the programme from arrival to departure and handles changes on the day.",
  },
];

const AUDIENCES: { icon: LucideIcon; title: string; body: string; href: string }[] = [
  {
    icon: Globe,
    title: "Tour Operators",
    body: "Series and ad hoc groups operated under your brand, with one file per departure.",
    href: "/b2b",
  },
  {
    icon: Store,
    title: "Travel Agencies",
    body: "Tailor-made FIT and small groups, quoted clearly and run white-label.",
    href: "/b2b",
  },
  {
    icon: Presentation,
    title: "MICE Planners",
    body: "Meetings, incentives and events with venues checked before they are proposed.",
    href: "/mice",
  },
  {
    icon: Gem,
    title: "Luxury Travel Advisors",
    body: "Private itineraries with discreet handling, selected riads and briefed private guides.",
    href: "/b2b",
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    body: "Business travel, roadshows and delegations with dependable transfers and one point of contact.",
    href: "/mice",
  },
];

const INTELLIGENCE: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Route,
    title: "Route intelligence",
    body: "Drive times published only after our own drivers have driven and logged the route.",
  },
  {
    icon: ScanSearch,
    title: "Venue inspection",
    body: "Capacities and access recorded on site, with the date of the inspection.",
  },
  {
    icon: ListChecks,
    title: "Service status model",
    body: "Every line of a quote marked requested, on option, held or confirmed.",
  },
];

/** Popular legs. The status comes from the drive logs, never from this list. */
const POPULAR_ROUTES: { destination: string; routeSlug?: string; fallbackHref: string }[] = [
  { destination: "Agafay", routeSlug: "marrakech-agafay", fallbackHref: "/destinations/agafay" },
  { destination: "Essaouira", routeSlug: "marrakech-essaouira", fallbackHref: "/destinations/essaouira" },
  { destination: "Aït Ben Haddou", fallbackHref: "/destinations/ait-ben-haddou" },
  { destination: "Ouarzazate", routeSlug: "marrakech-ouarzazate", fallbackHref: "/destinations/ouarzazate" },
  { destination: "Merzouga", routeSlug: "marrakech-merzouga", fallbackHref: "/destinations/merzouga" },
  { destination: "Fes", routeSlug: "marrakech-fes", fallbackHref: "/destinations/fes" },
];

function routeStatus(routeSlug?: string): { status: Status; label?: string; href?: string } {
  const route = routeSlug ? routeBySlug(routeSlug) : undefined;
  if (!route) return { status: "future", label: "Not yet logged" };
  const figures = publishedFigures(route);
  return figures
    ? { status: "verified", label: `Driven ${figures.sampleSize}×`, href: `/routes/${route.slug}` }
    : { status: "pending", href: `/routes/${route.slug}` };
}

/* -------------------------------------------------------------------------- */
/* Building blocks                                                            */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  children,
  onDark = false,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={`flex items-center gap-3 text-sm font-semibold ${onDark ? "text-paper/80" : "text-red-600"}`}>
        <span aria-hidden="true" className={`h-0.5 w-8 rounded-full ${onDark ? "bg-paper/60" : "bg-red-600"}`} />
        {eyebrow}
      </p>
      <h2
        className={`mt-4 max-w-[22ch] text-2xl font-bold tracking-tight lg:text-[2.75rem] lg:leading-[1.08] ${
          onDark ? "text-paper" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {children ? (
        <div className={`measure mt-5 text-lg ${onDark ? "text-paper/85" : "text-ink-500"}`}>{children}</div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HomeHero />

      {/* 2. Positioning / trust bar, lifted over the foot of the hero */}
      <section className="bg-paper-2">
        <Container className="relative z-10 -mt-16">
          <ul className="grid overflow-hidden rounded-2xl border border-rule bg-paper shadow-overlay sm:grid-cols-2 lg:grid-cols-5">
            {TRUST.map(({ icon: Icon, title, detail }) => (
              <li
                key={title}
                className="flex items-center gap-4 border-b border-rule p-5 last:border-b-0 sm:[&:nth-last-child(-n+1)]:col-span-2 lg:border-r lg:border-b-0 lg:last:border-r-0 lg:[&:nth-last-child(-n+1)]:col-span-1"
              >
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-050 text-red-600"
                >
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink-900">{title}</span>
                  <span className="mt-0.5 block text-xs text-ink-500">{detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>

        {/* 3. What We Do */}
        <Container className="py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="What we do" title="Everything your clients need on the ground in Morocco">
              <p>
                You keep the client, the brand and the margin. We run what happens
                after the aircraft doors open.
              </p>
            </SectionHeading>
            <Link href="/morocco-dmc" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-red-600">
              All services
              <ArrowRight aria-hidden="true" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ icon: Icon, title, body, href }, index) => {
              const featured = index === SERVICES.length - 1;
              return (
                <li key={title}>
                  <article
                    className={`group relative flex h-full flex-col rounded-2xl border p-6 transition-[border-color,box-shadow,background-color] duration-200 ${
                      featured
                        ? "surface-deep border-red-900 bg-red-900 text-paper hover:bg-red-600"
                        : "border-rule bg-paper hover:border-red-600 hover:shadow-raised"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex size-12 items-center justify-center rounded-xl transition-colors duration-200 ${
                        featured
                          ? "bg-paper/15 text-paper"
                          : "bg-red-050 text-red-600 group-hover:bg-red-600 group-hover:text-paper"
                      }`}
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <h3 className={`mt-5 font-display text-lg font-semibold ${featured ? "text-paper" : "text-ink-900"}`}>
                      <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                        {title}
                      </Link>
                    </h3>
                    <p className={`mt-2 flex-1 text-sm ${featured ? "text-paper/85" : "text-ink-500"}`}>{body}</p>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={18}
                      className={`mt-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        featured ? "text-paper" : "text-red-600"
                      }`}
                    />
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* 4. Why PM Travel */}
      <section className="surface-deep bg-red-900 text-paper">
        <Container className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <SectionHeading eyebrow="Why PM Travel" title="Built to be relied on, not just booked" onDark>
              <p>
                A Morocco programme fails in the details nobody checked. We are
                built around checking them, and around telling you plainly what
                is confirmed and what is not.
              </p>
              <Link href="/how-we-work" className={`${pill} mt-8 border border-paper/50 text-paper hover:bg-paper hover:text-red-900`}>
                How we work
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
              </Link>
            </SectionHeading>

            <ol className="grid gap-4 sm:grid-cols-2">
              {WHY.map(({ icon: Icon, title, body }, index) => (
                <li key={title} className="rounded-2xl border border-paper/15 bg-paper/[0.06] p-6">
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="flex size-12 items-center justify-center rounded-xl bg-paper text-red-900"
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span aria-hidden="true" className="tabular font-display text-3xl font-bold text-paper/25">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-paper">{title}</h3>
                  <p className="mt-2 text-sm text-paper/85">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 5. Morocco at a Glance */}
      <section className="bg-paper">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Morocco at a glance" title="The circuit we operate from Marrakech" />
            <Link href="/destinations" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-red-600">
              All destinations
              <ArrowRight aria-hidden="true" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="mt-12 grid auto-rows-[15rem] gap-4 sm:grid-cols-2 lg:auto-rows-[16rem] lg:grid-cols-3">
            {GLANCE.map((place) => (
              <li
                key={place.slug}
                className={place.feature ? "sm:col-span-2 sm:row-span-2" : ""}
              >
                <article className="surface-deep group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-2xl bg-ink-900">
                  {imageByKey(place.imageKey) ? (
                    <SiteImage
                      imageKey={place.imageKey}
                      fill
                      sizes={place.feature ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                      className="-z-10 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : null}
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink-900/90 via-ink-900/30 to-transparent" />
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-paper/15 text-paper backdrop-blur-sm transition-colors duration-200 group-hover:bg-paper group-hover:text-red-900"
                  >
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </span>
                  <div className={place.feature ? "p-8" : "p-6"}>
                    <h3 className={`font-display font-semibold text-paper ${place.feature ? "text-3xl" : "text-xl"}`}>
                      <Link href={`/destinations/${place.slug}`} className="after:absolute after:inset-0 after:content-['']">
                        {place.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-paper/85">{place.line}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 6. How It Works */}
      <section className="bg-paper-2">
        <Container className="py-20 lg:py-28">
          <SectionHeading eyebrow="How it works" title="From your brief to a programme running on the ground" className="mx-auto text-center [&_h2]:mx-auto [&_p]:justify-center">
            <p className="mx-auto">Four steps, one file, and one coordinator all the way through.</p>
          </SectionHeading>

          <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {/* Connector behind the step markers, desktop only. */}
            <span aria-hidden="true" className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-0.5 bg-linear-to-r from-red-600/20 via-red-600 to-red-600/20 lg:block" />
            {STEPS.map(({ icon: Icon, title, body }, index) => (
              <li key={title} className="relative flex flex-col items-center text-center">
                <span className="relative flex size-16 items-center justify-center rounded-2xl bg-red-600 text-paper shadow-overlay ring-8 ring-paper-2">
                  <Icon aria-hidden="true" size={26} strokeWidth={1.75} />
                  <span className="tabular absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-ink-900 font-display text-xs font-bold text-paper">
                    {index + 1}
                  </span>
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-ink-900">{title}</h3>
                <p className="mt-2 max-w-[28ch] text-sm text-ink-500">{body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex justify-center">
            <Link href={RFQ_HREF} className={`${pill} bg-red-600 text-paper shadow-raised hover:bg-red-900`}>
              Start with your brief
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
            </Link>
          </div>
        </Container>
      </section>

      {/* 7. Built for Travel Professionals */}
      <section className="bg-paper">
        <Container className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
            <SectionHeading eyebrow="Built for travel professionals" title="We work for the people who sell Morocco" className="self-start lg:sticky lg:top-24">
              <p>
                We do not sell to travellers directly. Every programme we run is
                operated for, and under the name of, a travel professional.
              </p>
            </SectionHeading>

            <ul className="flex flex-col gap-3">
              {AUDIENCES.map(({ icon: Icon, title, body, href }) => (
                <li key={title}>
                  <article className="group relative flex items-center gap-5 rounded-2xl border border-rule bg-paper p-5 transition-[border-color,box-shadow] duration-200 hover:border-red-600 hover:shadow-raised sm:p-6">
                    <span
                      aria-hidden="true"
                      className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-paper-2 text-red-600 transition-colors duration-200 group-hover:bg-red-600 group-hover:text-paper"
                    >
                      <Icon size={24} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-semibold text-ink-900">
                        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                          {title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-ink-500">{body}</p>
                    </div>
                    <ArrowRight
                      aria-hidden="true"
                      size={20}
                      className="hidden shrink-0 text-ink-500 transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-red-600 sm:block"
                    />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 8. Morocco Operations Intelligence + Popular Routes */}
      <section className="surface-deep relative isolate overflow-hidden bg-ink-900 text-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[40rem] rounded-full bg-red-900/40 blur-3xl"
        />
        <Container className="py-20 lg:py-28">
          <SectionHeading
            eyebrow="Morocco Operations Intelligence"
            title={
              <>
                More Than a DMC.
                <br />
                A Morocco Operations Intelligence Layer.
              </>
            }
            onDark
          >
            <p>
              Most Morocco information is repeated rather than checked. We build
              our own operational record, from routes driven and logged to venues
              inspected and services tracked by status, and we quote from it.
              Where something has not been measured yet, we say so.
            </p>
          </SectionHeading>

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {INTELLIGENCE.map(({ icon: Icon, title, body }) => (
              <li key={title} className="rounded-2xl border border-paper/12 bg-paper/[0.05] p-6">
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-xl bg-red-600 text-paper"
                >
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-paper">{title}</h3>
                <p className="mt-2 text-sm text-paper/80">{body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-20 flex flex-wrap items-end justify-between gap-4 border-t border-paper/12 pt-12">
            <div>
              <h3 className="font-display text-xl font-semibold text-paper lg:text-2xl">Popular Routes</h3>
              <p className="mt-2 text-base text-paper/75">
                The status of each leg comes straight from our drive logs.
              </p>
            </div>
            <Link href="/routes" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-paper">
              All route intelligence
              <ArrowRight aria-hidden="true" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_ROUTES.map(({ destination, routeSlug, fallbackHref }) => {
              const { status, label, href } = routeStatus(routeSlug);
              return (
                <li key={destination}>
                  <article className="group relative flex h-full flex-col gap-4 rounded-2xl border border-paper/12 bg-paper/[0.04] p-5 transition-colors duration-200 hover:border-paper/40 hover:bg-paper/[0.08]">
                    <h4 className="flex items-center gap-3 font-display text-lg font-semibold text-paper">
                      <Link href={href ?? fallbackHref} className="flex items-center gap-3 after:absolute after:inset-0 after:content-['']">
                        <span>Marrakech</span>
                        <ArrowRight aria-hidden="true" size={18} className="text-red-600" />
                        <span>{destination}</span>
                      </Link>
                    </h4>
                    <StatusChip status={status} label={label} onDark />
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* 9. Final CTA */}
      <section className="bg-paper">
        <Container className="py-20 lg:py-28">
          <div className="surface-deep relative isolate overflow-hidden rounded-[2rem] bg-red-900 px-6 py-14 text-paper sm:px-12 lg:px-16 lg:py-20">
            {imageByKey("b2-marrakech-medersa") ? (
              <>
                <SiteImage imageKey="b2-marrakech-medersa" fill sizes="(min-width: 1280px) 1056px, 100vw" className="-z-10 object-cover" />
                {/* red-900 at 90%: paper text stays above 9:1. */}
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-red-900 via-red-900/95 to-red-900/80" />
              </>
            ) : null}
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center">
              <div>
                <h2 className="max-w-[18ch] text-3xl font-bold tracking-tight text-paper lg:text-[3.25rem] lg:leading-[1.05]">
                  Planning Morocco? Let&rsquo;s Build the Ground Operation.
                </h2>
                <p className="measure mt-5 text-lg text-paper/90">
                  Send the brief as it stands. We come back with a ground plan,
                  the questions that matter, and a proposal where every line is
                  clear.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link href={RFQ_HREF} className={`${pill} bg-paper text-red-900 hover:bg-red-050`}>
                    Request a B2B Quote
                    <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                  </Link>
                  <a href={`mailto:${COMPANY.email.b2b}`} className={`${pill} border border-paper/50 text-paper hover:bg-paper hover:text-red-900`}>
                    Email the operations desk
                  </a>
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  "Rough briefs and draft itineraries welcome",
                  "Operated white-label, under your brand",
                  `A team based in ${COMPANY.address.city}`,
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-paper/15 bg-paper/[0.07] px-5 py-4 text-base text-paper backdrop-blur-sm"
                  >
                    <BadgeCheck aria-hidden="true" size={20} strokeWidth={1.75} className="shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
