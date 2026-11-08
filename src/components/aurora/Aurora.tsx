import type { CSSProperties } from "react";

// Composições de manchas pré-definidas. Cada preset varia a posição das luzes
// para que capas lado a lado não fiquem idênticas.
const presets = {
  hero: ["b1", "b2", "b3", "b4", "b5"],
  cover: ["b1", "b2", "b3"],
  coverAlt: ["b2", "b4", "b5", "b1"],
  soft: ["b2", "b4", "b1"],
} as const;

export type AuroraPreset = keyof typeof presets;

interface AuroraProps {
  preset?: AuroraPreset;
  dots?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Fundo aurora em CSS puro: manchas desfocadas + granulado. Usado em capas e como fallback do mesh. */
export default function Aurora({ preset = "cover", dots = false, className = "", style }: AuroraProps) {
  return (
    <div className={`aurora ${className}`} style={style} aria-hidden="true">
      {presets[preset].map((b) => (
        <div key={b} className={`blob ${b}`} />
      ))}
      {dots && <div className="dots" />}
      <div className="grain" />
    </div>
  );
}

/** Escolhe um preset estável a partir de uma string (ex.: slug do projeto). */
export function presetFor(seed: string): AuroraPreset {
  const options: AuroraPreset[] = ["cover", "coverAlt", "soft"];
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return options[h % options.length];
}
