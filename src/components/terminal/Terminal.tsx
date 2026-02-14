import { useState, useRef, useEffect, useCallback } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import CyberSection from "../ui/CyberSection";
import { terminalCommands } from "../../data/terminal-commands";
import type { TerminalCommand } from "../../data/terminal-commands";

interface HistoryEntry {
  command: string;
  output: string;
}

const WELCOME_MESSAGE =
  "Welcome to HakickOS v1.0\nType 'help' for available commands.";

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
    // Check if the input matches the full multi-word command name
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
      {entry.output && (
        <pre className="text-[var(--cyber-text-secondary)] font-mono text-sm whitespace-pre-wrap break-words mt-1 ml-0">
          {entry.output}
        </pre>
      )}
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

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = useCallback((rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

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

    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
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
    [inputValue, commandHistory, historyIndex, executeCommand],
  );

  const handleTerminalClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    // Only focus if not selecting text
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <CyberSection id="terminal" title="terminal_">
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
    </CyberSection>
  );
}

export default Terminal;
