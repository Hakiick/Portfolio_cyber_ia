import type { CSSProperties, ReactNode } from "react";
import { useScrollReveal } from "../../lib/useScrollReveal";

type ScrollAnimation = "fade-in" | "slide-up" | "slide-left" | "slide-right";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: ScrollAnimation;
  delay?: number;
  className?: string;
}

const hiddenStyles: Record<ScrollAnimation, CSSProperties> = {
  "fade-in": {
    opacity: 0,
  },
  "slide-up": {
    opacity: 0,
    transform: "translateY(30px)",
  },
  "slide-left": {
    opacity: 0,
    transform: "translateX(-30px)",
  },
  "slide-right": {
    opacity: 0,
    transform: "translateX(30px)",
  },
};

const visibleStyle: CSSProperties = {
  opacity: 1,
  transform: "none",
};

export function ScrollReveal({
  children,
  animation = "fade-in",
  delay = 0,
  className,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  const style: CSSProperties = {
    ...(isVisible ? visibleStyle : hiddenStyles[animation]),
    transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
    transitionDelay: `${delay}ms`,
    willChange: isVisible ? "auto" : "opacity, transform",
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}

export default ScrollReveal;
