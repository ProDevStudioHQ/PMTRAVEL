import Link from "next/link";
import { Container } from "@/components/Container";
import { SITE_URL } from "@/lib/nav";

export type Crumb = { href: string; label: string };

/**
 * Visible breadcrumb trail plus the matching BreadcrumbList schema, built from
 * one array so the markup can never describe a trail the page does not show.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const items = [{ href: "/", label: "Home" }, ...trail];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };

  return (
    <Container as="nav" className="pt-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-2xs text-meta">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className="hover:text-petrol">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        // Built from the same array rendered above.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Container>
  );
}
