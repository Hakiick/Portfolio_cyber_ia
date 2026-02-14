import { CyberSection } from "../ui/CyberSection";
import { CyberBadge } from "../ui/CyberBadge";

interface Certification {
  nom: string;
  organisme: string;
  status: "obtained" | "in-progress" | "preparing";
  description: string;
}

const certifications: Certification[] = [
  {
    nom: "eJPTv2",
    organisme: "INE Security",
    status: "obtained",
    description: "Junior Penetration Tester",
  },
  {
    nom: "AZ-900",
    organisme: "Microsoft",
    status: "preparing",
    description: "Azure Fundamentals",
  },
  {
    nom: "AWS Cloud Practitioner",
    organisme: "AWS",
    status: "preparing",
    description: "Cloud Fundamentals",
  },
  {
    nom: "AWS AI Practitioner",
    organisme: "AWS",
    status: "in-progress",
    description: "AI/ML Fundamentals",
  },
];

function statusConfig(status: Certification["status"]): {
  variant: "green" | "blue" | "gray";
  label: string;
} {
  switch (status) {
    case "obtained":
      return { variant: "green", label: "Obtained" };
    case "in-progress":
      return { variant: "blue", label: "In progress" };
    case "preparing":
      return { variant: "gray", label: "Preparing" };
  }
}

export function CertificationsPlaceholder() {
  return (
    <CyberSection
      id="certifications"
      title="certifications"
      className="min-h-[60vh]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => {
          const config = statusConfig(cert.status);
          return (
            <div
              key={cert.nom}
              className="rounded border border-[var(--cyber-border)] bg-[var(--cyber-bg-secondary)] p-4 transition-all duration-200 hover:border-[var(--cyber-accent-green)]"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-mono text-sm font-bold text-[var(--cyber-text-primary)]">
                  {cert.nom}
                </h3>
                <CyberBadge variant={config.variant}>{config.label}</CyberBadge>
              </div>
              <p className="text-xs text-[var(--cyber-text-secondary)]">
                {cert.organisme} — {cert.description}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-6 font-mono text-sm text-[var(--cyber-text-secondary)]">
        // Badge wall interactif disponible prochainement
      </p>
    </CyberSection>
  );
}

export default CertificationsPlaceholder;
