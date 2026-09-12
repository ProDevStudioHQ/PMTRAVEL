import Link from "next/link";
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children?: ReactNode;
  /** Small label above the title, e.g. a capability group. */
  eyebrow?: string;
  /** When set, the title becomes a link and the whole card is clickable. */
  href?: string;
  className?: string;
};

/** Bordered content card. Radius 8px: interactive surface. */
export function Card({ title, eyebrow, href, children, className = "" }: CardProps) {
  return (
    <div
      className={`relative rounded-[var(--radius-card)] border border-line-soft bg-white/40 p-6 ${
        href ? "transition-colors hover:border-line" : ""
      } ${className}`}
    >
      {eyebrow ? (
        <p className="mb-2 text-2xs font-medium uppercase tracking-[0.12em] text-meta">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="text-lg font-medium text-ink">
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
      {children ? <div className="mt-3 text-sm text-meta">{children}</div> : null}
    </div>
  );
}
