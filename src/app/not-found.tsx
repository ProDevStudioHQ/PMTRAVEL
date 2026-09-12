import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { TextLink } from "@/components/TextLink";
import { PRIMARY_NAV, SECONDARY_NAV } from "@/lib/nav";

/**
 * The 404 page. It says what happened, then offers every published section
 * as a way back in. Next.js marks it noindex automatically.
 */
export default function NotFound() {
  const pages = [...PRIMARY_NAV, ...SECONDARY_NAV];

  return (
    <section className="bg-paper">
      <Container className="py-24 lg:py-32">
        <p aria-hidden="true" className="tabular font-display text-4xl font-bold text-ink-500">
          404
        </p>
        <h1 className="mt-6 max-w-[18ch] text-3xl font-bold tracking-tight text-ink-900 lg:text-4xl">
          That page does not exist
        </h1>
        <p className="measure mt-6 text-lg text-ink-500">
          The address may have changed, or the page may never have been published.
        </p>
        <nav aria-label="Site sections" className="mt-12">
          <ul className="grid border-t border-rule sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
            {pages.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <TextLink href={item.href} className="flex min-h-12 items-center text-base">
                  {item.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10">
          <ButtonLink href="/">Back to the home page</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
