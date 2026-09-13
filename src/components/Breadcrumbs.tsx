import Link from "next/link";
import { Container } from "@/components/Container";
import { SITE_URL } from "@/lib/nav";

export type Crumb = { href: string; label: string };

type BreadcrumbsProps = {
  trail: Crumb[];
  /**
   * Paper text for a photographic banner. The trail is then rendered bare,
   * because the banner already supplies the container.
   */
  onDark?: boolean;
};

/**
 * Visible breadcrumb trail plus the matching BreadcrumbList schema, built from
 * one array so the markup can never describe a trail the page does not show.
 */
export function Breadcrumbs({ trail, onDark = false }: BreadcrumbsProps) {
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

  const list = (
    <>
      <ol
        className={`flex flex-wrap items-center gap-x-2 text-sm ${
          onDark ? "text-paper/85" : "text-ink-500"
        }`}
      >
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span
                  aria-current="page"
                  className={`flex min-h-11 items-center ${onDark ? "font-medium text-paper" : "text-ink-900"}`}
                >
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className={`flex min-h-11 items-center underline-offset-4 transition-colors duration-200 hover:underline ${
                      onDark ? "hover:text-paper" : "hover:text-red-600"
                    }`}
                  >
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
    </>
  );

  return (
    <nav aria-label="Breadcrumb">
      {onDark ? list : <Container className="pt-6">{list}</Container>}
    </nav>
  );
}
