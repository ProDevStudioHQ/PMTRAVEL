import type { Metadata } from "next";
import { COMPANY } from "@/lib/nav";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/about". Resolved against metadataBase. */
  path: string;
  /** Keep the page out of search results (internal pages only). */
  noindex?: boolean;
};

/**
 * Per-page metadata (SOP Phase 2).
 *
 * The canonical and og:url come from the same path, so they can never
 * disagree. The layout used to set og:url to the home page, and every page
 * inherited it. Next.js replaces the openGraph object per segment instead of
 * merging it, which is why the shared Open Graph fields are repeated here.
 *
 * `npm run verify:data` fails any page whose static metadata does not go
 * through this function.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: COMPANY.name,
      locale: "en",
      url: path,
      title,
      description,
      // Named explicitly: a page's openGraph object replaces the root one, so
      // the file-based src/app/opengraph-image.png never reached any page.
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${COMPANY.name}: ${COMPANY.positioning}. ${COMPANY.proofLine}`,
        },
      ],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
