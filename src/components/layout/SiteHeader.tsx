"use client";

/**
 * Client Component, because the header reacts to scroll (transparent → solid
 * with blur after 40px; hides on scroll down, shows on scroll up), opens
 * dropdowns on hover/click/keyboard, marks the current page and runs the
 * full-screen mobile menu. Menus, buttons, the top bar and contact details
 * arrive as plain data props, built from the CRM's /site in the root layout.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { buttonClasses } from "@/components/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavAnchor } from "@/components/layout/NavAnchor";
import { AnnouncementStrip, TopBar } from "@/components/layout/TopBar";
import { RFQ_HREF } from "@/lib/company";
import { en } from "@/i18n/dictionaries/en";
import type { NavButton, NavEntry, SiteContact } from "@/lib/site-layout";
import type { SitePayload } from "@/types/cms";

type HeaderProps = {
  nav: NavEntry[];
  buttons: NavButton[];
  topBar: SitePayload["topBar"];
  contact: SiteContact;
  /** CRM logo for dark backgrounds, if one is uploaded. */
  logo?: SitePayload["settings"]["logo"];
};

/** OUTLINE buttons appear from md, PRIMARY from sm; the mobile menu always lists both. */
export function navButtonClasses(button: NavButton, className: string) {
  return buttonClasses(button.style === "OUTLINE" ? "secondary" : "primary", "dark", className);
}

/** Routes whose top is a light surface: the header starts solid there. */
const SOLID_ROUTES = new Set(["/partner-login"]);

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

