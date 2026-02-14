import type { Project } from "../../data/projects";
import { cn } from "../../lib/utils";

export interface ClassifiedCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
}

function padIndex(index: number): string {
  return String(index).padStart(3, "0");
}

const STATUS_CONFIG: Record<
  Project["status"],
  { label: string; colorVar: string }
> = {
  completed: { label: "COMPLETED", colorVar: "var(--cyber-accent-green)" },
  "in-progress": {
    label: "IN PROGRESS",
    colorVar: "var(--cyber-accent-blue)",
  },
};

export function ClassifiedCard({
  project,
  index,
  isExpanded,
  onToggle,
  className,
}: ClassifiedCardProps) {
  const dossierNumber = `DOSSIER-${padIndex(index)}`;
  const statusInfo = STATUS_CONFIG[project.status];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-md border transition-all duration-300",
        !isExpanded && "classified-card-hover",
        className,
      )}
      style={{
        backgroundColor: "var(--cyber-bg-secondary)",
        borderColor: "var(--cyber-border)",
        borderLeftWidth: "4px",
        borderLeftColor: "var(--cyber-accent-red)",
      }}
    >
      {/* CLASSIFIED stamp - only when collapsed */}
      {!isExpanded && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="classified-stamp select-none whitespace-nowrap font-mono text-4xl font-bold uppercase tracking-widest sm:text-5xl"
            style={{
              color: "var(--cyber-accent-red)",
              opacity: 0.15,
              transform: "rotate(-30deg)",
            }}
          >
            CLASSIFIED
          </span>
        </div>
      )}

      {/* Card content */}
      <div className="relative z-10 p-4 sm:p-6">
        {/* Dossier number */}
        <span
          className="mb-2 block font-mono text-xs"
          style={{ color: "var(--cyber-text-secondary)" }}
        >
          {dossierNumber}
        </span>

        {/* Title */}
        <h3
          className="mb-2 font-mono text-base font-semibold sm:text-lg"
          style={{ color: "var(--cyber-text-primary)" }}
        >
          {project.titre}
        </h3>

        {/* Expandable content */}
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isExpanded ? "600px" : "0px",
            opacity: isExpanded ? 1 : 0,
            overflow: "hidden",
          }}
        >
          {/* Description */}
          <p
            className="mb-4 text-sm leading-relaxed"
            style={{ color: "var(--cyber-text-secondary)" }}
          >
            {project.description}
          </p>

          {/* Stack badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border px-2 py-1 font-mono text-xs"
                style={{
                  borderColor: "var(--cyber-accent-green)",
                  color: "var(--cyber-accent-green)",
                  backgroundColor: "rgba(0, 255, 65, 0.05)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Status */}
          <div className="mb-3 flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: statusInfo.colorVar }}
            />
            <span
              className="font-mono text-xs"
              style={{ color: statusInfo.colorVar }}
            >
              {statusInfo.label}
            </span>
          </div>

          {/* GitHub link */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 font-mono text-xs underline underline-offset-4 transition-opacity hover:opacity-80"
              style={{ color: "var(--cyber-accent-blue)" }}
            >
              GitHub &rarr;
            </a>
          )}
        </div>
      </div>

      {/* Inline styles for hover animations */}
      <style>{`
        .classified-card-hover:hover {
          animation: card-shake 0.3s ease-in-out;
        }
        .classified-card-hover:hover .classified-stamp {
          opacity: 0.05 !important;
        }
        @keyframes card-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
        }
      `}</style>
    </div>
  );
}

export default ClassifiedCard;
