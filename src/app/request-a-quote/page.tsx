import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/PageIntro";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { RfqForm } from "@/features/rfq/RfqForm";
import { RFQ_NEXT_STEPS } from "@/features/rfq/next-steps";

export const metadata = pageMetadata({
  title: "Request a B2B Quote",
  description:
    "Send PM Travel a Morocco ground requirement: company, dates, destinations, traveller numbers and a brief. The rest can follow.",
  path: "/request-a-quote",
});

const FAQS = [
  {
    question: "What information does a Morocco DMC need to quote?",
    answer:
      "Company, dates, destinations, traveller numbers and what the programme has to achieve are enough to start costing. Rooming detail, hotel category, guide language, meals and budget sharpen the answer, but holding the brief back until you have all of them costs you more time than sending the outline today.",
  },
  {
    question: "Do I have to fill in the whole form?",
    answer:
      "No. Step one is the entire required form and it is deliberately short. Steps two and three are optional, stay closed until you open them, and can be sent later by replying to the acknowledgement.",
  },
  {
    question: "What happens to the file I attach?",
    answer:
      "It is checked by its actual contents rather than its extension, stored in private storage, and never published or served from a public address. Only staff can retrieve it, through a link that expires.",
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
      <PageIntro
        title="Send us your requirement"
        standfirst="Step one takes a company name, dates, destinations, traveller numbers and a brief. Everything after that is optional, and can follow later."
      />

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

            <Evidence note="No response-time promise appears on this page. We are measuring our own from real requests and will publish the median once there is enough data to mean something." />
          </aside>
        </div>
      </Section>

      <FaqSection heading="Before you send it" faqs={FAQS} />
    </>
  );
}
