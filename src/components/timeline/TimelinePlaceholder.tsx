import { timeline } from "../../data/timeline";
import { CyberSection } from "../ui/CyberSection";
import { CyberBadge } from "../ui/CyberBadge";
import type { TimelineEntryType } from "../../data/timeline";

function typeVariant(
  type: TimelineEntryType,
): "green" | "blue" | "purple" | "gray" {
  switch (type) {
    case "formation":
      return "blue";
    case "experience":
      return "green";
    case "certification":
      return "purple";
    case "pivot":
      return "green";
  }
}

export function TimelinePlaceholder() {
  return (
    <CyberSection id="timeline" title="timeline" className="min-h-[60vh]">
      <div className="relative space-y-8 border-l border-[var(--cyber-border)] pl-6">
        {timeline.map((entry) => (
          <div key={entry.titre} className="relative">
            <div className="absolute -left-[calc(1.5rem+0.25rem)] top-1 h-2 w-2 rounded-full bg-[var(--cyber-accent-green)]" />

            <div className="mb-1 flex items-center gap-3">
              <span className="font-mono text-xs text-[var(--cyber-text-secondary)]">
                {entry.date}
              </span>
              <CyberBadge variant={typeVariant(entry.type)}>
                {entry.type}
              </CyberBadge>
            </div>

            <h3 className="mb-1 font-mono text-sm font-bold text-[var(--cyber-text-primary)]">
              {entry.titre}
            </h3>

            <p className="text-sm leading-relaxed text-[var(--cyber-text-secondary)]">
              {entry.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-sm text-[var(--cyber-text-secondary)]">
        // Timeline animée disponible prochainement
      </p>
    </CyberSection>
  );
}

export default TimelinePlaceholder;
