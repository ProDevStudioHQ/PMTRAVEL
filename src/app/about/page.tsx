import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IconTile } from "@/components/cards";
import { SiteImage } from "@/components/SiteImage";
import { CtaBand } from "@/components/CtaBand";
import { COMPANY, CREDENTIALS, PARTNER_HREF, RFQ_HREF, addressOneLine } from "@/lib/company";
import type { IconName } from "@/components/Icon";
import { en } from "@/i18n/dictionaries/en";

export const metadata = pageMetadata({
  title: "About Us | Marrakech DMC & Ground Handler",
  description:
    "About PM Travel Agency by Prestige Majestic Projects & Events: a Marrakech-based Morocco DMC working only with travel agencies, operators and MICE planners.",
  path: "/about",
});

const PRINCIPLES: { icon: IconName; title: string; body: string }[] = [
  { icon: "store", title: "Trade only", body: "We do not sell to travellers. Our clients are the agencies, operators and planners who do." },
  { icon: "map", title: "Run from Marrakech", body: "Operations are run from our office in Marrakech — not remotely, not through a third party." },
  { icon: "layers", title: "Your brand first", body: "White-label by default when you need it. The client relationship stays with you." },
  { icon: "clipboard-check", title: "Everything in writing", body: "Clear inclusions, written confirmations and no service presented as confirmed before it is." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A Marrakech DMC that works for the travel trade"
        standfirst={`${COMPANY.legalLine}: Morocco programmes designed, contracted and operated by one local team.`}
        imageKey="e16-ben-youssef-madrasa"
        trail={[{ href: "/about", label: "About" }]}
      >
        <ButtonLink href={PARTNER_HREF} tone="dark" arrow>
          {en.cta.partner}
        </ButtonLink>
      </PageHero>

      <Section tone="sand" aria-labelledby="story">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading id="story" eyebrow="Who we are" title="Your ground partner in Morocco">
              <div className="space-y-4">
                <p>
                  PM Travel Agency is the travel division of {COMPANY.parent}. We are a Destination Management Company and ground handler based in Marrakech,
                  working business to business with travel agencies, tour operators, travel advisors, MICE planners and corporate buyers.
                </p>
                <p>
                  Our partners sell Morocco. We design the programme with them, contract the hotels, riads, camps, guides and transport, and operate everything on
                  the ground — from the first airport welcome to the last transfer.
                </p>
                <p>Our team works in {COMPANY.languages.join(", ").replace(/, ([^,]*)$/, " and $1")}.</p>
              </div>
            </SectionHeading>
          </div>
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-3xl lg:col-span-6">
            <SiteImage imageKey="d3-mice-bahia-palace" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="principles">
        <SectionHeading id="principles" eyebrow="How we work" title="Four principles behind every file" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06}>
              <IconTile icon={p.icon} title={p.title} body={p.body} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="midnight" aria-labelledby="facts">
        <SectionHeading id="facts" eyebrow="Company details" title="The facts" onDark />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-sand/10 bg-sand/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Company", value: COMPANY.legalLine },
            { label: "Office", value: addressOneLine },
            { label: "Licence number", value: CREDENTIALS.licenceNumber ?? "[Add licence number]", placeholder: !CREDENTIALS.licenceNumber },
            { label: "Operating since", value: CREDENTIALS.yearFounded ? String(CREDENTIALS.yearFounded) : "[Add year founded]", placeholder: !CREDENTIALS.yearFounded },
          ].map((f) => (
            <div key={f.label} className="bg-midnight p-6">
              <dt className="text-xs tracking-[0.2em] text-gold uppercase">{f.label}</dt>
              <dd className={`mt-3 ${f.placeholder ? "text-terracotta-300" : "text-sand"}`}>{f.value}</dd>
            </div>
          ))}
        </dl>
        {/* CONTENT NEEDED: team section with real, named people who have agreed to be shown, and photos of the office. */}
        <p className="mt-8 text-sm text-sand/70">
          Photography on this site is licensed destination scenery, credited on our{" "}
          <Link href="/gallery#credits" className="text-sand underline decoration-gold underline-offset-4">
            gallery page
          </Link>
          .
        </p>
      </Section>

      <CtaBand primaryHref={RFQ_HREF} />
    </>
  );
}
