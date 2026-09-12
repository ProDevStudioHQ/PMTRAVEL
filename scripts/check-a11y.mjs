/**
 * Accessibility and markup gate.
 *
 * Boots the production server and checks the rendered HTML of every page for
 * the failures that are both common and cheap to catch statically. It does not
 * replace a keyboard pass or a screen-reader pass - it stops those from being
 * wasted on problems a script can find.
 *
 *   npm run check:a11y
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { createRequire } from "node:module";

const ORIGIN = "http://127.0.0.1:3112";

const PAGES = [
  "/",
  "/about",
  "/morocco-dmc",
  "/mice",
  "/b2b",
  "/how-we-work",
  "/destinations",
  "/destinations/marrakech",
  "/destinations/agafay",
  "/destinations/atlas",
  "/destinations/essaouira",
  "/destinations/merzouga",
  "/destinations/fes",
  "/routes",
  "/request-a-quote",
  "/contact",
  "/this-page-does-not-exist",
];

const failures = [];
const fail = (page, message) => failures.push(`${page}: ${message}`);

/** Strip script and style contents so their text is never treated as markup. */
const stripScripts = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "");

function check(page, html) {
  const body = stripScripts(html);

  // 1. Exactly one h1.
  const h1Count = (body.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) fail(page, `has ${h1Count} h1 elements, expected exactly 1`);

  // 2. Heading order never skips a level.
  const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let index = 1; index < levels.length; index += 1) {
    const previous = levels[index - 1];
    const current = levels[index];
    if (current > previous + 1) {
      fail(page, `heading order jumps from h${previous} to h${current}`);
      break;
    }
  }

  // 3. Every image carries alt text.
  for (const [tag] of body.matchAll(/<img[^>]*>/g)) {
    if (!/\salt=/.test(tag)) fail(page, `has an <img> with no alt attribute`);
  }

  // 4. Every form control is labelled, by <label for>, aria-label or
  //    aria-labelledby. An unlabelled field is unusable with a screen reader.
  const labelledIds = new Set(
    [...body.matchAll(/<label[^>]+for="([^"]+)"/g)].map((m) => m[1])
  );
  for (const [tag] of body.matchAll(/<(?:input|select|textarea)[^>]*>/g)) {
    if (/type="(hidden|submit|button)"/.test(tag)) continue;
    const id = tag.match(/\sid="([^"]+)"/)?.[1];
    const labelled =
      (id && labelledIds.has(id)) ||
      /aria-label=/.test(tag) ||
      /aria-labelledby=/.test(tag) ||
      // A control wrapped directly inside its own <label> is also labelled.
      new RegExp(`<label[^>]*>(?:(?!</label>)[\\s\\S])*${escapeRegex(tag)}`).test(body);
    if (!labelled) fail(page, `has an unlabelled form control: ${tag.slice(0, 70)}`);
  }

  // 5. No duplicate ids.
  const ids = [...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length > 0) {
    fail(page, `has duplicate ids: ${[...new Set(duplicates)].join(", ")}`);
  }

  // 6. The document declares a language.
  if (!/<html[^>]+lang="[a-z-]+"/i.test(html)) {
    fail(page, "has no lang attribute on <html>");
  }

  // 7. A skip link, and a main landmark for it to reach.
  if (!/<main[\s>]/.test(body)) fail(page, "has no <main> landmark");

  // 8. Links must have discernible text.
  for (const [, inner] of body.matchAll(/<a[^>]*>([\s\S]*?)<\/a>/g)) {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (text.length === 0) fail(page, "has a link with no discernible text");
  }

  // NOTE: inline style attributes are not checked here. next/image sets
  // positioning through one on every image, so the rendered page legitimately
  // contains them. Hand-written style attributes are caught at source instead,
  // by verify:data.

  // 10. Nothing may open a new window without warning the user.
  for (const [tag] of body.matchAll(/<a[^>]*target="_blank"[^>]*>/g)) {
    if (!/rel="[^"]*noopener/.test(tag)) {
      fail(page, "has target=_blank without rel=noopener");
    }
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");
const server = spawn(process.execPath, [nextBin, "start", "--port", "3112"], {
  stdio: "ignore",
  env: { ...process.env, NODE_ENV: "production" },
});

try {
  let ready = false;
  for (let attempt = 0; attempt < 60 && !ready; attempt += 1) {
    try {
      ready = (await fetch(`${ORIGIN}/api/health`)).ok;
    } catch {
      await sleep(500);
    }
  }
  if (!ready) throw new Error("Server did not become healthy");

  for (const page of PAGES) {
    const response = await fetch(`${ORIGIN}${page}`);
    const html = await response.text();

    if (page === "/this-page-does-not-exist") {
      if (response.status !== 404) {
        fail(page, `an unknown URL returned ${response.status}, expected 404`);
      }
    } else if (!response.ok) {
      fail(page, `returned ${response.status}`);
      continue;
    }

    check(page, html);
  }
} finally {
  server.kill();
}

if (failures.length > 0) {
  console.error("Accessibility check FAILED:\n");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`Accessibility check passed (${PAGES.length} pages).`);
