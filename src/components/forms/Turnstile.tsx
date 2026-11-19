"use client";

/**
 * Client Component: Cloudflare Turnstile. Renders the widget into the form;
 * Turnstile adds a hidden "cf-turnstile-response" input that the Server
 * Action forwards to the CRM as captchaToken (the CRM verifies it).
 *
 * Renders nothing when NEXT_PUBLIC_CAPTCHA_SITE_KEY is not set (local dev).
 * The script loads once, on the first page with a form, never site-wide.
 */
import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let loading: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile did not initialise")));
    script.onerror = () => {
      loading = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

export const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY ?? "";

export function Turnstile({ onDark = false, error }: { onDark?: boolean; error?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!CAPTCHA_SITE_KEY || !ref.current) return;
    let widgetId: string | null = null;
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled || !ref.current) return;
        widgetId = api.render(ref.current, { sitekey: CAPTCHA_SITE_KEY, theme: onDark ? "dark" : "light", size: "flexible" });
      })
      .catch((e) => console.error(e));
    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onDark]);

  if (!CAPTCHA_SITE_KEY) return null;
  return (
    <div className="sm:col-span-2">
      <div ref={ref} className="min-h-[65px]" />
      {error ? <p className={`mt-1.5 text-[0.8125rem] font-medium ${onDark ? "text-terracotta-300" : "text-terracotta-700"}`}>{error}</p> : null}
    </div>
  );
}
