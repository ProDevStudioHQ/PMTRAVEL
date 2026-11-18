/**
 * Interface strings shared across templates (header, footer, CTAs, forms).
 * Page copy lives in src/content. A French dictionary must export the same
 * shape (`typeof en`).
 */
export const en = {
  cta: {
    quote: "Request a Quote",
    b2bQuote: "Request a B2B Quote",
    partner: "Become a Partner",
    login: "Partner Login",
    whatsappOps: "WhatsApp the Ops Desk",
    requestThis: "Request this for your clients",
    explore: "Explore",
  },
  nav: {
    menu: "Menu",
    close: "Close menu",
    skip: "Skip to content",
    backToTop: "Back to top",
    languageSoon: "French version coming soon",
  },
  footer: {
    tagline: "Your ground partner in Morocco.",
    newsletterTitle: "Trade newsletter",
    newsletterBody: "New programmes, hotel openings and fam trip dates. For travel professionals only.",
  },
  cookies: {
    message:
      "We use no tracking or advertising cookies. Accepting also allows third-party content, such as the Google Map on our contact page.",
    accept: "Accept",
    decline: "Essential only",
    more: "Cookie policy",
  },
} as const;

export type Dictionary = typeof en;
