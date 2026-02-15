import { useState, useEffect, useRef } from "react";
import { profile } from "../../data/profile";
import { useAchievements } from "../../lib/useAchievements";
import { useLanguage } from "../../lib/useLanguage";

const EPOCH = new Date("2025-01-01T00:00:00Z").getTime();

function useUptime() {
  const [uptime, setUptime] = useState("");

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - EPOCH;
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setUptime(
        `${days}d ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return uptime;
}

function TerminalLine({
  command,
  output,
  outputColor,
}: {
  command: string;
  output: string;
  outputColor?: string;
}) {
  return (
    <div className="flex flex-wrap gap-x-2">
      <span style={{ color: "var(--cyber-accent-green)" }}>
        hakick@portfolio:~$
      </span>
      <span style={{ color: "var(--cyber-text-primary)" }}>{command}</span>
      <span style={{ color: outputColor ?? "var(--cyber-text-secondary)" }}>
        {output}
      </span>
    </div>
  );
}

export function Footer() {
  const uptime = useUptime();
  const { unlock } = useAchievements();
  const footerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            unlock("scroll-master");
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [unlock]);

  return (
    <footer
      ref={footerRef}
      className="w-full px-4 py-6"
      style={{
        backgroundColor: "var(--cyber-bg-terminal)",
        borderTop: "1px solid var(--cyber-accent-green)",
        boxShadow: "0 -1px 10px rgba(0, 255, 65, 0.1)",
      }}
    >
      <div className="mx-auto max-w-5xl font-mono text-xs leading-relaxed">
        <div className="flex flex-col gap-1.5">
          <TerminalLine command={t("footer.uptime")} output={uptime} />
          <TerminalLine
            command={t("footer.uname")}
            output={t("footer.uname.value")}
          />
          <TerminalLine
            command={t("footer.copyright")}
            output={t("footer.copyright.value", { pseudo: profile.pseudo })}
          />
          <TerminalLine
            command={t("footer.motd")}
            output={t("footer.motd.value")}
            outputColor="var(--cyber-accent-purple)"
          />
          <div className="flex flex-wrap gap-x-2">
            <span style={{ color: "var(--cyber-accent-green)" }}>
              hakick@portfolio:~$
            </span>
            <span style={{ color: "var(--cyber-text-primary)" }}>
              {t("footer.github")}
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors duration-200 hover:text-[var(--cyber-accent-green)]"
              style={{ color: "var(--cyber-accent-blue)" }}
              aria-label="GitHub profile"
            >
              {profile.github}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
