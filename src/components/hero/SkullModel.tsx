import {
  useState,
  useEffect,
  lazy,
  Suspense,
  Component,
  type ReactNode,
} from "react";

const SkullCanvas = lazy(() => import("./SkullCanvas"));

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

class SkullErrorBoundary extends Component<
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
          "radial-gradient(circle, rgba(0,255,65,0.15) 0%, rgba(0,255,65,0.05) 50%, transparent 80%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        className="font-mono text-3xl"
        style={{ color: "var(--cyber-accent-green)", opacity: 0.4 }}
      >
        {"\u2620"}
      </span>
    </div>
  );
}

export function SkullModel({ className }: { className?: string }) {
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
      <SkullErrorBoundary fallback={<FallbackVisual />}>
        <Suspense
          fallback={
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle, rgba(0,255,65,0.15) 0%, rgba(0,255,65,0.05) 50%, transparent 80%)",
              }}
            />
          }
        >
          <SkullCanvas />
        </Suspense>
      </SkullErrorBoundary>
    </div>
  );
}

export default SkullModel;
