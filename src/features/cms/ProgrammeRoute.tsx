import { draftMode } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ProgrammePage } from "@/features/cms/ProgrammePage";
import { Unavailable } from "@/features/cms/Unavailable";
import { programmeHref } from "@/features/cms/format";
import { SECTIONS, type SectionKey } from "@/features/cms/sections";
import { getProgramme, getSitemap } from "@/lib/cms";
import { pageMetadata } from "@/lib/metadata";

/** Thrown at runtime when the CRM is down and nothing is cached; caught by the segment's error.tsx. */
export class ProgrammeUnavailableError extends Error {
  constructor() {
    super("Programme temporarily unavailable: the CRM could not be reached");
    this.name = "ProgrammeUnavailableError";
  }
}

const isPreview = async () => {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false; // outside a request (build-time params/metadata)
  }
};

/** Every published programme of this section, from the CRM sitemap. New ones render on first request. */
export async function programmeStaticParams(sectionKey: SectionKey) {
  const segment = SECTIONS[sectionKey].segment;
  return ((await getSitemap()) ?? []).flatMap((entry) => {
    const [, s, category, slug, extra] = entry.path.split("/");
    return s === segment && category && slug && !extra ? [{ category, slug }] : [];
  });
}

const clip = (text: string, max: number) => (text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`);

export async function programmeMetadata(sectionKey: SectionKey, slug: string): Promise<Metadata> {
  const preview = await isPreview();
  const result = await getProgramme(SECTIONS[sectionKey].section, slug, { preview });
  if (result.kind !== "ok") return {};
  const p = result.programme;
  return pageMetadata({
    title: clip(p.seo.title ?? p.title, 60),
    description: clip(p.seo.description ?? p.shortDescription, 155),
    path: programmeHref(p),
    noindex: preview,
  });
}

/** Fetches the programme and handles redirect, 404, preview and CRM outages. */
export async function ProgrammeRoute({ sectionKey, category, slug }: { sectionKey: SectionKey; category: string; slug: string }) {
  const preview = await isPreview();
  const result = await getProgramme(SECTIONS[sectionKey].section, slug, { preview });

  if (result.kind === "redirect") permanentRedirect(result.to);
  if (result.kind === "not_found") notFound();
  if (result.kind === "unavailable") {
    // At build time, render the friendly block (it is replaced at the next revalidation).
    // At runtime, throw: an error is never cached, so the next visit tries the CRM again,
    // and error.tsx shows the same friendly block with a WhatsApp button.
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return (
        <Section tone="sand" className="pt-28">
          <Unavailable what="This programme" />
        </Section>
      );
    }
    throw new ProgrammeUnavailableError();
  }

  const programme = result.programme;
  // Wrong category or section in the URL: send to the programme's real address.
  const canonical = programmeHref(programme);
  if (programme.section !== SECTIONS[sectionKey].section || programme.category.slug !== category) {
    if (preview) redirect(canonical);
    permanentRedirect(canonical);
  }

  return <ProgrammePage sectionKey={sectionKey} programme={programme} />;
}
