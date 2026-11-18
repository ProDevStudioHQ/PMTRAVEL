import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { experienceBySlug } from "@/content/leisure";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<Record<string, string>> }) {
  const p = await params;
  const e = experienceBySlug(p.slug!)!;
  return ogImage({ title: e.h1, eyebrow: e.eyebrow, imageKey: e.heroImage });
}

export { generateStaticParams } from "./page";
