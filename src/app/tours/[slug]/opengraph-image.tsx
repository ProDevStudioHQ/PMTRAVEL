import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { tourBySlug } from "@/content/leisure";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<Record<string, string>> }) {
  const p = await params;
  const t = tourBySlug(p.slug!)!;
  return ogImage({ title: t.h1, eyebrow: t.eyebrow, imageKey: t.heroImage });
}

export { generateStaticParams } from "./page";
