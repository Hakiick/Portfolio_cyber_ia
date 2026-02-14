import { useState, useEffect, useCallback, useRef } from "react";
import { GlitchText } from "../ui/GlitchText";
import { cn } from "../../lib/utils";

interface NavLink {
  label: string;
  sectionId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About", sectionId: "about" },
  { label: "Skills", sectionId: "skills" },
  { label: "Projects", sectionId: "projects" },
  { label: "Certifs", sectionId: "certifications" },
  { label: "Timeline", sectionId: "timeline" },
  { label: "Terminal", sectionId: "terminal" },
  { label: "Contact", sectionId: "contact" },
];

const SCROLL_THRESHOLD = 50;

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aRect = a.boundingClientRect;
            const bRect = b.boundingClientRect;
            return Math.abs(aRect.top) - Math.abs(bRect.top);
          });

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    const sectionIds = NAV_LINKS.map((link) => link.sectionId);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        data-testid="nav-header"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[var(--cyber-bg-primary)]/80 backdrop-blur-md border-b border-[var(--cyber-border)]"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-bold md:text-3xl"
            aria-label="Retour en haut"
          >
            <GlitchText
              text="H"
              as="span"
              intensity="subtle"
              className="text-[var(--cyber-accent-green)]"
            />
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 md:flex lg:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.sectionId}>
                <button
                  data-testid={`nav-link-${link.label}`}
                  onClick={() => scrollToSection(link.sectionId)}
                  className={cn(
                    "font-mono text-sm transition-colors duration-200 hover:text-[var(--cyber-accent-green)]",
                    activeSection === link.sectionId
                      ? "text-[var(--cyber-accent-green)] text-glow-green"
                      : "text-[var(--cyber-text-secondary)]",
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col items-center justify-center gap-1.5 p-2 md:hidden"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={cn(
                "block h-0.5 w-6 bg-[var(--cyber-accent-green)] transition-all duration-300",
                isMobileMenuOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-[var(--cyber-accent-green)] transition-all duration-300",
                isMobileMenuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-[var(--cyber-accent-green)] transition-all duration-300",
                isMobileMenuOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          data-testid="mobile-menu-overlay"
          className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--cyber-bg-primary)]/95 backdrop-blur-md md:hidden"
        >
          <nav>
            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.sectionId}>
                  <button
                    data-testid={`mobile-nav-link-${link.label}`}
                    onClick={() => scrollToSection(link.sectionId)}
                    className={cn(
                      "font-mono text-xl transition-colors duration-200 hover:text-[var(--cyber-accent-green)]",
                      activeSection === link.sectionId
                        ? "text-[var(--cyber-accent-green)] text-glow-green"
                        : "text-[var(--cyber-text-secondary)]",
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Nav;
