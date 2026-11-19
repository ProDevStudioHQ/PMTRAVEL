import Image from "next/image";
import Link from "next/link";
import type { Image as CmsImageData } from "@/types/cms";

/**
 * The site logo. When a logo is uploaded in the CRM (Website Settings: "Logo
 * (dark backgrounds)", else "Logo") it is used; otherwise the built-in
 * wordmark: "PM TRAVEL AGENCY" with the "by Prestige Majestic" subline.
 * Every place it appears (header, mobile menu, footer) is a dark surface.
 */
export function Logo({ className = "", onClick, image }: { className?: string; onClick?: () => void; image?: CmsImageData | null }) {
  const label = "PM Travel Agency, home";
  if (image) {
    const ratio = image.width && image.height ? image.width / image.height : 3;
    const height = 44;
    return (
      <Link href="/" onClick={onClick} className={`inline-flex min-h-11 items-center ${className}`} aria-label={label}>
        <Image
          src={image.url}
          alt={image.alt || "PM Travel Agency"}
          width={Math.round(height * ratio)}
          height={height}
          sizes={`${Math.round(height * ratio * 2)}px`}
          quality={90}
          priority
          className="h-11 w-auto max-w-[220px] object-contain"
        />
      </Link>
    );
  }
  return (
    <Link href="/" onClick={onClick} className={`notranslate group inline-flex min-h-11 items-center gap-3 ${className}`} translate="no" aria-label={label}>
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/70 font-display text-[0.95rem] font-semibold tracking-tight text-gold transition-colors group-hover:bg-gold group-hover:text-midnight"
      >
        PM
      </span>
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className="font-display text-[1.05rem] font-semibold tracking-[0.08em] text-current">PM TRAVEL AGENCY</span>
        <span className="mt-1 text-[0.6875rem] tracking-[0.14em] uppercase opacity-75">by Prestige Majestic</span>
      </span>
    </Link>
  );
}
