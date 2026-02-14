import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

const NODE_COUNT = 60;
const NODE_RADIUS = 0.15;
const CONNECTION_DISTANCE = 3.5;
const MOUSE_INFLUENCE_RADIUS = 4.0;
const CANVAS_OPACITY = 0.35;
const SCROLL_ROTATION_FACTOR = 0.0003;

interface NodeData {
  basePositions: Float32Array;
  velocities: Float32Array;
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return gl !== null;
  } catch {
    return false;
  }
}

function generateNodes(count: number): NodeData {
  const basePositions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const spread = 8;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    basePositions[i3] = (Math.random() - 0.5) * spread;
    basePositions[i3 + 1] = (Math.random() - 0.5) * spread;
    basePositions[i3 + 2] = (Math.random() - 0.5) * spread * 0.6;

    velocities[i3] = (Math.random() - 0.5) * 0.003;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
  }

  return { basePositions, velocities };
}

function buildConnections(
  positions: Float32Array,
  count: number,
  maxDist: number,
): { indices: number[]; opacities: number[] } {
  const indices: number[] = [];
  const opacities: number[] = [];
  const maxDistSq = maxDist * maxDist;

  for (let i = 0; i < count; i++) {
    const ix = i * 3;
    const iy = ix + 1;
    const iz = ix + 2;
    for (let j = i + 1; j < count; j++) {
      const jx = j * 3;
      const dx = positions[ix] - positions[jx];
      const dy = positions[iy] - positions[jx + 1];
      const dz = positions[iz] - positions[jx + 2];
      const distSq = dx * dx + dy * dy + dz * dz;
      if (distSq < maxDistSq) {
        indices.push(i, j);
        opacities.push(1 - Math.sqrt(distSq) / maxDist);
      }
    }
  }

  return { indices, opacities };
}

function createNodesMesh(
  positions: Float32Array,
): THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions.slice(), 3),
  );

  const sizes = new Float32Array(positions.length / 3);
  sizes.fill(NODE_RADIUS);
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    color: new THREE.Color("#00d4ff"),
    size: NODE_RADIUS,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

function createConnectionsMesh(
  positions: Float32Array,
  indices: number[],
  opacities: number[],
): THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial> {
  const geometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(indices.length * 3);
  const colors = new Float32Array(indices.length * 3);

  const greenColor = new THREE.Color("#00ff41");

  for (let i = 0; i < indices.length; i++) {
    const idx = indices[i];
    const i3 = i * 3;
    const idx3 = idx * 3;
    linePositions[i3] = positions[idx3];
    linePositions[i3 + 1] = positions[idx3 + 1];
    linePositions[i3 + 2] = positions[idx3 + 2];

    const pairIndex = Math.floor(i / 2);
    const opacity = opacities[pairIndex] ?? 0.15;
    colors[i3] = greenColor.r * opacity * 0.5;
    colors[i3 + 1] = greenColor.g * opacity * 0.5;
    colors[i3 + 2] = greenColor.b * opacity * 0.5;
  }

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(linePositions, 3),
  );
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.LineSegments(geometry, material);
}

function updateNodePositions(
  currentPositions: Float32Array,
  nodeData: NodeData,
  time: number,
): void {
  const { basePositions, velocities } = nodeData;
  const count = basePositions.length / 3;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    currentPositions[i3] =
      basePositions[i3] + Math.sin(time * velocities[i3] * 100 + i) * 0.3;
    currentPositions[i3 + 1] =
      basePositions[i3 + 1] +
      Math.cos(time * velocities[i3 + 1] * 100 + i * 0.7) * 0.3;
    currentPositions[i3 + 2] =
      basePositions[i3 + 2] +
      Math.sin(time * velocities[i3 + 2] * 100 + i * 1.3) * 0.2;
  }
}

