"use client";

/**
 * Client Component: splits a headline into words for the CSS reveal (each
 * word slides up out of a mask, 60ms apart). The last word gets the italic
 * terracotta highlight unless `highlight` is false. When Google Translate is
 * active (googtrans cookie) it renders the plain sentence instead, so the
 * headline is translated as a whole rather than word by word.
 */
import { Fragment, useSyncExternalStore } from "react";
import { readTranslateLang } from "@/components/layout/LanguageDropdown";
import { highlight as withHighlight } from "@/components/moroccan";

const noop = () => () => {};

export function RevealWords({ text, highlight = true }: { text: string; highlight?: boolean }) {
  const lang = useSyncExternalStore(noop, readTranslateLang, () => "en");
  if (lang !== "en") return <span>{highlight ? withHighlight(text) : text}</span>;
  const words = text.split(" ");
  const last = words.length - 1;
  return (
    <span className="reveal-words">
      {words.map((word, i) => {
        // Trailing punctuation stays outside the italic highlight.
        const [, core = word, punct = ""] = /^(.*?)([.,!?:;…]*)$/.exec(word) ?? [];
        return (
          <Fragment key={`${word}-${i}`}>
            <span className="w">
              {highlight && i === last && i > 0 ? (
                <span>
                  <em className="hl">{core}</em>
                  {punct}
                </span>
              ) : (
                <span>{word}</span>
              )}
            </span>
            {i < last ? " " : null}
          </Fragment>
        );
      })}
    </span>
  );
}
