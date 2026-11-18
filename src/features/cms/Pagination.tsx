import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const pageHref = (path: string, page: number) => (page <= 1 ? path : `${path}?page=${page}`);

/** ?page=N links. Server-rendered, so it works without JavaScript and is crawlable. */
export function Pagination({ path, page, totalPages }: { path: string; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const linkCls = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-3 text-sm";
  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={pageHref(path, page - 1)} rel="prev" className={`${linkCls} border-line hover:border-terracotta`}>
          <ChevronLeft aria-hidden="true" size={16} />
          <span className="sr-only">Previous page</span>
        </Link>
      ) : null}
      {pages.map((n) =>
        n === page ? (
          <span key={n} aria-current="page" className={`${linkCls} border-terracotta bg-terracotta text-white`}>
            {n}
          </span>
        ) : (
          <Link key={n} href={pageHref(path, n)} className={`${linkCls} border-line hover:border-terracotta`}>
            <span className="sr-only">Page </span>
            {n}
          </Link>
        )
      )}
      {page < totalPages ? (
        <Link href={pageHref(path, page + 1)} rel="next" className={`${linkCls} border-line hover:border-terracotta`}>
          <ChevronRight aria-hidden="true" size={16} />
          <span className="sr-only">Next page</span>
        </Link>
      ) : null}
    </nav>
  );
}
