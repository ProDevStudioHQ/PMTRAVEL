import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FloatingWhatsApp, SiteFooter } from "@/components/layout/SiteFooter";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/JsonLd";
import { NAV } from "@/lib/nav";
import { COMPANY, SITE_URL, whatsappLink } from "@/lib/company";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { en } from "@/i18n/dictionaries/en";

/** Headings: Fraunces, variable (one file covers 500–600, no optical-size axis to keep it small), self-hosted by next/font. */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

/** Body and UI: Inter, variable. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Morocco DMC for Travel Agencies & Tour Operators | PM Travel Agency",
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Marrakech-based Morocco DMC and ground handler for travel agencies, tour operators, advisors and MICE planners. Net rates, white-label, 24/7 support.",
  applicationName: COMPANY.name,
  openGraph: { type: "website", siteName: COMPANY.name, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0e1a2b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body id="top">
        <a href="#main" className="skip-link">
          {en.nav.skip}
        </a>
        <MotionProvider>
          <SiteHeader nav={NAV} />
          <main id="main">{children}</main>
          <SiteFooter />
          <FloatingWhatsApp href={whatsappLink()} />
          <CookieBanner />
        </MotionProvider>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
