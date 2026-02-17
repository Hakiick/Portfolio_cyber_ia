import { useState, useEffect, useRef, lazy, Suspense } from "react";

const Brain3DScene = lazy(() => import("./Brain3DScene"));

const CANVAS_OPACITY = 0.4;

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return gl !== null;
  } catch {
    return false;
  }
}

const containerStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 0,
  pointerEvents: "none",
  opacity: CANVAS_OPACITY,
};

export function Brain3D() {
  const [isMobile, setIsMobile] = useState(true);
  const [webglSupported, setWebglSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setWebglSupported(isWebGLAvailable());

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (isMobile || !webglSupported) {
    return (
      <div
        className="brain-fallback brain-3d-container"
        aria-hidden="true"
        style={containerStyle}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="brain-3d-container"
      aria-hidden="true"
      style={containerStyle}
    >
      <Suspense fallback={null}>
        <Brain3DScene isVisible={isVisible} />
      </Suspense>
    </div>
  );
}

export default Brain3D;
