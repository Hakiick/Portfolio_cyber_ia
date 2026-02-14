import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface TerminalBlockProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function TerminalBlock({
  children,
  title = "terminal",
  className,
}: TerminalBlockProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border",
        className
      )}
      style={{
        borderColor: "var(--cyber-border)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center px-4 py-2"
        style={{
          backgroundColor: "var(--cyber-bg-secondary)",
          borderBottom: "1px solid var(--cyber-border)",
        }}
      >
        {/* macOS dots */}
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: "var(--cyber-accent-red)" }}
          />
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: "#f5c542" }}
          />
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: "var(--cyber-accent-green)" }}
          />
        </div>

        {/* Title */}
        <span
          className="flex-1 text-center font-mono text-xs"
          style={{ color: "var(--cyber-text-secondary)" }}
        >
          {title}
        </span>

        {/* Spacer to balance the dots */}
        <div className="w-[52px]" />
      </div>

      {/* Body */}
      <div
        className="p-4 font-mono text-sm leading-relaxed"
        style={{
          backgroundColor: "var(--cyber-bg-terminal)",
          color: "var(--cyber-text-primary)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default TerminalBlock;
