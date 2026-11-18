import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import { CmsImage } from "@/features/cms/CmsImage";
import { GROUP_TYPE_LABEL, durationLabel, priceLabel, programmeHref } from "@/features/cms/format";
import type { ProgrammeSummary } from "@/types/cms";

/** A CRM programme as a card. Same shape and motion as TourCard (components/cards.tsx). */
export function ProgrammeCard({
  programme,
  sizes = "(max-width: 768px) 85vw, 33vw",
  headingLevel = "h3",
}: {
  programme: ProgrammeSummary;
  sizes?: string;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const days = durationLabel(programme.durationDays, programme.durationNights);
  const group = programme.groupType === "GROUP";
  const priceLine = programme.price ? priceLabel(programme.price) : programme.b2bNetRatesNote ? "Net rates for partners" : null;
  return (
    <Link href={programmeHref(programme)} className="card-lift group flex h-full flex-col overflow-hidden rounded-card bg-ivory shadow-raised">
      <div className="relative aspect-[4/3] overflow-hidden bg-clay">
        {programme.cover ? (
          <CmsImage image={programme.cover} fill sizes={sizes} className="card-img object-cover" />
        ) : (
          <div aria-hidden="true" className="zellige-bg grid h-full place-items-center bg-indigo text-gold/60">
            <Images size={36} strokeWidth={1.25} />
          </div>
        )}
        <div className="absolute top-4 left-4 z-[3] flex flex-wrap gap-2">
          {days ? <span className="rounded-full bg-ivory/95 px-3 py-1 text-xs font-medium text-ink shadow-raised">{days}</span> : null}
          <span className={`rounded-full px-3 py-1 text-xs font-medium text-white shadow-raised ${group ? "bg-indigo" : "bg-zellige"}`}>
            {GROUP_TYPE_LABEL[programme.groupType]}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-terracotta-700">{programme.category.name}</p>
        <H className="t-h3 mt-2 text-ink">{programme.title}</H>
        {programme.route.length > 1 ? (
          <p className="mt-2 text-[0.9375rem] text-muted">
            {programme.route.map((stop, i) => (
              <span key={`${stop}-${i}`}>
                {i > 0 ? (
                  <span aria-hidden="true" className="mx-1.5 text-gold-700">
                    →
                  </span>
                ) : null}
                {i > 0 ? <span className="sr-only"> to </span> : null}
                {stop}
              </span>
            ))}
          </p>
        ) : (
          <p className="mt-2 line-clamp-2 text-[0.9375rem] text-muted">{programme.subtitle ?? programme.shortDescription}</p>
        )}
        {priceLine ? <p className="mt-3 text-sm font-medium text-ink">{priceLine}</p> : null}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-terracotta-700">
          View itinerary <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
        </span>
      </div>
    </Link>
  );
}
