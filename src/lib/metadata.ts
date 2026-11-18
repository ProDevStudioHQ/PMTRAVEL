import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { hreflangAlternates } from "@/i18n/config";

export const TITLE_MAX = 60;

type PageMetadataInput = {
  /** Without the brand suffix; the root template appends " | PM Travel Agency". */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/b2b/tour-operators". */
  path: string;
  noindex?: boolean;
  /** Set on the home page, which renders its own full title. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Per-page metadata. Canonical, og:url and hreflang come from the same path,
 * so they can never disagree. The Open Graph image is file-based: every route
 * segment has an opengraph-image.tsx (1200x630) built from its hero photo.
 *
 * `npm run verify:data` fails any page whose static metadata does not go
 * through this function.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  absoluteTitle = false,
  type = "website",
  publishedTime,
}: PageMetadataInput): Metadata {
  // The brand suffix is appended only while the rendered title stays within
  // 60 characters; longer keyword titles stand alone (scripts/verify-data.mjs
  // applies the same rule).
  const branded = `${title} | ${COMPANY.name}`;
  const useBrand = !absoluteTitle && branded.length <= TITLE_MAX;
  const fullTitle = useBrand ? branded : title;
  return {
    title: useBrand ? title : { absolute: title },
    description,
    alternates: { canonical: path, languages: hreflangAlternates(path) },
    openGraph: {
      type,
      siteName: COMPANY.name,
      locale: "en_GB",
      url: path,
      title: fullTitle,
      description,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
