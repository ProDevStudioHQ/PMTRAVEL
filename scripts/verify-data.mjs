/**
 * Data integrity gate. Runs in CI, before the build.
 *
 * The evidence rule is the most important rule in the project and it is the
 * easiest one to break by accident, months from now, when someone is trying to
 * make a table look finished. This script makes breaking it fail the build
 * rather than reach production.
 *
 *   npm run verify:data
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const failures = [];
const fail = (file, message) => failures.push(`${file}: ${message}`);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if ([".ts", ".tsx"].includes(extname(entry))) files.push(full);
  }
  return files;
}

const sourceFiles = walk("src");

// 1. Phone numbers and WhatsApp links are confirmed (docs/decisions.md D7)
//    but live in exactly one place, src/lib/company.ts. A number retyped
//    anywhere else drifts the day it changes. tel: links must be built from
//    COMPANY.phone, never hard-coded.
const PHONE_SOURCE = join("src", "lib", "company.ts");
const PHONE_PATTERNS = [
  { pattern: /href=["'`]tel:\+?\d/i, label: "a hard-coded tel: link" },
  { pattern: /wa\.me\/\d|api\.whatsapp\.com/i, label: "a hard-coded WhatsApp link" },
  { pattern: /\+212[\s-]?\d/, label: "a retyped +212 phone number" },
  { pattern: /\b0[5-7]\d{8}\b/, label: "a retyped Moroccan phone number" },
];
// The contact page's meta description states the number for search results.
const PHONE_ALLOWED = [PHONE_SOURCE, join("src", "app", "contact", "page.tsx")];

// 2. Schema types we can never back with real data.
const OFFER_SOURCE = join("src", "lib", "schema.ts");
const FORBIDDEN_SCHEMA = [
  '"@type": "Review"',
  '"@type": "AggregateRating"',
  '"@type": "Offer"',
  '"@type": "Event"',
  "aggregateRating",
  "ratingValue",
];

// 3. Testimonials and partner logos are placeholders until real ones are
//    supplied with permission. A placeholder flag may only be turned off on
//    an entry whose text is no longer a "[...]" placeholder.
const homeContent = readFileSync(join("src", "content", "home.ts"), "utf8");
for (const match of homeContent.matchAll(/quote: "([^"]*)"[^}]*placeholder: (true|false)/g)) {
  const [, quote, flag] = match;
  if (flag === "false" && /^\[.*\]$/.test(quote)) fail("src/content/home.ts", "a placeholder testimonial is marked as real");
  if (flag === "true" && !/^\[.*\]$/.test(quote)) fail("src/content/home.ts", "a written testimonial is still flagged as a placeholder");
}

for (const file of sourceFiles) {
  const contents = readFileSync(file, "utf8");
  const withoutComments = contents.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");

  if (!PHONE_ALLOWED.includes(file)) {
    for (const { pattern, label } of PHONE_PATTERNS) {
      if (pattern.test(withoutComments)) fail(file, `contains ${label}; import it from src/lib/company.ts`);
    }
  }
  for (const needle of FORBIDDEN_SCHEMA) {
    // Offer is allowed in one place: programmeTripSchema() in src/lib/schema.ts,
    // which emits it only for a price the business published in the CRM
    // (docs/decisions.md D10). Everywhere else it stays forbidden.
    if (needle === '"@type": "Offer"' && file === OFFER_SOURCE) continue;
    if (withoutComments.includes(needle)) {
      fail(file, `contains forbidden schema "${needle}"`);
    }
  }
}

// 5. No statistics section or case studies page.
for (const file of sourceFiles) {
  if (file.includes("case-studies")) fail(file, "case studies must not be published");
}

// 6. The venue disclosure boundary.
//    Internal and gated venue fields must not appear in any component that
//    renders. The public level goes through toPublicVenue() only.
const VENUE_INTERNAL_FIELDS = [
  "negotiationNotes",
  "incidentHistory",
  "supplierPerformance",
  "releasePeriod",
  "allotments",
  "backupVenue",
  "measuredCapacities",
];

for (const file of sourceFiles) {
  const isVenueModel =
    file.includes(join("features", "venues")) &&
    ["types.ts", "disclosure.ts", "data.ts"].some((name) => file.endsWith(name));
  if (isVenueModel) continue;

  const contents = readFileSync(file, "utf8").replace(
    /\/\*[\s\S]*?\*\/|\/\/.*$/gm,
    ""
  );
  for (const field of VENUE_INTERNAL_FIELDS) {
    // Match the field as code - `venue.allotments`, `allotments:`,
    // `["allotments"]` - rather than the English word in a sentence. The prose
    // on /mice legitimately describes what we keep internal, and should not
    // trip this check.
    const asCode =
      contents.includes(`.${field}`) ||
      contents.includes(`${field}:`) ||
      contents.includes(`"${field}"`) ||
      contents.includes(`'${field}'`);
    if (asCode) {
      fail(file, `references the gated/internal venue field "${field}"`);
    }
  }
  // A VenueRecord must never be spread into a component: { ...venue } would
  // publish every field added to the type in future.
  if (contents.includes("VenueRecord") && !file.endsWith("verify-data.mjs")) {
    fail(file, "imports VenueRecord outside the venue model; use PublicVenue");
  }
}

// 7. The venue data module must stay server-only, since it holds rates,
//    terms and negotiation notes.
const venueData = readFileSync("src/features/venues/data.ts", "utf8");
if (!venueData.includes('import "server-only"')) {
  fail("src/features/venues/data.ts", 'must import "server-only"');
}

// 8. Metadata limits. Titles over ~60 characters and descriptions over ~155
//    get truncated in results, which wastes the part of the page a buyer
//    actually reads first. The rendered title carries the brand suffix from
//    the root layout template, so that is counted too.
const BRAND_SUFFIX = " | PM Travel Agency";
const TITLE_MAX = 60;
const DESCRIPTION_MIN = 120;
const DESCRIPTION_MAX = 160;

/**
 * pageMetadata() appends the brand only while the result fits in 60
 * characters, so the rendered title is either "title | brand" or "title".
 * The home title is set verbatim by the business brief and is exempt.
 */
