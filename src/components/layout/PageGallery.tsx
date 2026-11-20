"use client";

/**
 * Extra photos the CRM added to one page (Website → Images → a page → Add
 * photos). Rendered from the root layout, so it reads the current path here;
 * pages without added photos render nothing.
 */
import { usePathname } from "next/navigation";
import { Gallery, type GalleryItem } from "@/components/Gallery";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import type { Image } from "@/types/cms";

const normalise = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

export function PageGallery({ galleries }: { galleries: Record<string, Image[]> }) {
  const pathname = usePathname();
  const photos = galleries[normalise(pathname || "/")] ?? [];
  if (!photos.length) return null;
  const items: GalleryItem[] = photos.map((p, i) => ({
    key: `page-photo-${i}-${p.url}`,
    src: p.url,
    width: p.width || 1600,
    height: p.height || 1067,
    alt: p.alt,
    location: p.alt || undefined,
  }));
  return (
    <Section tone="sand" aria-labelledby="page-photos">
      <SectionHeading id="page-photos" eyebrow="Photos" title="In pictures" />
      <div className="mt-10">
        <Gallery items={items} />
      </div>
    </Section>
  );
}
