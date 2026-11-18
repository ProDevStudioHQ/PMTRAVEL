"use client";

/**
 * Client Component: splits a headline into words for the CSS word-by-word
 * reveal. When Google Translate is active (googtrans cookie), it renders the
 * plain sentence instead, so the headline is translated as a whole rather
 * than word by word.
 */
import { Fragment, useSyncExternalStore } from "react";
import { readTranslateLang } from "@/components/layout/LanguageDropdown";

const noop = () => () => {};

export function RevealWords({ text }: { text: string }) {
  const lang = useSyncExternalStore(noop, readTranslateLang, () => "en");
  if (lang !== "en") return <span>{text}</span>;
  const words = text.split(" ");
  return (
    <span className="reveal-words">
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="w">{word}</span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
