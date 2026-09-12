"use client";

// Client Component for four reasons, all behavioural rather than decorative:
// the current page has to be marked in the navigation, which needs the
// pathname; the mobile panel and the Services dropdown have to close
// themselves on navigation, which a <details> element does not do; and over
// the home hero photograph the header is transparent until the page scrolls,
// which needs the scroll position.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { BrandLogo } from "@/components/BrandLogo";
import { HEADER_HOME, HEADER_NAV, HEADER_SERVICES, RFQ_HREF } from "@/lib/nav";
import type { NavItem } from "@/lib/nav";

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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const servicesRef = useRef<HTMLLIElement>(null);
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, isScrolledOnServer);

  // Close both menus whenever the route changes, so a tap on a link does not
  // leave a menu covering the page it just opened. Adjusted during render
  // rather than in an effect: an effect would render the stale open menu
  // first, then close it, which is a visible flash and a cascading render.
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setOpen(false);
    setServicesOpen(false);
  }

  // The dropdown also closes on Escape and on a click outside it.
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const servicesCurrent = HEADER_SERVICES.some((item) => isCurrent(item.href));

  const overlayPage = overlayOnHome && pathname === "/";
  // Transparent only while the photograph is actually behind it. No blur and
  // no frosted fill - that would be glassmorphism, which the design system
  // forbids. It is either fully clear over the scrim, or solid chalk.
  const transparent = overlayPage && !scrolled && !open;

  // The current page is marked by weight as well as colour, so the state is
  // never carried by colour alone, and carries aria-current for assistive tech.
  const linkTone = (current: boolean) =>
    `${current ? "font-semibold" : "font-normal"} ${
      transparent
        ? current
          ? "text-chalk"
          : "text-chalk/85 hover:text-chalk"
        : current
          ? "text-petrol"
          : "text-ink hover:text-petrol"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        transparent ? "surface-deep bg-transparent" : "bg-chalk"
      } ${overlayPage ? "-mb-[72px]" : ""}`}
    >
      {/* Tighter side padding from xl, so the full bar fits the 1200px frame. */}
      <Container className="xl:px-8">
        <div className={`flex items-center justify-between gap-6 ${HEADER_HEIGHT}`}>
          <Link href="/" aria-label="PM Travel Agency, home" className="shrink-0">
            <BrandLogo onDark={transparent} />
          </Link>

          {/*
            The full bar appears from xl (1280px). Below that the Menu button
            takes over - at 1024px the bar ran 177px past the edge of the
            screen.
          */}
          <nav aria-label="Primary" className="ml-auto hidden xl:block">
            <ul className="flex items-center gap-5 2xl:gap-8">
              <li>
                <Link
                  href={HEADER_HOME.href}
                  aria-current={isCurrent(HEADER_HOME.href) ? "page" : undefined}
                  className={`block whitespace-nowrap py-2 text-xs transition-colors ${linkTone(
                    isCurrent(HEADER_HOME.href)
                  )}`}
                >
                  {HEADER_HOME.label}
                </Link>
              </li>

              <li ref={servicesRef} className="relative">
                <button
                  type="button"
                  onClick={() => setServicesOpen((value) => !value)}
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  className={`flex items-center gap-1.5 whitespace-nowrap py-2 text-xs transition-colors ${linkTone(
                    servicesCurrent
                  )}`}
                >
                  Services
                  <svg
                    viewBox="0 0 10 6"
                    aria-hidden="true"
                    className={`h-1.5 w-2.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>

                <div
                  id="services-menu"
                  hidden={!servicesOpen}
                  className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                >
                  <ul className="rounded-[var(--radius-card)] border border-line-soft bg-chalk p-2 shadow-[0_16px_40px_-16px_rgba(11,44,51,0.35)]">
                    {HEADER_SERVICES.map((item) => {
                      const current = isCurrent(item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={current ? "page" : undefined}
                            className="block rounded-[var(--radius-data)] px-3 py-2.5 transition-colors hover:bg-hamada/60"
                          >
                            <span
                              className={`block text-xs ${
                                current ? "font-semibold text-petrol" : "font-medium text-ink"
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.blurb ? (
                              <span className="block text-2xs text-meta">{item.blurb}</span>
                            ) : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>

              {HEADER_NAV.map((item) => {
                const current = isCurrent(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`block whitespace-nowrap py-2 text-xs transition-colors ${linkTone(
                        current
                      )}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-6 xl:flex">
            <span
              aria-hidden="true"
              className={`h-8 w-px transition-colors ${transparent ? "bg-chalk/40" : "bg-line-soft"}`}
            />
            <ButtonLink
              href={RFQ_HREF}
              variant="accent"
              className="!min-h-[44px] !rounded-[var(--radius-data)] !px-5 !py-2 !text-2xs !font-semibold uppercase tracking-[0.14em]"
            >
              Request a quote
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={`flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-[var(--radius-data)] border px-3 text-xs transition-colors xl:hidden ${
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
        className="bg-chalk xl:hidden"
      >
        <Container>
          <ul className="flex flex-col py-2">
            {[HEADER_HOME, ...HEADER_NAV].map((item) => (
              <MobileLink key={item.href} item={item} current={isCurrent(item.href)} />
            ))}
          </ul>
          <p className="pt-3 text-2xs font-medium uppercase tracking-[0.18em] text-meta">
            Services
          </p>
          <ul className="flex flex-col pb-2">
            {HEADER_SERVICES.map((item) => (
              <MobileLink key={item.href} item={item} current={isCurrent(item.href)} />
            ))}
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

function MobileLink({
  item,
  current,
}: {
  item: NavItem;
  current: boolean;
}) {
  return (
    <li className="border-b border-line-soft last:border-0">
      <Link
        href={item.href}
        aria-current={current ? "page" : undefined}
        className="flex min-h-[52px] flex-col justify-center py-2"
      >
        <span className={`text-sm ${current ? "font-semibold text-petrol" : "text-ink"}`}>
          {item.label}
          {current ? <span className="ml-2 text-2xs text-oxide">&mdash; current</span> : null}
        </span>
        {item.blurb ? <span className="text-2xs text-meta">{item.blurb}</span> : null}
      </Link>
    </li>
  );
}
