import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { SECTIONS, localCategory } from "@/features/cms/sections";
import { getCategories } from "@/lib/cms";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<Record<string, string>> }) {
  const slug = (await params).category ?? "";
  const cfg = SECTIONS["experiences"];
  const local = localCategory("experiences", slug);
  if (local) return ogImage({ title: local.h1, eyebrow: local.eyebrow, imageKey: local.heroImage });
  const category = (await getCategories(cfg.section))?.find((c) => c.slug === slug);
  return ogImage({ title: category?.name ?? cfg.label, eyebrow: cfg.label, imageKey: cfg.heroImage });
}

export { generateStaticParams } from "./page";
