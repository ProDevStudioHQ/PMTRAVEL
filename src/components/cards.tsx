import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { SiteImage } from "@/components/SiteImage";
import { Icon, type IconName } from "@/components/Icon";
import { Counter } from "@/components/motion/Counter";

/**
 * Card system (decisions.md D9). Radius 16px, warm shadow; linked cards lift
 * 6px, zoom their image to 1.05 and show a 1px gold inner border on hover
 * (.card-lift, 300ms). The whole card is one link.
 */

const CTA = "mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium";

/* ---- 1. Experience card ---- */

/** Category colours: a dot in the brand colour, text in its AA-safe shade. */
export const CATEGORY_TONES = {
  luxury: { dot: "bg-gold", text: "text-gold-700" },
  adventure: { dot: "bg-terracotta", text: "text-terracotta-700" },
  culture: { dot: "bg-majorelle", text: "text-majorelle" },
  wellness: { dot: "bg-zellige", text: "text-zellige" },
  gastronomy: { dot: "bg-gastronomy", text: "text-gastronomy-700" },
  private: { dot: "bg-indigo", text: "text-indigo" },
} as const;

export type Category = keyof typeof CATEGORY_TONES;
export const isCategory = (slug: string): slug is Category => slug in CATEGORY_TONES;

export function ExperienceCard({
  href,
  imageKey,
  category,
  categoryLabel,
  title,
  line,
  sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 80vw",
  headingLevel = "h3",
  media,
}: {
  href: string;
  imageKey: string;
  /** A ready-made image (CRM cover) in place of the record image. */
  media?: ReactNode;
  category: Category;
  categoryLabel: string;
  title: string;
  line: string;
  sizes?: string;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const tone = CATEGORY_TONES[category];
  return (
    <Link href={href} className="card-lift group flex h-full flex-col rounded-card bg-ivory p-3 shadow-raised">
      <div className="arch relative aspect-[4/5] overflow-hidden bg-clay">
        {media ?? <SiteImage imageKey={imageKey} fill sizes={sizes} className="card-img object-cover" />}
      </div>
      <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <p className={`eyebrow inline-flex items-center gap-2 ${tone.text}`}>
          <span aria-hidden="true" className={`size-1.5 rounded-full ${tone.dot}`} />
          {categoryLabel}
        </p>
        <H className="t-h3 mt-2 text-ink">{title}</H>
        <p className="mt-1.5 line-clamp-1 text-[0.9375rem] text-muted">{line}</p>
        <span className={`${CTA} text-terracotta-700`}>
          Discover <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
        </span>
      </div>
    </Link>
  );
}

/* ---- 2. Tour card ---- */

export function TourCard({
  href,
  imageKey,
  title,
  days,
  format,
  route,
  line,
  sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 80vw",
  headingLevel = "h3",
  media,
  cta = "View itinerary",
}: {
  href: string;
  imageKey: string;
  /** A ready-made image (CRM cover) in place of the record image. */
  media?: ReactNode;
  /** Link text at the bottom of the card. */
  cta?: string;
  title: string;
  /** e.g. "8 days" */
  days?: string;
  /** e.g. "Private", "Group" */
  format?: string;
  /** Stops in order, joined with arrows. */
  route?: string[];
  /** Shown when there is no route. */
  line?: string;
  sizes?: string;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const group = format ? /group/i.test(format) && !/private/i.test(format) : false;
  return (
    <Link href={href} className="card-lift group flex h-full flex-col overflow-hidden rounded-card bg-ivory shadow-raised">
      <div className="relative aspect-[4/3] overflow-hidden bg-clay">
        {media ?? <SiteImage imageKey={imageKey} fill sizes={sizes} className="card-img object-cover" />}
        <div className="absolute top-4 left-4 z-[3] flex flex-wrap gap-2">
          {days ? <span className="rounded-full bg-ivory/95 px-3 py-1 text-xs font-medium text-ink shadow-raised">{days}</span> : null}
          {format ? <span className={`rounded-full px-3 py-1 text-xs font-medium text-white shadow-raised ${group ? "bg-indigo" : "bg-zellige"}`}>{format}</span> : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <H className="t-h3 text-ink">{title}</H>
        {route && route.length > 1 ? (
          <p className="mt-2 text-[0.9375rem] text-muted">
            {route.map((stop, i) => (
              <span key={stop}>
                {i > 0 ? (
                  <span aria-hidden="true" className="mx-1.5 text-gold-700">
                    →
                  </span>
                ) : null}
                {i > 0 ? <span className="sr-only"> to </span> : null}
                {stop}
              </span>
            ))}
          </p>
        ) : line ? (
          <p className="mt-2 text-[0.9375rem] text-muted">{line}</p>
        ) : null}
        <span className={`${CTA} text-terracotta-700`}>
          {cta} <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
        </span>
      </div>
    </Link>
  );
}

/* ---- 3. B2B service card ---- */

export function B2BServiceCard({
  icon,
  title,
  body,
  href,
  cta = "Request a quote",
  headingLevel = "h3",
}: {
  icon: IconName;
  title: string;
  body?: string;
  href: string;
  cta?: string;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <Link
      href={href}
      className="card-lift group on-dark surface-deep zellige-bg zellige-corner flex h-full flex-col overflow-hidden rounded-card bg-indigo p-7 text-ivory shadow-raised"
    >
      <span className="grid size-12 place-items-center rounded-full border border-gold/40 text-gold">
        <Icon name={icon} size={24} />
      </span>
      <H className="t-h3 mt-6 text-ivory">{title}</H>
      {body ? <p className="mt-2 text-[0.9375rem] leading-relaxed text-ivory/80">{body}</p> : null}
      <span className={`${CTA} text-gold`}>
        {cta} <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
      </span>
    </Link>
  );
}

/* ---- 4. Proof card ---- */

type ProofProps =
  | { kind: "figure"; value: number; prefix?: string; suffix?: string; caption: string }
  | { kind: "text"; text: string; caption: string }
  | { kind: "quote"; quote: string; name: string; role: string; placeholder: boolean };

/**
 * Sand card with a gold border: a big serif figure (counts up) or a short
 * testimonial. Placeholders show [ADD REAL DATA] and never pass as real.
 */
export function ProofCard(props: ProofProps) {
  const cls = "gold-inset-on flex h-full flex-col rounded-card border border-gold bg-sand p-7";
  if (props.kind === "quote") {
    return (
      <figure className={cls}>
        <Quote aria-hidden="true" size={28} strokeWidth={1.25} className="text-gold" />
        <blockquote className={`mt-4 font-display text-[1.375rem] leading-snug ${props.placeholder ? "text-muted italic" : "text-ink"}`}>
          {props.placeholder ? "[ADD REAL DATA] Partner testimonial" : props.quote}
        </blockquote>
        <figcaption className="mt-auto pt-5 text-sm text-muted">{props.placeholder ? "[ADD REAL DATA] Name, role, company" : `${props.name}, ${props.role}`}</figcaption>
      </figure>
    );
  }
  return (
    <div className={cls}>
      <p className="font-display text-[clamp(2.25rem,3.4vw,3rem)] leading-[1.05] font-semibold text-balance text-ink">
        {props.kind === "figure" ? <Counter value={props.value} prefix={props.prefix} suffix={props.suffix} /> : props.text}
      </p>
      <p className="mt-3 text-sm tracking-wide text-muted">{props.caption}</p>
    </div>
  );
}

/** Photo card with the caption over the image (galleries, journal). */
export function ImageCard({
  href,
  imageKey,
  title,
  line,
  eyebrow,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  aspect = "aspect-[4/5]",
  headingLevel = "h3",
}: {
  href: string;
  imageKey: string;
  title: string;
  line?: string;
  eyebrow?: string;
  sizes?: string;
  aspect?: string;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <Link href={href} className="card-lift group relative block overflow-hidden rounded-card bg-midnight text-sand shadow-raised">
      <div className={`relative ${aspect} overflow-hidden`}>
        <SiteImage imageKey={imageKey} fill sizes={sizes} className="card-img object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-midnight/95 via-midnight/25 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        {eyebrow ? <p className="eyebrow eyebrow-on-dark">{eyebrow}</p> : null}
        <H className="t-h3 mt-2 flex items-center gap-2 text-sand">
          {title}
          <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.5} className="text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </H>
        {line ? <p className="mt-1.5 text-sm text-sand/80">{line}</p> : null}
      </div>
    </Link>
  );
}

/** Icon tile: benefit or service. Optional link. */
export function IconTile({
  icon,
  title,
  body,
  href,
  onDark = false,
}: {
  icon: IconName;
  title: string;
  body?: string;
  href?: string;
  onDark?: boolean;
}) {
  const inner = (
    <>
      <span className={`grid size-12 place-items-center rounded-full border ${onDark ? "border-gold/40 text-gold" : "border-gold/50 text-terracotta"}`}>
        <Icon name={icon} />
      </span>
      <h3 className={`mt-5 font-display text-[1.4rem] leading-snug font-semibold ${onDark ? "text-sand" : "text-ink"}`}>{title}</h3>
      {body ? <p className={`mt-2 text-[0.9375rem] leading-relaxed ${onDark ? "text-sand/70" : "text-muted"}`}>{body}</p> : null}
      {href ? (
        <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${onDark ? "text-gold" : "text-terracotta-700"}`}>
          Learn more <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
        </span>
      ) : null}
    </>
  );
  const cls = `h-full rounded-card border p-7 ${onDark ? "border-sand/10 bg-midnight-2" : "border-line bg-ivory shadow-raised"}`;
  return href ? (
    <Link href={href} className={`card-lift group block ${cls}`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/** Logo strip: slow infinite marquee (CSS), pauses on hover, off for reduced motion. */
export function LogoMarquee({ names }: { names: { name: string; placeholder: boolean }[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-6 pr-6">
      {names.map((logo) => (
        <li
          key={`${logo.name}-${hidden}`}
          className="grid h-20 w-48 place-items-center rounded-card border border-dashed border-ink/20 bg-ivory/60 px-4 text-center text-xs text-muted"
        >
          {logo.name}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
