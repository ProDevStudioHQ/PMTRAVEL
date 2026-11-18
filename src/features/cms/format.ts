import type { Currency, ProgrammeSummary, Section } from "@/types/cms";

/** URL segment for a section: "EXPERIENCES" -> "experiences". */
export const sectionSegment = (section: Section) => section.toLowerCase() as "experiences" | "tours";

export const programmeHref = (p: Pick<ProgrammeSummary, "section" | "slug" | "category">) =>
  `/${sectionSegment(p.section)}/${p.category.slug}/${p.slug}`;

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** "8 days / 7 nights", or "1 day" for a day trip. */
export function durationLabel(days: number, nights: number) {
  if (!days) return null;
  return nights ? `${plural(days, "day")} / ${plural(nights, "night")}` : plural(days, "day");
}

export const GROUP_TYPE_LABEL: Record<ProgrammeSummary["groupType"], string> = {
  PRIVATE: "Private",
  GROUP: "Group",
  BOTH: "Private or group",
};

/** "From 1,250 EUR". Decimals only when the price has cents. */
export function priceLabel(price: { from: number; currency: Currency }) {
  const hasCents = Math.round(price.from * 100) % 100 !== 0;
  const amount = new Intl.NumberFormat("en-GB", { minimumFractionDigits: hasCents ? 2 : 0, maximumFractionDigits: 2 }).format(price.from);
  return `From ${amount} ${price.currency}`;
}

/** "2.4 MB" */
export function fileSizeLabel(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
