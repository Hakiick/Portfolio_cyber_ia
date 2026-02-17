import { useState, useEffect, useRef } from "react";
import { CyberSection } from "../ui/CyberSection";
import { timeline, type TimelineEntryType } from "../../data/timeline";
import { useLanguage } from "../../lib/useLanguage";

function useTypeConfig() {
  const { t } = useLanguage();
  return {
    formation: {
      color: "var(--cyber-accent-blue)",
      label: t("timeline.type.formation"),
    },
    experience: {
      color: "var(--cyber-accent-green)",
      label: t("timeline.type.experience"),
    },
    certification: {
      color: "var(--cyber-accent-purple)",
      label: t("timeline.type.certification"),
    },
    pivot: {
      color: "var(--cyber-accent-red)",
      label: t("timeline.type.pivot"),
    },
  };
}

function TimelineEntry({
  date,
  titre,
  titreEn,
  description,
  descriptionEn,
  type,
  index,
  isLast,
}: {
  date: string;
  titre: string;
  titreEn?: string;
  description: string;
  descriptionEn?: string;
  type: TimelineEntryType;
  index: number;
  isLast: boolean;
}) {
  const entryRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { lang } = useLanguage();
  const typeConfig = useTypeConfig();
  const config = typeConfig[type];
  const isEven = index % 2 === 0;

  const displayTitre = lang === "en" && titreEn ? titreEn : titre;
  const displayDescription =
    lang === "en" && descriptionEn ? descriptionEn : description;

  useEffect(() => {
    const el = entryRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={entryRef}
      className={`
        relative flex items-start gap-4 md:gap-8
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100" : "opacity-0"}
        ${isVisible ? (isEven ? "md:translate-x-0" : "md:translate-x-0") : isEven ? "md:-translate-x-8" : "md:translate-x-8"}
        ${isVisible ? "translate-y-0" : "translate-y-6"}
        ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Content */}
      <div
        className={`
          flex-1 ml-8 md:ml-0
          ${isEven ? "md:text-right" : "md:text-left"}
        `}
      >
        <span
          className="inline-block font-mono text-xs sm:text-sm mb-1"
          style={{ color: "var(--cyber-text-secondary)" }}
        >
          {date}
        </span>

        <h3
          className="font-mono font-bold text-sm sm:text-base mb-1"
          style={{ color: "var(--cyber-text-primary)" }}
        >
          {displayTitre}
        </h3>

        <p
          className="text-xs sm:text-sm leading-relaxed"
          style={{ color: "var(--cyber-text-secondary)" }}
        >
          {displayDescription}
        </p>

        <span
          className="inline-block font-mono text-[10px] sm:text-xs mt-2 px-2 py-0.5 rounded-sm border"
          style={{
            color: config.color,
            borderColor: config.color,
            backgroundColor: `color-mix(in srgb, ${config.color} 10%, transparent)`,
          }}
        >
          {config.label}
        </span>
      </div>

      {/* Center dot with pulse */}
      <div
        className="
          absolute left-0 md:left-1/2 md:-translate-x-1/2
          top-1 z-10
        "
      >
        {/* Radar ring on latest entry */}
        {isLast && isVisible && (
          <div
            className="absolute inset-0 w-4 h-4 rounded-full"
            style={{
              borderColor: config.color,
              animation: "timeline-radar 2s ease-out infinite",
              border: `2px solid ${config.color}`,
            }}
          />
        )}
        {/* Pulse ring */}
        {isVisible && (
          <div
            className="absolute inset-0 w-4 h-4 rounded-full"
            style={{
              backgroundColor: config.color,
              animation: "timeline-pulse 2s ease-out infinite",
              animationDelay: `${index * 150}ms`,
            }}
          />
        )}
        {/* Dot */}
        <div
          className="w-4 h-4 rounded-full border-2 transition-all duration-500"
          style={{
            borderColor: config.color,
            backgroundColor: isVisible
              ? config.color
              : "var(--cyber-bg-primary)",
            boxShadow: isVisible ? `0 0 8px ${config.color}` : "none",
          }}
        />
      </div>

      {/* Spacer for alternating layout on desktop */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.8;
      const end = -rect.height * 0.2;
      const total = start - end;
      const current = start - rect.top;
      const progress = Math.max(0, Math.min(1, current / total));
      setLineProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CyberSection id="timeline" title="section.timeline">
      <div ref={containerRef} className="relative">
        {/* Background line (dim) */}
        <div
          className="
            absolute left-[7px] md:left-1/2 md:-translate-x-px
            top-0 bottom-0 w-px
          "
          style={{
            backgroundColor: "var(--cyber-border)",
            opacity: 0.3,
          }}
        />

        {/* Animated line (draws on scroll) */}
        <div
          className="
            absolute left-[7px] md:left-1/2 md:-translate-x-px
            top-0 w-px origin-top
          "
          style={{
            height: "100%",
            backgroundColor: "var(--cyber-accent-green)",
            transform: `scaleY(${lineProgress})`,
            boxShadow: "0 0 6px rgba(0, 255, 65, 0.4)",
            transition: "transform 0.1s linear",
          }}
        />

        <div className="flex flex-col gap-6 md:gap-8">
          {timeline.map((entry, index) => (
            <TimelineEntry
              key={entry.titre}
              index={index}
              isLast={index === timeline.length - 1}
              {...entry}
            />
          ))}
        </div>
      </div>

      {/* Inline styles for timeline animations */}
      <style>{`
        @keyframes timeline-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes timeline-radar {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(3); opacity: 0.3; }
          100% { transform: scale(5); opacity: 0; }
        }
      `}</style>
    </CyberSection>
  );
}

export default Timeline;
