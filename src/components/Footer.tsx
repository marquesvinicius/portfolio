import Link from "next/link";
import { contact, navigation } from "@/lib/site";
import MeshGradient from "./aurora/MeshGradient";
import Logo from "./Logo";
import { Button, ButtonArrow } from "./ui/button";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-fade relative overflow-hidden">
      {/* detalhe atmosférico discreto nos cantos inferiores, desaparecendo antes do copyright */}
      <MeshGradient intensity={0.38} scale={1.15} className="footer-glow" />
      <div className="wrap relative z-[1] grid gap-14 pb-24 pt-28 md:grid-cols-[1.4fr_1fr_1fr]">
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

      <div className="wrap relative z-[1] flex flex-wrap items-center justify-between gap-4 border-t border-[var(--hairline)] py-9 text-xs text-muted-foreground">
        <Logo />
        <span>© {year} Marques V.</span>
      </div>
    </footer>
  );
}
