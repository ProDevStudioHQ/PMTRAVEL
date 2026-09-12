import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/Button";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
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

export default function RoutesPage() {
  const publishedCount = ROUTES.filter(isPublished).length;
  const remaining = Math.max(0, ROUTES_PAGE_THRESHOLD - publishedCount);

  return (
    <>
      <PageIntro
        eyebrow="Route intelligence"
        title="Drive data we measured ourselves"
        standfirst="Almost every Morocco drive time online came from a mapping service or from repetition. Ours are published only after our own drivers have driven the route and logged it."
      />

      <Container as="section" className="py-16 lg:py-24">
        <RouteTable linkPublished />

        <div className="measure mt-10 flex flex-col gap-4">
          <p className="text-base text-meta">
            {publishedCount === 0
              ? `None of the nine target routes has enough logged runs to publish yet. The programme is under way; the first figures appear here the moment a route reaches ${MIN_LOGS_TO_PUBLISH} logged runs, without anything being written by hand.`
              : `${publishedCount} of the nine target routes ${publishedCount === 1 ? "has" : "have"} enough logged runs to publish.`}
          </p>
          {remaining > 0 ? (
            <p className="text-sm text-meta">
              This page is treated as complete at{" "}
              {ROUTES_PAGE_THRESHOLD} verified routes. {remaining} to go.
            </p>
          ) : null}
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          What we record on every run
        </h2>
        <p className="measure mt-4 text-base text-meta">
          A drive log is not a note in someone&rsquo;s phone. Each run captures
          the same fields so that runs can be compared and a median means
          something.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Odometer distance", "Start and end reading, not an estimate."],
            ["Moving time", "Wheels turning, excluding planned stops."],
            ["Door-to-door time", "What the client actually experiences."],
            ["Departure time", "A Friday morning out of Marrakech is not a Tuesday one."],
            ["Vehicle", "Distance is the same; a coach over a pass is not."],
            ["Conditions", "Weather, roadworks, closures, anything that made this run atypical."],
            ["Driver", "Named. A run with no named driver is not evidence."],
          ].map(([title, body]) => (
            <li
              key={title}
              className="rounded-[var(--radius-data)] border border-line-soft p-5"
            >
              <h3 className="text-sm font-medium text-ink">{title}</h3>
              <p className="mt-2 text-sm text-meta">{body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Evidence note="Published figures are the median across logged runs, never a single run and never an average that one unusual journey can drag. Both the sample size and the dates it covers are shown with the figure." />
        </div>
      </Container>

      <FaqSection heading="About these numbers" faqs={FAQS} />

      <Container as="section" className="py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Planning against real timings
        </h2>
        <p className="measure mt-4 text-base text-meta">
          If you are building an itinerary and need to know whether a day works,
          send it to us. We will tell you which legs we have measured and which
          we have not, rather than confirming the whole thing and finding out on
          the day. More on that in{" "}
          <Link href="/how-we-work" className="text-petrol underline">
            how we work
          </Link>
          .
        </p>
        <div className="mt-8">
          <ButtonLink href={RFQ_HREF} variant="accent">
            Request a B2B quote
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