function updateMouseInteraction(
  nodesMesh: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>,
  connectionsMesh: THREE.LineSegments<
    THREE.BufferGeometry,
    THREE.LineBasicMaterial
  >,
  mouseWorld: THREE.Vector3,
  connectionIndices: number[],
  baseOpacities: number[],
): void {
  const positions = nodesMesh.geometry.attributes.position;
  const posArray = positions.array as Float32Array;
  const sizes = nodesMesh.geometry.attributes.size;
  const sizeArray = sizes.array as Float32Array;
  const count = posArray.length / 3;
  const radiusSq = MOUSE_INFLUENCE_RADIUS * MOUSE_INFLUENCE_RADIUS;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const dx = posArray[i3] - mouseWorld.x;
    const dy = posArray[i3 + 1] - mouseWorld.y;
    const distSq = dx * dx + dy * dy;

    if (distSq < radiusSq) {
      const factor = 1 - Math.sqrt(distSq) / MOUSE_INFLUENCE_RADIUS;
      sizeArray[i] = NODE_RADIUS * (1 + factor * 2);
    } else {
      sizeArray[i] = NODE_RADIUS;
    }
  }
  sizes.needsUpdate = true;

  const lineColors = connectionsMesh.geometry.attributes.color;
  const colorArray = lineColors.array as Float32Array;
  const greenColor = new THREE.Color("#00ff41");
  const blueColor = new THREE.Color("#00d4ff");

  for (let p = 0; p < connectionIndices.length; p += 2) {
    const idxA = connectionIndices[p];
    const idxB = connectionIndices[p + 1];
    const pairIdx = p / 2;
    const baseOp = baseOpacities[pairIdx] ?? 0.15;

    const midX = (posArray[idxA * 3] + posArray[idxB * 3]) / 2;
    const midY = (posArray[idxA * 3 + 1] + posArray[idxB * 3 + 1]) / 2;
    const dx = midX - mouseWorld.x;
    const dy = midY - mouseWorld.y;
    const distSq = dx * dx + dy * dy;

    let intensity = baseOp * 0.5;
    let color = greenColor;
    if (distSq < radiusSq) {
      const factor = 1 - Math.sqrt(distSq) / MOUSE_INFLUENCE_RADIUS;
      intensity = baseOp * (0.5 + factor * 2);
      color = blueColor.clone().lerp(greenColor, 1 - factor);
    }

    for (const lineIdx of [p, p + 1]) {
      const c3 = lineIdx * 3;
      colorArray[c3] = color.r * intensity;
      colorArray[c3 + 1] = color.g * intensity;
      colorArray[c3 + 2] = color.b * intensity;
    }
  }
  lineColors.needsUpdate = true;
}

function updateConnectionPositions(
  connectionsMesh: THREE.LineSegments<
    THREE.BufferGeometry,
    THREE.LineBasicMaterial
  >,
  nodePositions: Float32Array,
  connectionIndices: number[],
): void {
  const linePositions = connectionsMesh.geometry.attributes.position;
  const linePosArray = linePositions.array as Float32Array;

  for (let i = 0; i < connectionIndices.length; i++) {
    const idx = connectionIndices[i];
    const i3 = i * 3;
    const idx3 = idx * 3;
    linePosArray[i3] = nodePositions[idx3];
    linePosArray[i3 + 1] = nodePositions[idx3 + 1];
    linePosArray[i3 + 2] = nodePositions[idx3 + 2];
  }
  linePositions.needsUpdate = true;
}

export function Brain3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 9999, y: 9999 });
  const cleanupRef = useRef<(() => void) | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile || !isWebGLAvailable()) {
      container.classList.add("brain-fallback");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 12;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      container.classList.add("brain-fallback");
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const nodeData = generateNodes(NODE_COUNT);
    const currentPositions = nodeData.basePositions.slice();
    const { indices: connectionIndices, opacities: baseOpacities } =
      buildConnections(currentPositions, NODE_COUNT, CONNECTION_DISTANCE);

    const nodesMesh = createNodesMesh(currentPositions);
    const connectionsMesh = createConnectionsMesh(
      currentPositions,
      connectionIndices,
      baseOpacities,
    );

    scene.add(connectionsMesh);
    scene.add(nodesMesh);

    const mouseWorld = new THREE.Vector3();
    let animationId: number;
    let scrollY = window.scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        container.classList.add("brain-fallback");
        renderer.domElement.style.display = "none";
        return;
      }
      renderer.domElement.style.display = "";
      container.classList.remove("brain-fallback");
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const heroSection = document.getElementById("hero");
    const aboutSection = document.getElementById("about");

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        isVisibleRef.current = anyVisible;
      },
      { threshold: 0 },
    );

    if (heroSection) observer.observe(heroSection);
    if (aboutSection) observer.observe(aboutSection);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const time = performance.now() * 0.001;

      updateNodePositions(currentPositions, nodeData, time);

      const nodePosAttr = nodesMesh.geometry.attributes.position;
      const nodePosArray = nodePosAttr.array as Float32Array;
      for (let i = 0; i < currentPositions.length; i++) {
        nodePosArray[i] = currentPositions[i];
      }
      nodePosAttr.needsUpdate = true;

      updateConnectionPositions(
        connectionsMesh,
        currentPositions,
        connectionIndices,
      );

      mouseWorld.set(mouseRef.current.x * 8, mouseRef.current.y * 5, 0);
      updateMouseInteraction(
        nodesMesh,
        connectionsMesh,
        mouseWorld,
        connectionIndices,
        baseOpacities,
      );

      scene.rotation.y = scrollY * SCROLL_ROTATION_FACTOR;
      scene.rotation.x = scrollY * SCROLL_ROTATION_FACTOR * 0.3;

      renderer.render(scene, camera);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    animate();

    cleanupRef.current = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationId);

      nodesMesh.geometry.dispose();
      nodesMesh.material.dispose();
      connectionsMesh.geometry.dispose();
      connectionsMesh.material.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="brain-3d-container"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: CANVAS_OPACITY,
      }}
    />
  );
}

export default Brain3D;
