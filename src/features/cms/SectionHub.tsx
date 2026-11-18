import { LeisureHub } from "@/components/templates/LeisureHub";
import { LeisureCard } from "@/components/templates/LeisureCard";
import { CategoryCard } from "@/features/cms/CategoryCard";
import { ProgrammesSection } from "@/features/cms/ProgrammesSection";
import { SECTIONS, localCategory, type SectionKey } from "@/features/cms/sections";
import { getCategories, getProgrammes } from "@/lib/cms";

type HubCopy = {
  eyebrow: string;
  title: string;
  standfirst: string;
  listTitle: string;
  listIntro: string;
};

/**
 * /experiences and /tours: the categories grid (CRM order, with the
 * hand-written categories' cards where they exist) and featured programmes.
 * If the CRM is down the hand-written categories still show.
 */
export async function SectionHub({ sectionKey, copy }: { sectionKey: SectionKey; copy: HubCopy }) {
  const cfg = SECTIONS[sectionKey];
  const [categories, featured] = await Promise.all([
    getCategories(cfg.section),
    getProgrammes({ section: cfg.section, featured: true, limit: 6 }),
  ]);

  const seen = new Set<string>();
  const cards = (categories ?? []).map((category) => {
    seen.add(category.slug);
    const local = localCategory(sectionKey, category.slug);
    return {
      key: category.slug,
      node: local ? <LeisureCard product={local} /> : <CategoryCard category={category} href={`/${cfg.segment}/${category.slug}`} />,
    };
  });
  // Hand-written categories always stay listed: their pages exist whatever the CRM says.
  for (const product of cfg.local) {
    if (!seen.has(product.slug)) cards.push({ key: product.slug, node: <LeisureCard product={product} /> });
  }

  return (
    <LeisureHub
      eyebrow={copy.eyebrow}
      title={copy.title}
      standfirst={copy.standfirst}
      imageKey={cfg.heroImage}
      path={`/${cfg.segment}`}
      label={cfg.label}
      listTitle={copy.listTitle}
      listIntro={copy.listIntro}
      cards={cards}
    >
      {featured && featured.items.length > 0 ? (
        <ProgrammesSection
          list={{ ...featured, totalPages: 1 }}
          path={`/${cfg.segment}`}
          id="featured"
          eyebrow="Featured"
          title={`Featured ${cfg.singular} programmes`}
          intro="Ready-to-sell itineraries, operated by our Marrakech team and costed at net rates for your clients."
        />
      ) : null}
    </LeisureHub>
  );
}
