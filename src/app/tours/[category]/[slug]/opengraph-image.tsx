import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { SECTIONS } from "@/features/cms/sections";
import { getProgramme } from "@/lib/cms";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<Record<string, string>> }) {
  const cfg = SECTIONS["tours"];
  const result = await getProgramme(cfg.section, (await params).slug ?? "");
  if (result.kind !== "ok") return ogImage({ title: cfg.label, eyebrow: "PM Travel Agency", imageKey: cfg.heroImage });
  const p = result.programme;
  return ogImage({
    title: p.title,
    eyebrow: `${cfg.label} · ${p.category.name}`,
    imageKey: cfg.heroImage,
    imageUrl: (p.seo.ogImage ?? p.cover)?.url,
  });
}

export { generateStaticParams } from "./page";
