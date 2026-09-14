# PM Travel website — start here

Companion to the PM Travel Agency Website SOP v1.0 (12 September 2026).
Where the two disagree, the SOP wins.

## Run it locally

Requires Node 22+, npm 10+, Git.

```
npm install
cp .env.example .env.local     # set NEXT_PUBLIC_SITE_URL=http://localhost:3000
npm run dev                    # http://localhost:3000
```

Before pushing:

```
npm run verify:data    # evidence rule, metadata, disclosure boundary
npm run typecheck
npm run lint
npm run build
npm run check:a11y     # markup and accessibility, on the built site
npm run check:budget   # page weight, on the built site
```

All three must pass.

## The rules that constrain every change

### Never published
No phone number, no `tel:` link, no WhatsApp link. No RC, ICE, TVA, ODV
licence or IATA number. No statistics, counters, response-time promises,
case studies, testimonials, reviews, client names or logos. No awards,
memberships or "years of experience". No team members who are not real,
named, supplied people.

### The evidence rule
Never invent a distance, drive time, capacity, price, availability or policy.
When data is missing there are exactly three options:

1. show "Verification in progress";
2. leave it out;
3. leave the value `null` and add a `TODO(verify)` comment.

Do not fill a gap with a plausible value, not even in a draft, not even to see
the layout. A believable-looking drive time destroys the entire proposition.

Confidence levels: `high` needs a PM site visit, PM measurement or an official
government source plus a named verifier. A supplier's own website is `medium`
at best. `unverified` is the default for anything AI-generated.

### Company facts
They live in exactly one place: `src/lib/nav.ts`, exported as `COMPANY`.
Import them. Never retype them into a page.

## Design system

The full specification is `docs/REDESIGN-SOP.md`, adopted in
`docs/decisions.md` D4. `/styleguide` (noindex, not in the sitemap) shows every
token and component on one page. `src/app/globals.css` is the only file where a
hex value may appear.

| Token | Value | Use |
| --- | --- | --- |
| `red-900` | `#6E0F14` | oxblood: footer, dark sections, nav on scroll |
| `red-600` | `#C1272D` | primary: things you can click |
| `red-050` | `#FBEDEC` | tint: table headers, quiet backgrounds |
| `ink-900` | `#1B1517` | body text and headings |
| `ink-500` | `#6E6560` | secondary text, captions, meta |
| `paper` | `#FFFFFF` | default surface |
| `paper-2` | `#F5F2F0` | alternating section surface |
| `status-verified` | `#23704A` | verified status mark |
| `status-progress` | `#9A5B00` | in-progress status mark |
| `rule` | ink-900 at 10% | hairline borders |

Measured contrast: ink-900/paper 18.01, ink-900/paper-2 16.16, ink-500/paper
5.69, ink-500/paper-2 5.10, ink-500/red-050 4.99, red-600/paper 5.84,
red-600/paper-2 5.24, paper/red-600 5.84, paper/red-900 12.06, paper at
90%/red-900 9.95, status-verified/paper 6.02, status-progress/paper 5.43 — all
pass AA for normal text.

Forbidden: **red-600 text or marks on red-900 (2.07 — never)**. The status
green and amber do not go on red-900 either; `StatusChip` takes an `onDark`
prop that switches the marks to paper and keeps their shapes.

The interim token names from before the redesign (`chalk`, `hamada`, `petrol`,
`petrol-deep`, `oxide`, `ink`, `meta`, `line`, `line-soft`, `text-2xs`,
`radius-data`, and the button variant `accent`) were removed in Phase 8, once a
search found no page still using them. A class built on one of them now
renders nothing, so check new code against the table above.

Fonts: Archivo (variable) for headings, IBM Plex Sans 400/500 for body and UI.
Newsreader italic **only** inside `<Evidence>` — sources, verification dates,
confidence, methodology. The serif is the signal that information is verified.
That third family is a recorded exception to the SOP's two-family rule (D4).

Type scale (rem): 0.8125 / 0.9375 / 1 / 1.25 / 1.625 / 2.25 / 3.25 / 4.5 as
`text-xs` … `text-4xl`. Body line-height 1.6, headings 1.05–1.15, text blocks
under 68ch. Figures use `.tabular` (tabular, lining numerals), never a mono face.

Radius: `rounded-control` (4px) on buttons and inputs, `rounded-card` (8px) on
cards and panels, square full-bleed sections. Shadows: `shadow-raised` and
`shadow-overlay` only, for dropdown panels and the sticky bar — static cards
get a `border-rule` hairline instead.

