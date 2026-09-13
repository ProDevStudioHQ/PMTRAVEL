"use client";

// Client Component for behavioural reasons only: the current page is marked,
// which needs the pathname; the bar changes state on scroll; the dropdowns
// open on hover, click and keyboard with arrow-key navigation; and the mobile
// drawer locks page scroll, manages focus and closes itself on navigation.

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { ArrowRight, ChevronDown, Menu, Send, X } from "lucide-react";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { BrandLogo } from "@/components/BrandLogo";
import { COMPANY, NAV_GROUPS, NAV_LINKS, RFQ_HREF, type NavGroup } from "@/lib/nav";
import { iconFor } from "@/lib/nav-icons";

/** SOP 3.1: the bar turns solid once the page has scrolled past 80px. */
const SCROLL_THRESHOLD = 80;
/** Grace period for the pointer to cross from a trigger into its panel. */
const HOVER_CLOSE_DELAY = 150;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const isScrolled = () => window.scrollY > SCROLL_THRESHOLD;
const isScrolledOnServer = () => false;

/**
 * Active route: a 2px underline. SOP 3.1 asks for red-600, but the bar is
 * red-900 or a darkened photograph, where red-600 measures 2.07:1 and all but
 * disappears. The underline is paper instead; see docs/decisions.md D5.
 */
const ACTIVE_UNDERLINE =
  "after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:bg-paper after:content-['']";

type SiteHeaderProps = {
  /**
   * True when the home page renders its photographic hero. Decided on the
   * server from the image registry, so the bar never goes transparent over a
   * page with no photograph behind it.
   */
  overlayOnHome?: boolean;
};

