import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  CircleCheck,
  CirclePlus,
  Footprints,
  MapPin,
  Sparkles,
  Store,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { FaqSection } from "@/components/FaqSection";
import { CtaBanner, PILL, SectionHeading } from "@/components/Modern";
import { Section } from "@/components/Section";
import { SiteImage } from "@/components/SiteImage";
import { StatusChip } from "@/components/StatusChip";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { imageByKey } from "@/features/images/registry";
import { PROGRAMMES, programmeBySlug, programmeHref, type ProgrammeSpec } from "@/features/programmes/data";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

/** Hand-built programme pages live in their own folders; everything else is generated here. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PROGRAMMES.filter((programme) => !programme.customPage).map((programme) => ({ slug: programme.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programme = programmeBySlug(slug);
  if (!programme) return {};
  return pageMetadata({
    title: programme.seoTitle,
    description: programme.seoDescription,
    path: programmeHref(programme),
  });
}

export default async function ProgrammePage({ params }: Props) {
  const { slug } = await params;
  const programme = programmeBySlug(slug);
  if (!programme || programme.customPage) notFound();

  const stops = new Set(programme.route.map((stop) => stop.place)).size;
  const stats =
    programme.days && programme.nights
      ? [
          { value: String(programme.days), label: "Days" },
          { value: String(programme.nights), label: "Nights" },
          { value: String(stops), label: "Destinations" },
        ]
      : [
          { value: String(programme.itinerary.length), label: "Modules" },
          { value: String(stops), label: "Destinations" },
        ];

  const specs: ProgrammeSpec[] = [
    { requirement: "Format", answer: programme.format },
    { requirement: "Group type", answer: programme.groupType },
    { requirement: "Guiding", answer: programme.guiding },
    { requirement: "Accommodation", answer: programme.hotels },
    ...(programme.extraSpecs ?? []),
    { requirement: "Dietary needs", answer: "Vegetarian, halal and allergies handled with each supplier, stated in the proposal" },
    { requirement: "Backup", answer: "A named fallback for every critical service" },
    { requirement: "Working languages", answer: COMPANY.languages.join(", ") },
    { requirement: "Commercial terms", answer: "B2B net rates; commission and terms by market" },
    { requirement: "Cancellation", answer: "Stated clearly in every proposal" },
    { requirement: "Branding", answer: "White-label under your brand, subject to contract" },
    { requirement: "Suppliers", answer: "Hotels, camps and activities confirmed per departure", pending: true },
    { requirement: "Route timings", answer: "Published only once logged by our drivers", pending: true },
  ];

  const others = PROGRAMMES.filter((other) => other.slug !== programme.slug).slice(0, 3);

  return (
    <>
      <DestinationHero
        title={programme.name}
        standfirst={programme.summary}
        imageKey={programme.heroImage}
        kicker={`${programme.code} · ${programme.markets.join(" · ")}`}
        trail={[
          { href: "/programmes", label: "B2B Programmes" },
          { href: programmeHref(programme), label: programme.name },
        ]}
        stats={stats}
      >
        <Link href={RFQ_HREF} className={PILL.onDarkSolid}>
          Request the product sheet
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </Link>
        <a href="#itinerary" className={PILL.onDarkOutline}>
          See the itinerary
        </a>
      </DestinationHero>

      {/* Overview and route */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading eyebrow="The programme" title={programme.tagline}>
              <p>{programme.summary}</p>
            </SectionHeading>
            <ul className="mt-8 flex flex-col gap-3">
              {programme.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-base text-ink-900">
                  <CircleCheck aria-hidden="true" size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-red-600" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <aside className="self-start rounded-3xl border border-rule bg-paper-2 p-7">
            <p className="text-sm font-semibold text-ink-900">The route</p>
            <ol className="mt-5 flex flex-col">
              {programme.route.map((stop, index) => (
                <li key={`${stop.place}-${index}`} className="relative flex items-center gap-4 pb-5 last:pb-0">
                  {index < programme.route.length - 1 ? (
                    <span aria-hidden="true" className="absolute top-9 bottom-0 left-[1.1rem] w-0.5 bg-red-600/25" />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-paper"
                  >
                    <MapPin size={16} strokeWidth={2} />
                  </span>
                  <span className="flex flex-1 items-center justify-between gap-3">
                    <span className="font-display text-lg font-semibold text-ink-900">{stop.place}</span>
                    <span className="tabular rounded-full bg-paper px-3 py-1 text-sm font-semibold text-ink-900">{stop.nights}</span>
                  </span>
                </li>
              ))}
            </ol>
            <dl className="mt-6 grid gap-3 border-t border-rule pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-500">Format</dt>
                <dd className="text-right font-semibold text-ink-900">{programme.format}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-500">Guiding</dt>
                <dd className="text-right font-semibold text-ink-900">{programme.guiding}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </Section>

      {/* Itinerary */}
      <section id="itinerary" className="scroll-mt-16 bg-paper-2">
        <div className="mx-auto w-full max-w-[var(--container-site)] px-5 py-20 lg:px-[72px] lg:py-28">
          <SectionHeading
            eyebrow={programme.days ? "Day by day" : "The modules"}
            title={programme.days ? `${programme.days} days on the ground` : "Six modules to combine"}
          />
          <ol className="relative mt-14 flex flex-col gap-5 before:absolute before:top-4 before:bottom-4 before:left-7 before:hidden before:w-0.5 before:bg-red-600/20 before:content-[''] sm:before:block">
            {programme.itinerary.map((day) => {
              const hasImage = day.imageKey ? Boolean(imageByKey(day.imageKey)) : false;
              return (
                <li key={day.day} className="relative sm:pl-20">
                  <span
                    aria-hidden="true"
                    className="absolute top-6 left-0 hidden size-14 items-center justify-center rounded-2xl bg-red-600 text-center font-display text-xs leading-tight font-bold text-paper shadow-raised ring-8 ring-paper-2 sm:flex"
                  >
                    {day.day.replace("Day ", "").replace("Module ", "")}
                  </span>
                  <article
                    className={`grid overflow-hidden rounded-2xl border border-rule bg-paper ${
                      hasImage ? "md:grid-cols-[minmax(0,1fr)_15rem] lg:grid-cols-[minmax(0,1fr)_18rem]" : ""
                    }`}
                  >
                    <div className="p-6 lg:p-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="tabular rounded-full bg-ink-900 px-3 py-1 font-display text-xs font-bold text-paper">
                          {day.day}
                        </span>
                        <span className="text-sm text-ink-500">{day.place}</span>
                      </div>
                      <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">{day.title}</h3>
                      <p className="mt-3 text-base text-ink-500">{day.body}</p>
                      <p className="mt-4 flex items-center gap-2 text-sm text-ink-900">
                        <BedDouble aria-hidden="true" size={16} className="text-red-600" />
                        <span className="font-semibold">Overnight:</span> {day.overnight}
                      </p>
                    </div>
                    {hasImage && day.imageKey ? (
                      <div className="relative min-h-44 bg-paper-2">
                        <SiteImage imageKey={day.imageKey} fill sizes="(min-width: 1024px) 18rem, (min-width: 768px) 15rem, 100vw" className="object-cover" />
                      </div>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Who it is for */}
      <Section>
        <SectionHeading eyebrow="For buyers" title="Who it is for, and why it sells" />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {[
            { icon: UsersRound, title: "Ideal travellers", items: programme.idealFor },
            { icon: Store, title: "Who sells it", items: programme.buyers },
            { icon: TrendingUp, title: "Why it sells", items: programme.whyItSells },
          ].map(({ icon: Icon, title, items }, index) => (
            <div
              key={title}
              className={`rounded-3xl border p-7 ${index === 2 ? "surface-deep border-red-900 bg-red-900 text-paper" : "border-rule bg-paper-2"}`}
            >
              <span
                aria-hidden="true"
                className={`flex size-12 items-center justify-center rounded-xl ${index === 2 ? "bg-paper text-red-900" : "bg-red-600 text-paper"}`}
              >
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className={`mt-5 font-display text-lg font-semibold ${index === 2 ? "text-paper" : "text-ink-900"}`}>{title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item} className={`flex gap-2.5 text-base ${index === 2 ? "text-paper/90" : "text-ink-500"}`}>
                    <span aria-hidden="true" className={`mt-2.5 size-1.5 shrink-0 rounded-full ${index === 2 ? "bg-paper" : "bg-red-600"}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Included and options */}
      <Section tone="paper-2">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-rule bg-paper p-7 sm:p-9">
            <p className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <Footprints aria-hidden="true" size={16} />
              Included in the ground programme
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {programme.includes.map((item) => (
                <li key={item} className="flex gap-3 text-base text-ink-900">
                  <CircleCheck aria-hidden="true" size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-status-verified" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-500">International flights are not included.</p>
          </div>
          <div className="rounded-3xl border border-rule bg-paper p-7 sm:p-9">
            <p className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <Sparkles aria-hidden="true" size={16} />
              {programme.days ? "Upgrades and extensions" : "Sample combinations and upgrades"}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {programme.options.map((item) => (
                <li key={item} className="flex gap-3 text-base text-ink-900">
                  <CirclePlus aria-hidden="true" size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-red-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* B2B specifications */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16">
          <div className="self-start lg:sticky lg:top-24">
            <SectionHeading eyebrow="For product managers" title="What you need to contract it">
              <p>The questions a product manager asks before adding a programme to a portfolio.</p>
            </SectionHeading>
            <Link href={RFQ_HREF} className={`${PILL.primary} mt-8`}>
              Request the product sheet
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-rule bg-paper">
            <dl>
              {specs.map((spec) => (
                <div
                  key={spec.requirement}
                  className="grid gap-1 border-b border-rule px-5 py-4 last:border-b-0 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6 sm:px-6"
                >
                  <dt className="text-sm font-semibold text-ink-900">{spec.requirement}</dt>
                  <dd className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-500">
                    {spec.answer}
                    {spec.pending ? <StatusChip status="pending" /> : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <FaqSection heading="What product managers ask" faqs={programme.faqs} tone="paper-2" />

      <Section>
        <CtaBanner
          title={`Add ${programme.name} to your portfolio`}
          imageKey={programme.heroImage}
          primary={{ href: RFQ_HREF, label: "Request the product sheet" }}
          secondary={{ href: `mailto:${COMPANY.email.b2b}`, label: "Email the operations desk" }}
        >
          <p>
            Tell us your market, the season and the group profile. We send the
            product sheet and cost the programme for your dates.
          </p>
        </CtaBanner>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900">More B2B programmes</h2>
          <Link href="/programmes" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-red-600">
            All programmes
            <ArrowRight aria-hidden="true" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {others.map((other) => (
            <li key={other.slug}>
              <article className="surface-deep group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-ink-900">
                {imageByKey(other.cardImage) ? (
                  <SiteImage
                    imageKey={other.cardImage}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="-z-10 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : null}
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink-900/90 via-ink-900/35 to-transparent" />
                <span aria-hidden="true" className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-paper/15 text-paper backdrop-blur-sm group-hover:bg-paper group-hover:text-red-900">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
                <div className="p-6">
                  <p className="text-xs font-semibold text-paper/80">{other.markets.join(" · ")}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-paper">
                    <Link href={programmeHref(other)} className="after:absolute after:inset-0 after:content-['']">
                      {other.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-paper/85">{other.format}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
