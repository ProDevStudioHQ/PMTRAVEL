import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export type LegalSection = { heading: string; paragraphs: string[]; list?: string[] };

/**
 * Legal page template. TODO(legal): the texts in src/app/{privacy,terms,cookies}
 * describe what the site actually does (see docs/legal-drafts) and must be
 * reviewed by a lawyer for GDPR, UK GDPR and Moroccan Law 09-08 before launch.
 */
export function LegalPage({ title, path, updated, intro, sections }: { title: string; path: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <section className="on-dark surface-deep bg-midnight text-sand">
        <Container className="pt-28 pb-14 lg:pt-36 lg:pb-16">
          <Breadcrumbs trail={[{ href: path, label: title }]} onDark />
          <h1 className="t-h2 mt-8 text-sand">{title}</h1>
          <p className="mt-4 text-sm text-sand/70">Last updated {updated}</p>
        </Container>
      </section>
      <section className="bg-sand">
        <Container className="py-16 lg:py-24">
          <div className="measure space-y-10">
            <p className="text-lg">{intro}</p>
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="t-h3">{s.heading}</h2>
                <div className="mt-3 space-y-3 text-muted">
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                  {s.list ? (
                    <ul className="list-disc space-y-1.5 pl-6 marker:text-terracotta">
                      {s.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
