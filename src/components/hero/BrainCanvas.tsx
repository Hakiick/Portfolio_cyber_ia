import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const VIOLET = new THREE.Color("#b44aff");
const BLUE = new THREE.Color("#00d4ff");
const PINK = new THREE.Color("#ff69b4");
const NEURON_COLORS = [VIOLET, BLUE, PINK, VIOLET, BLUE];

function generateBrainPoints(): {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  linePositions: Float32Array;
} {
  const pts: THREE.Vector3[] = [];
  const cols: number[] = [];
  const sizes: number[] = [];

  // Two hemispheres with a gap (sulcus) for brain-like shape
  const count = 200;
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    // Base sphere
    let r = 1.4 + (Math.random() - 0.5) * 0.3;

    // Add bumps (gyri) - brain folds
    const bumpFreq = 4 + Math.random() * 3;
    r += Math.sin(theta * bumpFreq) * Math.cos(phi * bumpFreq) * 0.15;

    let x = r * Math.sin(phi) * Math.cos(theta);
    let y = r * Math.cos(phi) * 1.1; // taller
    let z = r * Math.sin(phi) * Math.sin(theta) * 0.85; // flatter front-back

    // Create central gap (interhemispheric fissure)
    if (Math.abs(x) < 0.08) {
      x *= 0.3;
      y *= 0.95;
    }

    // Push hemispheres apart slightly
    x += x > 0 ? 0.05 : -0.05;

    pts.push(new THREE.Vector3(x, y, z));

    const color = NEURON_COLORS[i % NEURON_COLORS.length];
    cols.push(color.r, color.g, color.b);

    // Varying point sizes for depth
    sizes.push(0.03 + Math.random() * 0.04);
  }

  const posFlat = new Float32Array(pts.length * 3);
  for (let i = 0; i < pts.length; i++) {
    posFlat[i * 3] = pts[i].x;
    posFlat[i * 3 + 1] = pts[i].y;
    posFlat[i * 3 + 2] = pts[i].z;
  }

  // Connections between nearby neurons
  const lineVerts: number[] = [];
  const threshold = 0.65;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      if (pts[i].distanceTo(pts[j]) < threshold) {
        lineVerts.push(pts[i].x, pts[i].y, pts[i].z);
        lineVerts.push(pts[j].x, pts[j].y, pts[j].z);
      }
    }
  }

  return {
    positions: posFlat,
    colors: new Float32Array(cols),
    sizes: new Float32Array(sizes),
    linePositions: new Float32Array(lineVerts),
  };
}

function BrainScene() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, colors, sizes, linePositions } = useMemo(
    () => generateBrainPoints(),
    [],
  );

  // Subtle pulse animation
  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.elapsedTime;
      const scale = 1 + Math.sin(t * 0.8) * 0.02;
      pointsRef.current.scale.setScalar(scale);
    }
    if (linesRef.current) {
      const t = state.clock.elapsedTime;
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.12 + Math.sin(t * 1.2) * 0.05;
    }
  });

  return (
    <group>
      {/* Neuron points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          transparent
          opacity={0.95}
          sizeAttenuation
          vertexColors
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Synaptic connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color="#b44aff"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function BrainCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "default" }}
      style={{ background: "transparent", touchAction: "none" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 4, 3]} intensity={1} color="#b44aff" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#00d4ff" />

      <BrainScene />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate
        autoRotate
        autoRotateSpeed={1.5}
        enableDamping
        dampingFactor={0.12}
        rotateSpeed={0.8}
      />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          intensity={0.8}
          levels={4}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
