import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cmsPageMetadata } from "@/lib/page-seo";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { B2BServiceCard, IconTile, TourCard } from "@/components/cards";
import { LeisureCard } from "@/components/templates/LeisureCard";
import { CarvedDivider } from "@/components/motion/CarvedDivider";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { FaqSection } from "@/components/FaqSection";
import { CtaBand } from "@/components/CtaBand";
import { isIconName, type IconName } from "@/components/Icon";
import { CmsImage } from "@/features/cms/CmsImage";
import { EXPERIENCES } from "@/content/leisure";
import { PARTNER_HREF, RFQ_HREF, TRUST_POINTS } from "@/lib/company";
import { getSection, type ResolvedCard } from "@/lib/sections";

export const generateMetadata = cmsPageMetadata({
  title: "Morocco DMC for Travel Agencies & Tour Operators | PM Travel Agency",
  absoluteTitle: true,
  description:
    "Marrakech DMC and ground handler for travel agencies, tour operators, advisors and MICE planners. Net rates, white-label service and 24/7 support in Morocco.",
  path: "/",
});

const CARD_SIZES = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 80vw";
const iconOf = (c: ResolvedCard, fallback: IconName): IconName => (isIconName(c.icon) ? c.icon : fallback);

function TrustStrip({ cards, custom }: { cards: ResolvedCard[]; custom: boolean }) {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-sand/15 bg-sand/15 backdrop-blur-sm sm:grid-cols-4">
      {custom
        ? cards.map((c, i) => (
            <li key={`${c.title}-${i}`} className="bg-midnight/55 px-5 py-4">
              <p className="font-display text-xl text-sand sm:text-2xl">{c.title}</p>
              <p className="mt-1 text-xs tracking-wide text-sand/75">{c.body}</p>
            </li>
          ))
        : TRUST_POINTS.map((point) => (
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

/*
 * Every section reads its texts and cards through getSection(): the built-in
 * content in src/content/home-sections.ts with the CRM's edits applied
 * (Website → Page sections). Markup and design are unchanged.
 */
export default async function HomePage() {
  const [hero, trust, who, benefits, services, process, experiences, faq, cta] = await Promise.all([
    getSection("/", "hero"),
    getSection("/", "trust"),
    getSection("/", "who"),
    getSection("/", "benefits"),
    getSection("/", "services"),
    getSection("/", "process"),
    getSection("/", "experiences"),
    getSection("/", "faq"),
    getSection("/", "cta"),
  ]);
  return (
    <>
      {/* 1. Hero */}
      <PageHero
        full
        path="/"
        eyebrow={hero.eyebrow ?? ""}
        title={hero.title ?? ""}
        imageKey="b1-marrakech-hero"
        standfirst={hero.intro ?? undefined}
        below={trust.hidden || !trust.cards.length ? undefined : <TrustStrip cards={trust.cards} custom={trust.customCards} />}
      >
        {hero.cards
          .filter((b) => b.href)
          .map((b, i) => (
            <ButtonLink key={`${b.title}-${i}`} href={b.href!} tone="dark" variant={i === 0 ? undefined : "secondary"} arrow={i === 0}>
              {b.title}
            </ButtonLink>
          ))}
      </PageHero>

      {/* 2. Who we work with */}
      {who.hidden ? null : (
        <Section tone="sand" aria-labelledby="who">
          <SectionHeading id="who" eyebrow={who.eyebrow ?? undefined} title={who.title ?? ""}>
            {who.intro}
          </SectionHeading>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {who.cards.map((c, i) => (
              <Reveal as="li" key={`${c.title}-${i}`} delay={i * 0.06}>
                <IconTile icon={iconOf(c, "users")} title={c.title} body={c.body || undefined} href={c.href ?? undefined} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* 3. What partners get */}
      {benefits.hidden ? null : (
        <Section tone="midnight" aria-labelledby="benefits">
          <SectionHeading id="benefits" eyebrow={benefits.eyebrow ?? undefined} title={benefits.title ?? ""} onDark>
            {benefits.intro}
          </SectionHeading>
          {/* 8 benefits + the partner card fill a clean 3 x 3 grid. */}
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.cards.map((c, i) => (
              <Reveal as="li" key={`${c.title}-${i}`} delay={(i % 3) * 0.08}>
                <IconTile icon={iconOf(c, "shield-check")} title={c.title} body={c.body || undefined} onDark />
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
      )}

      {/* 4. DMC services */}
      {services.hidden ? null : (
        <Section tone="white" aria-labelledby="services">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="services" eyebrow={services.eyebrow ?? undefined} title={services.title ?? ""} />
            <Link href="/b2b/dmc-services" className="group inline-flex min-h-11 items-center gap-2 font-medium text-terracotta-700">
              All DMC services <ArrowRight aria-hidden="true" size={18} className="arrow-slide" />
            </Link>
          </div>
          <ul className="swipe-row mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.cards.map((c, i) => (
              <Reveal as="li" key={`${c.title}-${i}`} delay={(i % 4) * 0.08}>
                <B2BServiceCard icon={iconOf(c, "clipboard-check")} title={c.title} href={c.href ?? RFQ_HREF} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* 5. How partnership works */}
      {process.hidden ? null : (
        <Section tone="sand" aria-labelledby="process">
          <CarvedDivider className="mb-14" />
          <SectionHeading id="process" eyebrow={process.eyebrow ?? undefined} title={process.title ?? ""} align="center" />
          <ProcessTimeline steps={process.cards.map((c) => ({ title: c.title, body: c.body }))} />
          <div className="mt-14 flex justify-center">
            <ButtonLink href={RFQ_HREF} arrow>
              Send your brief
            </ButtonLink>
          </div>
        </Section>
      )}

      {/* 6. Signature experiences */}
      {experiences.hidden ? null : (
        <Section tone="white" aria-labelledby="experiences">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="experiences" eyebrow={experiences.eyebrow ?? undefined} title={experiences.title ?? ""}>
              {experiences.intro}
            </SectionHeading>
            <Link href="/experiences" className="group inline-flex min-h-11 items-center gap-2 font-medium text-terracotta-700">
              Explore all experiences <ArrowRight aria-hidden="true" size={18} className="arrow-slide" />
            </Link>
          </div>
          <ul className="swipe-row mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.customCards
              ? experiences.cards.map((c, i) => (
                  <Reveal as="li" key={`${c.title}-${i}`} delay={(i % 3) * 0.08}>
                    <TourCard
                      href={c.href ?? "/experiences"}
                      imageKey={c.imageKey ?? "b1-marrakech-hero"}
                      media={c.image ? <CmsImage image={c.image} fill sizes={CARD_SIZES} className="card-img object-cover" /> : undefined}
                      title={c.title}
                      line={c.body}
                      cta="Discover"
                    />
                  </Reveal>
                ))
              : EXPERIENCES.map((e, i) => (
                  <Reveal as="li" key={e.slug} delay={(i % 3) * 0.08}>
                    <LeisureCard product={e} />
                  </Reveal>
                ))}
          </ul>
        </Section>
      )}

      {/* 7. Trade FAQ */}
      {faq.hidden || !faq.cards.length ? null : (
        <FaqSection
          eyebrow={faq.eyebrow ?? ""}
          heading={faq.title ?? ""}
          faqs={faq.cards.map((c) => ({ question: c.title, answer: c.body }))}
          intro={faq.intro ?? undefined}
        />
      )}

      {/* 8. Final CTA */}
      {/* Hidden: an empty .cta-band marker still suppresses the layout's default band (globals.css). */}
      {cta.hidden ? <div className="cta-band hidden" aria-hidden="true" /> : <CtaBand title={cta.title ?? undefined} body={cta.intro ?? ""} />}
    </>
  );
}
