import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CircleCheck,
  CircleX,
  ClipboardCheck,
  MapPinned,
  Search,
  Send,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { CtaBanner, PILL, SectionHeading } from "@/components/Modern";
import { Section } from "@/components/Section";
import { StatusChip } from "@/components/StatusChip";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "How We Work and How We Verify",
  description:
    "PM Travel's workflow from brief to operation, and the verification standard behind every operational figure we publish.",
  path: "/how-we-work",
});

/** A genuine sequence, so the steps are numbered (SOP 2.3). */
const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Send,
    title: "Brief",
    body: "You send a requirement. Step one of the form is deliberately short, because a buyer with a deadline will not fill in twenty fields. Everything optional can follow.",
  },
  {
    icon: ClipboardCheck,
    title: "Qualification",
    body: "We confirm dates, group profile and destinations, and we ask the question most quotes skip: what would make this programme fail? Mobility, a fixed flight, a client who has been before, a hard finish time. That answer shapes everything after it.",
  },
  {
    icon: Search,
    title: "Research and matching",
    body: "Suppliers and venues are matched against what we have verified rather than against what is advertised. Where we have not verified something the brief depends on, we say so at this stage rather than at the costing stage.",
  },
  {
    icon: Calculator,
    title: "Costing and internal review",
    body: "Every service is costed with an explicit status. A second person checks the quote before it leaves, specifically for services that read as confirmed but are not.",
  },
  {
    icon: Truck,
    title: "Operation",
    body: "Drivers and guides are briefed to the itinerary you sold. Every movement carries a named backup. Our office is in Marrakech, so when something changes, someone can physically be there.",
  },
];

/** The eight things every operational claim records. */
const CLAIM_FIELDS = [
  "The claim",
  "The source",
  "Source type",
  "Source URL",
  "Date retrieved",
  "Date verified",
  "Who verified it",
  "Confidence",
];

const WHEN_NO_EVIDENCE = [
  { allowed: true, text: "Show that verification is in progress" },
  { allowed: true, text: "Leave the claim out" },
  { allowed: true, text: "Leave the value empty and raise a verification task" },
  { allowed: false, text: "Fill the gap with a plausible value" },
];

