import type { ReactNode } from "react";

/**
 * Moroccan details (decisions.md D9). All decorative SVG, all aria-hidden.
 * The zellige background pattern itself is CSS (.zellige-bg in globals.css),
 * so it costs no markup; use at most one pattern per section.
 */

/** 8-point zellige star (two overlapping squares). `spin` turns it once every 120s. */
export function ZelligeStar({ className = "", spin = false }: { className?: string; spin?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={`${spin ? "spin-slow" : ""} ${className}`}>
      <rect x="20.5" y="20.5" width="59" height="59" />
      <rect x="20.5" y="20.5" width="59" height="59" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="12" />
      <circle cx="50" cy="50" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Wraps the last word of a title in the italic terracotta highlight. Trailing
 * punctuation stays outside the highlight. Pass `word` to pick a different one.
 * Non-string titles are returned unchanged (the caller placed its own <Hl>).
 */
export function highlight(title: ReactNode, word?: string): ReactNode {
  if (typeof title !== "string") return title;
  const text = title;
  let start: number;
  let end: number;
  if (word) {
    start = text.lastIndexOf(word);
    if (start < 0) return text;
    end = start + word.length;
  } else {
    const match = /(\S+?)([.,!?:;…]*)\s*$/.exec(text);
    if (!match || match.index === 0) return text;
    start = match.index;
    end = start + match[1]!.length;
  }
  return (
    <>
      {text.slice(0, start)}
      <Hl>{text.slice(start, end)}</Hl>
      {text.slice(end)}
    </>
  );
}

/** One highlighted word in a title. */
export function Hl({ children }: { children: ReactNode }) {
  return <em className="hl">{children}</em>;
}

/* ---- Line icons, 1.5px stroke, currentColor ---- */

type IconProps = { size?: number; className?: string };

export function LanternIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v2M9.5 4h5l1 3h-7z" />
      <path d="M8.5 7c-1.5 2-2 4-2 6.5S7.5 18 9 19.5h6c1.5-1.5 2.5-3.5 2.5-6S17 9 15.5 7" />
      <path d="M12 7v12.5M9 10.5h6M8 14h8" />
      <path d="M10 19.5 10.5 22h3l.5-2.5" />
    </svg>
  );
}

export function DoorIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 22V10a8 8 0 0 1 16 0v12" />
      <path d="M7.5 22V11a4.5 4.5 0 0 1 9 0v11" />
      <path d="M2.5 22h19M14 16.5h.01" />
    </svg>
  );
}

export function StarIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
      <rect x="5.5" y="5.5" width="13" height="13" />
      <rect x="5.5" y="5.5" width="13" height="13" transform="rotate(45 12 12)" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}
