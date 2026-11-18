import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ArticleGrid, CategoryNav } from "@/components/templates/JournalList";
import { CtaBand } from "@/components/CtaBand";
import { ARTICLES } from "@/content/journal";

export const metadata = pageMetadata({
  title: "Journal | Morocco Trade Guides & Insights",
  description:
    "The PM Travel Agency journal: practical Morocco guides for travel agencies, tour operators and MICE planners — briefs, destinations, incentives and white-label.",
  path: "/journal",
});

export default function JournalPage() {
  const articles = [...ARTICLES].sort((a, b) => b.published.localeCompare(a.published));
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Morocco, from the ground"
        standfirst="Practical guides for travel professionals selling Morocco, written by our Marrakech team."
        imageKey="e12-souk-lanterns"
        trail={[{ href: "/journal", label: "Journal" }]}
      />
      <Section tone="sand" aria-label="Articles">
        <CategoryNav />
        <ArticleGrid articles={articles} />
      </Section>
      <CtaBand />
    </>
  );
}
