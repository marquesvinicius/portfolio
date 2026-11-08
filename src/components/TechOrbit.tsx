import type { CSSProperties } from "react";

const primary = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"];
const secondary = ["APIs REST", "Supabase", "Tailwind", "Git & CI", "AI Workflows"];

// distribui os nós igualmente pela circunferência, a partir do ângulo inicial
const angle = (i: number, total: number, start: number) => ({ "--a": `${start + (360 / total) * i}deg` }) as CSSProperties;

/** Sistema orbital: stack principal na órbita externa, ferramentas na interna. Giro quase imperceptível. */
export default function TechOrbit() {
  return (
    <div className="orbit-system">
      <div className="orbit-track-outer" aria-hidden="true" />
      <div className="orbit-track-inner" aria-hidden="true" />

      <div className="orbit-core">
        <span className="core-dot" aria-hidden="true" />
        <span className="core-title">MV</span>
        <span className="core-sub">Full-stack</span>
      </div>

      <ul className="orbit-wheel outer" aria-label="Stack principal">
        {primary.map((tech, i) => (
          <li key={tech} className="orbit-node" style={angle(i, primary.length, -90)}>
            <span className="orbit-label primary">
              <i />
              {tech}
            </span>
          </li>
        ))}
      </ul>

      <ul className="orbit-wheel inner" aria-label="Ferramentas complementares">
        {secondary.map((tech, i) => (
          <li key={tech} className="orbit-node" style={angle(i, secondary.length, -45)}>
            <span className="orbit-label secondary">
              <i />
              {tech}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
