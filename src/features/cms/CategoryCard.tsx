import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { CmsImage } from "@/features/cms/CmsImage";
import type { Category } from "@/types/cms";

/** A category that exists only in the CRM (no hand-written page). Matches ExperienceCard. */
export function CategoryCard({ category, href, sizes = "(max-width: 768px) 85vw, 33vw" }: { category: Category; href: string; sizes?: string }) {
  return (
    <Link href={href} className="card-lift group flex h-full flex-col rounded-card bg-ivory p-3 shadow-raised">
      <div className="arch relative aspect-[4/5] overflow-hidden bg-clay">
        {category.cover ? (
          <CmsImage image={category.cover} fill sizes={sizes} className="card-img object-cover" />
        ) : (
          <div aria-hidden="true" className="zellige-bg grid h-full place-items-center bg-indigo text-gold/60">
            <Compass size={40} strokeWidth={1.25} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <p className="eyebrow text-terracotta-700">{category.programmeCount === 1 ? "1 programme" : `${category.programmeCount} programmes`}</p>
        <h3 className="t-h3 mt-2 text-ink">{category.name}</h3>
        {category.description ? <p className="mt-1.5 line-clamp-2 text-[0.9375rem] text-muted">{category.description}</p> : null}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-terracotta-700">
          Discover <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
        </span>
      </div>
    </Link>
  );
}
