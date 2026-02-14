import { profile } from "../../data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--cyber-border)] px-4 py-8 text-center">
      <div className="mx-auto max-w-5xl space-y-2">
        <p className="font-mono text-sm text-[var(--cyber-text-secondary)]">
          &copy; {currentYear} {profile.pseudo} ({profile.prenom}). All rights
          reserved.
        </p>
        <p className="font-mono text-xs text-[var(--cyber-text-secondary)]">
          Built with multi-agent AI &mdash;{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--cyber-accent-green)] transition-colors hover:text-[var(--cyber-accent-blue)]"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
