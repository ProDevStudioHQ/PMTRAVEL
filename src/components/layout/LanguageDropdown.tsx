"use client";

/**
 * Client Component: language dropdown with flags. Translation is done by
 * Google Translate in the visitor's browser (machine translation, decided by
 * the business in Nov 2026). Picking a language stores Google's own
 * `googtrans` cookie and reloads; GoogleTranslate.tsx then loads Google's
 * script. English visitors never load anything from Google.
 */
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Check, ChevronDown } from "lucide-react";

export const TRANSLATE_LANGS = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "es", label: "ES", name: "Español" },
  { code: "pt", label: "PT", name: "Português" },
] as const;

export type TranslateLang = (typeof TRANSLATE_LANGS)[number]["code"];

/** Reads the active language from Google's cookie ("/en/fr" → "fr"). */
export function readTranslateLang(): TranslateLang {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[a-z-]+\/([a-z-]+)/i);
  const code = match?.[1]?.toLowerCase();
  return TRANSLATE_LANGS.some((l) => l.code === code) ? (code as TranslateLang) : "en";
}

function setTranslateLang(code: TranslateLang) {
  const host = window.location.hostname;
  const domains = ["", `; domain=${host}`, `; domain=.${host.replace(/^www\./, "")}`];
  for (const domain of domains) {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
  }
  if (code !== "en") {
    document.cookie = `googtrans=/en/${code}; path=/`;
    document.cookie = `googtrans=/en/${code}; path=/; domain=.${host.replace(/^www\./, "")}`;
  }
  window.location.reload();
}

const noop = () => () => {};

export function Flag({ code, className = "" }: { code: TranslateLang; className?: string }) {
  const id = useId().replace(/:/g, "");
  const common = { className: `h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10 ${className}`, "aria-hidden": true as const };
  if (code === "fr")
    return (
      <svg viewBox="0 0 3 2" preserveAspectRatio="none" {...common}>
        <rect width="1" height="2" fill="#002654" />
        <rect x="1" width="1" height="2" fill="#ffffff" />
        <rect x="2" width="1" height="2" fill="#ce1126" />
      </svg>
    );
  if (code === "es")
    return (
      <svg viewBox="0 0 4 4" preserveAspectRatio="none" {...common}>
        <rect width="4" height="4" fill="#aa151b" />
        <rect y="1" width="4" height="2" fill="#f1bf00" />
      </svg>
    );
  if (code === "pt")
    return (
      <svg viewBox="0 0 30 20" preserveAspectRatio="none" {...common}>
        <rect width="30" height="20" fill="#ff0000" />
        <rect width="12" height="20" fill="#006600" />
        <circle cx="12" cy="10" r="4.2" fill="#ffcc00" />
        <circle cx="12" cy="10" r="2.6" fill="#ff0000" stroke="#ffffff" strokeWidth="0.8" />
      </svg>
    );
  // English: United Kingdom
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="none" {...common}>
      <clipPath id={`${id}s`}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={`${id}t`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${id}s)`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id}t)`} stroke="#c8102e" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  );
}

export function LanguageDropdown({ className = "", align = "right", up = false }: { className?: string; align?: "left" | "right"; up?: boolean }) {
  const current = useSyncExternalStore(noop, readTranslateLang, () => "en" as TranslateLang);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const active = TRANSLATE_LANGS.find((l) => l.code === current) ?? TRANSLATE_LANGS[0];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <div ref={ref} className={`notranslate relative ${className}`} translate="no">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-8 items-center gap-2 rounded-full border border-sand/25 px-3 py-1 text-xs font-medium text-sand transition-colors hover:border-gold"
      >
        <Flag code={active.code} />
        {active.label}
        <span className="sr-only">, change language</span>
        <ChevronDown aria-hidden="true" size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open ? (
          <m.ul
            id={menuId}
            aria-label="Language"
            initial={{ opacity: 0, y: up ? -8 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: up ? -8 : 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute z-[70] w-48 ${up ? "bottom-full mb-2" : "top-full mt-2"} overflow-hidden rounded-2xl border border-line bg-white p-1.5 text-ink shadow-overlay ${align === "right" ? "right-0" : "left-0"}`}
          >
            {TRANSLATE_LANGS.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  lang={lang.code}
                  aria-current={lang.code === current ? "true" : undefined}
                  onClick={() => (lang.code === current ? setOpen(false) : setTranslateLang(lang.code))}
                  className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition-colors hover:bg-sand aria-[current=true]:bg-sand"
                >
                  <Flag code={lang.code} />
                  <span className="flex-1">{lang.name}</span>
                  {lang.code === current ? <Check aria-hidden="true" size={16} className="text-terracotta-700" /> : null}
                </button>
              </li>
            ))}
          </m.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
