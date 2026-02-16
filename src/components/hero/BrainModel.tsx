import {
  useState,
  useEffect,
  lazy,
  Suspense,
  Component,
  type ReactNode,
} from "react";

const BrainCanvas = lazy(() => import("./BrainCanvas"));

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return gl !== null;
  } catch {
    return false;
  }
}

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class BrainErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function FallbackVisual({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        background:
          "radial-gradient(circle, rgba(180,74,255,0.2) 0%, rgba(0,212,255,0.1) 50%, transparent 80%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        className="font-mono text-3xl"
        style={{ color: "var(--cyber-accent-purple)", opacity: 0.4 }}
      >
        {"\u{1F9E0}"}
      </span>
    </div>
  );
}

export function BrainModel({ className }: { className?: string }) {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const hasWebGL = detectWebGL();
    setCanRender(!isMobile && hasWebGL);
  }, []);

  if (!canRender) {
    return <FallbackVisual className={className} />;
  }

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <BrainErrorBoundary fallback={<FallbackVisual />}>
        <Suspense
          fallback={
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle, rgba(180,74,255,0.2) 0%, rgba(0,212,255,0.1) 50%, transparent 80%)",
              }}
            />
          }
        >
          <BrainCanvas />
        </Suspense>
      </BrainErrorBoundary>
    </div>
  );
}

export default BrainModel;
