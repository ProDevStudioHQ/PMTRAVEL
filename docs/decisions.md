# Decisions

Decisions that affect production, recorded because they will look arbitrary in
six months otherwise. Newest first.

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
   builds and renders. The aliases are deleted in Phase 8.

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
