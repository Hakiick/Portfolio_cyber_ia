import { useState, useRef, useEffect, useCallback } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import CyberSection from "../ui/CyberSection";
import { ScrollReveal } from "../ui/ScrollReveal";
import { MatrixRain } from "../ui/MatrixRain";
import { terminalCommands } from "../../data/terminal-commands";
import type { TerminalCommand } from "../../data/terminal-commands";
import { useAchievements, type Achievement } from "../../lib/useAchievements";

interface HistoryEntry {
  command: string;
  output: string;
  isStreaming?: boolean;
}

type TagColor = "green" | "blue" | "red" | "default";

interface ColoredSegment {
  text: string;
  color: TagColor;
}

const WELCOME_MESSAGE =
  "Welcome to HakickOS v1.0\nType 'help' for available commands.";

const TAG_COLORS: Record<string, TagColor> = {
  "[OK]": "green",
  "[FOUND]": "green",
  "[ACCESS]": "green",
  "[READY]": "green",
  "[SCAN]": "blue",
  "[INFO]": "blue",
  "[VULN]": "red",
  "[EXPLOIT]": "red",
  "[RED]": "red",
  "[ABORT]": "red",
};

const COLOR_CSS: Record<TagColor, string> = {
  green: "var(--cyber-accent-green)",
  blue: "var(--cyber-accent-blue)",
  red: "var(--cyber-accent-red)",
  default: "var(--cyber-text-secondary)",
};

function parseColoredLine(line: string): ColoredSegment[] {
  // Check for [RED] prefix — strip it and color the whole line
  if (line.startsWith("[RED]")) {
    const stripped = line.slice(5);
    return [{ text: stripped, color: "red" }];
  }

  // Check for known tags at start of line
  for (const [tag, color] of Object.entries(TAG_COLORS)) {
    if (tag === "[RED]") continue; // Already handled
    if (line.startsWith(tag)) {
      return [
        { text: tag, color },
        { text: line.slice(tag.length), color: "default" },
      ];
    }
  }

  return [{ text: line, color: "default" }];
}

function isStreamingOutput(output: string): boolean {
  const firstLine = output.split("\n")[0];
  return firstLine.startsWith("[SCAN]") || firstLine.startsWith("[RED]");
}

function resolveOutput(cmd: TerminalCommand, args: string[]): string {
  if (typeof cmd.output === "function") {
    return cmd.output(args);
  }
  return cmd.output;
}

function findCommand(
  input: string,
): { cmd: TerminalCommand; args: string[] } | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Try exact match first (handles multi-word commands like "cat about.txt")
  const exact = terminalCommands.find((c) => c.name === trimmed);
  if (exact) return { cmd: exact, args: [] };

  // Try matching the first word, then pass the rest as args
  const parts = trimmed.split(/\s+/);
  const firstWord = parts[0];

  // Check if any multi-word command starts with this input
  const multiWord = terminalCommands.find((c) => {
    const cmdParts = c.name.split(/\s+/);
    if (cmdParts.length <= 1) return false;
    return trimmed.startsWith(c.name);
  });
  if (multiWord) {
    const remainingArgs = trimmed
      .slice(multiWord.name.length)
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    return { cmd: multiWord, args: remainingArgs };
  }

  // Single-word command match
  const single = terminalCommands.find(
    (c) => c.name === firstWord && !c.name.includes(" "),
  );
  if (single) return { cmd: single, args: parts.slice(1) };

  return null;
}

function getAutoCompleteMatches(input: string): string[] {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return [];
  return terminalCommands
    .filter((c) => c.name.toLowerCase().startsWith(trimmed))
    .map((c) => c.name);
}