Motion budget: the nav transition on scroll, dropdown open and close, and at
most one orchestrated moment per page (the route table's `.pm-reveal`).
Nothing else animates. Reduced motion removes all of it.

Forbidden typographic patterns: tracked-out ALL-CAPS eyebrow labels, one word
of a headline accented in red, `→` appended to button or link text, meta
strings joined with middle dots.

Forbidden visual patterns: glassmorphism, gradients, red glows or red shadows,
bento grids, lift-and-scale card hovers, heavy shadows, animation libraries,
any icon set other than `lucide-react`, scroll animation on sections, gold,
lanterns, spice-market clichés, stock photos of people, and any AI-generated
Morocco imagery or AI-generated people presented as staff.

## Structure

```
src/app/           pages, layout, globals.css, sitemap, robots, /api/health
src/components/    Container Section TextLink Button Card Field StatusChip Evidence BrandLogo SiteHeader SiteFooter PageIntro FaqSection
src/lib/nav.ts     COMPANY facts + navigation (single source of truth)
src/features/      rfq/ routes/ (more to follow: venues, destinations, ...)
docs/
```

Server Components by default. A Client Component needs a comment explaining
why. There are exactly two: `RfqForm` (progressive form, errors linked to
fields) and `SiteHeader` (marks the current page, closes the mobile panel and
the Operations and Destinations dropdowns on navigation, and is transparent over the home hero
photograph until the page scrolls - clear, never frosted). The header's links
come from `NAV_GROUPS` and `NAV_LINKS` in `src/lib/nav.ts`; the logo is
`BrandLogo`, a stroked PM monogram that inherits `currentColor`. Together they cost about 7KB gzipped over a pure-static page.

## Milestones

1. Foundation, design system, shell, 10 page shells, Docker, CI — **done**
2. Home, About, Contact with real content — **done**
3. RFQ end to end — **done** (needs DATABASE_URL, SMTP and S3 to run)
4. Route intelligence — **removed** (no /routes pages, drive logs or route data)
5. Venue intelligence — **system done**; publishing blocked on inspections
6. Destination pages — **done** (6 published)
7. SEO and answer-first content — **done**
8. Security, performance, QA — **done**
9. Production launch — **blocked**; run `npm run check:launch`

Finish one milestone. Report. Stop.

## Route intelligence (Milestone 4)

Removed. The site publishes no distances or drive times, and
`npm run check:launch` fails if one appears. `npm run verify:data` still
enforces the ban on phone numbers, `tel:` links and
`Review`/`AggregateRating`/`Offer`/`Event` schema in CI.

## Venue intelligence (Milestone 5)

Three levels of disclosure, enforced by types in `src/features/venues/`:
public (indexed), gated (sent to agents), internal (never leaves the office).

`PublicVenue` has no field that could hold a venue name, an exact capacity or a
rate. `toPublicVenue()` is the only way to build one, and it never spreads the
source record — so a field added to `VenueRecord` later is private by default.
`data.ts` is `server-only`. Capacities publish as bands (184 → "150–200"); the
exact figure is the commercial asset.

`verify:data` fails the build if a page references a gated or internal field,
or imports `VenueRecord` at all. See `docs/venue-inspection.md`.

## Destination pages (Milestone 6)

Six published: Marrakech, Agafay, Atlas, Essaouira, Merzouga, Fes. Each is
written individually — around 900–1,100 words of operational content, a
distinct buyer intent, answer-first FAQs and a path to the RFQ. **Never
generate these from a list.**

`src/features/destinations/registry.ts` drives the hub page and the sitemap. A
slug added there without a page produces a broken link rather than a thin one,
which is the intended failure mode.

The eleven further destinations are named on the hub as places we operate but
have not written up. They get pages when there is something to say, one at a
time.

## SEO and answer-first content (Milestone 7)

All twelve starting questions from the SOP are answered on the site, each in
answer-first form: the question as a heading, the answer in the first sentence,
supporting detail after.

Schema in use: `TravelAgency` (root layout), `Service` (`/morocco-dmc`, no
price or offer asserted), `FAQPage` (generated from the same array that renders
the visible questions), `BreadcrumbList` (destination and route pages, built
from the same array as the visible trail). Never `Review`, `AggregateRating`,
`Offer` or `Event` — `verify:data` fails the build on any of them.

`verify:data` also enforces, per page: a title that renders at 60 characters or
less *including* the brand suffix the layout template appends, a description of
155 or less, and a self-referencing canonical. A title that repeats the brand
fails, since the template already adds it.

## Security, performance and QA (Milestone 8)

Two gates run against the **built** site, both wired into CI after the build:

`check:a11y` boots the production server and checks all 16 pages plus a 404 for
one h1, heading order, image alt text, labelled form controls, duplicate ids,
`lang`, a `<main>` landmark, empty links, `target="_blank"` without
`rel="noopener"`, and any inline style the CSP would now block. It found two
real bugs on first run: the RFQ's select and file input were unlabelled,
because `Field` rendered a `<label for>` pointing at an id its custom children
never received. Fixed by turning children into a render prop.

`check:budget` measures gzipped weight per page, classifying assets by
extension rather than by the tag they appeared in — Next preloads JS chunks
with `<link href>`, which otherwise counts as stylesheet weight.

Current measurements, gzipped:

| | home | RFQ |
| --- | --- | --- |
| HTML | 9.3KB | 7.6KB |
| JavaScript | 172.4KB | 263.3KB |
| CSS | 5.1KB | 5.1KB |
| Fonts | 69.6KB | 69.6KB |
| **Total** | **256.5KB** | **345.6KB** |

Fonts were 169KB until this milestone: `Newsreader` was loading its upright
face as well as its italic, and `Evidence` only ever renders italic. Narrowing
both families to the faces and weights actually used saved ~100KB per page.

The home-page JavaScript figure does not meet the SOP's 120KB and cannot on
this stack — see **D3** in `docs/decisions.md`. It needs a decision.

CSP was tightened: `style-src 'self'` with no inline allowance, plus
`frame-src`, `worker-src`, `manifest-src`, `media-src` and
`upgrade-insecure-requests`. `script-src` keeps `'unsafe-inline'` as a recorded
trade-off — see **D2**.

## Launch readiness (Milestone 9)

```
npm run check:launch
```

Boots the built site and walks the SOP launch checklist, reporting every line
as PASS, FAIL, BLOCKED (needs work away from the keyboard) or MANUAL (needs a
person, a browser or production). It exits non-zero while anything is failing
or blocked, so "are we ready?" stops being a judgement made from memory.

Current state: **12 pass, 0 fail, 5 blocked, 5 manual.**

The five blocked lines are the business blockers below, not code. The five
manual lines need a real browser, real devices, production HTTPS, or an
external service.

Legal drafts for the lawyer are in `docs/legal-drafts/`. They are deliberately
**not** wired into the site: publishing an unreviewed privacy policy is itself
a compliance claim. What they do is record accurately what the site does with
data — no analytics, no cookies, no third-party embeds, and exactly one place
where personal data is collected — so the lawyer reviews facts rather than
inventing them. The largest open question in there is retention: nothing
currently deletes RFQ data.

## Brand assets

`src/app/icon.png` (96px), `apple-icon.png` (180px), `favicon.ico` (32px) and
`opengraph-image.png` / `twitter-image.png` (1200 x 630) are Next.js file
conventions, served at those paths and declared in every page's head.
`pageMetadata()` names the Open Graph image explicitly, because a page's
`openGraph` object replaces the root one. They were rendered in headless Chrome
from the `BrandLogo` monogram in paper on red-900, with the site's own fonts,
and exported as PNG so no colour value lives outside `globals.css`. To change
them, re-render at the same sizes; the ICO must embed an RGBA PNG or the build
fails.

## Images

The site carries no photographs yet, which is the largest single visual gap.
The plumbing is built and empty, the same way routes and venues are:
`src/features/images/registry.ts` is the record, `SiteImage` is the only way an
image reaches a page, and `verify:data` fails the build on an unrecorded image,
a plain `<img>`, or more than one priority image.

`pm-travel-photo-layout.html` is the brief to send a photographer. See
`docs/images.md`.

## Blockers (not code problems)

1. **Phone number** — two conflicting values supplied; one has 11 digits and
   Moroccan mobiles have 10. Nothing is published until it is confirmed.
2. **Legal identity** — registered name, RC, ICE, TVA, ODV licence.
3. **Route verification** — drive each route and log it; three minimum.
4. **Photography** — office, team, vehicles, real operations. No stock, no AI.
5. **Venue inspections** — measured capacities by layout, Marrakech first.

## The RFQ (Milestone 3)

Lives in `src/features/rfq/`.

| File | Does |
| --- | --- |
| `schema.ts` | Drizzle tables + the status and service-status enums |
| `validation.ts` | Zod schemas for steps 1–3 and the honeypot |
| `files.ts` | Upload validation by magic bytes, filename sanitisation |
| `storage.ts` | Private S3 put + short-lived signed read URLs |
| `email.ts` | Internal notification + sender acknowledgement |
| `rate-limit.ts` | Fixed-window limiter, IP hashing |
| `actions.ts` | The server action that ties it together |
| `RfqForm.tsx` | One of only two Client Components in the project |

Order of operations in `submitRfq`: honeypot → rate limit → Zod → magic-byte
file checks → database insert → status event → attachment upload → emails.
A request is stored before any email is attempted, so a mail failure can never
lose a commercial enquiry.

**Two things are deliberately not done.**

The acknowledgement email promises no response time, because we have not
measured ours. `rfq_status_events` records every transition with a timestamp
and an actor, and `first_responded_at` is the field the median will eventually
come from. Publish the number when it exists, not before.

The service-status enum (`requested`, `pending`, `option`, `held`, `confirmed`,
`cancelled`, `expired`, `estimated`) exists so that a quote can never present
an unconfirmed service as confirmed. Enforce it in the data, not in whoever is
writing the quote that afternoon.

### Database

```
DATABASE_URL=postgres://... npm run db:generate   # after changing schema.ts
DATABASE_URL=postgres://... npm run db:migrate    # apply to the environment
```

### Known limitation

`rate-limit.ts` holds its buckets in process memory, so the limit is per
container instance. With one instance that is the real limit; the moment the
app is scaled horizontally the effective limit multiplies. That is the point at
which a shared store becomes a proven need rather than a guess.
