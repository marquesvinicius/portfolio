"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { Button, ButtonArrow } from "@/components/ui/button";
import { useProjects } from "@/hooks/useSanity";
import { categoryLabels } from "@/lib/site";
import type { SanityProject } from "@/lib/sanity";

export default function ProjetosPage() {
  const { projects, loading, error } = useProjects();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const term = search.toLowerCase();
  const filtered = projects.filter((p: SanityProject) => {
    const matchesCategory = category === "all" || p.category === category;
    const matchesSearch =
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.tech?.some((t) => t.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });

  // só mostra categorias que têm projetos
  const categories = [
    { value: "all", label: "Todos", count: projects.length },
    ...Object.entries(categoryLabels)
      .map(([value, label]) => ({ value, label, count: projects.filter((p) => p.category === value).length }))
      .filter((c) => c.count > 0),
  ];

  const stats = [
    { label: "Projetos", value: projects.length },
    { label: "Concluídos", value: projects.filter((p) => p.status === "completed").length },
    { label: "Tecnologias", value: new Set(projects.flatMap((p) => p.tech ?? [])).size },
  ];

  return (
    <>
      <PageHeader
        kicker="Projetos"
        title="Trabalhos"
        description="Do jogo em C à aplicação web completa, com API, banco e deploy."
      >
        <div className="flex flex-wrap gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="display text-3xl">{loading ? "—" : s.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[.16em] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </PageHeader>

      <section className="section pt-12">
        <div className="wrap">
          <Reveal className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Button
                  key={c.value}
                  variant={category === c.value ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setCategory(c.value)}
                  aria-pressed={category === c.value}
                >
                  {c.label}
                  <span className="font-pixel text-[10px] opacity-60">{c.count}</span>
                </Button>
              ))}
            </div>
            <label className="relative w-full lg:max-w-xs">
              <span className="sr-only">Buscar projetos</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar projetos, tecnologias..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="field !pl-10"
              />
            </label>
          </Reveal>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="surface aspect-[4/3] animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="surface p-10 text-center">
              <p className="text-muted-foreground">Não foi possível carregar os projetos.</p>
              <Button variant="secondary" onClick={() => window.location.reload()} className="mt-6">
                Tentar novamente
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="surface p-10 text-center text-muted-foreground">
              <p>Nenhum projeto encontrado.</p>
              <p className="mt-1 text-sm">Tente outra categoria ou termo de busca.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filtered.map((project) => (
                <Reveal key={project._id}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <Reveal className="mt-20 text-center">
              <p className="display text-[clamp(28px,3.4vw,44px)]">Gostou do que viu?</p>
              <Button asChild variant="primary" className="mt-6">
                <Link href="/contato">
                  Vamos conversar <ButtonArrow />
                </Link>
              </Button>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
