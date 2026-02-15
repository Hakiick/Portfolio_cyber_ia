import { useState, useCallback, useEffect } from "react";

import { CyberSection } from "../ui/CyberSection";
import { ClassifiedCard } from "../ui/ClassifiedCard";
import { ScrollReveal } from "../ui/ScrollReveal";
import { projects, type ProjectCategory } from "../../data/projects";
import { useAchievements } from "../../lib/useAchievements";

interface FilterConfig {
  label: string;
  categories: ProjectCategory[] | null;
}

const FILTERS: FilterConfig[] = [
  { label: "Tous", categories: null },
  { label: "IA", categories: ["ia", "ia-cyber", "ia-meta"] },
  { label: "Cyber", categories: ["cyber", "ia-cyber"] },
  { label: "DevOps", categories: ["devops"] },
  { label: "IoT", categories: ["cloud-iot"] },
];

function filterProjects(categories: ProjectCategory[] | null) {
  if (!categories) return projects;
  return projects.filter((p) => categories.includes(p.categorie));
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("Tous");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [openedProjects, setOpenedProjects] = useState<Set<string>>(new Set());
  const { unlock } = useAchievements();

  const activeConfig = FILTERS.find((f) => f.label === activeFilter);
  const filteredProjects = filterProjects(activeConfig?.categories ?? null);

  const handleFilterChange = useCallback((label: string) => {
    setActiveFilter(label);
    setExpandedId(null);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
    setOpenedProjects((prev) => {
      const updated = new Set(prev);
      updated.add(id);
      return updated;
    });
  }, []);

  useEffect(() => {
    if (openedProjects.size === projects.length) {
      unlock("all-projects");
    }
  }, [openedProjects, unlock]);

  return (
    <CyberSection id="projects" title="projects_">
      {/* Filter bar */}
      <ScrollReveal animation="fade-in">
        <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.label;
            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => handleFilterChange(filter.label)}
                aria-pressed={isActive}
                className="rounded border px-3 py-1.5 font-mono text-xs transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm"
                style={{
                  borderColor: isActive
                    ? "var(--cyber-accent-green)"
                    : "var(--cyber-border)",
                  color: isActive
                    ? "var(--cyber-accent-green)"
                    : "var(--cyber-text-secondary)",
                  backgroundColor: "transparent",
                  boxShadow: isActive ? "var(--cyber-glow-green)" : "none",
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {filteredProjects.map((project, idx) => (
          <ScrollReveal key={project.id} animation="slide-up" delay={idx * 100}>
            <ClassifiedCard
              project={project}
              index={idx + 1}
              isExpanded={expandedId === project.id}
              onToggle={() => handleToggle(project.id)}
            />
          </ScrollReveal>
        ))}
      </div>
    </CyberSection>
  );
}

export default Projects;
