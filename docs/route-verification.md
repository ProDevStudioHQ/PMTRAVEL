# Route verification

This is fieldwork. It takes longer than the code, and no amount of building
replaces it. Nothing appears on `/routes` until it is done.

## The rule

A route publishes figures only when at least **two runs** have been driven by a
named PM Travel driver and logged. Not from a mapping service. Not from a
supplier. Not from memory. One run is a data point, not a measurement.

Published figures are the **median** across logged runs, so a single atypical
journey cannot drag the number, and the sample size is always shown beside it.

## How to record runs: the spreadsheet

Drivers and the operations desk fill in **`data/drive-logs.csv`**. It opens in
Excel, Google Sheets or Numbers. Add **one row per run**; never delete old rows.

| Column | What to write | Example |
| --- | --- | --- |
| `route` | The route code from the list below | `marrakech-agafay` |
| `drivenOn` | Date driven, year-month-day | `2026-10-04` |
| `driver` | Driver's full name | `Youssef El Amrani` |
| `vehicle` | Exact vehicle | `Mercedes Sprinter 17 seats` |
| `odometerStartKm` | Odometer when leaving | `128450` |
| `odometerEndKm` | Odometer on arrival | `128492` |
| `movingTime` | Wheels turning, without stops: minutes or H:MM | `0:52` |
| `doorToDoorTime` | Total including stops: minutes or H:MM | `1:05` |
| `departedAt` | Departure time, 24-hour | `08:15` |
| `conditions` | Weather, roadworks, traffic, or `normal` | `normal, light traffic` |
| `notes` | Optional: stops used, facilities | `coffee stop at Tahannaout` |

The example values above only show the format; they are not measurements.

Then run:

```bash
npm run import:drive-logs
npm run build
```

The import checks every row: a real route code, a valid date that is not in the
future, a driver's full name, odometer end greater than start, door-to-door time
not shorter than moving time, and a departure time. **If any row is wrong,
nothing is imported** and the command lists every line to fix. When it
succeeds, it prints how many runs each route has and which routes now publish.

The moment a route reaches two valid runs, its figures replace "Verification in
progress" in the route table, on the destination pages and on the home page, its
page at `/routes/<slug>` is built, and it enters the sitemap. There is no
separate publish switch, and no field anywhere to type a distance by hand —
`RouteRecord` has no such field, and `npm run verify:data` fails the build if one
is added to `src/features/routes/data.ts`.

Record moving time and door-to-door time separately. The difference between them
is most of what an operator actually needs to plan a day, and it is the one thing
a mapping service cannot tell them.

## The target routes

From Marrakech, in priority order:

| Route code | Why |
| --- | --- |
| `marrakech-agafay` | B2B programmes and excursions |
| `marrakech-imlil` | B2B programmes and excursions |
| `marrakech-ourika` | B2B programmes and excursions |
| `marrakech-essaouira` | Destination page |
| `marrakech-ouarzazate` | Destination page |
| `marrakech-dades` | Destination page |
| `marrakech-merzouga` | Destination page |
| `marrakech-fes` | Destination page |
| `marrakech-casablanca` | Destination page |
| `marrakech-rabat` | Destination page |
| `marrakech-tangier` | Destination page |

`/routes` is treated as complete at **three** verified routes. Start with
Agafay, Imlil and Ourika: they are the legs behind every programme and excursion
currently on sale.

## Re-verification

Evidence is never overwritten. A new run is appended and supersedes the old one
for the purpose of the median; the old row stays in the spreadsheet as the record
of what was true then. Any route whose most recent run is more than twelve months
old is flagged by `needsReverification()` and should be re-driven.
