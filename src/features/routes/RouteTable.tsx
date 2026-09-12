import Link from "next/link";
import { StatusChip } from "@/components/StatusChip";
import { Evidence } from "@/components/Evidence";
import { ROUTES } from "@/features/routes/data";
import { formatDuration, publishedFigures } from "@/features/routes/publish";

/**
 * The one place in the design where visual boldness is spent. Everything
 * around it stays quiet.
 *
 * Every cell is driven by publishedFigures(), which returns null unless the
 * route has logged runs behind it. There is no branch that can print a number
 * we have not measured.
 */
export function RouteTable({ linkPublished = false }: { linkPublished?: boolean }) {
  return (
    <div className="surface-deep pm-reveal rounded-[var(--radius-data)] bg-petrol-deep text-chalk">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <caption className="sr-only">
            Route intelligence from Marrakech. Figures come from logged runs
            only; routes still being measured show &ldquo;Verification in
            progress&rdquo;.
          </caption>
          <thead>
            <tr className="border-b border-chalk/20">
              {["Route", "Distance", "Driving", "Door to door", "Status"].map(
                (heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-5 py-4 text-2xs font-medium uppercase tracking-[0.12em] text-hamada"
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {ROUTES.map((route) => {
              const figures = publishedFigures(route);
              const label = `${route.origin} → ${route.destination}`;
              return (
                <tr key={route.slug} className="border-b border-chalk/10 last:border-0">
                  <th scope="row" className="px-5 py-4 text-sm font-normal text-chalk">
                    {figures && linkPublished ? (
                      <Link href={`/routes/${route.slug}`} className="underline">
                        {label}
                      </Link>
                    ) : (
                      label
                    )}
                  </th>
                  <td className="tabular px-5 py-4 text-sm text-hamada">
                    {figures ? `${figures.distanceKm} km` : "—"}
                  </td>
                  <td className="tabular px-5 py-4 text-sm text-hamada">
                    {figures ? formatDuration(figures.movingMinutes) : "—"}
                  </td>
                  <td className="tabular px-5 py-4 text-sm text-hamada">
                    {figures ? formatDuration(figures.elapsedMinutes) : "—"}
                  </td>
                  <td className="px-5 py-4">
                    {figures ? (
                      <StatusChip
                        status="verified"
                        onDark
                        label={`Driven ${figures.sampleSize}×`}
                      />
                    ) : (
                      <StatusChip status="pending" onDark />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border-t border-chalk/20 px-5 py-5">
        <Evidence
          onDark
          note="Figures are the median of runs driven and logged by PM Travel drivers, and each row states how many runs it is drawn from. Driving time is wheels-moving; door to door includes stops. Nothing here is taken from a mapping service, supplier material, or recollection, and a route with no logged run publishes nothing."
        />
      </div>
    </div>
  );
}
