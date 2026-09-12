"use client";

// Client Component for three reasons, all behavioural rather than decorative:
// the current page has to be marked in the navigation, which needs the
// pathname; the mobile panel has to close itself on navigation, which a
// <details> element does not do; and over the home hero photograph the header
// is transparent until the page scrolls, which needs the scroll position.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { COMPANY, PRIMARY_NAV, SECONDARY_NAV, RFQ_HREF } from "@/lib/nav";

/** Fixed row height, so the hero can sit exactly underneath the header. */
const HEADER_HEIGHT = "h-[72px]";
const SCROLL_THRESHOLD = 16;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const isScrolled = () => window.scrollY > SCROLL_THRESHOLD;
const isScrolledOnServer = () => false;

type SiteHeaderProps = {
  /**
   * True when the home page renders its photographic hero. Decided on the
   * server from the image registry, so the header never guesses and never
   * goes transparent over a page with no photograph behind it.
   */
  overlayOnHome?: boolean;
};

export function SiteHeader({ overlayOnHome = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, isScrolledOnServer);

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

  const overlayPage = overlayOnHome && pathname === "/";
  // Transparent only while the photograph is actually behind it. No blur and
  // no frosted fill - that would be glassmorphism, which the design system
  // forbids. It is either fully clear over the scrim, or solid chalk.
  const transparent = overlayPage && !scrolled && !open;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        transparent
          ? "surface-deep border-chalk/15 bg-transparent"
          : "border-line-soft bg-chalk"
      } ${overlayPage ? "-mb-[72px]" : ""}`}
    >
      <Container>
        <div className={`flex items-center justify-between gap-6 ${HEADER_HEIGHT}`}>
          <Link href="/" className="group block shrink-0">
            <span
              className={`block text-lg font-semibold leading-tight tracking-tight transition-colors ${
                transparent ? "text-chalk" : "text-petrol"
              }`}
            >
              {COMPANY.name}
            </span>
            <span
              className={`block text-2xs transition-colors ${
                transparent ? "text-hamada" : "text-meta"
              }`}
            >
              {COMPANY.brandLine}
            </span>
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {PRIMARY_NAV.map((item) => {
                const current = isCurrent(item.href);
                const tone = transparent
                  ? "text-chalk hover:text-hamada"
                  : current
                    ? "text-petrol"
                    : "text-ink hover:text-petrol";
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`relative block whitespace-nowrap py-2 text-xs font-medium transition-colors ${tone}`}
                    >
                      {item.label}
                      {/*
                        The current page is marked by a rule as well as a
                        colour change, so the state is never carried by colour
                        alone. Chalk over the photograph: oxide on petrol-deep
                        is 2.43:1 and forbidden.
                      */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 -bottom-px h-px transition-colors ${
                          current ? (transparent ? "bg-chalk" : "bg-oxide") : "bg-transparent"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-6 lg:flex">
            <span
              aria-hidden="true"
              className={`h-8 w-px transition-colors ${transparent ? "bg-chalk/40" : "bg-line-soft"}`}
            />
            <ButtonLink
              href={RFQ_HREF}
              variant="accent"
              className="!min-h-[40px] !rounded-full !px-5 !py-2 !text-xs !font-semibold"
            >
              Request a B2B quote
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={`flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-[var(--radius-data)] border px-3 text-xs transition-colors lg:hidden ${
              transparent ? "border-chalk/60 text-chalk" : "border-line text-petrol"
            }`}
          >
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
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
