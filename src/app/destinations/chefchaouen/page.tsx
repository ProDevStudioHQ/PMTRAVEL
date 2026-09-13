import { Camera, Footprints, Hotel, Luggage, Mountain, Route } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Chefchaouen Ground Operations",
  description:
    "Operating Chefchaouen: medina access on foot, luggage and porterage, small walking groups, respectful photography and placing it in a northern circuit.",
  path: "/destinations/chefchaouen",
});

const FAQS = [
  {
    question: "Can large groups visit Chefchaouen?",
    answer:
      "Yes, but not as one group. The medina is small, steep and narrow, so large groups work best split into smaller walking groups, each with its own guide, starting at staggered times.",
  },
  {
    question: "Should Chefchaouen be a stop or an overnight?",
    answer:
      "An overnight if the itinerary allows it. The town is at its best early in the morning and in the evening, after day visitors leave, and a stop between two long drives rarely shows it well.",
  },
  {
    question: "Can vehicles reach hotels in the medina?",
    answer:
      "Generally not to the door. Vehicles stop outside the old town, and luggage goes the rest of the way by porter. We check each property's arrangement before confirming it.",
  },
];

export default function ChefchaouenPage() {
  return (
    <DestinationPage
      slug="chefchaouen"
      title="Chefchaouen"
      standfirst="The blue town in the Rif mountains. Beautiful, small, steep and entirely on foot, which is exactly what an itinerary needs to plan for."
      body={
        <>
          <p>
            Chefchaouen is one of the most requested names in any Morocco
            circuit, and one of the easiest to under-plan. The blue-washed medina
            in the Rif mountains photographs beautifully and is small, steep and
            entirely on foot, which changes how a group experiences it.
          </p>
          <p>
            Access is the first question. Vehicles stop outside the old town, and
            the streets inside are stepped and narrow. For a group that means a
            drop-off point, a walk with luggage or a porter arrangement, and a
            clear answer about who in the group can manage the climb. We
            establish that per property before confirming anything.
          </p>
          <p>
            The second is pace. Chefchaouen suits small groups and independent
            travellers who have time to wander; a large group moving through it
            in a single line struggles. We plan smaller walking groups with their
            own guides rather than one long procession.
          </p>
          <p>
            The third is the people who live there. The town&rsquo;s popularity
            with photographers means residents&rsquo; doors and homes end up in
            thousands of pictures, and not everyone welcomes it. We brief groups
            on photographing respectfully, because the visit depends on the
            goodwill of the town.
          </p>
          <p>
            Chefchaouen usually sits between Tangier and Fes in a northern
            circuit, and an overnight lets a group see it early and late, when
            the streets are quietest. The Akchour waterfalls nearby make a good
            second day for active groups.
          </p>
        </>
      }
      services={[
        {
          icon: Footprints,
          title: "Medina walking programmes",
          body: "Small walking groups with their own guides, paced to the steps and the group.",
        },
        {
          icon: Luggage,
          title: "Luggage and porterage",
          body: "Drop-off point and porter arrangement agreed per property.",
        },
        {
          icon: Camera,
          title: "Photography programmes",
          body: "Early and late walks, with a briefing on photographing residents respectfully.",
        },
        {
          icon: Route,
          title: "Northern circuits",
          body: "Chefchaouen placed between Tangier and Fes, with the overnight chosen deliberately.",
        },
        {
          icon: Mountain,
          title: "Rif excursions",
          body: "Day walks to the Akchour waterfalls for active groups.",
        },
        {
          icon: Hotel,
          title: "Guesthouse selection",
          body: "Properties matched to access, steps and group size.",
        },
      ]}
      mice={[
        { kind: "seminar", body: "Small-group retreats in guesthouses and boutique hotels in and around the medina." },
        { kind: "teambuilding", body: "Photography challenges and guided walks in the Rif mountains." },
        { kind: "gala", body: "Private dinners on riad terraces overlooking the blue town." },
        { kind: "culture", body: "The kasbah, Outa el Hammam square, local weavers and the Spanish Mosque viewpoint." },
        { kind: "incentive", body: "Hikes to the Akchour waterfalls and God's Bridge, and sunset over the town." },
      ]}
      checklist={{
        title: "What we establish before confirming Chefchaouen",
        items: [
          "Where vehicles stop, and the walk from there to each property",
          "Steps and gradients against the mobility of the group",
          "Luggage handling and porterage for each address",
          "Walking group size, and a guide for each group",
          "Whether the itinerary allows an overnight or only a stop",
          "A briefing on photographing residents and private doors",
        ],
        evidence:
          "No drive time to Chefchaouen from Tangier or Fes is published here, because none has been measured and logged by us. Figures appear on route intelligence only once a leg has been driven.",
      }}
      faq={{ heading: "What operators ask about Chefchaouen", faqs: FAQS }}
      cta={{
        title: "Planning Chefchaouen in a circuit",
        body: "Send the circuit and the group size. We will tell you whether the visit should be a stop or an overnight, and how the group should move through the medina.",
      }}
    />
  );
}
