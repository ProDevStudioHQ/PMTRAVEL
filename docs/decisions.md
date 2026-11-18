# Decisions

Decisions that affect production, recorded because they will look arbitrary in
six months otherwise. Newest first.

---

## D7 — November 2026 rebuild: new brand, structure and contact policy

**Date:** 2026-11-17 · **Status:** accepted (business website brief, Nov 2026)

The business supplied a full website brief that supersedes D4/D5 and the
REDESIGN-SOP where they conflict:

1. **Brand.** Midnight #0E1A2B, Sand #F6F1EA, Terracotta #C4622D, Gold #C9A14A;
   Fraunces (headings) + Inter (body). The old token names (red-900, red-600,
   paper…) are kept as aliases in globals.css so pre-D7 pages re-skin.
   **Contrast:** #C4622D measures 4.09:1 with white, so it never carries small
   text. Filled CTAs use terracotta-600 #AD5327 (5.19:1); terracotta text on
   light uses terracotta-700 #9E4A20 (5.41:1 on sand). Gold is decorative on
   light surfaces (2.15:1) and only used as text on midnight (7.23:1).
2. **Motion.** Framer Motion is now allowed (brief requirement), loaded via
   LazyMotion with features fetched after hydration. The hero headline reveal
   and Ken Burns zoom are pure CSS so they never delay LCP. Everything respects
   prefers-reduced-motion. Home JS gate raised to 240KB (measured 228KB).
3. **Contact details are confirmed and published**: +212 762 455 472 (phone /
   WhatsApp), +212 524 347 213 (landline), opening hours, new office address.
   They live only in src/lib/company.ts; verify:data fails on a number retyped
   elsewhere.
