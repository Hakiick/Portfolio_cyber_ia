import { cn } from "../../lib/utils";
import type { ReactNode, MouseEventHandler } from "react";

export interface CyberButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  className?: string;
}

const variantStyles: Record<NonNullable<CyberButtonProps["variant"]>, string> = {
  primary: [
    "border-[var(--cyber-accent-green)] text-[var(--cyber-accent-green)]",
    "hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]",
    "hover:text-shadow-[0_0_10px_rgba(0,255,65,0.5)]",
  ].join(" "),
  secondary: [
    "border-[var(--cyber-accent-blue)] text-[var(--cyber-accent-blue)]",
    "hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]",
    "hover:text-shadow-[0_0_10px_rgba(0,212,255,0.5)]",
  ].join(" "),
  danger: [
    "border-[var(--cyber-accent-red)] text-[var(--cyber-accent-red)]",
    "hover:shadow-[0_0_20px_rgba(255,62,62,0.3)]",
    "hover:text-shadow-[0_0_10px_rgba(255,62,62,0.5)]",
  ].join(" "),
};

const sizeStyles: Record<NonNullable<CyberButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm",
  md: "px-4 py-2 text-sm md:px-6 md:py-2.5 md:text-base",
  lg: "px-6 py-3 text-base md:px-8 md:py-3.5 md:text-lg",
};

const baseStyles = [
  "inline-flex items-center justify-center",
  "bg-transparent border font-mono font-medium",
  "rounded-sm cursor-pointer",
  "transition-all duration-200 ease-out",
  "active:scale-[0.97]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyber-accent-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cyber-bg-primary)]",
].join(" ");

export function CyberButton({
  variant = "primary",
  size = "md",
  children,
  onClick,
  href,
  className,
}: CyberButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export default CyberButton;
