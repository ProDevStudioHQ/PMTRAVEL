import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Backpack,
  CircleCheck,
  CirclePlus,
  Sparkles,
  Store,
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
import { EXCURSIONS, excursionBySlug, excursionHref, type ExcursionSpec } from "@/features/excursions/data";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

export const dynamicParams = false;

export function generateStaticParams() {
  return EXCURSIONS.map((excursion) => ({ slug: excursion.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const excursion = excursionBySlug(slug);
  if (!excursion) return {};
  return pageMetadata({
    title: excursion.seoTitle,
    description: excursion.seoDescription,
    path: excursionHref(excursion),
  });
}

export default async function ExcursionPage({ params }: Props) {
  const { slug } = await params;
  const excursion = excursionBySlug(slug);
  if (!excursion) notFound();

  const specs: ExcursionSpec[] = [
    { requirement: "Duration", answer: excursion.duration },
    { requirement: "Level", answer: excursion.level },
    { requirement: "Group", answer: excursion.groupType },
    { requirement: "Pickup", answer: "Hotels in Marrakech; riads the vehicle cannot reach use the nearest agreed meeting point" },
    { requirement: "Guiding", answer: `Available in ${COMPANY.languages.join(", ")}` },
    ...(excursion.extraSpecs ?? []),
    { requirement: "Dietary needs", answer: "Vegetarian, halal and allergies handled when known at booking" },
    { requirement: "Commercial terms", answer: "B2B net rates; commission and terms by market" },
    { requirement: "Cancellation", answer: "Stated clearly in every confirmation" },
    { requirement: "Branding", answer: "White-label under your brand, subject to contract" },
    { requirement: "Suppliers", answer: "Activity providers and camps confirmed per booking", pending: true },
    { requirement: "Timings", answer: "Confirmed per booking; drive times published only once logged", pending: true },
  ];

  const others = EXCURSIONS.filter((other) => other.slug !== excursion.slug).slice(0, 3);

  return (
    <>
      <DestinationHero
        title={excursion.name}
        standfirst={excursion.summary}
        imageKey={excursion.heroImage}
        kicker={`${excursion.code} · ${excursion.region}`}
        trail={[
          { href: "/excursions", label: "B2B Excursions" },
          { href: excursionHref(excursion), label: excursion.name },
        ]}
        stats={[
          { value: excursion.duration.replace("Afternoon & evening", "PM + eve"), label: "Duration" },
          { value: excursion.level, label: "Level" },
        ]}
      >
        <Link href={RFQ_HREF} className={PILL.onDarkSolid}>
          Request net rates
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </Link>
        <a href="#the-day" className={PILL.onDarkOutline}>
          See the day
        </a>
      </DestinationHero>

      {/* Overview */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading eyebrow="The excursion" title={excursion.tagline}>
              <p>{excursion.summary}</p>
            </SectionHeading>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Experiences">
              {excursion.experiences.map((experience) => (
                <li key={experience} className="rounded-full bg-red-050 px-3 py-1 text-sm font-semibold text-red-900">
                  {experience}
                </li>
              ))}
            </ul>
          </div>
          <aside className="self-start rounded-3xl border border-rule bg-paper-2 p-7">
            <p className="text-sm font-semibold text-ink-900">Highlights</p>
            <ul className="mt-5 flex flex-col gap-3">
              {excursion.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-base text-ink-900">
                  <CircleCheck aria-hidden="true" size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-red-600" />
                  {highlight}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      {/* The day */}
      <Section tone="paper-2" id="the-day">
        <SectionHeading eyebrow="How the day runs" title="The excursion, step by step" />
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {excursion.steps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col rounded-2xl border border-rule bg-paper p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-ink-900 px-3 py-1 font-display text-xs font-bold text-paper">{step.moment}</span>
                <span aria-hidden="true" className="tabular font-display text-2xl font-bold text-ink-900/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{step.body}</p>
            </li>
          ))}
        </ol>
        {imageByKey(excursion.cardImage) ? (
          <div className="relative mt-6 aspect-[21/9] overflow-hidden rounded-3xl bg-ink-900">
            <SiteImage imageKey={excursion.cardImage} fill sizes="(min-width: 1280px) 1056px, 100vw" className="object-cover" />
          </div>
        ) : null}
      </Section>

      {/* Included, options, bring */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { icon: CircleCheck, title: "Included", items: excursion.includes, tone: "text-status-verified" },
            { icon: CirclePlus, title: "Upgrades", items: excursion.options, tone: "text-red-600" },
            { icon: Backpack, title: "What to bring", items: excursion.bring, tone: "text-ink-500" },
          ].map(({ icon: Icon, title, items, tone }) => (
            <div key={title} className="rounded-3xl border border-rule bg-paper-2 p-7">
              <p className="flex items-center gap-2 text-sm font-semibold text-red-600">
                <Sparkles aria-hidden="true" size={16} />
                {title}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-ink-900">
                    <Icon aria-hidden="true" size={20} strokeWidth={1.75} className={`mt-0.5 shrink-0 ${tone}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Buyers */}
      <Section tone="paper-2">
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            { icon: UsersRound, title: "Ideal guests", items: excursion.idealFor, dark: false },
            { icon: Store, title: "Who sells it", items: excursion.buyers, dark: true },
          ].map(({ icon: Icon, title, items, dark }) => (
            <div key={title} className={`rounded-3xl border p-7 ${dark ? "surface-deep border-red-900 bg-red-900 text-paper" : "border-rule bg-paper"}`}>
              <span aria-hidden="true" className={`flex size-12 items-center justify-center rounded-xl ${dark ? "bg-paper text-red-900" : "bg-red-600 text-paper"}`}>
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className={`mt-5 font-display text-lg font-semibold ${dark ? "text-paper" : "text-ink-900"}`}>{title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item} className={`flex gap-2.5 text-base ${dark ? "text-paper/90" : "text-ink-500"}`}>
                    <span aria-hidden="true" className={`mt-2.5 size-1.5 shrink-0 rounded-full ${dark ? "bg-paper" : "bg-red-600"}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* B2B specifications */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16">
          <div className="self-start lg:sticky lg:top-24">
            <SectionHeading eyebrow="For agencies" title="What you need to sell it">
              <p>The details an agency needs before adding an excursion to its offer.</p>
            </SectionHeading>
            <Link href={RFQ_HREF} className={`${PILL.primary} mt-8`}>
              Request net rates
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-rule bg-paper">
            <dl>
              {specs.map((spec) => (
                <div
                  key={spec.requirement}
                  className="grid gap-1 border-b border-rule px-5 py-4 last:border-b-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6 sm:px-6"
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

      <FaqSection heading="What agencies ask" faqs={excursion.faqs} tone="paper-2" />

      <Section>
        <CtaBanner
          title={`Sell ${excursion.name}`}
          imageKey={excursion.heroImage}
          primary={{ href: RFQ_HREF, label: "Request net rates" }}
          secondary={{ href: `mailto:${COMPANY.email.b2b}`, label: "Email the operations desk" }}
        >
          <p>Tell us your market, the season and typical group size. We send net rates and booking conditions.</p>
        </CtaBanner>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900">More B2B excursions</h2>
          <Link href="/excursions" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-red-600">
            All excursions
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
                  <p className="text-xs font-semibold text-paper/80">
                    {other.region} · {other.duration}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-paper">
                    <Link href={excursionHref(other)} className="after:absolute after:inset-0 after:content-['']">
                      {other.name}
                    </Link>
                  </h3>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
