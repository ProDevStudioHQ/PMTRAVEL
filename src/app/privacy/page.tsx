import { cmsPageMetadata } from "@/lib/page-seo";
import { LegalPage } from "@/components/templates/LegalPage";
import { COMPANY, addressOneLine } from "@/lib/company";

export const generateMetadata = cmsPageMetadata({
  title: "Privacy Policy",
  description:
    "How PM Travel Agency collects and uses personal data sent through this website: quote requests, partner applications, contact messages and newsletter sign-ups.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated="17 November 2026"
      intro={`This policy explains what personal data ${COMPANY.legalLine} ("we") collects through this website, why, and what you can ask us to do with it.`}
      sections={[
        {
          heading: "Who we are",
          paragraphs: [`${COMPANY.legalLine}, ${addressOneLine}. Contact for privacy questions: ${COMPANY.email.general}.`],
        },
        {
          heading: "What we collect",
          paragraphs: ["Only what you type into our forms:"],
          list: [
            "Quote requests: agency name, contact name, email, WhatsApp number, travel dates, number of travellers, service level, destinations, budget and notes.",
            "Partner applications: company details, website, optional licence number, contact details, markets and annual volume estimate.",
            "Contact messages and newsletter sign-ups: name, company, email, phone and your message.",
            "For security and rate limiting, a one-way salted hash of your IP address (never the address itself) and your browser's user-agent string.",
          ],
        },
        {
          heading: "Why we use it",
          paragraphs: [
            "To answer your enquiry, prepare proposals, manage our relationship with trade partners, send the trade newsletter you asked for, and protect the site from abuse. We do not sell personal data and do not use it for advertising.",
          ],
        },
        {
          heading: "Where it goes",
          paragraphs: [
            "Submissions are stored in our database and emailed to our team. Our email and hosting providers process this data on our behalf. If you open the Google Map on our contact page, or choose a language other than English (pages are machine-translated by Google Translate), Google receives data, including the page text, under its own privacy policy.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: ["We keep enquiry data for as long as needed to handle your request and our business relationship, then delete it. Ask us at any time to delete your data."],
        },
        {
          heading: "Your rights",
          paragraphs: [
            `You can ask to access, correct or delete your personal data, or object to its use, by writing to ${COMPANY.email.general}. You can unsubscribe from the newsletter at any time. You may also complain to the Moroccan data protection authority (CNDP) or, in the EU/UK, to your local supervisory authority.`,
          ],
        },
      ]}
    />
  );
}
