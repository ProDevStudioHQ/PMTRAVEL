import type { Metadata } from "next";
import { CategoryRoute, categoryMetadata, categoryStaticParams } from "@/features/cms/CategoryRoute";
import { parsePage } from "@/features/cms/sections";

/** CRM categories added after the deploy render on first request. */
export const dynamicParams = true;

export function generateStaticParams() {
  return categoryStaticParams("tours");
}

type Props = { params: Promise<{ category: string }>; searchParams: Promise<{ page?: string | string[] }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return categoryMetadata("tours", (await params).category, parsePage((await searchParams).page));
}

export default async function Page({ params, searchParams }: Props) {
  return <CategoryRoute sectionKey="tours" slug={(await params).category} page={parsePage((await searchParams).page)} />;
}
