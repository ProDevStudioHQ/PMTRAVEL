import { Evidence } from "@/components/Evidence";
import { Section, SectionIntro } from "@/components/Section";
import { IMAGES, OPERATIONAL_SOURCES } from "@/features/images/registry";

/**
 * Photograph credits.
 *
 * The Unsplash Licence does not require attribution; the Creative Commons BY
 * and BY-SA licences on the Wikimedia Commons photographs do. We give it for
 * all of them, and we
 * say plainly which images are licensed scenery rather than our own work -
 * a site arguing that published claims should carry their provenance cannot
 * quietly imply that someone else's photographs are ours.
 */
export function ImageCredits({ tone = "paper" }: { tone?: "paper" | "paper-2" }) {
  const licensed = IMAGES.filter(
    (image) => !OPERATIONAL_SOURCES.includes(image.source)
  );
  if (licensed.length === 0) return null;

  return (
    <Section tone={tone}>
      <SectionIntro title="Photograph credits">
        <p>
          The destination photographs on this site are licensed, not ours. They
          show Morocco; they do not show our operation. Photographs of our office,
          our vehicles and our people are being taken, and when they appear they
          will be our own work, credited as such.
        </p>
      </SectionIntro>
      <ul className="measure mt-8 border-t border-rule">
        {licensed.map((image) => (
          <li key={image.key} className="border-b border-rule py-4 text-base">
            <span className="text-ink-900">{image.location ?? image.key}</span>
            <span className="text-ink-500">
              {" "}
              &mdash; {image.creator}, {image.licence}
            </span>
          </li>
        ))}
      </ul>
      <div className="measure mt-6">
        <Evidence note="All licensed for commercial use. Unsplash and CC0 photographs need no credit and get one anyway; Creative Commons BY and BY-SA photographs from Wikimedia Commons are credited here as their licences require." />
      </div>
    </Section>
  );
}
