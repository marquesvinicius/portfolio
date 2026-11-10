"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getLenis } from "./SmoothScroll";
import { Button } from "./ui/button";

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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      getLenis()?.start();
    };
  }, [index, images.length, onChange]);

  return createPortal(
    <div
      className="lightbox"
      onClick={() => onChange(null)}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — imagem ${index + 1} de ${images.length}`}
    >
      <Button
        variant="secondary"
        size="icon"
        className="lightbox-close"
        onClick={(e) => {
          e.stopPropagation();
          onChange(null);
        }}
        aria-label="Fechar"
      >
        <X />
      </Button>
      {index > 0 && (
        <Button
          variant="secondary"
          size="icon"
          className="lightbox-prev"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Imagem anterior"
        >
          <ChevronLeft />
        </Button>
      )}
      {index < images.length - 1 && (
        <Button
          variant="secondary"
          size="icon"
          className="lightbox-next"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Próxima imagem"
        >
          <ChevronRight />
        </Button>
      )}

      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <Image
          src={urlFor(images[index]).width(1600).url()}
          alt={`${title} — imagem ${index + 1}`}
          width={1600}
          height={1000}
          className="rounded-xl border border-[var(--hairline)] object-contain"
        />
        {images.length > 1 && (
          <span className="lightbox-count">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        )}
      </div>
    </div>,
    document.body,
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
            className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-[var(--hairline)] bg-card"
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
