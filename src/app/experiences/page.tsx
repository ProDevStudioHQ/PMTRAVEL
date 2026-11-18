import { pageMetadata } from "@/lib/metadata";
import { SectionHub } from "@/features/cms/SectionHub";

export const metadata = pageMetadata({
  title: "Morocco Experiences for Travel Professionals",
  description:
    "Signature Morocco experiences to sell to your clients: luxury, adventure, culture, wellness, gastronomy and private moments, operated by our Marrakech DMC.",
  path: "/experiences",
});

export default async function ExperiencesPage() {
  return (
    <SectionHub
      sectionKey="experiences"
      copy={{
        eyebrow: "Experiences",
        title: "Signature Morocco experiences",
        standfirst: "The product behind our programmes — designed in Marrakech, operated by our team and sold under your brand.",
        listTitle: "Ways to experience Morocco",
        listIntro: "Each experience can be sold on its own, added to a tour or built into a group, incentive or tailor-made programme.",
      }}
    />
  );
}
