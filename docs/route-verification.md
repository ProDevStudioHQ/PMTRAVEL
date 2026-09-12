# Route verification

This is fieldwork. It takes longer than the code, and no amount of building
replaces it. Nothing appears on `/routes` until it is done.

## The rule

A route publishes figures only when at least **two runs** have been driven by a
named PM Travel driver and logged. Not from a mapping service. Not from a
supplier. Not from memory. One run is a data point, not a measurement.

Published figures are the **median** across logged runs, so a single atypical
journey cannot drag the number, and the sample size is always shown beside it.

## What to record on every run

Fill in all of it. A run missing the driver's name or the odometer readings is
discarded by `publish.ts` and will not count towards the two.

| Field | Meaning |
| --- | --- |
| `drivenOn` | ISO date, e.g. `2026-10-04` |
| `driver` | Full name. An anonymous run is not evidence. |
| `vehicle` | Exact vehicle. Distance is the same; a coach over a pass is not. |
| `distanceKm` | Odometer end minus odometer start. Not an estimate. |
| `movingMinutes` | Wheels turning, excluding planned stops. |
| `elapsedMinutes` | Total door to door, including stops. |
| `departedAt` | Local time of departure, e.g. `08:15`. |
| `conditions` | Weather, roadworks, closures, traffic — anything atypical. |
| `notes` | Optional. Stops used, facilities, anything an operator needs. |

Record moving time and elapsed time separately. The difference between them is
most of what an operator actually needs to plan a day, and it is the one thing
a mapping service cannot tell them.

## Recording a completed run

Add the log to the route in `src/features/routes/data.ts`:

```ts
{
  slug: "marrakech-agafay",
  origin: "Marrakech",
  destination: "Agafay",
  driveLogs: [
    {
      drivenOn: "2026-10-04",
      driver: "<full name>",
      vehicle: "<vehicle>",
      distanceKm: 0,        // odometer end minus start
      movingMinutes: 0,
      elapsedMinutes: 0,
      departedAt: "08:15",
      conditions: "<conditions>",
    },
  ],
  // ...
}
```

Nothing else needs editing. The moment a route reaches two usable logs its
figures appear in the table, its page at `/routes/<slug>` starts being built,
and it enters the sitemap. There is no separate "publish" switch, and no field
anywhere to type a distance into by hand — `RouteRecord` has no such field, and
`npm run verify:data` fails the build if one is added.

## The nine target routes

From Marrakech: Agafay, Essaouira, Ouarzazate, Dades, Merzouga, Fes,
Casablanca, Rabat, Tangier.

`/routes` is treated as complete at **three** verified routes, not nine. Start
with the three that appear most often in the itineraries you are actually being
asked to quote.

## Re-verification

Evidence is never overwritten. A new run is appended and supersedes the old one
for the purpose of the median; the old log stays in the file as the record of
what was true then. Any route whose most recent run is more than twelve months
old is flagged by `needsReverification()` and should be re-driven.
