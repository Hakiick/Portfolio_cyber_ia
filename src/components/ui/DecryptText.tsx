import { useEffect, useRef, useState, type CSSProperties } from "react";

interface DecryptTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  className?: string;
  style?: CSSProperties;
  delay?: number;
}

const CHAR_POOL =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?><{}[]";

const PRESERVED_CHARS = new Set([" ", ">", "_", "-", "."]);

const ANIMATION_DURATION_MS = 1200;

function getRandomChar(): string {
  return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function DecryptText({
  text,
  as: Tag = "span",
  className,
  style,
  delay = 0,
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(() => {
    if (prefersReducedMotion()) return text;
    return text
      .split("")
      .map((ch) => (PRESERVED_CHARS.has(ch) ? ch : getRandomChar()))
      .join("");
  });

  const containerRef = useRef<HTMLElement | null>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || animatingRef.current) return;

        animatingRef.current = true;
        observer.unobserve(element);

        const chars = text.split("");
        const revealableIndices = chars.reduce<number[]>((acc, ch, i) => {
          if (!PRESERVED_CHARS.has(ch)) acc.push(i);
          return acc;
        }, []);

        const totalRevealable = revealableIndices.length;
        if (totalRevealable === 0) {
          setDisplayText(text);
          return;
        }

        const intervalPerChar = ANIMATION_DURATION_MS / totalRevealable;
        let revealedCount = 0;
        let startTime: number | null = null;
        let rafId: number;

        function animate(timestamp: number) {
          if (startTime === null) startTime = timestamp;
          const elapsed = timestamp - startTime;

          const targetRevealed = Math.min(
            Math.floor(elapsed / intervalPerChar),
            totalRevealable,
          );

          const result = chars.slice();

          for (let i = 0; i < totalRevealable; i++) {
            const charIndex = revealableIndices[i];
            if (i < targetRevealed) {
              result[charIndex] = chars[charIndex];
            } else {
              result[charIndex] = getRandomChar();
            }
          }

          revealedCount = targetRevealed;
          setDisplayText(result.join(""));

          if (revealedCount < totalRevealable) {
            rafId = requestAnimationFrame(animate);
          }
        }

        const delayTimeout = setTimeout(() => {
          rafId = requestAnimationFrame(animate);
        }, delay);

        return () => {
          clearTimeout(delayTimeout);
          if (rafId) cancelAnimationFrame(rafId);
        };
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [text, delay]);

  return (
    <Tag
      ref={containerRef as React.RefObject<never>}
      className={className}
      style={style}
      aria-label={text}
    >
      {displayText}
    </Tag>
  );
}

export default DecryptText;
