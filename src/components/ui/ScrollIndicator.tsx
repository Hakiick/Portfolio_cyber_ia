import { useState, useEffect, useCallback } from "react";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certs" },
  { id: "timeline", label: "Timeline" },
  { id: "terminal", label: "Terminal" },
];

export function ScrollIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section, index) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.3 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isDesktop]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (!isDesktop) return null;

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-0"
      aria-label="Section navigation"
    >
      {SECTIONS.map((section, i) => {
        const isActive = i === activeIndex;
        const isHovered = i === hoveredIndex;

        return (
          <div key={section.id} className="flex items-center relative">
            {/* Connecting line (not on first) */}
            {i > 0 && (
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: -10,
                  width: 1,
                  height: 10,
                  backgroundColor:
                    i <= activeIndex
                      ? "var(--cyber-accent-green)"
                      : "var(--cyber-border)",
                  opacity: i <= activeIndex ? 0.6 : 0.3,
                  transition: "background-color 0.3s, opacity 0.3s",
                }}
              />
            )}

            {/* Dot */}
            <button
              onClick={() => handleClick(section.id)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative w-3 h-3 rounded-full border transition-all duration-300 my-[5px]"
              style={{
                backgroundColor: isActive
                  ? "var(--cyber-accent-green)"
                  : "transparent",
                borderColor: isActive
                  ? "var(--cyber-accent-green)"
                  : "var(--cyber-border)",
                boxShadow: isActive ? "0 0 8px rgba(0,255,65,0.5)" : "none",
                transform: isActive || isHovered ? "scale(1.3)" : "scale(1)",
              }}
              aria-label={`Go to ${section.label}`}
              title={section.label}
            />

            {/* Tooltip */}
            {isHovered && (
              <span
                className="absolute right-6 px-2 py-1 rounded text-xs font-mono whitespace-nowrap"
                style={{
                  backgroundColor: "var(--cyber-bg-terminal)",
                  color: "var(--cyber-accent-green)",
                  border: "1px solid var(--cyber-border)",
                }}
              >
                {section.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default ScrollIndicator;
