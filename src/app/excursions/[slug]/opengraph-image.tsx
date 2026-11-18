import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { excursionBySlug } from "@/features/excursions/data";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<Record<string, string>> }) {
  const p = await params;
  const x = excursionBySlug(p.slug!)!;
  return ogImage({ title: x.name, eyebrow: "B2B Excursion", imageKey: x.heroImage });
}

export { generateStaticParams } from "./page";
