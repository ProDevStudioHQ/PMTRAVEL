"use client";

/**
 * Client Component: wraps the app in LazyMotion (loads only the DOM animation
 * feature set, fetched after hydration so it is not in the initial bundle) and makes every Framer
 * Motion animation respect prefers-reduced-motion.
 */
import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
