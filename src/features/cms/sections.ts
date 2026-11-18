import { EXPERIENCES, TOURS, type LeisureProduct } from "@/content/leisure";
import type { Section } from "@/types/cms";

/**
 * The two CRM sections and the hand-written category pages that already exist
 * for them (src/content/leisure.ts). A CRM category whose slug matches a
 * hand-written one keeps that page's content and gains the CRM programme grid;
 * any other CRM category gets a generic category page.
 */
export const SECTIONS = {
  experiences: {
    section: "EXPERIENCES" as Section,
    segment: "experiences" as const,
    label: "Experiences",
    singular: "experience",
    heroImage: "e18-jemaa-el-fna-dusk",
    local: EXPERIENCES,
  },
  tours: {
    section: "TOURS" as Section,
    segment: "tours" as const,
    label: "Tours",
    singular: "tour",
    heroImage: "c8-dades-gorge",
    local: TOURS,
  },
};

export type SectionKey = keyof typeof SECTIONS;

export const localCategory = (key: SectionKey, slug: string): LeisureProduct | undefined => SECTIONS[key].local.find((p) => p.slug === slug);

/** Programmes per page on category pages (contract default 12, max 50). */
export const PAGE_SIZE = 12;

/** "?page=2" -> 2; anything else -> 1. */
export function parsePage(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const n = Number(raw);
  return Number.isInteger(n) && n > 1 && n < 10_000 ? n : 1;
}
