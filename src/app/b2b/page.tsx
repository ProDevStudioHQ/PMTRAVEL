import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { Section, SectionIntro } from "@/components/Section";
import { StatusChip } from "@/components/StatusChip";
import { TextLink } from "@/components/TextLink";
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
      "Company, country, dates, destinations, traveller numbers and what the programme has to achieve. That is step one of the quote form and it is the entire required set. Rooming detail, hotel category and budget sharpen the answer, but waiting until you have all of them costs you more time than sending the outline now.",
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

const TRADE_TERMS = [
  {
    title: "White label",
    body: "Your brand on the meet board, the vehicle and the briefing. We do not introduce ourselves to your clients.",
  },
  {
    title: "Overflow capacity",
    body: "For Morocco specialists whose own ground capacity is committed. A working relationship, not a competitive one.",
  },
  {
    title: "Series programmes",
    body: "Repeating departures run against the same file, so the second operation benefits from the first.",
  },
  {
    title: "Backup planning",
    body: "A named fallback for every movement: vehicle, venue or route.",
  },
  {
    title: "One point of contact",
    body: "The person who qualified your brief is the person who answers when something changes.",
  },
  {
    title: "Honest limits",
    body: "Where we cannot staff something properly we say so rather than taking the booking.",
  },
];

export default function B2bPage() {
  return (
    <>
      {/*
        Hero treatment: a statement. One large claim on paper-2, held by a
        red-600 rule - a key rule, which the SOP allows red to carry.
      */}
      <section className="border-b border-rule bg-paper-2">
        <Container className="py-24 lg:py-32">
          <div className="border-l-4 border-red-600 pl-6 lg:pl-12">
            <h1 className="max-w-[16ch] text-3xl font-bold tracking-tight text-ink-900 lg:text-4xl">
              Built for people who resell Morocco
            </h1>
            <p className="measure mt-6 text-lg text-ink-500">
              This is a trade operation. Every workflow here assumes you have your
              own client, your own margin and your own reputation on the line.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={RFQ_HREF}>Request a B2B quote</ButtonLink>
              <ButtonLink href="#statuses" variant="secondary">
                What a service status means
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="measure flex flex-col gap-6 text-base text-ink-900">
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
        </div>
      </Section>

      {/* The page's one deep section: the six statuses every quote line carries. */}
      <Section tone="deep" id="statuses">
        <SectionIntro title="What a service status means on our quotes" onDark />
        <dl className="mt-12 grid border-t border-paper/15 sm:grid-cols-2 sm:gap-x-12">
          {SERVICE_STATUSES.map((item) => (
            <div key={item.label} className="border-b border-paper/15 py-6">
              <dt>
                <StatusChip status={item.status} label={item.label} size="lg" onDark />
              </dt>
              <dd className="mt-2 text-base text-paper/90">{item.body}</dd>
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
        <SectionIntro title="How we work with the trade" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRADE_TERMS.map((term) => (
            <li key={term.title}>
              <Card title={term.title} className="h-full">
                {term.body}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <FaqSection heading="Trade questions" faqs={FAQS} />

      <Section tone="paper-2">
        <SectionIntro title="Start with something real">
          <p>
            Send a live requirement rather than a general enquiry. You will learn
            more from the quote than from anything on this site. The method behind
            it is in <TextLink href="/how-we-work">how we work</TextLink>.
          </p>
        </SectionIntro>
        <div className="mt-8">
          <ButtonLink href={RFQ_HREF}>Request a B2B quote</ButtonLink>
        </div>
      </Section>
    </>
  );
}