4. **Trust claims** supplied by the business ("Quotes within 24h", "FIT to
   200+ pax", 5 languages) are editable in TRUST_POINTS. Licence number, year
   founded, testimonials and partner logos are **visible, marked placeholders**
   until supplied; verify:data stops a placeholder testimonial being marked real.
   Office geo coordinates are null (schema omits geo) until copied from the
   Google Business Profile.
5. **Structure.** /morocco-dmc, /mice, /how-we-work 301 to /b2b/dmc-services,
   /b2b/mice, /b2b. New: /experiences/*, /tours/*, /b2b/*, /journal/*,
   /gallery, /partner-login, /privacy, /terms, /cookies. Destination,
   programme and excursion pages are kept and linked as sample products.
6. **Forms.** One enquiries table (drizzle/0001_enquiries.sql) for quote,
   partner, contact and newsletter forms. Store first, then email
   b2b@ / contact@. With neither DATABASE_URL nor SMTP configured the form
   refuses and shows the email/WhatsApp fallback — it never fakes success.
   Partner Login has no backend yet and says so.
7. **Google Map** on /contact: CSP frame-src allows google.com; the iframe
   loads only after cookie consent or a click.
8. **Canonical origin** is always https://pm-travelagency.com.
9. **Legal pages are published from the drafts' facts but have NOT been
   reviewed by a lawyer.** That review is a launch blocker.

---

## D6 — No contact form, and no "by when" in the RFQ confirmation

**Date:** 2026-09-12 · **Status:** accepted; the contact form is a separate
backend task if the business wants it

1. **No contact form on /contact.** SOP Phase 7 asks for one. The site has a
   single storage path for enquiries, the RFQ record. A general message form
   would either rely on email alone - silently lost whenever SMTP is not
   configured, which the RFQ action deliberately refuses to do - or need a new
   table, migration and server action, which is backend work outside a design
   pass. /contact routes buyers to the two email addresses and the RFQ form.
2. **No "by when".** SOP 3.6 asks the confirmation to say what happens next
   and by when. What happens next is shown, from the same three-step list as
   the page aside (`RFQ_NEXT_STEPS`). By when would be a response-time promise
   we have not measured (AGENT-PROMPTS hard stop 10).
3. **Entries survive a failed submission.** React resets a `<form action>`
   after every submission, which wiped a buyer's entries when validation
   failed. The RFQ form now dispatches from `onSubmit` and keeps `action` on
   the form for submission without JavaScript. An error reopens the step it
   belongs to. The server action and its validation are unchanged.
4. **Required fields say "(required)"** in the label text instead of a bare
   asterisk, and schema error wording is replaced with plain instructions.
5. **Time zone.** /contact states Morocco time - GMT+1, GMT+0 during Ramadan -
   a public fact about the country. Operating hours remain unpublished.

---

## D5 — The active nav link is underlined in paper, not red-600

**Date:** 2026-09-12 · **Status:** accepted

SOP 3.1 marks the active route with a 2px red-600 underline. The bar that
underline sits on is red-900 once the page scrolls, and a darkened photograph
over the hero. red-600 on red-900 measures 2.07:1, under the 3:1 minimum for a
non-text indicator, so the active state would all but vanish in exactly the
place it is needed. The header underlines the active link in paper instead,
still 2px and still paired with `aria-current="page"`. In the mobile drawer,
which is a paper surface, the active link keeps the red-600 underline the SOP
asks for (5.84:1).

---

## D4 — The redesign SOP replaces the earlier design system

**Date:** 2026-09-12 · **Status:** accepted by the business ("use your
recommendations")

`docs/REDESIGN-SOP.md` is now the design specification. It supersedes the
mineral palette of D1, the garnet interim palette, and the per-card tones and
scroll reveal added to the home page just before it. Where the SOP and the
standing rules in `AGENT-PROMPTS.md` disagreed, these calls were made:

1. **Palette.** The SOP tokens (`red-900`, `red-600`, `red-050`, `ink-900`,
   `ink-500`, `paper`, `paper-2`) plus two status colours the SOP's table spec
   implies but does not define: `status-verified #23704A` (6.02:1 on paper)
   and `status-progress #9A5B00` (5.43:1). Every pair measured; figures in
   `START.md`. One disagreement with the SOP: it says red-600 on white passes
   for large text only. Measured at 5.84:1 it passes AA for normal text too.
2. **Fonts.** Archivo and IBM Plex Sans as specified, plus Newsreader italic
   kept inside `<Evidence>` only. The serif is the site's marker of verified
   information (AGENT-PROMPTS hard stop 5); dropping it to satisfy a
   two-family rule would remove a signal the business depends on.
3. **Icons.** `lucide-react` is allowed, as the SOP lists it. It is the only
   icon set; the standing "no icon library" default is amended to say so.
4. **Phone, WhatsApp, licence number, ICE, operating hours.** Still
   unconfirmed, so still never published (hard stops 2 and 3). Where the SOP
   asks for them, the code carries a `CONTENT NEEDED` comment and **nothing
   renders** — no visible empty slot, no placeholder text. The "which channel
   is fastest" line is omitted as a response-time promise (hard stop 10).
5. **Contact map.** An "Open in maps" link rather than an embedded map. An
   embed would need `frame-src` opened in the CSP and a third-party request on
   a page that currently makes none.
6. **Token migration.** Old token names are kept as aliases onto the new
   tokens while pages are rebuilt phase by phase, so every intermediate commit
   builds and renders. The aliases were deleted in Phase 8, after a search found no
   remaining use.

---

## D3 — The home-page JavaScript budget cannot be met on this stack

**Date:** 2026-09-12 · **Status:** open, needs a call from the business

The SOP sets home-page JavaScript at **under 120KB gzipped**. Measured, the
home page ships **172.4KB gzipped**, across seven chunks.

None of that weight is ours. The home page has **zero Client Components**, and
the bundle was searched for leaked server libraries — `drizzle`, `nodemailer`,
the AWS SDK, `zod`, `pg` — and is clean. 172KB is the Next 16 / React 19 App
Router client runtime on a page that is entirely static.

The options are:

1. **Accept ~172KB** and revise the SOP figure. The runtime is cached across
   navigations, total page weight is 254KB against a 900KB budget, and the
   pages are statically prerendered.
2. **Change the stack** to one that can ship a content page with no framework
   runtime — Astro, or plain templates. That is a rewrite, and it would cost
   the RFQ form's progressive behaviour.

Taken for now: option 1, with `npm run check:budget` gating at 180KB so a
regression still fails the build. The gate prints the discrepancy on every run
rather than hiding it.

---

## D2 — CSP keeps `'unsafe-inline'` for scripts, and drops it for styles

**Date:** 2026-09-12 · **Status:** accepted

**Amended 2026-09-12, when photography was added.** `style-src` now allows
inline styles again. `next/image` sets positioning and object-fit through a
`style` attribute on every rendered image, so `'self'` alone silently broke
every photograph on the site — they loaded, but unpositioned. The a11y gate
caught it on the first run after the images landed.

The allowance is kept narrow: no user-supplied content is ever rendered, and
`verify:data` fails the build if our own JSX hand-writes a `style` attribute,
so the only inline styles reaching a page are the framework's own.

`script-src` keeps `'unsafe-inline'`. Next injects inline bootstrap and
RSC-payload scripts whose content differs per page, so no hash list covers
them. The alternative is a per-request nonce, which requires middleware and
forces every page out of static prerendering — paying LCP on a content site to
mitigate a risk already closed by other means:

- there is no third-party script on the site, and no third-party origin is
  allowed to load one;
- no user-supplied content is ever rendered as HTML;
- every JSON-LD block is built from a developer-authored object, never from
  input.

**Revisit if** the site renders user-supplied content, or moves to dynamic
rendering for another reason.

Also tightened in the same pass: `frame-src 'none'`, `worker-src 'self'`,
`manifest-src 'self'`, `media-src 'self'`, `upgrade-insecure-requests`, and
`blob:` removed from `img-src`.

---

## D1 — The palette was changed from the original brief

**Date:** before Milestone 1 · **Status:** accepted

The first brief specified terracotta `#D97757` and brass `#B08D57` on ivory.
Measured, those are 2.77:1 and 2.74:1 — they fail accessibility for text at any
size. That combination is also the most common auto-generated colour scheme in
web design at the moment, which conflicts with the instruction not to look
templated.

Replaced with the mineral palette recorded in `START.md`, every pair measured.
Any further change needs a written decision here and a fresh contrast check.
