import Link from "next/link";
import { Globe, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { COMPANY, PRIMARY_NAV, SECONDARY_NAV, RFQ_HREF, type NavItem } from "@/lib/nav";

const COMPANY_HREFS = ["/about", "/how-we-work", "/contact"];

const ALL_PAGES = [...PRIMARY_NAV, ...SECONDARY_NAV];

/** Operations: the existing link list, less the company pages, plus the quote. */
const OPERATIONS_LINKS: NavItem[] = [
  ...PRIMARY_NAV.filter((item) => !COMPANY_HREFS.includes(item.href)),
  { href: RFQ_HREF, label: "Request a quote" },
];

const COMPANY_LINKS: NavItem[] = COMPANY_HREFS.flatMap(
  (href) => ALL_PAGES.find((item) => item.href === href) ?? []
);

/** lucide-react at 18px and 1.5 stroke; decorative, since each sits beside its own label. */
const ICON = { size: 18, strokeWidth: 1.5, "aria-hidden": true, className: "mt-0.5 shrink-0" } as const;

function FooterLinks({ heading, links }: { heading: string; links: NavItem[] }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-paper">{heading}</h2>
      <ul className="mt-4 flex flex-col">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex min-h-11 items-center text-sm text-paper/90 underline-offset-4 hover:text-paper hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Site footer (SOP 3.2): red-900, four columns on desktop, stacked on mobile.
 * paper at 90% on red-900 measures 9.95:1.
 *
 * Nothing unconfirmed renders here. The phone number, WhatsApp, operating
 * hours, licence number and ICE are held back until confirmed (AGENT-PROMPTS
 * hard stops 2 and 3, decisions.md D4), and there are no social links because
 * no account has been confirmed.
 */
export function SiteFooter() {
  return (
    <footer className="surface-deep mt-24 bg-red-900 text-paper/90">
      <Container>
        <div className="grid gap-x-8 gap-y-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <FooterLinks heading="Operations" links={OPERATIONS_LINKS} />
          <FooterLinks heading="Company" links={COMPANY_LINKS} />

          <div>
            <h2 className="text-base font-semibold text-paper">Contact</h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm">
              <li className="flex gap-3">
                <MapPin {...ICON} />
                <address className="not-italic">
                  {COMPANY.address.line1}
                  <br />
                  {COMPANY.address.district}, {COMPANY.address.city} {COMPANY.address.postalCode}
                  <br />
                  {COMPANY.address.country}
                </address>
              </li>
              <li className="flex gap-3">
                <Mail {...ICON} />
                <span>
                  Travel trade
                  <br />
                  <a
                    href={`mailto:${COMPANY.email.b2b}`}
                    className="wrap-anywhere text-paper underline underline-offset-4"
                  >
                    {COMPANY.email.b2b}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail {...ICON} />
                <span>
                  General
                  <br />
                  <a
                    href={`mailto:${COMPANY.email.general}`}
                    className="wrap-anywhere text-paper underline underline-offset-4"
                  >
                    {COMPANY.email.general}
                  </a>
                </span>
              </li>
              {/* CONTENT NEEDED: telephone (lucide Phone) and WhatsApp (lucide MessageCircle).
                  Two conflicting numbers were supplied; nothing renders until one is
                  confirmed. See docs/START.md "Blockers" and decisions.md D4. */}
              {/* CONTENT NEEDED: operating hours and time zone, GMT+1 (lucide Clock).
                  Not confirmed; nothing renders. */}
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-paper">Working languages</h2>
            <div className="mt-4 flex gap-3 text-sm">
              <Globe {...ICON} />
              <ul className="flex flex-col gap-1">
                {COMPANY.languages.map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-paper/15 py-6 text-sm sm:flex-row sm:justify-between">
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
