import Link from "next/link";
import type { ComponentProps } from "react";

type TextLinkProps = ComponentProps<typeof Link> & { onDark?: boolean };

/** Inline link in running text. Always underlined, never colour alone. */
export function TextLink({ onDark = false, className = "", ...props }: TextLinkProps) {
  return (
    <Link
      className={`underline decoration-1 underline-offset-4 transition-colors duration-200 ${
        onDark ? "text-sand decoration-gold hover:text-gold" : "text-terracotta-700 decoration-terracotta/40 hover:decoration-terracotta-700"
      } ${className}`}
      {...props}
    />
  );
}
