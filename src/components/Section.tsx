import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { highlight } from "@/components/moroccan";

type Tone = "paper" | "paper-2" | "deep" | "sand" | "white" | "midnight";

const TONES: Record<Tone, string> = {
  paper: "bg-sand",
  sand: "bg-sand",
  "paper-2": "bg-ivory",
  white: "bg-ivory",
  // Dark sections carry the zellige pattern (its one pattern).
  deep: "on-dark surface-deep zellige-bg bg-midnight text-sand",
  midnight: "on-dark surface-deep zellige-bg bg-midnight text-sand",
};

type SectionProps = {
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
};

/** A full-bleed section on the shared rhythm (64px mobile, 120px desktop). */
export function Section({ tone = "sand", id, className = "", containerClassName = "", children, ...rest }: SectionProps) {
  return (
    <section id={id} className={`${TONES[tone]} ${className}`} {...rest}>
      <Container className={`section-y ${containerClassName}`}>{children}</Container>
    </section>
  );
}

type SectionIntroProps = {
  title: string;
  children?: ReactNode;
  onDark?: boolean;
};

/** Legacy heading used by content pages built before D7. */
export function SectionIntro({ title, children, onDark = false }: SectionIntroProps) {
  return (
    <>
      <h2 className={`t-h2 max-w-[22ch] ${onDark ? "text-sand" : "text-ink"}`}>{highlight(title)}</h2>
      {children ? <div className={`measure mt-6 text-lg ${onDark ? "text-sand/85" : "text-muted"}`}>{children}</div> : null}
    </>
  );
}
