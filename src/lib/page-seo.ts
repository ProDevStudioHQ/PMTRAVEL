/**
 * Page metadata with the CRM's search snippet applied (Website → Pages).
 *
 * Pages keep their own title and description in code (checked by
 * verify:data); a title or description set in the CRM for the same path
 * replaces it. Canonical, og:url and hreflang still come from the path, so
 * they can never disagree.
 */
import "server-only";
import type { Metadata } from "next";
import { getPageOverride } from "@/lib/cms";
import { pageMetadata } from "@/lib/metadata";

type Input = Parameters<typeof pageMetadata>[0];

/** pageMetadata() with the CRM override for `input.path`. */
export async function seoFor(input: Input): Promise<Metadata> {
  const o = await getPageOverride(input.path);
  if (!o?.seoTitle && !o?.seoDescription) return pageMetadata(input);
  return pageMetadata({
    ...input,
    title: o.seoTitle?.trim() || input.title,
    description: o.seoDescription?.trim() || input.description,
  });
}

/** For `export const generateMetadata = cmsPageMetadata({...})` on static pages. */
export const cmsPageMetadata = (input: Input) => () => seoFor(input);
