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
 * instead of in one jump. Both kinds follow SOP 3.4: a hairline border that
 * turns red-600 on hover, and nothing else moves.
 */
export function DestinationRail() {
  return (
    // items-start: a text-only card keeps its own height instead of stretching
    // to match a photographed neighbour and leaving an empty white block.
    <ul className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {DESTINATIONS.map((destination) => {
        const imageKey = DESTINATION_IMAGE_KEYS[destination.slug];
        const hasImage = imageKey ? Boolean(imageByKey(imageKey)) : false;

        if (!hasImage || !imageKey) {
          return (
            <li key={destination.slug}>
              <Card
                variant="destination"
                title={destination.name}
                href={`/destinations/${destination.slug}`}
                className="h-full"
              >
                {destination.summary}
              </Card>
            </li>
          );
        }

        return (
          <li key={destination.slug}>
            <article className="relative h-full overflow-hidden rounded-card border border-rule bg-paper transition-colors duration-200 hover:border-red-600">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
                <SiteImage
                  imageKey={imageKey}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-ink-900">
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {destination.name}
                  </Link>
                </h3>
                <p className="mt-3 text-sm text-ink-500">{destination.summary}</p>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
