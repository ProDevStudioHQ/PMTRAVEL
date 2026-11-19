/**
 * Runtime validation of every CRM response (docs/api-contract.md section 4).
 *
 * The CRM is another deployment that can change or break independently, so
 * nothing it sends reaches a page unchecked. A response that fails here is
 * logged and treated exactly like a CRM outage: the caller uses its fallback.
 *
 * No "server-only" import, so the schemas can be unit-tested directly.
 */
import { z } from "zod";

const nullableString = z.string().nullable();

export const ImageSchema = z.object({
  url: z.string().min(1),
  alt: z.string(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
  blurDataUrl: z.string().startsWith("data:image/").optional(),
  sizes: z.array(z.object({ width: z.number().positive(), avif: z.string(), webp: z.string() })),
});

export const LinkSchema = z.object({
  label: z.string(),
  url: z.string().min(1),
  openInNewTab: z.boolean(),
});

type NavItemShape = {
  id: string;
  label: string;
  url: string | null;
  type: "LINK" | "DROPDOWN" | "MEGA_MENU" | "BUTTON";
  description: string | null;
  icon: string | null;
  isHighlighted: boolean;
  openInNewTab: boolean;
  buttonStyle: "PRIMARY" | "OUTLINE" | null;
  children: NavItemShape[];
};

export const NavItemSchema: z.ZodType<NavItemShape> = z.lazy(() =>
  z.object({
    id: z.string(),
    label: z.string(),
    url: nullableString,
    type: z.enum(["LINK", "DROPDOWN", "MEGA_MENU", "BUTTON"]),
    description: nullableString,
    icon: nullableString,
    isHighlighted: z.boolean(),
    openInNewTab: z.boolean(),
    buttonStyle: z.enum(["PRIMARY", "OUTLINE"]).nullable(),
    children: z.array(NavItemSchema),
  })
);

export const TopBarItemSchema = z.object({
  id: z.string(),
  type: z.enum(["PHONE", "WHATSAPP", "EMAIL", "TEXT", "LINK", "LANGUAGE_SWITCH"]),
  label: z.string(),
  value: nullableString,
  url: nullableString,
  icon: nullableString,
  position: z.enum(["LEFT", "RIGHT"]),
  showOnMobile: z.boolean(),
});

export const AnnouncementSchema = z.object({
  text: z.string().min(1),
  link: LinkSchema.nullable(),
  // An unknown colour from a newer CRM falls back to terracotta rather than failing the whole layout.
  colorToken: z.enum(["terracotta", "indigo", "zellige", "gold", "majorelle"]).catch("terracotta"),
});

export const SiteSettingsSchema = z.object({
  siteName: z.string().min(1),
  logo: ImageSchema.nullable(),
  logoDark: ImageSchema.nullable(),
  emails: z.object({ contact: z.string().min(3), b2b: z.string().min(3) }),
  phones: z.object({ mobile: z.string(), landline: z.string(), whatsapp: z.string() }),
  address: z.string(),
  openingHours: z.string(),
  googleMapsUrl: nullableString,
  quoteReplyPromise: z.string(),
  seo: z.object({ title: z.string(), description: z.string(), ogImage: ImageSchema.nullable() }),
});

/**
 * CRM override of one page's header and search snippet, keyed by URL path.
 * Every field is optional: null keeps what the page itself says.
 */
export const PageOverrideSchema = z.object({
  eyebrow: nullableString.optional().default(null),
  title: nullableString.optional().default(null),
  subtitle: nullableString.optional().default(null),
  heroImage: ImageSchema.nullable().optional().default(null),
  seoTitle: nullableString.optional().default(null),
  seoDescription: nullableString.optional().default(null),
});

/**
 * CRM edit of one page section (Website → Page sections), keyed "path#id".
 * Texts: null keeps the site's text, "" hides it. cards: null keeps the
 * site's cards, otherwise the list replaces them (add / remove / reorder).
 */
export const SectionCardSchema = z.object({
  title: z.string(),
  body: z.string().default(""),
  icon: nullableString.optional().default(null),
  imageKey: nullableString.optional().default(null),
  image: ImageSchema.nullable().optional().default(null),
  href: nullableString.optional().default(null),
});
export const SectionOverrideSchema = z.object({
  hidden: z.boolean().default(false),
  eyebrow: nullableString.optional().default(null),
  title: nullableString.optional().default(null),
  intro: nullableString.optional().default(null),
  cards: z.array(SectionCardSchema).nullable().optional().default(null),
});

export const SitePayloadSchema = z.object({
  settings: SiteSettingsSchema,
  topBar: z.object({
    enabled: z.boolean(),
    items: z.array(TopBarItemSchema),
    announcement: AnnouncementSchema.nullable(),
  }),
  nav: z.object({ items: z.array(NavItemSchema), buttons: z.array(NavItemSchema) }),
  footer: z.object({
    aboutText: z.string(),
    columns: z.array(z.object({ id: z.string(), title: z.string(), links: z.array(LinkSchema) })),
    socials: z.array(
      z.object({
        platform: z.enum(["INSTAGRAM", "LINKEDIN", "FACEBOOK", "TIKTOK", "YOUTUBE", "PINTEREST", "X"]),
        url: z.string().min(1),
      })
    ),
    legalLinks: z.array(LinkSchema),
    showContactBlock: z.boolean(),
    showMap: z.boolean(),
    newsletter: z.object({ enabled: z.boolean(), text: nullableString }),
    copyright: z.string(),
  }),
  // Added after the first contract version, so an older CRM may not send them.
  // A bad entry must not take the whole layout down: it is dropped instead.
  pages: z.record(z.string(), PageOverrideSchema).optional().catch(undefined),
  images: z.record(z.string(), ImageSchema).optional().catch(undefined),
  sections: z.record(z.string(), SectionOverrideSchema).optional().catch(undefined),
  // Website → Colours. Values are re-checked as #rrggbb before use (src/lib/theme.ts).
  theme: z
    .object({ palette: z.record(z.string(), z.string()).optional(), areas: z.record(z.string(), z.string()).optional() })
    .optional()
    .catch(undefined),
  updatedAt: z.string(),
});

const SectionSchema = z.enum(["EXPERIENCES", "TOURS"]);
const SlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "invalid slug");

