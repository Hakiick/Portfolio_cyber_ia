import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const NEURON_COLORS = [
  new THREE.Color("#b44aff"),
  new THREE.Color("#00d4ff"),
  new THREE.Color("#ff69b4"),
];

const CONNECTION_THRESHOLD = 0.8;

function BrainScene() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, linePositions } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.5, 3);
    const posArray = geo.attributes.position.array as Float32Array;
    const vertexCount = posArray.length / 3;

    const pts: THREE.Vector3[] = [];
    const cols: number[] = [];

    for (let i = 0; i < vertexCount; i++) {
      const x = posArray[i * 3] * 1.1 + (Math.random() - 0.5) * 0.1;
      const y = posArray[i * 3 + 1] * 0.85 + (Math.random() - 0.5) * 0.1;
      const z = posArray[i * 3 + 2] + (Math.random() - 0.5) * 0.1;

      pts.push(new THREE.Vector3(x, y, z));

      const colorIndex = i % 7 === 0 ? 2 : i % 3 === 0 ? 1 : 0;
      const color = NEURON_COLORS[colorIndex];
      cols.push(color.r, color.g, color.b);
    }

    const positionsFlat = new Float32Array(pts.length * 3);
    for (let i = 0; i < pts.length; i++) {
      positionsFlat[i * 3] = pts[i].x;
      positionsFlat[i * 3 + 1] = pts[i].y;
      positionsFlat[i * 3 + 2] = pts[i].z;
    }

    const lineVerts: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < CONNECTION_THRESHOLD) {
          lineVerts.push(pts[i].x, pts[i].y, pts[i].z);
          lineVerts.push(pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    geo.dispose();

    return {
      positions: positionsFlat,
      colors: new Float32Array(cols),
      linePositions: new Float32Array(lineVerts),
    };
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.002) * 0.015;
      pointsRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          transparent
          opacity={0.9}
          sizeAttenuation
          vertexColors
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

export default function BrainCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ background: "transparent" }}
    >
      <BrainScene />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5}
        enableDamping
        dampingFactor={0.1}
        rotateSpeed={0.8}
      />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#b44aff" />
      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={0.6} levels={3} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
