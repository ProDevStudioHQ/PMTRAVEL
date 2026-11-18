import { pageMetadata } from "@/lib/metadata";
import { LeisureHub } from "@/components/templates/LeisureHub";
import { EXPERIENCES } from "@/content/leisure";

export const metadata = pageMetadata({
  title: "Morocco Experiences for Travel Professionals",
  description:
    "Signature Morocco experiences to sell to your clients: luxury, adventure, culture, wellness, gastronomy and private moments, operated by our Marrakech DMC.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <LeisureHub
      eyebrow="Experiences"
      title="Signature Morocco experiences"
      standfirst="The product behind our programmes — designed in Marrakech, operated by our team and sold under your brand."
      imageKey="e18-jemaa-el-fna-dusk"
      path="/experiences"
      label="Experiences"
      listTitle="Six ways to experience Morocco"
      listIntro="Each experience can be sold on its own, added to a tour or built into a group, incentive or tailor-made programme."
      products={EXPERIENCES}
    />
  );
}
