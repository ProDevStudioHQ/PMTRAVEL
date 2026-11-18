import type { ReactNode } from "react";
import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  PinterestIcon,
  TiktokIcon,
  WhatsappIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/Icon";
import { Logo } from "@/components/layout/Logo";
import { NavAnchor } from "@/components/layout/NavAnchor";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { NEWSLETTER_FIELDS } from "@/components/forms/configs";
import { CREDENTIALS } from "@/lib/company";
import { safeHref, siteContact, splitHours } from "@/lib/site-layout";
import { en } from "@/i18n/dictionaries/en";
import type { Link as CmsLink, SitePayload, SocialLink } from "@/types/cms";

/** Footer links that survive the URL check. */
const usable = (links: CmsLink[]) =>
  links.flatMap((l) => {
    const href = safeHref(l.url);
    return href ? [{ href, label: l.label, newTab: l.openInNewTab }] : [];
  });

function Column({ title, links }: { title: string; links: CmsLink[] }) {
  return (
    <div>
      <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-gold uppercase">{title}</h2>
      <ul className="mt-5 space-y-1">
        {usable(links).map((link) => (
          <li key={link.href + link.label}>
            <NavAnchor href={link.href} newTab={link.newTab} className="inline-flex min-h-9 items-center text-[0.9375rem] text-sand/75 transition-colors hover:text-sand">
              {link.label}
            </NavAnchor>
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

const SOCIAL: Record<SocialLink["platform"], { name: string; icon: ReactNode; className: string }> = {
  INSTAGRAM: { name: "Instagram", icon: <InstagramIcon size={22} />, className: "bg-instagram" },
  LINKEDIN: { name: "LinkedIn", icon: <LinkedinIcon size={20} />, className: "bg-linkedin" },
  FACEBOOK: { name: "Facebook", icon: <FacebookIcon size={20} />, className: "bg-majorelle" },
  YOUTUBE: { name: "YouTube", icon: <YoutubeIcon size={22} />, className: "bg-terracotta" },
  TIKTOK: { name: "TikTok", icon: <TiktokIcon size={20} />, className: "bg-ink" },
  PINTEREST: { name: "Pinterest", icon: <PinterestIcon size={20} />, className: "bg-terracotta-700" },
  X: { name: "X", icon: <XIcon size={18} />, className: "bg-ink" },
};

const linkClass = "underline-offset-4 hover:text-gold hover:underline";

export function SiteFooter({ site }: { site: SitePayload }) {
  const { footer, settings } = site;
  const contact = siteContact(site);
  const mapsHref = footer.showMap ? safeHref(settings.googleMapsUrl) : null;
  const socials = footer.socials.flatMap((s) => {
    const href = safeHref(s.url);
    return href ? [{ ...s, href }] : [];
  });
  const iconProps = { "aria-hidden": true, size: 20, strokeWidth: 1.5 } as const;
  const columnGrid = footer.columns.length >= 4 ? "lg:grid-cols-4" : footer.columns.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <footer className="on-dark surface-deep zellige-bg border-t border-gold/20 bg-midnight text-sand">
      {/* Brand + link columns */}
      <Container className="grid gap-12 pt-16 pb-12 lg:grid-cols-12 lg:pt-20">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm text-sand/70">{footer.aboutText}</p>
          {socials.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-3" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.platform + s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`grid size-11 place-items-center rounded-full text-white shadow-raised transition-transform hover:scale-110 ${SOCIAL[s.platform].className}`}
                  >
                    {SOCIAL[s.platform].icon}
                    <span className="sr-only">{SOCIAL[s.platform].name}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-6 text-xs text-sand/55">
            Licence no.: {CREDENTIALS.licenceNumber ?? <span className="text-gold/80">[Add licence number]</span>}
          </p>
        </div>
        <div className={`grid gap-10 sm:grid-cols-2 lg:col-span-8 ${columnGrid}`}>
          {footer.columns.map((column) => (
            <Column key={column.id} title={column.title} links={column.links} />
          ))}
        </div>
      </Container>

      {footer.newsletter.enabled ? (
        <Container className="pb-12">
          <div className="grid gap-6 rounded-card border border-sand/10 bg-midnight-2 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl text-sand">Trade newsletter</h2>
              {footer.newsletter.text ? <p className="mt-2 text-sm text-sand/70">{footer.newsletter.text}</p> : null}
            </div>
            <div className="lg:col-span-7">
              <EnquiryForm
                kind="newsletter"
                fields={NEWSLETTER_FIELDS}
                submitLabel="Subscribe"
                successTitle="You're subscribed"
                successBody="Thank you. The next trade update will reach your inbox."
                idPrefix="footer-newsletter"
                compact
                onDark
              />
            </div>
          </div>
        </Container>
      ) : null}

      {footer.showContactBlock ? (
        <>
          <Container>
            <hr className="gold-rule opacity-40" />
          </Container>

          {/* Contact cards */}
          <Container className="pt-12 pb-14">
            <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-gold uppercase">Contact</h2>
            <address className="notranslate not-italic" translate="no">
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ContactCard icon={<MapPin {...iconProps} />} label="Office">
                  <p>{settings.address}</p>
                  {mapsHref ? (
                    <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={`mt-1 inline-block text-sm text-gold ${linkClass}`}>
                      Open in Google Maps
                    </a>
                  ) : null}
                </ContactCard>
                {contact.mobileDisplay ? (
                  <ContactCard icon={<Phone {...iconProps} />} label="Mobile / WhatsApp">
                    <a href={contact.mobileHref} className={linkClass}>
                      {contact.mobileDisplay}
                    </a>
                  </ContactCard>
                ) : null}
                <ContactCard icon={<WhatsappIcon size={20} />} label="WhatsApp">
                  <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Chat with our ops desk
                  </a>
                </ContactCard>
                {contact.landlineDisplay ? (
                  <ContactCard icon={<Phone {...iconProps} />} label="Landline">
                    <a href={contact.landlineHref} className={linkClass}>
                      {contact.landlineDisplay}
                    </a>
                  </ContactCard>
                ) : null}
                <ContactCard icon={<Mail {...iconProps} />} label="B2B / Travel trade">
                  <a href={`mailto:${contact.emailB2b}`} className={linkClass}>
                    {contact.emailB2b}
                  </a>
                </ContactCard>
                <ContactCard icon={<Mail {...iconProps} />} label="General">
                  <a href={`mailto:${contact.emailContact}`} className={linkClass}>
                    {contact.emailContact}
                  </a>
                </ContactCard>
                {settings.openingHours ? (
                  <ContactCard icon={<Clock {...iconProps} />} label="Opening hours" className="sm:col-span-2 lg:col-span-3">
                    <ul className="flex flex-col gap-x-10 gap-y-1 text-sm sm:flex-row sm:flex-wrap">
                      {splitHours(settings.openingHours).map((line) => (
                        <li key={line} className="whitespace-nowrap">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </ContactCard>
                ) : null}
              </ul>
            </address>
          </Container>
        </>
      ) : null}

      {/* Bottom bar */}
      <div className="border-t border-sand/10">
        <Container className="flex flex-col gap-4 py-6 text-[0.8125rem] text-sand/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>{footer.copyright}</span>
            {usable(footer.legalLinks).map((link) => (
              <NavAnchor key={link.href} href={link.href} newTab={link.newTab} className="inline-flex min-h-9 items-center hover:text-sand">
                {link.label}
              </NavAnchor>
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
