import { projects } from "../../data/projects";
import { CyberSection } from "../ui/CyberSection";
import { CyberBadge } from "../ui/CyberBadge";

function statusVariant(status: string): "green" | "blue" {
  return status === "completed" ? "green" : "blue";
}

export function ProjectsPlaceholder() {
  return (
    <CyberSection
      id="projects"
      title="projects_classified"
      className="min-h-[60vh]"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="relative overflow-hidden rounded border border-[var(--cyber-border)] bg-[var(--cyber-bg-secondary)] p-4 transition-all duration-200 hover:border-[var(--cyber-accent-green)]"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs text-[var(--cyber-text-secondary)]">
                DOSSIER-{String(index + 1).padStart(3, "0")}
              </span>
              <CyberBadge variant={statusVariant(project.status)}>
                {project.status}
              </CyberBadge>
            </div>

            <h3 className="mb-2 font-mono text-sm font-bold text-[var(--cyber-text-primary)]">
              {project.titre}
            </h3>

            <p className="mb-3 text-xs leading-relaxed text-[var(--cyber-text-secondary)]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {project.stack.slice(0, 3).map((tech) => (
                <CyberBadge key={tech} variant="gray">
                  {tech}
                </CyberBadge>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="rotate-[-20deg] font-mono text-3xl font-bold uppercase tracking-widest text-[var(--cyber-accent-red)] opacity-10">
                CLASSIFIED
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-sm text-[var(--cyber-text-secondary)]">
        // Dossiers classifiés interactifs disponibles prochainement
      </p>
    </CyberSection>
  );
}

export default ProjectsPlaceholder;
