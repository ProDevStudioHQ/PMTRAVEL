import { Suspense } from "react";
import { Clock, FileText, Mail, MessageCircle } from "lucide-react";
import { cmsPageMetadata } from "@/lib/page-seo";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RevealWords } from "@/components/PageHero";
import { QuoteForm, QuoteFormInner } from "@/components/forms/QuoteForm";
import { ButtonLink } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { WhatsappIcon } from "@/components/Icon";
import { COMPANY, RFQ_HREF, whatsappLink } from "@/lib/company";
import { PARTNER_PROCESS } from "@/content/b2b";

export const generateMetadata = cmsPageMetadata({
  title: "Request a B2B Quote | Morocco Net Rates",
  description:
    "Request a B2B quote for Morocco: send dates, pax, service level and destinations. Costed proposal at net rates within 24h for standard requests.",
  path: RFQ_HREF,
});

export default function RequestQuotePage() {
  return (
    <>
      <section className="on-dark surface-deep bg-midnight text-sand">
        <Container className="pt-28 pb-14 lg:pt-36 lg:pb-20">
          <Breadcrumbs trail={[{ href: RFQ_HREF, label: "Request a Quote" }]} onDark />
          <p className="eyebrow eyebrow-on-dark fade-up mt-10">For travel professionals</p>
          <h1 className="t-hero mt-4 max-w-4xl !text-[clamp(2.5rem,5vw,4.5rem)] text-sand">
            <RevealWords text="Request a B2B Quote" />
          </h1>
          <p className="fade-up delay-1 mt-6 max-w-2xl text-lg text-sand/80">
            Send your brief. We reply with a costed, day-by-day proposal at net rates — within 24 hours for standard requests. Sent to {COMPANY.email.b2b}.
          </p>
        </Container>
      </section>

      <section className="bg-sand">
        <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="rounded-card border border-line bg-ivory p-6 sm:p-10 lg:col-span-8">
            <Suspense fallback={<QuoteFormInner />}>
              <QuoteForm />
            </Suspense>
          </div>
          <aside className="space-y-6 lg:col-span-4" aria-label="What happens next">
            <div className="rounded-card border border-line bg-ivory p-8">
              <h2 className="font-display text-xl">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {PARTNER_PROCESS.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold font-display text-sm text-terracotta-700">{i + 1}</span>
                    <span>
                      <span className="block font-medium">{step.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{step.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="on-dark rounded-card bg-midnight p-8 text-sand">
              <h2 className="font-display text-xl">Prefer to talk?</h2>
              <ul className="mt-5 space-y-3 text-sm text-sand/80">
                <li className="flex gap-3">
                  <MessageCircle aria-hidden="true" size={18} className="text-gold" /> WhatsApp the ops desk: {COMPANY.phone.mobile.display}
                </li>
                <li className="flex gap-3">
                  <Mail aria-hidden="true" size={18} className="text-gold" />
                  <a href={`mailto:${COMPANY.email.b2b}`} className="underline decoration-gold underline-offset-4">
                    {COMPANY.email.b2b}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock aria-hidden="true" size={18} className="text-gold" /> Mon–Fri 9:00–18:00, Sat 9:00–13:00 ({COMPANY.timezone})
                </li>
                <li className="flex gap-3">
                  <FileText aria-hidden="true" size={18} className="text-gold" /> Net rates, written confirmations
                </li>
              </ul>
              <ButtonLink href={whatsappLink("Hello, I'd like to send a brief for a Morocco programme.")} variant="whatsapp" tone="dark" icon={<WhatsappIcon size={18} />} className="mt-6 w-full">
                WhatsApp the Ops Desk
              </ButtonLink>
            </div>
          </aside>
        </Container>
      </section>
      <CtaBand
        title="Rather talk it through first?"
        body="Call or message the operations desk, or visit the office in Marrakech. We are happy to shape the brief with you."
        primaryLabel="Contact the office"
        primaryHref="/contact"
      />
    </>
  );
}
