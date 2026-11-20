================================================================================
PM TRAVEL AGENCY — CRM <-> WEBSITE API CONTRACT (v1)
Put this file in BOTH projects as: docs/api-contract.md
The CRM must implement it exactly. The website must consume it exactly.
If one side needs a change, update this file in both projects first.
================================================================================

--------------------------------------------------------------------------------
1. ADDRESSES
--------------------------------------------------------------------------------
CRM base URL      https://crm.pm-travelagency.com
Public API base   https://crm.pm-travelagency.com/api/public/v1
Media base        https://crm.pm-travelagency.com/media
Website URL       https://pm-travelagency.com

Local development:
CRM               http://localhost:3001   (API: http://localhost:3001/api/public/v1)
Website           http://localhost:3000

--------------------------------------------------------------------------------
2. SHARED SECRETS (same value on both sides)
--------------------------------------------------------------------------------
Generate each one with:  openssl rand -hex 32

| Purpose                | CRM .env name               | Website .env name   |
|------------------------|-----------------------------|---------------------|
| Read published content | WEBSITE_API_KEY             | CRM_API_KEY         |
| Read drafts (preview)  | WEBSITE_PREVIEW_KEY         | CRM_PREVIEW_KEY     |
| Website cache refresh  | WEBSITE_REVALIDATE_SECRET   | REVALIDATE_SECRET   |
| Send leads to CRM      | WEBSITE_LEADS_KEY           | CRM_LEADS_KEY       |

Never put these keys in browser code (no NEXT_PUBLIC_ prefix). Never commit .env.

--------------------------------------------------------------------------------
3. GENERAL RULES
--------------------------------------------------------------------------------
- All requests: HTTPS, JSON, UTF-8.
- Auth header on every CRM API call:   x-api-key: <key>
  (preview calls use CRM_PREVIEW_KEY, lead calls use CRM_LEADS_KEY,
   everything else uses CRM_API_KEY)
- Dates: ISO 8601 UTC strings, e.g. "2026-11-18T22:49:00.000Z".
- Money: number with 2 decimals + currency code ("EUR" | "USD" | "MAD").
- Images always come as an Image object (see 4.1). Never raw file paths.
- Only PUBLISHED and VISIBLE content is returned, unless the preview key is
  used together with ?preview=true.
- GET responses send:
  Cache-Control: public, s-maxage=60, stale-while-revalidate=600
- Error format (all endpoints):
  { "error": { "code": "NOT_FOUND", "message": "Programme not found" } }
  Codes: UNAUTHORIZED (401), FORBIDDEN (403), NOT_FOUND (404),
         VALIDATION_ERROR (422, with "fields": {"email": "Invalid email"}),
         RATE_LIMITED (429), SERVER_ERROR (500)

--------------------------------------------------------------------------------
4. SHARED TYPES (TypeScript — copy into both projects: src/types/cms.ts)
--------------------------------------------------------------------------------
export type Section = "EXPERIENCES" | "TOURS";
export type Currency = "EUR" | "USD" | "MAD";
export type PdfAccess = "PUBLIC" | "PARTNERS_ONLY" | "ON_REQUEST";

// 4.1 Image
export interface Image {
  url: string;              // largest web version
  alt: string;
  width: number;
  height: number;
  blurDataUrl?: string;     // tiny base64 placeholder
  sizes: { width: number; avif: string; webp: string }[]; // 640..3840
}

// 4.2 Link
export interface Link {
  label: string;
  url: string;              // "/tours" or "https://..."
  openInNewTab: boolean;
}

// 4.3 Navigation
export interface NavItem {
  id: string;
  label: string;
  url: string | null;       // null for a dropdown parent with no page
  type: "LINK" | "DROPDOWN" | "MEGA_MENU" | "BUTTON";
  description: string | null;
  icon: string | null;      // lucide icon name
  isHighlighted: boolean;
  openInNewTab: boolean;
  buttonStyle: "PRIMARY" | "OUTLINE" | null;
  children: NavItem[];      // max 2 levels
}

