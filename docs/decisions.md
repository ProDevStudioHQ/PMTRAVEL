# Decisions

Decisions that affect production, recorded because they will look arbitrary in
six months otherwise. Newest first.

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

`style-src` is now `'self'`: the site renders no inline `<style>` block and no
`style` attribute, verified on every page by `npm run check:a11y`.

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
