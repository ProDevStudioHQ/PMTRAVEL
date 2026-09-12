import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { COMPANY, SITE_URL } from "@/lib/nav";
import { imageByKey } from "@/features/images/registry";
import { IMAGE_SLOTS } from "@/features/images/keys";

/**
 * Display face for headings (SOP 2.2). Variable, so 600-700 costs one file.
 * next/font generates a metric-matched fallback, which keeps the swap from
 * shifting layout.
 */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

/** Body and UI. Only the two weights the SOP specifies. */
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex",
});

/**
 * Reserved for the Evidence component only, which always renders italic - so
 * only the italic face is downloaded. Loading the upright face as well cost
 * roughly 60KB for glyphs nothing on the site uses.
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  display: "swap",
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.name} | ${COMPANY.positioning}`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Morocco ground operations for travel trade. Transfers, guiding, hotels, groups, FIT and events, planned with verified operational data.",
  // No canonical and no og:url here: every page sets both from its own path
  // through pageMetadata(). Set here, they were inherited by every page and
  // pointed all of them at the home page.
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    locale: "en",
  },
  robots: { index: true, follow: true },
};

/**
 * Organization schema only. No Review, AggregateRating, Offer or Event - and
 * no telephone or legal identifier, because neither is confirmed.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: COMPANY.name,
  url: SITE_URL,
  email: COMPANY.email.b2b,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${COMPANY.address.line1}, ${COMPANY.address.district}`,
    addressLocality: COMPANY.address.city,
    postalCode: COMPANY.address.postalCode,
    addressCountry: "MA",
  },
  areaServed: { "@type": "Country", name: "Morocco" },
  availableLanguage: [...COMPANY.languages],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plex.variable} ${newsreader.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader overlayOnHome={Boolean(imageByKey(IMAGE_SLOTS.homeHero))} />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Static, developer-authored object. No user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
