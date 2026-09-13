/**
 * Import drive logs.
 *
 * Reads data/drive-logs.csv (one row per driven run, filled in by drivers or
 * the operations desk), validates every row, and writes
 * src/features/routes/drive-logs.ts. Nothing is written if any row is invalid,
 * so a half-filled spreadsheet can never put a wrong number on the site.
 *
 *   npm run import:drive-logs
 *
 * Columns:
 *   route            route slug, e.g. marrakech-agafay (see the list printed on error)
 *   drivenOn         date driven, YYYY-MM-DD
 *   driver           full name of the driver
 *   vehicle          exact vehicle, e.g. "Mercedes Sprinter 17 seats"
 *   odometerStartKm  odometer at departure
 *   odometerEndKm    odometer at arrival
 *   movingTime       wheels turning, excluding stops: minutes (95) or H:MM (1:35)
 *   doorToDoorTime   total including stops: minutes or H:MM
 *   departedAt       local departure time, HH:MM
 *   conditions       weather, roadworks, traffic, anything atypical ("normal" is fine)
 *   notes            optional: stops used, facilities
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

// Overridable so the importer can be tested without touching the real files.
const CSV = process.env.DRIVE_LOGS_CSV ?? "data/drive-logs.csv";
const OUT = process.env.DRIVE_LOGS_OUT ?? "src/features/routes/drive-logs.ts";
const MIN_LOGS = 2;

const routeSlugs = [...readFileSync("src/features/routes/data.ts", "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

/** Minimal RFC 4180 parser: commas, quotes and escaped quotes. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

/** Minutes from "95" or "1:35". */
function toMinutes(value) {
  const v = value.trim();
  if (/^\d+$/.test(v)) return Number(v);
  const m = v.match(/^(\d+):([0-5]\d)$/);
  return m ? Number(m[1]) * 60 + Number(m[2]) : NaN;
}

if (!existsSync(CSV)) {
  console.error(`${CSV} not found.`);
  process.exit(1);
}

const [header, ...rows] = parseCsv(readFileSync(CSV, "utf8").replace(/^﻿/, ""));
const expected = ["route", "drivenOn", "driver", "vehicle", "odometerStartKm", "odometerEndKm", "movingTime", "doorToDoorTime", "departedAt", "conditions", "notes"];
const columns = header.map((h) => h.trim());
const missing = expected.filter((name) => name !== "notes" && !columns.includes(name));
if (missing.length) {
  console.error(`${CSV} is missing columns: ${missing.join(", ")}`);
  process.exit(1);
}
const col = (row, name) => (row[columns.indexOf(name)] ?? "").trim();

const errors = [];
const logs = {};

rows.forEach((row, index) => {
  const line = index + 2; // header is line 1
  const problems = [];
  const route = col(row, "route");
  const drivenOn = col(row, "drivenOn");
  const driver = col(row, "driver");
  const vehicle = col(row, "vehicle");
  const start = Number(col(row, "odometerStartKm"));
  const end = Number(col(row, "odometerEndKm"));
  const moving = toMinutes(col(row, "movingTime"));
  const elapsed = toMinutes(col(row, "doorToDoorTime"));
  const departedAt = col(row, "departedAt");
  const conditions = col(row, "conditions");
  const notes = col(row, "notes");

  if (!routeSlugs.includes(route)) problems.push(`unknown route "${route}"`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(drivenOn) || Number.isNaN(Date.parse(drivenOn))) problems.push(`drivenOn "${drivenOn}" is not YYYY-MM-DD`);
  else if (Date.parse(drivenOn) > Date.now()) problems.push(`drivenOn ${drivenOn} is in the future`);
  if (driver.split(/\s+/).filter(Boolean).length < 2) problems.push("driver needs a full name");
  if (!vehicle) problems.push("vehicle is empty");
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) problems.push("odometer end must be greater than start");
  if (Number.isFinite(start) && Number.isFinite(end) && end - start > 1500) problems.push(`distance ${end - start} km looks wrong`);
  if (!Number.isFinite(moving) || moving <= 0) problems.push(`movingTime "${col(row, "movingTime")}" must be minutes or H:MM`);
  if (!Number.isFinite(elapsed) || elapsed <= 0) problems.push(`doorToDoorTime "${col(row, "doorToDoorTime")}" must be minutes or H:MM`);
  if (Number.isFinite(moving) && Number.isFinite(elapsed) && elapsed < moving) problems.push("door-to-door time cannot be shorter than moving time");
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(departedAt)) problems.push(`departedAt "${departedAt}" must be HH:MM`);
  if (!conditions) problems.push('conditions is empty (write "normal" if nothing unusual)');

  if (problems.length) {
    errors.push(`line ${line}: ${problems.join("; ")}`);
    return;
  }
  (logs[route] ??= []).push({
    drivenOn,
    driver,
    vehicle,
    distanceKm: Math.round((end - start) * 10) / 10,
    movingMinutes: moving,
    elapsedMinutes: elapsed,
    departedAt,
    conditions,
    ...(notes ? { notes } : {}),
  });
});

if (errors.length) {
  console.error(`Drive log import FAILED - nothing was written. Fix ${CSV}:\n`);
  console.error(errors.map((e) => `  - ${e}`).join("\n"));
  console.error(`\nValid routes: ${routeSlugs.join(", ")}`);
  process.exit(1);
}

for (const list of Object.values(logs)) list.sort((a, b) => a.drivenOn.localeCompare(b.drivenOn));
const ordered = Object.fromEntries(routeSlugs.filter((slug) => logs[slug]).map((slug) => [slug, logs[slug]]));

const file = `/**
 * GENERATED FILE - do not edit by hand.
 *
 * Built from ${CSV} by \`npm run import:drive-logs\`, which
 * validates every row first. To add a run, add a row to the CSV and run the
 * import. See docs/route-verification.md.
 */
import type { DriveLog } from "./types";

export const DRIVE_LOGS: Record<string, DriveLog[]> = ${JSON.stringify(ordered, null, 2)};
`;
writeFileSync(OUT, file);

console.log(`Imported ${rows.length} run(s) into ${OUT}.\n`);
for (const slug of routeSlugs) {
  const count = logs[slug]?.length ?? 0;
  const state = count >= MIN_LOGS ? "PUBLISHES figures" : count ? `needs ${MIN_LOGS - count} more run(s)` : "no runs yet";
  console.log(`  ${slug.padEnd(24)} ${String(count).padStart(2)} run(s)  ${state}`);
}
console.log("\nRebuild the site to see the figures: npm run build");
