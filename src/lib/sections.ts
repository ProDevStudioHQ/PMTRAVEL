/**
 * A page section with the CRM's edits applied (Website → Page sections).
 * Pure merge in `mergeSection` (unit-tested); `getSection` reads the CRM data.
 */
import "server-only";
import { getSite } from "@/lib/cms";
import { EDITABLE_SECTIONS, type SectionDefaults } from "@/content/home-sections";
import { safeHref } from "@/lib/site-layout";
import { mergeSection, type ResolvedSection } from "@/lib/section-merge";

export type { ResolvedSection, ResolvedCard } from "@/lib/section-merge";

export async function getSection(path: string, id: string): Promise<ResolvedSection> {
  const spec = EDITABLE_SECTIONS.find((s) => s.path === path && s.id === id);
  const defaults: SectionDefaults = spec?.defaults ?? { eyebrow: null, title: null, intro: null, cards: [] };
  const override = (await getSite()).sections?.[`${path}#${id}`] ?? null;
  return mergeSection(defaults, override, safeHref);
}
