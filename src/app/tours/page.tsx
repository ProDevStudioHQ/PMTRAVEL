import { pageMetadata } from "@/lib/metadata";
import { LeisureHub } from "@/components/templates/LeisureHub";
import { TOURS } from "@/content/leisure";

export const metadata = pageMetadata({
  title: "Morocco Tours for Agencies & Tour Operators",
  description:
    "Morocco tours for the travel trade: private tours, group tours, family holidays, honeymoons and tailor-made trips, costed at net rates and run locally.",
  path: "/tours",
});

export default function ToursPage() {
  return (
    <LeisureHub
      eyebrow="Tours"
      title="Morocco tours, operated by one local team"
      standfirst="Private, group, family, honeymoon or built from scratch — every tour costed at net rates and run by our Marrakech operations desk."
      imageKey="c8-dades-gorge"
      path="/tours"
      label="Tours"
      listTitle="Tour formats"
      listIntro="Start from a format, then tell us the dates, pax and service level. We send a costed proposal."
      products={TOURS}
    />
  );
}
