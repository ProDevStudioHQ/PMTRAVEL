import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Globe, Mail, MapPin, Send, type LucideIcon } from "lucide-react";
import { Container } from "@/components/Container";
import { BrandLogo } from "@/components/BrandLogo";
import { COMPANY, NAV_GROUPS, PRIMARY_NAV, SECONDARY_NAV, RFQ_HREF, type NavItem } from "@/lib/nav";
import { iconFor } from "@/lib/nav-icons";

const COMPANY_HREFS = ["/how-we-work", "/about", "/contact"];

const ALL_PAGES = [...PRIMARY_NAV, ...SECONDARY_NAV];

/** Services: everything we operate, less the company pages and the destinations hub. */
const SERVICE_LINKS: NavItem[] = [
  ...PRIMARY_NAV.filter((item) => ![...COMPANY_HREFS, "/destinations"].includes(item.href)),
  { href: RFQ_HREF, label: "Request a quote" },
];

const DESTINATION_LINKS: NavItem[] = NAV_GROUPS.find((group) => group.id === "destinations")?.items ?? [];

const COMPANY_LINKS: NavItem[] = COMPANY_HREFS.flatMap(
  (href) => ALL_PAGES.find((item) => item.href === href) ?? []
);

function FooterLinks({ heading, links }: { heading: string; links: NavItem[] }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-paper">{heading}</h2>
      <span aria-hidden="true" className="mt-3 block h-0.5 w-8 rounded-full bg-paper/40" />
      <ul className="mt-4 flex flex-col">
        {links.map((item) => {
          const Icon = iconFor(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex min-h-11 items-center gap-3 text-sm text-paper/90 transition-colors duration-200 hover:text-paper"
              >
                {/* Decorative: the label beside it names the link. */}
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-paper/10 transition-colors duration-200 group-hover:bg-paper group-hover:text-red-900"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                <span className="underline-offset-4 group-hover:underline">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ContactCard({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 rounded-2xl border border-paper/15 bg-paper/5 p-5">
      <span
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper text-red-900"
      >
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <div className="min-w-0 text-sm">
        <p className="font-semibold text-paper">{label}</p>
        <div className="mt-1 text-paper/85">{children}</div>
      </div>
    </li>
  );
}

/**
 * Site footer (SOP 3.2): red-900. A quote banner, then brand, services,
 * destinations and company columns, then contact cards.
 * paper at 90% on red-900 measures 9.95:1.
 *
 * Nothing unconfirmed renders here. The phone number, WhatsApp, operating
 * hours, licence number and ICE are held back until confirmed (AGENT-PROMPTS
 * hard stops 2 and 3, decisions.md D4), and there are no social links because
 * no account has been confirmed.
 */
export function SiteFooter() {
  return (
    // No top margin: every page ends in a padded section that meets the footer directly.
    <footer className="surface-deep relative overflow-hidden bg-red-900 text-paper/90">
      {/* Soft light behind the banner; purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-paper/5 blur-3xl"
      />

      <Container className="relative">
        {/* Quote banner */}
        <div className="pt-16">
          <div className="flex flex-col gap-6 rounded-3xl border border-paper/15 bg-paper/[0.07] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-paper text-red-900"
              >
                <Send size={22} strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display text-xl font-semibold text-paper">Have a Morocco requirement?</p>
                <p className="mt-1 text-sm text-paper/85">
                  Company, dates, destinations and numbers are enough to start costing.
                </p>
              </div>
            </div>
            <Link
              href={RFQ_HREF}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-paper px-7 text-sm font-semibold text-red-900 transition-colors duration-200 hover:bg-red-050"
            >
              Request a quote
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={`${COMPANY.name}, home`} className="inline-flex">
              <BrandLogo onDark />
            </Link>
            <p className="mt-5 max-w-xs text-sm text-paper/85">
              <span className="font-semibold text-paper">{COMPANY.positioning}.</span> {COMPANY.proofLine}
            </p>
            <div className="mt-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-paper">
                <Globe aria-hidden="true" size={16} strokeWidth={1.75} />
                Working languages
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {COMPANY.languages.map((language) => (
                  <li
                    key={language}
                    className="rounded-full border border-paper/20 bg-paper/5 px-3 py-1 text-xs text-paper"
                  >
                    {language}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <FooterLinks heading="Services" links={SERVICE_LINKS} />
          <FooterLinks heading="Destinations" links={DESTINATION_LINKS} />
          <FooterLinks heading="Company" links={COMPANY_LINKS} />
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          <ContactCard icon={MapPin} label="Office">
            <address className="not-italic">
              {COMPANY.address.line1}, {COMPANY.address.district}
              <br />
              {COMPANY.address.city} {COMPANY.address.postalCode}, {COMPANY.address.country}
            </address>
          </ContactCard>
          <ContactCard icon={Mail} label="Travel trade">
            <a
              href={`mailto:${COMPANY.email.b2b}`}
              className="wrap-anywhere text-paper underline underline-offset-4"
            >
              {COMPANY.email.b2b}
            </a>
          </ContactCard>
          <ContactCard icon={Mail} label="General">
            <a
              href={`mailto:${COMPANY.email.general}`}
              className="wrap-anywhere text-paper underline underline-offset-4"
            >
              {COMPANY.email.general}
            </a>
          </ContactCard>
          {/* CONTENT NEEDED: telephone (lucide Phone) and WhatsApp (lucide MessageCircle).
              Two conflicting numbers were supplied; nothing renders until one is
              confirmed. See docs/START.md "Blockers" and decisions.md D4. */}
          {/* CONTENT NEEDED: operating hours and time zone, GMT+1 (lucide Clock).
              Not confirmed; nothing renders. */}
        </ul>

        <div className="mt-12 flex flex-col gap-2 border-t border-paper/15 py-6 text-sm sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.name}
          </p>
          <p>{COMPANY.brandLine}</p>
          {/* CONTENT NEEDED: Moroccan travel agency licence number and ICE.
              Not confirmed (AGENT-PROMPTS hard stop 3); nothing renders. */}
        </div>
      </Container>
    </footer>
  );
}