export function SiteHeader({ nav, buttons, topBar, contact, logo = null }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const baseId = useId();

  // Scroll state: solid after 40px, hide on the way down, show on the way up.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        const delta = y - lastY.current;
        if (y < 120) setHidden(false);
        else if (delta > 6) setHidden(true);
        else if (delta < -6) setHidden(false);
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Close everything on navigation (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  // Escape closes the dropdown and returns focus to its trigger.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const trigger = document.getElementById(`${baseId}-${open}-trigger`);
        setOpen(null);
        trigger?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, baseId]);

  const hoverOpen = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(id);
  }, []);
  const hoverClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  }, []);

  const solid = scrolled || open !== null || SOLID_ROUTES.has(pathname);

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 text-sand transition-[transform,background-color,box-shadow] duration-300 ease-out ${
          hidden && !mobileOpen && open === null ? "-translate-y-full" : "translate-y-0"
        } ${solid ? "bg-midnight/90 shadow-[0_1px_0_rgb(201_161_74/0.25)] backdrop-blur-md" : "bg-linear-to-b from-midnight/70 to-transparent"}`}
      >
        {topBar.announcement ? <AnnouncementStrip announcement={topBar.announcement} collapsed={scrolled} /> : null}
        {topBar.enabled && topBar.items.length > 0 ? <TopBar items={topBar.items} collapsed={scrolled} /> : null}

        {/* Main bar */}
        <div className="site-header-bar mx-auto flex h-[72px] max-w-site items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <Logo image={logo} />

          <nav ref={navRef} aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((item) => {
                const active = item.menu ? item.menu.items.some((link) => isActive(pathname, link.href)) || isActive(pathname, item.href) : isActive(pathname, item.href);
                if (!item.menu) {
                  return (
                    <li key={item.id}>
                      <NavAnchor
                        href={item.href}
                        newTab={item.newTab}
                        aria-current={active ? "page" : undefined}
                        translate={item.id === "home" ? "no" : undefined}
                        className={`${item.id === "home" ? "notranslate " : ""}relative inline-flex min-h-11 items-center whitespace-nowrap px-2.5 text-[0.9375rem] transition-colors hover:text-white ${
                          active ? "text-white after:absolute after:inset-x-3 after:bottom-2 after:h-px after:bg-gold" : "text-sand/85"
                        }`}
                      >
                        {item.label}
                      </NavAnchor>
                    </li>
                  );
                }
                const isOpen = open === item.id;
                const panelId = `${baseId}-${item.id}-panel`;
                return (
                  <li key={item.id} className={item.menu.kind === "mega" ? "" : "relative"} onMouseEnter={() => hoverOpen(item.id)} onMouseLeave={hoverClose}>
                    <button
                      id={`${baseId}-${item.id}-trigger`}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : item.id)}
                      className={`relative inline-flex min-h-11 items-center gap-1 whitespace-nowrap px-2.5 text-[0.9375rem] transition-colors hover:text-white ${
                        active || isOpen ? "text-white" : "text-sand/85"
                      } ${item.emphasis ? "font-medium" : ""} ${active ? "after:absolute after:inset-x-3 after:bottom-2 after:h-px after:bg-gold" : ""}`}
                    >
                      {item.emphasis ? <span aria-hidden="true" className="mr-1 size-1.5 rounded-full bg-terracotta" /> : null}
                      {item.label}
                      <ChevronDown aria-hidden="true" size={15} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen ? (
                        <m.div
                          key="panel"
                          id={panelId}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          onBlur={(e) => {
                            if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setOpen(null);
                          }}
                          className={
                            item.menu.kind === "mega"
                              ? "surface-light absolute inset-x-0 top-full px-10 pt-2"
                              : "surface-light absolute top-full left-0 w-80 pt-2"
                          }
                        >
                          {item.menu.kind === "mega" ? (
                            <MegaPanel item={item} pathname={pathname} />
                          ) : (
                            <ListPanel item={item} pathname={pathname} />
                          )}
                        </m.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Visibility lives on wrappers: the button's own inline-flex would override `hidden`. */}
            {buttons.map((button) => (
              <span key={button.id} className={button.style === "OUTLINE" ? "hide-when-translated hidden md:contents" : "hidden sm:contents"}>
                <NavAnchor href={button.href} newTab={button.newTab} className={navButtonClasses(button, "min-h-11 whitespace-nowrap px-4 text-sm")}>
                  <span>{button.label}</span>
                </NavAnchor>
              </span>
            ))}
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-sand/30 xl:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu aria-hidden="true" size={20} />
              <span className="sr-only">{en.nav.menu}</span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu nav={nav} buttons={buttons} contact={contact} logo={logo} open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  );
}

function ListPanel({ item, pathname }: { item: NavEntry; pathname: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ivory p-2 text-ink shadow-overlay">
      <ul>
        {item.menu!.items.map((link) => (
          <li key={link.href}>
            <NavAnchor
              href={link.href}
              newTab={link.newTab}
              aria-current={pathname === link.href ? "page" : undefined}
              className="block rounded-xl px-4 py-3 transition-colors hover:bg-sand aria-[current=page]:bg-sand"
            >
              <span className="block text-[0.9375rem] font-medium">{link.label}</span>
              {link.blurb ? <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{link.blurb}</span> : null}
            </NavAnchor>
          </li>
        ))}
      </ul>
      {item.menu!.allLabel ? (
        <Link href={item.href} className="group mt-1 flex items-center justify-between border-t border-line px-4 pt-3 pb-2 text-sm font-medium text-terracotta-700">
          {item.menu!.allLabel}
          <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
        </Link>
      ) : null}
    </div>
  );
}

function MegaPanel({ item, pathname }: { item: NavEntry; pathname: string }) {
  return (
    <div className="mx-auto grid max-w-[calc(var(--container-site)-5rem)] grid-cols-12 gap-6 rounded-card border border-line bg-ivory p-6 text-ink shadow-overlay">
      <div className="col-span-8">
        <p className="eyebrow px-4">For travel professionals</p>
        <ul className="mt-3 grid grid-cols-2 gap-1">
          {item.menu!.items.map((link) => (
            <li key={link.href}>
              <NavAnchor
                href={link.href}
                newTab={link.newTab}
                aria-current={pathname === link.href ? "page" : undefined}
                className="group block rounded-xl px-4 py-3 transition-colors hover:bg-sand aria-[current=page]:bg-sand"
              >
                <span className="flex items-center gap-2 text-[0.9375rem] font-medium">
                  {link.label}
                  <ArrowRight aria-hidden="true" size={14} className="arrow-slide text-terracotta-700 opacity-0 group-hover:opacity-100" />
                </span>
                {link.blurb ? <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{link.blurb}</span> : null}
              </NavAnchor>
            </li>
          ))}
        </ul>
        {item.menu!.allLabel ? (
          <Link href={item.href} className="group mt-3 inline-flex items-center gap-2 px-4 text-sm font-medium text-terracotta-700">
            {item.menu!.allLabel}
            <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
          </Link>
        ) : null}
      </div>
      <div className="on-dark col-span-4 flex flex-col justify-between rounded-2xl bg-midnight p-6 text-sand">
        <div>
          <p className="eyebrow eyebrow-on-dark">Net rates · 24h quotes</p>
          <p className="t-h3 mt-3 text-sand">Request a B2B Quote</p>
          <p className="mt-2 text-sm text-sand/75">Send your brief. Receive a costed, day-by-day proposal at net rates.</p>
        </div>
        <Link href={RFQ_HREF} className={buttonClasses("primary", "dark", "mt-6 w-full")}>
          <span>{en.cta.b2bQuote}</span>
          <ArrowRight aria-hidden="true" size={18} className="arrow-slide" />
        </Link>
      </div>
    </div>
  );
}

