import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { IconTile, ImageCard, LogoMarquee } from "@/components/cards";
import { Icon } from "@/components/Icon";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/FaqSection";
import { CtaBand } from "@/components/CtaBand";
import { HOME_AUDIENCES, PARTNER_PROCESS } from "@/content/b2b";
import { EXPERIENCES, leisureHref } from "@/content/leisure";
import { DMC_SERVICES, HOME_DESTINATIONS, PARTNER_BENEFITS, PARTNER_LOGOS, TESTIMONIALS, TRADE_FAQS } from "@/content/home";
import { COMPANY, CREDENTIALS, PARTNER_HREF, RFQ_HREF, TRUST_POINTS, addressOneLine } from "@/lib/company";
import { en } from "@/i18n/dictionaries/en";

export const metadata = pageMetadata({
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
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="benefits" eyebrow="What partners get" title="Everything a ground partner should be" onDark>
              Net rates, your brand, fast proposals and a team that answers — before, during and after the trip.
            </SectionHeading>
            <ButtonLink href={PARTNER_HREF} tone="dark" arrow className="mt-8">
              {en.cta.partner}
            </ButtonLink>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {PARTNER_BENEFITS.map((b, i) => (
              <Reveal as="li" key={b.title} delay={(i % 2) * 0.08}>
                <IconTile icon={b.icon} title={b.title} body={b.body} onDark />
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* 4. DMC services */}
      <Section tone="white" aria-labelledby="services">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="services" eyebrow="DMC services" title="Every ground service, one local team" />
          <Link href="/b2b/dmc-services" className="group inline-flex min-h-11 items-center gap-2 font-medium text-terracotta-700">
            All DMC services <ArrowRight aria-hidden="true" size={18} className="arrow-slide" />
          </Link>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {DMC_SERVICES.map((s) => (
            <li key={s.title} className="flex flex-col gap-4 bg-white p-6 sm:p-8">
              <span className="text-terracotta">
                <Icon name={s.icon} size={26} />
              </span>
              <h3 className="font-display text-[1.125rem] leading-snug font-medium">{s.title}</h3>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. How partnership works */}
      <Section tone="sand" aria-labelledby="process">
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
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((e, i) => (
            <Reveal as="li" key={e.slug} delay={(i % 3) * 0.08}>
              <ImageCard href={leisureHref(e)} imageKey={e.heroImage} title={e.name} line={e.cardLine} aspect="aspect-[4/5] sm:aspect-[3/4]" />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 7. Destinations */}
      <section className="bg-sand" aria-labelledby="destinations">
        <Container className="section-y !pb-0">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="destinations" eyebrow="Destinations" title="Where we operate">
              Based in Marrakech, operating across Morocco.
            </SectionHeading>
            <Link href="/destinations" className="group inline-flex min-h-11 items-center gap-2 font-medium text-terracotta-700">
              All destinations <ArrowRight aria-hidden="true" size={18} className="arrow-slide" />
            </Link>
          </div>
        </Container>
        <div
          className="scroller rail-pad mt-12 flex gap-5 overflow-x-auto pb-8"
          tabIndex={0}
          role="region"
          aria-label="Destinations, scroll horizontally"
        >
          {HOME_DESTINATIONS.map((d) => (
            <div key={d.slug} className="w-[78vw] max-w-[340px] shrink-0">
              <ImageCard href={`/destinations/${d.slug}`} imageKey={d.image} title={d.name} line={d.line} sizes="340px" aspect="aspect-[3/4]" />
            </div>
          ))}
        </div>
        <div className="pb-10 lg:pb-16" />
      </section>

      {/* 8. Proof & trust */}
      <Section tone="white" aria-labelledby="proof">
        <SectionHeading id="proof" eyebrow="Proof & trust" title="Partners who operate with us" />
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Testimonials items={TESTIMONIALS} />
          </div>
          <dl className="grid content-start gap-px overflow-hidden rounded-3xl border border-line bg-line lg:col-span-5">
            <div className="bg-sand p-6">
              <dt className="text-xs tracking-[0.2em] text-muted uppercase">Licence number</dt>
              <dd className="mt-2 font-display text-xl">{CREDENTIALS.licenceNumber ?? <span className="text-terracotta-700">[Add licence number]</span>}</dd>
            </div>
            <div className="bg-sand p-6">
              <dt className="text-xs tracking-[0.2em] text-muted uppercase">Years operating</dt>
              <dd className="mt-2 font-display text-xl">
                {CREDENTIALS.yearFounded ? `Since ${CREDENTIALS.yearFounded}` : <span className="text-terracotta-700">[Add year founded]</span>}
              </dd>
            </div>
            <div className="bg-sand p-6">
              <dt className="text-xs tracking-[0.2em] text-muted uppercase">Office</dt>
              <dd className="mt-2">
                <address className="not-italic">{addressOneLine}</address>
                <a href={COMPANY.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm text-terracotta-700 underline underline-offset-4">
                  Open in Google Maps
                </a>
              </dd>
            </div>
            <div className="bg-sand p-6">
              <dt className="text-xs tracking-[0.2em] text-muted uppercase">Parent company</dt>
              <dd className="mt-2">{COMPANY.parent}</dd>
            </div>
          </dl>
        </div>
        <div className="mt-14">
          <p className="mb-5 text-center text-xs tracking-[0.2em] text-muted uppercase">Selected partners</p>
          <LogoMarquee names={PARTNER_LOGOS} />
        </div>
      </Section>

      {/* 9. Trade FAQ */}
      <FaqSection eyebrow="Trade FAQ" heading="Questions travel professionals ask us" faqs={TRADE_FAQS} intro="Anything else? Ask the ops desk on WhatsApp." />

      {/* 10. Final CTA */}
      <CtaBand />
    </>
  );
}
