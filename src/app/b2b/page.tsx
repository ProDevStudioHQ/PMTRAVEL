import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cmsPageMetadata } from "@/lib/page-seo";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IconTile, ProofCard } from "@/components/cards";
import { CarvedDivider } from "@/components/motion/CarvedDivider";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { FaqSection } from "@/components/FaqSection";
import { CtaBand } from "@/components/CtaBand";
import { AUDIENCES, PARTNER_PROCESS } from "@/content/b2b";
import { PARTNER_BENEFITS, TESTIMONIALS, TRADE_FAQS } from "@/content/home";
import { PARTNER_HREF, RFQ_HREF, TRUST_POINTS } from "@/lib/company";
import { en } from "@/i18n/dictionaries/en";

export const generateMetadata = cmsPageMetadata({
  title: "B2B Travel Morocco | DMC & Ground Handler",
  description:
    "B2B travel in Morocco: DMC and ground handling for travel agencies, tour operators, advisors, groups and MICE. Net rates, white-label and 24/7 support.",
  path: "/b2b",
});

export default function B2BPage() {
  return (
    <>
      <PageHero
        eyebrow="B2B & DMC"
        title="A Morocco DMC built for the travel trade"
        standfirst="We work only with travel professionals. You keep the client; we design, cost and operate everything on the ground in Morocco."
        imageKey="d7-dmc-covered-souk"
        trail={[{ href: "/b2b", label: "B2B & DMC" }]}
      >
        <ButtonLink href={RFQ_HREF} tone="dark" arrow>
          {en.cta.b2bQuote}
        </ButtonLink>
        <ButtonLink href={PARTNER_HREF} variant="secondary" tone="dark">
          {en.cta.partner}
        </ButtonLink>
      </PageHero>

      <Section tone="sand" aria-labelledby="audiences">
        <SectionHeading id="audiences" eyebrow="Who we work with" title="Choose your business">
          Each page explains what we offer, how we work and answers the questions your team will ask.
        </SectionHeading>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={(i % 3) * 0.06}>
              <IconTile icon={a.icon} title={a.name} body={a.menuBlurb} href={`/b2b/${a.slug}`} />
            </Reveal>
          ))}
          <Reveal as="li" delay={0.12}>
            <Link href={PARTNER_HREF} className="card-lift group flex h-full flex-col justify-between rounded-card bg-terracotta-600 p-7 text-white">
              <span className="font-display text-[1.5rem] leading-tight">Become a Partner</span>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                Open a trade account <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
              </span>
            </Link>
          </Reveal>
        </ul>
      </Section>

      <Section tone="midnight" aria-labelledby="benefits">
        <SectionHeading id="benefits" eyebrow="What partners get" title="Why agencies and operators work with us" onDark />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_BENEFITS.map((b) => (
            <li key={b.title}>
              <IconTile icon={b.icon} title={b.title} body={b.body} onDark />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" aria-labelledby="process">
        <SectionHeading id="process" eyebrow="How partnership works" title="From brief to departure" align="center" />
        <ProcessTimeline steps={PARTNER_PROCESS} />
      </Section>

      <Section tone="sand" aria-labelledby="proof">
        <CarvedDivider className="mb-14" />
        <SectionHeading id="proof" eyebrow="Proof" title="What partners can count on" highlight="count" align="center" />
        <ul className="swipe-row mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.filter((p) => p.value !== null).map((p, i) => (
            <Reveal as="li" key={p.caption} delay={i * 0.08}>
              <ProofCard kind="figure" value={p.value!} prefix={p.prefix} suffix={p.suffix} caption={p.caption} />
            </Reveal>
          ))}
          <Reveal as="li" delay={0.24}>
            <ProofCard kind="quote" {...TESTIMONIALS[0]!} />
          </Reveal>
        </ul>
      </Section>

      <FaqSection eyebrow="Trade FAQ" heading="Questions from the trade" faqs={TRADE_FAQS} />
      <CtaBand />
    </>
  );
}
