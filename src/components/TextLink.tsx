import Link from "next/link";
import type { ComponentProps } from "react";

type TextLinkProps = ComponentProps<typeof Link> & {
  /** Paper text for links inside red-900 sections. */
  onDark?: boolean;
};

/**
 * An inline link inside running text. Always underlined, so a link is never
 * marked by colour alone. red-600 on paper measures 5.84:1; on red-900 the
 * link is paper (12.06:1), since red-600 there would be 2.07:1.
 */
export function TextLink({ onDark = false, className = "", ...props }: TextLinkProps) {
  return (
    <Link
      className={`underline underline-offset-4 transition-colors duration-200 ${
        onDark ? "text-paper hover:text-paper/80" : "text-red-600 hover:text-red-900"
      } ${className}`}
      {...props}
    />
  );
}
