import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgePercent, Headset, Package } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { CtaBanner, IconCards, PILL, SectionHeading, type IconItem } from "@/components/Modern";
import { Section } from "@/components/Section";
import { SiteImage } from "@/components/SiteImage";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { imageByKey } from "@/features/images/registry";
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

const PROGRAMMES = [
  {
    href: "/programmes/taste-of-marrakech",
    name: "Taste of Marrakech",
    tagline: "Morocco Through the Table",
    summary:
      "A 7-night culinary journey through Marrakech, the Atlas Mountains, Agafay and Essaouira, with hands-on cooking, markets, mountain activities and curated dining.",
    facts: ["7 nights / 8 days", "3 versions", "FIT, groups and incentives"],
    imageKey: "b2-marrakech-medersa",
  },
];

export default function ProgrammesPage() {
  return (
    <>
      <DestinationHero
        title="Your B2B Portal for Travel in Morocco"
        standfirst="Join more than 30 travel agencies worldwide who trust us for their Morocco operations."
        imageKey="c7-ait-ben-haddou"
        kicker="B2B programmes"
        trail={[{ href: "/programmes", label: "B2B Programmes" }]}
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
            Designed, costed and operated by our team in Marrakech, and sold under
            your own brand.
          </p>
        </SectionHeading>

        <ul className="mt-12 grid gap-6">
          {PROGRAMMES.map((programme) => (
            <li key={programme.href}>
              <article className="group relative grid overflow-hidden rounded-3xl border border-rule bg-paper shadow-raised transition-[border-color,box-shadow] duration-200 hover:border-red-600 hover:shadow-overlay lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                <div className="relative min-h-72 bg-ink-900">
                  {imageByKey(programme.imageKey) ? (
                    <SiteImage
                      imageKey={programme.imageKey}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : null}
                  <span className="absolute top-5 left-5 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-paper">
                    Signature programme
                  </span>
                </div>
                <div className="flex flex-col p-7 lg:p-10">
                  <p className="text-sm font-semibold text-red-600">{programme.tagline}</p>
                  <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900">
                    <Link href={programme.href} className="after:absolute after:inset-0 after:content-['']">
                      {programme.name}
                    </Link>
                  </h3>
                  <p className="mt-4 text-base text-ink-500">{programme.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {programme.facts.map((fact) => (
                      <li key={fact} className="rounded-full border border-rule bg-paper-2 px-3 py-1.5 text-sm text-ink-900">
                        {fact}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-red-600">
                    View the programme
                    <ArrowUpRight aria-hidden="true" size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
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
