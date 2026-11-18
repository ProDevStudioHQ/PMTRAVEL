"use client";

/**
 * Client Component: full-screen mobile menu with accordions. Locks body
 * scroll, closes on Escape, traps nothing it does not need to (focus moves to
 * the close button on open and back to the opener on close).
 */
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Phone, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { WhatsappIcon } from "@/components/Icon";
import { buttonClasses } from "@/components/Button";
import { LanguageSwitch } from "@/components/layout/SiteHeader";
import { COMPANY, LOGIN_HREF, RFQ_HREF, whatsappLink } from "@/lib/company";
import { en } from "@/i18n/dictionaries/en";
import type { NavEntry } from "@/lib/nav";

type Props = { nav: NavEntry[]; open: boolean; onClose: () => void; pathname: string };

export function MobileMenu({ nav, open, onClose, pathname }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="on-dark fixed inset-0 z-[60] flex flex-col bg-midnight text-sand xl:hidden"
        >
          <div className="flex h-[72px] shrink-0 items-center justify-between px-4 sm:px-6">
            <Logo onClick={onClose} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-full border border-sand/30"
            >
              <X aria-hidden="true" size={20} />
              <span className="sr-only">{en.nav.close}</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
            <ul className="divide-y divide-sand/10 border-y border-sand/10">
              {nav.map((item) => {
                if (!item.menu) {
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className="flex min-h-14 items-center font-display text-2xl aria-[current=page]:text-gold"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const isOpen = expanded === item.id;
                const panelId = `m-${item.id}`;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpanded(isOpen ? null : item.id)}
                      className="flex min-h-14 w-full items-center justify-between text-left font-display text-2xl"
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.emphasis ? <span className="rounded-full bg-terracotta-600 px-2 py-0.5 font-sans text-[0.6875rem] font-medium tracking-wide text-white">TRADE</span> : null}
                      </span>
                      <ChevronDown aria-hidden="true" size={20} className={`text-gold transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <m.ul
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden pb-3"
                        >
                          {[...item.menu.items, { href: item.href, label: item.menu.allLabel ?? item.label }].map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                aria-current={pathname === link.href ? "page" : undefined}
                                className="flex min-h-11 items-center pl-4 text-base text-sand/80 hover:text-sand aria-[current=page]:text-gold"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </m.ul>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href={RFQ_HREF} onClick={onClose} className={buttonClasses("primary", "dark", "w-full")}>
                <span>{en.cta.quote}</span>
              </Link>
              <Link href={LOGIN_HREF} onClick={onClose} className={buttonClasses("secondary", "dark", "w-full")}>
                <span>{en.cta.login}</span>
              </Link>
            </div>
            <LanguageSwitch className="mt-6" />
          </nav>

          <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-sand/10 p-4 sm:px-6">
            <a href={`tel:${COMPANY.phone.mobile.tel}`} className={buttonClasses("secondary", "dark", "w-full")}>
              <Phone aria-hidden="true" size={18} />
              <span>Call</span>
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary", "dark", "w-full")}>
              <WhatsappIcon size={18} />
              <span>WhatsApp</span>
            </a>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
