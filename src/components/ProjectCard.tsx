import Link from "next/link";
import Image from "next/image";
import Aurora, { presetFor } from "./aurora/Aurora";
import { urlFor, type SanityProject } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { categoryLabels, statusLabels } from "@/lib/site";

interface ProjectCardProps {
  project: SanityProject;
}

/** Case card editorial: metadados, capa aurora com o nome, faixa de telas e tags. */
export default function ProjectCard({ project }: ProjectCardProps) {
  const href = `/projetos/${project.slug.current}`;
  const year = project.publishedAt ? new Date(project.publishedAt).getFullYear() : null;
  const screens = [project.thumbnail, ...(project.gallery ?? [])].filter((img): img is SanityImageSource => Boolean(img)).slice(0, 2);
  const maxTechs = 5;
  const techs = project.tech?.slice(0, maxTechs) ?? [];
  const remaining = (project.tech?.length ?? 0) - maxTechs;

  return (
    <article className="case surface">
      <Link href={href} className="case-link" aria-label={`Ver ${project.title}`} />

      <div className="case-meta">
        <span>{project.title}</span>
        <span>{categoryLabels[project.category] ?? project.category}</span>
        <small className="line-clamp-1">{project.description}</small>
        <small>{year ?? statusLabels[project.status]}</small>
      </div>

      <div className="cover">
        <Aurora preset={presetFor(project.slug.current)} />
        <div className="logo-lock">
          <b>{project.title}</b>
          <small>{statusLabels[project.status] ?? "Projeto"}</small>
        </div>
      </div>

      {screens.length > 0 && (
        <div className="strip">
          <div className="s-dark">
            <small>Stack</small>
            <b>{project.tech?.slice(0, 2).join(" + ") || "—"}</b>
          </div>
          {screens.map((img, i) => (
            <div key={i}>
              <Image
                src={urlFor(img).width(480).height(300).url()}
                alt={`${project.title} — tela ${i + 1}`}
                fill
                sizes="(max-width: 768px) 33vw, 200px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="case-foot">
        <div className="flex flex-wrap gap-1.5">
          {techs.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
          {remaining > 0 && <span className="tag">+{remaining}</span>}
        </div>
        <Link href={href} className="case-view">
          Ver estudo de caso <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
