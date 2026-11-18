import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { highlight as withHighlight } from "@/components/moroccan";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  align?: "left" | "center";
  onDark?: boolean;
  /** Heading level: h2 by default; h1 only for page heroes that render their own. */
  as?: "h2" | "h3";
  className?: string;
  /** Word to set in italic terracotta; defaults to the last word. false for none. */
  highlight?: string | false;
};

/** Eyebrow + serif title (one highlighted word) + intro. Fades up once when scrolled into view. */
export function SectionHeading({ eyebrow, title, children, id, align = "left", onDark = false, as: Tag = "h2", className = "", highlight }: Props) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow ? <p className={`eyebrow ${onDark ? "eyebrow-on-dark" : ""}`}>{eyebrow}</p> : null}
      <Tag id={id} className={`t-h2 mt-4 ${onDark ? "text-sand" : "text-ink"}`}>
        {highlight === false ? title : withHighlight(title, highlight)}
      </Tag>
      {children ? (
        <div className={`mt-5 text-[1.0625rem] leading-[1.7] ${centered ? "mx-auto" : ""} measure ${onDark ? "text-sand/80" : "text-muted"}`}>
          {children}
        </div>
      ) : null}
    </Reveal>
  );
}
