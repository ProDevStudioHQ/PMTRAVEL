import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { Section, SectionIntro } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
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
const DRIVE_LOG_FIELDS = [
  ["Odometer distance", "Start and end reading, not an estimate."],
  ["Moving time", "Wheels turning, excluding planned stops."],
  ["Door-to-door time", "What the client actually experiences."],
  ["Departure time", "A Friday morning out of Marrakech is not a Tuesday one."],
  ["Vehicle", "Distance is the same; a coach over a pass is not."],
  ["Conditions", "Weather, roadworks, closures, anything that made this run atypical."],
  ["Driver", "Named. A run with no named driver is not evidence."],
] as const;

export default function RoutesPage() {
  const publishedCount = ROUTES.filter(isPublished).length;
  const targetCount = ROUTES.length;

  // Real programme settings, read from the code that enforces them - not
  // statistics. The published count lives in the table's own band.
  const programme = [
    { term: "Routes being measured", value: targetCount },
    { term: "Logged runs needed to publish a route", value: MIN_LOGS_TO_PUBLISH },
    { term: "Verified routes before this page is complete", value: ROUTES_PAGE_THRESHOLD },
  ];

  return (
    <>
      {/* Quiet on purpose: the boldness on this page belongs to the table. */}
      <section className="border-b border-rule bg-paper">
        <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:items-end lg:py-24">
          <div className="lg:col-span-7">
            <h1 className="max-w-[16ch] text-3xl font-bold tracking-tight text-ink-900 lg:text-4xl">
              Drive data we measured ourselves
            </h1>
            <p className="measure mt-6 text-lg text-ink-500">
              Almost every Morocco drive time online came from a mapping service
              or from repetition. Ours are published only after our own drivers
              have driven the route and logged it.
            </p>
          </div>
          <dl className="border-t border-rule lg:col-span-4 lg:col-start-9">
            {programme.map((item) => (
              <div
                key={item.term}
                className="flex items-baseline justify-between gap-6 border-b border-rule py-4"
              >
                <dt className="text-sm text-ink-500">{item.term}</dt>
                <dd className="tabular font-display text-2xl font-bold text-ink-900">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section tone="paper-2">
        <RouteTable linkPublished />
        <div className="measure mt-8 flex flex-col gap-4 text-base text-ink-500">
          <p>
            {publishedCount === 0
              ? `None of the ${targetCount} target routes has enough logged runs to publish yet. The programme is under way; the first figures appear here the moment a route reaches ${MIN_LOGS_TO_PUBLISH} logged runs, without anything being written by hand.`
              : `${publishedCount} of the ${targetCount} target routes ${publishedCount === 1 ? "has" : "have"} enough logged runs to publish.`}
          </p>
          {/*
            The target and the row count are both read from the data, so they
            can never disagree the way "nine routes, 3 to go" did.
          */}
          {publishedCount < ROUTES_PAGE_THRESHOLD ? (
            <p>
              This page is treated as complete once {ROUTES_PAGE_THRESHOLD} of the{" "}
              {targetCount} routes are verified.
            </p>
          ) : null}
        </div>
      </Section>

      <Section>
        <SectionIntro title="What we record on every run">
          <p>
            A drive log is not a note in someone&rsquo;s phone. Each run captures
            the same fields so that runs can be compared and a median means
            something.
          </p>
        </SectionIntro>
        <dl className="mt-12 grid border-t border-rule sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
          {DRIVE_LOG_FIELDS.map(([title, body]) => (
            <div key={title} className="border-b border-rule py-6">
              <dt className="text-base font-semibold text-ink-900">{title}</dt>
              <dd className="mt-2 text-base text-ink-500">{body}</dd>
            </div>
          ))}
        </dl>
        <div className="measure mt-8">
          <Evidence note="Published figures are the median across logged runs, never a single run and never an average that one unusual journey can drag. Both the sample size and the dates it covers are shown with the figure." />
        </div>
      </Section>

      <FaqSection heading="About these numbers" faqs={FAQS} tone="paper-2" />

      <Section>
        <SectionIntro title="Planning against real timings">
          <p>
            If you are building an itinerary and need to know whether a day works,
            send it to us. We will tell you which legs we have measured and which
            we have not, rather than confirming the whole thing and finding out on
            the day. More on that in <TextLink href="/how-we-work">how we work</TextLink>.
          </p>
        </SectionIntro>
        <div className="mt-8">
          <ButtonLink href={RFQ_HREF}>Request a B2B quote</ButtonLink>
        </div>
      </Section>
    </>
  );
}
