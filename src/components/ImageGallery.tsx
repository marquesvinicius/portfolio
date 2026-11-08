"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getLenis } from "./SmoothScroll";

interface LightboxProps {
  images: SanityImageSource[];
  index: number;
  title: string;
  onChange: (index: number | null) => void;
}

/** Visualizador em tela cheia: setas ← → navegam, ESC ou clique fora fecha. */
export function Lightbox({ images, index, title, onChange }: LightboxProps) {
  const prev = () => index > 0 && onChange(index - 1);
  const next = () => index < images.length - 1 && onChange(index + 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowLeft" && index > 0) onChange(index - 1);
      if (e.key === "ArrowRight" && index < images.length - 1) onChange(index + 1);
    };
    window.addEventListener("keydown", onKey);
    getLenis()?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
    };
  }, [index, images.length, onChange]);

  const iconBtn =
    "absolute z-10 grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-[oklch(0.13_0.008_195/.6)] text-paper transition-colors hover:bg-[oklch(1_0_0/.1)]";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[oklch(0.08_0.004_195/.92)] p-4 backdrop-blur-md"
      onClick={() => onChange(null)}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — imagem ${index + 1} de ${images.length}`}
    >
      <button className={`${iconBtn} right-4 top-4`} onClick={() => onChange(null)} aria-label="Fechar">
        <X className="h-5 w-5" />
      </button>
      {index > 0 && (
        <button
          className={`${iconBtn} left-4 top-1/2 -translate-y-1/2`}
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {index < images.length - 1 && (
        <button
          className={`${iconBtn} right-4 top-1/2 -translate-y-1/2`}
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Próxima imagem"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <div className="relative flex max-h-[86vh] max-w-[90vw] items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <Image
          src={urlFor(images[index]).width(1600).url()}
          alt={`${title} — imagem ${index + 1}`}
          width={1600}
          height={1000}
          className="max-h-[86vh] w-auto rounded-xl border border-[var(--hairline)] object-contain"
        />
      </div>

      {images.length > 1 && (
        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-pixel text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}

interface ImageGalleryProps {
  images: SanityImageSource[];
  projectTitle: string;
}

export default function ImageGallery({ images, projectTitle }: ImageGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className="group relative aspect-video overflow-hidden rounded-xl border border-[var(--hairline)] bg-card"
            aria-label={`Ampliar imagem ${index + 1}`}
          >
            <Image
              src={urlFor(image).width(720).height(405).url()}
              alt={`${projectTitle} — imagem ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[oklch(0.1_0.004_195/.6)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {selected !== null && (
        <Lightbox images={images} index={selected} title={projectTitle} onChange={setSelected} />
      )}
    </>
  );
}
