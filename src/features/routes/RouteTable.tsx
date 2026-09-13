import Link from "next/link";
import type { ReactNode } from "react";
import { StatusChip } from "@/components/StatusChip";
import { Evidence } from "@/components/Evidence";
import { ROUTES } from "@/features/routes/data";
import { formatDuration, publishedFigures } from "@/features/routes/publish";

const COLUMNS = ["Route", "Distance", "Driving", "Door to door", "Status"] as const;
const FIGURE_TERMS = ["Distance", "Driving", "Door to door"] as const;

/**
 * An empty figure: a dash to the eye, words to assistive technology. The SOP
 * asks for aria-label on the dash; a plain span's aria-label is ignored by
 * several screen readers, so the words are carried as visually hidden text.
 */
function NotMeasured() {
  return (
    <>
      <span aria-hidden="true">&mdash;</span>
      <span className="sr-only">not yet measured</span>
    </>
  );
}

/**
 * Route intelligence (SOP 2.5 and 3.5): the one place the design spends its
 * boldness. It reads as an instrument panel - a red-900 band with the
 * published count, a sticky header, tabular figures, a status column and the
 * method stated underneath.
 *
 * Every figure comes from publishedFigures(), which returns null unless the
 * route has enough logged runs behind it. There is no branch that can print a
 * number we have not measured.
 */
export function RouteTable({ linkPublished = false }: { linkPublished?: boolean }) {
  const rows = ROUTES.map((route) => {
    const figures = publishedFigures(route);
    return {
      route,
      figures,
      label: `${route.origin} to ${route.destination}`,
      values: figures
        ? [
            `${figures.distanceKm} km`,
            formatDuration(figures.movingMinutes),
            formatDuration(figures.elapsedMinutes),
          ]
        : [null, null, null],
    };
  });
  const publishedCount = rows.filter((row) => row.figures).length;

  // The footnote has to be true for the table it sits under, including a table
  // with no published row yet.
  const method =
    publishedCount === 0
      ? "No route has enough logged runs to publish yet, so every figure in this table is still empty. When a route does, it shows the median of runs driven and logged by PM Travel drivers, with the number of runs beside it. Driving time is wheels-moving; door to door includes stops. Nothing here comes from a mapping service, supplier material, or recollection."
      : "Figures are the median of runs driven and logged by PM Travel drivers, and each published row states how many runs it is drawn from. A route without enough logged runs publishes nothing. Driving time is wheels-moving; door to door includes stops. Nothing here comes from a mapping service, supplier material, or recollection.";

  const routeName = (row: (typeof rows)[number]): ReactNode =>
    row.figures && linkPublished ? (
      <Link
        href={`/routes/${row.route.slug}`}
        className="text-red-600 underline underline-offset-4 hover:text-red-900"
      >
        {row.label}
      </Link>
    ) : (
      row.label
    );

  const status = (row: (typeof rows)[number]) =>
    row.figures ? (
      <StatusChip status="verified" label={`Driven ${row.figures.sampleSize}×`} />
    ) : (
      <StatusChip status="pending" />
    );

  return (
    <div className="pm-reveal">
      {/* The instrument band. paper on red-900: 12.06:1. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-t-2xl bg-red-900 px-6 py-4 text-paper">
        <p className="font-display text-lg font-semibold">From Marrakech</p>
        <p className="tabular text-sm text-paper/90">
          {publishedCount} of {rows.length} routes published
        </p>
      </div>

      {/* From sm up: the table, with a header that stays under the 64px site bar. */}
      <div className="hidden border-x border-rule sm:block">
        <table className="w-full border-separate border-spacing-0 text-left">
          <caption className="sr-only">
            Route intelligence from Marrakech. Figures come from logged runs only;
            routes still being measured show Verification in progress.
          </caption>
          <thead>
            <tr>
              {COLUMNS.map((heading, index) => (
                <th
                  key={heading}
                  scope="col"
                  className={`sticky top-16 z-10 border-t border-paper/15 bg-red-900 px-6 py-3 text-sm font-medium text-paper ${
                    index > 0 && index < 4 ? "text-right" : ""
                  }`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.route.slug} className="odd:bg-paper even:bg-paper-2">
                <th scope="row" className="px-6 py-3 text-base font-medium text-ink-900">
                  {routeName(row)}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={FIGURE_TERMS[index]}
                    className="tabular px-6 py-3 text-right text-base text-ink-900"
                  >
                    {value ?? <NotMeasured />}
                  </td>
                ))}
                <td className="px-6 py-3">{status(row)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Below sm: stacked definition rows instead of a sideways-scrolling table. */}
      <ul className="border-x border-rule sm:hidden">
        {rows.map((row) => (
          <li key={row.route.slug} className="border-b border-rule px-5 py-4 odd:bg-paper even:bg-paper-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-base font-medium text-ink-900">{routeName(row)}</p>
              {status(row)}
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-3">
              {row.values.map((value, index) => (
                <div key={FIGURE_TERMS[index]}>
                  <dt className="text-xs text-ink-500">{FIGURE_TERMS[index]}</dt>
                  <dd className="tabular text-base text-ink-900">{value ?? <NotMeasured />}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      {/* The method, always visible. ink-500 on red-050: 4.99:1. */}
      <div className="rounded-b-2xl border border-t-0 border-rule bg-red-050 px-6 py-4">
        <Evidence note={method} />
      </div>
    </div>
  );
}
