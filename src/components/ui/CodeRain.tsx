import { useEffect, useRef, useState } from "react";

const CODE_SNIPPETS = [
  "def exploit(target):\n  payload = craft(target)\n  return send(payload)",
  "nmap -sV -p 1-1000\n  target.local\n  22/tcp open ssh",
  "const agent = new AI()\nagent.analyze(threat)\nagent.respond()",
  "kubectl get pods -n prod\n  STATUS: Running\n  READY: 3/3",
  "SELECT * FROM users\n  WHERE role='admin'\n  LIMIT 1;",
  "docker build -t app .\ndocker push registry/app\ndocker-compose up",
  "git rebase origin/main\ngit push --force-with-lease\ngh pr create",
  "from yolov8 import YOLO\nmodel = YOLO('best.pt')\nresults = model(img)",
  "ssh root@10.0.0.1\ncat /etc/shadow\nchmod 600 id_rsa",
  "terraform init\nterraform plan\nterraform apply -auto",
  "import torch\nmodel.train()\nloss.backward()",
  "curl -X POST /api/v1\n  -H 'Authorization: Bearer'\n  -d '{\"prompt\": \"...\"}'",
];

const COLUMN_COUNT = 4;
const CHAR_DELAY = 80;

interface Column {
  snippet: string;
  charIndex: number;
  x: number;
  speed: number;
}

function pickSnippet(exclude: string): string {
  const filtered = CODE_SNIPPETS.filter((s) => s !== exclude);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function initColumn(x: number): Column {
  return {
    snippet: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
    charIndex: 0,
    x,
    speed: CHAR_DELAY + Math.random() * 60,
  };
}

export function CodeRain() {
  const [columns, setColumns] = useState<Column[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const positions = Array.from(
      { length: COLUMN_COUNT },
      (_, i) => ((i + 0.5) / COLUMN_COUNT) * 100,
    );
    const initial = positions.map((x) => initColumn(x));
    setColumns(initial);

    const intervals = initial.map((col, colIdx) => {
      return setInterval(() => {
        setColumns((prev) => {
          const updated = [...prev];
          const current = updated[colIdx];
          if (current.charIndex < current.snippet.length) {
            updated[colIdx] = {
              ...current,
              charIndex: current.charIndex + 1,
            };
          } else {
            updated[colIdx] = {
              ...current,
              snippet: pickSnippet(current.snippet),
              charIndex: 0,
              speed: CHAR_DELAY + Math.random() * 60,
            };
          }
          return updated;
        });
      }, col.speed);
    });

    intervalsRef.current = intervals;
    return () => intervals.forEach(clearInterval);
  }, [prefersReduced]);

  if (prefersReduced || columns.length === 0) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {columns.map((col, i) => (
        <pre
          key={i}
          className="absolute font-mono text-[10px] leading-tight whitespace-pre"
          style={{
            left: `${col.x}%`,
            top: "5%",
            color: "var(--cyber-accent-green)",
            opacity: 0.04,
            transform: "translateX(-50%)",
            maxWidth: "200px",
          }}
        >
          {col.snippet.slice(0, col.charIndex)}
          <span className="animate-pulse">_</span>
        </pre>
      ))}
    </div>
  );
}

export default CodeRain;
