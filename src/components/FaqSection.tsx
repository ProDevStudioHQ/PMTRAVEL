import { Section } from "@/components/Section";

export type Faq = {
  question: string;
  /**
   * Answer-first: the first sentence answers the question outright.
   * Supporting detail comes after it.
   */
  answer: string;
};

type FaqSectionProps = {
  heading: string;
  faqs: Faq[];
  tone?: "paper" | "paper-2";
};

/**
 * Renders the questions visibly AND emits the matching FAQPage schema from the
 * same array, so the markup can never claim a question the page does not show.
 * FAQPage is only ever valid here for that reason.
 *
 * Set as a ruled list: question on the left, answer on the right from lg up.
 */
export function FaqSection({ heading, faqs, tone = "paper" }: FaqSectionProps) {
  const schema = {
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
      <h2 className="max-w-[24ch] text-2xl font-bold tracking-tight text-ink-900">{heading}</h2>
      <dl className="mt-12 border-t border-rule">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="grid gap-3 border-b border-rule py-8 lg:grid-cols-12 lg:gap-12"
          >
            <dt className="font-display text-lg font-semibold text-ink-900 lg:col-span-5">
              {faq.question}
            </dt>
            <dd className="text-base text-ink-500 lg:col-span-7">{faq.answer}</dd>
          </div>
        ))}
      </dl>
      <script
        type="application/ld+json"
        // Built from the same array that is rendered above.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Section>
  );
}
