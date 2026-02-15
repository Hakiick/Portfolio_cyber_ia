import { useState, useEffect, useRef, useCallback } from "react";
import type { Project } from "../../data/projects";
import { cn } from "../../lib/utils";
import { DecryptText } from "./DecryptText";

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

type DeclassifyPhase = "idle" | "declassifying" | "declassified" | "done";

export function ClassifiedCard({
  project,
  index,
  isExpanded,
  onToggle,
  className,
}: ClassifiedCardProps) {
  const dossierNumber = `DOSSIER-${padIndex(index)}`;
  const statusInfo = STATUS_CONFIG[project.status];
  const [phase, setPhase] = useState<DeclassifyPhase>("idle");
  const [isHovered, setIsHovered] = useState(false);
  const wasExpanded = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop || isExpanded) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        rotateX: (0.5 - y) * 20,
        rotateY: (x - 0.5) * 20,
      });
      setGlowPos({ x: x * 100, y: y * 100 });
    },
    [isDesktop, isExpanded],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  useEffect(() => {
    if (isExpanded && !wasExpanded.current) {
      setPhase("declassifying");
      const t1 = setTimeout(() => setPhase("declassified"), 400);
      const t2 = setTimeout(() => setPhase("done"), 1200);
      wasExpanded.current = true;
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    if (!isExpanded) {
      wasExpanded.current = false;
      setPhase("idle");
    }
  }, [isExpanded]);

  const showClassified = !isExpanded && phase === "idle";
  const showDeclassifying = phase === "declassifying";
  const showDeclassified = phase === "declassified";

  return (
    <div
      style={{ perspective: isDesktop ? "1000px" : undefined }}
      className="w-full"
    >
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`Dossier ${padIndex(index)} : ${project.titre}`}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-md border transition-all duration-300",
          !isExpanded && "classified-card-hover",
          className,
        )}
        style={{
          backgroundColor: "var(--cyber-bg-secondary)",
          borderColor: isExpanded
            ? "var(--cyber-accent-green)"
            : "var(--cyber-border)",
          borderLeftWidth: "4px",
          borderLeftColor: isExpanded
            ? "var(--cyber-accent-green)"
            : "var(--cyber-accent-red)",
          boxShadow: isExpanded ? "0 0 15px rgba(0,255,65,0.1)" : "none",
          transform:
            isDesktop && isHovered && !isExpanded
              ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
              : "rotateX(0deg) rotateY(0deg)",
          transition: isHovered
            ? "transform 0.1s ease-out, border-color 0.3s, box-shadow 0.3s"
            : "transform 0.4s ease-out, border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* CLASSIFIED stamp - collapsed */}
        {showClassified && (
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

        {/* CLASSIFIED stamp - declassifying (rotate + fade out) */}
        {showDeclassifying && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="select-none whitespace-nowrap font-mono text-4xl font-bold uppercase tracking-widest sm:text-5xl"
              style={{
                color: "var(--cyber-accent-red)",
                animation: "stamp-fade-out 0.4s ease-out forwards",
              }}
            >
              CLASSIFIED
            </span>
          </div>
        )}

        {/* DECLASSIFIED stamp - brief flash */}
        {showDeclassified && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="select-none whitespace-nowrap font-mono text-4xl font-bold uppercase tracking-widest sm:text-5xl"
              style={{
                color: "var(--cyber-accent-green)",
                animation: "stamp-flash-in 0.8s ease-out forwards",
                textShadow: "0 0 20px rgba(0,255,65,0.5)",
              }}
            >
              DECLASSIFIED
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
            {isHovered && !isExpanded ? (
              <DecryptText text={dossierNumber} as="span" />
            ) : (
              dossierNumber
            )}
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

        {/* Mouse-following glow overlay */}
        {isDesktop && isHovered && !isExpanded && (
          <div
            className="pointer-events-none absolute inset-0 z-0 rounded-md"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(0, 255, 65, 0.12) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Inline styles for animations */}
        <style>{`
        .classified-card-hover:hover .classified-stamp {
          opacity: 0.05 !important;
        }
        @keyframes stamp-fade-out {
          0% { opacity: 0.15; transform: rotate(-30deg) scale(1); }
          100% { opacity: 0; transform: rotate(-15deg) scale(1.2); }
        }
        @keyframes stamp-flash-in {
          0% { opacity: 0; transform: rotate(-30deg) scale(0.8); }
          30% { opacity: 0.3; transform: rotate(-25deg) scale(1.05); }
          100% { opacity: 0; transform: rotate(-25deg) scale(1.1); }
        }
      `}</style>
      </div>
    </div>
  );
}

export default ClassifiedCard;
