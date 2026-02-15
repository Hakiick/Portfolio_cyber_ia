import { useState } from "react";
import { CyberSection } from "../ui/CyberSection";
import { CyberBadge } from "../ui/CyberBadge";
import { ScrollReveal } from "../ui/ScrollReveal";
import {
  certifications,
  type CertificationStatus,
} from "../../data/certifications";
import { useLanguage } from "../../lib/useLanguage";

function useStatusConfig() {
  const { t } = useLanguage();
  return {
    obtained: {
      label: t("certifications.status.obtained"),
      variant: "green" as const,
      color: "var(--cyber-accent-green)",
      glow: "rgba(0, 255, 65, 0.15)",
    },
    "in-progress": {
      label: t("certifications.status.in-progress"),
      variant: "blue" as const,
      color: "var(--cyber-accent-blue)",
      glow: "rgba(0, 212, 255, 0.15)",
    },
    preparing: {
      label: t("certifications.status.preparing"),
      variant: "gray" as const,
      color: "var(--cyber-text-secondary)",
      glow: "rgba(138, 138, 138, 0.1)",
    },
  };
}

function CertificationCard({
  nom,
  organisme,
  status,
  description,
  descriptionEn,
  progress,
}: {
  nom: string;
  organisme: string;
  status: CertificationStatus;
  description: string;
  descriptionEn?: string;
  progress: number;
}) {
  const { lang } = useLanguage();
  const statusConfig = useStatusConfig();
  const config = statusConfig[status];
  const [isFlipped, setIsFlipped] = useState(false);

  const displayDescription =
    lang === "en" && descriptionEn ? descriptionEn : description;

  return (
    <div
      className="cert-flip-container cursor-pointer"
      style={{ perspective: "1000px", height: "180px" }}
      onClick={() => setIsFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped((f) => !f);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${nom} — ${config.label}. Click to see details.`}
    >
      <div
        className="cert-flip-inner relative w-full h-full transition-transform duration-600"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s ease-in-out",
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-md overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            backgroundColor: "var(--cyber-bg-secondary)",
            border: "1px solid var(--cyber-border)",
          }}
        >
          {/* Left status border */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ backgroundColor: config.color }}
          />

          <div className="p-4 sm:p-5 pl-5 sm:pl-6 h-full flex flex-col justify-between">
            <div>
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
                className="font-mono text-xs sm:text-sm"
                style={{ color: "var(--cyber-text-secondary)" }}
              >
                {organisme}
              </p>
            </div>

            <p
              className="font-mono text-[10px] mt-2"
              style={{ color: "var(--cyber-text-secondary)", opacity: 0.6 }}
            >
              Click to flip
            </p>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 rounded-md overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: "var(--cyber-bg-secondary)",
            border: `1px solid ${config.color}`,
            boxShadow: `0 0 15px ${config.glow}`,
          }}
        >
          <div className="p-4 sm:p-5 h-full flex flex-col justify-between">
            <div>
              <h3
                className="font-mono font-bold text-sm sm:text-base mb-2"
                style={{ color: config.color }}
              >
                {nom}
              </h3>

              <p
                className="text-sm mb-3"
                style={{ color: "var(--cyber-text-primary)" }}
              >
                {displayDescription}
              </p>

              <p
                className="font-mono text-xs mb-1"
                style={{ color: "var(--cyber-text-secondary)" }}
              >
                {organisme}
              </p>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between mb-1">
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--cyber-text-secondary)" }}
                >
                  Progress
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: config.color }}
                >
                  {progress}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "var(--cyber-border)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: config.color,
                    boxShadow: `0 0 6px ${config.color}`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Certifications() {
  return (
    <CyberSection id="certifications" title="section.certifications">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {certifications.map((cert, i) => (
          <ScrollReveal key={cert.nom} animation="slide-up" delay={i * 100}>
            <CertificationCard {...cert} />
          </ScrollReveal>
        ))}
      </div>
    </CyberSection>
  );
}

export default Certifications;
