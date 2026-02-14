import { CyberSection } from "../ui/CyberSection";
import { CyberBadge } from "../ui/CyberBadge";
import {
  certifications,
  type CertificationStatus,
} from "../../data/certifications";

const statusConfig: Record<
  CertificationStatus,
  {
    label: string;
    variant: "green" | "blue" | "gray";
    color: string;
    glow: string;
  }
> = {
  obtained: {
    label: "Obtained",
    variant: "green",
    color: "var(--cyber-accent-green)",
    glow: "rgba(0, 255, 65, 0.15)",
  },
  "in-progress": {
    label: "In Progress",
    variant: "blue",
    color: "var(--cyber-accent-blue)",
    glow: "rgba(0, 212, 255, 0.15)",
  },
  preparing: {
    label: "Preparing",
    variant: "gray",
    color: "var(--cyber-text-secondary)",
    glow: "rgba(138, 138, 138, 0.1)",
  },
};

function CertificationCard({
  nom,
  organisme,
  status,
  description,
}: {
  nom: string;
  organisme: string;
  status: CertificationStatus;
  description: string;
}) {
  const config = statusConfig[status];

  return (
    <div
      className="group relative rounded-md overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "var(--cyber-bg-secondary)",
        border: "1px solid var(--cyber-border)",
      }}
    >
      {/* Left status border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
        style={{ backgroundColor: config.color }}
      />

      <div
        className="p-4 sm:p-5 pl-5 sm:pl-6 transition-shadow duration-300"
        style={
          {
            "--hover-glow": `0 0 20px ${config.glow}`,
          } as React.CSSProperties
        }
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className="font-mono font-bold text-base sm:text-lg"
            style={{ color: config.color }}
          >
            {nom}
          </h3>
          <CyberBadge variant={config.variant}>{config.label}</CyberBadge>
        </div>

        <p
          className="font-mono text-xs sm:text-sm mb-1"
          style={{ color: "var(--cyber-text-secondary)" }}
        >
          {organisme}
        </p>

        <p className="text-sm" style={{ color: "var(--cyber-text-primary)" }}>
          {description}
        </p>
      </div>

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-md"
        style={{ boxShadow: `inset 0 0 30px ${config.glow}` }}
      />
    </div>
  );
}

export function Certifications() {
  return (
    <CyberSection id="certifications" title="certifications_">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {certifications.map((cert) => (
          <CertificationCard key={cert.nom} {...cert} />
        ))}
      </div>
    </CyberSection>
  );
}

export default Certifications;
