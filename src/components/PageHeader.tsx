import type { ReactNode } from "react";
import MeshGradient from "./aurora/MeshGradient";

interface PageHeaderProps {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

/** Cabeçalho das páginas internas: uma fatia do mesh da Hero, mais discreta, com o título como protagonista. */
export default function PageHeader({ kicker, title, description, children }: PageHeaderProps) {
  return (
    <section className="page-header">
      <MeshGradient intensity={0.8} scale={1.1} />
      <div className="wrap">
        <span className="kicker fade-in">{kicker}</span>
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
