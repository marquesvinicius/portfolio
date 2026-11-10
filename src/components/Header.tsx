"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/site";
import { getLenis } from "./SmoothScroll";
import { Button, ButtonArrow } from "./ui/button";
import Logo from "./Logo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // some ao descer, volta ao subir; ganha fundo depois de rolar um pouco
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 300);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""} ${hidden && !open ? "hidden-up" : ""}`}>
        <Logo />

        <nav className="nav-links" aria-label="Principal">
          {navigation.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(pathname, item.href) ? "on" : ""}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              <sup>{String(i + 1).padStart(2, "0")}</sup>
              <span className="clip">
                <span className="roll">
                  <span>{item.name}</span>
                  <span aria-hidden="true">{item.name}</span>
                </span>
              </span>
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <Button asChild variant="primary" size="sm">
            <Link
              href="/contato"
              aria-current={isActive(pathname, "/contato") ? "page" : undefined}
            >
              Contato <ButtonArrow direction="up-right" />
            </Link>
          </Button>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu-sheet"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Fechar" : "Menu"}
        </Button>
      </header>

      <div className={`sheet ${open ? "open" : ""}`} id="menu-sheet">
        {[...navigation, { name: "Contato", href: "/contato" }].map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={isActive(pathname, item.href) ? "on" : ""}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
          >
            <sup>{String(i + 1).padStart(2, "0")}</sup>
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
}
