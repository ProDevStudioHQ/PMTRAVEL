import { Container } from "@/components/Container";

type PageIntroProps = {
  title: string;
  standfirst?: string;
};

/**
 * Shared page opener for pages without a bespoke hero. One h1 per page, always
 * here. There is no eyebrow: tracked-caps labels above headings are forbidden
 * (SOP 2.2), and the navigation or the breadcrumb already says where the
 * reader is.
 */
export function PageIntro({ title, standfirst }: PageIntroProps) {
  return (
    <section className="border-b border-rule bg-paper">
      <Container className="py-16 lg:py-24">
        <h1 className="max-w-[18ch] text-3xl font-bold tracking-tight text-ink-900 lg:text-4xl">
          {title}
        </h1>
        {standfirst ? <p className="measure mt-6 text-lg text-ink-500">{standfirst}</p> : null}
      </Container>
    </section>
  );
}
