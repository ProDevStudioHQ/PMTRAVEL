import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Three variants only (SOP 3.3). */
type Variant = "primary" | "secondary" | "ghost";

/** "dark" for buttons that sit on red-900 or over a photograph. */
type Tone = "light" | "dark";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-control text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, Record<Tone, string>> = {
  // paper on red-600: 5.84:1. Hover deepens to red-900 (12.06:1).
  primary: {
    light: "bg-red-600 px-6 text-paper hover:bg-red-900",
    dark: "bg-red-600 px-6 text-paper hover:bg-paper hover:text-red-900",
  },
  // ink-900 on paper: 18.01:1. On dark: paper border and text.
  secondary: {
    light: "border border-ink-900 px-6 text-ink-900 hover:bg-paper-2",
    dark: "border border-paper px-6 text-paper hover:bg-paper hover:text-ink-900",
  },
  // Text action; the underline appears on hover.
  ghost: {
    light: "px-1 text-red-600 underline-offset-4 hover:underline",
    dark: "px-1 text-paper underline-offset-4 hover:underline",
  },
};

const classesFor = (variant: Variant, tone: Tone) => variants[variant][tone];

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  tone?: Tone;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  tone = "light",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${base} ${classesFor(variant, tone)} ${className}`} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  tone?: Tone;
};

export function Button({
  variant = "primary",
  tone = "light",
  className = "",
  ...props
}: ButtonProps) {
  return <button className={`${base} ${classesFor(variant, tone)} ${className}`} {...props} />;
}
