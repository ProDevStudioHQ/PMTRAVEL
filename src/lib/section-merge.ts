/**
 * Merge rules for CRM section edits. No server-only import, so it is unit-tested.
 *   text  null -> the site's text;  "" -> hidden;  otherwise the CRM text
 *   cards null -> the site's cards; otherwise the CRM list (add/remove/reorder)
 */
import type { SectionDefaults } from "@/content/home-sections";
import type { Image, SectionOverride } from "@/types/cms";

export type ResolvedCard = {
  title: string;
  body: string;
  icon: string | null;
  imageKey: string | null;
  image: Image | null;
  href: string | null;
};

export type ResolvedSection = {
  hidden: boolean;
  eyebrow: string | null;
  title: string | null;
  intro: string | null;
  cards: ResolvedCard[];
  /** True when the CRM replaced the cards (pages may render them more generically). */
  customCards: boolean;
};

const text = (crm: string | null | undefined, site: string | null) => {
  if (crm == null) return site;
  const v = crm.trim();
  return v === "" ? null : v;
};

export function mergeSection(defaults: SectionDefaults, o: SectionOverride | null, safeHref: (u: string | null | undefined) => string | null): ResolvedSection {
  const cards: ResolvedCard[] = o?.cards
    ? o.cards
        .filter((c) => c.title.trim() || c.body.trim())
        .map((c) => ({
          title: c.title.trim(),
          body: c.body.trim(),
          icon: c.icon || null,
          imageKey: c.imageKey || null,
          image: c.image ?? null,
          href: safeHref(c.href),
        }))
    : defaults.cards.map((c) => ({ ...c, image: null }));
  return {
    hidden: o?.hidden ?? false,
    eyebrow: text(o?.eyebrow, defaults.eyebrow),
    // A section always keeps a heading (screen readers and the page outline need it).
    title: text(o?.title, defaults.title) ?? defaults.title,
    intro: text(o?.intro, defaults.intro),
    cards,
    customCards: Boolean(o?.cards),
  };
}
