import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cmsPageMetadata } from "@/lib/page-seo";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { B2BServiceCard, IconTile } from "@/components/cards";
import { LeisureCard } from "@/components/templates/LeisureCard";
import { CarvedDivider } from "@/components/motion/CarvedDivider";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { FaqSection } from "@/components/FaqSection";
import { CtaBand } from "@/components/CtaBand";
import { HOME_AUDIENCES, PARTNER_PROCESS } from "@/content/b2b";
import { EXPERIENCES } from "@/content/leisure";
import { DMC_SERVICES, PARTNER_BENEFITS, TRADE_FAQS } from "@/content/home";
import { PARTNER_HREF, RFQ_HREF, TRUST_POINTS } from "@/lib/company";
import { en } from "@/i18n/dictionaries/en";

export const generateMetadata = cmsPageMetadata({
  title: "Morocco DMC for Travel Agencies & Tour Operators | PM Travel Agency",
  absoluteTitle: true,
  description:
    "Marrakech DMC and ground handler for travel agencies, tour operators, advisors and MICE planners. Net rates, white-label service and 24/7 support in Morocco.",
  path: "/",
});

function TrustStrip() {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-sand/15 bg-sand/15 backdrop-blur-sm sm:grid-cols-4">
      {TRUST_POINTS.map((point) => (
        <li key={point.caption} className="bg-midnight/55 px-5 py-4">
          <p className="font-display text-xl text-sand sm:text-2xl">
            {point.value !== null ? <Counter value={point.value} prefix={point.prefix} suffix={point.suffix} /> : point.text}
          </p>
          <p className="mt-1 text-xs tracking-wide text-sand/75">{point.caption}</p>
        </li>
      ))}
    </ul>
  );
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <PageHero
        full
        path="/"
        eyebrow="Morocco DMC · Marrakech"
        title="Your Ground Partner in Morocco."
        imageKey="b1-marrakech-hero"
        standfirst="We design and operate Morocco programmes for travel agencies, tour operators, advisors and MICE planners — net rates, white-label service and one local team from arrival to departure."
        below={<TrustStrip />}
      >
        <ButtonLink href={RFQ_HREF} tone="dark" arrow>
          {en.cta.b2bQuote}
        </ButtonLink>
        <ButtonLink href={PARTNER_HREF} variant="secondary" tone="dark">
          {en.cta.partner}
        </ButtonLink>
      </PageHero>

      {/* 2. Who we work with */}
      <Section tone="sand" aria-labelledby="who">
        <SectionHeading id="who" eyebrow="Who we work with" title="Built for the travel trade">
          One Marrakech team for every kind of travel professional selling Morocco.
        </SectionHeading>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_AUDIENCES.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.06}>
              <IconTile icon={a.icon} title={a.name} body={a.cardLine} href={`/b2b/${a.slug}`} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 3. What partners get */}
      <Section tone="midnight" aria-labelledby="benefits">
        <SectionHeading id="benefits" eyebrow="What partners get" title="Everything a ground partner should be" onDark>
          Net rates, your brand, fast proposals and a team that answers — before, during and after the trip.
        </SectionHeading>
        {/* 8 benefits + the partner card fill a clean 3 x 3 grid. */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNER_BENEFITS.map((b, i) => (
            <Reveal as="li" key={b.title} delay={(i % 3) * 0.08}>
              <IconTile icon={b.icon} title={b.title} body={b.body} onDark />
            </Reveal>
          ))}
          <Reveal as="li" delay={0.16}>
            <Link href={PARTNER_HREF} className="card-lift group flex h-full flex-col justify-between rounded-card bg-terracotta-600 p-7 text-white">
              <span className="font-display text-[1.5rem] leading-tight">Become a Partner</span>
              <span className="mt-6 text-sm text-white/90">Open a trade account and get our partner rates.</span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                Apply now <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
              </span>
            </Link>
          </Reveal>
        </ul>
      </Section>

      {/* 4. DMC services */}
      <Section tone="white" aria-labelledby="services">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="services" eyebrow="DMC services" title="Every ground service, one local team" />
          <Link href="/b2b/dmc-services" className="group inline-flex min-h-11 items-center gap-2 font-medium text-terracotta-700">
            All DMC services <ArrowRight aria-hidden="true" size={18} className="arrow-slide" />
          </Link>
        </div>
        <ul className="swipe-row mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DMC_SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 4) * 0.08}>
              <B2BServiceCard icon={s.icon} title={s.title} href={RFQ_HREF} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 5. How partnership works */}
      <Section tone="sand" aria-labelledby="process">
        <CarvedDivider className="mb-14" />
        <SectionHeading id="process" eyebrow="How partnership works" title="From brief to departure in four steps" align="center" />
        <ProcessTimeline steps={PARTNER_PROCESS} />
        <div className="mt-14 flex justify-center">
          <ButtonLink href={RFQ_HREF} arrow>
            Send your brief
          </ButtonLink>
        </div>
      </Section>

      {/* 6. Signature experiences */}
      <Section tone="white" aria-labelledby="experiences">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="experiences" eyebrow="Signature experiences" title="What your clients will remember">
            The product we build into your programmes, from palace stays to desert nights.
          </SectionHeading>
          <Link href="/experiences" className="group inline-flex min-h-11 items-center gap-2 font-medium text-terracotta-700">
            Explore all experiences <ArrowRight aria-hidden="true" size={18} className="arrow-slide" />
          </Link>
        </div>
        <ul className="swipe-row mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((e, i) => (
            <Reveal as="li" key={e.slug} delay={(i % 3) * 0.08}>
              <LeisureCard product={e} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 7. Trade FAQ */}
      <FaqSection eyebrow="Trade FAQ" heading="Questions travel professionals ask us" faqs={TRADE_FAQS} intro="Anything else? Ask the ops desk on WhatsApp." />

      {/* 8. Final CTA */}
      <CtaBand />
    </>
  );
}