function formatAchievements(achievements: Achievement[]): string {
  const lines = [
    "╔════════════════════════════════════════════════════════════════╗",
    "║                     🏆 ACHIEVEMENTS 🏆                         ║",
    "╠════════════════════════════════════════════════════════════════╣",
  ];

  achievements.forEach((ach) => {
    const status = ach.unlocked ? "[OK]✓" : "[ ]✗";
    const statusColor = ach.unlocked ? "[OK]" : "[RED]";
    const icon = ach.icon;
    const title = ach.title.padEnd(20);
    const desc = ach.description;
    lines.push(`${statusColor}${status} ${icon} ${title} — ${desc}`);
  });

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  lines.push(
    "╠════════════════════════════════════════════════════════════════╣",
  );
  lines.push(
    `║ Progress: ${unlockedCount}/${achievements.length} unlocked${" ".repeat(42 - String(unlockedCount).length - String(achievements.length).length)}║`,
  );
  lines.push(
    "╚════════════════════════════════════════════════════════════════╝",
  );

  return lines.join("\n");
}

function ColoredLine({ line }: { line: string }) {
  const segments = parseColoredLine(line);
  return (
    <span>
      {segments.map((seg, i) => (
        <span key={i} style={{ color: COLOR_CSS[seg.color] }}>
          {seg.text}
        </span>
      ))}
    </span>
  );
}

function OutputBlock({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <pre className="font-mono text-sm whitespace-pre-wrap break-words mt-1 ml-0">
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && "\n"}
          <ColoredLine line={line} />
        </span>
      ))}
    </pre>
  );
}

function PromptLabel() {
  return (
    <span className="shrink-0 select-none font-mono text-sm" aria-hidden="true">
      <span className="text-[var(--cyber-accent-green)]">hakick</span>
      <span className="text-[var(--cyber-accent-blue)]">@portfolio</span>
      <span className="text-[var(--cyber-text-secondary)]">:~$ </span>
    </span>
  );
}

function HistoryLine({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="mb-2">
      <div className="flex items-start gap-0">
        <PromptLabel />
        <span className="text-[var(--cyber-text-primary)] font-mono text-sm break-all">
          {entry.command}
        </span>
      </div>
      {entry.output && <OutputBlock text={entry.output} />}
    </div>
  );
}

function WelcomeLine({ text }: { text: string }) {
  return (
    <pre className="text-[var(--cyber-accent-green)] font-mono text-sm whitespace-pre-wrap mb-2">
      {text}
    </pre>
  );
}

function TerminalHeader() {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--cyber-bg-secondary)] border-b border-[var(--cyber-border)]">
      <div className="flex gap-1.5">
        <span
          className="block w-3 h-3 rounded-full bg-red-500"
          aria-hidden="true"
        />
        <span
          className="block w-3 h-3 rounded-full bg-yellow-500"
          aria-hidden="true"
        />
        <span
          className="block w-3 h-3 rounded-full bg-green-500"
          aria-hidden="true"
        />
      </div>
      <span className="flex-1 text-center text-[var(--cyber-text-secondary)] font-mono text-xs">
        hakick@portfolio
      </span>
    </div>
  );
}

