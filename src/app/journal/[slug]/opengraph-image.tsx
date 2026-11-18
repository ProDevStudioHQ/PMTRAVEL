import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { articleBySlug } from "@/content/journal";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<Record<string, string>> }) {
  const p = await params;
  const a = articleBySlug(p.slug!)!;
  return ogImage({ title: a.title, eyebrow: "Journal", imageKey: a.image });
}

export { generateStaticParams } from "./page";
