import type { ReactNode } from "react";
import { ExperienceCard, TourCard, isCategory } from "@/components/cards";
import { leisureHref, productDays, type LeisureProduct } from "@/content/leisure";

/** Experience card for experiences, tour card for tours. */
export function LeisureCard({ product, sizes, media }: { product: LeisureProduct; sizes?: string; media?: ReactNode }) {
  const href = leisureHref(product);
  if (product.kind === "experience" && isCategory(product.slug)) {
    return (
      <ExperienceCard
        href={href}
        imageKey={product.heroImage}
        media={media}
        category={product.slug}
        categoryLabel={product.name}
        title={product.h1}
        line={product.cardLine}
        sizes={sizes}
      />
    );
  }
  return (
    <TourCard
      href={href}
      imageKey={product.heroImage}
      media={media}
      title={product.name}
      days={productDays(product)}
      format={product.format}
      route={product.route}
      line={product.cardLine}
      sizes={sizes}
    />
  );
}
