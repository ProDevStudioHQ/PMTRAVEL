import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { InstagramIcon, LinkedinIcon, WhatsappIcon } from "@/components/Icon";
import { Logo } from "@/components/layout/Logo";
import { COMPANY, CREDENTIALS, addressOneLine, whatsappLink } from "@/lib/company";
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

/** One contact detail per card. */
function ContactCard({ icon, label, children, className = "" }: { icon: ReactNode; label: string; children: ReactNode; className?: string }) {
  return (
    <li className={"flex h-full gap-4 rounded-2xl border border-sand/10 bg-midnight-2 p-5 transition-colors hover:border-gold/40 " + className}>
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">{icon}</span>
      <div className="min-w-0">
        <h3 className="font-sans text-xs font-medium tracking-[0.18em] text-sand/60 uppercase">{label}</h3>
        <div className="mt-1.5 text-[0.9375rem] break-words text-sand">{children}</div>
      </div>
    </li>
  );
}

const linkClass = "underline-offset-4 hover:text-gold hover:underline";

export function SiteFooter() {
  const iconProps = { "aria-hidden": true, size: 20, strokeWidth: 1.5 } as const;

  return (
    <footer className="on-dark surface-deep border-t border-gold/20 bg-midnight text-sand">

      {/* Brand + link columns */}
      <Container className="grid gap-12 pt-16 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:pt-20">
        <div className="sm:col-span-2 lg:col-span-6">
          <Logo />
          <p className="mt-5 max-w-sm text-sm text-sand/70">{COMPANY.shortDescription}</p>
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
        <div className="lg:col-span-3">
          <Column title="B2B & DMC" links={FOOTER_B2B} />
        </div>
        <div className="lg:col-span-3">
          <Column title="Explore" links={FOOTER_EXPLORE} />
        </div>
      </Container>


      <Container>
        <hr className="gold-rule opacity-40" />
      </Container>

      {/* Contact cards */}
      <Container className="pt-12 pb-14">
        <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-gold uppercase">Contact</h2>
        <address className="not-italic">
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ContactCard icon={<MapPin {...iconProps} />} label="Office">
              <p>{addressOneLine}</p>
              <a href={COMPANY.mapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-1 inline-block text-sm text-gold ${linkClass}`}>
                Open in Google Maps
              </a>
            </ContactCard>
            <ContactCard icon={<Phone {...iconProps} />} label={COMPANY.phone.mobile.label}>
              <a href={`tel:${COMPANY.phone.mobile.tel}`} className={linkClass}>
                {COMPANY.phone.mobile.display}
              </a>
            </ContactCard>
            <ContactCard icon={<WhatsappIcon size={20} />} label="WhatsApp">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Chat with our ops desk
              </a>
            </ContactCard>
            <ContactCard icon={<Phone {...iconProps} />} label={COMPANY.phone.landline.label}>
              <a href={`tel:${COMPANY.phone.landline.tel}`} className={linkClass}>
                {COMPANY.phone.landline.display}
              </a>
            </ContactCard>
            <ContactCard icon={<Mail {...iconProps} />} label="B2B / Travel trade">
              <a href={`mailto:${COMPANY.email.b2b}`} className={linkClass}>
                {COMPANY.email.b2b}
              </a>
            </ContactCard>
            <ContactCard icon={<Mail {...iconProps} />} label="General">
              <a href={`mailto:${COMPANY.email.general}`} className={linkClass}>
                {COMPANY.email.general}
              </a>
            </ContactCard>
            <ContactCard icon={<Clock {...iconProps} />} label="Opening hours" className="sm:col-span-2 lg:col-span-3">
              <dl className="flex flex-col gap-x-10 gap-y-1 text-sm sm:flex-row sm:flex-wrap">
                {COMPANY.hours.map((h) => (
                  <div key={h.days} className="flex gap-2 whitespace-nowrap">
                    <dt className="text-sand/60">{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </ContactCard>
          </ul>
        </address>
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
