# PM Travel Agency — Full Site Redesign SOP

**For:** Claude Opus running in Claude Code (VS Code)
**Repo:** PM Travel Agency website (Next.js App Router)
**Goal:** Rebuild the visual layer of the entire site to a premium agency standard, in a red identity, without changing or inventing any operational content.

Save this file in the repo as `docs/REDESIGN-SOP.md` and point Claude Code at it.

---

## 0. Rules that override everything else

These are non-negotiable. Violating any one of them fails the job regardless of how the site looks.

1. **Never invent route data.** The route intelligence tables must stay empty until real logged runs exist. Empty cells and "Verification in progress" are the product, not a placeholder to fill in.
2. **Never invent capability, clients, testimonials, awards, team members, statistics, years-in-business, or "trusted by" logos.** If a section design needs content that does not exist, leave a clearly marked `{/* CONTENT NEEDED: ... */}` comment and build the empty state instead.
3. **Preserve existing copy** unless this SOP names a specific line to change. The writing is strong; this is a design job, not a rewrite.
4. **No new dependencies** beyond what is listed in §4 without asking first.
5. **Work in phases, commit after each phase**, and run `npm run build` before every commit. A phase that does not build does not get committed.
6. Do not touch `.env`, deployment config, or any data-fetching logic that feeds the route tables.

---

## 1. Phase 0 — Audit before touching anything

Before writing code, produce a short written report in the chat covering:

- Next.js version, App Router or Pages Router, TypeScript or JavaScript.
- Styling system in use (Tailwind? CSS Modules? styled-components?) and its config file.
- Full route inventory from the `app/` or `pages/` directory.
- Where shared layout lives (header, footer, metadata).
- Where page copy lives — hard-coded in components, or in a data/content directory.
- Any existing design tokens, and whether `next/font` is already used.
- The three worst structural problems you find.

Then wait for confirmation before Phase 1.

**Known bugs to fix during the rebuild:**

- `og:url` is hard-coded to the homepage on every page. It must be per-page canonical.
- No `og:image` exists. Add one.
- The homepage and `/routes` footnote says "each row states how many runs it is drawn from" while every row is empty. Reword the empty state so it is true when there is no data.
- `/routes` lists nine routes but says "3 to go". Make the target count and the row count agree.
- Site is served from `pmtravel.digitalstudiolf.online` while contact emails are `@pm-travelagency.com`. Flag this; do not attempt to fix it in code.
- The two hero buttons have different labels but the same destination. Give them different destinations or merge them into one.

---

## 2. Design direction

The brief specifies red. Red here is not a generic brand accent — it is **Marrakech**, the red city, where the pisé walls are ochre-red by regulation. Anchor the palette on the deep flag-red of Morocco rather than on the soft terracotta that every AI-generated travel site reaches for.

### 2.1 Colour tokens

Define these once as CSS custom properties on `:root` and map them into Tailwind's theme. No other hex values anywhere in the codebase.

```css
--red-900: #6E0F14;   /* oxblood — footer, dark sections, nav on scroll */
--red-600: #C1272D;   /* primary — buttons, active states, key rules */
--red-050: #FBEDEC;   /* tint — table headers, quiet section backgrounds */
--ink-900: #1B1517;   /* body text, headings (warm black, not #111) */
--ink-500: #6E6560;   /* secondary text, captions, meta */
--paper:   #FFFFFF;   /* default surface */
--paper-2: #F5F2F0;   /* alternating section surface */
```

Rules:

- Red is structural, not decorative. It carries actions, active navigation state, and the one deep section per page. It does not tint every card, icon and border.
- No red gradients, no red glows, no red drop shadows.
- Large red areas use `--red-900`; `--red-600` is reserved for things you can click.
- Check every red/white text pair for WCAG AA. `--red-600` on white passes for large text only — body copy on red must use `--red-900` as the background.

### 2.2 Typography

Two families, loaded through `next/font/google` with `display: 'swap'` and subsetting.

- **Display / headings:** Archivo (variable). Tight tracking at large sizes, weight 600–700. Its slightly industrial, squared character suits a ground-operations company better than a luxury serif.
- **Body / UI:** IBM Plex Sans, weights 400 and 500.
- **Numbers in data tables:** IBM Plex Sans with `font-variant-numeric: tabular-nums lining-nums`. Do **not** use a monospace face for data labels — it is a visual cliché and it is not needed for alignment.

Type scale (rem, 1rem = 16px): `0.8125 / 0.9375 / 1 / 1.25 / 1.625 / 2.25 / 3.25 / 4.5`. Headings use the top three, body the middle.

Body line length stays under 72 characters. Body line-height 1.6, headings 1.05–1.15.

**Forbidden typographic patterns** (they read as templated):