export const CategorySchema = z.object({
  id: z.string(),
  section: SectionSchema,
  name: z.string().min(1),
  slug: SlugSchema,
  description: nullableString,
  colorToken: z.string(),
  cover: ImageSchema.nullable(),
  programmeCount: z.number().int().nonnegative(),
  seo: z.object({ title: nullableString, description: nullableString }),
});

export const CategoryListSchema = z.object({ items: z.array(CategorySchema) });

export const ProgrammeSummarySchema = z.object({
  id: z.string(),
  section: SectionSchema,
  category: z.object({ name: z.string(), slug: SlugSchema, colorToken: z.string() }),
  slug: SlugSchema,
  title: z.string().min(1),
  subtitle: nullableString,
  shortDescription: z.string(),
  durationDays: z.number().int().nonnegative(),
  durationNights: z.number().int().nonnegative(),
  route: z.array(z.string()),
  groupType: z.enum(["PRIVATE", "GROUP", "BOTH"]),
  price: z
    .object({ from: z.number().nonnegative(), currency: z.enum(["EUR", "USD", "MAD"]), note: nullableString })
    .nullable(),
  b2bNetRatesNote: z.boolean(),
  cover: ImageSchema.nullable(),
  isFeatured: z.boolean(),
  updatedAt: z.string(),
});

export const ProgrammeListSchema = z.object({
  items: z.array(ProgrammeSummarySchema),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export const ProgrammeDetailSchema = ProgrammeSummarySchema.extend({
  overviewHtml: z.string(),
  highlights: z.array(z.string()),
  minPax: z.number().int().nullable(),
  maxPax: z.number().int().nullable(),
  startCity: nullableString,
  endCity: nullableString,
  included: z.array(z.string()),
  notIncluded: z.array(z.string()),
  days: z.array(
    z.object({
      dayNumber: z.number().int().positive(),
      title: z.string(),
      description: z.string(),
      overnightCity: nullableString,
      meals: z.object({ breakfast: z.boolean(), lunch: z.boolean(), dinner: z.boolean() }),
    })
  ),
  gallery: z.array(ImageSchema),
  pdf: z
    .object({
      access: z.enum(["PUBLIC", "PARTNERS_ONLY", "ON_REQUEST"]),
      fileName: z.string(),
      sizeBytes: z.number().int().nonnegative(),
      url: nullableString,
    })
    .nullable(),
  seo: z.object({ title: nullableString, description: nullableString, ogImage: ImageSchema.nullable() }),
  publishedAt: z.string(),
});

/** 5.4: a moved programme answers 200 { redirect } instead of a programme. */
export const RedirectSchema = z.object({
  redirect: z.string().regex(/^\/(experiences|tours)\/[a-z0-9-]+\/[a-z0-9-]+$/, "invalid redirect path"),
});

export const SitemapSchema = z.object({
  items: z.array(z.object({ path: z.string().startsWith("/"), updatedAt: z.string() })),
});

export const ErrorBodySchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string().optional(),
    fields: z.record(z.string(), z.string()).optional(),
  }),
});
