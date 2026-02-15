import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { LogoH } from "../ui/LogoH";
import { useAchievements } from "../../lib/useAchievements";
import { useLanguage } from "../../lib/useLanguage";
import { useSoundEngine } from "../../lib/useSoundEngine";

interface NavSection {
  id: string;
  label: string;
}

const NAV_SECTIONS: NavSection[] = [
  { id: "about", label: "nav.about" },
  { id: "skills", label: "nav.skills" },
  { id: "projects", label: "nav.projects" },
  { id: "certifications", label: "nav.certifications" },
  { id: "timeline", label: "nav.timeline" },
  { id: "terminal", label: "nav.terminal" },
  { id: "contact", label: "nav.contact" },
];

function useClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`,
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="language-toggle"
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: "0.65rem",
        background: "none",
        border: "1px solid var(--cyber-border)",
        borderRadius: "2px",
        padding: "2px 6px",
        cursor: "pointer",
        display: "flex",
        gap: "4px",
        alignItems: "center",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--cyber-accent-green)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--cyber-border)";
      }}
    >
      <span
        style={{
          color:
            lang === "fr"
              ? "var(--cyber-accent-green)"
              : "var(--cyber-text-secondary)",
          fontWeight: lang === "fr" ? "bold" : "normal",
        }}
      >
        FR
      </span>
      <span style={{ color: "var(--cyber-border)" }}>|</span>
      <span
        style={{
          color:
            lang === "en"
              ? "var(--cyber-accent-green)"
              : "var(--cyber-text-secondary)",
          fontWeight: lang === "en" ? "bold" : "normal",
        }}
      >
        EN
      </span>
    </button>
  );
}

function SfxToggle() {
  const { sfxEnabled, toggleSfx } = useSoundEngine();

  return (
    <button
      onClick={toggleSfx}
      aria-label={sfxEnabled ? "Disable sound effects" : "Enable sound effects"}
      className="sfx-toggle"
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: "0.65rem",
        background: "none",
        border: "1px solid var(--cyber-border)",
        borderRadius: "2px",
        padding: "2px 6px",
        cursor: "pointer",
        display: "flex",
        gap: "4px",
        alignItems: "center",
        transition: "border-color 0.2s",
        color: sfxEnabled
          ? "var(--cyber-accent-green)"
          : "var(--cyber-text-secondary)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--cyber-accent-green)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--cyber-border)";
      }}
    >
      <span>SFX</span>
      <span
        style={{
          fontSize: "0.55rem",
          opacity: 0.8,
        }}
      >
        {sfxEnabled ? "ON" : "OFF"}
      </span>
    </button>
  );
}

function SystemTray({ compact }: { compact?: boolean }) {
  const time = useClock();
  const { unlockedCount, totalCount } = useAchievements();

  const items = useMemo(
    () => (
      <>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: compact ? "0.65rem" : "0.6rem",
            color: "var(--cyber-accent-green)",
            padding: "2px 6px",
            border: "1px solid var(--cyber-accent-green)",
            borderRadius: "2px",
            opacity: 0.8,
          }}
        >
          🏆 {unlockedCount}/{totalCount}
        </span>
        <SfxToggle />
        <LanguageToggle />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: compact ? "0.7rem" : "0.65rem",
            color: "var(--cyber-accent-green)",
            letterSpacing: "0.05em",
          }}
        >
          {time}
        </span>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: compact ? "0.65rem" : "0.6rem",
            color: "var(--cyber-accent-green)",
            padding: "2px 6px",
            border: "1px solid var(--cyber-accent-green)",
            borderRadius: "2px",
            opacity: 0.8,
          }}
        >
          🔒 SECURE
        </span>
      </>
    ),
    [time, compact, unlockedCount, totalCount],
  );

  return items;
}

export default function Nav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const prevSectionRef = useRef<string>("");
  const { t } = useLanguage();
  const { play } = useSoundEngine();

  // Track scroll position for nav background
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY >= 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    const visibleSections = new Map<string, IntersectionObserverEntry>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        // Find the topmost visible section
        let topSection = "";
        let topY = Infinity;
        visibleSections.forEach((entry, id) => {
          const rect = entry.target.getBoundingClientRect();
          if (rect.top < topY) {
            topY = rect.top;
            topSection = id;
          }
        });

        if (topSection) {
          setActiveSection((prev) => {
            if (prev !== topSection) {
              prevSectionRef.current = prev;
              play("section-enter");
            }
            return topSection;
          });
        }
      },
      {
        threshold: 0.3,
        rootMargin: "-80px 0px -50% 0px",
      },
    );

    const observer = observerRef.current;

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      if (menuOpen) setMenuOpen(false);
    },
    [menuOpen],
  );

  const scrollToHero = useCallback(() => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    if (menuOpen) setMenuOpen(false);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
          transition: "background-color 0.3s, backdrop-filter 0.3s",
          backgroundColor: scrolled ? "rgba(10, 10, 15, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Logo */}
        <button
          onClick={scrollToHero}
          aria-label="Scroll to top"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <LogoH size={28} />
        </button>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
          className="nav-desktop-links"
        >
          {NAV_SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              aria-label={`Scroll to ${t(label)}`}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "0.25rem 0.5rem",
                transition: "color 0.2s",
                color:
                  activeSection === id
                    ? "var(--cyber-accent-green)"
                    : "var(--cyber-text-secondary)",
                textShadow:
                  activeSection === id
                    ? "0 0 10px rgba(0, 255, 65, 0.5)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== id) {
                  e.currentTarget.style.color = "var(--cyber-text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== id) {
                  e.currentTarget.style.color = "var(--cyber-text-secondary)";
                }
              }}
            >
              {t(label)}
            </button>
          ))}
        </div>

        {/* System tray (right zone) */}
        <div
          className="nav-system-tray"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <SystemTray />
        </div>

        {/* Mobile hamburger button */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "6px",
            width: "32px",
            height: "32px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              backgroundColor: "var(--cyber-accent-green)",
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              backgroundColor: "var(--cyber-accent-green)",
              transition: "opacity 0.3s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              backgroundColor: "var(--cyber-accent-green)",
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className="nav-mobile-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 49,
          backgroundColor: "rgba(10, 10, 15, 0.98)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          transition: "transform 0.3s ease, opacity 0.3s ease",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMenuOpen(false);
        }}
      >
        {NAV_SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              fontSize: "1.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "0.5rem 1rem",
              transition: "color 0.2s",
              color:
                activeSection === id
                  ? "var(--cyber-accent-green)"
                  : "var(--cyber-text-secondary)",
              textShadow:
                activeSection === id
                  ? "0 0 10px rgba(0, 255, 65, 0.5)"
                  : "none",
            }}
          >
            {t(label)}
          </button>
        ))}

        {/* System tray in mobile menu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginTop: "1rem",
          }}
        >
          <SystemTray compact />
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .nav-desktop-links {
          display: flex !important;
        }
        .nav-hamburger {
          display: none !important;
        }
        .nav-system-tray {
          display: flex !important;
        }

        @media (max-width: 767px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
          .nav-system-tray {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
