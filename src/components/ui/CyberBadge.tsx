import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

export interface CyberBadgeProps {
  children: ReactNode;
  variant?: "green" | "blue" | "purple" | "red" | "gray";
  className?: string;
}

const variantStyles: Record<NonNullable<CyberBadgeProps["variant"]>, string> = {
  green: "bg-[rgba(0,255,65,0.1)] text-[var(--cyber-accent-green)] border-[rgba(0,255,65,0.3)]",
  blue: "bg-[rgba(0,212,255,0.1)] text-[var(--cyber-accent-blue)] border-[rgba(0,212,255,0.3)]",
  purple: "bg-[rgba(180,74,255,0.1)] text-[var(--cyber-accent-purple)] border-[rgba(180,74,255,0.3)]",
  red: "bg-[rgba(255,62,62,0.1)] text-[var(--cyber-accent-red)] border-[rgba(255,62,62,0.3)]",
  gray: "bg-[rgba(138,138,138,0.1)] text-[var(--cyber-text-secondary)] border-[rgba(138,138,138,0.3)]",
};

const baseStyles = [
  "inline-flex items-center",
  "px-2 py-0.5 md:px-2.5 md:py-1",
  "text-xs font-mono font-medium",
  "border rounded-sm",
  "whitespace-nowrap",
].join(" ");

export function CyberBadge({
  children,
  variant = "green",
  className,
}: CyberBadgeProps) {
  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </span>
  );
}

export default CyberBadge;
