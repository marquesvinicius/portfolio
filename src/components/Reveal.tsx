"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

interface RevealProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** Sobe e aparece quando entra na tela (uma única vez). */
export default function Reveal({ as: Tag = "div", className = "", style, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
