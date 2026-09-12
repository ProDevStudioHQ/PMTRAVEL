import type { ReactNode } from "react";
import { Container } from "@/components/Container";

type Tone = "paper" | "paper-2" | "deep";

const TONES: Record<Tone, string> = {
  paper: "bg-paper",
  "paper-2": "bg-paper-2",
  deep: "surface-deep bg-red-900 text-paper",
};

type SectionProps = {
  /** Alternate paper and paper-2. "deep" (red-900) is used once per page at most. */
  tone?: Tone;
  /** Anchor target; the scroll margin clears the 64px sticky header. */
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * A full-bleed page section on the shared rhythm (SOP 2.3): 64px of vertical
 * padding on mobile, 96px on desktop, content held to the 1200px container.
 * Every rebuilt page is made of these, so the rhythm cannot drift page to page.
 */
export function Section({ tone = "paper", id, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`${TONES[tone]} ${id ? "scroll-mt-16" : ""} ${className}`}>
      <Container className="py-16 lg:py-24">{children}</Container>
    </section>
  );
}

type SectionIntroProps = {
  title: string;
  /** Optional intro copy, held to 68ch. */
  children?: ReactNode;
  onDark?: boolean;
};

/** The section heading and its intro, set the same way on every page. */
export function SectionIntro({ title, children, onDark = false }: SectionIntroProps) {
  return (
    <>
      <h2
        className={`max-w-[24ch] text-2xl font-bold tracking-tight ${
          onDark ? "text-paper" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {children ? (
        <div className={`measure mt-6 text-lg ${onDark ? "text-paper/90" : "text-ink-500"}`}>
          {children}
        </div>
      ) : null}
    </>
  );
}
