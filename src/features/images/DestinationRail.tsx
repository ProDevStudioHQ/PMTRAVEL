import Link from "next/link";
import { Card } from "@/components/Card";
import { SiteImage } from "@/components/SiteImage";
import { imageByKey } from "@/features/images/registry";
import { DESTINATION_IMAGE_KEYS } from "@/features/images/keys";
import { DESTINATIONS } from "@/features/destinations/registry";

/**
 * The destination grid.
 *
 * Text cards until photographs exist, image-led cards afterwards - the same
 * component, deciding per destination. A half-photographed set renders as a
 * mix rather than waiting for all six, so the site improves with each delivery
 * instead of in one jump.
 */
export function DestinationRail() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {DESTINATIONS.map((destination) => {
        const imageKey = DESTINATION_IMAGE_KEYS[destination.slug];
        const hasImage = imageKey ? Boolean(imageByKey(imageKey)) : false;

        if (!hasImage || !imageKey) {
          return (
            <Card
              key={destination.slug}
              title={destination.name}
              href={`/destinations/${destination.slug}`}
            >
              {destination.summary}
            </Card>
          );
        }

        return (
          <article
            key={destination.slug}
            className="group relative overflow-hidden rounded-[var(--radius-card)] border border-line-soft"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-hamada">
              <SiteImage
                imageKey={imageKey}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-ink">
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {destination.name}
                </Link>
              </h3>
              <p className="mt-3 text-sm text-meta">{destination.summary}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
