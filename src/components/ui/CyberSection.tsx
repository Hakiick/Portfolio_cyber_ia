import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

export interface CyberSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

const sectionStyles = [
  "w-full",
  "max-w-5xl mx-auto",
  "px-4 py-12 md:px-6 md:py-20 lg:px-8 lg:py-24",
].join(" ");

const titleStyles = [
  "font-mono text-[var(--cyber-accent-green)]",
  "text-lg md:text-xl lg:text-2xl",
  "font-bold mb-8 md:mb-12",
  "text-glow-green",
].join(" ");

export function CyberSection({
  id,
  title,
  children,
  className,
}: CyberSectionProps) {
  return (
    <section id={id} className={cn(sectionStyles, className)}>
      <h2 className={titleStyles}>
        <span aria-hidden="true">&gt; </span>
        {title}
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
