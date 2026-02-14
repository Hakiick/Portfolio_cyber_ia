import { useEffect, useRef, useCallback } from "react";
import { cn } from "../../lib/utils";

export interface GlitchTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "span";
  intensity?: "subtle" | "medium" | "strong";
  className?: string;
}

const INTENSITY_INTERVAL: Record<"medium" | "strong", number> = {
  medium: 5000,
  strong: 2000,
};

const GLITCH_DURATION = 300;

export function GlitchText({
  text,
  as: Tag = "span",
  intensity = "subtle",
  className,
}: GlitchTextProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  const triggerGlitch = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;
    el.classList.add("is-glitching");
    setTimeout(() => {
      el.classList.remove("is-glitching");
    }, GLITCH_DURATION);
  }, []);

  useEffect(() => {
    if (intensity === "subtle") return;

    const interval = setInterval(triggerGlitch, INTENSITY_INTERVAL[intensity]);
    return () => clearInterval(interval);
  }, [intensity, triggerGlitch]);

  return (
    <Tag
      ref={elementRef as React.Ref<never>}
      data-text={text}
      className={cn("glitch-effect", className)}
    >
      {text}
    </Tag>
  );
}

export default GlitchText;
