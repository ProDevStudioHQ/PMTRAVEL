"use client";

// Client Component for two reasons, both behavioural rather than decorative:
// the current page has to be marked in the navigation, which needs the
// pathname; and the mobile panel has to close itself on navigation, which a
// <details> element does not do. The cost is about 1KB gzipped on top of a
// runtime already being loaded.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { COMPANY, PRIMARY_NAV, SECONDARY_NAV, RFQ_HREF } from "@/lib/nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the panel whenever the route changes, so a tap on a link does not
  // leave the menu covering the page it just opened. Adjusted during render
  // rather than in an effect: an effect would render the stale open menu
  // first, then close it, which is a visible flash and a cascading render.
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setOpen(false);
  }

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-chalk">
      <Container>
        <div className="flex items-center justify-between gap-6 py-4">
          <Link href="/" className="group block shrink-0">
            <span className="block text-sm font-semibold tracking-tight text-petrol">
              {COMPANY.name}
            </span>
            <span className="block text-2xs text-meta">{COMPANY.brandLine}</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {PRIMARY_NAV.map((item) => {
                const current = isCurrent(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`relative block py-2 text-xs transition-colors ${
                        current ? "text-petrol" : "text-meta hover:text-ink"
                      }`}
                    >
                      {item.label}
                      {/*
                        The current page is marked by a rule as well as a
                        colour change, so the state is never carried by colour
                        alone.
                      */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 -bottom-px h-px transition-colors ${
                          current ? "bg-oxide" : "bg-transparent"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden shrink-0 lg:block">
            <ButtonLink href={RFQ_HREF}>Request a B2B quote</ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-[var(--radius-data)] border border-line px-3 text-xs text-petrol lg:hidden"
          >
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              <span className="block h-px w-4 bg-petrol" />
              <span className="block h-px w-4 bg-petrol" />
              <span className="block h-px w-4 bg-petrol" />
            </span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Primary (mobile)"
        hidden={!open}
        className="border-t border-line-soft bg-chalk lg:hidden"
      >
        <Container>
          <ul className="flex flex-col py-2">
            {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href} className="border-b border-line-soft last:border-0">
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className="flex min-h-[52px] flex-col justify-center py-2"
                  >
                    <span
                      className={`text-sm ${current ? "text-petrol" : "text-ink"}`}
                    >
                      {item.label}
                      {current ? (
                        <span className="ml-2 text-2xs text-oxide">&mdash; current</span>
                      ) : null}
                    </span>
                    {item.blurb ? (
                      <span className="text-2xs text-meta">{item.blurb}</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="pb-5">
            <ButtonLink href={RFQ_HREF} className="w-full">
              Request a B2B quote
            </ButtonLink>
          </div>
        </Container>
      </nav>
    </header>
  );
}
