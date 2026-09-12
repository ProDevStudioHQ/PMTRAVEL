/**
 * The image record.
 *
 * "If an image has no row in this sheet, it does not go on the website."
 * That rule is enforced here rather than in a spreadsheet: SiteImage takes a
 * key into this registry, so an image with no record cannot be rendered, and
 * `npm run verify:data` fails the build if a file appears in public/images
 * without an entry.
 *
 * The array is empty because no photography has been taken yet. That is the
 * honest state, and it is why the site currently carries no images.
 *
 * TODO(images): add a record per delivered photograph. Never add one without
 * a licence you can produce - a stock agency sending an invoice in two years
 * is an avoidable and expensive mistake for a new company.
 * See docs/images.md and pm-travel-photo-layout.html.
 */

export type ImageSource =
  | "pm_original"
  | "commissioned"
  | "unsplash"
  | "pexels"
  | "wikimedia"
  | "adobe_stock"
  | "getty"
  | "shutterstock"
  | "stocksy"
  | "onmt";

/**
 * Sources that may depict PM Travel's own operation, staff, vehicles or
 * premises. Anything else is scenery only.
 *
 * Stock photography of people must never be presented as our staff or our
 * clients, and no generated image of any kind is permitted.
 */
export const OPERATIONAL_SOURCES: ImageSource[] = ["pm_original", "commissioned"];

export type ImageRecord = {
  /** Key used in code. Also the filename stem under public/images/. */
  key: string;
  /** Path under public/, e.g. "/images/office-gueliz.jpg". */
  src: string;
  /** Intrinsic size. Required, so the page cannot shift while loading. */
  width: number;
  height: number;
  /**
   * What is actually in the image, for someone who cannot see it.
   * Accessibility first - keyword stuffing here is both useless and wrong.
   */
  alt: string;
  source: ImageSource;
  /** Photographer or contributor. */
  creator: string;
  /** The exact licence, e.g. "Unsplash Licence", "Adobe Standard". */
  licence: string;
  /** Link or file reference to the certificate, invoice or written permission. */
  licenceProof: string;
  /** ISO date. */
  acquiredOn: string;
  commercialUse: true;
  restrictions?: string;
  location?: string;
  /**
   * Whether a signed model release exists for every recognisable person.
   * No release, no publication.
   */
  modelRelease?: boolean;
  /** True for the single hero image only. Everything else loads lazily. */
  priority?: boolean;
};

export const IMAGES: ImageRecord[] = [];

export const imageByKey = (key: string): ImageRecord | undefined =>
  IMAGES.find((image) => image.key === key);

/** Only one image on the site may be priority-loaded: the LCP hero. */
export const priorityImageCount = IMAGES.filter((image) => image.priority).length;
