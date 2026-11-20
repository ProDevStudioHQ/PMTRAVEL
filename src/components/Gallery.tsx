"use client";

/**
 * Client Component: masonry gallery with an accessible lightbox (dialog,
 * focus moved in and restored, Escape/arrow keys, prev/next buttons).
 * Images arrive as plain records from the server.
 */
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export type GalleryItem = { key: string; src: string; width: number; height: number; alt: string; location?: string };

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    openerRef.current?.focus();
  }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const current = index !== null ? items[index] : undefined;

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {items.map((item, i) => (
          <li key={item.key} className="break-inside-avoid">
            <button
              type="button"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setIndex(i);
              }}
              className="group relative block w-full overflow-hidden rounded-2xl"
            >
              <Image
                data-image-key={item.key}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
                className="card-img h-auto w-full transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-midnight/70 to-transparent p-4 text-left text-sm text-sand opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <span>{item.location}</span>
                <ZoomIn aria-hidden="true" size={18} />
              </span>
              <span className="sr-only">Open larger: {item.location ?? item.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current ? (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={current.location ?? "Photograph"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="on-dark fixed inset-0 z-[70] flex flex-col bg-midnight/95 text-sand backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div className="flex items-center justify-between p-4">
              <p className="tabular text-sm text-sand/70">
                {index! + 1} / {items.length}
              </p>
              <button ref={closeRef} type="button" onClick={close} className="grid size-11 place-items-center rounded-full border border-sand/30">
                <X aria-hidden="true" size={20} />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
              <Image key={current.key} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain p-4 sm:p-10" />
            </div>
            <div className="flex items-center justify-between gap-4 p-4">
              <button type="button" onClick={() => step(-1)} className="grid size-11 place-items-center rounded-full border border-sand/30">
                <ChevronLeft aria-hidden="true" size={20} />
                <span className="sr-only">Previous photo</span>
              </button>
              <p className="max-w-2xl text-center text-sm text-sand/80">{current.alt}</p>
              <button type="button" onClick={() => step(1)} className="grid size-11 place-items-center rounded-full border border-sand/30">
                <ChevronRight aria-hidden="true" size={20} />
                <span className="sr-only">Next photo</span>
              </button>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
