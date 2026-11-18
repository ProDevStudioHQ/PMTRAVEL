/**
 * Shared CRM types, copied from docs/api-contract.md section 4.
 * If the contract changes, change it in both projects first, then here.
 *
 * One deliberate difference: `ProgrammeSummary.cover` is `Image | null`.
 * The CRM sends null while a programme has no cover yet, so the type says so.
 */
export type Section = "EXPERIENCES" | "TOURS";
export type Currency = "EUR" | "USD" | "MAD";
export type PdfAccess = "PUBLIC" | "PARTNERS_ONLY" | "ON_REQUEST";

// 4.1 Image
export interface Image {
  url: string; // largest web version
  alt: string;
  width: number;
  height: number;
  blurDataUrl?: string; // tiny base64 placeholder
  sizes: { width: number; avif: string; webp: string }[]; // 640..3840
}

// 4.2 Link
export interface Link {
  label: string;
  url: string; // "/tours" or "https://..."
  openInNewTab: boolean;
}

// 4.3 Navigation
export interface NavItem {
  id: string;
  label: string;
  url: string | null; // null for a dropdown parent with no page
  type: "LINK" | "DROPDOWN" | "MEGA_MENU" | "BUTTON";
  description: string | null;
  icon: string | null; // lucide icon name
  isHighlighted: boolean;
  openInNewTab: boolean;
  buttonStyle: "PRIMARY" | "OUTLINE" | null;
  children: NavItem[]; // max 2 levels
}

// 4.4 Top bar
export interface TopBarItem {
  id: string;
  type: "PHONE" | "WHATSAPP" | "EMAIL" | "TEXT" | "LINK" | "LANGUAGE_SWITCH";
  label: string;
  value: string | null;
  url: string | null;
  icon: string | null;
  position: "LEFT" | "RIGHT";
  showOnMobile: boolean;
}
export type AnnouncementColor = "terracotta" | "indigo" | "zellige" | "gold" | "majorelle";
export interface Announcement {
  text: string;
  link: Link | null;
  colorToken: AnnouncementColor;
}

// 4.5 Footer
export interface FooterColumn {
  id: string;
  title: string;
  links: Link[];
}
export interface SocialLink {
  platform: "INSTAGRAM" | "LINKEDIN" | "FACEBOOK" | "TIKTOK" | "YOUTUBE" | "PINTEREST" | "X";
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
  quoteReplyPromise: string;
  seo: { title: string; description: string; ogImage: Image | null };
}

// 5.1 GET /site
export interface SitePayload {
  settings: SiteSettings;
  topBar: { enabled: boolean; items: TopBarItem[]; announcement: Announcement | null };
  nav: { items: NavItem[]; buttons: NavItem[] };
  footer: {
    aboutText: string;
    columns: FooterColumn[];
    socials: SocialLink[];
    legalLinks: Link[];
    showContactBlock: boolean;
    showMap: boolean;
    newsletter: { enabled: boolean; text: string | null };
    copyright: string;
  };
  updatedAt: string;
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
  route: string[];
  groupType: "PRIVATE" | "GROUP" | "BOTH";
  price: { from: number; currency: Currency; note: string | null } | null;
  b2bNetRatesNote: boolean;
  cover: Image | null;
  isFeatured: boolean;
  updatedAt: string;
}

export interface ProgrammeDay {
  dayNumber: number;
  title: string;
  description: string;
  overnightCity: string | null;
  meals: { breakfast: boolean; lunch: boolean; dinner: boolean };
}

// 4.9 Programme (detail)
export interface ProgrammeDetail extends ProgrammeSummary {
  overviewHtml: string; // sanitized HTML
  highlights: string[];
  minPax: number | null;
  maxPax: number | null;
  startCity: string | null;
  endCity: string | null;
  included: string[];
  notIncluded: string[];
  days: ProgrammeDay[];
  gallery: Image[];
  pdf: { access: PdfAccess; fileName: string; sizeBytes: number; url: string | null } | null;
  seo: { title: string | null; description: string | null; ogImage: Image | null };
  publishedAt: string;
}

// 5.3 GET /programmes
export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 5.6 GET /sitemap
export interface SitemapEntry {
  path: string;
  updatedAt: string;
}

// 4.10 Lead (website -> CRM)
export type LeadFormType = "B2B_QUOTE" | "PARTNER_REQUEST" | "CONTACT" | "PDF_REQUEST";
export type LeadClientType = "TRAVEL_AGENCY" | "TOUR_OPERATOR" | "TRAVEL_ADVISOR" | "MICE" | "CORPORATE" | "PRIVATE_TRAVELLER";

export interface LeadInput {
  formType: LeadFormType;
  name: string; // 2-120 chars
  email: string;
  company?: string;
  country?: string;
  whatsapp?: string;
  clientType?: LeadClientType;
  groupSize?: number;
  travelDates?: string;
  message?: string; // max 3000 chars
  programmeSlug?: string;
  pageUrl: string;
  utm?: { source?: string; medium?: string; campaign?: string };
  consent: boolean; // must be true
  captchaToken: string;
  visitorIp: string; // sent by website server; CRM hashes it
}
