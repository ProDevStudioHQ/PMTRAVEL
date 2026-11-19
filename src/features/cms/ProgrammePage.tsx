import Link from "next/link";
import { BedDouble, Check, ChevronDown, Coffee, Download, FileLock2, FileText, Moon, Route, Users, Utensils, X } from "lucide-react";
import { buttonClasses, ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PDF_REQUEST_FIELDS, QUICK_QUOTE_FIELDS } from "@/components/forms/configs";
import { CmsImage } from "@/features/cms/CmsImage";
import { GalleryLightbox } from "@/features/cms/GalleryLightbox";
import { GROUP_TYPE_LABEL, durationLabel, fileSizeLabel, priceLabel, programmeHref } from "@/features/cms/format";
import { SECTIONS, type SectionKey } from "@/features/cms/sections";
import { LOGIN_HREF } from "@/lib/company";
import { programmeTripSchema } from "@/lib/schema";
import { safeHref } from "@/lib/site-layout";
import type { ProgrammeDay, ProgrammeDetail } from "@/types/cms";

function Meals({ meals }: { meals: ProgrammeDay["meals"] }) {
  const list = [
    meals.breakfast && { label: "Breakfast", Icon: Coffee },
    meals.lunch && { label: "Lunch", Icon: Utensils },
    meals.dinner && { label: "Dinner", Icon: Moon },
  ].filter((m): m is { label: string; Icon: typeof Coffee } => Boolean(m));
  if (list.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Meals included">
      {list.map(({ label, Icon }) => (
        <li key={label} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ivory px-3 py-1 text-xs text-ink">
          <Icon aria-hidden="true" size={14} strokeWidth={1.75} className="text-terracotta-700" />
          {label}
        </li>
      ))}
    </ul>
  );
}

/** PDF action by access level (docs/api-contract.md 4.9 / 5.5). */
function PdfAction({ programme, onDark = false }: { programme: ProgrammeDetail; onDark?: boolean }) {
  const pdf = programme.pdf;
  if (!pdf) return null;
  const tone = onDark ? "dark" : "light";
  if (pdf.access === "PUBLIC") {
    const href = safeHref(pdf.url);
    if (!href) return null;
    return (
      <a href={href} download={pdf.fileName} className={buttonClasses("secondary", tone, "w-full")}>
        <Download aria-hidden="true" size={18} />
        <span>
          Download programme (PDF) <span className="tabular font-normal opacity-80">· {fileSizeLabel(pdf.sizeBytes)}</span>
        </span>
      </a>
    );
  }
  if (pdf.access === "PARTNERS_ONLY") {
    return (
      <Link href={LOGIN_HREF} className={buttonClasses("secondary", tone, "w-full")}>
        <FileLock2 aria-hidden="true" size={18} />
        <span>Partner PDF — log in</span>
      </Link>
    );
  }
  // ON_REQUEST: the PDF request form, opened in place. <details> works without JavaScript.
  return (
    <details className="group/pdf w-full">
      <summary className={buttonClasses("secondary", tone, "w-full cursor-pointer list-none [&::-webkit-details-marker]:hidden")}>
        <FileText aria-hidden="true" size={18} />
        <span>Request the PDF</span>
        <ChevronDown aria-hidden="true" size={16} className="transition-transform group-open/pdf:rotate-180" />
      </summary>
      <div className="mt-4 rounded-card border border-line bg-sand p-5 text-left text-ink">
        <p className="mb-4 text-sm text-muted">We send the full programme PDF by email, usually the same working day.</p>
        <EnquiryForm
          kind="pdf"
          fields={PDF_REQUEST_FIELDS}
          submitLabel="Send me the PDF"
          successTitle="PDF requested"
          successBody="We will email you the programme PDF."
          defaults={{ product: programme.title, programmeSlug: programme.slug }}
          idPrefix="pdf"
          compact
        />
      </div>
    </details>
  );
}

