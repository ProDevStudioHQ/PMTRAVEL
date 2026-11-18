import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteImage } from "@/components/SiteImage";
import { Icon, type IconName } from "@/components/Icon";

/** Photo card with hover lift (-6px), image zoom (1.05) and soft shadow. */
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
    <Link href={href} className="card-lift group relative block overflow-hidden rounded-3xl bg-midnight text-sand">
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
      <h3 className={`mt-5 font-display text-[1.25rem] leading-snug font-medium ${onDark ? "text-sand" : "text-ink"}`}>{title}</h3>
      {body ? <p className={`mt-2 text-[0.9375rem] leading-relaxed ${onDark ? "text-sand/70" : "text-muted"}`}>{body}</p> : null}
      {href ? (
        <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${onDark ? "text-gold" : "text-terracotta-700"}`}>
          Learn more <ArrowRight aria-hidden="true" size={16} className="arrow-slide" />
        </span>
      ) : null}
    </>
  );
  const cls = `h-full rounded-3xl border p-7 ${onDark ? "border-sand/10 bg-midnight-2" : "border-line bg-white"}`;
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
          className="grid h-20 w-48 place-items-center rounded-2xl border border-dashed border-ink/20 bg-white/60 px-4 text-center text-xs text-muted"
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
