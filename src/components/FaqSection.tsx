import { Container } from "@/components/Container";

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
};

/**
 * Renders the questions visibly AND emits the matching FAQPage schema from the
 * same array, so the markup can never claim a question the page does not show.
 * FAQPage is only ever valid here for that reason.
 */
export function FaqSection({ heading, faqs }: FaqSectionProps) {
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
    <Container as="section" className="border-t border-line-soft py-16 lg:py-24">
      <h2 className="text-xl font-semibold tracking-tight text-ink">{heading}</h2>
      <dl className="mt-10 flex flex-col gap-10">
        {faqs.map((faq) => (
          <div key={faq.question} className="measure">
            <dt className="text-lg font-medium text-ink">{faq.question}</dt>
            <dd className="mt-3 text-base text-meta">{faq.answer}</dd>
          </div>
        ))}
      </dl>
      <script
        type="application/ld+json"
        // Built from the same array that is rendered above.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Container>
  );
}
