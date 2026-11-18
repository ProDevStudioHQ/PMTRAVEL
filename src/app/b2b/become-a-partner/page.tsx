import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IconTile } from "@/components/cards";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PARTNER_FIELDS } from "@/components/forms/configs";
import { FaqSection } from "@/components/FaqSection";
import { PARTNER_BENEFITS } from "@/content/home";
import { COMPANY, PARTNER_HREF } from "@/lib/company";

export const metadata = pageMetadata({
  title: "Become a Partner | Morocco DMC Trade Account",
  description:
    "Become a PM Travel Agency partner: open a trade account for net Morocco rates, white-label service, fast quotes, fam trips and a dedicated ops contact.",
  path: PARTNER_HREF,
});

const PARTNER_FAQS = [
  { question: "Who can become a partner?", answer: "Travel agencies, tour operators, travel advisors, MICE and event agencies, and corporate travel buyers. We work only with the travel trade." },
  { question: "Do you organise fam trips and site inspections?", answer: "Yes. We organise fam trips and site inspections for partners so your team can see the hotels, camps and experiences before selling them." },
  { question: "What happens after I apply?", answer: "We review your application, contact you to understand your clients and markets, then share our partner terms and rates." },
];

export default function BecomeAPartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Become a Partner"
        title="Open a trade account with your Morocco ground partner"
        standfirst="Net rates, white-label service, fast proposals and one local team. Tell us about your business and we will share our partner terms."
        imageKey="d8-dmc-jemaa-el-fnaa-sunset"
        trail={[
          { href: "/b2b", label: "B2B & DMC" },
          { href: PARTNER_HREF, label: "Become a Partner" },
        ]}
      >
        <ButtonLink href="#apply" tone="dark" arrow>
          Apply now
        </ButtonLink>
      </PageHero>

      <Section tone="sand" aria-labelledby="benefits">
        <SectionHeading id="benefits" eyebrow="Partner benefits" title="What you get as a partner" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_BENEFITS.map((b, i) => (
            <Reveal as="li" key={b.title} delay={(i % 4) * 0.06}>
              <IconTile icon={b.icon} title={b.title} body={b.body} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="white" id="apply" aria-labelledby="apply-title" className="scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="apply-title" eyebrow="Partner application" title="Apply for a partner account">
              Tell us about your business. We reply by email from {COMPANY.email.b2b}.
            </SectionHeading>
          </div>
          <div className="rounded-3xl border border-line bg-sand p-6 sm:p-10 lg:col-span-8">
            <EnquiryForm
              kind="partner"
              fields={PARTNER_FIELDS}
              submitLabel="Send application"
              successTitle="Application received"
              successBody="Thank you. Our partnerships team will review it and contact you with our partner terms."
            />
          </div>
        </div>
      </Section>

      <FaqSection heading="Partnership questions" faqs={PARTNER_FAQS} />
    </>
  );
}
