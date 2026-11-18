/**
 * Refreshes src/content/fallback-site.json from the CRM's GET /site.
 *
 * Runs automatically before every build ("prebuild" in package.json), so the
 * snapshot the site falls back to when the CRM is down is never older than the
 * last deploy. If the CRM does not answer, or answers with something that does
 * not look like a /site payload, the existing file is kept and the build goes on.
 *
 *   CRM_API_URL=... CRM_API_KEY=... node scripts/pull-fallback.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const OUT = new URL("../src/content/fallback-site.json", import.meta.url);
const base = (process.env.CRM_API_URL ?? "").trim().replace(/\/+$/, "");
const key = process.env.CRM_API_KEY;

const keep = (reason) => {
  console.warn(`[pull-fallback] ${reason} - keeping the existing fallback-site.json`);
  process.exit(0);
};

if (!base || !key) keep("CRM_API_URL or CRM_API_KEY not set");

/** Same top-level checks the site's Zod schema makes, without importing TypeScript. */
function looksLikeSite(data) {
  const s = data?.settings;
  return (
    typeof s?.siteName === "string" &&
    typeof s?.emails?.b2b === "string" &&
    typeof s?.phones?.whatsapp === "string" &&
    typeof data?.topBar?.enabled === "boolean" &&
    Array.isArray(data?.topBar?.items) &&
    Array.isArray(data?.nav?.items) &&
    Array.isArray(data?.nav?.buttons) &&
    Array.isArray(data?.footer?.columns) &&
    Array.isArray(data?.footer?.legalLinks) &&
    typeof data?.footer?.copyright === "string"
  );
}

try {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  const res = await fetch(`${base}/site`, { headers: { "x-api-key": key, Accept: "application/json" }, signal: controller.signal });
  clearTimeout(timer);
  if (!res.ok) keep(`CRM answered HTTP ${res.status}`);
  const data = await res.json();
  if (!looksLikeSite(data)) keep("CRM response does not match the /site contract");
  // A scheduled announcement is time-bound; never freeze one into the fallback.
  data.topBar.announcement = null;
  const next = JSON.stringify(data, null, 2) + "\n";
  if (next === readFileSync(OUT, "utf8")) {
    console.log("[pull-fallback] fallback-site.json already up to date");
  } else {
    writeFileSync(OUT, next);
    console.log("[pull-fallback] fallback-site.json updated from the CRM");
  }
} catch (error) {
  keep(`could not reach the CRM (${error instanceof Error ? error.message : error})`);
}
