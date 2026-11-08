"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

const focus = [
  {
    title: "UX/UI & interfaces",
    text: "Interfaces claras, acessíveis e com atenção ao detalhe — da hierarquia visual à microinteração.",
  },
  {
    title: "Full-stack",
    text: "Do componente React à API em Node.js e ao banco PostgreSQL: a aplicação inteira, de ponta a ponta.",
  },
  {
    title: "AI-driven development",
    text: "IA integrada ao fluxo de trabalho para prototipar, testar e entregar mais rápido, sem abrir mão da qualidade.",
  },
];

const skills = [
  { title: "Front-end & UI", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind", "Acessibilidade"] },
  { title: "Back-end", items: ["Node.js", "Express", "PostgreSQL", "Supabase", "JWT", "APIs REST"] },
  { title: "Ferramentas & IA", items: ["Git", "Testes", "Escrita técnica", "AI Workflows"] },
];

const chips = [
  { label: "UX/UI", a: -140 },
  { label: "Full-stack", a: -15 },
  { label: "AI-driven", a: 115 },
];

/** Retrato no anel fino com chips de vidro orbitando — o círculo da primeira versão do redesign. */
function PortraitOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-[min(100%,440px)]">
      <div className="absolute inset-0 rounded-full border border-[oklch(1_0_0/.14)]" />
      <div className="absolute inset-[14%] overflow-hidden rounded-full border border-[var(--hairline)] bg-[radial-gradient(circle_at_50%_40%,oklch(0.38_0.15_25/.55),transparent_70%)]">
        <Image src="/assets/images/avatar.png" alt="Marques Vinícius" fill sizes="320px" className="object-cover" priority />
      </div>
      <ul className="orbit-wheel outer" aria-hidden="true">
        {chips.map((c) => (
          <li key={c.label} className="orbit-node" style={{ "--a": `${c.a}deg`, "--r": "min(220px, 45vw)" } as CSSProperties}>
            <span className="orbit-label glass rounded-full px-4 py-2 text-sm">{c.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SobrePage() {
  return (
    <>
      <PageHeader
        kicker="Sobre"
        title="Quem constrói"
        description="Desenvolvedor full-stack com foco em UX/UI, interfaces e desenvolvimento AI-driven."
      />

      {/* História */}
      <section className="section pt-12">
        <div className="wrap grid items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <span className="kicker">Perfil</span>
            <h2 className="display text-[clamp(32px,4vw,54px)]">Software que é bom de usar, não só de rodar.</h2>
            <div className="mt-8 grid gap-5 leading-relaxed text-muted-foreground">
              <p>
                Sou desenvolvedor full-stack e o que mais me move é a experiência de quem usa: interfaces bem
                resolvidas, fluxos sem atrito e cuidado com cada detalhe visual.
              </p>
              <p>
                No dia a dia, construo aplicações completas com <span className="text-paper">React, Next.js e TypeScript</span>{" "}
                na interface e <span className="text-paper">Node.js e PostgreSQL</span> por trás, com autenticação, APIs e
                deploy.
              </p>
              <p>
                Trabalho de forma <span className="text-paper">AI-driven</span>: uso IA para prototipar, explorar soluções e
                acelerar entregas, mantendo o critério de design e a qualidade do código. Curso Engenharia de Software na
                UNIRV e tenho inglês fluente (C2).
              </p>
            </div>
          </Reveal>
          <Reveal>
            <PortraitOrbit />
          </Reveal>
        </div>
      </section>

      {/* Foco */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="kicker">Foco</span>
              <h2>O que eu faço</h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {focus.map((f, i) => (
              <Reveal key={f.title} className="surface p-8">
                <span className="font-pixel text-xs text-ember">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-4 text-3xl">{f.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Habilidades */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <span className="kicker">Habilidades</span>
              <h2>Caixa de ferramentas</h2>
            </div>
            <p>O que uso para levar uma ideia da interface ao banco de dados.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {skills.map((s) => (
              <Reveal key={s.title} className="surface p-7">
                <h3 className="display text-2xl">{s.title}</h3>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.items.map((i) => (
                    <span key={i} className="tag">
                      {i}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fechamento */}
      <section className="section">
        <Reveal className="wrap max-w-3xl text-center">
          <span className="kicker">Próximo passo</span>
          <p className="display text-[clamp(30px,4vw,52px)]">Tem uma interface para tirar do papel?</p>
          <p className="mx-auto mt-6 max-w-[56ch] leading-relaxed text-muted-foreground">
            Do protótipo ao deploy, com cuidado de design em cada etapa.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/projetos" className="btn btn-light">
              Ver projetos <span aria-hidden="true">→</span>
            </Link>
            <Link href="/contato" className="btn btn-ghost">
              Entrar em contato
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