- Tracked-out ALL-CAPS eyebrow labels above headings.
- Accenting one word in a headline in red.
- `→` appended to button or link text.
- Meta strings joined with middle dots.

### 2.3 Layout and structure

- Content max-width 1200px; text-only blocks max-width 68ch. Left-aligned throughout — do not centre body copy.
- Baseline spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px. Section vertical rhythm 96px desktop, 64px mobile.
- Border radius: 4px on inputs and buttons, 8px on cards, 0 on full-bleed sections. One radius per element class — do not round everything the same amount.
- Shadows: at most two levels, both subtle and warm-tinted (`rgba(27,21,23,.08)`), used only for elevation that means something (dropdown panel, sticky bar). No shadow on static cards; use a 1px `--ink-900/10` border instead.
- Structural devices must encode information. Numbered markers only where content is genuinely a sequence (the drive-log process, the quote flow). Status dots and a status column on data tables, because status is real information there.

### 2.4 Motion

One orchestrated moment per page at most. Nav transition on scroll and dropdown open/close are the only motion that should exist site-wide. No fade-and-slide-up on every section. Respect `prefers-reduced-motion` globally.

### 2.5 The one bold element

Spend the boldness on the **route intelligence table**. It is the company's actual differentiator and it should look like an instrument panel: deep red header band, tabular figures, a live status column, visible measurement methodology. Everything around it stays quiet. Do not spread that intensity across the rest of the site.

---

## 3. Component specifications

### 3.1 Navigation bar

- Sticky, full width, `z-50`.
- Two states: transparent with white text over the hero image; on scroll past 80px, animates to a solid `--red-900` bar with a 1px bottom rule. Transition 200ms, `ease-out`, on background and text colour only.
- Left: wordmark. Right: primary links + one filled `--red-600` CTA button ("Request a quote").
- **Dropdown panels with background:** "Operations" and "Destinations" open a full-width panel anchored under the bar — solid `--paper` surface, one soft shadow, 24px padding, a 2–3 column grid of links each with a title and a one-line description. Panel opens on hover *and* on click/Enter, closes on Escape and on focus leaving the panel.
- Accessibility: `aria-expanded` and `aria-controls` on the trigger, `role="menu"` on the panel, arrow-key navigation between items, visible `:focus-visible` ring in `--red-600` at 2px offset. A hover-only dropdown is a fail.
- Mobile: full-screen drawer sliding from the right, accordion sections for the dropdown groups, CTA pinned to the bottom, body scroll locked while open.
- Active route gets a 2px `--red-600` underline, not a colour change alone.

### 3.2 Footer

- Background `--red-900`, text `--paper` at 90% opacity, headings at 100%.
- Four columns desktop, stacked mobile: **Operations** (existing link list) · **Company** (About, How We Work, Contact) · **Contact** · **Working languages**.
- Icons: `lucide-react` only, 18px, `stroke-width: 1.5`, inline with text and `aria-hidden="true"` since every icon sits beside its own label. Use: `MapPin` for the Gueliz address, `Mail` for both email addresses, `Phone` and `MessageCircle` for phone/WhatsApp, `Globe` for languages, `Clock` for operating hours.
- Bottom bar separated by a 1px `--paper/15` rule: copyright, "By Prestige Majestic Project & Events", and a slot for the **Moroccan travel agency licence number and ICE** — mark it `{/* CONTENT NEEDED */}` if not supplied.
- Social icons only for accounts that actually exist. Do not add placeholder LinkedIn/Instagram links.

### 3.3 Buttons

Three variants only: `primary` (filled `--red-600`, white text), `secondary` (1px `--ink-900` border, transparent), `ghost` (text with underline on hover). Consistent 44px minimum tap target. Label states the action: "Request a quote", not "Submit".

### 3.4 Cards

One card component with variants for service, destination and capability. 1px border, no shadow, 24px padding, hover changes only the border colour to `--red-600`. No lift-and-scale hover on every card.

### 3.5 Data table (route intelligence)

- Sticky header band in `--red-900` with white text.
- Zebra rows using `--paper-2`, 12px vertical padding.
- Status column: small filled dot + label. Green for verified, amber ring for in progress, grey for not available.
- Empty cells render an em dash with `aria-label="not yet measured"`, never a blank.
- Horizontal scroll on mobile with a visible scroll affordance, or collapse to stacked definition rows below 640px.

### 3.6 Forms (quote + contact)

- Labels above fields, always visible. No placeholder-as-label.
- Field states: default, focus (2px `--red-600` ring), error (border + message below, with `aria-describedby`), disabled.
- Error text explains what to fix in plain language. Success state replaces the form with a confirmation that says what happens next and by when.
- Required fields marked in the label text, not with a bare asterisk.
- Honeypot field for spam. No CAPTCHA.

