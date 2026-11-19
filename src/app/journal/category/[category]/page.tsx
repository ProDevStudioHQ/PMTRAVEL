import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { seoFor } from "@/lib/page-seo";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ArticleGrid, CategoryNav } from "@/components/templates/JournalList";
import { JOURNAL_CATEGORIES, articlesInCategory, categoryBySlug } from "@/content/journal";

export const dynamicParams = false;

export function generateStaticParams() {
  return JOURNAL_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const category = categoryBySlug((await params).category);
  if (!category) return {};
  return seoFor({
    title: `${category.name} | Journal`,
    description: `${category.description} Articles for travel agencies, tour operators and MICE planners from our Morocco DMC team in Marrakech.`,
    path: `/journal/category/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const category = categoryBySlug((await params).category);
  if (!category) notFound();
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title={category.name}
        standfirst={category.description}
        imageKey="e12-souk-lanterns"
        trail={[
          { href: "/journal", label: "Journal" },
          { href: `/journal/category/${category.slug}`, label: category.name },
        ]}
      />
      <Section tone="sand" aria-label="Articles">
        <CategoryNav active={category.slug} />
        <ArticleGrid articles={articlesInCategory(category.slug)} />
      </Section>
    </>
  );
}
