import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { StatusChip } from "@/components/StatusChip";
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

export default function B2bPage() {
  return (
    <>
      <PageIntro
        eyebrow="For travel trade"
        title="Built for people who resell Morocco"
        standfirst="This is a trade operation. Every workflow here assumes you have your own client, your own margin and your own reputation on the line."
      />

      <Container as="section" className="py-16 lg:py-24">
        <div className="measure flex flex-col gap-6 text-base text-meta">
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
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          What a service status means on our quotes
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {SERVICE_STATUSES.map((item) => (
            <li
              key={item.label}
              className="rounded-[var(--radius-data)] border border-line-soft px-4 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-medium text-ink">{item.label}</span>
                <StatusChip status={item.status} label={item.label} />
              </div>
              <p className="mt-2 text-sm text-meta">{item.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Evidence note="These statuses are enforced in our own systems rather than left to whoever writes the quote. A service cannot be presented as confirmed unless it has been recorded as confirmed." />
        </div>
      </Container>

      <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          How we work with the trade
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="White label">
            Your brand on the meet board, the vehicle and the briefing. We do
            not introduce ourselves to your clients.
          </Card>
          <Card title="Overflow capacity">
            For Morocco specialists whose own ground capacity is committed. A
            working relationship, not a competitive one.
          </Card>
          <Card title="Series programmes">
            Repeating departures run against the same file, so the second
            operation benefits from the first.
          </Card>
          <Card title="Backup planning">
            A named fallback for every movement: vehicle, venue or route.
          </Card>
          <Card title="One point of contact">
            The person who qualified your brief is the person who answers when
            something changes.
          </Card>
          <Card title="Honest limits">
            Where we cannot staff something properly we say so rather than
            taking the booking.
          </Card>
        </div>
      </Container>

      <FaqSection heading="Trade questions" faqs={FAQS} />

      <Container as="section" className="py-16 lg:py-24">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Start with something real
        </h2>
        <p className="measure mt-4 text-base text-meta">
          Send a live requirement rather than a general enquiry. You will learn
          more from the quote than from anything on this site. The method behind
          it is in{" "}
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
