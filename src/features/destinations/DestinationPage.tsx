import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CircleCheck,
  Landmark,
  MapPin,
  PartyPopper,
  Presentation,
  Route as RouteIcon,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { Evidence } from "@/components/Evidence";
import { FaqSection, type Faq } from "@/components/FaqSection";
import { Section } from "@/components/Section";
import { SiteImage } from "@/components/SiteImage";
import { RouteStatus } from "@/features/destinations/RouteStatus";
import { destinationBySlug } from "@/features/destinations/registry";
import { DestinationRail } from "@/features/images/DestinationRail";
import { DESTINATION_PAGE_IMAGES } from "@/features/images/keys";
import { imageByKey } from "@/features/images/registry";
import { RFQ_HREF } from "@/lib/nav";

const pillBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-colors duration-200";
const pillLight = `${pillBase} bg-paper text-red-900 hover:bg-red-050`;
const pillOutline = `${pillBase} border border-paper/60 text-paper hover:bg-paper hover:text-ink-900`;

type DestinationHeroProps = {
  title: string;
  standfirst: string;
  imageKey?: string;
  trail?: Crumb[];
  /** Label in the chip above the title. */
  kicker?: string;
  /** Headline figures shown as glass tiles under the actions. */
  stats?: { value: string; label: string }[];
  children?: ReactNode;
};

/**
 * Full-width photographic banner. A flat ink overlay plus a gradient at the
 * foot holds paper text above 7:1 whatever the photograph does. Without an
 * image record it falls back to plain red-900.
 */
