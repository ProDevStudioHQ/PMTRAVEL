import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { CONTACT_FIELDS } from "@/components/forms/configs";
import { MapEmbed } from "@/components/MapEmbed";
import { WhatsappIcon } from "@/components/Icon";
import { COMPANY, RFQ_HREF, addressOneLine, whatsappLink } from "@/lib/company";
import { en } from "@/i18n/dictionaries/en";

export const metadata = pageMetadata({
  title: "Contact Our Marrakech Office",
  description:
    "Contact PM Travel Agency in Marrakech: phone and WhatsApp +212 762 455 472, b2b@pm-travelagency.com, office on Rue Ibn Battouta. Mon–Fri 9–18, Sat 9–13.",
  path: "/contact",
});

function Detail({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-line py-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/60 text-terracotta">{icon}</span>
      <div>
        <h3 className="text-xs font-medium tracking-[0.2em] text-muted uppercase">{title}</h3>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our Marrakech team"
        standfirst="Travel professionals: for quotes, use the B2B form or WhatsApp the ops desk. For everything else, write to us below."
        imageKey="b1-marrakech-hero"
        trail={[{ href: "/contact", label: "Contact" }]}
      >
        <ButtonLink href={RFQ_HREF} tone="dark" arrow>
          {en.cta.b2bQuote}
        </ButtonLink>
        <ButtonLink href={whatsappLink()} variant="whatsapp" tone="dark" icon={<WhatsappIcon size={18} />}>
          {en.cta.whatsappOps}
        </ButtonLink>
      </PageHero>

      <Section tone="sand" aria-labelledby="details">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="details" eyebrow="Office" title="Contact details" />
            <address className="mt-8 border-t border-line not-italic">
              <Detail icon={<MapPin aria-hidden="true" size={20} strokeWidth={1.5} />} title="Office">
                <p>{addressOneLine}</p>
                <a href={COMPANY.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center text-sm text-terracotta-700 underline underline-offset-4">
                  Open in Google Maps
                </a>
              </Detail>
              <Detail icon={<Phone aria-hidden="true" size={20} strokeWidth={1.5} />} title={COMPANY.phone.mobile.label}>
                <p>
                  <a href={`tel:${COMPANY.phone.mobile.tel}`} className="hover:text-terracotta-700">
                    {COMPANY.phone.mobile.display}
                  </a>{" "}
                  ·{" "}
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-terracotta-700 underline underline-offset-4">
                    WhatsApp
                  </a>
                </p>
                <p className="mt-1">
                  {COMPANY.phone.landline.label}:{" "}
                  <a href={`tel:${COMPANY.phone.landline.tel}`} className="hover:text-terracotta-700">
                    {COMPANY.phone.landline.display}
                  </a>
                </p>
              </Detail>
              <Detail icon={<Mail aria-hidden="true" size={20} strokeWidth={1.5} />} title="Email">
                <p>
                  B2B / Travel trade:{" "}
                  <a href={`mailto:${COMPANY.email.b2b}`} className="text-terracotta-700 underline underline-offset-4">
                    {COMPANY.email.b2b}
                  </a>
                </p>
                <p className="mt-1">
                  General:{" "}
                  <a href={`mailto:${COMPANY.email.general}`} className="text-terracotta-700 underline underline-offset-4">
                    {COMPANY.email.general}
                  </a>
                </p>
              </Detail>
              <Detail icon={<Clock aria-hidden="true" size={20} strokeWidth={1.5} />} title={`Hours · ${COMPANY.timezone}`}>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                  {COMPANY.hours.map((h) => (
                    <div key={h.days} className="contents">
                      <dt className="text-muted">{h.days}</dt>
                      <dd>{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </Detail>
            </address>
          </div>
          <div className="lg:col-span-7">
            <MapEmbed />
          </div>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="write">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="write" eyebrow="Write to us" title="Send a message">
              We reply from {COMPANY.email.general}. For a costed programme, the B2B quote form is faster.
            </SectionHeading>
          </div>
          <div className="rounded-card border border-line bg-sand p-6 sm:p-10 lg:col-span-8">
            <EnquiryForm
              kind="contact"
              fields={CONTACT_FIELDS}
              submitLabel="Send message"
              successTitle="Message sent"
              successBody="Thank you. A member of our team will reply by email."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
