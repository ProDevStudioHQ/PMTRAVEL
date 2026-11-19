/**
 * Site colours set in the CRM (Website → Colours).
 *
 * The design reads every colour from CSS variables (globals.css @theme), so a
 * colour change is one variable. Only listed keys and #rrggbb values are ever
 * written into the page, so CRM data can never inject CSS.
 * No server-only import: unit-tested.
 */

export type ColorSlot = { key: string; label: string; hint: string; default: string };

/** Brand colours. Each sets the listed variables (aliases kept in step). */
export const PALETTE: (ColorSlot & { vars: string[] })[] = [
  { key: "primary", label: "Main colour (buttons, icons)", hint: "Terracotta", default: "#b5502e", vars: ["terracotta", "terracotta-600", "red-600"] },
  { key: "primaryDark", label: "Main colour, darker (hover, links)", hint: "Dark terracotta", default: "#96401f", vars: ["terracotta-700"] },
  { key: "primaryLight", label: "Main colour on dark backgrounds", hint: "Light terracotta", default: "#e59a72", vars: ["terracotta-300"] },
  { key: "accent", label: "Accent (decoration)", hint: "Gold", default: "#c9973a", vars: ["gold"] },
  { key: "accentDark", label: "Accent text on light backgrounds", hint: "Dark gold", default: "#8a6424", vars: ["gold-700"] },
  { key: "dark", label: "Dark sections, menu bar, footer", hint: "Midnight indigo", default: "#14213d", vars: ["indigo", "midnight", "red-900"] },
  { key: "dark2", label: "Dark sections, second shade", hint: "Indigo 2", default: "#1c2c4f", vars: ["indigo-2", "midnight-2"] },
  { key: "page", label: "Page background (also light text on dark)", hint: "Sand", default: "#f4ebdd", vars: ["sand", "paper"] },
  { key: "page2", label: "Page background, second shade", hint: "Sand 2", default: "#ede1cf", vars: ["sand-2"] },
  { key: "card", label: "Card background", hint: "Ivory", default: "#fbf7f0", vars: ["ivory", "paper-2", "red-050"] },
  { key: "border", label: "Borders and lines", hint: "Clay", default: "#e6d5c3", vars: ["clay", "line", "rule"] },
  { key: "text", label: "Main text", hint: "Ink", default: "#1e1a17", vars: ["ink", "ink-900"] },
  { key: "muted", label: "Secondary text", hint: "Muted brown", default: "#5e544b", vars: ["muted", "ink-500"] },
  { key: "green", label: "Green (WhatsApp, B2B badges)", hint: "Zellige", default: "#1e6b52", vars: ["zellige", "whatsapp"] },
  { key: "blue", label: "Blue", hint: "Majorelle", default: "#1f4fa8", vars: ["majorelle"] },
];

/** Colours of one area only. Empty = the brand colours above. */
export const AREAS: ColorSlot[] = [
  { key: "topbarBg", label: "Top bar background", hint: "Transparent over the menu bar", default: "#14213d" },
  { key: "topbarText", label: "Top bar text", hint: "Sand", default: "#f4ebdd" },
  { key: "headerBg", label: "Menu bar background", hint: "Midnight", default: "#14213d" },
  { key: "headerText", label: "Menu bar text", hint: "Sand", default: "#f4ebdd" },
  { key: "footerBg", label: "Footer background", hint: "Midnight", default: "#14213d" },
  { key: "footerText", label: "Footer text", hint: "Sand", default: "#f4ebdd" },
];

export type ThemeData = { palette?: Record<string, string>; areas?: Record<string, string> };

const HEX = /^#[0-9a-f]{6}$/i;
const ok = (v: unknown): v is string => typeof v === "string" && HEX.test(v);

/** The <style> text for the CRM colours, or "" when nothing is set. */
export function themeCss(theme: ThemeData | null | undefined): string {
  if (!theme) return "";
  const root: string[] = [];
  for (const p of PALETTE) {
    const v = theme.palette?.[p.key];
    if (ok(v)) for (const name of p.vars) root.push(`--color-${name}:${v.toLowerCase()}`);
  }
  const a = (k: string) => (ok(theme.areas?.[k]) ? theme.areas![k]!.toLowerCase() : null);
  const rules: string[] = [];
  if (root.length) rules.push(`:root{${root.join(";")}}`);
  // Areas re-point the variables inside them, so every shade and hover follows.
  const topBg = a("topbarBg");
  const topText = a("topbarText");
  if (topBg) rules.push(`.site-topbar{background-color:${topBg}}`);
  if (topText) rules.push(`.site-topbar{--color-sand:${topText};--color-white:${topText}}`);
  const headBg = a("headerBg");
  const headText = a("headerText");
  if (headBg) rules.push(`.site-header{--color-midnight:${headBg}}`);
  if (headText) {
    rules.push(`.site-header-bar{--color-sand:${headText};--color-white:${headText};color:${headText}}`);
    // Dropdown panels are light cards: keep their own colours.
    const page = ok(theme.palette?.page) ? theme.palette!.page!.toLowerCase() : PALETTE.find((p) => p.key === "page")!.default;
    rules.push(`.site-header-bar .shadow-overlay{--color-sand:${page};--color-white:#ffffff}`);
  }
  const footBg = a("footerBg");
  const footText = a("footerText");
  if (footBg) rules.push(`.site-footer{--color-midnight:${footBg};background-color:${footBg}}`);
  if (footText) rules.push(`.site-footer{--color-sand:${footText};color:${footText}}`);
  return rules.join("\n");
}
