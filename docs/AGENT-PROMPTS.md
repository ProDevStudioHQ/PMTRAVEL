# Rules for AI agents working in this repository

Paste this into any agent session before it touches the code.

## Hard stops

These are not style preferences. Breaking one damages the business.

1. **Never invent an operational fact.** No distance, drive time, capacity,
   price, availability, cancellation policy, licence number, statistic,
   review, testimonial, client name or supplier capability. Not in a draft.
   Not in a mockup. Not "just so we can see the layout".
   Missing data gets `null` + a `TODO(verify)` comment, or the string
   "Verification in progress", or it is left out.
2. **Never add a phone number**, `tel:` link or WhatsApp link. The number is
   unconfirmed. Two conflicting values were supplied.
3. **Never add a legal identifier** — registered entity name, RC, ICE, TVA,
   ODV licence, IATA. None is confirmed.
4. **Never add statistics, counters, case studies, testimonials, reviews,
   client names or logos.** There is no `/case-studies` page and no statistics
   section. Do not create them.
5. **Never use the serif font outside `<Evidence>`.** Newsreader marks
   verified information. Decorative use destroys the signal.
6. **Never put oxide text on petrol-deep.** It measures 2.43:1. Use the
   `onDark` variants.
7. **Never generate pages in bulk from a list.** A page earns a URL only with
   400+ words of unique operational content, a verified data point where
   applicable, a distinct buyer intent and a path to the RFQ. Otherwise it is
   a section on a parent page.
8. **Never commit `.env` or `.env.local`.** Secrets go in environment
   variables only — never in code, the Docker image, the repo, or build logs.
9. **Never add a schema type we cannot back**: no `Review`,
   `AggregateRating`, `Offer` or `Event`. `FAQPage` only when the questions
   are visibly on the page. `Article` only with a real named author.
10. **Never promise a response time.** We have not measured ours yet.

## Defaults

- Server Components. A Client Component needs a comment saying why.
- Company facts come from `COMPANY` in `src/lib/nav.ts`. Never retyped.
- Reuse `Container`, `Button`/`ButtonLink`, `Card`, `StatusChip`,
  `Evidence`, `SiteHeader`, `SiteFooter`, `PageIntro`. Do not rebuild them.
- No icon library, no animation library, no third-party script without a
  documented reason.
- Every page: unique title ≤60 chars **as rendered**, i.e. including the
  " | PM Travel Agency" suffix the layout template appends — do not repeat the
  brand in a page title. Description ≤155 chars, a self-referencing canonical,
  one `h1`, correct heading order, a sitemap entry and internal links.
  `verify:data` enforces all of these.
- FAQs go through `FaqSection`, which generates the FAQPage schema from the
  same array it renders. Never hand-write FAQ schema.
- Breadcrumbs go through `Breadcrumbs`, same principle.
- Zod validation on every server boundary. Parameterised queries only.
- Status is never carried by colour alone.
- Run `npm run verify:data && npm run typecheck && npm run lint && npm run build`
  before reporting anything as done.
- Destination pages are written one at a time, by hand, and registered in
  `src/features/destinations/registry.ts`. A page needs 400+ words of genuine
  operational content before it gets a URL.
- Route figures come from `driveLogs` only. `RouteRecord` has no distance or
  duration field, and `verify:data` fails the build if one is added. To publish
  a route, add logged runs — see `docs/route-verification.md`.

## Scope discipline

Finish one milestone, report, and stop. Do not jump ahead.

Not being built, at all: CRM, live inventory, hotel or transport APIs, a quote
engine, supplier marketplace, supplier or client portal, AI agents, vector or
graph databases, microservices, Redis (unless a real need is proven),
automatic supplier scoring, public statistics.

## When something is missing

Leave it empty, flag it, or create a verification task. Never fabricate.
If a page looks sparse without numbers, that is the intended design.
