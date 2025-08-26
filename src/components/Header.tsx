"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Projetos", href: "/projetos" },
  { name: "Blog", href: "/blog" },
  { name: "Contato", href: "/contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-secondary">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              MV
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:text-primary"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-0 gradient-card border-l-2 border-primary">
              <div className="flex flex-col h-full">
                {/* Header */}
                <SheetHeader className="p-6 border-b border-primary/30 bg-gradient-accent">
                  <SheetTitle className="text-center">
                    <Link 
                      href="/" 
                      className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      Marques Vinícius
                    </Link>
                  </SheetTitle>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    desenvolvedor em desenvolvimento
                  </p>
                </SheetHeader>
                
                {/* Navigation */}
                <div className="flex-1 flex flex-col justify-center p-6">
                  <nav className="space-y-3">
                    {navigation.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group block w-full text-center py-4 px-6 text-lg font-semibold text-foreground hover:text-foreground bg-secondary/20 hover:bg-primary/20 rounded-xl transition-all duration-300 border border-secondary/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                        onClick={() => setOpen(false)}
                        style={{
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <span className="group-hover:scale-105 inline-block transition-transform duration-300">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                  
                  {/* Social Links */}
                  <div className="mt-8 pt-6 border-t border-primary/30">
                    <p className="text-center text-sm font-medium text-muted-foreground mb-4">
                      Conecte-se comigo
                    </p>
                    <div className="flex justify-center gap-4">
                      <Link
                        href="https://github.com/marquesvinicius"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 text-foreground hover:text-foreground bg-secondary/30 hover:bg-primary/20 rounded-full transition-all duration-300 border border-secondary/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-110"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://linkedin.com/in/marquesviniciusmelomartins/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 text-foreground hover:text-foreground bg-secondary/30 hover:bg-primary/20 rounded-full transition-all duration-300 border border-secondary/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-110"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-foreground px-3 py-2 rounded-md transition-all duration-300 hover:text-red-400 hover:shadow-2xl hover:shadow-red-600/60"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Social links */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link
            href="https://github.com/marquesvinicius"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground p-2 rounded-md transition-all duration-300 hover:text-red-400 hover:shadow-2xl hover:shadow-red-600/60"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/marquesviniciusmelomartins/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground p-2 rounded-md transition-all duration-300 hover:text-red-400 hover:shadow-2xl hover:shadow-red-600/60"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>


      </nav>
    </header>
  );
}
