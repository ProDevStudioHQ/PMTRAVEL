import Link from "next/link";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { NAV, type NavLink } from "@/lib/nav";
import { RFQ_HREF } from "@/lib/company";

/** Custom 404. Next.js marks it noindex automatically. */
export default function NotFound() {
  return (
    <section className="on-dark surface-deep relative flex min-h-[100svh] items-center overflow-hidden bg-midnight text-sand">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -bottom-40 size-[40rem] rounded-full border border-gold/15" />
      <Container className="relative pt-32 pb-20">
        <p className="eyebrow eyebrow-on-dark">Error 404</p>
        <h1 className="t-hero mt-5 max-w-[14ch] text-sand">This path leads nowhere.</h1>
        <p className="mt-6 max-w-xl text-lg text-sand/75">
          The page may have moved. Here are the roads that do lead somewhere.
        </p>
        <nav aria-label="Site sections" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {NAV.flatMap((item): NavLink[] => (item.id === "company" && item.menu ? item.menu.items : [{ href: item.href, label: item.label }])).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center rounded-full border border-sand/20 px-5 text-sm hover:border-gold hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" tone="dark" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href={RFQ_HREF} variant="secondary" tone="dark">
            Request a Quote
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
