import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import type { ReactNode } from "react";
import { CtaBand } from "@/components/CtaBand";
import { RFQ_HREF } from "@/lib/company";
import { en } from "@/i18n/dictionaries/en";

type HubProps = {
  eyebrow: string;
  title: string;
  standfirst: string;
  imageKey: string;
  path: string;
  label: string;
  listTitle: string;
  listIntro: string;
  cards: { key: string; node: ReactNode }[];
  /** Rendered after the list, e.g. featured CRM programmes. */
  children?: ReactNode;
};


/** Hub page for /experiences and /tours. */
export function LeisureHub({ eyebrow, title, standfirst, imageKey, path, label, listTitle, listIntro, cards, children }: HubProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} standfirst={standfirst} imageKey={imageKey} trail={[{ href: path, label }]}>
        <ButtonLink href={RFQ_HREF} tone="dark" arrow>
          {en.cta.b2bQuote}
        </ButtonLink>
      </PageHero>
      <Section tone="sand" aria-labelledby="list">
        <SectionHeading id="list" eyebrow={label} title={listTitle}>
          {listIntro}
        </SectionHeading>
        <ul className="swipe-row mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal as="li" key={card.key} delay={(i % 3) * 0.08}>
              {card.node}
            </Reveal>
          ))}
        </ul>
      </Section>
      {children}
      <CtaBand />
    </>
  );
}