---

## 4. Allowed dependencies

- `lucide-react` — icons
- `clsx` or `tailwind-merge` — class composition
- `next/font` — already part of Next.js

Everything else requires approval. No UI kit, no animation library, no icon font.

---

## 5. Page build order and specification

Build in this order. One phase per group, commit after each.

### Phase 1 — Foundation
Tokens, fonts, Tailwind theme, base typography, button/card/input primitives, focus styles, reduced-motion handling. Build a `/styleguide` route (excluded from sitemap and `noindex`) showing every token and component so the system can be reviewed in one screen before any page is built.

### Phase 2 — Shell
Navbar with dropdowns, footer, mobile drawer, layout wrapper, metadata helper that sets a correct per-page `canonical` and `og:url`.

### Phase 3 — Homepage
Hero with the Erg Chebbi image (dark overlay for text contrast, not a blur), the eight operations cards, the route intelligence preview table, the capability list, the closing quote CTA. The capability list keeps its honest "Not available" rows — style them clearly rather than hiding them.

### Phase 4 — Core operations pages
`/morocco-dmc`, `/mice`, `/b2b`. Each needs a distinct hero treatment so they do not read as the same template three times. Four of the homepage's eight cards currently point at `/morocco-dmc`; either give those services real anchor sections on that page and link to the anchors, or reduce the card count.

### Phase 5 — Route intelligence
`/routes` — the instrument-panel treatment from §2.5, the drive-log fields section, the FAQ block marked up with `FAQPage` structured data.

### Phase 6 — Supporting pages
`/destinations`, `/how-we-work`, `/about`.

### Phase 7 — Conversion pages
`/contact` and `/request-a-quote`.

**`/contact` must include:** the Gueliz office address with an embedded map (lazy-loaded, not blocking), both email addresses as `mailto:` links, a phone number and WhatsApp link, stated operating hours and time zone (GMT+1), a short contact form, and a line telling trade buyers which channel gets the fastest response. If phone/WhatsApp numbers are not supplied, mark them `{/* CONTENT NEEDED */}` and build the layout around them.

**`/request-a-quote` must be:** a multi-step form matching the existing copy — step one takes company name, dates, destinations, traveller numbers and brief; later steps are optional. Show a step indicator. Persist entered values when moving between steps.

### Phase 8 — Edges and polish
404 page, loading states, empty states, `sitemap.ts`, `robots.ts`, `og:image`, `Organization` and `TravelAgency` structured data, favicon set.

---

## 6. Quality bar — verify before declaring done

Run through this list explicitly and report the result of each item.

**Performance**
- Lighthouse ≥ 95 performance, ≥ 95 accessibility, 100 best practices, 100 SEO, on mobile emulation.
- All images through `next/image` with correct `sizes`; hero has `priority`.
- CLS under 0.05. Fonts loaded with `display: swap` and a matched fallback metric to prevent shift.
- No layout shift when the navbar changes state on scroll.

**Accessibility**
- Keyboard-only walkthrough of every page, including the dropdown, the mobile drawer and both forms.
- Visible focus on every interactive element.
- One `h1` per page, no skipped heading levels.
- Colour contrast AA on all text, including white on `--red-600` and `--red-900`.
- `prefers-reduced-motion` removes all non-essential animation.

**Responsive**
- Checked at 360, 390, 768, 1024, 1280, 1536 and 1920px. No horizontal scroll at any width.
- Tap targets ≥ 44px.

**Consistency**
- Zero hard-coded hex values outside the token file.
- Zero arbitrary spacing values outside the scale.
- Every page uses the same section rhythm.

---

## 7. Self-critique gate

After Phase 3 and again at the end, stop and answer in writing:

1. If I removed the red, would this design still be distinguishable from any other B2B travel site? If no, the red is doing the work that structure and typography should be doing — fix it.
2. Which single element is the memorable one on each page? If the answer is "the cards", the page has no focal point.
3. What would I remove if I could only remove one thing? Remove it.
4. Does any section exist because the layout felt empty rather than because the content needed it? Cut it.

---

## 8. Kickoff prompt

Paste this into Claude Code to start:

> Read `docs/REDESIGN-SOP.md` in full before doing anything.
>
> Then run Phase 0: audit the repo and report back on stack, routes, styling system, where copy lives, and the three worst structural problems you find. Do not write any code yet — wait for my go-ahead.
>
> Two constraints I want you to repeat back to me so I know you have them: you never invent route data or any other operational claim, and you commit after each phase only once `npm run build` passes.

For each subsequent phase:

> Proceed to Phase N. Follow the specification in `docs/REDESIGN-SOP.md` exactly. When you finish, run the build, list what you changed, and tell me anything in the SOP you disagreed with and why.