export function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [showMatrix, setShowMatrix] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasTypedCommand, setHasTypedCommand] = useState(false);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const { achievements, unlock } = useAchievements();

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Cleanup streaming timers on unmount
  useEffect(() => {
    return () => {
      streamTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  const streamOutput = useCallback((command: string, fullOutput: string) => {
    const lines = fullOutput.split("\n");
    setIsStreaming(true);

    // Add entry with empty output
    setHistory((prev) => [...prev, { command, output: "", isStreaming: true }]);
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);

    // Clear any existing timers
    streamTimersRef.current.forEach(clearTimeout);
    streamTimersRef.current = [];

    lines.forEach((line, i) => {
      const timer = setTimeout(
        () => {
          setHistory((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last && last.isStreaming) {
              const newOutput = last.output ? last.output + "\n" + line : line;
              updated[updated.length - 1] = {
                ...last,
                output: newOutput,
              };
            }
            return updated;
          });

          // Last line — mark streaming as done
          if (i === lines.length - 1) {
            setHistory((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last) {
                updated[updated.length - 1] = {
                  ...last,
                  isStreaming: false,
                };
              }
              return updated;
            });
            setIsStreaming(false);
          }
        },
        (i + 1) * 500,
      );
      streamTimersRef.current.push(timer);
    });
  }, []);

  const executeCommand = useCallback(
    (rawInput: string) => {
      const trimmed = rawInput.trim();
      if (!trimmed) return;
      if (isStreaming) return;

      // Unlock terminal-user achievement on first command
      if (!hasTypedCommand) {
        setHasTypedCommand(true);
        unlock("terminal-user");
      }

      // Handle clear command
      if (trimmed === "clear") {
        setHistory([]);
        setCommandHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);
        return;
      }

      const match = findCommand(trimmed);
      let output: string;

      if (match) {
        output = resolveOutput(match.cmd, match.args);
      } else {
        output = `command not found: ${trimmed}. Type 'help' for available commands.`;
      }

      // Handle special signals
      if (output === "__MATRIX__") {
        setShowMatrix(true);
        unlock("matrix-entered");
        setHistory((prev) => [...prev, { command: trimmed, output: "" }]);
        setCommandHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);
        return;
      }

      if (output === "__ACHIEVEMENTS__") {
        const achievementOutput = formatAchievements(achievements);
        setHistory((prev) => [
          ...prev,
          { command: trimmed, output: achievementOutput },
        ]);
        setCommandHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);
        return;
      }

      // Achievement triggers
      if (trimmed === "sudo hire-me") {
        unlock("hire-me");
      }

      if (output.includes("FLAG{")) {
        unlock("secret-finder");
      }

      // Handle streaming output (hack, rm -rf)
      if (isStreamingOutput(output)) {
        streamOutput(trimmed, output);
        return;
      }

      setHistory((prev) => [...prev, { command: trimmed, output }]);
      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
    },
    [isStreaming, streamOutput, hasTypedCommand, achievements, unlock],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (isStreaming) {
        e.preventDefault();
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        executeCommand(inputValue);
        setInputValue("");
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        const matches = getAutoCompleteMatches(inputValue);
        if (matches.length === 1) {
          setInputValue(matches[0]);
        } else if (matches.length > 1) {
          const output = matches.join("  ");
          setHistory((prev) => [...prev, { command: inputValue, output }]);
        }
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length === 0) return;
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputValue("");
        } else {
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        }
        return;
      }
    },
    [inputValue, commandHistory, historyIndex, executeCommand, isStreaming],
  );

  const handleTerminalClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <>
      {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
      <CyberSection id="terminal" title="terminal_">
        <ScrollReveal animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-lg overflow-hidden border border-[var(--cyber-border)] hover:border-[var(--cyber-accent-green)] transition-colors duration-300"
              style={{ boxShadow: "0 0 30px rgba(0, 255, 65, 0.05)" }}
              onClick={handleTerminalClick}
              role="application"
              aria-label="Terminal interactif"
            >
              <TerminalHeader />
              <div
                ref={outputRef}
                className="h-80 sm:h-96 overflow-y-auto p-4 bg-[var(--cyber-bg-terminal)]"
              >
                <WelcomeLine text={WELCOME_MESSAGE} />
                {history.map((entry, i) => (
                  <HistoryLine key={`${i}-${entry.command}`} entry={entry} />
                ))}
                <div className="flex items-start gap-0">
                  <PromptLabel />
                  <div className="relative flex-1 min-w-0">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-transparent text-[var(--cyber-text-primary)] font-mono text-sm outline-none border-none p-0 caret-transparent"
                      spellCheck={false}
                      autoComplete="off"
                      autoCapitalize="off"
                      aria-label="Terminal input"
                      disabled={isStreaming}
                    />
                    {/* Custom blinking cursor */}
                    <span
                      className="absolute top-0 pointer-events-none font-mono text-sm text-transparent"
                      aria-hidden="true"
                    >
                      {inputValue}
                      <span className="inline-block w-[0.55em] h-[1.15em] bg-[var(--cyber-accent-green)] align-middle animate-pulse" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </CyberSection>
    </>
  );
}

export default Terminal;
