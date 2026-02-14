import { useState, useEffect, useRef, useCallback } from "react";

interface KeywordRule {
  words: string[];
  color: string;
}

const KEYWORD_RULES: KeywordRule[] = [
  {
    words: [
      "cybersécurité",
      "sécurité",
      "LLM",
      "pentest",
      "jailbreaks",
      "prompt injection",
    ],
    color: "var(--cyber-accent-green)",
  },
  {
    words: [
      "cloud computing",
      "cloud",
      "Kubernetes",
      "Docker",
      "AWS",
      "Azure",
      "Proxmox",
    ],
    color: "var(--cyber-accent-blue)",
  },
  {
    words: [
      "IA générative",
      "IA",
      "intelligence artificielle",
      "YOLOv8",
      "agents IA",
    ],
    color: "var(--cyber-accent-purple)",
  },
];

const CHAR_DELAY = 20;

function colorizeText(text: string): Array<{ text: string; color?: string }> {
  const segments: Array<{ text: string; color?: string }> = [];
  let remaining = text;

  while (remaining.length > 0) {
    let earliestMatch: {
      index: number;
      length: number;
      color: string;
    } | null = null;

    for (const rule of KEYWORD_RULES) {
      for (const word of rule.words) {
        const idx = remaining.toLowerCase().indexOf(word.toLowerCase());
        if (idx !== -1 && (!earliestMatch || idx < earliestMatch.index)) {
          earliestMatch = {
            index: idx,
            length: word.length,
            color: rule.color,
          };
        }
      }
    }

    if (earliestMatch) {
      if (earliestMatch.index > 0) {
        segments.push({ text: remaining.slice(0, earliestMatch.index) });
      }
      segments.push({
        text: remaining.slice(
          earliestMatch.index,
          earliestMatch.index + earliestMatch.length,
        ),
        color: earliestMatch.color,
      });
      remaining = remaining.slice(earliestMatch.index + earliestMatch.length);
    } else {
      segments.push({ text: remaining });
      remaining = "";
    }
  }

  return segments;
}

interface TypingBioProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function TypingBio({ text, className, style }: TypingBioProps) {
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLParagraphElement>(null);
  const rafRef = useRef(0);

  const segments = colorizeText(text);

  const startTyping = useCallback(() => {
    if (started) return;
    setStarted(true);

    let count = 0;
    const total = text.length;
    const interval = setInterval(() => {
      count += 1;
      if (count >= total) {
        setCharCount(total);
        setDone(true);
        clearInterval(interval);
      } else {
        setCharCount(count);
      }
    }, CHAR_DELAY);

    return () => clearInterval(interval);
  }, [text, started]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTyping();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [startTyping]);

  let renderedChars = 0;

  return (
    <p ref={containerRef} className={className} style={style}>
      {/* Hidden full text for SEO */}
      <span className="sr-only">{text}</span>

      {/* Visible typed text */}
      <span aria-hidden="true">
        {segments.map((seg, i) => {
          const segStart = renderedChars;
          renderedChars += seg.text.length;

          if (segStart >= charCount) return null;

          const visibleLength = Math.min(seg.text.length, charCount - segStart);
          const visibleText = seg.text.slice(0, visibleLength);

          return (
            <span key={i} style={seg.color ? { color: seg.color } : undefined}>
              {visibleText}
            </span>
          );
        })}
        {!done && started && (
          <span
            className="inline-block w-[0.5em] h-[1.1em] ml-0.5 align-middle animate-pulse"
            style={{ backgroundColor: "var(--cyber-accent-green)" }}
          />
        )}
      </span>
    </p>
  );
}

export default TypingBio;
