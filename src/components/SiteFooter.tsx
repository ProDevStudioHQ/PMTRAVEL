import Link from "next/link";
import { Container } from "@/components/Container";
import { COMPANY, PRIMARY_NAV, SECONDARY_NAV, RFQ_HREF } from "@/lib/nav";

/**
 * No telephone number and no legal identity block appear here. Both are
 * unconfirmed. See docs/START.md, "Blockers".
 */
export function SiteFooter() {
  return (
    <footer className="surface-deep mt-24 bg-petrol-deep text-chalk">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold">{COMPANY.name}</p>
            <p className="mt-1 text-xs text-hamada">{COMPANY.brandLine}</p>
            <address className="mt-5 text-xs not-italic leading-relaxed text-hamada">
              {COMPANY.address.line1}
              <br />
              {COMPANY.address.district}
              <br />
              {COMPANY.address.city} {COMPANY.address.postalCode}
              <br />
              {COMPANY.address.country}
            </address>
          </div>

          <div>
            <h2 className="text-2xs font-medium uppercase tracking-[0.12em] text-hamada">
              Operations
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-xs text-chalk hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={RFQ_HREF} className="text-xs text-chalk hover:underline">
                  Request a quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xs font-medium uppercase tracking-[0.12em] text-hamada">
              Contact
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-xs">
              <li>
                Travel trade:{" "}
                <a href={`mailto:${COMPANY.email.b2b}`} className="underline">
                  {COMPANY.email.b2b}
                </a>
              </li>
              <li>
                General:{" "}
                <a href={`mailto:${COMPANY.email.general}`} className="underline">
                  {COMPANY.email.general}
                </a>
              </li>
            </ul>
            <h2 className="mt-8 text-2xs font-medium uppercase tracking-[0.12em] text-hamada">
              Working languages
            </h2>
            <p className="mt-3 text-xs text-hamada">
              {COMPANY.languages.join(" \u00B7 ")}
            </p>
          </div>
        </div>

        <div className="border-t border-chalk/15 py-6">
          <p className="text-2xs text-hamada">
            &copy; {new Date().getFullYear()} {COMPANY.name}. {COMPANY.brandLine}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
