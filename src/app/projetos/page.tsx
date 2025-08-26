"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Filter, 
  Grid3X3, 
  List, 
  Search,
  ExternalLink,
  Play,
  Github
} from "lucide-react";
import { useProjects } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import type { SanityProject } from "@/lib/sanity";

const categories = [
  { value: "all", label: "Todos", count: 0 },
  { value: "web", label: "Web", count: 0 },
  { value: "mobile", label: "Mobile", count: 0 },
  { value: "desktop", label: "Desktop", count: 0 },
  { value: "game", label: "Jogos", count: 0 },
  { value: "api", label: "APIs", count: 0 },
  { value: "podcast", label: "Podcast", count: 0 },
  { value: "other", label: "Outros", count: 0 },
];

export default function ProjetosPage() {
  const { projects, loading, error } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filtrar projetos
  const filteredProjects = projects.filter((project: SanityProject) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Contar projetos por categoria
  const categoriesWithCount = categories.map(cat => ({
    ...cat,
    count: cat.value === "all" ? projects.length : projects.filter((p: SanityProject) => p.category === cat.value).length
  }));

  const ProjectCard = ({ project }: { project: SanityProject }) => (
    <Card 
      key={project._id} 
      className={`group gradient-card border-secondary hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden ${
        viewMode === "list" ? "flex flex-row" : ""
      }`}
    >
      <CardContent className={`${viewMode === "list" ? "p-0 flex w-full" : "p-0"}`}>
        {/* Imagem */}
        <div className={`${
          viewMode === "list" 
            ? "w-48 flex-shrink-0" 
            : "aspect-video"
        } bg-muted overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500 ${
          viewMode === "list" ? "rounded-l-lg" : "rounded-t-lg"
        }`}>
          {project.thumbnail ? (
            <Image
              src={urlFor(project.thumbnail).width(600).height(338).url()}
              alt={project.title}
              width={600}
              height={338}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-card">
              <Grid3X3 className="w-16 h-16 text-muted-foreground opacity-50" />
            </div>
          )}
          
          {/* Overlay com ações */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
            {project.links?.demo && (
              <Button 
                asChild 
                size="sm" 
                variant="secondary" 
                className="bg-white/90 text-black hover:bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Demo
                </Link>
              </Button>
            )}
            {project.links?.video && (
              <Button 
                asChild 
                size="sm" 
                variant="secondary" 
                className="bg-white/90 text-black hover:bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <Link href={project.links.video} target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-1" />
                  Vídeo
                </Link>
              </Button>
            )}
            {project.links?.repository && (
              <Button 
                asChild 
                size="sm" 
                variant="secondary" 
                className="bg-white/90 text-black hover:bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <Link href={project.links.repository} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-1" />
                  Código
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className={`p-6 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
          <div>
            {/* Header com status */}
            <div className="flex items-center justify-between mb-3">
              <Badge 
                variant={project.featured ? "default" : "secondary"}
                className={project.featured ? "bg-primary text-primary-foreground" : "bg-secondary/80 text-foreground"}
              >
                {project.featured ? "Em Destaque" : project.status === "completed" ? "Concluído" : "Em Progresso"}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize border-secondary">
                {categories.find(cat => cat.value === project.category)?.label || project.category}
              </Badge>
            </div>

            {/* Título e descrição */}
            <h3 className="text-xl font-bold text-foreground mb-3 transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
              {project.description}
            </p>

            {/* Tecnologias */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.slice(0, 4).map((tech) => (
                <Badge 
                  key={tech} 
                  variant="outline" 
                  className="border-secondary text-foreground bg-secondary/30 hover:bg-secondary/50 transition-colors text-xs"
                >
                  {tech}
                </Badge>
              ))}
              {project.tech.length > 4 && (
                <Badge variant="outline" className="border-secondary text-muted-foreground text-xs">
                  +{project.tech.length - 4}
                </Badge>
              )}
            </div>
          </div>

          {/* Botão de ação */}
          <Button 
            asChild 
            variant="outline" 
            className="w-full hover:bg-muted/50 hover:text-foreground border-secondary group-hover:border-primary transition-all"
          >
            <Link href={`/projetos/${project.slug.current}`}>
              Ver Projeto Completo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="py-12 px-6 gradient-modern">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meus Projetos
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Uma coleção dos meus trabalhos em desenvolvimento, desde jogos clássicos 
            até aplicações web modernas e projetos de mídia.
          </p>
          
          {/* Estatísticas */}
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Projetos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {projects.filter((p: SanityProject) => p.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">Concluídos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {new Set(projects.flatMap((p: SanityProject) => p.tech)).size}
              </div>
              <div className="text-sm text-muted-foreground">Tecnologias</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros e Busca */}
      <section className="py-8 px-6 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar projetos, tecnologias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-secondary rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground"
              />
            </div>

            {/* Controles de visualização */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="border-secondary"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="border-secondary"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Categorias */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categoriesWithCount.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className="border-secondary"
              >
                {category.label}
                {category.count > 0 && (
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Projetos */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-foreground">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              Carregando projetos...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">
              <p className="text-lg">Erro ao carregar projetos: {error}</p>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()} 
                className="mt-4 border-secondary"
              >
                Tentar Novamente
              </Button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <Filter className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Nenhum projeto encontrado</p>
              <p className="text-sm">Tente ajustar os filtros ou termo de busca</p>
            </div>
          ) : (
            <div className={`${
              viewMode === "grid" 
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
                : "flex flex-col gap-6"
            }`}>
              {filteredProjects.map((project: SanityProject) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}

          {/* CTA para mais projetos */}
          {!loading && !error && filteredProjects.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Gostou dos projetos? Vamos trabalhar juntos!
              </p>
              <Button asChild variant="default" size="lg">
                <Link href="/contato">
                  Entre em Contato
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