export function SiteHeader({ overlayOnHome = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, isScrolledOnServer);

  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [seenPath, setSeenPath] = useState(pathname);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const drawerToggleRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  /** Item to focus once a panel opened from the keyboard has rendered. */
  const pendingFocus = useRef<{ group: string; index: number } | null>(null);

  // Close everything when the route changes, so a menu never covers the page
  // it just opened. Adjusted during render rather than in an effect, which
  // would paint the stale open menu for a frame first.
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpenGroup(null);
    setDrawerOpen(false);
  }

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const groupIsCurrent = (group: NavGroup) => group.items.some((item) => isCurrent(item.href));

  const overlayPage = overlayOnHome && pathname === "/";
  const solid = !overlayPage || scrolled || openGroup !== null;

  // --- Dropdowns ---------------------------------------------------------

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenGroup(null), HOVER_CLOSE_DELAY);
  };

  useEffect(() => {
    const timer = closeTimer;
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // While a dropdown is open: Escape closes it, and so does a click outside
  // the header.
  useEffect(() => {
    if (!openGroup) return;
    const group = openGroup;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const focusWasInPanel = panelRefs.current[group]?.contains(document.activeElement);
      setOpenGroup(null);
      if (focusWasInPanel) triggerRefs.current[group]?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openGroup]);

  // An arrow key on a closed trigger opens its panel; focus can only move into
  // the panel after it has rendered visible, so it happens here rather than in
  // the key handler. Focusing too early silently left focus on the trigger.
  useEffect(() => {
    const pending = pendingFocus.current;
    if (!pending || pending.group !== openGroup) return;
    pendingFocus.current = null;
    const items = Array.from(
      panelRefs.current[pending.group]?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
    );
    if (items.length === 0) return;
    items[(pending.index + items.length) % items.length]?.focus();
  }, [openGroup]);

  const menuItems = (groupId: string) =>
    Array.from(
      panelRefs.current[groupId]?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
    );

  const focusItem = (groupId: string, index: number) => {
    const items = menuItems(groupId);
    if (items.length === 0) return;
    items[(index + items.length) % items.length]?.focus();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>, groupId: string) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const index = event.key === "ArrowUp" ? -1 : 0;
      if (openGroup === groupId) {
        focusItem(groupId, index);
      } else {
        pendingFocus.current = { group: groupId, index };
        setOpenGroup(groupId);
      }
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>, groupId: string) => {
    const items = menuItems(groupId);
    const index = items.indexOf(document.activeElement as HTMLElement);
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusItem(groupId, index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusItem(groupId, index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusItem(groupId, 0);
        break;
      case "End":
        event.preventDefault();
        focusItem(groupId, -1);
        break;
      case "Escape":
        event.preventDefault();
        setOpenGroup(null);
        triggerRefs.current[groupId]?.focus();
        break;
    }
  };

  // Close when focus leaves both the trigger and its panel.
  const onGroupBlur = (event: FocusEvent, groupId: string) => {
    const next = event.relatedTarget as Node | null;
    const inside =
      triggerRefs.current[groupId]?.contains(next) || panelRefs.current[groupId]?.contains(next);
    if (!inside) setOpenGroup((current) => (current === groupId ? null : current));
  };

  // --- Mobile drawer -----------------------------------------------------

  // While the drawer is open: page scroll is locked, focus moves to Close,
  // and Escape closes it and returns focus to the Menu button.
  useEffect(() => {
    if (!drawerOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    drawerCloseRef.current?.focus();
    const toggle = drawerToggleRef.current;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setDrawerOpen(false);
      toggle?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [drawerOpen]);

  const openDrawer = () => {
    setExpanded(NAV_GROUPS.find(groupIsCurrent)?.id ?? null);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    drawerToggleRef.current?.focus();
  };

  return (
    <header
      ref={headerRef}
      className={`surface-deep sticky top-0 z-50 w-full border-b text-paper transition-[background-color,border-color] duration-200 ease-out ${
        solid ? "border-paper/15 bg-red-900" : "border-transparent bg-transparent"
      } ${overlayPage ? "-mb-16" : ""}`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" aria-label={`${COMPANY.name}, home`} className="flex min-h-11 shrink-0 items-center">
            <BrandLogo onDark />
          </Link>

          {/* The full bar needs about 1000px, so it appears from xl (1280px). */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-6">
              {NAV_GROUPS.map((group) => {
                const open = openGroup === group.id;
                const current = groupIsCurrent(group);
                return (
                  <li
                    key={group.id}
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "mouse") return;
                      cancelClose();
                      setOpenGroup(group.id);
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") scheduleClose();
                    }}
                  >
                    {group.href ? (
                      // The label goes to the hub page; the chevron opens the menu.
                      <div className={`relative flex min-h-11 items-center ${current ? ACTIVE_UNDERLINE : ""}`}>
                        <Link
                          href={group.href}
                          aria-current={pathname === group.href ? "page" : undefined}
                          className={`flex min-h-11 items-center text-sm font-medium transition-colors duration-200 ${
                            current || open ? "text-paper" : "text-paper/85 hover:text-paper"
                          }`}
                        >
                          {group.label}
                        </Link>
                        <button
                          ref={(element) => {
                            triggerRefs.current[group.id] = element;
                          }}
                          id={`${group.id}-trigger`}
                          type="button"
                          aria-label={`${group.label} menu`}
                          aria-haspopup="menu"
                          aria-expanded={open}
                          aria-controls={`${group.id}-menu`}
                          onClick={() => setOpenGroup(open ? null : group.id)}
                          onKeyDown={(event) => onTriggerKeyDown(event, group.id)}
                          onBlur={(event) => onGroupBlur(event, group.id)}
                          className={`flex min-h-11 min-w-7 items-center justify-center transition-colors duration-200 ${
                            current || open ? "text-paper" : "text-paper/85 hover:text-paper"
                          }`}
                        >
                          <ChevronDown
                            aria-hidden="true"
                            size={16}
                            strokeWidth={1.5}
                            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                    ) : (
                      <button
                        ref={(element) => {
                          triggerRefs.current[group.id] = element;
                        }}
                        id={`${group.id}-trigger`}
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={open}
                        aria-controls={`${group.id}-menu`}
                        onClick={() => setOpenGroup(open ? null : group.id)}
                        onKeyDown={(event) => onTriggerKeyDown(event, group.id)}
                        onBlur={(event) => onGroupBlur(event, group.id)}
                        className={`relative flex min-h-11 items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                          current || open ? "text-paper" : "text-paper/85 hover:text-paper"
                        } ${current ? ACTIVE_UNDERLINE : ""}`}
                      >
                        {group.label}
                        <ChevronDown
                          aria-hidden="true"
                          size={16}
                          strokeWidth={1.5}
                          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </li>
                );
              })}

              {NAV_LINKS.map((item) => {
                const current = isCurrent(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`relative flex min-h-11 items-center text-sm font-medium transition-colors duration-200 ${
                        current ? `text-paper ${ACTIVE_UNDERLINE}` : "text-paper/85 hover:text-paper"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden shrink-0 xl:block">
            <ButtonLink href={RFQ_HREF} tone="dark">
              Request a quote
            </ButtonLink>
          </div>

          <button
            ref={drawerToggleRef}
            type="button"
            onClick={openDrawer}
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            className="flex min-h-11 items-center gap-2 rounded-control border border-paper/60 px-3 text-sm font-medium text-paper xl:hidden"
          >
            <Menu aria-hidden="true" size={18} strokeWidth={1.5} />
            Menu
          </button>
        </div>
      </Container>

      {/* Dropdown panels: full width, anchored under the bar. */}
      {NAV_GROUPS.map((group) => {
        const open = openGroup === group.id;
        return (
          <div
            key={group.id}
            ref={(element) => {
              panelRefs.current[group.id] = element;
            }}
            id={`${group.id}-menu`}
            role="menu"
            aria-labelledby={`${group.id}-trigger`}
            onKeyDown={(event) => onMenuKeyDown(event, group.id)}
            onBlur={(event) => onGroupBlur(event, group.id)}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") cancelClose();
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") scheduleClose();
            }}
            className={`surface-light pointer-events-none absolute inset-x-0 top-full hidden text-ink-900 duration-200 ease-out xl:block ${
              // Opening: visibility flips at once so the items are focusable
              // immediately. Closing: visibility waits for the fade to finish.
              open
                ? "visible translate-y-0 opacity-100 transition-[opacity,transform]"
                : "invisible -translate-y-1 opacity-0 transition-[opacity,transform,visibility]"
            }`}
          >
            <Container className="pt-3">
              <div className="pointer-events-auto flex overflow-hidden rounded-2xl border border-rule bg-paper shadow-overlay">
                <div className="flex-1 p-3">
                  <p className="px-3 pt-2 pb-3 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    {group.label}
                  </p>
                  <ul
                    role="none"
                    className={`grid gap-1 ${group.items.length > 8 ? "grid-cols-3" : "grid-cols-2"}`}
                  >
                    {group.items.map((item) => {
                      const current = isCurrent(item.href);
                      const Icon = iconFor(item.href);
                      return (
                        <li key={item.href} role="none">
                          <Link
                            href={item.href}
                            role="menuitem"
                            tabIndex={open ? 0 : -1}
                            aria-current={current ? "page" : undefined}
                            className="group flex items-start gap-4 rounded-xl p-3 transition-colors duration-150 hover:bg-paper-2 focus-visible:bg-paper-2"
                          >
                            <span
                              aria-hidden="true"
                              className={`flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-150 ${
                                current
                                  ? "border-red-600 bg-red-600 text-paper"
                                  : "border-rule bg-paper-2 text-red-600 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-paper"
                              }`}
                            >
                              <Icon size={20} strokeWidth={1.75} />
                            </span>
                            <span className="min-w-0">
                              <span
                                className={`block text-base font-semibold ${
                                  current ? "text-red-600" : "text-ink-900"
                                }`}
                              >
                                {item.label}
                              </span>
                              {item.blurb ? (
                                <span className="mt-0.5 line-clamp-2 block text-sm text-ink-500">
                                  {item.blurb}
                                </span>
                              ) : null}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Featured panel: the one action every group leads to. */}
                <div className="surface-deep flex w-72 shrink-0 flex-col justify-between gap-6 bg-red-900 p-6 text-paper">
                  <div>
                    <span
                      aria-hidden="true"
                      className="flex size-11 items-center justify-center rounded-xl bg-paper/10"
                    >
                      <Send size={20} strokeWidth={1.75} />
                    </span>
                    <p className="mt-4 font-display text-lg font-semibold">{COMPANY.positioning}</p>
                    <p className="mt-2 text-sm text-paper/85">{COMPANY.proofLine}</p>
                  </div>
                  <Link
                    href={RFQ_HREF}
                    role="menuitem"
                    tabIndex={open ? 0 : -1}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-paper px-5 text-sm font-semibold text-red-900 transition-colors duration-150 hover:bg-red-050"
                  >
                    Request a quote
                    <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </Container>
          </div>
        );
      })}

      {/* Mobile drawer: full screen, sliding in from the right. */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!drawerOpen}
        className={`surface-light fixed inset-0 z-50 flex flex-col bg-paper text-ink-900 transition-transform duration-200 ease-out xl:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-rule px-5">
          <BrandLogo />
          <button
            ref={drawerCloseRef}
            type="button"
            onClick={closeDrawer}
            className="flex min-h-11 items-center gap-2 rounded-control border border-ink-500 px-3 text-sm font-medium text-ink-900"
          >
            <X aria-hidden="true" size={18} strokeWidth={1.5} />
            Close
          </button>
        </div>

        <nav aria-label="Primary (mobile)" className="flex-1 overflow-y-auto px-5 py-2">
          <ul className="flex flex-col">
            {NAV_GROUPS.map((group) => {
              const open = expanded === group.id;
              return (
                <li key={group.id} className="border-b border-rule">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`${group.id}-drawer-list`}
                    onClick={() => setExpanded(open ? null : group.id)}
                    className="flex min-h-12 w-full items-center justify-between text-left text-lg font-medium text-ink-900"
                  >
                    {group.label}
                    <ChevronDown
                      aria-hidden="true"
                      size={20}
                      strokeWidth={1.5}
                      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  <ul id={`${group.id}-drawer-list`} hidden={!open} className="pb-3">
                    {group.items.map((item) => {
                      const current = isCurrent(item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={current ? "page" : undefined}
                            className="flex min-h-11 flex-col justify-center py-2"
                          >
                            <span
                              className={`text-base ${
                                current
                                  ? "font-medium text-red-600 underline decoration-2 underline-offset-4"
                                  : "text-ink-900"
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.blurb ? (
                              <span className="text-sm text-ink-500">{item.blurb}</span>
                            ) : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}

            {NAV_LINKS.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href} className="border-b border-rule">
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`flex min-h-12 items-center text-lg font-medium ${
                      current
                        ? "text-red-600 underline decoration-2 underline-offset-4"
                        : "text-ink-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* The quote action stays pinned to the bottom of the drawer. */}
        <div className="shrink-0 border-t border-rule p-5">
          <ButtonLink href={RFQ_HREF} className="w-full">
            Request a quote
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
