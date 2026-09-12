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
const SERVICES = ["DMC", "Ground operations", "Groups", "FIT", "MICE", "Luxury"];

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
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/*
        A flat scrim, not a gradient: this is here to hold text contrast at
        4.5:1 over an unpredictable photograph, which is a legibility
        requirement rather than decoration.
      */}
      {/*
        Neutral ink, not the burgundy petrol-deep: a red-tinted scrim turned
        the blue sky purple. At 70% even a pure-white pixel lands near
        luminance 0.12, which keeps chalk text above 5:1.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/70"
      />
      {/* Extra top padding: the transparent header (72px) sits over this section. */}
      <Container className="relative flex w-full flex-col items-center pb-24 pt-[calc(5rem+72px)] text-center">
        {/*
          Luxury carried by restraint rather than ornament: hairline rules,
          wide letter-spacing, scale and space. No gold, no gradient, no glass.
        */}
        <p className="flex items-center gap-4 text-2xs font-medium uppercase tracking-[0.32em] text-hamada">
          <span aria-hidden="true" className="h-px w-8 bg-chalk/50 sm:w-14" />
          B2B only &middot; Travel trade
          <span aria-hidden="true" className="h-px w-8 bg-chalk/50 sm:w-14" />
        </p>

        <h1 className="mt-8 max-w-[14ch] text-[clamp(2.5rem,7vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-chalk">
          {COMPANY.positioning}
        </h1>

        <p className="mt-8 max-w-[46ch] text-balance text-lg text-chalk/90 lg:text-xl">
          {COMPANY.proofLine}
        </p>

        {/*
          Hairline dividers only from lg up, where the row fits on one line.
          Narrower, it wraps - and a divider would start the second line.
        */}
        <ul className="mt-10 flex max-w-[34rem] flex-wrap items-center justify-center gap-x-5 gap-y-3 text-2xs font-medium uppercase tracking-[0.22em] text-hamada lg:max-w-none lg:gap-x-0">
          {SERVICES.map((service, index) => (
            <li key={service} className="flex items-center">
              {index > 0 ? (
                <span aria-hidden="true" className="mx-5 hidden h-3 w-px bg-chalk/40 lg:block" />
              ) : null}
              {service}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          {/* ink on chalk: 15.24:1 */}
          <ButtonLink
            href={RFQ_HREF}
            className="!min-h-[56px] w-full !rounded-[var(--radius-data)] !bg-chalk !px-9 !text-xs !font-semibold uppercase tracking-[0.16em] !text-ink hover:!bg-hamada sm:w-auto"
          >
            Request a B2B quote
          </ButtonLink>
          <ButtonLink
            href={RFQ_HREF}
            className="!min-h-[56px] w-full !rounded-[var(--radius-data)] border border-chalk/50 bg-transparent !px-9 !text-xs !font-semibold uppercase tracking-[0.16em] text-chalk hover:border-chalk hover:bg-chalk/10 sm:w-auto"
          >
            Send us your itinerary
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
