import Image from "next/image";
import { imageByKey, OPERATIONAL_SOURCES } from "@/features/images/registry";
import { BLUR } from "@/features/images/blur";
import { getImageOverride, isImageHidden } from "@/lib/cms";

/** Delivered as AVIF/WebP at 640–3840w (next.config.ts); 70 keeps 4K sharp and light. */
const QUALITY = 70;

type SiteImageProps = {
  /** Key into the image record. An image with no record cannot be rendered. */
  imageKey: string;
  className?: string;
  sizes?: string;
  /**
   * Set on an image that depicts PM Travel's own operation - premises, staff,
   * vehicles, a live programme. Licensed stock is refused for these, because
   * presenting bought photography as your own operation is the one thing the
   * whole evidence proposition cannot survive.
   */
  operational?: boolean;
  /**
   * Fill the positioned parent instead of using the record's intrinsic size.
   * For full-bleed areas like the hero, where the crop is decided by the
   * container rather than the file.
   */
  fill?: boolean;
  /**
   * Load eagerly as the page's LCP image. Set by the slot, not the record,
   * because the same photograph can be the hero on one page and a lazy card
   * on another. Falls back to the record's flag.
   */
  priority?: boolean;
};

/**
 * The only way an image reaches a page.
 *
 * Wraps next/image so width, height and alt text always come from the record,
 * which means no layout shift and no image without a described alternative.
 * Never use a plain <img> tag - verify:data fails the build on one.
 *
 * A photo replaced in the CRM (Website → Images) is shown instead of the
 * record's file, in the same slot and size. The record stays the gatekeeper:
 * only a recorded key can be replaced.
 */
export async function SiteImage({
  imageKey,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  operational = false,
  fill = false,
  priority,
}: SiteImageProps) {
  const record = imageByKey(imageKey);
  const eager = priority ?? record?.priority ?? false;

  if (!record) {
    // An unrecorded image is a licensing risk, so it is never rendered. In
    // development the gap is made obvious rather than silent.
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `No image record for "${imageKey}". Add one to src/features/images/registry.ts, with its licence. See docs/images.md.`
      );
    }
    return null;
  }

  if (operational && !OPERATIONAL_SOURCES.includes(record.source)) {
    throw new Error(
      `Image "${imageKey}" is sourced from ${record.source} and cannot be used to depict PM Travel's own operation. Operational photography must be original.`
    );
  }

  // Hidden in the CRM: nothing is shown. The empty marker lets the CRM's
  // Images screen still find the photo on this page, so it can be shown again.
  if (await isImageHidden(imageKey)) return <span hidden data-image-key={imageKey} data-image-hidden="" />;

  const replacement = await getImageOverride(imageKey);
  if (replacement) {
    const alt = replacement.alt.trim() || record.alt;
    const blurUrl = !eager && replacement.blurDataUrl ? ({ placeholder: "blur", blurDataURL: replacement.blurDataUrl } as const) : {};
    const loading = eager ? undefined : ("lazy" as const);
    if (fill) {
      return <Image data-image-key={imageKey} src={replacement.url} alt={alt} fill sizes={sizes} quality={QUALITY} priority={eager} loading={loading} {...blurUrl} className={className} />;
    }
    // Keep the slot's shape (the record's size) so the layout never shifts.
    return (
      <Image data-image-key={imageKey} src={replacement.url} alt={alt} width={record.width} height={record.height} sizes={sizes} quality={QUALITY} priority={eager} loading={loading} {...blurUrl} className={`object-cover ${className}`} />
    );
  }

  // Lazy images fade in from a blurred 16px preview; the eager hero does not need one.
  const blur = eager ? undefined : BLUR[record.src];
  const placeholder = blur ? ({ placeholder: "blur", blurDataURL: blur } as const) : {};

  if (fill) {
    return (
      <Image
        data-image-key={imageKey}
        src={record.src}
        alt={record.alt}
        fill
        sizes={sizes}
        quality={QUALITY}
        priority={eager}
        loading={eager ? undefined : "lazy"}
        {...placeholder}
        className={className}
      />
    );
  }

  return (
    <Image
      data-image-key={imageKey}
      src={record.src}
      alt={record.alt}
      width={record.width}
      height={record.height}
      sizes={sizes}
      quality={QUALITY}
      priority={eager}
      loading={eager ? undefined : "lazy"}
      {...placeholder}
      className={className}
    />
  );
}
