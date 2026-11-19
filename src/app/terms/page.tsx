import { cmsPageMetadata } from "@/lib/page-seo";
import { LegalPage } from "@/components/templates/LegalPage";
import { COMPANY } from "@/lib/company";

export const generateMetadata = cmsPageMetadata({
  title: "Terms of Use",
  description:
    "Terms of use for the PM Travel Agency website. Proposals, bookings and services for trade partners are governed by the written terms in each confirmation.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms"
      updated="17 November 2026"
      intro={`These terms apply to your use of this website, operated by ${COMPANY.legalLine}.`}
      sections={[
        {
          heading: "Information on this site",
          paragraphs: [
            "Content on this site, including sample itineraries, describes the kind of programmes we operate. It is not an offer. Itineraries are illustrative and every programme is confirmed in a written proposal.",
          ],
        },
        {
          heading: "Proposals and bookings",
          paragraphs: [
            "Quotes, bookings, payment, cancellation and liability for travel services are governed exclusively by the written terms sent with each proposal and confirmation, agreed with each trade partner.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "Text and design on this site belong to us. Photographs are licensed from their owners and credited on our gallery page; they may not be reused without the owner's licence.",
          ],
        },
        {
          heading: "Links and availability",
          paragraphs: ["We link to third-party sites such as WhatsApp, Google Maps, Instagram and LinkedIn, which have their own terms. We aim to keep this site available but cannot guarantee uninterrupted access."],
        },
        {
          heading: "Contact",
          paragraphs: [`Questions about these terms: ${COMPANY.email.general}.`],
        },
      ]}
    />
  );
}
