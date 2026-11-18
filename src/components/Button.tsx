import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
/** "dark" for buttons on midnight or over a photograph. */
type Tone = "light" | "dark";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium leading-none transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, Record<Tone, string>> = {
  // white on terracotta 5.06:1, on the hover shade 6.89:1
  primary: {
    light: "bg-terracotta-600 text-white shadow-raised hover:bg-terracotta-700",
    dark: "bg-terracotta-600 text-white hover:bg-terracotta-700",
  },
  secondary: {
    light: "border border-midnight/25 text-midnight hover:border-midnight hover:bg-midnight hover:text-sand",
    dark: "border border-sand/50 text-sand hover:bg-sand hover:text-midnight",
  },
  ghost: {
    light: "px-1 text-terracotta-700 underline-offset-4 hover:underline",
    dark: "px-1 text-sand underline-offset-4 hover:underline",
  },
  whatsapp: {
    light: "border border-midnight/25 text-midnight hover:bg-midnight hover:text-sand",
    dark: "border border-sand/50 text-sand hover:bg-sand hover:text-midnight",
  },
};

export const buttonClasses = (variant: Variant = "primary", tone: Tone = "light", className = "") =>
  `${base} ${variants[variant][tone]} ${className}`;

function Arrow() {
  return <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} className="arrow-slide" />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  tone?: Tone;
  arrow?: boolean;
  icon?: ReactNode;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", tone = "light", arrow = false, icon, className = "", children, ...props }: ButtonLinkProps) {
  const external = typeof props.href === "string" && /^https?:/.test(props.href);
  return (
    <Link
      className={buttonClasses(variant, tone, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {icon}
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; tone?: Tone; arrow?: boolean };

export function Button({ variant = "primary", tone = "light", arrow = false, className = "", children, ...props }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, tone, className)} {...props}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </button>
  );
}
