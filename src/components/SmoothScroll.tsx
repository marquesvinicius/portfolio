"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenis: Lenis | null = null;

/** Instância ativa do Lenis (null com movimento reduzido ou antes de montar). */
export const getLenis = () => lenis;

// desaceleração longa e progressiva ao chegar na seção
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // rolagem cinematográfica nos links para âncoras da mesma página
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a");
      const href = a?.getAttribute("href");
      if (!a || !href?.startsWith("#") || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis?.scrollTo(target as HTMLElement, { offset: -20, duration: 1.65, easing: easeOutQuint });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // ao trocar de página, começa do topo sem animação
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
