/**
 * Company facts and site-wide constants, with no other imports.
 *
 * Kept apart from nav.ts so Client Components (header, forms, WhatsApp button)
 * can import facts without pulling page data into the browser bundle.
 *
 * Never retype a company fact into a page. Import it from here.
 *
 * Contact details below were supplied by the business in the November 2026
 * website brief (see docs/decisions.md D7). Values set to `null` are not yet
 * supplied: the site renders a clearly marked placeholder for them and never
 * a guessed value.
 */
export const COMPANY = {
  name: "PM Travel Agency",
  legalLine: "PM Travel Agency by Prestige Majestic Projects & Events",
  brandLine: "by Prestige Majestic",
  parent: "Prestige Majestic Projects & Events",
  positioning: "Your Ground Partner in Morocco",
  shortDescription:
    "PM Travel Agency by Prestige Majestic Projects & Events — Morocco DMC based in Marrakech.",
  address: {
    line1: "N° 3, Résidence Al Manar 10",
    street: "Rue Ibn Battouta",
    city: "Marrakech",
    postalCode: "40000",
    country: "Morocco",
    countryCode: "MA",
  },
  /**
   * Office coordinates for schema `geo`. TODO(business): copy the exact
   * latitude/longitude from the Google Business Profile pin. The schema omits
   * `geo` while this is null rather than publishing a guess.
   */
  geo: null as { latitude: number; longitude: number } | null,
  phone: {
    mobile: { display: "+212 762 455 472", tel: "+212762455472" },
    landline: { display: "+212 524 347 213", tel: "+212524347213" },
  },
  whatsapp: {
    number: "212762455472",
    url: "https://wa.me/212762455472",
  },
  email: {
    b2b: "b2b@pm-travelagency.com",
    general: "contact@pm-travelagency.com",
  },
  social: {
    instagram: "https://www.instagram.com/pmtravelagencybypmpe/",
    linkedin: "https://www.linkedin.com/company/133753972/",
  },
  mapsUrl:
    "https://www.google.com/maps/place/PM+Travel+Agency+By+Prestige+Majestic+Projects%26Events/data=!4m2!3m1!1s0x0:0xffb2c0eb32059292",
  /** Lazy-loaded iframe on /contact. Place query, no API key needed. */
  mapsEmbedUrl:
    "https://www.google.com/maps?q=PM+Travel+Agency+By+Prestige+Majestic+Projects%26Events,+Marrakech&output=embed",
  hours: [
    { days: "Monday–Friday", time: "9:00 AM – 6:00 PM", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    { days: "Saturday", time: "9:00 AM – 1:00 PM", schemaDays: ["Saturday"], opens: "09:00", closes: "13:00" },
    { days: "Sunday", time: "Closed", schemaDays: [], opens: null, closes: null },
  ],
  timezone: "Morocco time (GMT+1)",
  languages: ["English", "French", "Arabic", "Italian", "Spanish"] as const,
  languageCodes: "EN · FR · AR · IT · ES",
} as const;

/**
 * Credentials shown in the Proof & Trust section and the footer.
 * TODO(business): supply the licence number and year founded. Until then the
 * site renders a marked placeholder, never an invented figure.
 */
export const CREDENTIALS = {
  licenceNumber: null as string | null,
  yearFounded: null as number | null,
};

/**
 * The trust strip under the home hero. Editable claims supplied by the
 * business; change them here and every page updates.
 */
export const TRUST_POINTS: { value: number | null; prefix?: string; suffix?: string; text?: string; caption: string }[] = [
  { value: 24, suffix: "h", caption: "Quotes within 24h" },
  { value: 200, suffix: "+ pax", caption: "FIT to 200+ pax" },
  { value: 5, suffix: " languages", caption: COMPANY.languageCodes },
  { value: null, text: "Marrakech", caption: "Office in Marrakech" },
];

export const addressOneLine = [
  COMPANY.address.line1,
  COMPANY.address.street,
  COMPANY.address.city,
  COMPANY.address.country,
].join(", ");

export const RFQ_HREF = "/request-a-quote";
export const PARTNER_HREF = "/b2b/become-a-partner";
export const LOGIN_HREF = "/partner-login";

/** WhatsApp deep link with a prefilled message. */
export const whatsappLink = (message = "Hello PM Travel Agency, I'm a travel professional and would like to discuss a Morocco programme.") =>
  `${COMPANY.whatsapp.url}?text=${encodeURIComponent(message)}`;

/**
 * The production origin. Canonicals, sitemap, robots and Open Graph always use
 * it, so a staging deployment can never publish staging canonicals.
 */
export const SITE_URL = "https://pm-travelagency.com";
