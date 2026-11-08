"use client";

import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { usePosts } from "@/hooks/useSanity";

// Pauta dos primeiros posts, exibida enquanto não há posts publicados no Sanity
const upcoming = [
  {
    title: "Minha jornada no desenvolvimento web",
    excerpt: "Como comecei na programação e os desafios que encontrei pelo caminho.",
    category: "Carreira",
    readTime: "5 min",
  },
  {
    title: "Criando um portfólio com Next.js e Tailwind",
    excerpt: "Do mesh gradient em WebGL à tipografia editorial: os bastidores deste site.",
    category: "Tutorial",
    readTime: "10 min",
  },
  {
    title: "10 dicas para desenvolvedores iniciantes",
    excerpt: "Conselhos práticos que eu gostaria de ter recebido no começo.",
    category: "Dicas",
    readTime: "7 min",
  },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

export default function BlogPage() {
  const { posts, loading } = usePosts();
  const hasPosts = !loading && posts.length > 0;

  const rows = hasPosts
    ? posts.map((p) => ({
        key: p._id,
        title: p.title,
        excerpt: p.excerpt ?? "",
        category: p.categories?.[0] ?? "Post",
        meta: formatDate(p.publishedAt),
      }))
    : upcoming.map((p) => ({ key: p.title, title: p.title, excerpt: p.excerpt, category: p.category, meta: `Em breve · ${p.readTime}` }));

  return (
    <>
      <PageHeader
        kicker="Blog"
        title="Notas"
        description="Sobre interfaces, desenvolvimento e os bastidores dos projetos."
      />

      <section className="section pt-12">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="kicker">{hasPosts ? "Publicados" : "Em breve"}</span>
              <h2>{hasPosts ? "Últimos posts" : "Na pauta"}</h2>
            </div>
            {!hasPosts && <p>O blog está sendo preparado. Estes são os primeiros textos a caminho.</p>}
          </Reveal>

          <ol className="border-t border-[var(--line)]">
            {rows.map((r, i) => (
              <Reveal as="li" key={r.key} className="group grid gap-3 border-b border-[var(--line)] py-8 md:grid-cols-[80px_1fr_220px] md:items-baseline md:gap-8">
                <span className="font-pixel text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display text-[clamp(26px,3vw,40px)] transition-colors group-hover:text-[oklch(0.85_0.09_25)]">
                    {r.title}
                  </h3>
                  {r.excerpt && <p className="mt-3 max-w-[60ch] leading-relaxed text-muted-foreground">{r.excerpt}</p>}
                </div>
                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                  <span className="tag tag-ember">
                    <i />
                    {r.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{r.meta}</span>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-20 text-center">
            <p className="display text-[clamp(28px,3.4vw,44px)]">Enquanto isso…</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/projetos" className="btn btn-light">
                Ver projetos <span aria-hidden="true">→</span>
              </Link>
              <Link href="/contato" className="btn btn-ghost">
                Entrar em contato
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
