"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState, use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Play,
  Calendar,
  Star,
  Code,
  Lightbulb,
  X,
  ZoomIn
} from "lucide-react";
import { client, projectBySlugQuery, urlFor } from "@/lib/sanity";
import type { SanityProject } from "@/lib/sanity";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ImageGallery from "@/components/ImageGallery";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProjetoPage({ params }: Props) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<SanityProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await client.fetch(projectBySlugQuery, { slug: resolvedParams.slug });
        if (!data) {
          notFound();
        }
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar projeto');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-foreground">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          Carregando projeto...
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Projeto não encontrado</h1>
          <p className="text-muted-foreground mb-6">
            {error || 'O projeto que você está procurando não existe.'}
          </p>
          <Button asChild variant="default">
            <Link href="/projetos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Projetos
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      {/* Navegação */}
      <div className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <Button asChild variant="outline" className="mb-6 border-secondary hover:bg-muted/50">
            <Link href="/projetos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Projetos
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero do Projeto */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Informações do projeto */}
            <div className="space-y-6">
              {/* Header com badges */}
              <div className="flex flex-wrap gap-3">
                <Badge 
                  variant={project.featured ? "default" : "secondary"}
                  className={project.featured ? "bg-primary text-primary-foreground" : "bg-secondary/80 text-foreground"}
                >
                  {project.featured && <Star className="w-3 h-3 mr-1" />}
                  {project.featured ? "Projeto em Destaque" : "Projeto"}
                </Badge>
                <Badge variant="outline" className="capitalize border-secondary">
                  {project.category === "web" ? "Web" :
                   project.category === "mobile" ? "Mobile" :
                   project.category === "desktop" ? "Desktop" :
                   project.category === "game" ? "Jogo" :
                   project.category === "api" ? "API" :
                   project.category === "podcast" ? "Podcast" :
                   "Outros"}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`border-secondary ${
                    project.status === "completed" ? "text-green-400 border-green-400/50" :
                    project.status === "in-progress" ? "text-yellow-400 border-yellow-400/50" :
                    "text-gray-400 border-gray-400/50"
                  }`}
                >
                  {project.status === "completed" ? "Concluído" :
                   project.status === "in-progress" ? "Em Progresso" :
                   "Arquivado"}
                </Badge>
              </div>

              {/* Título e descrição */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tecnologias */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Code className="mr-2 h-5 w-5 text-primary" />
                  Tecnologias Utilizadas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className="border-secondary text-foreground bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Links de ação */}
              <div className="flex flex-wrap gap-4">
                {project.links?.demo && (
                  <Button asChild variant="default" size="lg">
                    <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver Demo
                    </Link>
                  </Button>
                )}
                {project.links?.video && (
                  <Button asChild variant="outline" size="lg" className="border-secondary">
                    <Link href={project.links.video} target="_blank" rel="noopener noreferrer">
                      <Play className="mr-2 h-4 w-4" />
                      Ver Vídeo
                    </Link>
                  </Button>
                )}
                {project.links?.repository && (
                  <Button asChild variant="outline" size="lg" className="border-secondary">
                    <Link href={project.links.repository} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Ver Código
                    </Link>
                  </Button>
                )}
                {project.links?.external && (
                  <Button asChild variant="outline" size="lg" className="border-secondary">
                    <Link href={project.links.external} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Saiba Mais
                    </Link>
                  </Button>
                )}
              </div>

              {/* Data de publicação */}
              {project.publishedAt && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Criado em {new Date(project.publishedAt).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              )}
            </div>

            {/* Imagem principal */}
            <div className="order-first lg:order-last">
              <Card className="gradient-card border-secondary overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="aspect-video relative group cursor-pointer"
                    onClick={() => project.thumbnail && setSelectedImage(0)}
                  >
                    {project.thumbnail ? (
                      <>
                        <Image
                          src={urlFor(project.thumbnail).width(800).height(450).url()}
                          alt={project.title}
                          width={800}
                          height={450}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          priority
                        />
                        {/* Overlay de zoom */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <ZoomIn className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-card">
                        <Code className="w-24 h-24 text-muted-foreground opacity-50" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Descrição detalhada */}
      {project.longDescription && (
        <section className="px-6 mb-12">
          <div className="max-w-4xl mx-auto">
            <Card className="gradient-card border-secondary">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <Lightbulb className="mr-3 h-6 w-6 text-primary" />
                  Sobre o Projeto
                </h2>
                <MarkdownRenderer 
                  content={project.longDescription} 
                  className="max-w-none"
                />
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Destaques do projeto */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="px-6 mb-12">
          <div className="max-w-4xl mx-auto">
            <Card className="gradient-card border-secondary">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <Star className="mr-3 h-6 w-6 text-primary" />
                  Principais Características
                </h2>
                <ul className="space-y-3">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Galeria de imagens */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="px-6 mb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Galeria do Projeto
            </h2>
            <ImageGallery images={project.gallery} projectTitle={project.title} />
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="gradient-card border-secondary">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Gostou deste projeto?
              </h2>
              <p className="text-muted-foreground mb-6">
                Fique à vontade para explorar outros projetos ou entrar em contato comigo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="default" size="lg">
                  <Link href="/projetos">
                    Ver Outros Projetos
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-secondary hover:bg-muted/50 hover:text-foreground">
                  <Link href="/contato">
                    Entre em Contato
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modal de imagem expandida para imagem principal */}
      {selectedImage !== null && project?.thumbnail && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSelectedImage(null);
          }}
          tabIndex={0}
        >
          {/* Botão de fechar */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-60"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Imagem principal */}
          <div 
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlFor(project.thumbnail).width(1200).height(800).url()}
              alt={project.title}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Indicação de como fechar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-xs text-center">
            Clique fora da imagem ou pressione ESC para fechar
          </div>
        </div>
      )}
    </div>
  );
}
