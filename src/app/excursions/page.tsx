import Link from "next/link";
import { ArrowRight, ArrowUpRight, Car, MapPin, Tag, UsersRound } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { CtaBanner, IconCards, PILL, SectionHeading, type IconItem } from "@/components/Modern";
import { Section } from "@/components/Section";
import { SiteImage } from "@/components/SiteImage";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { imageByKey } from "@/features/images/registry";
import { EXCURSIONS, excursionHref, type Excursion } from "@/features/excursions/data";
import { ExcursionFinder, type FinderItem } from "@/features/excursions/ExcursionFinder";
import { RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "B2B Excursions from Marrakech",
  description:
    "Day, half-day and evening excursions around Marrakech, Imlil, Ourika and Agafay for travel agencies: souks, treks, e-bike, quad, camels and camp dinners.",
  path: "/excursions",
});

const BENEFITS: IconItem[] = [
  {
    icon: Car,
    title: "Pickup in Marrakech",
    body: "Collection from hotels, and from the nearest agreed meeting point for riads inside the medina.",
  },
  {
    icon: UsersRound,
    title: "Private or shared",
    body: "Every excursion runs private for your clients or shared in small groups, and scales for incentives.",
  },
  {
    icon: Tag,
    title: "Under your brand",
    body: "Sell them on their own or add them to a programme, white-label, with B2B net rates.",
  },
];

const REGIONS = ["Marrakech", "Imlil", "Ourika", "Agafay", "Essaouira"];

/** Evening and afternoon-and-evening excursions are one choice for a buyer. */
const LENGTHS = ["Half day", "Full day", "Evening"];

const LEVELS = ["Easy", "Moderate", "Active"];

const lengthOf = (excursion: Excursion) => (excursion.duration.includes("evening") ? "Evening" : excursion.duration);

/** "Imlil & Agafay" belongs under both regions. */
const regionsOf = (excursion: Excursion) => REGIONS.filter((region) => excursion.region.includes(region));

const LEVEL_STYLE = {
  Easy: "bg-status-verified/10 text-status-verified",
  Moderate: "bg-status-progress/10 text-status-progress",
  Active: "bg-red-050 text-red-900",
} as const;

function ExcursionCard({ excursion }: { excursion: Excursion }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-rule bg-paper transition-[border-color,box-shadow] duration-200 hover:border-red-600 hover:shadow-overlay">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
        {imageByKey(excursion.cardImage) ? (
          <SiteImage
            imageKey={excursion.cardImage}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : null}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900/70 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-ink-900 px-3 py-1 font-display text-xs font-bold text-paper">
          {excursion.code}
        </span>
        <span aria-hidden="true" className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-paper/90 text-red-900 transition-colors duration-200 group-hover:bg-red-600 group-hover:text-paper">
          <ArrowUpRight size={18} strokeWidth={2} />
        </span>
        <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-semibold text-paper">
          <MapPin aria-hidden="true" size={15} strokeWidth={2} />
          {excursion.region}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-paper-2 px-2.5 py-0.5 text-xs font-semibold text-ink-900">{excursion.duration}</span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${LEVEL_STYLE[excursion.level]}`}>{excursion.level}</span>
        </div>
        <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-ink-900">
          <Link href={excursionHref(excursion)} className="after:absolute after:inset-0 after:content-['']">
            {excursion.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-ink-500">{excursion.summary}</p>
        <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5" aria-label="Experiences">
          {excursion.experiences.map((experience) => (
            <li key={experience} className="rounded-full border border-rule px-2.5 py-0.5 text-xs text-ink-900">
              {experience}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function ExcursionsPage() {
  const items: FinderItem[] = EXCURSIONS.map((excursion) => ({
    slug: excursion.slug,
    regions: regionsOf(excursion),
    length: lengthOf(excursion),
    level: excursion.level,
    card: <ExcursionCard excursion={excursion} />,
  }));

  return (
    <>
      <DestinationHero
        title="B2B Excursions from Marrakech"
        standfirst="Day, half-day and evening excursions in and around Marrakech, Imlil, the Ourika valley, Agafay and Essaouira, ready to sell on their own or add to your programmes."
        imageKey="e01-merzouga-quads"
        kicker="B2B excursions"
        trail={[{ href: "/excursions", label: "B2B Excursions" }]}
        stats={[
          { value: String(EXCURSIONS.length), label: "Excursions" },
          { value: String(REGIONS.length), label: "Regions around Marrakech" },
        ]}
      >
        <a href="#excursions" className={PILL.onDarkSolid}>
          Browse excursions
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </a>
        <Link href={RFQ_HREF} className={PILL.onDarkOutline}>
          Request net rates
        </Link>
      </DestinationHero>

      <Section id="excursions">
        <SectionHeading eyebrow="Excursions" title="Choose by region, length and level">
          <p>
            Souks, village walks, lunch chez l&rsquo;habitant, treks, e-bike,
            quad, camel rides and dinners in a desert camp.
          </p>
        </SectionHeading>

        <div className="mt-10">
          <ExcursionFinder items={items} regions={REGIONS} lengths={LENGTHS} levels={LEVELS} />
        </div>
      </Section>

      <Section tone="paper-2">
        <SectionHeading eyebrow="How it works" title="Built for agencies to resell" />
        <div className="mt-12">
          <IconCards items={BENEFITS} columns={3} />
        </div>
      </Section>

      <Section>
        <CtaBanner
          title="Need an excursion we have not listed?"
          imageKey="b4-atlas-imlil"
          primary={{ href: RFQ_HREF, label: "Request net rates" }}
          secondary={{ href: "/programmes", label: "See B2B programmes" }}
        >
          <p>Tell us what your clients want to do around Marrakech. We design and cost it for your dates and group size.</p>
        </CtaBanner>
      </Section>
    </>
  );
}
