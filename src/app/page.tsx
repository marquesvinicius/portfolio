"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, User, Briefcase, MessageSquare } from "lucide-react";
import { useFeaturedProjects } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";


export default function Home() {
  const { projects: featuredProjects, loading, error } = useFeaturedProjects();

  const techStack = [
    "HTML", "CSS", "JavaScript", "Java", "Bootstrap", "Bulma", 
    "PostgreSQL", "Node.js", "React"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 gradient-modern">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout - Vertical Stack */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-6">
            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Marques Vinícius
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-muted-foreground">
                desenvolvedor em desenvolvimento
              </p>
            </div>
            
            {/* Profile Image */}
            <div className="flex justify-center py-4">
              <div className="relative">
                <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-primary overflow-hidden bg-gradient-card shadow-2xl">
                  <Image
                    src="/assets/images/avatar.png"
                    alt="Marques Vinícius"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="w-full px-4 space-y-4">
              <Button asChild variant="default" size="lg" className="w-full h-14 text-lg font-semibold">
                <Link href="/projetos">
                  Ver Projetos <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full h-14 text-lg font-semibold hover:bg-muted/50 hover:text-foreground border-secondary">
                <Link href="/sobre">
                  Sobre Mim
                </Link>
              </Button>
            </div>
          </div>

          {/* Desktop Layout - Horizontal Grid */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                  Marques Vinícius
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                  desenvolvedor em desenvolvimento
                </p>
                <div className="flex gap-4 mb-8">
                  <Button asChild variant="default" size="lg">
                    <Link href="/projetos">
                      Ver Projetos <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="hover:bg-muted/50 hover:text-foreground border-secondary">
                    <Link href="/sobre">
                      Sobre Mim
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-96 h-96 lg:w-[28rem] lg:h-[28rem] rounded-full border-4 border-primary overflow-hidden bg-gradient-card">
                  {/* Sua foto pessoal */}
                  <Image
                    src="/assets/images/avatar.png"
                    alt="Marques Vinícius"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Card className="gradient-card border-gray-700">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Sobre mim Section */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center">
                    <User className="mr-3 h-7 w-7 text-primary" />
                    Sobre mim
                  </h2>
                  <div className="space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      Apaixonado por tecnologia desde a infância, hoje estudo 
                      Sistemas de Informação na Universidade Federal de Goiás e estou à 
                      procura da minha primeira experiência no mercado de trabalho como 
                      desenvolvedor.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      No momento, tenho conhecimento e já trabalhei com diversas 
                      tecnologias, entre outras: HTML, CSS, JavaScript, Java, 
                      Bootstrap, Bulma, PostgreSQL, Node.js, React.
                    </p>
                  </div>
                </div>

                {/* Tecnologias Section */}
                <div className="lg:border-l lg:border-border/30 lg:pl-8 flex flex-col justify-center">
                  {/* Mobile Divider */}
                  <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-border/30 to-transparent mb-4"></div>
                  
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground flex items-center">
                      <Code className="mr-3 h-7 w-7 text-primary" />
                      Tecnologias
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="bg-secondary/80 text-foreground border-secondary hover:bg-muted/50 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Briefcase className="mr-3 h-8 w-8 text-primary" />
            Projetos em Destaque
          </h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">Carregando projetos...</div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-yellow-500 mb-4">⚠️ Conectando com Sanity CMS...</div>
              <div className="text-sm text-muted-foreground">
                Ainda não há projetos no Sanity. 
                <br />
                Vá para <code className="bg-muted px-2 py-1 rounded">/studio</code> para adicionar projetos.
              </div>
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground mb-4">📝 Nenhum projeto encontrado</div>
              <div className="text-sm text-muted-foreground">
                Adicione projetos no <Link href="/studio" className="text-primary underline">Sanity Studio</Link>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Card key={project._id} className="gradient-card border-secondary hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden group">
                      {project.thumbnail ? (
                        <Image
                          src={urlFor(project.thumbnail).width(400).height(225).url()}
                          alt={project.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <Code className="w-16 h-16 text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech?.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-secondary text-foreground bg-secondary/30 hover:bg-secondary/50 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full hover:bg-muted/50 hover:text-foreground border-secondary">
                      <Link href={`/projetos/${project.slug.current}`}>Ver Projeto</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Button asChild variant="default" size="lg">
              <Link href="/projetos">
                Ver Todos os Projetos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Preview */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <MessageSquare className="mr-3 h-8 w-8 text-primary" />
            Últimos Posts do Blog
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for blog posts */}
            <Card className="gradient-card border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Em breve...</h3>
                <p className="text-muted-foreground">
                  Posts sobre desenvolvimento, tecnologia e muito mais em breve!
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="default" size="lg">
              <Link href="/blog">
                Ver Todos os Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      

    </div>
  );
}
