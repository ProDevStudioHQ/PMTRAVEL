import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgePercent, Headset, Package } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { CtaBanner, IconCards, PILL, SectionHeading, type IconItem } from "@/components/Modern";
import { Section } from "@/components/Section";
import { SiteImage } from "@/components/SiteImage";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { imageByKey } from "@/features/images/registry";
import { PROGRAMMES, programmeHref } from "@/features/programmes/data";
import { RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "B2B Programmes for Morocco",
  description:
    "Ready-to-contract Morocco programmes for travel agencies and tour operators, with B2B net rates and a dedicated operations team.",
  path: "/programmes",
});

/*
  CONTENT CHECK: "more than 30 travel agencies" and "24/7 support" were
  supplied by the client, who confirmed they should be published as written.
  docs/START.md asks that claims like these are backed by records before
  launch; keep the evidence for both on file.
*/
const BENEFITS: IconItem[] = [
  {
    icon: Package,
    title: "Exclusive Programmes",
    body: "Access to selected B2B travel packages.",
  },
  {
    icon: BadgePercent,
    title: "B2B Net Rates",
    body: "Competitive prices for partners.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    body: "A dedicated team, always available.",
  },
];

/** Where every programme runs: Marrakech and the three places around it. */
const REGIONS = ["Marrakech", "Imlil", "Ourika", "Agafay"];

/** The experiences the programmes mix. */
const EXPERIENCES = ["Souks", "Lunch chez l'habitant", "Trekking", "E-bike", "Quad", "Camel ride", "Camp dinner"];

export default function ProgrammesPage() {
  return (
    <>
      <DestinationHero
        title="Your B2B Portal for Travel in Morocco"
        standfirst="Join more than 30 travel agencies worldwide who trust us for their Morocco operations."
        imageKey="c7-ait-ben-haddou"
        kicker="B2B programmes"
        trail={[{ href: "/programmes", label: "B2B Programmes" }]}
        stats={[
          { value: String(PROGRAMMES.length), label: "Programmes" },
          { value: String(REGIONS.length), label: "Regions around Marrakech" },
        ]}
      >
        <a href="#programmes" className={PILL.onDarkSolid}>
          Browse programmes
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </a>
        <Link href={RFQ_HREF} className={PILL.onDarkOutline}>
          Request a B2B quote
        </Link>
      </DestinationHero>

      <Section tone="paper-2">
        <SectionHeading eyebrow="Partner benefits" title="Why agencies work with our programmes" />
        <div className="mt-12">
          <IconCards items={BENEFITS} columns={3} />
        </div>
      </Section>

      <Section id="programmes">
        <SectionHeading eyebrow="Programmes" title="Ready-to-contract Morocco programmes">
          <p>
            Every programme runs in Marrakech, Imlil, the Ourika valley and
            Agafay, mixing the experiences below differently, for buyers in
            Europe, the USA and Canada. Operated by our team in Marrakech and
            sold under your own brand.
          </p>
        </SectionHeading>
        <div className="mt-8 flex flex-col gap-3">
          <ul className="flex flex-wrap gap-2" aria-label="Regions">
            {REGIONS.map((region) => (
              <li key={region} className="rounded-full bg-ink-900 px-4 py-1.5 text-sm font-semibold text-paper">
                {region}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2" aria-label="Experiences">
            {EXPERIENCES.map((experience) => (
              <li key={experience} className="rounded-full border border-rule bg-paper-2 px-4 py-1.5 text-sm font-medium text-ink-900">
                {experience}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {PROGRAMMES.map((programme) => (
            <li key={programme.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-rule bg-paper transition-[border-color,box-shadow] duration-200 hover:border-red-600 hover:shadow-overlay">
                <div className="relative aspect-[16/10] bg-ink-900">
                  {imageByKey(programme.cardImage) ? (
                    <SiteImage
                      imageKey={programme.cardImage}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-ink-900 px-3 py-1 font-display text-xs font-bold text-paper">{programme.code}</span>
                    {programme.customPage ? (
                      <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-paper">Signature programme</span>
                    ) : null}
                  </div>
                  <span aria-hidden="true" className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-paper/90 text-red-900 transition-colors duration-200 group-hover:bg-red-600 group-hover:text-paper">
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <ul className="flex flex-wrap gap-1.5">
                    {programme.markets.map((market) => (
                      <li key={market} className="rounded-full bg-red-050 px-2.5 py-0.5 text-xs font-semibold text-red-900">
                        {market}
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink-900">
                    <Link href={programmeHref(programme)} className="after:absolute after:inset-0 after:content-['']">
                      {programme.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-red-600">{programme.tagline}</p>
                  <p className="mt-3 line-clamp-3 text-base text-ink-500">{programme.summary}</p>
                  <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5" aria-label="Experiences">
                    {programme.experiences.map((experience) => (
                      <li key={experience} className="rounded-full border border-rule px-2.5 py-0.5 text-xs text-ink-900">
                        {experience}
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-rule pt-5 text-sm">
                    <div>
                      <dt className="text-ink-500">Format</dt>
                      <dd className="font-semibold text-ink-900">{programme.format}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-500">Group</dt>
                      <dd className="font-semibold text-ink-900">{programme.groupType}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper-2">
        <CtaBanner
          title="Looking for a programme we have not listed?"
          imageKey="c7-ait-ben-haddou"
          primary={{ href: RFQ_HREF, label: "Request a B2B quote" }}
          secondary={{ href: "/contact", label: "Contact the office" }}
        >
          <p>
            Tell us your market, your clients and the season. We build and cost
            the ground programme for your dates.
          </p>
        </CtaBanner>
      </Section>
    </>
  );
}