function PriceBox({ programme }: { programme: ProgrammeDetail }) {
  const duration = durationLabel(programme.durationDays, programme.durationNights);
  const pax =
    programme.minPax && programme.maxPax
      ? `${programme.minPax}–${programme.maxPax} travellers`
      : programme.minPax
        ? `From ${programme.minPax} travellers`
        : programme.maxPax
          ? `Up to ${programme.maxPax} travellers`
          : null;
  return (
    <aside aria-label="Price and booking" className="rounded-card border border-line bg-ivory p-7 shadow-raised lg:sticky lg:top-28">
      {programme.price ? (
        <>
          <p className="font-display text-3xl font-semibold text-ink">{priceLabel(programme.price)}</p>
          {programme.price.note ? <p className="mt-1 text-sm text-muted">{programme.price.note}</p> : null}
        </>
      ) : programme.b2bNetRatesNote ? (
        <p className="font-display text-2xl font-semibold text-ink">
          Net rates for partners <span className="block text-base font-normal text-muted">Request a quote for your dates and pax.</span>
        </p>
      ) : (
        <p className="font-display text-2xl font-semibold text-ink">Price on request</p>
      )}
      <dl className="mt-6 space-y-3 border-t border-line pt-5 text-[0.9375rem]">
        {duration ? (
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Duration</dt>
            <dd className="text-right">{duration}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Format</dt>
          <dd className="text-right">{GROUP_TYPE_LABEL[programme.groupType]}</dd>
        </div>
        {pax ? (
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Group size</dt>
            <dd className="text-right">{pax}</dd>
          </div>
        ) : null}
        {programme.startCity || programme.endCity ? (
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Starts / ends</dt>
            <dd className="text-right">{[programme.startCity, programme.endCity].filter(Boolean).join(" / ")}</dd>
          </div>
        ) : null}
      </dl>
      <div className="mt-6 grid gap-3">
        <a href="#quote" className={buttonClasses("primary", "light", "w-full")}>
          <span>Request a quote for this programme</span>
        </a>
        <PdfAction programme={programme} />
      </div>
    </aside>
  );
}

/** /experiences/[category]/[slug] and /tours/[category]/[slug] for a CRM programme. */
export function ProgrammePage({ sectionKey, programme }: { sectionKey: SectionKey; programme: ProgrammeDetail }) {
  const cfg = SECTIONS[sectionKey];
  const path = programmeHref(programme);
  const categoryHref = `/${cfg.segment}/${programme.category.slug}`;
  const duration = durationLabel(programme.durationDays, programme.durationNights);
  const description = programme.seo.description ?? programme.shortDescription;

  return (
    <>
      <PageHero
        eyebrow={`${cfg.label} · ${programme.category.name}`}
        title={programme.title}
        standfirst={programme.subtitle ?? programme.shortDescription}
        imageKey={cfg.heroImage}
        media={programme.cover ? <CmsImage image={programme.cover} fill priority sizes="100vw" className="object-cover" /> : undefined}
        trail={[
          { href: `/${cfg.segment}`, label: cfg.label },
          { href: categoryHref, label: programme.category.name },
          { href: path, label: programme.title },
        ]}
        below={
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sand/90">
            {programme.route.length > 0 ? (
              <li className="inline-flex items-center gap-2">
                <Route aria-hidden="true" size={18} className="text-gold" />
                <span>
                  {programme.route.map((stop, i) => (
                    <span key={`${stop}-${i}`}>
                      {i > 0 ? (
                        <span aria-hidden="true" className="mx-1.5 text-gold">
                          →
                        </span>
                      ) : null}
                      {i > 0 ? <span className="sr-only"> to </span> : null}
                      {stop}
                    </span>
                  ))}
                </span>
              </li>
            ) : null}
            {duration ? <li className="tabular">{duration}</li> : null}
            <li>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white ${programme.groupType === "GROUP" ? "bg-indigo ring-1 ring-sand/30" : "bg-zellige"}`}>
                <Users aria-hidden="true" size={14} />
                {GROUP_TYPE_LABEL[programme.groupType]}
              </span>
            </li>
          </ul>
        }
      >
        <ButtonLink href="#quote" tone="dark" arrow>
          Request a quote
        </ButtonLink>
      </PageHero>

      {/* Overview, highlights, price box */}
      <Section tone="sand" aria-labelledby="overview">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading id="overview" eyebrow="Overview" title="About this programme" highlight={false} />
            {/* overviewHtml is sanitised by the CRM to a short tag whitelist (docs/api-contract.md 4.9). */}
            <div className="cms-prose mt-6" dangerouslySetInnerHTML={{ __html: programme.overviewHtml }} />
            {programme.highlights.length > 0 ? (
              <div className="mt-10 rounded-card border border-line bg-ivory p-8">
                <h3 className="font-display text-xl">Highlights</h3>
                <ul className="mt-5 space-y-3">
                  {programme.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <Check aria-hidden="true" size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-terracotta" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-5">
            <PriceBox programme={programme} />
          </div>
        </div>
      </Section>

      {/* Day by day */}
      {programme.days.length > 0 ? (
        <Section tone="white" aria-labelledby="itinerary">
          <SectionHeading id="itinerary" eyebrow="Itinerary" title="Day by day" highlight={false}>
            Every programme is adapted to your dates, pax and service level, and costed at net rates.
          </SectionHeading>
          <ol className="mt-10 divide-y divide-line rounded-card border border-line bg-sand">
            {programme.days.map((day, i) => (
              <li key={day.dayNumber}>
                <details className="group/day" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-terracotta text-sm font-medium text-white tabular">{day.dayNumber}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium tracking-[0.15em] text-terracotta-700 uppercase">Day {day.dayNumber}</span>
                      <span className="block font-display text-lg text-ink">{day.title}</span>
                    </span>
                    <ChevronDown aria-hidden="true" size={20} className="shrink-0 text-gold-700 transition-transform group-open/day:rotate-180" />
                  </summary>
                  <div className="space-y-4 px-5 pb-6 sm:pl-[5.25rem]">
                    <p className="whitespace-pre-line text-[0.9375rem] text-muted">{day.description}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Meals meals={day.meals} />
                      {day.overnightCity ? (
                        <span className="inline-flex items-center gap-1.5 text-sm text-ink">
                          <BedDouble aria-hidden="true" size={16} strokeWidth={1.75} className="text-terracotta-700" />
                          Overnight in {day.overnightCity}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      {/* Included / not included */}
      {programme.included.length > 0 || programme.notIncluded.length > 0 ? (
        <Section tone="sand" aria-labelledby="inclusions">
          <SectionHeading id="inclusions" eyebrow="Inclusions" title="What's included" highlight={false} />
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {programme.included.length > 0 ? (
              <div>
                <h3 className="font-display text-xl">Included</h3>
                <ul className="mt-5 space-y-3">
                  {programme.included.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-line pb-3">
                      <Check aria-hidden="true" size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-zellige" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {programme.notIncluded.length > 0 ? (
              <div>
                <h3 className="font-display text-xl">Not included</h3>
                <ul className="mt-5 space-y-3">
                  {programme.notIncluded.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-line pb-3">
                      <X aria-hidden="true" size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-terracotta-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {/* Gallery */}
      {programme.gallery.length > 0 ? (
        <Section tone="white" aria-labelledby="gallery">
          <SectionHeading id="gallery" eyebrow="Gallery" title="On the road" highlight={false} />
          <div className="mt-10">
            <GalleryLightbox images={programme.gallery} title={programme.title} />
          </div>
        </Section>
      ) : null}

      {/* Quote form */}
      <Section tone="sand" id="quote" aria-labelledby="quote-title" className="scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="quote-title" eyebrow="Request a quote" title="Request a quote for this programme" highlight={false}>
              Send dates, pax and service level. We reply with a costed, day-by-day proposal at net rates.
            </SectionHeading>
          </div>
          <div className="rounded-card border border-line bg-ivory p-6 sm:p-8 lg:col-span-7">
            <EnquiryForm
              kind="quote"
              fields={QUICK_QUOTE_FIELDS}
              submitLabel="Request this programme"
              successTitle="Quote request received"
              successBody="We will send a costed proposal for this programme."
              defaults={{ product: programme.title, programmeSlug: programme.slug }}
              idPrefix="programme-quote"
            />
          </div>
        </div>
      </Section>

      <CtaBand
        title={`Sell ${programme.title} to your clients.`}
        body="Our operations desk adapts it to your dates, pax and service level and sends a costed proposal at net rates."
        primaryLabel="Request a quote"
        primaryHref="#quote"
        whatsappMessage={`Hello, I'd like a quote for "${programme.title}" (${path}).`}
      />

      <JsonLd
        data={programmeTripSchema({
          name: programme.title,
          description,
          path,
          image: (programme.seo.ogImage ?? programme.cover)?.url,
          days: programme.days.map((d) => ({ name: d.title, description: d.description })),
          price: programme.price,
        })}
      />
    </>
  );
}
