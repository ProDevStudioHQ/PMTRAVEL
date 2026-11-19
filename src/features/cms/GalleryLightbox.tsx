"use client";

/**
 * Client Component: programme gallery with a lightbox. Uses the native
 * <dialog> element, so Escape, focus trapping and the backdrop come from the
 * browser. Arrow keys move between photos. The large image only loads when
 * the lightbox opens.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { CmsImage } from "@/features/cms/CmsImage";
import type { Image as CmsImageData } from "@/types/cms";

export function GalleryLightbox({ images, title }: { images: CmsImageData[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)), [images.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setIndex(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
        {images.map((image, i) => (
          <li key={`${image.url}-${i}`} className={i === 0 && images.length > 2 ? "col-span-2 row-span-2" : ""}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block aspect-[4/3] h-full w-full overflow-hidden rounded-card bg-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            >
              <CmsImage image={image} fill sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"} className="card-img object-cover" />
              <span className="sr-only">
                Open photo {i + 1} of {images.length}: {image.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title}: photos`}
        className="m-auto h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-midnight/90"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current ? (
          <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-12">
            <figure className="relative h-full w-full max-w-6xl">
              <div className="relative h-[calc(100%-3rem)] w-full">
                <CmsImage image={current} fill sizes="100vw" className="object-contain" />
              </div>
              <figcaption className="mt-3 text-center text-sm text-sand/85">
                {current.alt} <span className="tabular text-sand/60">({(index ?? 0) + 1} / {images.length})</span>
              </figcaption>
            </figure>
            <button type="button" onClick={close} className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-midnight/70 text-sand hover:bg-midnight">
              <X aria-hidden="true" size={22} />
              <span className="sr-only">Close photos</span>
            </button>
            {images.length > 1 ? (
              <>
                <button type="button" onClick={() => step(-1)} className="absolute left-2 grid size-11 place-items-center rounded-full bg-midnight/70 text-sand hover:bg-midnight sm:left-4">
                  <ChevronLeft aria-hidden="true" size={24} />
                  <span className="sr-only">Previous photo</span>
                </button>
                <button type="button" onClick={() => step(1)} className="absolute right-2 grid size-11 place-items-center rounded-full bg-midnight/70 text-sand hover:bg-midnight sm:right-4">
                  <ChevronRight aria-hidden="true" size={24} />
                  <span className="sr-only">Next photo</span>
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}
