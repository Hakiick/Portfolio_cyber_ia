import { useRef, useCallback, useState, useEffect } from "react";

const MAX_OFFSET = 8;

export function useMagneticEffect() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesktop || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.max(rect.width, rect.height);
      const factor = Math.min(1, dist / maxDist);
      setOffset({
        x: (dx / dist || 0) * MAX_OFFSET * factor,
        y: (dy / dist || 0) * MAX_OFFSET * factor,
      });
    },
    [isDesktop],
  );

  const onMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  const style: React.CSSProperties = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition:
      offset.x === 0 && offset.y === 0
        ? "transform 0.4s ease-out"
        : "transform 0.1s ease-out",
  };

  return { ref, onMouseMove, onMouseLeave, style };
}
