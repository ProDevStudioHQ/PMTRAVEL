import { BadgePercent, Crown, Headset, Zap } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/Container";
import { FaqSection } from "@/components/FaqSection";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { RfqForm } from "@/features/rfq/RfqForm";
import { RFQ_NEXT_STEPS } from "@/features/rfq/next-steps";

export const metadata = pageMetadata({
  title: "Request a B2B Quote",
  description:
    "Join the PM Travel network: exclusive B2B programmes, competitive net rates and dedicated support for your agency.",
  path: "/request-a-quote",
});

/*
  CONTENT CHECK: these figures were supplied by the client and are not yet
  backed by measured data. docs/START.md forbids unconfirmed claims and any
  response-time promise; confirm each one before launch.
*/
const BENEFITS = [
  { icon: BadgePercent, title: "Exclusive net rates", detail: "Up to 30% savings" },
  { icon: Headset, title: "24/7 support", detail: "Dedicated team" },
  { icon: Crown, title: "Premium programmes", detail: "50+ itineraries" },
  { icon: Zap, title: "Fast quotes", detail: "Within 24h" },
];

const FAQS = [
  {
    question: "What information does a Morocco DMC need to quote?",
    answer:
      "Company, contact details, traveller numbers and the programme type are enough to open a file. Rooming detail, hotel category, guide language, meals and budget sharpen the answer, but holding the request back until you have all of them costs you more time than sending the outline today.",
  },
  {
    question: "Do I have to fill in the whole form?",
    answer:
      "No. The company and contact steps are required and deliberately short. The logistics and notes steps are optional and can be sent later by replying to the acknowledgement.",
  },
  {
    question: "Will my client's details be used as a case study?",
    answer:
      "Not without your written permission. There are no case studies on this site and none will appear that a client has not agreed to in writing.",
  },
];

export default function RequestAQuotePage() {
  return (
    <>
      <section className="border-b border-rule bg-paper">
        <Container className="py-14 lg:py-20">
          <h1 className="max-w-[18ch] text-3xl font-bold tracking-tight text-ink-900 lg:text-4xl">
            Join Our Network
          </h1>
          <p className="measure mt-5 text-lg text-ink-500">
            Access exclusive B2B programmes, competitive net rates and dedicated
            support for your agency.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, detail }) => (
              <li
                key={title}
                className="flex flex-col gap-4 rounded-2xl border border-rule bg-paper-2/50 p-5 sm:flex-row sm:items-center"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-paper shadow-raised"
                >
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-base font-semibold text-ink-900">{title}</span>
                  <span className="mt-0.5 block text-sm text-ink-500">{detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section tone="paper-2">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
          <RfqForm />

          <aside className="flex flex-col gap-10">
            <div>
              <h2 className="text-lg font-semibold text-ink-900">What comes back</h2>
              {/* A genuine sequence, so it is numbered. The same list closes the form. */}
              <ol className="mt-4 border-t border-rule">
                {RFQ_NEXT_STEPS.map((item, index) => (
                  <li key={item} className="flex gap-4 border-b border-rule py-3 text-base text-ink-500">
                    <span className="tabular font-display font-bold text-ink-900">{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-base text-ink-500">
                Nothing unconfirmed is ever presented to you as confirmed. More on
                that in <TextLink href="/how-we-work">how we work</TextLink>.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <FaqSection heading="Before you send it" faqs={FAQS} />
    </>
  );
}
