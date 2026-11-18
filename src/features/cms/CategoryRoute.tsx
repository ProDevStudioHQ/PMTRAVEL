import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { LeisurePage } from "@/components/templates/LeisurePage";
import { CmsImage } from "@/features/cms/CmsImage";
import { ProgrammesSection } from "@/features/cms/ProgrammesSection";
import { pageHref } from "@/features/cms/Pagination";
import { Unavailable } from "@/features/cms/Unavailable";
import { PAGE_SIZE, SECTIONS, localCategory, type SectionKey } from "@/features/cms/sections";
import { Section } from "@/components/Section";
import { getCategories, getProgrammes, getSitemap } from "@/lib/cms";
import { pageMetadata } from "@/lib/metadata";
import { RFQ_HREF } from "@/lib/company";
import { en } from "@/i18n/dictionaries/en";
import type { Category } from "@/types/cms";

/** Hand-written categories plus every category the CRM sitemap lists for this section. */
export async function categoryStaticParams(sectionKey: SectionKey) {
  const cfg = SECTIONS[sectionKey];
  const slugs = new Set(cfg.local.map((p) => p.slug));
  for (const entry of (await getSitemap()) ?? []) {
    const [, segment, category, slug] = entry.path.split("/");
    if (segment === cfg.segment && category && !slug) slugs.add(category);
  }
  return [...slugs].map((category) => ({ category }));
}

const clip = (text: string, max: number) => (text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`);

export async function categoryMetadata(sectionKey: SectionKey, slug: string, page: number): Promise<Metadata> {
  const cfg = SECTIONS[sectionKey];
  const base = `/${cfg.segment}/${slug}`;
  const path = pageHref(base, page);
  const suffix = page > 1 ? ` (page ${page})` : "";
  const local = localCategory(sectionKey, slug);
  if (local) return pageMetadata({ title: `${local.seoTitle}${suffix}`, description: local.seoDescription, path });
  const category = (await getCategories(cfg.section))?.find((c) => c.slug === slug);
  if (!category) return {};
  return pageMetadata({
    title: clip(`${category.seo.title ?? `${category.name} ${cfg.label} in Morocco`}${suffix}`, 60),
    description: clip(
      category.seo.description ??
        category.description ??
        `${category.name} ${cfg.label.toLowerCase()} in Morocco for travel professionals: ready-to-sell programmes operated by our Marrakech DMC team at net rates.`,
      155
    ),
    path,
  });
}

/** /experiences/[category] and /tours/[category]. */
export async function CategoryRoute({ sectionKey, slug, page }: { sectionKey: SectionKey; slug: string; page: number }) {
  const cfg = SECTIONS[sectionKey];
  const base = `/${cfg.segment}/${slug}`;
  const local = localCategory(sectionKey, slug);
  const [categories, list] = await Promise.all([
    getCategories(cfg.section),
    getProgrammes({ section: cfg.section, category: slug, page, limit: PAGE_SIZE }),
  ]);
  const category = categories?.find((c) => c.slug === slug) ?? null;

  // A real "no such category": only when the CRM answered and nothing local matches.
  if (!local && !category && categories !== null) notFound();
  if (list && page > 1 && page > list.totalPages) notFound();

  const name = local?.name ?? category?.name ?? "Programmes";
  const programmes = (
    <ProgrammesSection
      list={list}
      path={base}
      id="programmes"
      eyebrow={`${name} programmes`}
      title={local ? `Ready-to-sell ${name.toLowerCase()} programmes` : `${name} programmes`}
      intro="Itineraries you can sell under your own brand. Open one for the day-by-day plan, inclusions and the programme PDF."
      tone={local ? "white" : "sand"}
      empty={
        local ? undefined : (
          <p className="max-w-2xl text-muted">New programmes for this category are being prepared. Tell us what your clients need and we will build it for you.</p>
        )
      }
    />
  );

  // Page 1 of a hand-written category: the full written page with the CRM grid inside it.
  if (local && page === 1) return <LeisurePage product={local} cmsProgrammes={programmes} />;

  return (
    <CmsCategoryPage sectionKey={sectionKey} category={category} name={name} page={page} unavailable={!local && !category}>
      {programmes}
    </CmsCategoryPage>
  );
}

function CmsCategoryPage({
  sectionKey,
  category,
  name,
  page,
  unavailable,
  children,
}: {
  sectionKey: SectionKey;
  category: Category | null;
  name: string;
  page: number;
  unavailable: boolean;
  children: React.ReactNode;
}) {
  const cfg = SECTIONS[sectionKey];
  const base = `/${cfg.segment}/${category?.slug ?? ""}`;
  return (
    <>
      <PageHero
        eyebrow={cfg.label}
        title={page > 1 ? `${name}: page ${page}` : name}
        standfirst={category?.description ?? undefined}
        imageKey={cfg.heroImage}
        media={category?.cover ? <CmsImage image={category.cover} fill priority sizes="100vw" className="object-cover" /> : undefined}
        trail={[{ href: `/${cfg.segment}`, label: cfg.label }, ...(category ? [{ href: base, label: category.name }] : [])]}
      >
        <ButtonLink href={RFQ_HREF} tone="dark" arrow>
          {en.cta.b2bQuote}
        </ButtonLink>
      </PageHero>
      {unavailable ? (
        <Section tone="sand">
          <Unavailable what="This category" />
        </Section>
      ) : (
        children
      )}
      <CtaBand
        title={`Request ${name.toLowerCase()} for your clients.`}
        body="Send dates, pax and service level. We reply with a costed, day-by-day proposal at net rates."
        primaryLabel={en.cta.requestThis}
        primaryHref={`${RFQ_HREF}?product=${encodeURIComponent(name)}`}
        whatsappMessage={`Hello, I'd like a quote for ${name} in Morocco.`}
      />
    </>
  );
}
