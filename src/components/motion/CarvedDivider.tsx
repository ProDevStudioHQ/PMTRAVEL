"use client";

/**
 * Client Component: thin carved divider with a centre zellige star, in gold.
 * The two lines draw outwards from the star when scrolled into view (1.2s,
 * once). Decorative only; static for reduced motion.
 */
import { m, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CarvedDivider({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const line = (d: string) =>
    reduce ? (
      <path d={d} />
    ) : (
      <m.path d={d} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "0px 0px -40px 0px" }} transition={{ duration: 1.2, ease: EASE }} />
    );
  return (
    <div aria-hidden="true" className={`flex justify-center text-gold ${className}`}>
      <svg viewBox="0 0 480 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-6 w-full max-w-[30rem]">
        {line("M222 12H8")}
        {line("M258 12h214")}
        <g strokeWidth="1.25">
          <rect x="233" y="5" width="14" height="14" />
          <rect x="233" y="5" width="14" height="14" transform="rotate(45 240 12)" />
          <circle cx="240" cy="12" r="2" fill="currentColor" stroke="none" />
        </g>
        <circle cx="216" cy="12" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="264" cy="12" r="1.25" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}
