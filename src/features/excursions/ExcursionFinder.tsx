"use client";

import { useState, type ReactNode } from "react";
import { RotateCcw, SearchX } from "lucide-react";

/**
 * Filters the excursion cards by region, length and level.
 *
 * The cards are rendered on the server and passed in as nodes, so the image
 * record never ships to the browser: this component only decides which ones
 * to show. Without JavaScript every card is still in the page.
 */

export type FinderItem = {
  slug: string;
  regions: string[];
  length: string;
  level: string;
  card: ReactNode;
};

type Facet = "region" | "length" | "level";

type Filters = Record<Facet, string | null>;

const EMPTY: Filters = { region: null, length: null, level: null };

const matches = (item: FinderItem, filters: Filters, skip?: Facet) =>
  (skip === "region" || !filters.region || item.regions.includes(filters.region)) &&
  (skip === "length" || !filters.length || item.length === filters.length) &&
  (skip === "level" || !filters.level || item.level === filters.level);

export function ExcursionFinder({
  items,
  regions,
  lengths,
  levels,
}: {
  items: FinderItem[];
  regions: string[];
  lengths: string[];
  levels: string[];
}) {
  const [filters, setFilters] = useState<Filters>(EMPTY);

  const visible = items.filter((item) => matches(item, filters));
  const active = Object.values(filters).some(Boolean);

  const groups: { facet: Facet; label: string; options: string[] }[] = [
    { facet: "region", label: "Region", options: regions },
    { facet: "length", label: "Length", options: lengths },
    { facet: "level", label: "Level", options: levels },
  ];

  const toggle = (facet: Facet, value: string) =>
    setFilters((current) => ({ ...current, [facet]: current[facet] === value ? null : value }));

  return (
    <div>
      {/* Sticky from tablet up; on a phone three rows would cover a fifth of the screen. */}
      <div className="z-20 -mx-4 sm:sticky sm:top-16 border-b border-rule bg-paper/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5 sm:shadow-raised">
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-8">
          {groups.map(({ facet, label, options }) => (
            <div key={facet} role="group" aria-labelledby={`finder-${facet}`} className="flex min-w-0 items-center gap-3">
              <span id={`finder-${facet}`} className="w-14 shrink-0 text-xs font-semibold text-ink-500 lg:w-auto">
                {label}
              </span>
              <div className="-my-1 flex gap-1.5 overflow-x-auto py-1 [scrollbar-width:none]">
                {options.map((option) => {
                  const pressed = filters[facet] === option;
                  const count = items.filter(
                    (item) =>
                      matches(item, filters, facet) &&
                      (facet === "region" ? item.regions.includes(option) : item[facet] === option)
                  ).length;
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={pressed}
                      disabled={count === 0 && !pressed}
                      onClick={() => toggle(facet, option)}
                      className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                        pressed
                          ? "border-red-600 bg-red-600 text-paper"
                          : "border-rule bg-paper text-ink-900 hover:border-ink-900/40"
                      }`}
                    >
                      {option}
                      <span className={`tabular text-xs ${pressed ? "text-paper/80" : "text-ink-500"}`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex min-h-9 items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-ink-500">
          Showing <span className="tabular font-semibold text-ink-900">{visible.length}</span> of{" "}
          <span className="tabular">{items.length}</span> excursions
        </p>
        {active ? (
          <button
            type="button"
            onClick={() => setFilters(EMPTY)}
            className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-900"
          >
            <RotateCcw aria-hidden="true" size={14} strokeWidth={2} />
            Clear filters
          </button>
        ) : null}
      </div>

      {visible.length > 0 ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.slug}>{item.card}</li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex flex-col items-start gap-4 rounded-3xl border border-dashed border-rule p-10">
          <SearchX aria-hidden="true" size={28} strokeWidth={1.5} className="text-ink-500" />
          <p className="text-lg text-ink-900">No excursion matches all three filters.</p>
          <button
            type="button"
            onClick={() => setFilters(EMPTY)}
            className="text-sm font-semibold text-red-600 underline underline-offset-4 hover:text-red-900"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
