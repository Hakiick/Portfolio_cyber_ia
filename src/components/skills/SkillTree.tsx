import { useState, useCallback, useMemo } from "react";
import { skills } from "../../data/skills";
import { useLanguage } from "../../lib/useLanguage";

const TREE_W = 700;
const TREE_H = 500;
const CENTER_X = TREE_W / 2;
const CENTER_Y = TREE_H / 2;
const CATEGORY_RADIUS = 160;
const CHILD_OFFSET = 70;
const NODE_RADIUS_CAT = 28;
const NODE_RADIUS_SKILL = 14;

const CATEGORY_COLORS = [
  "var(--cyber-accent-blue)",
  "var(--cyber-accent-green)",
  "var(--cyber-accent-red)",
  "var(--cyber-accent-purple)",
];

interface TooltipData {
  x: number;
  y: number;
  name: string;
  level: number;
}

function levelToOpacity(level: number): number {
  return 0.4 + (level / 100) * 0.6;
}

export function SkillTree() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [expandedCat, setExpandedCat] = useState<number | null>(null);
  const { lang } = useLanguage();

  const handleCatClick = useCallback((index: number) => {
    setExpandedCat((prev) => (prev === index ? null : index));
    setTooltip(null);
  }, []);

  const categoryPositions = useMemo(() => {
    return skills.map((_, i) => {
      const angle = ((2 * Math.PI) / skills.length) * i - Math.PI / 2;
      return {
        x: CENTER_X + CATEGORY_RADIUS * Math.cos(angle),
        y: CENTER_Y + CATEGORY_RADIUS * Math.sin(angle),
        angle,
      };
    });
  }, []);

  return (
    <div className="w-full max-w-[700px] mx-auto relative">
      <svg
        viewBox={`0 0 ${TREE_W} ${TREE_H}`}
        className="w-full"
        aria-label="Skill tree RPG-style"
        role="img"
      >
        {/* Central hub */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={18}
          fill="var(--cyber-bg-secondary)"
          stroke="var(--cyber-accent-green)"
          strokeWidth={2}
          style={{ filter: "drop-shadow(0 0 8px rgba(0,255,65,0.4))" }}
        />
        <text
          x={CENTER_X}
          y={CENTER_Y + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--cyber-accent-green)"
          fontSize={10}
          className="font-mono font-bold"
        >
          CORE
        </text>

        {/* Lines from center to categories */}
        {categoryPositions.map((pos, i) => (
          <line
            key={`center-line-${i}`}
            x1={CENTER_X}
            y1={CENTER_Y}
            x2={pos.x}
            y2={pos.y}
            stroke={CATEGORY_COLORS[i]}
            strokeWidth={1.5}
            opacity={0.3}
            strokeDasharray="4 4"
          />
        ))}

        {/* Child skill nodes and connections */}
        {skills.map((cat, catIdx) => {
          if (expandedCat !== null && expandedCat !== catIdx) return null;
          const catPos = categoryPositions[catIdx];
          const isExpanded = expandedCat === catIdx;
          if (!isExpanded) return null;

          const childCount = cat.items.length;
          const spreadAngle = Math.PI * 0.8;
          const startAngle = catPos.angle - spreadAngle / 2;

          return cat.items.map((skill, skillIdx) => {
            const childAngle =
              childCount === 1
                ? catPos.angle
                : startAngle + (spreadAngle / (childCount - 1)) * skillIdx;
            const cx = catPos.x + CHILD_OFFSET * Math.cos(childAngle);
            const cy = catPos.y + CHILD_OFFSET * Math.sin(childAngle);
            const r = NODE_RADIUS_SKILL * (0.7 + (skill.level / 100) * 0.3);
            const skillName =
              lang === "en" && skill.nameEn ? skill.nameEn : skill.name;

            return (
              <g key={`skill-${catIdx}-${skillIdx}`}>
                <line
                  x1={catPos.x}
                  y1={catPos.y}
                  x2={cx}
                  y2={cy}
                  stroke={CATEGORY_COLORS[catIdx]}
                  strokeWidth={1}
                  opacity={0.4}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={CATEGORY_COLORS[catIdx]}
                  opacity={levelToOpacity(skill.level)}
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    filter:
                      skill.level >= 80
                        ? `drop-shadow(0 0 6px ${CATEGORY_COLORS[catIdx]})`
                        : undefined,
                  }}
                  onMouseEnter={() =>
                    setTooltip({
                      x: cx,
                      y: cy,
                      name: skillName,
                      level: skill.level,
                    })
                  }
                  onMouseLeave={() => setTooltip(null)}
                />
                <text
                  x={cx}
                  y={cy + r + 12}
                  textAnchor="middle"
                  fill="var(--cyber-text-secondary)"
                  fontSize={8}
                  className="font-mono pointer-events-none"
                >
                  {skillName.length > 15
                    ? skillName.slice(0, 14) + "…"
                    : skillName}
                </text>
              </g>
            );
          });
        })}

        {/* Category nodes (on top) */}
        {skills.map((cat, i) => {
          const pos = categoryPositions[i];
          const isExpanded = expandedCat === i;
          const label = lang === "en" && cat.labelEn ? cat.labelEn : cat.label;
          const shortLabel = label.split("/")[0].trim();

          return (
            <g
              key={cat.id}
              className="cursor-pointer"
              onClick={() => handleCatClick(i)}
              role="button"
              tabIndex={0}
              aria-label={`${label}: ${cat.level}%`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCatClick(i);
                }
              }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isExpanded ? NODE_RADIUS_CAT + 4 : NODE_RADIUS_CAT}
                fill="var(--cyber-bg-secondary)"
                stroke={CATEGORY_COLORS[i]}
                strokeWidth={isExpanded ? 3 : 2}
                style={{
                  filter: isExpanded
                    ? `drop-shadow(0 0 12px ${CATEGORY_COLORS[i]})`
                    : `drop-shadow(0 0 4px ${CATEGORY_COLORS[i]})`,
                  transition: "all 0.3s ease-out",
                }}
              />
              <text
                x={pos.x}
                y={pos.y - 3}
                textAnchor="middle"
                dominantBaseline="central"
                fill={CATEGORY_COLORS[i]}
                fontSize={9}
                className="font-mono font-bold pointer-events-none"
              >
                {shortLabel}
              </text>
              <text
                x={pos.x}
                y={pos.y + 10}
                textAnchor="middle"
                fill="var(--cyber-text-secondary)"
                fontSize={10}
                className="font-mono pointer-events-none"
              >
                {cat.level}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none font-mono text-xs px-3 py-2 rounded border"
          style={{
            left: `${(tooltip.x / TREE_W) * 100}%`,
            top: `${(tooltip.y / TREE_H) * 100 - 12}%`,
            transform: "translate(-50%, -100%)",
            backgroundColor: "var(--cyber-bg-secondary)",
            borderColor: "var(--cyber-accent-green)",
            color: "var(--cyber-text-primary)",
            boxShadow: "var(--cyber-glow-green)",
            zIndex: 10,
          }}
        >
          <span style={{ color: "var(--cyber-accent-green)" }}>
            {tooltip.name}
          </span>
          <span
            className="ml-2"
            style={{ color: "var(--cyber-text-secondary)" }}
          >
            {tooltip.level}%
          </span>
        </div>
      )}

      <p
        className="text-center font-mono text-xs mt-2"
        style={{ color: "var(--cyber-text-secondary)" }}
      >
        {lang === "en"
          ? "Click a node to expand skills"
          : "Cliquez sur un nœud pour voir les compétences"}
      </p>
    </div>
  );
}

export default SkillTree;
