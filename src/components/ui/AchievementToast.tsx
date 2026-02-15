import { useState, useEffect, useCallback } from "react";
import type { Achievement } from "../../lib/useAchievements";

interface ToastData extends Achievement {
  key: number;
}

export function AchievementToast() {
  const [queue, setQueue] = useState<ToastData[]>([]);
  const [current, setCurrent] = useState<ToastData | null>(null);

  useEffect(() => {
    function handleUnlock(event: Event) {
      const customEvent = event as CustomEvent<Achievement>;
      const achievement = customEvent.detail;
      setQueue((prev) => [...prev, { ...achievement, key: Date.now() }]);
    }

    window.addEventListener("achievement-unlocked", handleUnlock);
    return () =>
      window.removeEventListener("achievement-unlocked", handleUnlock);
  }, []);

  const dismissCurrent = useCallback(() => {
    setCurrent(null);
  }, []);

  useEffect(() => {
    if (current || queue.length === 0) return;

    const next = queue[0];
    setCurrent(next);
    setQueue((prev) => prev.slice(1));

    const timer = setTimeout(() => {
      dismissCurrent();
    }, 3000);

    return () => clearTimeout(timer);
  }, [current, queue, dismissCurrent]);

  if (!current) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "1rem",
        zIndex: 100,
        maxWidth: "320px",
        width: "calc(100vw - 2rem)",
        padding: "1rem",
        backgroundColor: "var(--cyber-bg-secondary)",
        border: "1px solid var(--cyber-accent-green)",
        borderRadius: "4px",
        boxShadow: "var(--cyber-glow-green), 0 4px 12px rgba(0, 0, 0, 0.5)",
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: "0.875rem",
        animation: "slideInRight 0.3s ease-out, fadeOut 0.3s ease-in 2.7s",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}
      >
        <span
          style={{
            fontSize: "2rem",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {current.icon}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: "var(--cyber-accent-green)",
              fontWeight: 600,
              marginBottom: "0.25rem",
            }}
          >
            🏆 Achievement Unlocked!
          </div>
          <div
            style={{
              color: "var(--cyber-text-primary)",
              fontWeight: 700,
              marginBottom: "0.25rem",
            }}
          >
            {current.title}
          </div>
          <div
            style={{
              color: "var(--cyber-text-secondary)",
              fontSize: "0.75rem",
            }}
          >
            {current.description}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default AchievementToast;
