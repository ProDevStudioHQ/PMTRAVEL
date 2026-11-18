import Link from "next/link";
import type { ComponentProps } from "react";
import { isExternal } from "@/lib/site-layout";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string; newTab?: boolean };

/**
 * A CRM-driven link: next/link for site paths, a plain anchor for external
 * URLs, mailto: and tel:. External links and links marked "open in new tab"
 * in the CRM open in a new tab with rel="noopener noreferrer".
 */
export function NavAnchor({ href, newTab, children, ...rest }: Props) {
  const external = isExternal(href);
  const blank = newTab || external;
  if (href.startsWith("/") && !external && !newTab) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest} {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}
