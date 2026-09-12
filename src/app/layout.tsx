import type { Metadata } from "next";
import { Schibsted_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { COMPANY, SITE_URL } from "@/lib/nav";
import { imageByKey } from "@/features/images/registry";
import { IMAGE_SLOTS } from "@/features/images/keys";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  // Only the weights the design system actually uses.
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-schibsted",
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    locale: "en",
    url: SITE_URL,
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
    <html lang="en" className={`${schibsted.variable} ${newsreader.variable}`}>
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
