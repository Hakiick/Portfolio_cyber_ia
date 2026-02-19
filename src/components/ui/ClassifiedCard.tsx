import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { Project } from "../../data/projects";
import { cn } from "../../lib/utils";
import { DecryptText } from "./DecryptText";
import { useLanguage } from "../../lib/useLanguage";

function ScreenshotGallery({ screenshots }: { screenshots: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const validScreenshots = useMemo(
    () => screenshots.filter((_, i) => !imageErrors.has(i)),
    [screenshots, imageErrors],
  );

  if (validScreenshots.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev <= 0 ? validScreenshots.length - 1 : prev - 1,
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev >= validScreenshots.length - 1 ? 0 : prev + 1,
    );
  };

  const handleImageError = (originalIndex: number) => {
    setImageErrors((prev) => {
      const updated = new Set(prev);
      updated.add(originalIndex);
      return updated;
    });
  };

  return (
    <div className="mb-4">
      {/* Main image */}
      <div
        className="relative mb-2 overflow-hidden rounded border"
        style={{ borderColor: "var(--cyber-border)" }}
      >
        <img
          src={validScreenshots[activeIndex]}
          alt={`Screenshot ${activeIndex + 1}`}
          loading="lazy"
          onError={() => {
            const origIndex = screenshots.indexOf(validScreenshots[activeIndex]);
            handleImageError(origIndex);
          }}
          className="h-auto w-full object-cover"
          style={{ maxHeight: "280px" }}
        />
        {/* Navigation arrows */}
        {validScreenshots.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-sm transition-opacity hover:opacity-100"
              style={{
                backgroundColor: "rgba(10, 10, 15, 0.8)",
                borderColor: "var(--cyber-accent-green)",
                color: "var(--cyber-accent-green)",
                opacity: 0.7,
              }}
            >
              &lt;
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-sm transition-opacity hover:opacity-100"
              style={{
                backgroundColor: "rgba(10, 10, 15, 0.8)",
                borderColor: "var(--cyber-accent-green)",
                color: "var(--cyber-accent-green)",
                opacity: 0.7,
              }}
            >
              &gt;
            </button>
          </>
        )}
        {/* Counter */}
        <span
          className="absolute bottom-2 right-2 rounded px-2 py-0.5 font-mono text-xs"
          style={{
            backgroundColor: "rgba(10, 10, 15, 0.8)",
            color: "var(--cyber-text-secondary)",
          }}
        >
          {activeIndex + 1}/{validScreenshots.length}
        </span>
      </div>
      {/* Thumbnail dots */}
      {validScreenshots.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {validScreenshots.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(i);
              }}
              aria-label={`Go to screenshot ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-200"
              style={{
                width: i === activeIndex ? "1.5rem" : "0.375rem",
                backgroundColor:
                  i === activeIndex
                    ? "var(--cyber-accent-green)"
                    : "var(--cyber-text-secondary)",
                opacity: i === activeIndex ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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

function useStatusConfig() {
  const { t } = useLanguage();
  return {
    completed: {
      label: t("projects.status.completed").toUpperCase(),
      colorVar: "var(--cyber-accent-green)",
    },
    "in-progress": {
      label: t("projects.status.in-progress").toUpperCase(),
      colorVar: "var(--cyber-accent-blue)",
    },
  };
}

type DeclassifyPhase = "idle" | "declassifying" | "declassified" | "done";

export function ClassifiedCard({
  project,
  index,
  isExpanded,
  onToggle,
  className,
}: ClassifiedCardProps) {
  const { lang } = useLanguage();
  const STATUS_CONFIG = useStatusConfig();
  const dossierNumber = `DOSSIER-${padIndex(index)}`;
  const statusInfo = STATUS_CONFIG[project.status];
  const [phase, setPhase] = useState<DeclassifyPhase>("idle");
  const [isHovered, setIsHovered] = useState(false);
  const wasExpanded = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isDesktop, setIsDesktop] = useState(false);

  const titre =
    lang === "en" && project.titreEn ? project.titreEn : project.titre;
  const description =
    lang === "en" && project.descriptionEn
      ? project.descriptionEn
      : project.description;

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
            {titre}
          </h3>

          {/* Expandable content */}
          <div
            className="transition-all duration-300 ease-in-out"
            style={{
              maxHeight: isExpanded ? "900px" : "0px",
              opacity: isExpanded ? 1 : 0,
              overflow: "hidden",
            }}
          >
            {/* Screenshots gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <ScreenshotGallery screenshots={project.screenshots} />
            )}

            {/* Description */}
            <p
              className="mb-4 text-sm leading-relaxed"
              style={{ color: "var(--cyber-text-secondary)" }}
            >
              {description}
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
