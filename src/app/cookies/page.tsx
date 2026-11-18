import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/templates/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "Cookie policy for the PM Travel Agency website: no advertising or tracking cookies, one local setting to remember your choice, Google Maps only after consent.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      path="/cookies"
      updated="17 November 2026"
      intro="We keep cookies to a minimum. This page explains exactly what this website stores in your browser."
      sections={[
        {
          heading: "What we use",
          paragraphs: ["This site sets no advertising, analytics or tracking cookies."],
          list: [
            "pm-cookie-consent (local storage): remembers whether you chose “Accept” or “Essential only”, so we don't ask again.",
          ],
        },
        {
          heading: "Third-party content",
          paragraphs: [
            "The Google Map on our contact page is loaded from Google, which may set its own cookies. It loads only if you accept cookies or click “Show map”. Links to WhatsApp, Instagram and LinkedIn take you to those services, which have their own cookie policies.",
          ],
        },
        {
          heading: "Changing your choice",
          paragraphs: ["Clear this site's data in your browser settings and the cookie notice will appear again."],
        },
        {
          heading: "Contact",
          paragraphs: [`Questions: ${COMPANY.email.general}.`],
        },
      ]}
    />
  );
}
