import Link from "next/link";
import { ArrowRight, Bus, CalendarClock, Clock, CloudSun, Gauge, Timer, UserRound } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { CtaBanner, IconCards, PILL, SectionHeading, type IconItem } from "@/components/Modern";
import { Section } from "@/components/Section";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { RouteTable } from "@/features/routes/RouteTable";
import { ROUTES } from "@/features/routes/data";
import { isPublished } from "@/features/routes/publish";
import { ROUTES_PAGE_THRESHOLD, MIN_LOGS_TO_PUBLISH } from "@/features/routes/types";
import { RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "Morocco Route Intelligence",
  description:
    "Drive distances and times from Marrakech, published only after PM Travel drivers have driven and logged the route.",
  path: "/routes",
});

const FAQS = [
  {
    question: "How far is Agafay from Marrakech?",
    answer:
      "We have not published that figure yet, because we have not finished measuring it. Agafay is one of nine routes we are logging from Marrakech, and the distance and drive time will appear on this page with the number of runs they are drawn from and the dates they were driven. We would rather show you an empty cell than a number we copied from somewhere else.",
  },
  {
    question: "Why not just use Google Maps?",
    answer:
      "Because a mapping estimate answers a different question from the one an operator is asking. It does not know that the coach cannot take the short way, that the pass is closed in February, that the group needs a stop with usable facilities, or that a Friday departure out of Marrakech behaves differently from a Tuesday one. Our figures separate wheels-moving time from door-to-door time for exactly that reason.",
  },
  {
    question: "What counts as a verified route here?",
    answer:
      `A route publishes figures only after at least ${MIN_LOGS_TO_PUBLISH} runs have been driven by a named PM Travel driver and logged with odometer distance, moving time, elapsed time, departure time and conditions. The published figure is the median of those runs, and the sample size is shown next to it. A single run is a data point, not a measurement.`,
  },
  {
    question: "What happens when a road changes?",
    answer:
      "The old log is kept and a new run supersedes it. We never overwrite evidence, and any published figure whose most recent run is more than twelve months old is flagged internally for re-driving.",
  },
];

/** The fields of a drive log. A set, not a sequence, so they are not numbered. */
const DRIVE_LOG_FIELDS: IconItem[] = [
  { icon: Gauge, title: "Odometer distance", body: "Start and end reading, not an estimate." },
  { icon: Timer, title: "Moving time", body: "Wheels turning, excluding planned stops." },
  { icon: Clock, title: "Door-to-door time", body: "What the client actually experiences." },
  { icon: CalendarClock, title: "Departure time", body: "A Friday morning out of Marrakech is not a Tuesday one." },
  { icon: Bus, title: "Vehicle", body: "Distance is the same; a coach over a pass is not." },
  { icon: CloudSun, title: "Conditions", body: "Weather, roadworks, closures, anything that made this run atypical." },
  { icon: UserRound, title: "Driver", body: "Named. A run with no named driver is not evidence." },
];

export default function RoutesPage() {
  const publishedCount = ROUTES.filter(isPublished).length;
  const targetCount = ROUTES.length;

  return (
    <>
      <DestinationHero
        title="Drive data we measured ourselves"
        standfirst="Almost every Morocco drive time online came from a mapping service or from repetition. Ours are published only after our own drivers have driven the route and logged it."
        imageKey="c8-dades-gorge"
        kicker="Route intelligence"
        trail={[{ href: "/routes", label: "Route Intelligence" }]}
        // Real programme settings, read from the code that enforces them - not statistics.
        stats={[
          { value: String(targetCount), label: "Routes being measured" },
          { value: String(MIN_LOGS_TO_PUBLISH), label: "Runs needed to publish" },
          { value: String(ROUTES_PAGE_THRESHOLD), label: "Verified routes to complete" },
          { value: String(publishedCount), label: "Routes published" },
        ]}
      >
        <a href="#table" className={PILL.onDarkSolid}>
          See the routes
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </a>
        <Link href={RFQ_HREF} className={PILL.onDarkOutline}>
          Request a B2B quote
        </Link>
      </DestinationHero>

      <Section tone="paper-2" id="table">
        <SectionHeading eyebrow="From Marrakech" title="The route table">
          <p>Every figure comes from logged runs. Everything still being measured says so.</p>
        </SectionHeading>
        <div className="mt-12">
          <RouteTable linkPublished />
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <p className="rounded-2xl border border-rule bg-paper p-5 text-base text-ink-500">
            {publishedCount === 0
              ? `None of the ${targetCount} target routes has enough logged runs to publish yet. The programme is under way; the first figures appear here the moment a route reaches ${MIN_LOGS_TO_PUBLISH} logged runs, without anything being written by hand.`
              : `${publishedCount} of the ${targetCount} target routes ${publishedCount === 1 ? "has" : "have"} enough logged runs to publish.`}
          </p>
          {/*
            The target and the row count are both read from the data, so they
            can never disagree the way "nine routes, 3 to go" did.
          */}
          {publishedCount < ROUTES_PAGE_THRESHOLD ? (
            <p className="rounded-2xl border border-rule bg-paper p-5 text-base text-ink-500">
              This page is treated as complete once {ROUTES_PAGE_THRESHOLD} of the {targetCount} routes are verified.
            </p>
          ) : null}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] lg:gap-16">
          <div className="self-start lg:sticky lg:top-24">
            <SectionHeading eyebrow="The drive log" title="What we record on every run">
              <p>
                A drive log is not a note in someone&rsquo;s phone. Each run
                captures the same fields so that runs can be compared and a median
                means something.
              </p>
            </SectionHeading>
            <div className="mt-6">
              <Evidence note="Published figures are the median across logged runs, never a single run and never an average that one unusual journey can drag. Both the sample size and the dates it covers are shown with the figure." />
            </div>
          </div>
          <IconCards items={DRIVE_LOG_FIELDS} columns={2} tone="muted" />
        </div>
      </Section>

      <FaqSection heading="About these numbers" faqs={FAQS} tone="paper-2" />

      <Section>
        <CtaBanner
          title="Planning against real timings"
          imageKey="c8b-dades-hairpins"
          primary={{ href: RFQ_HREF, label: "Request a B2B quote" }}
          secondary={{ href: "/how-we-work", label: "How we work" }}
        >
          <p>
            If you are building an itinerary and need to know whether a day works,
            send it to us. We will tell you which legs we have measured and which
            we have not, rather than confirming the whole thing and finding out on
            the day.
          </p>
        </CtaBanner>
      </Section>
    </>
  );
}
