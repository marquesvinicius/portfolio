import Link from "next/link";

/** Marca MV com a barra inclinada ligando ao PORTFOLIO (navbar e rodapé). */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link className={`logo ${className}`} href="/" aria-label="MV Portfolio">
      <span className="l-mv">MV</span>
      <svg className="l-slash" viewBox="0 0 18 34" aria-hidden="true">
        <line x1="16" y1="1" x2="1" y2="33" />
      </svg>
      <span className="l-port">Portfolio</span>
    </Link>
  );
}
