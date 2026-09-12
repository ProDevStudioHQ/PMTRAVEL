import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { SiteImage } from "@/components/SiteImage";
import { imageByKey } from "@/features/images/registry";
import { IMAGE_SLOTS } from "@/features/images/keys";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

/**
 * The hero.
 *
 * Two states, one component. With a B1 record it becomes full-bleed and
 * photographic - the structure that makes an image-led layout work. Without
 * one it stays quiet and typographic, which is the honest state of a site that
 * has no photography yet, not a broken one.
 *
 * What it deliberately does NOT copy from consumer travel templates: no
 * frosted glass nav (the header is clear over the scrim, then solid), no gradient decoration, no social icon row, no
 * saturated blue. Those read as a consumer booking site to a buyer who is not
 * a consumer.
 */
export function HomeHero() {
  const hero = imageByKey(IMAGE_SLOTS.homeHero);

  if (!hero) {
    return (
      <Container as="section" className="py-20 lg:py-28">
        <p className="text-2xs font-medium uppercase tracking-[0.16em] text-meta">
          {COMPANY.brandLine}
        </p>
        <h1 className="mt-5 max-w-[16ch] text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
          {COMPANY.positioning}
        </h1>
        <p className="measure mt-6 text-lg text-meta">{COMPANY.proofLine}</p>
        <p className="measure mt-4 text-sm text-meta">
          DMC &middot; Ground operations &middot; Groups &middot; FIT &middot; MICE
          &middot; Luxury
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href={RFQ_HREF}>Request a B2B quote</ButtonLink>
          <ButtonLink href={RFQ_HREF} variant="secondary">
            Send us your itinerary
          </ButtonLink>
        </div>
      </Container>
    );
  }

  return (
    <section className="surface-deep relative isolate flex min-h-[100svh] items-center overflow-hidden bg-petrol-deep">
      <SiteImage
        imageKey={IMAGE_SLOTS.homeHero}
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/*
        A flat scrim, not a gradient: this is here to hold text contrast at
        4.5:1 over an unpredictable photograph, which is a legibility
        requirement rather than decoration.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-petrol-deep/65"
      />
      {/* Extra top padding: the transparent header (72px) sits over this section. */}
      <Container className="relative flex w-full flex-col items-center pb-20 pt-[calc(4rem+72px)] text-center">
        {/*
          The pill is a solid chalk surface, so its text is ink on chalk
          (15.24:1) regardless of the photograph behind it.
        */}
        <p className="rounded-full bg-chalk px-4 py-2 text-2xs font-medium uppercase tracking-[0.14em] text-ink">
          B2B only &middot; For travel agencies &amp; tour operators
        </p>
        <h1 className="mt-6 max-w-[20ch] text-2xl font-semibold tracking-tight text-chalk sm:text-3xl lg:text-4xl">
          {COMPANY.positioning}
        </h1>
        <p className="mt-5 max-w-[40ch] text-lg font-medium text-chalk lg:text-xl">
          {COMPANY.proofLine}
        </p>
        <p className="mt-4 max-w-[60ch] text-sm text-hamada">
          DMC &middot; Ground operations &middot; Groups &middot; FIT &middot; MICE
          &middot; Luxury
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href={RFQ_HREF} variant="accent">
            Request a B2B quote
          </ButtonLink>
          <ButtonLink
            href={RFQ_HREF}
            className="border border-chalk/60 bg-transparent text-chalk hover:bg-chalk/10"
          >
            Send us your itinerary
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