function checkTitle(file, title, { exempt = false } = {}) {
  if (exempt) return;
  const rendered = (title + BRAND_SUFFIX).length <= TITLE_MAX ? title + BRAND_SUFFIX : title;
  if (rendered.length > TITLE_MAX) fail(file, `title renders at ${rendered.length} chars, over ${TITLE_MAX}: "${rendered}"`);
  if (title.includes("PM Travel Agency")) fail(file, `title "${title}" repeats the brand`);
}

function checkDescription(file, description) {
  if (description.length > DESCRIPTION_MAX) fail(file, `description is ${description.length} chars, over ${DESCRIPTION_MAX}: "${description.slice(0, 50)}…"`);
  if (description.length < DESCRIPTION_MIN) fail(file, `description is ${description.length} chars, under ${DESCRIPTION_MIN}: "${description.slice(0, 50)}…"`);
}

// Titles and descriptions held in content data (dynamic routes).
for (const file of [join("src", "content", "b2b.ts"), join("src", "content", "leisure.ts"), join("src", "content", "journal.ts")]) {
  const source = readFileSync(file, "utf8");
  for (const [, t] of source.matchAll(/seoTitle:\s*"([^"]+)"/g)) checkTitle(file, t);
  for (const [, d] of source.matchAll(/(?:seoDescription|description):\s*\n?\s*"([^"]{60,})"/g)) checkDescription(file, d);
}

// Some titles are template literals reading from COMPANY, because company
// facts are never retyped into a page. Resolve those so their real rendered
// length can be measured.
const navSource = readFileSync("src/lib/nav.ts", "utf8");
const companyValue = (key) =>
  navSource.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1] ?? "";

const resolveTitle = (raw) =>
  raw
    .replace(/\$\{COMPANY\.positioning\}/g, companyValue("positioning"))
    .replace(/\$\{COMPANY\.name\}/g, companyValue("name"));

const pageFiles = sourceFiles.filter((file) => file.endsWith("page.tsx"));

