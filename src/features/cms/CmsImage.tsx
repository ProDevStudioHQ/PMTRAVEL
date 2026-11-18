import Image from "next/image";
import type { Image as CmsImageData } from "@/types/cms";

/**
 * The only way a CRM image reaches a page (SiteImage is for the site's own
 * licensed record). next/image re-encodes it as AVIF/WebP at quality 70 from
 * the CRM's largest web version; the CRM's blurDataUrl is the placeholder.
 * Allowed hosts are next.config.ts images.remotePatterns.
 */
export function CmsImage({
  image,
  sizes,
  fill = false,
  priority = false,
  className = "",
}: {
  image: CmsImageData;
  sizes: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const placeholder = !priority && image.blurDataUrl ? ({ placeholder: "blur", blurDataURL: image.blurDataUrl } as const) : {};
  // Without known dimensions the image can only fill a sized parent.
  if (fill || !image.width || !image.height) {
    return <Image src={image.url} alt={image.alt} fill sizes={sizes} quality={70} priority={priority} className={className} {...placeholder} />;
  }
  return (
    <Image src={image.url} alt={image.alt} width={image.width} height={image.height} sizes={sizes} quality={70} priority={priority} className={className} {...placeholder} />
  );
}
