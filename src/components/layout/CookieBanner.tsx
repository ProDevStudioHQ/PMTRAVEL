"use client";

/**
 * Client Component: cookie notice. The choice is kept in localStorage (a
 * per-browser convenience; wrapped in try/catch because storage can be
 * blocked). "Accept" also allows third-party embeds such as Google Maps,
 * which set their own cookies; "Essential only" keeps them click-to-load.
 */
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { en } from "@/i18n/dictionaries/en";

const KEY = "pm-cookie-consent";
const EVENT = "pm-consent-change";
export type Consent = "all" | "essential";

/** Fallback when storage is blocked: the choice lasts for this page view. */
let memory: Consent | null = null;

function read(): Consent | null {
  try {
    const value = window.localStorage.getItem(KEY);
    return value === "all" || value === "essential" ? value : memory;
  } catch {
    return memory;
  }
}

export function writeConsent(value: Consent) {
  memory = value;
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* storage blocked */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** "pending" on the server and during hydration, then the stored choice or null. */
export function useConsent(): Consent | null | "pending" {
  return useSyncExternalStore(subscribe, read, () => "pending" as const);
}

export function CookieBanner() {
  const consent = useConsent();
  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fade-up fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-line bg-ivory p-5 text-ink shadow-overlay sm:right-auto sm:left-6 sm:max-w-md"
    >
      <p className="text-sm">
        {en.cookies.message}{" "}
        <Link href="/cookies" className="text-terracotta-700 underline underline-offset-2">
          {en.cookies.more}
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => writeConsent("all")} className="min-h-11 rounded-full bg-terracotta-600 px-5 text-sm font-medium text-white hover:bg-midnight">
          {en.cookies.accept}
        </button>
        <button type="button" onClick={() => writeConsent("essential")} className="min-h-11 rounded-full border border-ink/20 px-5 text-sm font-medium hover:border-ink">
          {en.cookies.decline}
        </button>
      </div>
    </div>
  );
}
