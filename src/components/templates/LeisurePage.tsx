import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LeisureCard } from "@/components/templates/LeisureCard";
import { SiteImage } from "@/components/SiteImage";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { leisureBySlug, leisureHref, type LeisureProduct } from "@/content/leisure";
import { programmeBySlug, programmeHref } from "@/features/programmes/data";
import { excursionBySlug, excursionHref } from "@/features/excursions/data";
import { RFQ_HREF } from "@/lib/company";
import { touristTripSchema } from "@/lib/schema";
import { en } from "@/i18n/dictionaries/en";

function must<T>(value: T | undefined, what: string): T {
  if (!value) throw new Error(`LeisurePage: unknown ${what}`);
  return value;
}

/** Template for every /experiences/[slug] and /tours/[slug] page. */
export function LeisurePage({ product, cmsProgrammes }: { product: LeisureProduct; cmsProgrammes?: ReactNode }) {
  const path = leisureHref(product);
  const hub = product.kind === "experience" ? { href: "/experiences", label: "Experiences" } : { href: "/tours", label: "Tours" };
  const programmes = product.programmes.map((s) => must(programmeBySlug(s), `programme ${s}`));
  const excursions = product.excursions.map((s) => must(excursionBySlug(s), `excursion ${s}`));
  const related = product.related.map((s) => must(leisureBySlug(s), `related ${s}`));
  const quoteHref = `${RFQ_HREF}?product=${encodeURIComponent(product.name)}`;

  return (
    <>
      <PageHero eyebrow={product.eyebrow} title={product.h1} standfirst={product.standfirst} imageKey={product.heroImage} trail={[hub, { href: path, label: product.name }]}>
        <ButtonLink href={quoteHref} tone="dark" arrow>
          {en.cta.requestThis}
        </ButtonLink>
      </PageHero>

      {/* Intro + highlights */}
      <Section tone="sand" aria-labelledby="intro">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading id="intro" eyebrow="Overview" title={`${product.name}, operated by our Marrakech team`}>
              <div className="space-y-4">
                {product.intro.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </SectionHeading>
          </div>
          <Reveal className="lg:col-span-5">
            <div className="rounded-card border border-line bg-ivory p-8">
              <h3 className="font-display text-xl">Highlights</h3>
              <ul className="mt-5 space-y-3">
                {product.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <Check aria-hidden="true" size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-terracotta" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-3">
          {product.galleryImages.map((key) => (
            <li key={key} className="relative aspect-[4/3] overflow-hidden rounded-card">
              <SiteImage imageKey={key} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </Section>

      {/* Programmes published in the CRM for this category */}
      {cmsProgrammes}

      {/* Sample itineraries */}
      <Section tone="white" aria-labelledby="itineraries">
        <SectionHeading id="itineraries" eyebrow="Sample itinerary" title="A format your clients can buy">
          Illustrative only. Every programme is adapted to dates, pax and service level, and costed at net rates.
        </SectionHeading>
        {product.itineraries.map((it) => (
          <Reveal key={it.title} className="mt-12 rounded-card border border-line bg-sand p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline">
              <h3 className="t-h3">{it.title}</h3>
              <p className="eyebrow">{it.length}</p>
            </div>
            <p className="mt-3 max-w-2xl text-muted">{it.summary}</p>
            <ol className="mt-8 border-l border-gold/60">
              {it.days.map((d) => (
                <li key={d.day + d.title} className="relative pb-7 pl-8 last:pb-0">
                  <span aria-hidden="true" className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-terracotta" />
                  <p className="text-xs font-medium tracking-[0.15em] text-terracotta-700 uppercase">{d.day}</p>
                  <p className="mt-1 font-display text-lg">{d.title}</p>
                  <p className="mt-1 text-[0.9375rem] text-muted">{d.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        ))}
      </Section>

      {/* Inclusions + ready-to-sell */}
      <Section tone="sand" aria-labelledby="inclusions">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="inclusions" eyebrow="Inclusions" title="What's included" />
            <ul className="mt-8 space-y-3">
              {product.inclusions.map((inc) => (
                <li key={inc} className="flex gap-3 border-b border-line pb-3">
                  <Check aria-hidden="true" size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-terracotta" />
                  {inc}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">Exact inclusions are listed in each written proposal. No hidden costs.</p>
          </div>
          <div className="lg:col-span-7">
            <h3 className="t-h3">Ready-to-sell B2B products</h3>
            <p className="mt-2 text-muted">Fully written programmes and excursions you can white-label today.</p>
            <ul className="mt-6 divide-y divide-line rounded-card border border-line bg-ivory">
              {programmes.map((p) => (
                <li key={p.slug}>
                  <Link href={programmeHref(p)} className="group flex items-center justify-between gap-4 p-5">
                    <span>
                      <span className="block font-medium">{p.name}</span>
                      <span className="block text-sm text-muted">
                        Programme{p.days && p.nights ? ` · ${p.days} days / ${p.nights} nights` : ""}
                      </span>
                    </span>
                    <ArrowRight aria-hidden="true" size={18} className="arrow-slide shrink-0 text-terracotta-700" />
                  </Link>
                </li>
              ))}
              {excursions.map((e) => (
                <li key={e.slug}>
                  <Link href={excursionHref(e)} className="group flex items-center justify-between gap-4 p-5">
                    <span>
                      <span className="block font-medium">{e.name}</span>
                      <span className="block text-sm text-muted">
                        Excursion · {e.region} · {e.duration}
                      </span>
                    </span>
                    <ArrowRight aria-hidden="true" size={18} className="arrow-slide shrink-0 text-terracotta-700" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Related */}
      <Section tone="white" aria-labelledby="related">
        <SectionHeading id="related" eyebrow="You may also sell" title="Related products for your clients" />
        <ul className="swipe-row mt-10 grid gap-5 sm:grid-cols-3">
          {related.map((r, i) => (
            <Reveal as="li" key={r.slug} delay={i * 0.08}>
              <LeisureCard product={r} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={`Request ${product.name.toLowerCase()} for your clients.`}
        body="Send dates, pax and service level. We reply with a costed, day-by-day proposal at net rates."
        primaryLabel={en.cta.requestThis}
        primaryHref={quoteHref}
        whatsappMessage={`Hello, I'd like a quote for ${product.name} in Morocco.`}
      />

      <JsonLd
        data={touristTripSchema({
          name: product.itineraries[0]?.title ?? product.h1,
          description: product.seoDescription,
          path,
          itinerary: (product.itineraries[0]?.days ?? []).map((d) => ({ name: d.title, description: d.body })),
        })}
      />
    </>
  );
}
