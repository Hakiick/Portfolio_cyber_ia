import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { CyberSection } from "../ui/CyberSection";
import { ScrollReveal } from "../ui/ScrollReveal";
import { skills, type SkillCategory } from "../../data/skills";

const CHART_SIZE = 300;
const CENTER = CHART_SIZE / 2;
const RADIUS = 120;
const GRID_LEVELS = [0.25, 0.5, 0.75, 1.0];
const AXIS_COUNT = skills.length;

function polarToCartesian(
  angleDeg: number,
  radius: number,
): { x: number; y: number } {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
}

function getAxisAngle(index: number): number {
  return (360 / AXIS_COUNT) * index;
}

function buildPolygonPoints(levels: number[], scale: number): string {
  return levels
    .map((level, i) => {
      const angle = getAxisAngle(i);
      const r = (level / 100) * RADIUS * scale;
      const { x, y } = polarToCartesian(angle, r);
      return `${x},${y}`;
    })
    .join(" ");
}

function GridLines() {
  return (
    <>
      {GRID_LEVELS.map((level) => {
        const points = Array.from({ length: AXIS_COUNT }, (_, i) => {
          const angle = getAxisAngle(i);
          const { x, y } = polarToCartesian(angle, RADIUS * level);
          return `${x},${y}`;
        }).join(" ");

        return (
          <polygon
            key={level}
            points={points}
            fill="none"
            stroke="var(--cyber-border)"
            strokeWidth={1}
            opacity={0.6}
          />
        );
      })}
    </>
  );
}

