import Link from "next/link";
import type { ReactNode } from "react";

type CardVariant = "service" | "destination" | "capability";

type CardProps = {
  title: string;
  children?: ReactNode;
  /**
   * A short plain-text label above the title, e.g. a region. Sentence case,
   * never tracked capitals (SOP 2.2).
   */
  eyebrow?: string;
  /** When set, the whole card is clickable through a stretched link. */
  href?: string;
  variant?: CardVariant;
  /** Capability variant only: a status element aligned to the right. */
  aside?: ReactNode;
  className?: string;
};

const titleSize: Record<CardVariant, string> = {
  service: "text-lg",
  destination: "text-xl",
  capability: "text-base",
};

/**
 * One card (SOP 3.4). 1px hairline border, no shadow, 24px padding. When the
 * card links somewhere, hover changes the border colour to red-600 and
 * nothing else - no lift, no scale.
 */
export function Card({
  title,
  eyebrow,
  href,
  variant = "service",
  aside,
  children,
  className = "",
}: CardProps) {
  const heading = (
    <h3 className={`font-display font-semibold text-ink-900 ${titleSize[variant]}`}>
      {href ? (
        // The stretched pseudo-element makes the card clickable without
        // nesting interactive elements or adding a click handler.
        <Link href={href} className="after:absolute after:inset-0 after:content-['']">
          {title}
        </Link>
      ) : (
        title
      )}
    </h3>
  );

  return (
    <div
      className={`relative rounded-card border border-rule bg-paper p-6 ${
        href ? "transition-colors duration-200 hover:border-red-600" : ""
      } ${className}`}
    >
      {variant === "capability" ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          {heading}
          {aside}
        </div>
      ) : (
        <>
          {eyebrow ? <p className="mb-2 text-sm text-ink-500">{eyebrow}</p> : null}
          {heading}
        </>
      )}
      {children ? <div className="mt-3 text-sm text-ink-500">{children}</div> : null}
    </div>
  );
}
