"use client";

/**
 * Client Component: testimonial slider with previous/next buttons and a live
 * region. No autoplay (WCAG 2.2.2). Placeholder entries are visibly marked so
 * nobody mistakes them for real quotes.
 */
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/content/home";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const item = items[index]!;
  const go = (delta: number) => setIndex((i) => (i + delta + items.length) % items.length);

  return (
    <div className="relative rounded-card border border-line bg-ivory p-8 sm:p-12" aria-roledescription="carousel" aria-label="Partner testimonials">
      <Quote aria-hidden="true" size={40} strokeWidth={1} className="text-gold" />
      <div aria-live="polite" className="min-h-48">
        <AnimatePresence mode="wait">
          <m.figure
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
          >
            <blockquote className={`mt-6 font-display text-[clamp(1.375rem,2.4vw,2rem)] leading-snug ${item.placeholder ? "text-muted italic" : "text-ink"}`}>
              {item.quote}
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-medium text-ink">{item.name}</span>
              <span aria-hidden="true" className="h-px w-6 bg-gold" />
              <span className="text-muted">
                {item.role}, {item.companyType}
              </span>
              {item.placeholder ? (
                <span className="rounded-full border border-dashed border-terracotta-700/50 px-2.5 py-0.5 text-xs text-terracotta-700">Placeholder</span>
              ) : null}
            </figcaption>
          </m.figure>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <button type="button" onClick={() => go(-1)} className="grid size-11 place-items-center rounded-full border border-ink/15 hover:border-ink">
          <ChevronLeft aria-hidden="true" size={20} />
          <span className="sr-only">Previous testimonial</span>
        </button>
        <button type="button" onClick={() => go(1)} className="grid size-11 place-items-center rounded-full border border-ink/15 hover:border-ink">
          <ChevronRight aria-hidden="true" size={20} />
          <span className="sr-only">Next testimonial</span>
        </button>
        <span className="tabular ml-2 text-sm text-muted">
          {index + 1} / {items.length}
        </span>
      </div>
    </div>
  );
}