export function DestinationHero({
  title,
  standfirst,
  imageKey,
  trail,
  kicker = "Morocco",
  stats,
  children,
}: DestinationHeroProps) {
  const hasImage = imageKey ? Boolean(imageByKey(imageKey)) : false;

  return (
    <section className="surface-deep relative isolate overflow-hidden bg-red-900 text-paper">
      {hasImage && imageKey ? (
        <>
          <SiteImage imageKey={imageKey} fill priority sizes="100vw" className="-z-10 object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-900/50" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-linear-to-t from-ink-900/90 to-transparent"
          />
        </>
      ) : null}

      <Container className="flex min-h-[30rem] flex-col pt-4 pb-14 lg:min-h-[36rem] lg:pb-20">
        {trail ? <Breadcrumbs trail={trail} onDark /> : null}

        <div className="mt-auto pt-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/10 px-3 py-1 text-xs font-medium text-paper backdrop-blur-sm">
            <MapPin aria-hidden="true" size={14} strokeWidth={2} />
            {kicker}
          </span>
          <h1 className="mt-5 max-w-[16ch] text-3xl font-bold tracking-tight text-paper sm:text-4xl lg:text-[5rem] lg:leading-none">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/90">{standfirst}</p>
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
          {stats?.length ? (
            <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse rounded-2xl border border-paper/20 bg-paper/10 px-4 py-4 backdrop-blur-sm"
                >
                  <dt className="mt-1 text-sm text-paper/85">{stat.label}</dt>
                  <dd className="tabular font-display text-3xl font-bold text-paper">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export type DestinationService = {
  icon: LucideIcon;
  title: string;
  body: string;
};

/** The five MICE categories, each with a fixed icon so every page reads the same way. */
const MICE_KINDS = {
  seminar: { icon: Presentation, title: "Seminars" },
  teambuilding: { icon: Users, title: "Team building" },
  gala: { icon: PartyPopper, title: "Gala evenings" },
  culture: { icon: Landmark, title: "Cultural activities" },
  incentive: { icon: Trophy, title: "Incentives" },
} satisfies Record<string, { icon: LucideIcon; title: string }>;

export type MiceActivity = { kind: keyof typeof MICE_KINDS; body: string };

type DestinationPageProps = {
  slug: string;
  title: string;
  standfirst: string;
  /** The introduction, as a run of <p> elements. */
  body: ReactNode;
  /** The leg from Marrakech, where there is one. */
  routeSlug?: string;
  services: DestinationService[];
  /** Meetings, incentives, conferences and events: what the destination offers a group. */
  mice: MiceActivity[];
  checklist: { title: string; items: string[]; evidence: string };
  faq: { heading: string; faqs: Faq[] };
  cta: { title: string; body: string };
};

/**
 * The shared destination page: photographic banner, introduction beside a
 * second photograph, the measured leg, what we operate, what we check, FAQ,
 * and a closing call to action with the other destinations.
 *
 * Every page keeps its own copy; this only decides how it is laid out.
 */
export function DestinationPage({
  slug,
  title,
  standfirst,
  body,
  routeSlug,
  services,
  mice,
  checklist,
  faq,
  cta,
}: DestinationPageProps) {
  const images = DESTINATION_PAGE_IMAGES[slug];
  const detail = images?.detail && imageByKey(images.detail) ? images.detail : undefined;
  const entry = destinationBySlug(slug);
  const summary = entry?.summary;
  const kicker = entry?.segments?.length
    ? entry.segments.join(" / ")
    : slug === "marrakech"
      ? "Our base in Morocco"
      : "Operated from Marrakech";

  // Sections alternate paper and paper-2 after the introduction.
  let toneIndex = 0;
  const nextTone = () => (toneIndex++ % 2 === 0 ? "paper-2" : "paper") as "paper" | "paper-2";
  const miceTone = nextTone();
  const routeTone = routeSlug ? nextTone() : undefined;
  const servicesTone = nextTone();
  const checklistTone = nextTone();
  const faqTone = nextTone();
  const closingTone = nextTone();

  return (
    <>
      <DestinationHero
        title={title}
        standfirst={standfirst}
        imageKey={images?.hero}
        kicker={kicker}
        trail={[
          { href: "/destinations", label: "Destinations" },
          { href: `/destinations/${slug}`, label: title },
        ]}
      >
        <Link href={RFQ_HREF} className={pillLight}>
          Request a B2B quote
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </Link>
        <a href="#operate" className={pillOutline}>
          What we operate
        </a>
      </DestinationHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-6 text-base text-ink-900 [&>p:first-child]:text-lg [&>p:first-child]:text-ink-900">
            {body}
          </div>

          <aside className="flex flex-col gap-6 self-start lg:sticky lg:top-24">
            {detail ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-paper-2 shadow-raised">
                <SiteImage
                  imageKey={detail}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="rounded-2xl border border-rule bg-paper-2 p-6">
              <p className="text-sm font-semibold text-ink-900">In short</p>
              {summary ? <p className="mt-2 text-base text-ink-500">{summary}</p> : null}
              <div className="mt-5 flex flex-col gap-1 border-t border-rule pt-4">
                <Link
                  href={RFQ_HREF}
                  className="group flex min-h-11 items-center justify-between text-sm font-semibold text-red-600"
                >
                  Request a B2B quote
                  <ArrowRight aria-hidden="true" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/routes"
                  className="group flex min-h-11 items-center justify-between text-sm font-semibold text-ink-900"
                >
                  Route intelligence
                  <ArrowRight aria-hidden="true" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone={miceTone} id="mice">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <div>
            <span
              aria-hidden="true"
              className="flex size-12 items-center justify-center rounded-xl bg-red-600 text-paper shadow-raised"
            >
              <PartyPopper size={22} strokeWidth={1.75} />
            </span>
            <h2 className="mt-5 max-w-[24ch] text-2xl font-bold tracking-tight text-ink-900">
              MICE events &amp; activities
            </h2>
            <p className="mt-4 text-base text-ink-500">
              How {title} works for meetings, incentives, conferences and events.
            </p>
            <Link
              href="/mice"
              className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-red-600"
            >
              MICE &amp; Events
              <ArrowRight aria-hidden="true" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="flex flex-col gap-3">
            {mice.map((activity) => {
              const { icon: Icon, title: kindTitle } = MICE_KINDS[activity.kind];
              return (
                <li
                  key={activity.kind}
                  className="flex items-start gap-4 rounded-2xl border border-rule bg-paper p-5 transition-colors duration-200 hover:border-red-600"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-050 text-red-600"
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <p className="text-base text-ink-500">
                    <span className="block font-semibold text-ink-900">{kindTitle}</span>
                    {activity.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {routeSlug && routeTone ? (
        <Section tone={routeTone}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center lg:gap-16">
            <div>
              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-xl bg-red-600 text-paper shadow-raised"
              >
                <RouteIcon size={22} strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 max-w-[24ch] text-2xl font-bold tracking-tight text-ink-900">
                The leg from Marrakech
              </h2>
              <p className="mt-4 text-base text-ink-500">
                Figures appear here only once our own drivers have logged the leg.
              </p>
            </div>
            <RouteStatus slug={routeSlug} />
          </div>
        </Section>
      ) : null}

      <Section tone={servicesTone} id="operate">
        <h2 className="max-w-[24ch] text-2xl font-bold tracking-tight text-ink-900">
          What we operate here
        </h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title: serviceTitle, body: serviceBody }) => (
            <li
              key={serviceTitle}
              className="group rounded-2xl border border-rule bg-paper p-6 transition-[border-color,box-shadow] duration-200 hover:border-red-600 hover:shadow-raised"
            >
              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-xl bg-red-050 text-red-600 transition-colors duration-200 group-hover:bg-red-600 group-hover:text-paper"
              >
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{serviceTitle}</h3>
              <p className="mt-2 text-sm text-ink-500">{serviceBody}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone={checklistTone}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <h2 className="max-w-[24ch] text-2xl font-bold tracking-tight text-ink-900">
              {checklist.title}
            </h2>
            <div className="mt-6">
              <Evidence note={checklist.evidence} />
            </div>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {checklist.items.map((item, index) => (
              <li
                key={item}
                className="flex gap-4 rounded-2xl border border-rule bg-paper p-5 text-base text-ink-900"
              >
                <span
                  aria-hidden="true"
                  className="tabular flex size-9 shrink-0 items-center justify-center rounded-full bg-red-600 font-display text-sm font-bold text-paper"
                >
                  {index + 1}
                </span>
                <span className="flex-1">{item}</span>
                <CircleCheck aria-hidden="true" size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-status-verified" />
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <FaqSection tone={faqTone} heading={faq.heading} faqs={faq.faqs} />

      <Section tone={closingTone}>
        <div className="surface-deep relative isolate overflow-hidden rounded-3xl bg-red-900 px-6 py-12 text-paper sm:px-12 lg:py-16">
          {images?.hero && imageByKey(images.hero) ? (
            <>
              <SiteImage imageKey={images.hero} fill sizes="(min-width: 1280px) 1056px, 100vw" className="-z-10 object-cover" />
              {/* red-900 at 88%: paper text stays above 9:1. */}
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-red-900/88" />
            </>
          ) : null}
          <h2 className="max-w-[24ch] text-2xl font-bold tracking-tight text-paper">{cta.title}</h2>
          <p className="measure mt-5 text-lg text-paper/90">{cta.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={RFQ_HREF} className={pillLight}>
              Request a B2B quote
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
            </Link>
            <Link href="/routes" className={pillOutline}>
              Route intelligence
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900">Explore other destinations</h2>
          <Link
            href="/destinations"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-red-600"
          >
            All destinations
            <ArrowRight aria-hidden="true" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-8">
          <DestinationRail exclude={slug} />
        </div>
      </Section>
    </>
  );
}