for (const file of pageFiles) {
  const contents = readFileSync(file, "utf8");
  // `generateMetadata = cmsPageMetadata({...})` is the same static input with
  // the CRM's search snippet applied at request time (src/lib/page-seo.ts).
  const metadataBlock = contents.match(/export const (?:metadata|generateMetadata = cmsPageMetadata)[\s\S]*?^\}\)?;/m)?.[0];
  if (!metadataBlock) continue; // generateMetadata pages are checked at build

  // og:url must come from the same path as the canonical. pageMetadata() sets
  // both; a hand-built metadata object inherits the layout's and gets it wrong.
  if (!metadataBlock.includes("pageMetadata(") && !metadataBlock.includes("cmsPageMetadata(")) {
    fail(file, "builds metadata by hand; use pageMetadata() so og:url matches the canonical");
  }

  const rawTitle = metadataBlock.match(/title:\s*["`]([^"`]+)["`]/)?.[1];
  const title = rawTitle ? resolveTitle(rawTitle) : undefined;
  const description = metadataBlock.match(/description:\s*"([^"]+)"/)?.[1];

  const isHome = file.endsWith(join("src", "app", "page.tsx"));
  if (!title) {
    fail(file, "has metadata but no title");
  } else {
    checkTitle(file, title, { exempt: isHome });
  }

  if (!description) {
    fail(file, "has metadata but no description");
  } else {
    checkDescription(file, description);
  }

  if (!/alternates|path:/.test(metadataBlock)) {
    fail(file, "has no self-referencing canonical");
  }
}

// 9. The image record.
//    "If an image has no row in this sheet, it does not go on the website."
//    An unlicensed image is not a style problem - stock agencies scan for
//    unlicensed use and invoice for it.
const registrySource = readFileSync("src/features/images/registry.ts", "utf8");
const recordedSrcs = [...registrySource.matchAll(/src:\s*"([^"]+)"/g)].map(
  (match) => match[1]
);

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"];

function imagesOnDisk(dir, found = []) {
  if (!existsSync(dir)) return found;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) imagesOnDisk(full, found);
    else if (IMAGE_EXTENSIONS.includes(extname(entry).toLowerCase())) found.push(full);
  }
  return found;
}

for (const file of imagesOnDisk(join("public", "images"))) {
  // public/images/foo.jpg is served at /images/foo.jpg
  const servedPath = "/" + file.split(/[\\/]/).slice(1).join("/");
  if (!recordedSrcs.includes(servedPath)) {
    fail(
      file,
      `is on disk with no entry in the image record. Add one with its licence, or delete the file. See docs/images.md`
    );
  }
}

// Every record needs a licence you could actually produce.
const recordBlocks = registrySource.split(/\n\s*\{/).slice(1);
for (const block of recordBlocks) {
  const key = block.match(/key:\s*"([^"]+)"/)?.[1];
  if (!key) continue;
  for (const field of ["licence", "licenceProof", "creator", "alt"]) {
    const value = block.match(new RegExp(`${field}:\\s*"([^"]*)"`))?.[1];
    if (value !== undefined && value.trim().length === 0) {
      fail("src/features/images/registry.ts", `image "${key}" has an empty ${field}`);
    }
  }
}

// Only the single hero image may be priority-loaded.
const priorityCount = (registrySource.match(/priority:\s*true/g) ?? []).length;
if (priorityCount > 1) {
  fail(
    "src/features/images/registry.ts",
    `${priorityCount} images are marked priority; only the single hero image may be`
  );
}

// 10a. No hand-written style attributes in our own JSX.
//      The CSP allows inline styles because next/image requires them; this
//      keeps that allowance scoped to the framework rather than becoming a
//      general licence to style inline.
for (const file of sourceFiles) {
  // The Open Graph renderer (Satori) only understands inline styles.
  if (file.endsWith(join("lib", "og.tsx"))) continue;
  const contents = readFileSync(file, "utf8").replace(
    /\/\*[\s\S]*?\*\/|\/\/.*$/gm,
    ""
  );
  if (/\sstyle=\{|\sstyle="/.test(contents)) {
    fail(file, "hand-writes a style attribute; use a class");
  }
}

// 10. No plain <img> tags. Images go through SiteImage, which supplies width,
//     height and alt from the record - so nothing can ship without them.
for (const file of sourceFiles) {
  if (file.endsWith(join("components", "SiteImage.tsx")) || file.endsWith(join("lib", "og.tsx"))) continue;
  const contents = readFileSync(file, "utf8").replace(
    /\/\*[\s\S]*?\*\/|\/\/.*$/gm,
    ""
  );
  if (/<img[\s>]/.test(contents)) {
    fail(file, "uses a plain <img> tag; use the SiteImage component");
  }
}

if (failures.length > 0) {
  console.error("Data integrity check FAILED:\n");
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error(
    "\nSee docs/AGENT-PROMPTS.md. If a fact has genuinely been confirmed, confirm it with the source first."
  );
  process.exit(1);
}

console.log(`Data integrity check passed (${sourceFiles.length} files).`);
