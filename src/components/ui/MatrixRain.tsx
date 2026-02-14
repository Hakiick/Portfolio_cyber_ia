import { useEffect, useRef, useCallback } from "react";

interface MatrixRainProps {
  onClose: () => void;
}

const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const COLUMN_WIDTH = 20;
const FONT_SIZE = 16;
const AUTO_CLOSE_MS = 5000;
const FADE_DURATION_MS = 500;
const COLOR = "#00ff41";

export function MatrixRain({ onClose }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dropsRef = useRef<number[]>([]);
  const opacityRef = useRef(1);
  const fadingRef = useRef(false);
  const fadeStartRef = useRef(0);
  const closedRef = useRef(false);

  const close = useCallback(() => {
    if (closedRef.current) return;
    closedRef.current = true;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.floor(canvas.width / COLUMN_WIDTH);
      // Re-init drops only if column count changed
      if (dropsRef.current.length !== columns) {
        dropsRef.current = Array.from(
          { length: columns },
          () => Math.random() * -50,
        );
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (timestamp: number) => {
      if (closedRef.current) return;

      // Handle fade-out
      if (fadingRef.current) {
        if (fadeStartRef.current === 0) {
          fadeStartRef.current = timestamp;
        }
        const elapsed = timestamp - fadeStartRef.current;
        opacityRef.current = Math.max(0, 1 - elapsed / FADE_DURATION_MS);
        if (opacityRef.current <= 0) {
          close();
          return;
        }
      }

      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;

      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const char =
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * COLUMN_WIDTH;
        const y = drops[i] * FONT_SIZE;

        // Varying brightness for trail effect
        const brightness = 0.5 + Math.random() * 0.5;
        const alpha = brightness * opacityRef.current;
        ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
        ctx.fillText(char, x, y);

        // Head of column is brighter
        if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * opacityRef.current})`;
          ctx.fillText(char, x, y);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    // Auto-close after duration
    const autoCloseTimer = setTimeout(() => {
      fadingRef.current = true;
    }, AUTO_CLOSE_MS);

    return () => {
      window.removeEventListener("resize", resize);
      clearTimeout(autoCloseTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [close]);

  useEffect(() => {
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close]);

  return (
    <canvas
      ref={canvasRef}
      onClick={close}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        backgroundColor: `rgba(0, 0, 0, 0.9)`,
        cursor: "pointer",
      }}
      aria-label="Matrix rain animation. Click or press Escape to close."
      role="img"
    />
  );
}

export default MatrixRain;
