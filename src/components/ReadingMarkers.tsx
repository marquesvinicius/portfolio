"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getLenis } from "./SmoothScroll";

interface MarkerItem {
  id: string;
  label: string;
  level: 0 | 1;
  element: HTMLElement;
}

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

/** Limpa o texto do heading para exibição em linha única. */
function cleanLabel(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

/** Verifica se o elemento está visível no layout atual. */
function isVisible(el: HTMLElement): boolean {
  if (!el.isConnected) return false;
  if (el.closest("[aria-hidden='true'], .sr-only, .orbit-system, .split-top, .sheet, header.nav, footer")) {
    return false;
  }
  const style = window.getComputedStyle(el);
  if (
    style.display === "none" ||
    style.visibility === "hidden" ||
    (parseFloat(style.opacity) === 0 && !el.closest(".reveal, .fade-in"))
  ) {
    return false;
  }
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

/**
 * Extrai apenas os headings (h1, h2, h3, h4) das sections do body (<main>):
 * - Level 0 (principais): h1 e h2
 * - Level 1 (subtópicos): h3 e h4
 */
function extractMarkers(): MarkerItem[] {
  const main = document.querySelector("main");
  if (!main) return [];

  const items: MarkerItem[] = [];
  const seenElements = new Set<HTMLElement>();

  const headings = main.querySelectorAll<HTMLElement>("h1, h2, h3, h4");

  headings.forEach((el) => {
    if (seenElements.has(el) || !isVisible(el)) return;
    const label = cleanLabel(el.textContent ?? "");
    if (!label) return;

    const tag = el.tagName.toLowerCase();
    const inMarkdown = Boolean(el.closest(".markdown-content"));
    const level: 0 | 1 = tag === "h3" || tag === "h4" || (inMarkdown && tag === "h2") ? 1 : 0;

    seenElements.add(el);
    items.push({
      id: `marker-${items.length}`,
      label,
      level,
      element: el,
    });
  });

  return items;
}

export default function ReadingMarkers() {
  const pathname = usePathname();
  const [markers, setMarkers] = useState<MarkerItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleOnScroll, setVisibleOnScroll] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const closeTimerRef = useRef<number | null>(null);
  const lockedIndexRef = useRef<{ index: number; targetY: number; until: number } | null>(null);
  const activeItemRef = useRef<HTMLButtonElement | null>(null);

  // Calcula visibilidade (só aparece após passar da hero/page-header) e o item ativo no scroll
  const updateScrollState = useCallback((currentMarkers: MarkerItem[]) => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Verifica se o hero ou page-header já subiu o suficiente para não sobrepor os marcadores
    const heroOrHeader = document.querySelector<HTMLElement>("main .hero, main .page-header");
    let passedHeader = scrollY > 240;
    if (heroOrHeader) {
      const rect = heroOrHeader.getBoundingClientRect();
      // Só exibe quando a borda inferior do header/hero estiver acima da faixa central dos marcadores
      passedHeader = rect.bottom <= vh * 0.34;
    }

    setVisibleOnScroll(passedHeader);
    if (!passedHeader) {
      setExpanded(false);
    }

    if (currentMarkers.length === 0) return;

    // Se o usuário clicou recentemente num item específico, preserva a seleção durante a rolagem
    if (lockedIndexRef.current) {
      const { index, targetY, until } = lockedIndexRef.current;
      if (Date.now() < until || Math.abs(scrollY - targetY) < 48) {
        setActiveIndex(Math.min(index, currentMarkers.length - 1));
        return;
      }
      lockedIndexRef.current = null;
    }

    if (scrollY < 64) {
      setActiveIndex(0);
      return;
    }

    if (scrollY + vh >= docHeight - 36) {
      setActiveIndex(currentMarkers.length - 1);
      return;
    }

    const readingLine = scrollY + vh * 0.35;
    let bestIndex = 0;

    for (let i = 0; i < currentMarkers.length; i++) {
      const el = currentMarkers[i].element;
      if (!el.isConnected) continue;
      const top = el.getBoundingClientRect().top + scrollY;
      if (top <= readingLine) {
        bestIndex = i;
      } else {
        break;
      }
    }

    setActiveIndex(bestIndex);
  }, []);

  // Recalcula marcadores quando a rota ou o DOM mudam (ex.: carregamento do Sanity ou busca/filtros)
  useEffect(() => {
    let rafId = 0;
    let debounceTimer: number | null = null;

    const runScan = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const next = extractMarkers();
        setMarkers(next);
        updateScrollState(next);
      });
    };

    const scheduleScan = () => {
      if (debounceTimer !== null) window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(runScan, 120);
    };

    runScan();
    const initialTimer = window.setTimeout(runScan, 450);

    const main = document.querySelector("main");
    const observer = new MutationObserver(scheduleScan);
    if (main) {
      observer.observe(main, {
        childList: true,
        subtree: true,
      });
    }

    window.addEventListener("resize", scheduleScan, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      if (debounceTimer !== null) window.clearTimeout(debounceTimer);
      window.clearTimeout(initialTimer);
      observer.disconnect();
      window.removeEventListener("resize", scheduleScan);
    };
  }, [pathname, updateScrollState]);

  // Listener de scroll para atualizar visibilidade e marcador ativo em tempo real
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateScrollState(markers);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [markers, updateScrollState]);

  // Mantém o item ativo visível dentro do popover caso a lista tenha barra de rolagem vertical
  useEffect(() => {
    if (expanded && activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [expanded, activeIndex]);

  const handleOpen = () => {
    if (!visibleOnScroll) return;
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setExpanded(true);
  };

  const handleClose = () => {
    closeTimerRef.current = window.setTimeout(() => {
      setExpanded(false);
    }, 140);
  };

  const scrollToMarker = (index: number) => {
    const item = markers[index];
    if (!item || !item.element.isConnected) return;

    const isFirst = index === 0;
    const rawTargetY = isFirst
      ? 0
      : Math.max(0, item.element.getBoundingClientRect().top + window.scrollY - 110);
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const clampedTargetY = Math.min(rawTargetY, maxScroll);

    setActiveIndex(index);
    lockedIndexRef.current = {
      index,
      targetY: clampedTargetY,
      until: Date.now() + 1450,
    };

    const lenis = getLenis();
    if (lenis) {
      if (isFirst) {
        lenis.scrollTo(0, { duration: 1.35, easing: easeOutQuint });
      } else {
        lenis.scrollTo(item.element, { offset: -110, duration: 1.35, easing: easeOutQuint });
      }
    } else {
      window.scrollTo({ top: clampedTargetY, behavior: "smooth" });
    }
  };

  if (markers.length < 2) return null;

  return (
    <aside
      className={`reading-markers ${visibleOnScroll ? "is-visible" : ""}`}
      aria-label="Marcadores de leitura da página"
      aria-hidden={!visibleOnScroll}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocusCapture={handleOpen}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          handleClose();
        }
      }}
    >
      {/* Trilho compacto de traços (visível em repouso) */}
      <div className={`reading-rail ${expanded ? "is-expanded" : ""}`}>
        {markers.map((m, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={m.id}
              type="button"
              tabIndex={visibleOnScroll ? 0 : -1}
              onClick={() => scrollToMarker(i)}
              aria-label={`Ir para ${m.label}`}
              aria-current={isActive ? "location" : undefined}
              className={`reading-tick ${m.level === 1 ? "is-sub" : "is-main"} ${isActive ? "is-active" : ""}`}
            >
              <span className="reading-tick-bar" />
            </button>
          );
        })}
      </div>

      {/* Painel flutuante estilo Claude com os headings das seções */}
      <nav
        className={`reading-popover ${expanded && visibleOnScroll ? "is-open" : ""}`}
        aria-label="Índice da página"
        data-lenis-prevent
      >
        <ul className="reading-list">
          {markers.map((m, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={m.id}>
                <button
                  ref={isActive ? activeItemRef : null}
                  type="button"
                  tabIndex={expanded && visibleOnScroll ? 0 : -1}
                  onClick={() => scrollToMarker(i)}
                  aria-current={isActive ? "location" : undefined}
                  className={`reading-item ${m.level === 1 ? "is-sub" : "is-main"} ${isActive ? "is-active" : ""}`}
                >
                  <span className="reading-item-dash" aria-hidden="true" />
                  <span className="reading-item-label">{m.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
