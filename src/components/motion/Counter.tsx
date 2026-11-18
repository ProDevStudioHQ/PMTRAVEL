"use client";

/**
 * Client Component: counts up to `value` once when scrolled into view.
 * The final value is server-rendered, so crawlers, no-JS visitors and
 * reduced-motion users always see the real number.
 */
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({ value, prefix = "", suffix = "", className }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {prefix}
      {/* The number changes while counting; Google Translate must not freeze it. */}
      <span className="notranslate" translate="no">
        {display}
      </span>
      {/* Leading space as margin: Google Translate trims spaces from text nodes. */}
      {suffix ? <span className={suffix.startsWith(" ") ? "ml-[0.25em]" : ""}>{suffix.trimStart()}</span> : null}
    </span>
  );
}
