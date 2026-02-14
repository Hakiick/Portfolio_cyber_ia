import { skills } from "../../data/skills";
import { CyberSection } from "../ui/CyberSection";
import { CyberBadge } from "../ui/CyberBadge";

const variantByIndex: Array<"green" | "blue" | "purple" | "gray"> = [
  "green",
  "blue",
  "purple",
  "gray",
];

export function SkillsPlaceholder() {
  return (
    <CyberSection id="skills" title="skills" className="min-h-[60vh]">
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((category, index) => (
          <div
            key={category.id}
            className="rounded border border-[var(--cyber-border)] bg-[var(--cyber-bg-secondary)] p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold text-[var(--cyber-text-primary)]">
                {category.label}
              </h3>
              <CyberBadge
                variant={variantByIndex[index % variantByIndex.length]}
              >
                {category.level}%
              </CyberBadge>
            </div>

            <div className="h-2 w-full rounded-full bg-[var(--cyber-bg-primary)]">
              <div
                className="h-2 rounded-full bg-[var(--cyber-accent-green)]"
                style={{ width: `${String(category.level)}%` }}
              />
            </div>

            <p className="mt-3 font-mono text-xs text-[var(--cyber-text-secondary)]">
              {category.items.map((item) => item.name).join(" / ")}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-sm text-[var(--cyber-text-secondary)]">
        // Radar chart interactif disponible prochainement
      </p>
    </CyberSection>
  );
}

export default SkillsPlaceholder;
