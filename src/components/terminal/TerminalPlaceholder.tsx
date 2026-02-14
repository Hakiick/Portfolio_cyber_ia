import { CyberSection } from "../ui/CyberSection";

export function TerminalPlaceholder() {
  return (
    <CyberSection id="terminal" title="terminal" className="min-h-[60vh]">
      <div className="overflow-hidden rounded border border-[var(--cyber-border)]">
        {/* Terminal header */}
        <div className="flex items-center gap-2 border-b border-[var(--cyber-border)] bg-[var(--cyber-bg-secondary)] px-4 py-2">
          <span className="h-3 w-3 rounded-full bg-[var(--cyber-accent-red)]" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-[var(--cyber-accent-green)]" />
          <span className="ml-2 font-mono text-xs text-[var(--cyber-text-secondary)]">
            hakick@portfolio
          </span>
        </div>

        {/* Terminal body */}
        <div className="bg-[var(--cyber-bg-terminal)] p-4 font-mono text-sm">
          <p className="text-[var(--cyber-text-secondary)]">
            <span className="text-[var(--cyber-accent-green)]">
              hakick@portfolio
            </span>
            <span className="text-[var(--cyber-text-secondary)]">:</span>
            <span className="text-[var(--cyber-accent-blue)]">~</span>
            <span className="text-[var(--cyber-text-primary)]">$ whoami</span>
          </p>
          <p className="mt-1 text-[var(--cyber-text-primary)]">
            Hakick (Maxime) — AI Security Engineer in the making
          </p>

          <p className="mt-3 text-[var(--cyber-text-secondary)]">
            <span className="text-[var(--cyber-accent-green)]">
              hakick@portfolio
            </span>
            <span className="text-[var(--cyber-text-secondary)]">:</span>
            <span className="text-[var(--cyber-accent-blue)]">~</span>
            <span className="text-[var(--cyber-text-primary)]">$ help</span>
          </p>
          <p className="mt-1 text-[var(--cyber-text-primary)]">
            Commandes disponibles : whoami, skills, projects, certifs, contact,
            cv, clear, sudo hire-me
          </p>

          <div className="mt-3 flex items-center">
            <span className="text-[var(--cyber-accent-green)]">
              hakick@portfolio
            </span>
            <span className="text-[var(--cyber-text-secondary)]">:</span>
            <span className="text-[var(--cyber-accent-blue)]">~</span>
            <span className="text-[var(--cyber-text-primary)]">$&nbsp;</span>
            <span className="inline-block h-4 w-2 animate-typing-cursor bg-[var(--cyber-accent-green)]" />
          </div>
        </div>
      </div>

      <p className="mt-6 font-mono text-sm text-[var(--cyber-text-secondary)]">
        // Terminal interactif disponible prochainement
      </p>
    </CyberSection>
  );
}

export default TerminalPlaceholder;
