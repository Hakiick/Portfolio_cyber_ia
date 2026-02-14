import { useEffect, useRef, useState } from "react";

const CURSOR_SIZE = 14;
const LERP_FACTOR = 0.15;
const PARTICLE_COUNT = 8;
const PARTICLE_LIFETIME = 400;
const PARTICLE_SPAWN_INTERVAL = 40;

interface Particle {
  x: number;
  y: number;
  born: number;
  size: number;
  vx: number;
  vy: number;
}

export function CyberCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const particles = useRef<Particle[]>([]);
  const lastSpawn = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      document.body.style.cursor = "";
      return;
    }

    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select")
      ) {
        isHovering.current = true;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select")
      ) {
        isHovering.current = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const resize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursorPos.current.x +=
          (mousePos.current.x - cursorPos.current.x) * LERP_FACTOR;
        cursorPos.current.y +=
          (mousePos.current.y - cursorPos.current.y) * LERP_FACTOR;

        const scale = isHovering.current ? 1.5 : 1;
        const color = isHovering.current
          ? "var(--cyber-accent-blue)"
          : "var(--cyber-accent-green)";

        cursor.style.transform = `translate(${cursorPos.current.x - CURSOR_SIZE / 2}px, ${cursorPos.current.y - CURSOR_SIZE / 2}px) scale(${scale})`;
        cursor.style.borderColor = color;

        const crosshairs = cursor.children;
        for (let i = 0; i < crosshairs.length; i++) {
          (crosshairs[i] as HTMLElement).style.backgroundColor = color;
        }
      }

      const now = performance.now();
      if (now - lastSpawn.current > PARTICLE_SPAWN_INTERVAL) {
        if (particles.current.length < PARTICLE_COUNT) {
          particles.current.push({
            x: cursorPos.current.x,
            y: cursorPos.current.y,
            born: now,
            size: 2 + Math.random() * 2,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
          });
        }
        lastSpawn.current = now;
      }

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.current = particles.current.filter((p) => {
          const age = now - p.born;
          if (age > PARTICLE_LIFETIME) return false;

          const alpha = 1 - age / PARTICLE_LIFETIME;
          p.x += p.vx;
          p.y += p.vy;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 65, ${alpha * 0.4})`;
          ctx.fill();
          return true;
        });
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "";
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", resize);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998 }}
        aria-hidden="true"
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full border"
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          zIndex: 9999,
          borderColor: "var(--cyber-accent-green)",
          transition: "border-color 0.2s",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <span
          className="absolute left-1/2 top-0 -translate-x-1/2 w-px"
          style={{
            height: 4,
            backgroundColor: "var(--cyber-accent-green)",
          }}
        />
        <span
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-px"
          style={{
            height: 4,
            backgroundColor: "var(--cyber-accent-green)",
          }}
        />
        <span
          className="absolute top-1/2 left-0 -translate-y-1/2 h-px"
          style={{
            width: 4,
            backgroundColor: "var(--cyber-accent-green)",
          }}
        />
        <span
          className="absolute top-1/2 right-0 -translate-y-1/2 h-px"
          style={{
            width: 4,
            backgroundColor: "var(--cyber-accent-green)",
          }}
        />
      </div>
    </>
  );
}

export default CyberCursor;
