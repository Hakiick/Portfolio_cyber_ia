import { profile } from "../../data/profile";

export function Footer() {
  return (
    <footer
      className="w-full px-4 py-8"
      style={{
        backgroundColor: "var(--cyber-bg-primary)",
        borderTop: "1px solid var(--cyber-border)",
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 font-mono text-xs">
        <p style={{ color: "var(--cyber-text-primary)" }}>
          &copy; 2025 {profile.pseudo}
        </p>

        <p style={{ color: "var(--cyber-text-secondary)" }}>
          Built with multi-agent AI
        </p>

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200 hover:text-[var(--cyber-accent-green)]"
          style={{ color: "var(--cyber-text-secondary)" }}
          aria-label="GitHub profile"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
