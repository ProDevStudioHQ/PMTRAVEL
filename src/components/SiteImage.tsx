import Image from "next/image";
import { imageByKey, OPERATIONAL_SOURCES } from "@/features/images/registry";

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
};

/**
 * The only way an image reaches a page.
 *
 * Wraps next/image so width, height and alt text always come from the record,
 * which means no layout shift and no image without a described alternative.
 * Never use a plain <img> tag - verify:data fails the build on one.
 */
export function SiteImage({
  imageKey,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  operational = false,
}: SiteImageProps) {
  const record = imageByKey(imageKey);

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

  return (
    <Image
      src={record.src}
      alt={record.alt}
      width={record.width}
      height={record.height}
      sizes={sizes}
      priority={record.priority ?? false}
      loading={record.priority ? undefined : "lazy"}
      className={className}
    />
  );
}