// 4.4 Top bar
export interface TopBarItem {
  id: string;
  type: "PHONE" | "WHATSAPP" | "EMAIL" | "TEXT" | "LINK" | "LANGUAGE_SWITCH";
  label: string;
  value: string | null;     // "+212762455472", "b2b@pm-travelagency.com"
  url: string | null;       // "tel:...", "https://wa.me/...", "mailto:..."
  icon: string | null;
  position: "LEFT" | "RIGHT";
  showOnMobile: boolean;
}
export interface Announcement {
  text: string;
  link: Link | null;
  colorToken: "terracotta" | "indigo" | "zellige" | "gold" | "majorelle";
}

// 4.5 Footer
export interface FooterColumn { id: string; title: string; links: Link[]; }
export interface SocialLink {
  platform: "INSTAGRAM" | "LINKEDIN" | "FACEBOOK" | "TIKTOK" | "YOUTUBE"
          | "PINTEREST" | "X";
  url: string;
}

// 4.6 Site settings
export interface SiteSettings {
  siteName: string;
  logo: Image | null;
  logoDark: Image | null;
  emails: { contact: string; b2b: string };
  phones: { mobile: string; landline: string; whatsapp: string };
  address: string;
  openingHours: string;
  googleMapsUrl: string | null;
  quoteReplyPromise: string;           // "We reply within 24 hours"
  seo: { title: string; description: string; ogImage: Image | null };
}

// 4.7 Category
export interface Category {
  id: string;
  section: Section;
  name: string;
  slug: string;
  description: string | null;
  colorToken: string;
  cover: Image | null;
  programmeCount: number;
  seo: { title: string | null; description: string | null };
}

// 4.8 Programme (list item)
export interface ProgrammeSummary {
  id: string;
  section: Section;
  category: { name: string; slug: string; colorToken: string };
  slug: string;
  title: string;
  subtitle: string | null;
  shortDescription: string;
  durationDays: number;
  durationNights: number;
  route: string[];                     // ["Marrakech","Merzouga","Fès"]
  groupType: "PRIVATE" | "GROUP" | "BOTH";
  price: { from: number; currency: Currency; note: string | null } | null;
  b2bNetRatesNote: boolean;            // true -> show "Net rates for partners"
  cover: Image;
  isFeatured: boolean;
  updatedAt: string;
}

// 4.9 Programme (detail)
export interface ProgrammeDetail extends ProgrammeSummary {
  overviewHtml: string;                // sanitized HTML
  highlights: string[];
  minPax: number | null;
  maxPax: number | null;
  startCity: string | null;
  endCity: string | null;
  included: string[];
  notIncluded: string[];
  days: {
    dayNumber: number;
    title: string;
    description: string;
    overnightCity: string | null;
    meals: { breakfast: boolean; lunch: boolean; dinner: boolean };
  }[];
  gallery: Image[];
  pdf: {
    access: PdfAccess;
    fileName: string;                  // "imperial-cities-8d-programme.pdf"
    sizeBytes: number;
    url: string | null;                // only when access = PUBLIC
  } | null;
  seo: { title: string | null; description: string | null; ogImage: Image | null };
  publishedAt: string;
}

// 4.10 Lead (website -> CRM)
export interface LeadInput {
  formType: "B2B_QUOTE" | "PARTNER_REQUEST" | "CONTACT" | "PDF_REQUEST";
  name: string;                        // 2-120 chars
  email: string;
  company?: string;
  country?: string;
  whatsapp?: string;
  clientType?: "TRAVEL_AGENCY" | "TOUR_OPERATOR" | "TRAVEL_ADVISOR"
             | "MICE" | "CORPORATE" | "PRIVATE_TRAVELLER";
  groupSize?: number;
  travelDates?: string;                // free text "May 2027, 8 nights"
  message?: string;                    // max 3000 chars
  programmeSlug?: string;
  pageUrl: string;
  utm?: { source?: string; medium?: string; campaign?: string };
  consent: boolean;                    // must be true
  captchaToken: string;
  visitorIp: string;                   // sent by website server; CRM hashes it
}

