import { Container } from "@/components/Container";
import { Evidence } from "@/components/Evidence";
import { IMAGES, OPERATIONAL_SOURCES } from "@/features/images/registry";

/**
 * Photograph credits.
 *
 * The Unsplash Licence does not require attribution. We give it anyway, and we
 * say plainly which images are licensed scenery rather than our own work -
 * a site arguing that published claims should carry their provenance cannot
 * quietly imply that someone else's photographs are ours.
 */
export function ImageCredits() {
  const licensed = IMAGES.filter(
    (image) => !OPERATIONAL_SOURCES.includes(image.source)
  );
  if (licensed.length === 0) return null;

  return (
    <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
      <h2 className="text-xl font-semibold tracking-tight text-ink">
        Photograph credits
      </h2>
      <p className="measure mt-4 text-base text-meta">
        The destination photographs on this site are licensed, not ours. They
        show Morocco; they do not show our operation. Photographs of our office,
        our vehicles and our people are being taken, and when they appear they
        will be our own work, credited as such.
      </p>
      <ul className="measure mt-8 flex flex-col gap-3">
        {licensed.map((image) => (
          <li
            key={image.key}
            className="rounded-[var(--radius-data)] border border-line-soft px-4 py-3 text-sm"
          >
            <span className="text-ink">{image.location ?? image.key}</span>
            <span className="text-meta">
              {" "}
              &mdash; {image.creator}, {image.licence}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Evidence note="Licensed under terms permitting commercial use. Attribution is not required by the licence; it is given because a site about provenance should have some." />
      </div>
    </Container>
  );
}
