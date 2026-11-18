import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LeisurePage } from "@/components/templates/LeisurePage";
import { EXPERIENCES, experienceBySlug, leisureHref } from "@/content/leisure";

export const dynamicParams = false;

export function generateStaticParams() {
  return EXPERIENCES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = experienceBySlug((await params).slug);
  if (!product) return {};
  return pageMetadata({ title: product.seoTitle, description: product.seoDescription, path: leisureHref(product) });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const product = experienceBySlug((await params).slug);
  if (!product) notFound();
  return <LeisurePage product={product} />;
}
