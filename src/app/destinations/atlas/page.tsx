import { Bus, Coffee, Languages, Mountain, Route, Snowflake } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Atlas Mountains Ground Operations",
  description:
    "Operating the Atlas from Marrakech: day trips versus crossings, vehicle class on the passes, winter conditions and group mobility.",
  path: "/destinations/atlas",
});

const FAQS = [
  {
    question: "Is the Atlas a day trip or a crossing?",
    answer:
      "Both exist and they are completely different operations. A day trip returns to Marrakech and can absorb a late start; a crossing commits the group to arriving somewhere else that evening, which means a delay on a pass has nowhere to go. Operators sometimes price the second and plan the first.",
  },
  {
    question: "What decides the vehicle for an Atlas day?",
    answer:
      "The road and the group, in that order. Distance is identical whatever you send; a full-size coach on a mountain road is not the same proposition as a minibus, and on some approaches it is not an option at all. We match vehicle class to the specific road rather than to the headcount.",
  },
  {
    question: "Can the Atlas be operated in winter?",
    answer:
      "Often yes, sometimes no, and the honest answer is that it depends on conditions on the day and on which pass the itinerary needs. We plan winter Atlas days with a stated alternative that does not require the pass, so that a closure changes the day rather than ending it.",
  },
  {
    question: "How much walking does an Atlas day involve?",
    answer:
      "That is a question about your group as much as the destination, and it is the one most often left unasked until the coach has stopped. Valley walks range from level strolls to genuine ascents, and a group with mixed mobility needs the version that keeps everyone together. We ask before we plan, not on the day.",
  },
];

export default function AtlasPage() {
  return (
    <DestinationPage
      slug="atlas"
      title="Atlas Mountains"
      standfirst="A day out of Marrakech and a crossing to the south are sold in similar language and operated completely differently. Getting that distinction right is most of the job."
      body={
        <>
          <p>
            The Atlas appears in almost every Morocco itinerary, in two quite
            different roles. In one it is a day: leave Marrakech, spend time in
            the mountains, come back. In the other it is the way south, a
            crossing on the road to Ouarzazate and everything beyond it. These
            get described in brochures with the same few words and they are not
            the same operation.
          </p>
          <p>
            The difference is what happens when something takes longer than
            planned. On a day trip, a delay costs you an hour of the afternoon.
            On a crossing, the group has to be somewhere that night, the
            property is expecting them, dinner is booked, and a road held up on
            a pass has nowhere to absorb the loss. A crossing needs slack built
            in deliberately and a decision point agreed in advance: at what time
            do we stop trying and change the plan?
          </p>
          <p>
            Vehicle class is the second thing operators underestimate. The
            distance is the same whatever you send, and that is where the
            similarity ends. Roads through the mountains impose limits that a
            flat transfer never does, and a vehicle that is comfortable on the
            approach may not be the right choice higher up. We match the vehicle
            to the road first and the headcount second, which occasionally means
            telling you that the coach you budgeted for is the wrong answer.
          </p>
          <p>
            Winter deserves its own planning rather than a footnote. Conditions
            close roads, and the useful preparation is not a promise that it
            will be fine but a stated alternative that does not depend on the
            pass. We plan the winter version and the fallback together, so a
            closure changes the day instead of ending it.
          </p>
          <p>
            Finally, mobility. Mountain days involve uneven ground and, often,
            more walking than the itinerary implies. A group with mixed mobility
            needs a version that holds together rather than one that splits into
            those who managed and those who waited. We ask about this at the
            briefing stage, because on the day the options have narrowed to one.
          </p>
        </>
      }
      services={[
        {
          icon: Mountain,
          title: "Day programmes",
          body: "Valley days from Marrakech with the walking graded to the group rather than to the itinerary title.",
        },
        {
          icon: Route,
          title: "Crossings to the south",
          body: "Planned with deliberate slack and an agreed decision point if the road holds up.",
        },
        {
          icon: Bus,
          title: "Vehicle matching",
          body: "Class chosen for the road, with the alternative stated where a coach is not the right answer.",
        },
        {
          icon: Languages,
          title: "Guiding",
          body: "Guides briefed on the group’s mobility and on what to drop if the day runs long.",
        },
        {
          icon: Coffee,
          title: "Lunch and stops",
          body: "Stops chosen for facilities and timing, not only for the view.",
        },
        {
          icon: Snowflake,
          title: "Winter planning",
          body: "A stated alternative route or day that does not depend on the pass.",
        },
      ]}
      checklist={{
        title: "What we establish before quoting an Atlas day",
        items: [
          "Whether the day returns to Marrakech or commits to arriving elsewhere",
          "The mobility range in the group, and the version that keeps it together",
          "Vehicle class against the specific road, not the headcount",
          "The decision point: when a delay changes the plan rather than extends it",
          "The winter alternative, agreed before the season rather than during it",
          "Where lunch and facilities actually are along the chosen line",
        ],
        evidence:
          "No Atlas distances, drive times or pass conditions are published on this page. Route measurement is under way; the southern crossings appear on route intelligence as they are driven and logged.",
      }}
      faq={{ heading: "What operators ask about the Atlas", faqs: FAQS }}
      cta={{
        title: "Planning an Atlas day or crossing",
        body: "Send the itinerary and tell us where the group sleeps that night. That single fact changes how the day should be planned.",
      }}
    />
  );
}