--------------------------------------------------------------------------------
5. ENDPOINTS — CRM PUBLIC API (website calls these from its SERVER only)
--------------------------------------------------------------------------------

5.1 GET /site
    Header: x-api-key: CRM_API_KEY
    The whole layout in one call (header, top bar, nav, footer, settings).
    200:
    {
      "settings": SiteSettings,
      "topBar": { "enabled": true, "items": TopBarItem[],
                  "announcement": Announcement | null },
      "nav": { "items": NavItem[], "buttons": NavItem[] },
      "footer": {
        "aboutText": string,
        "columns": FooterColumn[],
        "socials": SocialLink[],
        "legalLinks": Link[],
        "showContactBlock": boolean,
        "showMap": boolean,
        "newsletter": { "enabled": boolean, "text": string | null },
        "copyright": string
      },
      "pages": { [path: string]: PageOverride },   // added 2026-11-19
      "images": { [imageKey: string]: Image },     // added 2026-11-19
      "hiddenImages": string[],                    // added 2026-11-20: image keys taken off the site
      "pageGalleries": { [path: string]: Image[] }, // added 2026-11-20: extra photos at the bottom of a page
      "sections": { ["path#sectionId"]: SectionOverride }, // added 2026-11-19
      "theme": { "palette": { [key]: "#rrggbb" },          // added 2026-11-19
                 "areas":   { [key]: "#rrggbb" } },
      "updatedAt": string
    }
    PageOverride = { "eyebrow": string | null, "title": string | null,
                     "subtitle": string | null, "heroImage": Image | null,
                     "seoTitle": string | null, "seoDescription": string | null }
    Notes: announcement is null outside its start/end dates.
           Nav items with autoSource are already expanded into children
           (e.g. Experiences -> Luxury, Adventure, ...).
           pages (CRM Website -> Pages) is keyed by URL path ("/", "/about");
           a null field keeps the page's own text. images (CRM Website ->
           Images) replaces one of the website's own photos, keyed by its
           image record key. Both are optional for the website: an older CRM
           without them, or a malformed entry, leaves the built-in content.
           sections (CRM Website -> Page sections), e.g. "/#who":
             { hidden, eyebrow, title, intro: string | null ("" = hide),
               cards: [{ title, body, icon, imageKey, image: Image | null,
                         href }] | null (null = the website's cards) }.
           theme (CRM Website -> Colours): brand colours and top bar /
           menu bar / footer colours; the website writes only known keys
           with #rrggbb values (src/lib/theme.ts).
           The website lists what can be controlled at its public
           GET /api/content-slots: { pages: {path,label,group}[],
           images: {key,src,alt,width,height}[], sections: SectionSlot[] }
           (each section with its texts, card fields and today's content).

5.2 GET /categories?section=EXPERIENCES|TOURS
    200: { "items": Category[] }

5.3 GET /programmes
    Query: section (required), category (slug, optional),
           featured=true (optional), page=1, limit=12 (max 50)
    200: { "items": ProgrammeSummary[], "page": 1, "limit": 12,
           "total": 34, "totalPages": 3 }

5.4 GET /programmes/{section}/{slug}
    section in URL is lowercase: "experiences" | "tours"
    Preview: add ?preview=true and use CRM_PREVIEW_KEY to get drafts.
    200: ProgrammeDetail
    404: NOT_FOUND
    301-style move: if the programme moved section/category/slug, return
    200 { "redirect": "/tours/private-tours/new-slug" } and the website
    issues a permanent redirect.

5.5 GET /pdf/{slug}?section=TOURS
    (Was /programmes/{slug}/pdf: moved because Next.js cannot have two
     different dynamic names at the same folder level.)
    PUBLIC         -> 302 to the file URL
    PARTNERS_ONLY  -> 403 FORBIDDEN (until the partner portal exists)
    ON_REQUEST     -> 403 PDF_ON_REQUEST
                      (website shows the PDF request form instead)

5.6 GET /sitemap
    200: { "items": [ { "path": "/tours/group-tours/imperial-cities",
                        "updatedAt": "..." } ] }
    Includes category pages and programme pages.

5.7 GET /health  (no key needed)
    200: { "status": "ok", "time": "..." }

--------------------------------------------------------------------------------
6. ENDPOINT — LEADS (website server -> CRM)
--------------------------------------------------------------------------------
6.1 POST /leads
    Header: x-api-key: CRM_LEADS_KEY
    Body: LeadInput
    The website calls this from a SERVER ACTION or route handler, never from
    the browser directly. The website verifies nothing itself; the CRM checks
    captchaToken with CAPTCHA_SECRET.
    201: { "id": "lead_123", "message": "Received" }
    422: VALIDATION_ERROR with fields
    429: RATE_LIMITED (max 5 leads per hashed IP per 10 minutes)
    CRM behaviour: creates the lead with source WEBSITE, links the programme,
    matches/creates the B2B or B2C client, notifies by email
    (B2B -> b2b@pm-travelagency.com, others -> contact@pm-travelagency.com).

--------------------------------------------------------------------------------
7. ENDPOINTS — WEBSITE (CRM calls these)
--------------------------------------------------------------------------------
7.1 POST https://pm-travelagency.com/api/revalidate
    Header: x-revalidate-secret: REVALIDATE_SECRET
    Body: { "tags": ["site"] }
    200: { "revalidated": true, "tags": ["site"], "now": 1763506140000 }
    401 if the secret is wrong.

    Tags the CRM must send:
    | CRM change                         | tags                                       |
    |------------------------------------|--------------------------------------------|
    | Settings / top bar / nav / footer  | ["site"]                                   |
    | Category created/edited/deleted    | ["categories", "site", "sitemap"]          |
    | Programme published/edited         | ["programmes", "programme:<slug>", "sitemap", "site"] |
    | Programme unpublished/archived     | same as above                              |
    | Programme slug changed             | add "programme:<oldSlug>" too              |

    The CRM retries 3 times (after 2s, 10s, 30s) if the call fails, and shows
    the status in the Website Dashboard.

7.2 GET https://pm-travelagency.com/api/preview
    Query: secret=CRM_PREVIEW_KEY & section=tours & category=... & slug=...
    Enables Next.js Draft Mode, then redirects to the programme page.
    The CRM "Preview" button opens this URL in a new tab.

7.3 GET https://pm-travelagency.com/api/health
    200: { "status": "ok", "cms": "ok" | "fallback" }
    The CRM Website Dashboard pings this to show the connection light.

--------------------------------------------------------------------------------
8. CACHE TAGS USED BY THE WEBSITE
--------------------------------------------------------------------------------
GET /site                      -> tag "site"
GET /categories                -> tag "categories"
GET /programmes                -> tag "programmes"
GET /programmes/{s}/{slug}     -> tags "programmes", "programme:<slug>"
GET /sitemap                   -> tag "sitemap"
Default revalidate time: 3600 seconds (safety net if a webhook is missed).

--------------------------------------------------------------------------------
9. CORS AND NETWORK
--------------------------------------------------------------------------------
- All website -> CRM calls are server-to-server, so CRM CORS only needs to
  allow the website origins for /media (images, PDFs):
  https://pm-travelagency.com, https://www.pm-travelagency.com
- Website next.config images.remotePatterns must allow
  https://crm.pm-travelagency.com/media/**

--------------------------------------------------------------------------------
10. TEST WITH CURL (after both sides are built)
--------------------------------------------------------------------------------
curl -H "x-api-key: $CRM_API_KEY" https://crm.pm-travelagency.com/api/public/v1/site
curl -H "x-api-key: $CRM_API_KEY" "https://crm.pm-travelagency.com/api/public/v1/programmes?section=TOURS"
curl -X POST https://pm-travelagency.com/api/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" -H "Content-Type: application/json" \
  -d '{"tags":["site"]}'
================================================================================
