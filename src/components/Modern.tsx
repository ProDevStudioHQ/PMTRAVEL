import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { SiteImage } from "@/components/SiteImage";
import { imageByKey } from "@/features/images/registry";

/**
 * Shared building blocks for the redesigned content pages: pill actions, the
 * eyebrow and section heading, icon cards, a prose card and the closing
 * banner. Plain server components, so every page renders statically.
 */

const pillBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-colors duration-200";

export const PILL = {
  /** Paper on a dark or photographic surface. */
  onDarkSolid: `${pillBase} bg-paper text-red-900 hover:bg-red-050`,
  onDarkOutline: `${pillBase} border border-paper/60 text-paper hover:bg-paper hover:text-ink-900`,
  primary: `${pillBase} bg-red-600 text-paper shadow-raised hover:bg-red-900`,
  outline: `${pillBase} border border-ink-900/20 text-ink-900 hover:border-ink-900`,
};

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-sm font-semibold ${onDark ? "text-paper/80" : "text-red-600"}`}>
      <span aria-hidden="true" className={`h-0.5 w-8 rounded-full ${onDark ? "bg-paper/60" : "bg-red-600"}`} />
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  onDark?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, children, onDark = false, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-4 max-w-[24ch] text-2xl font-bold tracking-tight lg:text-[2.5rem] lg:leading-[1.1] ${
          onDark ? "text-paper" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {children ? (
        <div className={`measure mt-5 flex flex-col gap-4 text-lg ${onDark ? "text-paper/85" : "text-ink-500"}`}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

export type IconItem = {
  icon: LucideIcon;
  title: string;
  body: ReactNode;
  /** Anchor target, so other pages can link straight to one card. */
  id?: string;
};

const COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

const CARD_TONES = {
  light: {
    card: "border-rule bg-paper hover:border-red-600 hover:shadow-raised",
    tile: "bg-red-050 text-red-600 group-hover:bg-red-600 group-hover:text-paper",
    title: "text-ink-900",
    body: "text-ink-500",
  },
  muted: {
    card: "border-rule bg-paper-2 hover:border-red-600",
    tile: "bg-paper text-red-600 group-hover:bg-red-600 group-hover:text-paper",
    title: "text-ink-900",
    body: "text-ink-500",
  },
  dark: {
    card: "border-paper/12 bg-paper/[0.06] hover:border-paper/40",
    tile: "bg-paper text-red-900",
    title: "text-paper",
    body: "text-paper/85",
  },
} as const;

export function IconCards({
  items,
  columns = 3,
  tone = "light",
  numbered = false,
}: {
  items: IconItem[];
  columns?: keyof typeof COLUMNS;
  tone?: keyof typeof CARD_TONES;
  numbered?: boolean;
}) {
  const style = CARD_TONES[tone];
  const List = numbered ? "ol" : "ul";
  return (
    <List className={`grid gap-4 ${COLUMNS[columns]}`}>
      {items.map(({ icon: Icon, title, body, id }, index) => (
        <li
          key={title}
          id={id}
          className={`group scroll-mt-24 rounded-2xl border p-6 transition-[border-color,box-shadow] duration-200 ${style.card}`}
        >
          <div className="flex items-center justify-between">
            <span
              aria-hidden="true"
              className={`flex size-12 items-center justify-center rounded-xl transition-colors duration-200 ${style.tile}`}
            >
              <Icon size={22} strokeWidth={1.75} />
            </span>
            {numbered ? (
              <span
                aria-hidden="true"
                className={`tabular font-display text-2xl font-bold ${tone === "dark" ? "text-paper/25" : "text-ink-900/15"}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
          </div>
          <h3 className={`mt-5 font-display text-lg font-semibold ${style.title}`}>{title}</h3>
          <div className={`mt-2 text-sm ${style.body}`}>{body}</div>
        </li>
      ))}
    </List>
  );
}

/** Long-form copy set on a card, with a larger first paragraph. */
export function ProseCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-rule bg-paper p-6 text-base text-ink-900 shadow-raised sm:p-10 [&>p:first-child]:text-lg">
      {children}
    </div>
  );
}

type Action = { href: string; label: string };

function ActionLink({ action, className, arrow = false }: { action: Action; className: string; arrow?: boolean }) {
  const content = (
    <>
      {action.label}
      {arrow ? <ArrowRight aria-hidden="true" size={16} strokeWidth={2} /> : null}
    </>
  );
  return action.href.startsWith("mailto:") || action.href.startsWith("#") ? (
    <a href={action.href} className={className}>
      {content}
    </a>
  ) : (
    <Link href={action.href} className={className}>
      {content}
    </Link>
  );
}

/** The closing call to action: a red banner, optionally over a dimmed photograph. */
export function CtaBanner({
  title,
  children,
  imageKey,
  primary,
  secondary,
}: {
  title: ReactNode;
  children?: ReactNode;
  imageKey?: string;
  primary: Action;
  secondary?: Action;
}) {
  const hasImage = imageKey ? Boolean(imageByKey(imageKey)) : false;
  return (
    <div className="surface-deep relative isolate overflow-hidden rounded-[2rem] bg-red-900 px-6 py-14 text-paper sm:px-12 lg:px-16 lg:py-20">
      {hasImage && imageKey ? (
        <>
          <SiteImage imageKey={imageKey} fill sizes="(min-width: 1280px) 1056px, 100vw" className="-z-10 object-cover" />
          {/* red-900 at 90%: paper text stays above 9:1. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-red-900/90" />
        </>
      ) : null}
      <h2 className="max-w-[22ch] text-3xl font-bold tracking-tight text-paper lg:text-[3rem] lg:leading-[1.05]">
        {title}
      </h2>
      {children ? <div className="measure mt-5 text-lg text-paper/90">{children}</div> : null}
      <div className="mt-9 flex flex-wrap gap-3">
        <ActionLink action={primary} className={PILL.onDarkSolid} arrow />
        {secondary ? <ActionLink action={secondary} className={PILL.onDarkOutline} /> : null}
      </div>
    </div>
  );
}
