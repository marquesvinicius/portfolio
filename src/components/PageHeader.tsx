import type { ReactNode } from "react";
import Link from "next/link";
import MeshGradient from "./aurora/MeshGradient";

interface PageHeaderProps {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  backHref?: string;
  backLabel?: string;
  children?: ReactNode;
}

/** Cabeçalho das páginas internas: uma fatia do mesh da Hero, mais discreta, com o título como protagonista. */
export default function PageHeader({
  kicker,
  title,
  description,
  backHref,
  backLabel,
  children,
}: PageHeaderProps) {
  return (
    <section className="page-header">
      <MeshGradient intensity={0.8} scale={1.1} />
      <div className="wrap">
        {backHref ? (
          <div className="fade-in mb-3.5 flex flex-wrap items-center gap-3">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 font-serif text-[13.5px] tracking-[-0.01em] text-muted-foreground transition-colors hover:text-paper"
            >
              <span aria-hidden="true">←</span>
              <span>{backLabel ?? "Voltar"}</span>
            </Link>
            <span className="text-xs text-[oklch(1_0_0/.22)]" aria-hidden="true">
              /
            </span>
            <span className="kicker !mb-0">{kicker}</span>
          </div>
        ) : (
          <span className="kicker fade-in">{kicker}</span>
        )}
        <h1>
          <span className="rise-line">
            <span>{title}</span>
          </span>
        </h1>
        {description && (
          <p className="lede fade-in" style={{ animationDelay: ".4s" }}>
            {description}
          </p>
        )}
        {children && (
          <div className="fade-in mt-6" style={{ animationDelay: ".55s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
