import Link from "next/link";
import { contact, navigation } from "@/lib/site";
import MeshGradient from "./aurora/MeshGradient";
import { Button, ButtonArrow } from "./ui/button";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)]">
      {/* a mesma luz da Hero, baixa e subindo da borda: fecha a página como a Hero abre */}
      <MeshGradient intensity={0.65} scale={0.8} className="footer-glow" />
      <div className="wrap relative z-[1] grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-[clamp(32px,4vw,52px)]">Vamos construir algo?</p>
          <Button asChild variant="primary" className="mt-6">
            <Link href="/contato">
              Fale comigo <ButtonArrow />
            </Link>
          </Button>
        </div>

        <div>
          <span className="kicker">Navegação</span>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            {[...navigation, { name: "Contato", href: "/contato" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-paper">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="kicker">Contato</span>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-paper">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
                GitHub ↗
              </a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap relative z-[1] flex flex-wrap justify-between gap-4 border-t border-[var(--hairline)] py-6 text-xs text-muted-foreground">
        <span>© {year} Marques Vinícius</span>
        <span className="font-pixel">Feito com Next.js · BR</span>
      </div>
    </footer>
  );
}
