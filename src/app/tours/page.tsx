import { cmsPageMetadata } from "@/lib/page-seo";
import { SectionHub } from "@/features/cms/SectionHub";

export const generateMetadata = cmsPageMetadata({
  title: "Morocco Tours for Agencies & Tour Operators",
  description:
    "Morocco tours for the travel trade: private tours, group tours, family holidays, honeymoons and tailor-made trips, costed at net rates and run locally.",
  path: "/tours",
});

export default async function ToursPage() {
  return (
    <SectionHub
      sectionKey="tours"
      copy={{
        eyebrow: "Tours",
        title: "Morocco tours, operated by one local team",
        standfirst: "Private, group, family, honeymoon or built from scratch — every tour costed at net rates and run by our Marrakech operations desk.",
        listTitle: "Tour formats",
        listIntro: "Start from a format, then tell us the dates, pax and service level. We send a costed proposal.",
      }}
    />
  );
}
