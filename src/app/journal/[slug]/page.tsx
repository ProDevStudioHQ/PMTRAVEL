import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/CtaBand";
import { ArticleGrid, formatDate } from "@/components/templates/JournalList";
import { ARTICLES, articleBySlug, categoryBySlug } from "@/content/journal";
import { imageByKey } from "@/features/images/registry";
import { articleSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = articleBySlug((await params).slug);
  if (!article) return {};
  return pageMetadata({
    title: article.seoTitle,
    description: article.description,
    path: `/journal/${article.slug}`,
    type: "article",
    publishedTime: article.published,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = articleBySlug((await params).slug);
  if (!article) notFound();
  const category = categoryBySlug(article.category);
  const path = `/journal/${article.slug}`;
  const more = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={category?.name ?? "Journal"}
        title={article.title}
        standfirst={
          <p>
            <time dateTime={article.published}>{formatDate(article.published)}</time> · {article.readMinutes} min read
          </p>
        }
        imageKey={article.image}
        trail={[
          { href: "/journal", label: "Journal" },
          { href: path, label: article.title },
        ]}
      />

      <article className="bg-sand">
        <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="measure lg:col-span-8">
            <p className="font-display text-[1.375rem] leading-relaxed text-ink">{article.excerpt}</p>
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-ink/90">
              {article.body.map((block, i) => {
                if (block.type === "h2") return <h2 key={i} className="t-h3 pt-6 text-ink">{block.text}</h2>;
                if (block.type === "list")
                  return (
                    <ul key={i} className="list-disc space-y-2 pl-6 marker:text-terracotta">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                return <p key={i}>{block.text}</p>;
              })}
            </div>
          </div>
          <aside className="lg:col-span-4" aria-label="Related pages">
            <div className="sticky top-28 rounded-card border border-line bg-ivory p-7">
              <h2 className="font-display text-xl">Read next</h2>
              <ul className="mt-4">
                {article.links.map((l) => (
                  <li key={l.href} className="border-b border-line last:border-0">
                    <Link href={l.href} className="group flex min-h-12 items-center justify-between gap-3 py-2 text-[0.9375rem] text-terracotta-700">
                      {l.label}
                      <ArrowRight aria-hidden="true" size={16} className="arrow-slide shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </article>

      <Section tone="white" aria-labelledby="more">
        <h2 id="more" className="t-h2">
          More from the journal
        </h2>
        <ArticleGrid articles={more} />
      </Section>

      <CtaBand />
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.description,
          path,
          image: imageByKey(article.image)?.src ?? "",
          published: article.published,
          section: category?.name ?? "Journal",
        })}
      />
    </>
  );
}
