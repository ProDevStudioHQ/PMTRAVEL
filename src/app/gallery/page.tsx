import { cmsPageMetadata } from "@/lib/page-seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Gallery, type GalleryItem } from "@/components/Gallery";
import { CtaBand } from "@/components/CtaBand";
import { IMAGES, OPERATIONAL_SOURCES } from "@/features/images/registry";
import { getSite } from "@/lib/cms";

export const generateMetadata = cmsPageMetadata({
  title: "Gallery | Morocco Destinations & Experiences",
  description:
    "Photo gallery of the Morocco we operate: Marrakech medina and palaces, Agafay desert, the High Atlas, Sahara dunes at Merzouga, Fes, Essaouira and more.",
  path: "/gallery",
});

/** Venue and conference photos are left out: they are service illustrations, not destinations. */
const EXCLUDE = new Set(["d1-mice-conference-hall"]);

export default async function GalleryPage() {
  // Photos hidden in the CRM are left out; replaced ones show the CRM's photo.
  const site = await getSite();
  const hidden = new Set(site.hiddenImages ?? []);
  const items: GalleryItem[] = IMAGES.filter((img) => !EXCLUDE.has(img.key) && !hidden.has(img.key)).map((img) => {
    const r = site.images?.[img.key];
    return {
      key: img.key,
      src: r?.url ?? img.src,
      width: r?.width || img.width,
      height: r?.height || img.height,
      alt: r?.alt.trim() || img.alt,
      location: img.location,
    };
  });
  const credited = IMAGES.filter((img) => !OPERATIONAL_SOURCES.includes(img.source));

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The Morocco we operate"
        standfirst="Medinas, mountains, deserts and the Atlantic coast — the places your clients will travel through with our team."
        imageKey="e30-milky-way-tree"
        trail={[{ href: "/gallery", label: "Gallery" }]}
      />
      <Section tone="sand" aria-labelledby="photos">
        <SectionHeading id="photos" eyebrow="Photography" title="Destinations and experiences">
          Select a photo to view it larger. Use the arrow keys to move between photos.
        </SectionHeading>
        <div className="mt-12">
          <Gallery items={items} />
        </div>
      </Section>
      <Section tone="white" id="credits" aria-labelledby="credits-title" className="scroll-mt-24">
        <SectionHeading id="credits-title" eyebrow="Credits" title="Photograph credits">
          These destination photographs are licensed for commercial use. They show Morocco, not our own operation. Creative Commons photographs from Wikimedia Commons
          are credited as their licences require.
        </SectionHeading>
        <ul className="mt-10 columns-1 gap-8 text-sm sm:columns-2 lg:columns-3">
          {credited.map((img) => (
            <li key={img.key} className="break-inside-avoid border-b border-line py-3">
              <span className="text-ink">{img.location ?? img.key}</span>
              <span className="text-muted">
                {" "}
                — {img.creator}, {img.licence}
              </span>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
