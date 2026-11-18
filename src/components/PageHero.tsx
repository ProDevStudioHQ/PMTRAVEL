import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { SiteImage } from "@/components/SiteImage";

export { RevealWords } from "@/components/RevealWords";
import { RevealWords } from "@/components/RevealWords";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  standfirst?: ReactNode;
  imageKey: string;
  trail?: Crumb[];
  children?: ReactNode;
  /** Full viewport height (home). Inner pages use a shorter banner. */
  full?: boolean;
  below?: ReactNode;
};

/**
 * Photographic hero. The image is the page's single priority (LCP) image and
 * slowly zooms (Ken Burns, transform only). The headline reveals word by word
 * in pure CSS, so it never waits for JavaScript.
 */
export function PageHero({ eyebrow, title, standfirst, imageKey, trail, children, full = false, below }: PageHeroProps) {
  return (
    <section className={`on-dark surface-deep relative isolate overflow-hidden bg-midnight text-sand ${full ? "min-h-[100svh]" : "min-h-[70svh] lg:min-h-[78svh]"} flex flex-col`}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="ken-burns absolute inset-0">
          <SiteImage imageKey={imageKey} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-midnight/45" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-4/5 bg-linear-to-t from-midnight via-midnight/70 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-midnight/70 to-transparent" />
      </div>

      <Container className={`flex flex-1 flex-col pt-28 lg:pt-36 ${full ? "pb-12 lg:pb-16" : "pb-14 lg:pb-20"}`}>
        {trail ? <Breadcrumbs trail={trail} onDark /> : null}
        <div className="mt-auto max-w-4xl pt-12">
          <p className="eyebrow eyebrow-on-dark fade-up">{eyebrow}</p>
          <h1 className={`mt-5 text-sand ${full ? "t-hero" : "t-hero !text-[clamp(2.5rem,5vw,4.5rem)]"}`}>
            <RevealWords text={title} />
          </h1>
          {standfirst ? <div className="fade-up delay-1 mt-6 max-w-2xl text-lg leading-relaxed text-sand/85">{standfirst}</div> : null}
          {children ? <div className="fade-up delay-2 mt-9 flex flex-wrap gap-3">{children}</div> : null}
        </div>
        {below ? <div className="fade-up delay-3 mt-12">{below}</div> : null}
      </Container>
    </section>
  );
}
