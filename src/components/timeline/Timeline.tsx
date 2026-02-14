import { useEffect, useRef } from "react";
import { CyberSection } from "../ui/CyberSection";
import { timeline, type TimelineEntryType } from "../../data/timeline";

const typeConfig: Record<TimelineEntryType, { color: string; label: string }> =
  {
    formation: { color: "var(--cyber-accent-blue)", label: "Formation" },
    experience: { color: "var(--cyber-accent-green)", label: "Experience" },
    certification: {
      color: "var(--cyber-accent-purple)",
      label: "Certification",
    },
    pivot: { color: "var(--cyber-accent-red)", label: "Pivot" },
  };

function TimelineEntry({
  date,
  titre,
  description,
  type,
  index,
}: {
  date: string;
  titre: string;
  description: string;
  type: TimelineEntryType;
  index: number;
}) {
  const entryRef = useRef<HTMLDivElement>(null);
  const config = typeConfig[type];
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = entryRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-6");
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
        opacity-0 translate-y-6 transition-all duration-700 ease-out
        ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
      `}
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
          {titre}
        </h3>

        <p
          className="text-xs sm:text-sm leading-relaxed"
          style={{ color: "var(--cyber-text-secondary)" }}
        >
          {description}
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

      {/* Center dot - positioned on the line */}
      <div
        className="
          absolute left-0 md:left-1/2 md:-translate-x-1/2
          top-1 w-4 h-4 rounded-full border-2 z-10
          transition-shadow duration-300
        "
        style={{
          borderColor: config.color,
          backgroundColor: "var(--cyber-bg-primary)",
          boxShadow: `0 0 8px ${config.color}`,
        }}
      />

      {/* Spacer for alternating layout on desktop */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}

export function Timeline() {
  return (
    <CyberSection id="timeline" title="timeline_">
      <div className="relative">
        {/* Vertical line */}
        <div
          className="
            absolute left-[7px] md:left-1/2 md:-translate-x-px
            top-0 bottom-0 w-px
          "
          style={{ backgroundColor: "var(--cyber-border)" }}
        />

        <div className="flex flex-col gap-8 md:gap-12">
          {timeline.map((entry, index) => (
            <TimelineEntry key={entry.titre} index={index} {...entry} />
          ))}
        </div>
      </div>
    </CyberSection>
  );
}

export default Timeline;
