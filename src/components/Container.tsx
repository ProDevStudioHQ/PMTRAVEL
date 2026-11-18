import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/** Page width and gutters: 1280px max, 16px mobile gutter, 40px desktop. */
export function Container({ children, as: Tag = "div", className = "" }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-site px-4 sm:px-6 lg:px-10 ${className}`}>{children}</Tag>;
}
