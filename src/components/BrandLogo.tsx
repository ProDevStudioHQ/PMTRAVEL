import { COMPANY } from "@/lib/company";

type BrandLogoProps = {
  /** Paper artwork for dark surfaces: the header, the footer, the hero. */
  onDark?: boolean;
  /**
   * Hide the brand line where the full navigation bar is showing but space is
   * tight (xl), keeping it on tablets and on wide screens.
   */
  compact?: boolean;
};

/**
 * The PM Travel Agency wordmark: a monogram mark beside the name and brand
 * line.
 *
 * The monogram is drawn with strokes rather than set as text, so it renders
 * the same before the web font loads and at any size. It inherits
 * currentColor, so one component serves light and dark surfaces. The brand
 * line is sentence case: tracked capitals are forbidden (SOP 2.2).
 */
export function BrandLogo({ onDark = false, compact = false }: BrandLogoProps) {
  return (
    <span className="flex items-center gap-3">
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className={`size-10 shrink-0 ${onDark ? "text-paper" : "text-red-600"}`}
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
          className={`block font-display text-base font-semibold leading-tight ${
            onDark ? "text-paper" : "text-ink-900"
          }`}
        >
          {COMPANY.name}
        </span>
        {/* Hidden on the narrowest phones, where it pushed the menu button off-screen. */}
        <span
          className={`mt-0.5 hidden text-xs leading-tight sm:block ${compact ? "xl:hidden 2xl:block" : ""} ${
            onDark ? "text-paper/80" : "text-ink-500"
          }`}
        >
          {COMPANY.brandLine}
        </span>
      </span>
    </span>
  );
}
