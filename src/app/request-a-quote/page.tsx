import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { Evidence } from "@/components/Evidence";
import { FaqSection } from "@/components/FaqSection";
import { RfqForm } from "@/features/rfq/RfqForm";
import { COMPANY } from "@/lib/nav";

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
        eyebrow="Request a quote"
        title="Send us your requirement"
        standfirst="Step one takes a company name, dates, destinations, traveller numbers and a brief. Everything after that is optional, and can follow later."
      />

      <Container as="section" className="py-16 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <RfqForm />
          </div>

          <aside className="flex flex-col gap-8">
            <div className="rounded-[var(--radius-data)] border border-line-soft p-6">
              <h2 className="text-lg font-medium text-ink">What comes back</h2>
              <ol className="mt-4 flex flex-col gap-3 text-sm text-meta">
                <li>1. We qualify the brief and come back on anything unclear.</li>
                <li>2. We match it against suppliers and venues we have verified.</li>
                <li>
                  3. We cost it, with every line marked requested, on option, held
                  or confirmed.
                </li>
              </ol>
              <p className="mt-4 text-sm text-meta">
                Nothing unconfirmed is ever presented to you as confirmed. More on
                that in{" "}
                <Link href="/how-we-work" className="text-petrol underline">
                  how we work
                </Link>
                .
              </p>
            </div>

            <div className="rounded-[var(--radius-data)] border border-line-soft p-6">
              <h2 className="text-lg font-medium text-ink">Rather email?</h2>
              <p className="mt-3 text-sm text-meta">
                A plain email enters the same workflow and is logged the same way.
              </p>
              <p className="mt-4 text-sm">
                <a
                  className="text-petrol underline"
                  href={`mailto:${COMPANY.email.b2b}`}
                >
                  {COMPANY.email.b2b}
                </a>
              </p>
            </div>

            <Evidence note="No response-time promise appears on this page. We are measuring our own from real requests and will publish the median once there is enough data to mean something." />
          </aside>
        </div>
      </Container>

      <FaqSection heading="Before you send it" faqs={FAQS} />
    </>
  );
}