function AxisLines({
  hoveredIndex,
  onHover,
  onLeave,
}: {
  hoveredIndex: number | null;
  onHover: (index: number) => void;
  onLeave: () => void;
}) {
  return (
    <>
      {skills.map((_, i) => {
        const angle = getAxisAngle(i);
        const { x, y } = polarToCartesian(angle, RADIUS);
        const isHovered = hoveredIndex === i;

        return (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke={
              isHovered ? "var(--cyber-accent-green)" : "var(--cyber-border)"
            }
            strokeWidth={isHovered ? 2 : 1}
            opacity={isHovered ? 0.9 : 0.4}
          />
        );
      })}
      {/* Invisible hit areas for hover */}
      {skills.map((_, i) => {
        const angle = getAxisAngle(i);
        const { x, y } = polarToCartesian(angle, RADIUS + 20);

        return (
          <line
            key={`hit-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="transparent"
            strokeWidth={24}
            className="cursor-pointer"
            onMouseEnter={() => onHover(i)}
            onMouseLeave={onLeave}
            onClick={() => onHover(i)}
          />
        );
      })}
    </>
  );
}

function AxisLabels({
  hoveredIndex,
  onHover,
}: {
  hoveredIndex: number | null;
  onHover: (index: number) => void;
}) {
  return (
    <>
      {skills.map((cat, i) => {
        const angle = getAxisAngle(i);
        const { x, y } = polarToCartesian(angle, RADIUS + 28);
        const isHovered = hoveredIndex === i;

        let textAnchor: "middle" | "start" | "end" = "middle";
        if (x < CENTER - 10) textAnchor = "end";
        else if (x > CENTER + 10) textAnchor = "start";

        const dy = y < CENTER - 10 ? -6 : y > CENTER + 10 ? 14 : 4;

        return (
          <text
            key={cat.id}
            x={x}
            y={y + dy}
            textAnchor={textAnchor}
            className="font-mono cursor-pointer select-none"
            fill={
              isHovered
                ? "var(--cyber-accent-green)"
                : "var(--cyber-text-primary)"
            }
            fontSize={11}
            fontWeight={isHovered ? 700 : 400}
            style={
              isHovered
                ? { filter: "drop-shadow(0 0 6px rgba(0,255,65,0.5))" }
                : undefined
            }
            onMouseEnter={() => onHover(i)}
          >
            {cat.label}
          </text>
        );
      })}
    </>
  );
}

function DataPolygon({ scale }: { scale: number }) {
  const levels = skills.map((cat) => cat.level);
  const points = buildPolygonPoints(levels, scale);

  return (
    <polygon
      points={points}
      fill="var(--cyber-accent-green)"
      fillOpacity={0.15}
      stroke="var(--cyber-accent-green)"
      strokeWidth={2}
      strokeOpacity={0.8}
      style={{
        filter: "drop-shadow(0 0 8px rgba(0,255,65,0.3))",
        transition: "all 0.3s ease-out",
      }}
    />
  );
}

function DataPoints({
  scale,
  hoveredIndex,
}: {
  scale: number;
  hoveredIndex: number | null;
}) {
  return (
    <>
      {skills.map((cat, i) => {
        const angle = getAxisAngle(i);
        const r = (cat.level / 100) * RADIUS * scale;
        const { x, y } = polarToCartesian(angle, r);
        const isHovered = hoveredIndex === i;

        return (
          <circle
            key={cat.id}
            cx={x}
            cy={y}
            r={isHovered ? 5 : 3}
            fill="var(--cyber-accent-green)"
            stroke="var(--cyber-bg-primary)"
            strokeWidth={1.5}
            style={
              isHovered
                ? { filter: "drop-shadow(0 0 8px rgba(0,255,65,0.6))" }
                : undefined
            }
          />
        );
      })}
    </>
  );
}

function useBruteForceNumber(
  target: number,
  delay: number,
  active: boolean,
): number {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setDisplay(0);
      return;
    }

    const duration = 800;
    const start = performance.now() + delay;
    let settled = false;

    const tick = (now: number) => {
      if (now < start) {
        setDisplay(Math.floor(Math.random() * 100));
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        if (progress < 0.7) {
          setDisplay(Math.floor(Math.random() * 100));
        } else {
          const variance = Math.floor((1 - progress) * 20);
          setDisplay(
            target + Math.floor(Math.random() * variance * 2 - variance),
          );
        }
        rafRef.current = requestAnimationFrame(tick);
      } else if (!settled) {
        settled = true;
        setDisplay(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, delay, active]);

  return display;
}

function BruteForceValue({
  value,
  delay,
  active,
}: {
  value: number;
  delay: number;
  active: boolean;
}) {
  const display = useBruteForceNumber(value, delay, active);
  return <>{display}%</>;
}

function SkillDetailPanel({ category }: { category: SkillCategory }) {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [category.id]);

  return (
    <div
      className="p-4 md:p-5 rounded-md border font-mono"
      style={{
        backgroundColor: "var(--cyber-bg-secondary)",
        borderColor: "var(--cyber-accent-green)",
        boxShadow: "var(--cyber-glow-green)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-sm md:text-base font-bold"
          style={{ color: "var(--cyber-accent-green)" }}
        >
          {category.label}
        </h3>
        <span
          className="text-xs px-2 py-1 rounded"
          style={{
            backgroundColor: "rgba(0,255,65,0.1)",
            color: "var(--cyber-accent-green)",
          }}
        >
          <BruteForceValue
            key={`cat-${animKey}`}
            value={category.level}
            delay={0}
            active={true}
          />
        </span>
      </div>
      <ul className="space-y-3">
        {category.items.map((skill, i) => (
          <li key={skill.name}>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: "var(--cyber-text-primary)" }}>
                {skill.name}
              </span>
              <span style={{ color: "var(--cyber-text-secondary)" }}>
                <BruteForceValue
                  key={`${skill.name}-${animKey}`}
                  value={skill.level}
                  delay={i * 100}
                  active={true}
                />
              </span>
            </div>
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--cyber-border)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${skill.level}%`,
                  backgroundColor:
                    skill.level >= 80
                      ? "var(--cyber-accent-green)"
                      : "var(--cyber-accent-blue)",
                  boxShadow:
                    skill.level >= 80
                      ? "0 0 8px rgba(0,255,65,0.4)"
                      : "0 0 8px rgba(0,212,255,0.4)",
                  transition: `width ${800 + i * 100}ms ease-out`,
                  transitionDelay: `${i * 100}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RadarChart({
  scale,
  hoveredIndex,
  onHover,
  onLeave,
}: {
  scale: number;
  hoveredIndex: number | null;
  onHover: (index: number) => void;
  onLeave: () => void;
}) {
  return (
    <svg
      viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
      className="w-full max-w-[300px] md:max-w-[360px] mx-auto"
      aria-label="Radar chart des compétences"
      role="img"
    >
      <GridLines />
      <AxisLines
        hoveredIndex={hoveredIndex}
        onHover={onHover}
        onLeave={onLeave}
      />
      <DataPolygon scale={scale} />
      <DataPoints scale={scale} hoveredIndex={hoveredIndex} />
      <AxisLabels hoveredIndex={hoveredIndex} onHover={onHover} />
    </svg>
  );
}

function SkillCategoryButtons({
  hoveredIndex,
  onSelect,
}: {
  hoveredIndex: number | null;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6 md:hidden">
      {skills.map((cat, i) => {
        const isActive = hoveredIndex === i;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(i)}
            className="px-3 py-1.5 text-xs font-mono rounded border transition-all duration-200"
            style={{
              backgroundColor: isActive
                ? "rgba(0,255,65,0.1)"
                : "var(--cyber-bg-secondary)",
              borderColor: isActive
                ? "var(--cyber-accent-green)"
                : "var(--cyber-border)",
              color: isActive
                ? "var(--cyber-accent-green)"
                : "var(--cyber-text-secondary)",
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

export function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleHover = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const handleMobileSelect = useCallback((index: number) => {
    setHoveredIndex((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          let start: number | null = null;
          const duration = 800;

          const animate = (timestamp: number) => {
            if (start === null) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setScale(eased);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  const activeCategory = useMemo(
    () => (hoveredIndex !== null ? skills[hoveredIndex] : null),
    [hoveredIndex],
  );

  return (
    <CyberSection id="skills" title="skills_">
      <div ref={sectionRef}>
        <ScrollReveal animation="fade-in">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Radar Chart */}
            <div
              className="flex-shrink-0 w-full md:w-1/2"
              onMouseLeave={handleLeave}
            >
              <RadarChart
                scale={scale}
                hoveredIndex={hoveredIndex}
                onHover={handleHover}
                onLeave={handleLeave}
              />
              <SkillCategoryButtons
                hoveredIndex={hoveredIndex}
                onSelect={handleMobileSelect}
              />
            </div>

            {/* Detail Panel */}
            <div className="w-full md:w-1/2 min-h-[200px]">
              {activeCategory ? (
                <SkillDetailPanel category={activeCategory} />
              ) : (
                <div
                  className="flex items-center justify-center h-full min-h-[200px] rounded-md border border-dashed p-6"
                  style={{
                    borderColor: "var(--cyber-border)",
                    color: "var(--cyber-text-secondary)",
                  }}
                >
                  <p className="font-mono text-sm text-center">
                    <span
                      className="block mb-2 text-base"
                      style={{ color: "var(--cyber-accent-green)" }}
                    >
                      [ ]
                    </span>
                    Survolez un axe du radar
                    <br />
                    pour voir le detail
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </CyberSection>
  );
}

export default Skills;
