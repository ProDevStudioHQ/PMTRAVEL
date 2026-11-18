import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IconTile } from "@/components/cards";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { FaqSection } from "@/components/FaqSection";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { QUICK_QUOTE_FIELDS } from "@/components/forms/configs";
import { WhatsappIcon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { AUDIENCES, PARTNER_PROCESS, type Audience } from "@/content/b2b";
import { PARTNER_HREF, RFQ_HREF, whatsappLink } from "@/lib/company";
import { serviceSchema } from "@/lib/schema";
import { en } from "@/i18n/dictionaries/en";

/** Template for every /b2b/[slug] page: who it's for, offer, process, FAQ, quote form. */
export function AudiencePage({ audience }: { audience: Audience }) {
  const related = audience.related.map((slug) => AUDIENCES.find((a) => a.slug === slug)).filter((a): a is Audience => Boolean(a));
  const path = `/b2b/${audience.slug}`;

  return (
    <>
      <PageHero
        eyebrow={audience.eyebrow}
        title={audience.h1}
        standfirst={audience.standfirst}
        imageKey={audience.heroImage}
        trail={[
          { href: "/b2b", label: "B2B & DMC" },
          { href: path, label: audience.name },
        ]}
      >
        <ButtonLink href="#quote" tone="dark" arrow>
          {en.cta.b2bQuote}
        </ButtonLink>
        <ButtonLink href={whatsappLink(`Hello, I work in ${audience.name.toLowerCase()} and would like to discuss Morocco.`)} variant="whatsapp" tone="dark" icon={<WhatsappIcon size={18} />}>
          WhatsApp us
        </ButtonLink>
      </PageHero>

      {/* Who it's for */}
      <Section tone="sand" aria-labelledby="who">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="who" eyebrow="Who it's for" title={`Working with ${audience.name.toLowerCase()}`} />
          </div>
          <Reveal className="lg:col-span-7">
            <ul className="space-y-4">
              {audience.whoFor.map((line) => (
                <li key={line} className="flex gap-4 border-b border-line pb-4 text-lg">
                  <Check aria-hidden="true" size={22} strokeWidth={1.5} className="mt-1 shrink-0 text-terracotta" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* What we offer */}
      <Section tone="white" aria-labelledby="offer">
        <SectionHeading id="offer" eyebrow="What we offer" title="What you get from us" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audience.offers.map((offer, i) => (
            <Reveal as="li" key={offer.title} delay={(i % 3) * 0.07}>
              <IconTile icon={offer.icon} title={offer.title} body={offer.body} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Process */}
      <Section tone="midnight" aria-labelledby="process">
        <SectionHeading id="process" eyebrow="Process" title="How we work together" align="center" onDark />
        <ProcessTimeline steps={PARTNER_PROCESS} onDark />
      </Section>

      <FaqSection heading={`${audience.name}: common questions`} faqs={audience.faqs} />

      {/* Quote form */}
      <Section tone="white" id="quote" aria-labelledby="quote-title" className="scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="quote-title" eyebrow="Request a quote" title="Send us your brief">
              A costed proposal at net rates, within 24 hours for standard requests. For the full form, use{" "}
              <Link href={RFQ_HREF} className="text-terracotta-700 underline underline-offset-4">
                Request a Quote
              </Link>
              .
            </SectionHeading>
            <div className="mt-10 border-t border-line pt-8">
              <p className="text-sm font-medium">Related</p>
              <ul className="mt-3 space-y-1">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/b2b/${r.slug}`} className="group inline-flex min-h-11 items-center gap-2 text-terracotta-700">
                      {r.name} <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={PARTNER_HREF} className="group inline-flex min-h-11 items-center gap-2 text-terracotta-700">
                    Become a Partner <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-sand p-6 sm:p-10 lg:col-span-8">
            <EnquiryForm
              kind="quote"
              idPrefix={`quote-${audience.slug}`}
              fields={QUICK_QUOTE_FIELDS}
              defaults={{ businessType: audience.formType }}
              submitLabel="Send my brief"
              successTitle="Brief received"
              successBody="Our operations team is on it. Expect a costed proposal within 24 hours for standard requests."
            />
          </div>
        </div>
      </Section>

      <JsonLd data={serviceSchema({ name: audience.h1, description: audience.seoDescription, path })} />
    </>
  );
}
