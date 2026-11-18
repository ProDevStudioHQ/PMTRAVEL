"use client";

/**
 * Client Component: the four partnership steps on a horizontal timeline whose
 * gold line draws across when scrolled into view (transform only, no layout
 * shift). Static for reduced-motion users.
 */
import { m, useReducedMotion } from "framer-motion";

type Step = { title: string; body: string };

export function ProcessTimeline({ steps, onDark = false }: { steps: readonly Step[]; onDark?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative mt-14">
      <div aria-hidden="true" className={`absolute top-6 right-[12.5%] left-[12.5%] hidden h-px md:block ${onDark ? "bg-sand/15" : "bg-ink/10"}`}>
        {reduce ? (
          <div className="h-full w-full bg-gold" />
        ) : (
          <m.div
            className="h-full w-full origin-left bg-gold"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>
      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
      {steps.map((step, i) => (
        <m.li
          key={step.title}
          className="relative flex gap-5 md:flex-col md:items-center md:text-center"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 + i * 0.25 }}
        >
          <span
            className={`relative z-10 grid size-12 shrink-0 place-items-center rounded-full border font-display text-lg ${
              onDark ? "border-gold bg-midnight text-gold" : "border-gold bg-sand text-terracotta-700"
            }`}
          >
            <span className="sr-only">Step </span>
            {i + 1}
          </span>
          <div className="md:mt-6">
            <h3 className={`t-h3 ${onDark ? "text-sand" : "text-ink"}`}>{step.title}</h3>
            <p className={`mt-2 text-[0.9375rem] ${onDark ? "text-sand/75" : "text-muted"}`}>{step.body}</p>
          </div>
        </m.li>
      ))}
      </ol>
    </div>
  );
}
