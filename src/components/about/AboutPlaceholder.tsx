import { profile } from "../../data/profile";
import { CyberSection } from "../ui/CyberSection";
import { CyberBadge } from "../ui/CyberBadge";

export function AboutPlaceholder() {
  return (
    <CyberSection id="about" title="whoami" className="min-h-[60vh]">
      <div className="space-y-6">
        <p className="max-w-3xl text-base leading-relaxed text-[var(--cyber-text-primary)] md:text-lg">
          {profile.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          <CyberBadge variant="green">{profile.localisation}</CyberBadge>
          <CyberBadge variant="blue">Epitech</CyberBadge>
          <CyberBadge variant="purple">AI Security</CyberBadge>
        </div>

        <p className="font-mono text-sm text-[var(--cyber-text-secondary)]">
          // Section complète disponible prochainement
        </p>
      </div>
    </CyberSection>
  );
}

export default AboutPlaceholder;
