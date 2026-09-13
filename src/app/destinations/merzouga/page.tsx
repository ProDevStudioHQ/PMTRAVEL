import { Car, ClipboardList, Route, ShieldCheck, Tent, ThermometerSun } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { DestinationPage } from "@/features/destinations/DestinationPage";

export const metadata = pageMetadata({
  title: "Merzouga Ground Operations",
  description:
    "Operating Merzouga from Marrakech: whether two days or three, camp transfer arrangements, heat and season, and what to verify at a camp.",
  path: "/destinations/merzouga",
});

const FAQS = [
  {
    question: "How long does Marrakech to Merzouga take?",
    answer:
      "We have not published that figure yet, because we have not finished logging the route. It is the longest of the nine legs we are measuring, and it is the one where a published figure matters most — the difference between a plausible number and a measured one is the difference between a client arriving for dinner and arriving after it.",
  },
  {
    question: "Should Merzouga be two days or three?",
    answer:
      "Three is usually the honest answer for a group, and two is what sells. The two-day version means a long day out, a short night, and a long day back, which for many groups is the section of the holiday they remember for the wrong reasons. We will tell you which version fits the group you have described rather than quoting the one you asked for and letting it play out.",
  },
  {
    question: "What should we verify about a desert camp?",
    answer:
      "Capacity in the configuration you actually need, the transfer arrangement from where vehicles stop, what the facilities genuinely are, and what happens in bad weather. Camp websites state a tent count; a tent count is not a capacity, and it tells you nothing about whether your group can be served a single seated dinner together.",
  },
  {
    question: "Does the season change the plan?",
    answer:
      "Substantially. Heat changes what can be scheduled and when, and it changes how long people are willing to sit in a vehicle. A programme that works comfortably in one part of the year can be genuinely unpleasant in another, and adjusting the timings is not enough on its own.",
  },
];

export default function MerzougaPage() {
  return (
    <DestinationPage
      slug="merzouga"
      title="Merzouga"
      standfirst="The longest standard leg we run, and the one where the real question is not how to operate it but whether the itinerary has allowed enough days for it."
      routeSlug="marrakech-merzouga"
      body={
        <>
          <p>
            Merzouga is the destination most likely to appear in an itinerary
            that has not allowed enough time for it. It is a long way from
            Marrakech, it is the emotional high point of a great many Morocco
            programmes, and it is frequently sold as a two-day round trip
            because that is what fits the week the client bought.
          </p>
          <p>
            The two-day version is operable. It is also a long day out, a short
            night, and a long day back — and for a group of any size, that is
            the part of the holiday they will describe afterwards, not always
            kindly. The three-day version changes the experience entirely. We
            would rather tell you that before you sell it than operate the
            version you asked for and let your client discover the difference.
          </p>
          <p>
            This is the route where measured drive data matters most, and it is
            precisely where the industry&rsquo;s published numbers are least
            reliable. A figure that is out by an hour is an inconvenience on a
            short transfer; on this leg it is the difference between a group
            arriving in time for dinner and arriving after it, in the dark, at a
            camp they reach by a further transfer. We are logging this route
            ourselves for that reason and will publish what we measure.
          </p>
          <p>
            At the destination, the questions are about the camp and the
            transfer into it. Vehicles do not typically reach camps directly,
            which means a second arrangement, which means timing, luggage and a
            group split across vehicles. What a camp can serve as a single
            seated dinner is a different number from its tent count, and the
            tent count is what camp websites publish. We record the first and
            treat the second as unconfirmed until we have counted.
          </p>
          <p>
            Season runs through all of it. Heat determines what can be scheduled
            and when, how long a group will tolerate a vehicle, and whether the
            middle of the day is usable at all. It is not solved by moving
            activities an hour.
          </p>
        </>
      }
      services={[
        {
          icon: Route,
          title: "Multi-day southern circuits",
          body: "Built around where the group sleeps each night rather than around a list of sights.",
        },
        {
          icon: Car,
          title: "Camp transfers",
          body: "The second arrangement from where vehicles stop, planned with luggage and timing in mind.",
        },
        {
          icon: Tent,
          title: "Camp selection",
          body: "Matched to what the group actually needs served, not to a tent count.",
        },
        {
          icon: ClipboardList,
          title: "Driver briefing",
          body: "Long-leg driving planned with stops that have usable facilities.",
        },
        {
          icon: ThermometerSun,
          title: "Seasonal scheduling",
          body: "Programmes adjusted for heat rather than nudged by an hour.",
        },
        {
          icon: ShieldCheck,
          title: "Backup planning",
          body: "A stated fallback for vehicles and for the camp itself.",
        },
      ]}
      checklist={{
        title: "What we establish before quoting Merzouga",
        items: [
          "Whether the itinerary has allowed two days or three, and which it needs",
          "Where the group sleeps each night, which governs everything else",
          "The transfer arrangement into the camp, and what it does to timings",
          "What the camp can serve as a single seated dinner, measured",
          "Facilities on the route, not only stops with a view",
          "The month, and what it makes unworkable",
        ],
        evidence:
          "No drive time, distance or camp capacity for Merzouga appears on this page. This is the longest leg in the measurement programme and the figures will be published once it has been driven and logged, with the number of runs behind them.",
      }}
      faq={{ heading: "What operators ask about Merzouga", faqs: FAQS }}
      cta={{
        title: "Planning a southern circuit",
        body: "Send the whole circuit rather than the Merzouga night. Where the group sleeps on each of the other nights is what determines whether this one works.",
      }}
    />
  );
}
