import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { audienceBySlug } from "@/content/b2b";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<Record<string, string>> }) {
  const p = await params;
  const a = audienceBySlug(p.slug!)!;
  return ogImage({ title: a.h1, eyebrow: a.eyebrow, imageKey: a.heroImage });
}

export { generateStaticParams } from "./page";
