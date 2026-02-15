import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "hakick-sfx";

type SoundName =
  | "boot-beep"
  | "key-press"
  | "command-exec"
  | "section-enter"
  | "glitch";

interface SoundEngine {
  sfxEnabled: boolean;
  toggleSfx: () => void;
  play: (sound: SoundName) => void;
}

function getStoredSfx(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

function setStoredSfx(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // localStorage might not be available
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function playBootBeep(ctx: AudioContext): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
}

function playKeyPress(ctx: AudioContext): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(2000, ctx.currentTime);
  gain.gain.setValueAtTime(0.03, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.03);
}

function playCommandExec(ctx: AudioContext): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.12);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.12);
}

function playSectionEnter(ctx: AudioContext): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
  gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

function playGlitch(ctx: AudioContext): void {
  const bufferSize = ctx.sampleRate * 0.1;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  source.buffer = buffer;
  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  source.connect(gain);
  gain.connect(ctx.destination);
  source.start(ctx.currentTime);
  source.stop(ctx.currentTime + 0.1);
}

const SOUND_MAP: Record<SoundName, (ctx: AudioContext) => void> = {
  "boot-beep": playBootBeep,
  "key-press": playKeyPress,
  "command-exec": playCommandExec,
  "section-enter": playSectionEnter,
  glitch: playGlitch,
};

/**
 * Hook for managing sound effects via Web Audio API.
 * AudioContext is created on first user gesture only.
 * Uses custom event "sfx-toggled" for cross-island sync.
 * OFF by default (opt-in). Respects prefers-reduced-motion.
 */
export function useSoundEngine(): SoundEngine {
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(getStoredSfx);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gestureReceivedRef = useRef(false);

  // Listen for cross-island sync
  useEffect(() => {
    function handleSfxToggled() {
      setSfxEnabled(getStoredSfx());
    }
    window.addEventListener("sfx-toggled", handleSfxToggled);
    return () => window.removeEventListener("sfx-toggled", handleSfxToggled);
  }, []);

  // Initialize AudioContext on first user gesture
  useEffect(() => {
    if (gestureReceivedRef.current) return;

    function initContext() {
      if (gestureReceivedRef.current) return;
      gestureReceivedRef.current = true;
      try {
        audioCtxRef.current = new AudioContext();
      } catch {
        // Web Audio API not supported
      }
      window.removeEventListener("click", initContext);
      window.removeEventListener("keydown", initContext);
    }

    window.addEventListener("click", initContext, { once: false });
    window.addEventListener("keydown", initContext, { once: false });

    return () => {
      window.removeEventListener("click", initContext);
      window.removeEventListener("keydown", initContext);
    };
  }, []);

  const toggleSfx = useCallback(() => {
    const next = !getStoredSfx();
    setStoredSfx(next);
    setSfxEnabled(next);
    window.dispatchEvent(new CustomEvent("sfx-toggled"));
  }, []);

  const play = useCallback(
    (sound: SoundName) => {
      if (!sfxEnabled) return;
      if (prefersReducedMotion()) return;

      const ctx = audioCtxRef.current;
      if (!ctx) return;

      // Resume context if suspended (autoplay policy)
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {
          // Cannot resume
        });
      }

      const playFn = SOUND_MAP[sound];
      if (playFn) {
        try {
          playFn(ctx);
        } catch {
          // Sound playback failed silently
        }
      }
    },
    [sfxEnabled],
  );

  return { sfxEnabled, toggleSfx, play };
}

export type { SoundName, SoundEngine };
