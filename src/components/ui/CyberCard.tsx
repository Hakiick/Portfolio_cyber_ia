import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

export interface CyberCardProps {
  children: ReactNode;
  glowColor?: "green" | "blue" | "purple";
  className?: string;
}

const glowStyles: Record<NonNullable<CyberCardProps["glowColor"]>, string> = {
  green: "hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:border-[var(--cyber-accent-green)]",
  blue: "hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:border-[var(--cyber-accent-blue)]",
  purple: "hover:shadow-[0_0_20px_rgba(180,74,255,0.3)] hover:border-[var(--cyber-accent-purple)]",
};

const baseStyles = [
  "bg-[var(--cyber-bg-secondary)]",
  "border border-[var(--cyber-border)]",
  "rounded-lg",
  "p-4 md:p-6",
  "transition-all duration-300 ease-out",
].join(" ");

export function CyberCard({
  children,
  glowColor = "green",
  className,
}: CyberCardProps) {
  return (
    <div className={cn(baseStyles, glowStyles[glowColor], className)}>
      {children}
    </div>
  );
}

export default CyberCard;
