/**
 * Launch readiness.
 *
 * Walks the SOP launch checklist and reports every line as one of:
 *
 *   PASS     verified automatically, here, now
 *   FAIL     verified automatically, and it is wrong
 *   BLOCKED  cannot pass until someone does work off the keyboard
 *   MANUAL   a person has to check this, on real hardware or in production
 *
 * "Do not share the website until EVERY line is true." This script cannot make
 * that judgement for you - it can only stop you making it from memory.
 *
 *   npm run check:launch
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { createRequire } from "node:module";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ORIGIN = "http://127.0.0.1:3113";
const results = [];

const record = (status, item, detail = "") =>
  results.push({ status, item, detail });

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (["node_modules", ".next", ".git"].includes(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if ([".ts", ".tsx"].includes(extname(entry))) files.push(full);
  }
  return files;
}

const sourceText = walk("src")
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");
const server = spawn(process.execPath, [nextBin, "start", "--port", "3113"], {
  stdio: "ignore",
  env: { ...process.env, NODE_ENV: "production" },
});

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
  "/request-a-quote",
  "/programmes",
  "/programmes/taste-of-marrakech",
  "/programmes/atlas-agafay-escape",
  "/programmes/trek-and-taste-atlas",
  "/excursions",
  "/excursions/agafay-quad-camel-sunset",
  "/excursions/ourika-valley-ebike",
  "/destinations/casablanca",
  "/destinations/ait-ben-haddou",
  "/contact",
];

try {
  let ready = false;
  for (let attempt = 0; attempt < 60 && !ready; attempt += 1) {
    try {
      ready = (await fetch(`${ORIGIN}/api/health`)).ok;
    } catch {
      await sleep(500);
    }
  }
  if (!ready) throw new Error("Server did not start");

  const rendered = new Map();
  for (const page of PAGES) {
    const response = await fetch(`${ORIGIN}${page}`);
    rendered.set(page, { status: response.status, html: await response.text() });
  }
  const allHtml = [...rendered.values()].map((page) => page.html).join("\n");

  // --- No phone number anywhere ---
  const phone = /href="tel:|wa\.me|api\.whatsapp\.com|\+212[\s-]?\d|\b0[5-7]\d{8}\b/;
  record(
    phone.test(allHtml) || phone.test(sourceText) ? "FAIL" : "PASS",
    "No phone number anywhere"
  );

  // --- No legal identifiers ---
  const identifiers = /\bRC\s*[:n°]|\bICE\s*[:n°]?\s*\d|\bTVA\s*[:n°]?\s*\d|\bIATA\s*[:n°]?\s*\d/i;
  record(
    identifiers.test(allHtml) ? "FAIL" : "PASS",
    "No licence, RC, ICE or TVA number anywhere"
  );

  /*
   * No statistics, reviews, testimonials or client names.
   *
   * Matched structurally, not lexically. An earlier version looked for the
   * word "testimonial" and failed on /about, which says "There are no
   * testimonials, because we will not publish a client's words without written
   * permission" - a sentence that is the opposite of a violation. What follows
   * looks for the shapes these things take: rating markup, quoted praise with
   * an attribution, and counters.
   */
  const socialProof = [
    { pattern: /"@type":\s*"(Review|AggregateRating)"/i, label: "review schema" },
    { pattern: /aggregateRating|ratingValue|reviewCount/i, label: "rating markup" },
    { pattern: /<blockquote[\s\S]{0,600}?<cite[\s>]/i, label: "an attributed quotation" },
    // Tested against visible text only: layout classes such as aspect-[4/5]
    // otherwise read as "4/5" and fail the check on a card's shape.
    { pattern: /★|&#9733;|\b[1-5](\.\d)?\s*(?:out of|\/)\s*5\b/i, label: "a star rating", visibleOnly: true },
    {
      pattern: /\b\d[\d,]*\+?\s*(?:happy|satisfied|delighted)\s*(?:clients?|customers?|travellers?)\b/i,
      label: "a client counter",
    },
    {
      pattern: /\b\d[\d,]*\+?\s*(?:countries|travellers|groups|programmes|clients)\s+(?:served|handled|delivered)\b/i,
      label: "an operations counter",
    },
    { pattern: /\b(?:trusted by|our clients include|as featured in)\b/i, label: "a client-name claim" },
    { pattern: /\b(?:award-winning|leading|number one|#1)\s+(?:morocco\s+)?(?:dmc|operator|agency)\b/i, label: "a ranking claim" },
    { pattern: /\b\d+\+?\s*years?\s+of\s+experience\b/i, label: "an experience claim" },
  ];
  const visibleText = allHtml
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  const proofHits = socialProof
    .filter(({ pattern, visibleOnly }) => pattern.test(visibleOnly ? visibleText : allHtml))
    .map(({ label }) => label);
  record(
    proofHits.length > 0 ? "FAIL" : "PASS",
    "No statistics, reviews, testimonials or client names",
    proofHits.length ? `found: ${proofHits.join(", ")}` : ""
  );

  // --- No invented distances or drive times ---
  const inventedFigure = /\b\d{2,4}\s*km\b|\b\d+\s*h(?:ours?)?\s*\d*\s*m(?:ins?)?\b/i;
  const figureOnSite = inventedFigure.test(allHtml);
  record(
    figureOnSite ? "FAIL" : "PASS",
    "No invented distances or drive times anywhere",
    figureOnSite ? "figures present - remove any we have not measured" : "no figures published"
  );

  // --- Real office photograph on /about ---
  const aboutHtml = rendered.get("/about")?.html ?? "";
  record(
    /<img[^>]+src="[^"]+"/.test(aboutHtml) ? "PASS" : "BLOCKED",
    "Real office photograph on /about",
    "no photography supplied yet"
  );

  // --- Legal identity confirmed and displayed, or omitted entirely ---
  record(
    identifiers.test(allHtml) ? "MANUAL" : "PASS",
    "Legal identity displayed, or omitted entirely",
    "currently omitted, and stated as pending on /about"
  );

  // --- Infrastructure ---
  const sitemap = await fetch(`${ORIGIN}/sitemap.xml`);
  const sitemapBody = await sitemap.text();
  record(
    sitemap.ok && sitemapBody.includes("<urlset") ? "PASS" : "FAIL",
    "/sitemap.xml loads",
    `${(sitemapBody.match(/<url>/g) ?? []).length} URLs`
  );

  const robots = await fetch(`${ORIGIN}/robots.txt`);
  const robotsBody = await robots.text();
  record(
    robots.ok && robotsBody.includes("Sitemap:") ? "PASS" : "FAIL",
    "/robots.txt loads"
  );

  const missing = await fetch(`${ORIGIN}/no-such-page`);
  record(missing.status === 404 ? "PASS" : "FAIL", "A wrong URL shows a proper 404");

  const health = await fetch(`${ORIGIN}/api/health`);
  const healthBody = await health.json();
  record(
    healthBody.status === "ok" ? "PASS" : "FAIL",
    "/api/health returns status ok"
  );

  // --- Security headers ---
  const headers = (await fetch(`${ORIGIN}/`)).headers;
  const required = [
    "content-security-policy",
    "strict-transport-security",
    "x-content-type-options",
    "referrer-policy",
  ];
  const absent = required.filter((header) => !headers.get(header));
  record(
    absent.length === 0 ? "PASS" : "FAIL",
    "Security headers present",
    absent.length ? `missing: ${absent.join(", ")}` : "CSP, HSTS, nosniff, Referrer-Policy"
  );

  // --- No env file committed ---
  record(
    !existsSync(".env") || !existsSync(".git") ? "PASS" : "MANUAL",
    "No .env file in the repository",
    existsSync(".git") ? "git present - CI also checks this" : "not a git repository yet"
  );

  // --- Legal pages ---
  const legalPages = ["/privacy", "/terms", "/cookies"];
  const legalPresent = [];
  for (const page of legalPages) {
    const response = await fetch(`${ORIGIN}${page}`);
    if (response.ok) legalPresent.push(page);
  }
  record(
    legalPresent.length === legalPages.length ? "PASS" : "BLOCKED",
    "Privacy policy, terms and cookie notice published",
    `drafts are in docs/legal-drafts/ and need a lawyer before publishing (GDPR, Law 09-08, CNDP)`
  );

  // --- RFQ end to end ---
  const rfqConfigured = Boolean(process.env.DATABASE_URL && process.env.SMTP_HOST);
  record(
    rfqConfigured ? "MANUAL" : "BLOCKED",
    "RFQ tested end to end from an outside address",
    rfqConfigured
      ? "credentials present - run the test in docs/deployment.md step 6"
      : "needs DATABASE_URL, SMTP and S3 in the environment"
  );

  record("BLOCKED", "Database backup running, and one restore tested", "needs the production database");
  record("MANUAL", "HTTPS working, http redirects to https", "production only");
  record("MANUAL", "Lighthouse performance and accessibility 95+", "needs a real browser; npm run check:a11y and check:budget cover part of it");
  record("MANUAL", "No errors in the browser console", "needs a real browser");
  record("MANUAL", "Tested in Chrome, Safari, Firefox, iPhone and Android", "needs real devices");
  record("MANUAL", "Google Business Profile matches the website address", "external service");
} finally {
  server.kill();
}

const ICON = { PASS: "PASS   ", FAIL: "FAIL   ", BLOCKED: "BLOCKED", MANUAL: "MANUAL " };
const order = { FAIL: 0, BLOCKED: 1, MANUAL: 2, PASS: 3 };
results.sort((a, b) => order[a.status] - order[b.status]);

console.log("\nLAUNCH READINESS\n");
for (const { status, item, detail } of results) {
  console.log(`  ${ICON[status]}  ${item}`);
  if (detail) console.log(`           ${detail}`);
}

const counts = results.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] ?? 0) + 1 }), {});
console.log(
  `\n  ${counts.PASS ?? 0} pass, ${counts.FAIL ?? 0} fail, ${counts.BLOCKED ?? 0} blocked, ${counts.MANUAL ?? 0} manual\n`
);

if (counts.FAIL) {
  console.error("NOT READY: automated checks failed.\n");
  process.exit(1);
}
if (counts.BLOCKED) {
  console.error(
    "NOT READY: blocked items need work away from the keyboard. Do not share the site.\n"
  );
  process.exit(1);
}
console.log("All automated checks pass. The MANUAL lines still need a person.\n");
