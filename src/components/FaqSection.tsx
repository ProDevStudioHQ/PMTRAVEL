import { Plus } from "lucide-react";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";

export type Faq = {
  question: string;
  /** Answer-first: the first sentence answers the question outright. */
  answer: string;
};

type FaqSectionProps = {
  heading: string;
  faqs: Faq[];
  eyebrow?: string;
  intro?: string;
  tone?: "paper" | "paper-2" | "sand" | "white";
  /** Emit FAQPage schema. One FAQPage per page: turn off for secondary lists. */
  schema?: boolean;
};

/**
 * Accordion (native <details>, works without JavaScript) plus FAQPage schema
 * built from the same array, so the markup never claims an unseen question.
 */
export function FaqSection({ heading, faqs, eyebrow = "FAQ", intro, tone = "sand", schema = true }: FaqSectionProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <Section tone={tone}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={eyebrow} title={heading}>
            {intro}
          </SectionHeading>
        </div>
        <div className="lg:col-span-8">
          <div className="border-t border-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-line">
                <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-left">
                  <h3 className="font-display text-[1.4rem] leading-snug font-semibold text-ink">{faq.question}</h3>
                  <span className="acc-icon grid size-9 shrink-0 place-items-center rounded-full border border-gold/60 text-terracotta-700">
                    <Plus aria-hidden="true" size={18} strokeWidth={1.5} />
                  </span>
                </summary>
                <div className="acc-body measure pr-14 pb-6 text-muted">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
      {schema ? <JsonLd data={data} /> : null}
    </Section>
  );
}
