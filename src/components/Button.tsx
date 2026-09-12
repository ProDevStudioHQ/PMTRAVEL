import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent";

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-card)] px-5 py-3 text-sm font-medium transition-colors";

const variants: Record<Variant, string> = {
  // chalk on petrol: 12.3:1
  primary: "bg-petrol text-chalk hover:bg-petrol-deep",
  // petrol on chalk: 9.89:1
  secondary: "border border-line text-petrol hover:bg-hamada",
  // chalk on oxide: 5.6:1 - reserved for the single strongest action
  accent: "bg-oxide text-chalk hover:brightness-90",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
