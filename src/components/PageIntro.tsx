import { Container } from "@/components/Container";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  standfirst?: string;
};

/** Shared page opener. One h1 per page, always here. */
export function PageIntro({ eyebrow, title, standfirst }: PageIntroProps) {
  return (
    <Container as="section" className="border-b border-line-soft py-16 lg:py-24">
      {eyebrow ? (
        <p className="text-2xs font-medium uppercase tracking-[0.16em] text-meta">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 max-w-[18ch] text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
        {title}
      </h1>
      {standfirst ? (
        <p className="measure mt-6 text-base text-meta">{standfirst}</p>
      ) : null}
    </Container>
  );
}
