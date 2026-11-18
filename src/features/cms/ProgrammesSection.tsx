import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Pagination } from "@/features/cms/Pagination";
import { ProgrammeCard } from "@/features/cms/ProgrammeCard";
import { Unavailable } from "@/features/cms/Unavailable";
import type { Paginated, ProgrammeSummary } from "@/types/cms";

type Props = {
  /** null: the CRM could not be reached. */
  list: Paginated<ProgrammeSummary> | null;
  /** Page path for pagination links, without ?page. */
  path: string;
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "sand" | "white";
  /** Rendered when the CRM answered with no programmes. Omit to render nothing. */
  empty?: React.ReactNode;
};

/** A grid of CRM programme cards with ?page pagination. */
export function ProgrammesSection({ list, path, id, eyebrow, title, intro, tone = "white", empty }: Props) {
  if (list && list.items.length === 0 && !empty) return null;
  return (
    <Section tone={tone} aria-labelledby={id}>
      <SectionHeading id={id} eyebrow={eyebrow} title={title}>
        {intro}
      </SectionHeading>
      <div className="mt-12">
        {list === null ? (
          <Unavailable />
        ) : list.items.length === 0 ? (
          empty
        ) : (
          <>
            <ul className="swipe-row grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.items.map((p, i) => (
                <Reveal as="li" key={p.id} delay={(i % 3) * 0.08}>
                  <ProgrammeCard programme={p} />
                </Reveal>
              ))}
            </ul>
            <Pagination path={path} page={list.page} totalPages={list.totalPages} />
          </>
        )}
      </div>
    </Section>
  );
}
