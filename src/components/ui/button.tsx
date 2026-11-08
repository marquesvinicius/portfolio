import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Sistema de botões editorial minimalista (inspirado em Cursor / estúdios digitais)
 * - Três variantes principais:
 *   1. `primary`   — superfície clara (`--paper`) sobre fundo escuro, borda precisa, alto contraste editorial.
 *   2. `secondary` — superfície escura quase preta (`oklch(0.12 0.004 210)`), borda hairline sutil que ganha contraste no hover.
 *   3. `ghost`     — minimalista/editorial, fundo transparente com linha discreta ou sublinhado arquitetural no hover.
 * - Suporta `font="serif"` (padrão editorial com Geist Serif) ou `font="sans"` (Geist Sans).
 * - Qualquer elemento com `data-arrow` ou classe `.btn-arrow` (ou `<ButtonArrow />`) recebe o deslocamento horizontal suave no hover.
 */
const buttonVariants = cva("ed-btn", {
  variants: {
    variant: {
      primary: "ed-btn--primary",
      secondary: "ed-btn--secondary",
      ghost: "ed-btn--ghost",
      // aliases de compatibilidade caso algum ponto legado chame os nomes antigos
      default: "ed-btn--primary",
      outline: "ed-btn--secondary",
    },
    size: {
      default: "ed-btn--md",
      sm: "ed-btn--sm",
      lg: "ed-btn--lg",
      icon: "ed-btn--icon",
    },
    font: {
      serif: "ed-btn--serif",
      sans: "ed-btn--sans",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    font: "serif",
  },
});

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  font,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, font, className }))}
      {...props}
    />
  );
}

/** Seta editorial com deslocamento horizontal suave (200–300ms) no hover do botão. */
function ButtonArrow({
  direction = "right",
  className,
  children,
}: {
  direction?: "right" | "up-right" | "left";
  className?: string;
  children?: React.ReactNode;
}) {
  const glyph =
    children ??
    (direction === "left" ? "←" : direction === "up-right" ? "↗" : "→");

  return (
    <span
      aria-hidden="true"
      data-arrow={direction}
      className={cn("ed-btn__arrow", className)}
    >
      {glyph}
    </span>
  );
}

export { Button, ButtonArrow, buttonVariants };
export default Button;
