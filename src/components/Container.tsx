import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/** Page width and gutters: 1200px, 72px desktop, 20px mobile. */
export function Container({ children, as: Tag = "div", className = "" }: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[var(--container-site)] px-5 lg:px-[72px] ${className}`}
    >
      {children}
    </Tag>
  );
}
