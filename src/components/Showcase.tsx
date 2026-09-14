import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CircleCheck, Handshake } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { PILL } from "@/components/Modern";
import { SiteImage } from "@/components/SiteImage";
import { RFQ_HREF } from "@/lib/company";

/**
 * The services showcase used by /mice and /morocco-dmc: a gradient hero with
 * factual tiles, numbered service rows alternating photo and checklist, and a
 * gradient closing banner. Tiles hold facts only - never unmeasured statistics.
 */

/** Red into ink and back: the hero and the closing banner share it. */
const GRADIENT = "bg-linear-to-br from-red-600 via-ink-900 to-red-900";

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-1.5 text-xs font-bold tracking-wide text-red-600 uppercase">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-red-600" />
      {children}
      <span aria-hidden="true" className="size-1.5 rounded-full bg-red-600" />
    </span>
  );
}

export function ShowcaseHero({
  badge,
  title,
  standfirst,
  trail,
  highlights,
}: {
  badge: string;
  title: string;
  standfirst: string;
  trail: Crumb[];
  highlights: { value: string; label: string }[];
}) {
  return (
    <section className={`surface-deep relative isolate overflow-hidden text-paper ${GRADIENT}`}>
      <Container className="pt-4 pb-20 lg:pb-28">
        <Breadcrumbs trail={trail} onDark />
        <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center text-center lg:mt-20">
          <Badge>{badge}</Badge>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-paper sm:text-4xl lg:text-[4rem] lg:leading-none">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/90">{standfirst}</p>
          <dl className="mt-10 grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-3">
            {highlights.map(({ value, label }) => (
              <div
                key={label}
                className="flex min-w-0 flex-col-reverse rounded-2xl bg-paper px-2 py-4 shadow-raised sm:px-4"
              >
                <dt className="mt-1 text-xs text-ink-500 sm:text-sm">{label}</dt>
                <dd className="font-display text-base font-bold text-red-600 sm:text-2xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

export type ShowcaseService = {
  /** Anchor for the row. */
  id: string;
  /** Extra anchors that land on this row, e.g. older links to a merged service. */
  aliases?: string[];
  title: string;
  body: string;
  points: string[];
  imageKey: string;
};

export function ShowcaseRows({ services }: { services: ShowcaseService[] }) {
  return (
    <section className="bg-paper">
      <Container className="flex flex-col gap-20 py-16 lg:gap-28 lg:py-24">
        {services.map((service, index) => (
          <article
            key={service.id}
            id={service.id}
            className="relative grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            {service.aliases?.map((alias) => (
              <span key={alias} id={alias} aria-hidden="true" className="absolute top-0 scroll-mt-24" />
            ))}
            <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-red-050" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-paper-2 shadow-raised">
                <SiteImage
                  imageKey={service.imageKey}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="tabular absolute top-5 left-5 flex size-12 items-center justify-center rounded-full border-2 border-red-600 bg-paper font-display text-base font-bold text-red-600"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="absolute right-5 bottom-5 inline-flex items-center gap-2 rounded-lg bg-paper px-3 py-1.5 text-xs font-semibold text-red-900">
                  <Handshake aria-hidden="true" size={14} strokeWidth={2} />
                  B2B · White-label
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-red-600 lg:text-[2.25rem] lg:leading-[1.1]">
                {service.title}
              </h2>
              <p className="mt-4 text-lg text-ink-500">{service.body}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-base text-ink-900">
                    <CircleCheck aria-hidden="true" size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-red-600" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={RFQ_HREF} className={`${PILL.primary} mt-8`}>
                Request a quote
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
              </Link>
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}

export function ShowcaseCta({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={`surface-deep relative isolate overflow-hidden text-paper ${GRADIENT}`}>
      <Container className="py-20 lg:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge>Ready to start?</Badge>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-paper lg:text-[3rem] lg:leading-[1.05]">
            {title}
          </h2>
          <div className="mt-5 max-w-2xl text-lg text-paper/90">{children}</div>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href={RFQ_HREF} className={PILL.onDarkSolid}>
              Request a B2B quote
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
            </Link>
            <Link href="/contact" className={PILL.onDarkOutline}>
              Contact us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
