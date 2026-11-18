import Link from "next/link";
import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { InstagramIcon, LinkedinIcon, WhatsappIcon } from "@/components/Icon";
import { Logo } from "@/components/layout/Logo";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { NEWSLETTER_FIELDS } from "@/components/forms/configs";
import { COMPANY, CREDENTIALS, RFQ_HREF, addressOneLine } from "@/lib/company";
import { FOOTER_B2B, FOOTER_EXPLORE, LEGAL_LINKS } from "@/lib/nav";
import { en } from "@/i18n/dictionaries/en";

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-gold uppercase">{title}</h2>
      <ul className="mt-5 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex min-h-9 items-center text-[0.9375rem] text-sand/75 transition-colors hover:text-sand">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="on-dark surface-deep bg-midnight text-sand">
      {/* Top band */}
      <Container className="grid gap-12 pt-20 pb-14 lg:grid-cols-12 lg:pt-28">
        <div className="lg:col-span-7">
          <p className="t-h2 max-w-[16ch] text-sand">{en.footer.tagline}</p>
          <ButtonLink href={RFQ_HREF} tone="dark" arrow className="mt-8">
            {en.cta.b2bQuote}
          </ButtonLink>
        </div>
        <div className="lg:col-span-5">
          <h2 className="font-display text-xl text-sand">{en.footer.newsletterTitle}</h2>
          <p className="mt-2 text-sm text-sand/70">{en.footer.newsletterBody}</p>
          <div className="mt-5">
            <EnquiryForm
              kind="newsletter"
              idPrefix="footer-newsletter"
              fields={NEWSLETTER_FIELDS}
              submitLabel="Subscribe"
              successTitle="You're on the list"
              successBody="We'll send trade news a few times a year. Unsubscribe any time."
              compact
              onDark
              footnote={false}
            />
          </div>
        </div>
      </Container>

      <Container>
        <hr className="gold-rule opacity-40" />
      </Container>

      {/* Columns */}
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-sand/70">{COMPANY.shortDescription}</p>
          <ul className="mt-6 flex gap-3" aria-label="Social media">
            <li>
              <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer" className="grid size-11 place-items-center rounded-full border border-sand/20 text-sand/80 transition-colors hover:border-gold hover:text-gold">
                <InstagramIcon />
                <span className="sr-only">Instagram</span>
              </a>
            </li>
            <li>
              <a href={COMPANY.social.linkedin} target="_blank" rel="noopener noreferrer" className="grid size-11 place-items-center rounded-full border border-sand/20 text-sand/80 transition-colors hover:border-gold hover:text-gold">
                <LinkedinIcon />
                <span className="sr-only">LinkedIn</span>
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs text-sand/55">
            Licence no.: {CREDENTIALS.licenceNumber ?? <span className="text-gold/80">[Add licence number]</span>}
          </p>
        </div>
        <div className="lg:col-span-2">
          <Column title="B2B & DMC" links={FOOTER_B2B} />
        </div>
        <div className="lg:col-span-2">
          <Column title="Explore" links={FOOTER_EXPLORE} />
        </div>
        <div className="sm:col-span-2 lg:col-span-4">
          <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-gold uppercase">Contact</h2>
          <address className="mt-5 space-y-4 text-[0.9375rem] text-sand/80 not-italic">
            <p className="flex gap-3">
              <MapPin aria-hidden="true" size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" />
              <span>
                {addressOneLine}
                <br />
                <a href={COMPANY.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-sand underline decoration-gold underline-offset-4 hover:text-gold">
                  Open in Google Maps
                </a>
              </span>
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden="true" size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" />
              <span>
                Phone / WhatsApp:{" "}
                <a href={`tel:${COMPANY.phone.mobile.tel}`} className="hover:text-sand">
                  {COMPANY.phone.mobile.display}
                </a>
                <br />
                Landline:{" "}
                <a href={`tel:${COMPANY.phone.landline.tel}`} className="hover:text-sand">
                  {COMPANY.phone.landline.display}
                </a>
              </span>
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden="true" size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" />
              <span>
                B2B / Travel trade:{" "}
                <a href={`mailto:${COMPANY.email.b2b}`} className="hover:text-sand">
                  {COMPANY.email.b2b}
                </a>
                <br />
                General:{" "}
                <a href={`mailto:${COMPANY.email.general}`} className="hover:text-sand">
                  {COMPANY.email.general}
                </a>
              </span>
            </p>
            <div className="flex gap-3">
              <Clock aria-hidden="true" size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" />
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 text-sm">
                {COMPANY.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="text-sand/60">{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </address>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-sand/10">
        <Container className="flex flex-col gap-4 py-6 text-[0.8125rem] text-sand/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© 2026 {COMPANY.name}</span>
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex min-h-9 items-center hover:text-sand">
                {link.label}
              </Link>
            ))}
          </div>
          <a href="#top" className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-sand/20 px-4 hover:border-gold hover:text-sand sm:self-auto">
            <ArrowUp aria-hidden="true" size={16} />
            {en.nav.backToTop}
          </a>
        </Container>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-overlay transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsappIcon size={28} />
      <span className="sr-only">Chat with our ops desk on WhatsApp</span>
    </a>
  );
}
