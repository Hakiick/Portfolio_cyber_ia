import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const NODE_COUNT = 70;
const NODE_RADIUS = 0.15;
const CONNECTION_DISTANCE = 3.5;
const MOUSE_INFLUENCE_RADIUS = 4.0;
const SCROLL_ROTATION_FACTOR = 0.0006;
const SPREAD = 9;
const BASE_ROTATION_SPEED = 0.08;

interface NodeData {
  basePositions: Float32Array;
  velocities: Float32Array;
}

function generateNodes(count: number): NodeData {
  const basePositions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    basePositions[i3] = (Math.random() - 0.5) * SPREAD;
    basePositions[i3 + 1] = (Math.random() - 0.5) * SPREAD;
    basePositions[i3 + 2] = (Math.random() - 0.5) * SPREAD * 0.6;

    velocities[i3] = (Math.random() - 0.5) * 0.008;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.008;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;
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

interface NeuralNetworkProps {
  isVisible: boolean;
}

function NeuralNetwork({ isVisible }: NeuralNetworkProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const scrollYRef = useRef(0);
  const { pointer } = useThree();

  const { nodeData, connectionIndices, baseOpacities } = useMemo(() => {
    const data = generateNodes(NODE_COUNT);
    const { indices, opacities } = buildConnections(
      data.basePositions,
      NODE_COUNT,
      CONNECTION_DISTANCE,
    );
    return {
      nodeData: data,
      connectionIndices: indices,
      baseOpacities: opacities,
    };
  }, []);

  const currentPositions = useMemo(
    () => nodeData.basePositions.slice(),
    [nodeData],
  );

  const { nodePositions, nodeSizes, linePositions, lineColors } =
    useMemo(() => {
      const np = currentPositions.slice();
      const ns = new Float32Array(NODE_COUNT);
      ns.fill(NODE_RADIUS);

      const lp = new Float32Array(connectionIndices.length * 3);
      const lc = new Float32Array(connectionIndices.length * 3);
      const greenColor = new THREE.Color("#00ff41");

      for (let i = 0; i < connectionIndices.length; i++) {
        const idx = connectionIndices[i];
        const i3 = i * 3;
        const idx3 = idx * 3;
        lp[i3] = np[idx3];
        lp[i3 + 1] = np[idx3 + 1];
        lp[i3 + 2] = np[idx3 + 2];

        const pairIndex = Math.floor(i / 2);
        const opacity = baseOpacities[pairIndex] ?? 0.15;
        lc[i3] = greenColor.r * opacity * 0.5;
        lc[i3 + 1] = greenColor.g * opacity * 0.5;
        lc[i3 + 2] = greenColor.b * opacity * 0.5;
      }

      return {
        nodePositions: np,
        nodeSizes: ns,
        linePositions: lp,
        lineColors: lc,
      };
    }, [connectionIndices, baseOpacities, currentPositions]);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const greenColor = useMemo(() => new THREE.Color("#00ff41"), []);
  const blueColor = useMemo(() => new THREE.Color("#00d4ff"), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!isVisible) return;
    if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

    const time = state.clock.elapsedTime;

    const { basePositions, velocities } = nodeData;
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      currentPositions[i3] =
        basePositions[i3] +
        Math.sin(time * velocities[i3] * 100 + i) * 0.7 +
        Math.sin(time * 0.3 + i * 0.5) * 0.15;
      currentPositions[i3 + 1] =
        basePositions[i3 + 1] +
        Math.cos(time * velocities[i3 + 1] * 100 + i * 0.7) * 0.7 +
        Math.cos(time * 0.25 + i * 0.3) * 0.15;
      currentPositions[i3 + 2] =
        basePositions[i3 + 2] +
        Math.sin(time * velocities[i3 + 2] * 100 + i * 1.3) * 0.45;
    }

    const pointsPosAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const pointsPosArray = pointsPosAttr.array as Float32Array;
    const sizesAttr = pointsRef.current.geometry.attributes
      .size as THREE.BufferAttribute;
    const sizesArray = sizesAttr.array as Float32Array;

    for (let i = 0; i < currentPositions.length; i++) {
      pointsPosArray[i] = currentPositions[i];
    }
    pointsPosAttr.needsUpdate = true;

    const linePosAttr = linesRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const linePosArray = linePosAttr.array as Float32Array;

    for (let i = 0; i < connectionIndices.length; i++) {
      const idx = connectionIndices[i];
      const i3 = i * 3;
      const idx3 = idx * 3;
      linePosArray[i3] = currentPositions[idx3];
      linePosArray[i3 + 1] = currentPositions[idx3 + 1];
      linePosArray[i3 + 2] = currentPositions[idx3 + 2];
    }
    linePosAttr.needsUpdate = true;

    const mouseX = pointer.x * 8;
    const mouseY = pointer.y * 5;
    const radiusSq = MOUSE_INFLUENCE_RADIUS * MOUSE_INFLUENCE_RADIUS;

    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      const dx = pointsPosArray[i3] - mouseX;
      const dy = pointsPosArray[i3 + 1] - mouseY;
      const distSq = dx * dx + dy * dy;

      if (distSq < radiusSq) {
        const factor = 1 - Math.sqrt(distSq) / MOUSE_INFLUENCE_RADIUS;
        sizesArray[i] = NODE_RADIUS * (1 + factor * 2);
      } else {
        sizesArray[i] = NODE_RADIUS;
      }
    }
    sizesAttr.needsUpdate = true;

    const lineColorAttr = linesRef.current.geometry.attributes
      .color as THREE.BufferAttribute;
    const lineColorArray = lineColorAttr.array as Float32Array;

    for (let p = 0; p < connectionIndices.length; p += 2) {
      const idxA = connectionIndices[p];
      const idxB = connectionIndices[p + 1];
      const pairIdx = p / 2;
      const baseOp = baseOpacities[pairIdx] ?? 0.15;

      const midX = (pointsPosArray[idxA * 3] + pointsPosArray[idxB * 3]) / 2;
      const midY =
        (pointsPosArray[idxA * 3 + 1] + pointsPosArray[idxB * 3 + 1]) / 2;
      const dx = midX - mouseX;
      const dy = midY - mouseY;
      const distSq = dx * dx + dy * dy;

      let intensity = baseOp * 0.5;
      tempColor.copy(greenColor);
      if (distSq < radiusSq) {
        const factor = 1 - Math.sqrt(distSq) / MOUSE_INFLUENCE_RADIUS;
        intensity = baseOp * (0.5 + factor * 2);
        tempColor.copy(blueColor).lerp(greenColor, 1 - factor);
      }

      for (const lineIdx of [p, p + 1]) {
        const c3 = lineIdx * 3;
        lineColorArray[c3] = tempColor.r * intensity;
        lineColorArray[c3 + 1] = tempColor.g * intensity;
        lineColorArray[c3 + 2] = tempColor.b * intensity;
      }
    }
    lineColorAttr.needsUpdate = true;

    groupRef.current.rotation.y =
      time * BASE_ROTATION_SPEED + scrollYRef.current * SCROLL_ROTATION_FACTOR;
    groupRef.current.rotation.x =
      Math.sin(time * 0.05) * 0.1 +
      scrollYRef.current * SCROLL_ROTATION_FACTOR * 0.3;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
          <bufferAttribute attach="attributes-size" args={[nodeSizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00d4ff"
          size={NODE_RADIUS}
          sizeAttenuation
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

interface Brain3DSceneProps {
  isVisible: boolean;
}

export default function Brain3DScene({ isVisible }: Brain3DSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 12], fov: 60 }}
      style={{ background: "transparent" }}
    >
      <NeuralNetwork isVisible={isVisible} />
      <Stars radius={100} depth={50} count={300} factor={2} fade speed={0.3} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={0.8}
        />
      </EffectComposer>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
