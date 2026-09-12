import Link from "next/link";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { COMPANY, PRIMARY_NAV, SECONDARY_NAV, RFQ_HREF } from "@/lib/nav";

/**
 * Server Component. The mobile menu is a native <details> disclosure, so the
 * header ships no JavaScript at all.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-line-soft bg-chalk">
      <Container>
        <div className="flex items-center justify-between gap-6 py-4">
          <Link href="/" className="group block">
            <span className="block text-sm font-semibold tracking-tight text-petrol">
              {COMPANY.name}
            </span>
            <span className="block text-2xs text-meta">{COMPANY.brandLine}</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-ink hover:text-petrol"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <ButtonLink href={RFQ_HREF}>Request a B2B quote</ButtonLink>
          </div>

          <details className="lg:hidden">
            <summary className="flex min-h-[44px] min-w-[44px] cursor-pointer list-none items-center justify-center rounded-[var(--radius-data)] border border-line px-3 text-xs text-petrol">
              Menu
            </summary>
            <nav
              aria-label="Primary (mobile)"
              className="absolute left-0 right-0 z-50 mt-4 border-y border-line-soft bg-chalk px-5 py-4"
            >
              <ul className="flex flex-col gap-1">
                {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-[44px] items-center text-sm text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink href={RFQ_HREF} className="mt-4 w-full">
                Request a B2B quote
              </ButtonLink>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
