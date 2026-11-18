"use client";

/**
 * Client Component: loads Google Translate only when the visitor has picked a
 * language other than English (googtrans cookie set by LanguageDropdown).
 *
 * Google Translate rewrites text nodes, which breaks React when it later
 * removes or inserts nodes (facebook/react#11538). The guarded
 * removeChild/insertBefore below is the standard workaround; it is installed
 * only while a translation is active.
 */
import { useEffect } from "react";
import { readTranslateLang } from "@/components/layout/LanguageDropdown";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate?: { TranslateElement: new (options: object, id: string) => unknown } };
  }
}

function patchDomForTranslation() {
  const proto = Node.prototype as Node & { __pmPatched?: boolean };
  if (proto.__pmPatched) return;
  proto.__pmPatched = true;
  const removeChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return removeChild.call(this, child) as T;
  };
  const insertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, node: T, reference: Node | null): T {
    if (reference && reference.parentNode !== this) return node;
    return insertBefore.call(this, node, reference) as T;
  };
}

export function GoogleTranslate() {
  useEffect(() => {
    if (readTranslateLang() === "en") return;
    patchDomForTranslation();
    if (document.getElementById("google-translate-script")) return;
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,fr,es,pt", autoDisplay: false },
        "google_translate_element"
      );
    };
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div id="google_translate_element" className="hidden" aria-hidden="true" />;
}
