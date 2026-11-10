"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState, use } from "react";
import { ExternalLink, Github, Play } from "lucide-react";
import { client, projectBySlugQuery, urlFor } from "@/lib/sanity";
import type { SanityProject } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { categoryLabels, statusLabels } from "@/lib/site";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ImageGallery, { Lightbox } from "@/components/ImageGallery";
import Aurora, { presetFor } from "@/components/aurora/Aurora";
import { Button, ButtonArrow } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProjetoPage({ params }: Props) {
  const { slug } = use(params);
  const [project, setProject] = useState<SanityProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await client.fetch(projectBySlugQuery, { slug });
        if (!data) notFound();
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar projeto");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="grid min-h-svh place-items-center">
        <span className="font-pixel text-sm text-muted-foreground">Carregando projeto…</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="grid min-h-svh place-items-center px-4 text-center">
        <div>
          <h1 className="display text-5xl">Projeto não encontrado</h1>
          <p className="mt-4 text-muted-foreground">{error || "O projeto que você procura não existe."}</p>
          <Button asChild variant="secondary" className="mt-8">
            <Link href="/projetos">
              <ButtonArrow direction="left" /> Voltar aos projetos
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const year = project.publishedAt ? new Date(project.publishedAt).getFullYear() : null;
  const images = [project.thumbnail, ...(project.gallery ?? [])].filter((img): img is SanityImageSource => Boolean(img));
  const links = [
    project.links?.demo && { href: project.links.demo, label: "Ver demo", icon: ExternalLink, primary: true },
    project.links?.repository && { href: project.links.repository, label: "Código", icon: Github },
    project.links?.video && { href: project.links.video, label: "Vídeo", icon: Play },
    project.links?.external && { href: project.links.external, label: "Saiba mais", icon: ExternalLink },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github; primary?: boolean }[];

  const facts = [
    { label: "Categoria", value: categoryLabels[project.category] ?? project.category },
    { label: "Status", value: statusLabels[project.status] ?? project.status },
    year && { label: "Ano", value: String(year) },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <PageHeader
        backHref="/projetos"
        backLabel="Todos os projetos"
        kicker={`Projeto${project.featured ? " · Destaque" : ""}`}
        title={project.title}
        description={project.description}
      >
        {links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {links.map(({ href, label, icon: Icon, primary }) => (
              <Button key={href} asChild variant={primary ? "primary" : "secondary"}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-4 w-4" /> {label} <ButtonArrow direction="up-right" />
                </a>
              </Button>
            ))}
          </div>
        )}
      </PageHeader>

      <section className="pb-24">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Capa */}
          <Reveal className="lg:col-span-2">
            {project.thumbnail ? (
              <button
                onClick={() => setZoom(0)}
                className="group relative block aspect-video w-full overflow-hidden rounded-3xl border border-[var(--hairline)] bg-card"
                aria-label="Ampliar capa"
              >
                <Image
                  src={urlFor(project.thumbnail).width(1600).height(900).url()}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
              </button>
            ) : (
              <div className="relative grid aspect-video place-items-center overflow-hidden rounded-3xl border border-[var(--hairline)]">
                <Aurora preset={presetFor(project.slug.current)} />
                <span className="display relative z-10 text-[clamp(36px,6vw,80px)]">{project.title}</span>
              </div>
            )}
          </Reveal>

          {/* Conteúdo */}
          <div className="grid content-start gap-10">
            {project.longDescription && (
              <Reveal>
                <span className="kicker">Sobre o projeto</span>
                <MarkdownRenderer content={project.longDescription} className="max-w-[68ch]" />
              </Reveal>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <Reveal>
                <span className="kicker">Destaques</span>
                <ul className="grid gap-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-4 border-t border-[var(--hairline)] pt-3 text-muted-foreground">
                      <span className="font-pixel text-xs text-ember">{String(i + 1).padStart(2, "0")}</span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          {/* Ficha técnica */}
          <Reveal as="aside" className="surface h-fit p-6 lg:sticky lg:top-24">
            <dl className="grid gap-4">
              {facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-4 border-b border-[var(--hairline)] pb-3 text-sm">
                  <dt className="text-muted-foreground">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            {project.tech?.length > 0 && (
              <>
                <span className="kicker mt-6">Tecnologias</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </Reveal>
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="pb-24">
          <div className="wrap">
            <Reveal className="section-head">
              <div>
                <span className="kicker">Galeria</span>
                <h2>Telas</h2>
              </div>
            </Reveal>
            <ImageGallery images={project.gallery} projectTitle={project.title} />
          </div>
        </section>
      )}

      <section className="py-24">
        <Reveal className="wrap text-center">
          <p className="display text-[clamp(32px,4vw,56px)]">Quer ver mais?</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="secondary">
              <Link href="/contato">Entrar em contato</Link>
            </Button>
            <Button asChild variant="primary">
              <Link href="/projetos">
                Outros projetos <ButtonArrow />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      {zoom !== null && <Lightbox images={images} index={zoom} title={project.title} onChange={setZoom} />}
    </>
  );
}
