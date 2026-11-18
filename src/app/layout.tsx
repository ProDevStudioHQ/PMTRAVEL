import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FloatingWhatsApp, SiteFooter } from "@/components/layout/SiteFooter";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { GoogleTranslate } from "@/components/layout/GoogleTranslate";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/CtaBand";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { draftMode } from "next/headers";
import { getSite } from "@/lib/cms";
import { siteContact, toNavButtons, toNavEntries } from "@/lib/site-layout";
import { COMPANY, SITE_URL } from "@/lib/company";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { en } from "@/i18n/dictionaries/en";

/** Titles: Cormorant Garamond 500–600, plus italic for the one highlighted word per title. Self-hosted by next/font. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

/** Body and UI: Inter, variable. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Safety net: every page is regenerated at least hourly even if a CRM webhook
 * (POST /api/revalidate) is missed. Pages with fresher data revalidate sooner.
 */
export const revalidate = 3600;

/** Defaults for pages without their own metadata; the values are edited in the CRM (settings.seo). */
export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSite();
  const og = settings.seo.ogImage;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: settings.seo.title || "Morocco DMC for Travel Agencies & Tour Operators | PM Travel Agency",
      // The suffix rule in pageMetadata() and verify:data is measured against COMPANY.name.
      template: `%s | ${COMPANY.name}`,
    },
    description:
      settings.seo.description ||
      "Marrakech-based Morocco DMC and ground handler for travel agencies, tour operators, advisors and MICE planners. Net rates, white-label, 24/7 support.",
    applicationName: settings.siteName,
    openGraph: {
      type: "website",
      siteName: settings.siteName,
      locale: "en_GB",
      ...(og ? { images: [{ url: og.url, width: og.width || undefined, height: og.height || undefined, alt: og.alt }] } : {}),
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#14213d",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  const contact = siteContact(site);
  const { isEnabled: preview } = await draftMode();
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body id="top">
        <a href="#main" className="skip-link">
          {en.nav.skip}
        </a>
        {preview ? <PreviewBanner /> : null}
        <MotionProvider>
          <SiteHeader nav={toNavEntries(site.nav.items)} buttons={toNavButtons(site.nav.buttons)} topBar={site.topBar} contact={contact} />
          <main id="main">{children}</main>
          {/* Default closing band; hidden by CSS when the page renders its own. */}
          <div className="site-cta">
            <CtaBand />
          </div>
          <SiteFooter site={site} />
          <FloatingWhatsApp href={contact.whatsappHref} />
          <CookieBanner />
          <GoogleTranslate />
        </MotionProvider>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
