import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = { href: string; label: string };

type BreadcrumbsProps = {
  /** Trail after Home. */
  trail: Crumb[];
  /** Sand text for a photographic banner; rendered bare inside the hero. */
  onDark?: boolean;
};

/** Visible breadcrumb trail plus BreadcrumbList schema, from one array. */
export function Breadcrumbs({ trail, onDark = false }: BreadcrumbsProps) {
  const items = [{ href: "/", label: "Home" }, ...trail];

  const list = (
    <>
      <ol className={`flex flex-wrap items-center gap-x-1.5 text-[0.8125rem] ${onDark ? "text-sand/75" : "text-muted"}`}>
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className={`flex min-h-11 items-center ${onDark ? "text-sand" : "text-ink"}`}>
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className={`flex min-h-11 items-center underline-offset-4 hover:underline ${onDark ? "hover:text-sand" : "hover:text-terracotta-700"}`}
                  >
                    {crumb.label}
                  </Link>
                  <ChevronRight aria-hidden="true" size={14} className={onDark ? "text-gold" : "text-gold"} />
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );

  return <nav aria-label="Breadcrumb">{onDark ? list : <Container className="pt-6">{list}</Container>}</nav>;
}
