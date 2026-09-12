import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { SiteImage } from "@/components/SiteImage";
import { imageByKey } from "@/features/images/registry";
import { IMAGE_SLOTS } from "@/features/images/keys";
import { COMPANY, RFQ_HREF } from "@/lib/nav";

/**
 * The second action. An itinerary goes to the operations desk; a quote
 * request goes to the RFQ form. The two buttons used to share one
 * destination under different labels.
 */
const ITINERARY_HREF = "/contact";

function HeroContent({ onDark }: { onDark: boolean }) {
  const tone = onDark ? "dark" : "light";
  return (
    <>
      <h1
        className={`max-w-[14ch] text-3xl font-bold tracking-tight lg:text-4xl ${
          onDark ? "text-paper" : "text-ink-900"
        }`}
      >
        {COMPANY.positioning}
      </h1>
      <p className={`measure mt-6 text-lg ${onDark ? "text-paper/90" : "text-ink-500"}`}>
        {COMPANY.proofLine}
      </p>
      {/*
        The services list that sat here was removed at the Phase 3 self-critique
        gate: it repeated the eight operations cards directly below the hero.
      */}
      <div className="mt-12 flex flex-wrap gap-4">
        <ButtonLink href={RFQ_HREF} tone={tone}>
          Request a B2B quote
        </ButtonLink>
        <ButtonLink href={ITINERARY_HREF} variant="secondary" tone={tone}>
          Send us your itinerary
        </ButtonLink>
      </div>
    </>
  );
}

/**
 * The home hero (SOP Phase 3).
 *
 * With the photograph: full-bleed Erg Chebbi under a flat ink overlay, which
 * holds text contrast over an unpredictable image - an overlay, not a blur
 * and not a gradient. The content sits left-aligned at the foot of the frame
 * so the dunes and the camels stay visible above it.
 *
 * Without a photograph record the hero stays quiet and typographic, which is
 * the honest state of a site with no photography rather than a broken one.
 */
export function HomeHero() {
  const hero = imageByKey(IMAGE_SLOTS.homeHero);

  if (!hero) {
    return (
      <Container as="section" className="py-24">
        <HeroContent onDark={false} />
      </Container>
    );
  }

  return (
    <section className="surface-deep relative isolate flex min-h-svh items-end overflow-hidden bg-ink-900">
      <SiteImage
        imageKey={IMAGE_SLOTS.homeHero}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* ink-900 at 70%: even a pure-white pixel lands near luminance 0.12, keeping paper text above 5:1. */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink-900/70" />
      {/* pt-32 clears the 64px header that overlays this section. */}
      <Container className="relative w-full pb-24 pt-32 lg:pb-32">
        <HeroContent onDark />
      </Container>
    </section>
  );
}
