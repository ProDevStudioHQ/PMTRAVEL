import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ImageCard } from "@/components/cards";
import { CtaBand } from "@/components/CtaBand";
import { leisureHref, type LeisureProduct } from "@/content/leisure";
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
  products: LeisureProduct[];
};


/** Hub page for /experiences and /tours. */
export function LeisureHub({ eyebrow, title, standfirst, imageKey, path, label, listTitle, listIntro, products }: HubProps) {
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
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.08}>
              <ImageCard href={leisureHref(p)} imageKey={p.heroImage} title={p.name} line={p.cardLine} />
            </Reveal>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
