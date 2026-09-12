# Images

The site currently carries **zero photographs**, and that is the only reason it
looks plain. The design system is not the problem — the two reference templates
that look rich are roughly 80% photography, with no styling trick behind it.

## The rule, and where it is enforced

> If an image has no row in the record, it does not go on the website.

That is not kept in a spreadsheet here, because a spreadsheet cannot fail a
build. It is enforced in three places:

| Enforced by | What it stops |
| --- | --- |
| `src/features/images/registry.ts` | An image with no licence, creator, alt text or proof |
| `src/components/SiteImage.tsx` | Rendering an image that has no record |
| `npm run verify:data` | A file in `public/images/` with no record; a plain `<img>` tag; more than one priority image |

`SiteImage` also refuses to render licensed stock where `operational` is set —
premises, staff, vehicles, a live programme. Presenting bought photography as
your own operation is the one thing this site's proposition cannot survive.

## Adding a photograph

1. Optimise it and put it in `public/images/`.
2. Add a record to `IMAGES` in `src/features/images/registry.ts`, including the
   licence and a reference to the proof.
3. Render it with `<SiteImage imageKey="..." />`. Never a plain `<img>`.

Width and height come from the record, so nothing shifts while loading, and alt
text cannot be forgotten.

### Alt text

Describe what is in the image, for someone who cannot see it.

- Good: *"PM Travel minibus at the entrance of a Marrakech hotel, driver loading luggage"*
- Bad: *"Morocco travel DMC transfer service Marrakech tour operator"*

Accessibility first. Keyword stuffing there is both useless and wrong.

## Sources, in priority order

1. **PM Travel original** — best, and the only option for anything operational
2. **Licensed professional** — destination scenery
3. **Official tourism assets (ONMT)** — written permission naming the specific
   images. "It is a government site" is not a licence.
4. **Properly licensed stock** — last resort, scenery only

Never mixed: licensed scenery is fine for destinations, and never acceptable
for anything that implies it is ours.

**Banned outright:** stock people presented as our staff or clients; any
AI-generated image of Morocco; AI-generated people presented as employees; any
image without a recorded licence; anything lifted from Google Images,
Pinterest, a competitor, or a supplier site without written permission.

## Technical

| | |
| --- | --- |
| Hero | 2400px wide, under 200KB, 21:9 or 16:9 |
| Destination lead | 3:2 |
| Cards | 800px wide, under 80KB, 4:3 |
| Portraits | 600px wide, under 60KB, 1:1 or 4:5 |
| Format | AVIF and WebP — `next/image` handles this |

Keep high-resolution originals archived separately. They must never be sent to
a browser.

Only the **single hero image** is priority-loaded; `verify:data` fails if more
than one record sets `priority`. Everything else lazy-loads.

### One thing to do when the first image lands

Install `sharp` (`npm install sharp`) so Next optimises images in production,
and confirm the Docker build still succeeds — on Alpine it occasionally needs
`libc6-compat`. It is deliberately **not** installed yet: adding an unused
native dependency to a deployment that has only just started working would be
a poor trade.

Check the page weight afterwards with `npm run check:budget`. The 900KB total
budget has roughly 640KB of headroom today.

## The shot list

`pm-travel-photo-layout.html` — open it in a browser and send it to the
photographer. Every hatched block is one photograph with its brief inside it.

Group A (operational and team) is worth more than Groups B and C combined,
because nobody else can take it. If budget covers only one half day, shoot
**A1, A2, A3, A5** — office, team, a vehicle, an airport meet.

## Why this matters more than a redesign

Every competitor uses the same postcard scenery. Almost none show their own
vehicles, their own staff, their own operations. Scenery proves you know
Morocco is beautiful; the buyer already knows that, because he sells it.
Operational photography proves you can run it.

It is the same principle as the route data: the value is not that the
photographs are beautiful. The value is that they are yours, and true.
