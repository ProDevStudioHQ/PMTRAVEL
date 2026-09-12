# Venue inspection

The second flagship asset, and for high-value buyers probably the more valuable
of the two. Researching venue specifications is the hardest single stage of
event sourcing, and it is hard because the published numbers are unreliable.

## Why we measure rather than collect

Ask three Morocco suppliers for a capacity and you will get three numbers, all
theatre-style, none accounting for service access or sightlines. That is not
usually dishonesty — nobody measured, and the figure has been repeated until it
became a fact.

A supplier's own website is **medium** confidence at best, never high. If a
camp's site says 52 tents, that stays medium until someone from PM Travel has
been there and counted.

## The three levels

The split is enforced by types in `src/features/venues/`, not by care.

| Level | Contains | Where it lives |
| --- | --- | --- |
| **Public** | Venue type, destination, access, coach considerations, parking, indoor/outdoor, weather risk, wet-weather plan, transfer logistics, seasonality, capacity **bands**, inspection date | `PublicVenue`, built only by `toPublicVenue()` |
| **Gated** | Named venue, exact capacity by layout, floor plans, AV detail, breakout rooms, operational notes, backup venue | `VenueRecord`, sent to agents directly |
| **Internal** | Rates, terms, release periods, allotments, supplier performance, incident history, negotiation notes | `VenueRecord.internal`, never leaves the office |

`PublicVenue` has no field that could hold a name, an exact capacity or a rate.
`toPublicVenue()` builds it field by field and never spreads the source record,
so a field added to `VenueRecord` later is private by default rather than
published by accident.

`data.ts` imports `server-only`, so pulling the record into a Client Component
fails the build instead of shipping rates to a browser. `npm run verify:data`
fails if a page references a gated or internal field, or imports `VenueRecord`.

### Capacity is published as a band

184 measured is published as "150–200". The exact figure is the commercial
asset and the thing a competitor would lift; the band is what a planner needs
to decide whether the venue is worth a conversation.

## What to record on an inspection

| Field | Notes |
| --- | --- |
| `inspectedOn` | ISO date |
| `inspector` | Full name. An unattributed inspection is not evidence. |
| `measuredCapacities` | Per layout: the count **and** what limited it — floor area, exits, sightlines or service access |
| `accessNotes`, `parking`, `coachAccess` | Turning space matters as much as spaces |
| `av` | What is actually in the room, not what can be hired in |
| `weatherPlan` | An outdoor venue with no stated wet-weather plan is an unpriced risk |
| `noiseRestrictions`, `curfew`, `permits` | The things that surface late and cost money |
| `backupVenue` | What we would move to. Gated, never published. |
| `confidence` | `high` only for a PM site visit with a named inspector |

Measure every layout you are likely to be asked for. A capacity in one layout
tells a planner almost nothing about another, which is exactly the gap that
makes this data worth having.

## Where to start

The Marrakech venues that appear most often in the briefs you are actually
asked to quote. Not the most photogenic, and not a complete database — the site
is designed to publish venues one at a time as they are inspected.

## Re-inspection

Evidence is never overwritten. A new inspection is appended and supersedes the
previous one for publication; the old record stays. `needsReinspection()` flags
anything whose most recent inspection is more than twelve months old.
