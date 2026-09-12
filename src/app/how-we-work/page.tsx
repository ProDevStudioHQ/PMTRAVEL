import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/Button";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "How We Work and How We Verify",
  description:
    "PM Travel's workflow from brief to operation, and the verification standard behind every operational figure we publish.",
  path: "/how-we-work",
});

const STEPS = [
  {
    number: "1",
    title: "Brief",
    body: "You send a requirement. Step one of the form is deliberately short, because a buyer with a deadline will not fill in twenty fields. Everything optional can follow.",
  },
  {
    number: "2",
    title: "Qualification",
    body: "We confirm dates, group profile and destinations, and we ask the question most quotes skip: what would make this programme fail? Mobility, a fixed flight, a client who has been before, a hard finish time. That answer shapes everything after it.",
  },
  {
    number: "3",
    title: "Research and matching",
    body: "Suppliers and venues are matched against what we have verified rather than against what is advertised. Where we have not verified something the brief depends on, we say so at this stage rather than at the costing stage.",
  },
  {
    number: "4",
    title: "Costing and internal review",
    body: "Every service is costed with an explicit status. A second person checks the quote before it leaves, specifically for services that read as confirmed but are not.",
  },
  {
    number: "5",
    title: "Operation",
    body: "Drivers and guides are briefed to the itinerary you sold. Every movement carries a named backup. Our office is in Marrakech, so when something changes, someone can physically be there.",
  },
];

const CONFIDENCE = [
  {
    level: "High",
    body: "A PM Travel site visit, a PM Travel measurement, or an official government source — and a named verifier. Nothing reaches high without a person's name against it.",
  },
  {
    level: "Medium",
    body: "A supplier's official information, or trade press. A supplier's own website is medium at best, never high, however confident it sounds.",
  },
  {
    level: "Low",
    body: "Secondary web sources. Useful for orientation, never for a client-facing commitment.",
  },
  {
    level: "Unverified",
    body: "The default. Everything starts here, including anything AI-generated, and stays here until someone does the work.",
  },
];

const FAQS = [
  {
    question: "How do you verify an operational claim?",
    answer:
      "Every claim we hold records the claim itself, the source, the source type, the URL where there is one, the date retrieved, the date verified, who verified it, and a confidence level. That record is what lets us tell you how much weight a number deserves, which is more useful than a number presented with no provenance at all.",
  },
  {
    question: "Why is a supplier's website not enough?",
    answer:
      "Because supplier figures are usually the most generous reading of a space, repeated until they became a fact. If a camp's website says fifty-two tents, we record that as medium confidence and it stays there until someone from PM Travel has been there and counted. That is not an accusation of dishonesty — it is that nobody measured.",
  },
  {
    question: "What happens when evidence goes out of date?",
    answer:
      "Old evidence is never overwritten. New evidence is appended and supersedes it, and the previous record stays as the account of what was true then. Anything whose most recent verification is more than twelve months old is flagged for re-checking, because a road, a venue or an access arrangement can change without announcing it.",
  },
  {
    question: "How quickly do you respond to a quote request?",
    answer:
      "We do not publish a figure, because we have not measured our own yet. Every request is timestamped and every status change is recorded, so the measurement is running from the first enquiry onwards. When there is enough real data we will publish the median and the period it covers. Treat any operator's stated response time — including one we could easily have invented — as marketing until it comes with a method.",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageIntro
        eyebrow="How we work"
        title="Our workflow, and how we verify"
        standfirst="Two things decide whether a Morocco programme runs well: how the brief becomes a plan, and whether the numbers behind that plan are real."
      />

      <Container as="section" className="py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          From brief to operation
        </h2>
        <ol className="mt-10 flex flex-col gap-5">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="rounded-[var(--radius-card)] border border-line-soft p-6"
            >
              <div className="flex items-baseline gap-4">
                <span className="tabular text-lg font-medium text-petrol">
                  {step.number}
                </span>
                <h3 className="text-lg font-medium text-ink">{step.title}</h3>
              </div>
              <p className="measure mt-3 text-sm text-meta">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          The verification standard
        </h2>
        <div className="measure mt-6 flex flex-col gap-6 text-base text-meta">
          <p>
            Every operational claim we publish records eight things: the claim,
            the source, the source type, the source URL where there is one, the
            date it was retrieved, the date it was verified, who verified it,
            and how confident we are. That record is the point. A drive time
            with provenance is a different object from a drive time without one,
            even when the two numbers happen to match.
          </p>
          <p>
            When we do not have the evidence, we have exactly three options:
            show that verification is in progress, leave the claim out, or leave
            the value empty and raise a verification task. Filling the gap with
            a plausible value is not on the list, and that is not a stylistic
            preference — a believable drive time added to make a table look
            complete would destroy the only thing that makes the rest of this
            site worth reading.
          </p>
        </div>

        <dl className="mt-10 grid gap-5 sm:grid-cols-2">
          {CONFIDENCE.map((item) => (
            <div
              key={item.level}
              className="rounded-[var(--radius-data)] border border-line-soft p-6"
            >
              <dt className="text-sm font-medium text-ink">{item.level}</dt>
              <dd className="mt-2 text-sm text-meta">{item.body}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <Evidence note="This standard is applied to route data, venue data and capability statements alike. Where a page on this site shows no figure, it is because no figure has been verified — not because the page is unfinished." />
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Where you can see it working
        </h2>
        <p className="measure mt-4 text-base text-meta">
          The standard is easy to claim, so the useful thing is to look at what
          it has cost us. On{" "}
          <Link href="/routes" className="text-petrol underline">
            route intelligence
          </Link>{" "}
          every row currently reads &ldquo;verification in progress&rdquo;,
          because we have not finished driving them. On{" "}
          <Link href="/mice" className="text-petrol underline">
            MICE and events
          </Link>{" "}
          there are no venue capacities, because we have not finished inspecting
          them. We could fill both pages this afternoon from public sources, and
          every competitor&rsquo;s page suggests they have.
        </p>
        <div className="mt-8">
          <ButtonLink href={RFQ_HREF} variant="accent">
            Request a B2B quote
          </ButtonLink>
        </div>
      </Container>

      <FaqSection heading="Questions about the method" faqs={FAQS} />
    </>
  );
}
