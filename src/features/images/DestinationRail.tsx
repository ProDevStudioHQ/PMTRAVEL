import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/Card";
import { SiteImage } from "@/components/SiteImage";
import { imageByKey } from "@/features/images/registry";
import { DESTINATION_IMAGE_KEYS } from "@/features/images/keys";
import { DESTINATIONS } from "@/features/destinations/registry";

type DestinationRailProps = {
  /** A destination to leave out, so a page does not link to itself. */
  exclude?: string;
};

/**
 * The destination grid.
 *
 * Photographic cards: the image fills the card, and the name and summary sit
 * on a dark gradient at its foot. A destination without a photograph record
 * falls back to a text card rather than waiting for all six.
 */
export function DestinationRail({ exclude }: DestinationRailProps) {
  const destinations = DESTINATIONS.filter((destination) => destination.slug !== exclude);

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => {
        const imageKey = DESTINATION_IMAGE_KEYS[destination.slug];
        const hasImage = imageKey ? Boolean(imageByKey(imageKey)) : false;
        const href = `/destinations/${destination.slug}`;

        if (!hasImage || !imageKey) {
          return (
            <li key={destination.slug}>
              <Card variant="destination" title={destination.name} href={href} className="h-full">
                {destination.summary}
              </Card>
            </li>
          );
        }

        return (
          <li key={destination.slug}>
            <article className="surface-deep group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-ink-900 shadow-raised">
              <SiteImage
                imageKey={imageKey}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="-z-10 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              {/* ink-900 rising to 90% at the foot keeps paper text above 7:1 on any photograph. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-t from-ink-900/90 via-ink-900/40 to-ink-900/5"
              />
              <span
                aria-hidden="true"
                className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-paper/15 text-paper backdrop-blur-sm transition-colors duration-200 group-hover:bg-paper group-hover:text-red-900"
              >
                <ArrowUpRight size={18} strokeWidth={2} />
              </span>
              <div className="p-6">
                {destination.segments?.length ? (
                  <ul className="mb-3 flex flex-wrap gap-1.5">
                    {destination.segments.map((segment) => (
                      <li
                        key={segment}
                        className="rounded-full border border-paper/25 bg-paper/10 px-2.5 py-0.5 text-xs text-paper backdrop-blur-sm"
                      >
                        {segment}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <h3 className="font-display text-xl font-semibold text-paper">
                  <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                    {destination.name}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-paper/85">{destination.summary}</p>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
