"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { presetFor } from "./aurora/Aurora";
import { urlFor, type SanityProject } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { categoryLabels, statusLabels } from "@/lib/site";

interface ProjectCardProps {
  project: SanityProject;
}

/**
 * Split card editorial (inspirado no protótipo do design-lab):
 * - Topo: imagem do projeto sob a aurora. Em repouso a aurora tinge a imagem; no hover o efeito some e a imagem original aparece.
 * - Setas (hover/foco) navegam pelas imagens do projeto sem sair do card.
 * - Base: ano e categoria, título em Geist Serif, resumo e stack. O card inteiro é o link para o projeto.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const href = `/projetos/${project.slug.current}`;
  const year = project.publishedAt ? new Date(project.publishedAt).getFullYear() : null;
  const images = [project.thumbnail, ...(project.gallery ?? [])].filter(
    (img): img is SanityImageSource => Boolean(img)
  );
  const [slide, setSlide] = useState(0);

  const go = (delta: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSlide((s) => (s + delta + images.length) % images.length);
  };

  const categoryText = categoryLabels[project.category] ?? project.category;
  const techs = project.tech?.slice(0, 4).join(" / ") || "Build / Integrate / Ship";
  const preset = presetFor(project.slug.current);
  const hasImages = images.length > 0;

  return (
    <article className="split-card group">
      <Link href={href} className="case-link" aria-label={`Ver ${project.title}`} />

      <div className="split-top">
        {hasImages &&
          images.map((img, idx) => (
            <div key={idx} className={`split-media ${slide === idx ? "is-visible" : ""}`} aria-hidden={slide !== idx}>
              <Image
                src={urlFor(img).width(960).height(600).url()}
                alt={`${project.title} — imagem ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          ))}

        {/* Aurora do design-lab: sobre a imagem tinge (efeito); sem imagem é o próprio fundo */}
        <div className={`aurora split-aurora preset-${preset} ${hasImages ? "is-tint" : ""}`} aria-hidden="true">
          <div className="blob b2" style={{ left: 0, top: 0, width: "70%" }} />
          <div className="blob b1" style={{ left: "40%", top: "20%" }} />
          <div className="blob b4" style={{ left: "50%", top: "-10%" }} />
          <div className="blob b5" style={{ left: "20%", top: "30%", width: "40%" }} />
          <div className="dots" style={{ maskImage: "none", WebkitMaskImage: "none", opacity: 0.35 }} />
          <div className="grain" />
        </div>

        {images.length > 1 && (
          <>
            <button type="button" onClick={go(-1)} className="split-nav split-nav--prev" aria-label="Imagem anterior do projeto">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={go(1)} className="split-nav split-nav--next" aria-label="Próxima imagem do projeto">
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="split-dots" aria-hidden="true">
              {images.map((_, i) => (
                <span key={i} className={`split-dot ${slide === i ? "on" : ""}`} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="split-bottom">
        <div className="split-row">
          <span className="split-tag">{year ?? statusLabels[project.status] ?? "MV"}</span>
          <span>{categoryText}</span>
        </div>

        <div className="split-body">
          <h4>{project.title}</h4>
          {project.description && <p className="split-desc line-clamp-2">{project.description}</p>}
        </div>

        <div className="split-row split-foot">
          <span className="truncate">{techs}</span>
        </div>
      </div>
    </article>
  );
}
