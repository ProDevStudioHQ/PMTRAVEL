import { COMPANY } from "@/lib/nav";

type BrandLogoProps = {
  /** Light artwork for dark surfaces (the header over the hero photograph). */
  onDark?: boolean;
};

/**
 * The PM Travel Agency logo: a monogram mark and the wordmark.
 *
 * The monogram is drawn as strokes rather than set as text, so it renders
 * identically before the web font loads and at any size. It inherits
 * currentColor, which lets one component serve light and dark surfaces.
 * Colour-only by design - no gold, no gradient, no ornament.
 */
export function BrandLogo({ onDark = false }: BrandLogoProps) {
  return (
    <span className="flex items-center gap-3">
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className={`h-10 w-10 shrink-0 transition-colors ${onDark ? "text-chalk" : "text-petrol"}`}
      >
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* P */}
        <path
          d="M10.5 28V12h5a4 4 0 0 1 0 8h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
        {/* M */}
        <path
          d="M21.5 28V12l4.25 9 4.25-9v16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
      </svg>
      <span className="block">
        <span
          className={`block text-base font-semibold leading-tight tracking-tight transition-colors ${
            onDark ? "text-chalk" : "text-petrol"
          }`}
        >
          {COMPANY.name}
        </span>
        <span
          // Hidden on the narrowest phones: at 390px the tracked brand line
          // pushed the Menu button off-screen.
          className={`mt-0.5 hidden text-[0.6875rem] uppercase leading-tight tracking-[0.08em] transition-colors sm:block ${
            onDark ? "text-hamada" : "text-meta"
          }`}
        >
          {COMPANY.brandLine}
        </span>
      </span>
    </span>
  );
}
