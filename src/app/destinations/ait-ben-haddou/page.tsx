import { Clapperboard, Footprints, Landmark, Route, Sun, UtensilsCrossed } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Aït Ben Haddou Visits and Excursions",
  description:
    "Operating a visit to the UNESCO-listed ksar of Aït Ben Haddou: the climb, heat and timing, film heritage, and staging it from Ouarzazate or Marrakech.",
  path: "/destinations/ait-ben-haddou",
});

const FAQS = [
  {
    question: "How much walking does a visit to Aït Ben Haddou involve?",
    answer:
      "A fair amount. The ksar climbs a hillside on uneven, stepped paths, and the view from the top is a real ascent. Everyone can enjoy the lower village with a good guide, and we plan the visit so that those who stop are not left waiting.",
  },
  {
    question: "When is the best time of day to visit?",
    answer:
      "Early morning or late afternoon. There is little shade on the hillside, and those hours are cooler and usually quieter on the paths.",
  },
  {
    question: "Should it be an excursion or a stop?",
    answer:
      "Either works if enough time is allowed. The mistake is a short stop between two long drives; a planned visit with a guide and a nearby lunch is worth far more to a group.",
  },
];

export default function AitBenHaddouPage() {
  return (
    <DestinationPage
      slug="ait-ben-haddou"
      title="Aït Ben Haddou"
      standfirst="The earthen ksar on the hill that so many clients picture before they arrive. Simple to sell, physical to visit, and worth an honest allowance of time."
      body={
        <>
          <p>
            Aït Ben Haddou is the image many clients have of Morocco before they
            arrive: a fortified village of earthen houses rising up a hillside
            above a river, listed by UNESCO as a World Heritage site and used as a
            backdrop by some of the best-known films and series of recent
            decades.
          </p>
          <p>
            The visit is simple to sell and physical to operate. The ksar is
            reached across the river, and the way up is a climb on uneven,
            stepped paths to the old granary at the top. Groups with mixed
            mobility need a version of the visit that does not depend on everyone
            reaching the summit, and a guide who knows where to pause.
          </p>
          <p>
            Heat is the second factor. There is little shade on the hillside,
            and in the warmer months the middle of the day is the wrong time to
            be there. We schedule the visit early or late, which usually also
            means fewer people on the paths.
          </p>
          <p>
            Most programmes treat Aït Ben Haddou as an excursion from Ouarzazate
            or a stop on the road from Marrakech. Both work, and both are better
            with real time allowed. A rushed half hour between two long drives
            shows a group very little; a planned visit with a guide and a lunch
            nearby becomes one of the days they remember.
          </p>
        </>
      }
      services={[
        {
          icon: Landmark,
          title: "Guided ksar visits",
          body: "Licensed guides who pace the climb to the group and know where to pause.",
        },
        {
          icon: Footprints,
          title: "Mobility planning",
          body: "A version of the visit that works for everyone, without depending on the summit.",
        },
        {
          icon: Sun,
          title: "Heat scheduling",
          body: "Visits placed early or late, away from the midday sun.",
        },
        {
          icon: Clapperboard,
          title: "Film heritage tours",
          body: "The locations behind the productions, explained by guides who know them.",
        },
        {
          icon: Route,
          title: "Excursion staging",
          body: "Planned from Ouarzazate or as a stop on the Marrakech road, with real time allowed.",
        },
        {
          icon: UtensilsCrossed,
          title: "Lunch nearby",
          body: "Kasbah restaurants timed against the visit rather than squeezed in after it.",
        },
      ]}
      mice={[
        { kind: "seminar", body: "Small meetings and retreats in kasbah hotels near the ksar." },
        { kind: "teambuilding", body: "Film-set challenges and photography treasure hunts around the village." },
        { kind: "gala", body: "Candlelit dinners with a view of the ksar at dusk." },
        { kind: "culture", body: "The UNESCO-listed ksar, its granary and the earthen building traditions of the valley." },
        { kind: "incentive", body: "Sunrise visits, 4x4 excursions and stays in restored kasbahs." },
      ]}
      checklist={{
        title: "What we establish before confirming a visit",
        items: [
          "How the group crosses the river and reaches the ksar",
          "The mobility range of the group against the climb",
          "Time of day, against the heat and the number of visitors",
          "Real time allowed on site, not a stop between drives",
          "A guide briefed on pace and where to pause",
          "Lunch and facilities close to the visit",
        ],
        evidence:
          "No drive time to Aït Ben Haddou from Marrakech or Ouarzazate is published here, because none has been measured and logged by us yet.",
      }}
      faq={{ heading: "What operators ask about Aït Ben Haddou", faqs: FAQS }}
      cta={{
        title: "Planning a visit to Aït Ben Haddou",
        body: "Tell us where the group travels from and where it sleeps that night. We will tell you when the visit should happen and how long it deserves.",
      }}
    />
  );
}
