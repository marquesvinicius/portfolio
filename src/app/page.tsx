"use client";

import Link from "next/link";
import MeshGradient from "@/components/aurora/MeshGradient";
import TechOrbit from "@/components/TechOrbit";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { Button, ButtonArrow } from "@/components/ui/button";
import { useFeaturedProjects } from "@/hooks/useSanity";

export default function Home() {
  const { projects, loading, error } = useFeaturedProjects();

  return (
    <>
      {/* ============ HERO: composição centralizada, espaço negativo, fundo protagonista ============ */}
      <section className="hero">
        <MeshGradient />

        <div className="hero-center">
          <h1 className="hero-title">
            <span className="rise-line">
              <span>Marques</span>
            </span>{" "}
            <span className="rise-line">
              <span>V.</span>
            </span>
          </h1>
          <p className="hero-tagline">Full-stack engineering · UX · AI-driven development</p>
          <p className="hero-desc">
            Transformando ideias complexas em experiências digitais intuitivas e bem construídas.
          </p>
        </div>

        <div className="hero-foot">
          <a className="scroll-cue" href="#stack">
            <span>Explore</span>
            <span className="bar" />
          </a>
        </div>
      </section>

      {/* ============ ÓRBITA TECNOLÓGICA ============ */}
      <section id="stack" className="relative overflow-hidden border-t border-[oklch(1_0_0/.05)] pt-[110px] pb-[60px]">
        <Reveal className="wrap grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div className="max-w-[42ch] max-lg:mx-auto max-lg:text-center">
            <span className="kicker">Ecossistema</span>
            <h2 className="display text-[clamp(38px,5.5vw,76px)]">Arquitetura &amp; Stack</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Um núcleo enxuto para construir aplicações ponta a ponta — da experiência na interface à modelagem
              relacional e automação com IA.
            </p>
            <div className="mt-7 flex gap-5 text-xs tracking-wide text-muted-foreground max-lg:justify-center">
              <span className="inline-flex items-center gap-2">
                <i className="legend-dot pri" />
                Stack principal
              </span>
              <span className="inline-flex items-center gap-2">
                <i className="legend-dot sec" />
                Ferramentas complementares
              </span>
            </div>
          </div>
          <TechOrbit />
        </Reveal>
      </section>

      {/* ============ PROJETOS EM DESTAQUE ============ */}
      <section className="section" id="projetos">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="kicker">Projetos</span>
              <h2>Trabalhos selecionados</h2>
            </div>
            <p>Do sistema de pedidos ao jogo em C: projetos em que cuidei da interface ao banco de dados.</p>
          </Reveal>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[0, 1].map((i) => (
                <div key={i} className="surface aspect-[4/3] animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <p className="surface p-8 text-center text-muted-foreground">
              Não foi possível carregar os projetos agora. Tente novamente em instantes.
            </p>
          ) : projects.length === 0 ? (
            <p className="surface p-8 text-center text-muted-foreground">
              Nenhum projeto em destaque ainda. Marque projetos como destaque no{" "}
              <Link href="/studio" className="text-paper underline underline-offset-4">
                Sanity Studio
              </Link>
              .
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <Reveal key={project._id}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-12 flex justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/projetos">
                Ver todos os projetos <ButtonArrow />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
