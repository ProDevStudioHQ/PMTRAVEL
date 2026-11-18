"use client";

/**
 * Client Component: Google Map, lazy and consent-aware. Google Maps sets its
 * own cookies, so the iframe loads automatically only after "Accept" in the
 * cookie notice; otherwise the visitor can load it with one click. Either
 * way it uses loading="lazy" and a fixed aspect ratio (no layout shift).
 */
import { useState } from "react";
import { MapPin } from "lucide-react";
import { useConsent } from "@/components/layout/CookieBanner";
import { COMPANY } from "@/lib/company";

export function MapEmbed({ className = "" }: { className?: string }) {
  const [clicked, setShow] = useState(false);
  const consent = useConsent();
  const show = clicked || consent === "all";

  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-sand-2 ${className}`}>
      {show ? (
        <iframe
          title="Map showing the PM Travel Agency office in Marrakech"
          src={COMPANY.mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <MapPin aria-hidden="true" size={32} strokeWidth={1.5} className="text-terracotta" />
          <p className="max-w-xs text-sm text-muted">The map is provided by Google, which may set cookies.</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => setShow(true)} className="min-h-11 rounded-full bg-terracotta-600 px-5 text-sm font-medium text-white hover:bg-midnight">
              Show map
            </button>
            <a href={COMPANY.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-ink/20 px-5 text-sm font-medium hover:border-ink">
              Open in Google Maps
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
