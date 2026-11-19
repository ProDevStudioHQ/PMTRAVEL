import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { seoFor } from "@/lib/page-seo";
import { AudiencePage } from "@/components/templates/AudiencePage";
import { AUDIENCES, audienceBySlug } from "@/content/b2b";

export const dynamicParams = false;

export function generateStaticParams() {
  return AUDIENCES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const audience = audienceBySlug((await params).slug);
  if (!audience) return {};
  return seoFor({ title: audience.seoTitle, description: audience.seoDescription, path: `/b2b/${audience.slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const audience = audienceBySlug((await params).slug);
  if (!audience) notFound();
  return <AudiencePage audience={audience} />;
}
