import Link from "next/link";
import { ArrowRight, ChevronRight, Headset, Layers, Repeat, Scale, ShieldCheck, Tag } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { CtaBanner, IconCards, PILL, ProseCard, SectionHeading, type IconItem } from "@/components/Modern";
import { Section } from "@/components/Section";
import { StatusChip } from "@/components/StatusChip";
import { DestinationHero } from "@/features/destinations/DestinationPage";
import { RFQ_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "For Travel Trade and Tour Operators",
  description:
    "White-label Morocco ground operations for tour operators, agencies and destination specialists, with clear service status on every quote.",
  path: "/b2b",
});

const FAQS = [
  {
    question: "Can a Morocco DMC work with international tour operators?",
    answer:
      "Yes, and for most DMCs it is the main business. The operator sells the trip in its own market, under its own brand and its own terms; the DMC contracts and operates the ground programme locally. The practical requirements are that the DMC can invoice you properly, communicate in your working language, and give you service statuses you can rely on when you confirm to your own client.",
  },
  {
    question: "Can PM Travel operate white-label?",
    answer:
      "Yes. Meet boards, vehicle signage, briefings and correspondence carry your brand, and our staff introduce themselves on your behalf. The arrivals hall is where this is most often broken by ground operators handing out their own cards, and it is the point we brief hardest on. Your client relationship stays yours.",
  },
  {
    question: "How do you handle series and overflow work?",
    answer:
      "The same way as one-off groups, with the same file and the same standards. Morocco specialists use us when their own ground capacity is committed, which is a working relationship rather than a competitive one — we are not going to approach your client, and we will tell you plainly where our own capacity is limited rather than accepting work we cannot staff properly.",
  },
  {
    question: "What do you need from us to start?",
    answer:
      "Company, country, dates, destinations, traveller numbers and what the programme has to achieve. Rooming detail, hotel category and budget sharpen the answer, but waiting until you have all of them costs you more time than sending the outline now.",
  },
];

const SERVICE_STATUSES = [
  { label: "Requested", body: "We have asked. Nothing is held.", status: "pending" as const },
  { label: "On option", body: "Held provisionally, with a release date you can see.", status: "pending" as const },
  { label: "Held", body: "Held firm against your file for an agreed period.", status: "verified" as const },
  { label: "Confirmed", body: "Contracted. This is the only status you may sell as certain.", status: "verified" as const },
  { label: "Estimated", body: "A cost indication only. Not a booking of any kind.", status: "unverified" as const },
  { label: "Cancelled or expired", body: "Stated explicitly, never quietly dropped from a revision.", status: "unverified" as const },
];

/** The booking path a line normally travels. */
const STATUS_FLOW = ["Requested", "On option", "Held", "Confirmed"];

const TRADE_TERMS: IconItem[] = [
  {
    icon: Tag,
    title: "White label",
    body: "Your brand on the meet board, the vehicle and the briefing. We do not introduce ourselves to your clients.",
  },
  {
    icon: Layers,
    title: "Overflow capacity",
    body: "For Morocco specialists whose own ground capacity is committed. A working relationship, not a competitive one.",
  },
  {
    icon: Repeat,
    title: "Series programmes",
    body: "Repeating departures run against the same file, so the second operation benefits from the first.",
  },
  {
    icon: ShieldCheck,
    title: "Backup planning",
    body: "A named fallback for every movement: vehicle, venue or route.",
  },
  {
    icon: Headset,
    title: "One point of contact",
    body: "The person who qualified your brief is the person who answers when something changes.",
  },
  {
    icon: Scale,
    title: "Honest limits",
    body: "Where we cannot staff something properly we say so rather than taking the booking.",
  },
];

export default function B2bPage() {
  return (
    <>
      <DestinationHero
        title="Built for people who resell Morocco"
        standfirst="This is a trade operation. Every workflow here assumes you have your own client, your own margin and your own reputation on the line."
        imageKey="c3-tangier-night"
        kicker="For travel trade"
        trail={[{ href: "/b2b", label: "For Travel Trade" }]}
      >
        <Link href={RFQ_HREF} className={PILL.onDarkSolid}>
          Request a B2B quote
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </Link>
        <a href="#statuses" className={PILL.onDarkOutline}>
          What a service status means
        </a>
      </DestinationHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <SectionHeading
            eyebrow="The asymmetry"
            title="You carry the relationship. We carry the execution."
            className="self-start lg:sticky lg:top-24"
          >
            <p>That is the whole reason to be careful about who you work with.</p>
          </SectionHeading>
          <ProseCard>
            <p>
              The uncomfortable part of using a ground partner is that you carry
              the relationship and they carry the execution. Your client does not
              know we exist, and if the day goes badly they do not blame us. That
              asymmetry is the whole reason to be careful about who you work with,
              and it is the reason we are explicit about things most operators
              leave vague.
            </p>
            <p>
              The most common way this relationship fails is not a dramatic
              operational collapse. It is a quote that made an unconfirmed service
              look confirmed. You sell it, the client commits, and three weeks
              later the property was only ever on option and the option lapsed.
              Nobody lied. The quote simply did not distinguish, and the
              distinction only mattered once.
            </p>
            <p>
              So our quotes state a status on every single line, and we would
              rather look slower than look certain. Below is the full set. If a
              line is not marked confirmed, it is not something you should be
              selling as certain, whoever prepared the quote.
            </p>
          </ProseCard>
        </div>
      </Section>

      {/* The page's one deep section: the six statuses every quote line carries. */}
      <Section tone="deep" id="statuses">
        <SectionHeading eyebrow="Service status" title="What a service status means on our quotes" onDark />

        <ol aria-label="The usual booking path" className="mt-10 flex flex-wrap items-center gap-2">
          {STATUS_FLOW.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  index === STATUS_FLOW.length - 1 ? "bg-paper text-red-900" : "border border-paper/30 text-paper"
                }`}
              >
                {step}
              </span>
              {index < STATUS_FLOW.length - 1 ? (
                <ChevronRight aria-hidden="true" size={18} className="text-paper/60" />
              ) : null}
            </li>
          ))}
        </ol>

        <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_STATUSES.map((item) => (
            <div key={item.label} className="rounded-2xl border border-paper/15 bg-paper/[0.06] p-6">
              <dt>
                <StatusChip status={item.status} label={item.label} size="lg" onDark />
              </dt>
              <dd className="mt-3 text-base text-paper/90">{item.body}</dd>
            </div>
          ))}
        </dl>
        <div className="measure mt-8">
          <Evidence
            onDark
            note="These statuses are enforced in our own systems rather than left to whoever writes the quote. A service cannot be presented as confirmed unless it has been recorded as confirmed."
          />
        </div>
      </Section>

      <Section tone="paper-2">
        <SectionHeading eyebrow="Working with the trade" title="How we work with the trade" />
        <div className="mt-12">
          <IconCards items={TRADE_TERMS} columns={3} />
        </div>
      </Section>

      <FaqSection heading="Trade questions" faqs={FAQS} />

      <Section tone="paper-2">
        <CtaBanner
          title="Start with something real"
          imageKey="c3-tangier-night"
          primary={{ href: RFQ_HREF, label: "Request a B2B quote" }}
          secondary={{ href: "/how-we-work", label: "How we work" }}
        >
          <p>
            Send a live requirement rather than a general enquiry. You will learn
            more from the quote than from anything on this site.
          </p>
        </CtaBanner>
      </Section>
    </>
  );
}
