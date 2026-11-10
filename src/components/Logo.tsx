import Link from "next/link";

/** Marca MV. `mark` deixa só as iniciais — usado no rodapé. */
export default function Logo({ className = "", mark = false }: { className?: string; mark?: boolean }) {
  return (
    <Link className={`logo ${className}`} href="/" aria-label={mark ? "MV" : "MV Portfolio"}>
      <span className="l-mv">MV</span>
      {!mark && (
        <>
          <svg className="l-slash" viewBox="0 0 18 34" aria-hidden="true">
            <line x1="16" y1="1" x2="1" y2="33" />
          </svg>
          <span className="l-port">Portfolio</span>
        </>
      )}
    </Link>
  );
}
