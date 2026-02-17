import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import type { ReactNode } from "react";
import { DecryptText } from "./DecryptText";
import { useLanguage } from "../../lib/useLanguage";

export interface CyberSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

const sectionStyles = [
  "w-full",
  "max-w-5xl mx-auto",
  "px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8",
].join(" ");

const titleStyles = [
  "font-mono text-[var(--cyber-accent-green)]",
  "text-lg md:text-xl lg:text-2xl",
  "font-bold mb-4 md:mb-6",
  "text-glow-green",
].join(" ");

const PARALLAX_FACTOR = 0.15;

export function CyberSection({
  id,
  title,
  children,
  className,
}: CyberSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const { t } = useLanguage();

  // If title starts with "section.", translate it. Otherwise use as-is.
  const displayTitle = title.startsWith("section.") ? t(title) : title;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const diff = center - viewCenter;
      setOffset(diff * PARALLAX_FACTOR);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(sectionStyles, className)}
      style={{
        position: "relative",
        zIndex: 1,
        backgroundColor: "rgba(10, 10, 15, 0.85)",
      }}
    >
      <h2
        className={titleStyles}
        style={{
          transform: prefersReduced ? undefined : `translateY(${offset}px)`,
          willChange: prefersReduced ? undefined : "transform",
        }}
      >
        <span aria-hidden="true">&gt; </span>
        <DecryptText text={displayTitle} as="span" />
        <span
          aria-hidden="true"
          className="inline-block w-[0.5em] h-[1.1em] ml-1 bg-[var(--cyber-accent-green)] align-middle animate-typing-cursor"
        />
      </h2>
      {children}
    </section>
  );
}

export default CyberSection;
