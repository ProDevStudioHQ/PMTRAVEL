/**
 * i18n configuration.
 *
 * English is served at the root (no prefix). French is planned at /fr/... .
 * To launch French:
 *   1. set `enabled: true` for "fr" below;
 *   2. add src/i18n/dictionaries/fr.ts (same keys as en.ts);
 *   3. add the /fr route tree (app/fr/...) rendering the same templates with
 *      the French dictionary and translated content files.
 * hreflang tags, the language switch and the sitemap read from this file, so
 * they switch on automatically.
 */
export const LOCALES = [
  { code: "en", hreflang: "en", label: "EN", name: "English", prefix: "", enabled: true },
  { code: "fr", hreflang: "fr", label: "FR", name: "Français", prefix: "/fr", enabled: false },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];
export const DEFAULT_LOCALE: LocaleCode = "en";

export const enabledLocales = () => LOCALES.filter((l) => l.enabled);

/** hreflang map for a path: every enabled locale plus x-default. */
export function hreflangAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of enabledLocales()) {
    map[locale.hreflang] = `${locale.prefix}${path === "/" && locale.prefix ? "" : path}` || "/";
  }
  map["x-default"] = path;
  return map;
}