const CONFIDENCE = [
  {
    level: "High",
    bars: 4,
    body: "A PM Travel site visit, a PM Travel measurement, or an official government source — and a named verifier. Nothing reaches high without a person's name against it.",
  },
  {
    level: "Medium",
    bars: 3,
    body: "A supplier's official information, or trade press. A supplier's own website is medium at best, never high, however confident it sounds.",
  },
  {
    level: "Low",
    bars: 2,
    body: "Secondary web sources. Useful for orientation, never for a client-facing commitment.",
  },
  {
    level: "Unverified",
    bars: 1,
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
      <DestinationHero
        title="Our workflow, and how we verify"
        standfirst="Two things decide whether a Morocco programme runs well: how the brief becomes a plan, and whether the numbers behind that plan are real."
        imageKey="b7-fes-medina"
        kicker="How we work"
        trail={[{ href: "/how-we-work", label: "How We Work" }]}
        stats={[
          { value: String(STEPS.length), label: "Steps, brief to operation" },
          { value: String(CLAIM_FIELDS.length), label: "Fields on every claim" },
          { value: String(CONFIDENCE.length), label: "Confidence levels" },
        ]}
      >
        <a href="#workflow" className={PILL.onDarkSolid}>
          See the workflow
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </a>
        <a href="#standard" className={PILL.onDarkOutline}>
          The verification standard
        </a>
      </DestinationHero>

      {/* Workflow */}
      <Section tone="paper-2" id="workflow">
        <SectionHeading eyebrow="The workflow" title="From brief to operation" />
        <ol className="relative mt-14 flex flex-col gap-5 before:absolute before:top-4 before:bottom-4 before:left-7 before:hidden before:w-0.5 before:bg-red-600/20 before:content-[''] sm:before:block">
          {STEPS.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="relative sm:pl-20">
              <span
                aria-hidden="true"
                className="absolute top-6 left-0 hidden size-14 items-center justify-center rounded-2xl bg-red-600 text-paper shadow-raised ring-8 ring-paper-2 sm:flex"
              >
                <Icon size={24} strokeWidth={1.75} />
              </span>
              <article className="grid gap-4 rounded-2xl border border-rule bg-paper p-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8 lg:p-8">
                <div>
                  <span className="tabular rounded-full bg-ink-900 px-3 py-1 font-display text-xs font-bold text-paper">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">{title}</h3>
                </div>
                <p className="text-base text-ink-500">{body}</p>
              </article>
            </li>
          ))}
        </ol>
      </Section>

      {/* The page's one deep section: the standard itself. */}
      <section id="standard" className="surface-deep scroll-mt-16 bg-ink-900 text-paper">
        <div className="mx-auto w-full max-w-[var(--container-site)] px-5 py-20 lg:px-[72px] lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <SectionHeading eyebrow="The verification standard" title="A figure with provenance is a different object" onDark>
                <p>
                  Every operational claim we publish records eight things: the claim,
                  the source, the source type, the source URL where there is one, the
                  date it was retrieved, the date it was verified, who verified it,
                  and how confident we are. That record is the point. A drive time
                  with provenance is a different object from a drive time without one,
                  even when the two numbers happen to match.
                </p>
              </SectionHeading>
              <ul className="mt-8 flex flex-wrap gap-2">
                {CLAIM_FIELDS.map((field, index) => (
                  <li
                    key={field}
                    className="flex items-center gap-2 rounded-full border border-paper/20 bg-paper/[0.06] px-4 py-2 text-sm text-paper"
                  >
                    <span aria-hidden="true" className="tabular font-display text-xs font-bold text-paper/50">
                      {index + 1}
                    </span>
                    {field}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-paper/12 bg-paper/[0.05] p-7">
              <h3 className="font-display text-lg font-semibold text-paper">When we do not have the evidence</h3>
              <p className="mt-2 text-sm text-paper/75">We have exactly three options.</p>
              <ul className="mt-6 flex flex-col gap-3">
                {WHEN_NO_EVIDENCE.map((option) => (
                  <li
                    key={option.text}
                    className={`flex items-start gap-3 rounded-2xl p-4 text-base ${
                      option.allowed ? "bg-paper/[0.07] text-paper" : "border border-dashed border-paper/25 text-paper/60 line-through"
                    }`}
                  >
                    {option.allowed ? (
                      <CircleCheck aria-hidden="true" size={20} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                    ) : (
                      <CircleX aria-hidden="true" size={20} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                    )}
                    <span>
                      {option.text}
                      {option.allowed ? null : <span className="sr-only"> (not allowed)</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-paper/75">
                A believable drive time added to make a table look complete would
                destroy the only thing that makes the rest of this site worth
                reading.
              </p>
            </div>
          </div>

          <h3 className="mt-20 font-display text-xl font-semibold text-paper lg:text-2xl">Confidence levels</h3>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CONFIDENCE.map((item) => (
              <div key={item.level} className="flex flex-col rounded-2xl border border-paper/12 bg-paper/[0.05] p-6">
                <dt className="flex items-center justify-between gap-3">
                  <span className="font-display text-lg font-semibold text-paper">{item.level}</span>
                  <span aria-hidden="true" className="flex gap-1">
                    {[1, 2, 3, 4].map((bar) => (
                      <span
                        key={bar}
                        className={`h-4 w-1.5 rounded-full ${bar <= item.bars ? "bg-paper" : "bg-paper/20"}`}
                      />
                    ))}
                  </span>
                </dt>
                <dd className="mt-3 text-sm text-paper/85">{item.body}</dd>
              </div>
            ))}
          </dl>

          <div className="measure mt-8">
            <Evidence
              onDark
              note="This standard is applied to route data, venue data and capability statements alike. Where a page on this site shows no figure, it is because no figure has been verified — not because the page is unfinished."
            />
          </div>
        </div>
      </section>

      {/* Proof */}
      <Section>
        <SectionHeading eyebrow="The cost of the standard" title="Where you can see it working">
          <p>
            The standard is easy to claim, so the useful thing is to look at what
            it has cost us. We could fill the page below this afternoon from
            public sources, and every competitor&rsquo;s page suggests they have.
          </p>
        </SectionHeading>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {[
            {
              icon: MapPinned,
              title: "MICE and events",
              body: "There are no venue capacities, because we have not finished inspecting them.",
              href: "/mice",
            },
          ].map(({ icon: Icon, title, body, href }) => (
            <li key={title}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-rule bg-paper-2 p-7 transition-colors duration-200 hover:border-red-600">
                <div className="flex items-center justify-between gap-4">
                  <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-xl bg-red-600 text-paper">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <StatusChip status="pending" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">
                  <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                    {title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-base text-ink-500">{body}</p>
                <ArrowRight aria-hidden="true" size={18} className="mt-5 text-red-600 transition-transform duration-200 group-hover:translate-x-1" />
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <FaqSection heading="Questions about the method" faqs={FAQS} tone="paper-2" />

      <Section>
        <CtaBanner
          title="See the method applied to your programme"
          imageKey="b7-fes-medina"
          primary={{ href: RFQ_HREF, label: "Request a B2B quote" }}
          secondary={{ href: "#standard", label: "The verification standard" }}
        >
          <p>
            Send a real brief. Every line that comes back states what has been
            verified, what is requested and what is confirmed.
          </p>
        </CtaBanner>
      </Section>
    </>
  );
}
