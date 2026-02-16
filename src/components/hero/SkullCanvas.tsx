import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function SkullScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: "#00ff41",
        transparent: true,
        opacity: 0.8,
      }),
    [],
  );

  return (
    <group ref={groupRef}>
      {/* Crane */}
      <mesh scale={[1, 1.15, 0.85]} material={mat}>
        <icosahedronGeometry args={[1, 2]} />
      </mesh>

      {/* Oeil gauche */}
      <mesh position={[-0.3, 0.15, 0.75]} material={mat}>
        <torusGeometry args={[0.15, 0.03, 8, 16]} />
      </mesh>

      {/* Oeil droit */}
      <mesh position={[0.3, 0.15, 0.75]} material={mat}>
        <torusGeometry args={[0.15, 0.03, 8, 16]} />
      </mesh>

      {/* Nez */}
      <mesh
        position={[0, -0.05, 0.8]}
        rotation={[Math.PI, 0, 0]}
        material={mat}
      >
        <coneGeometry args={[0.08, 0.15, 3]} />
      </mesh>

      {/* Machoire */}
      <mesh position={[0, -0.55, 0.1]} scale={[0.7, 0.3, 0.6]} material={mat}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>

      {/* Os croises — os 1 (diagonale \ ) */}
      <group position={[0, -1.4, 0]} rotation={[0, 0, Math.PI / 4]}>
        <mesh material={mat}>
          <cylinderGeometry args={[0.06, 0.06, 2, 6]} />
        </mesh>
        <mesh position={[0, 1, 0]} material={mat}>
          <sphereGeometry args={[0.12, 6, 6]} />
        </mesh>
        <mesh position={[0, -1, 0]} material={mat}>
          <sphereGeometry args={[0.12, 6, 6]} />
        </mesh>
      </group>

      {/* Os croises — os 2 (diagonale / ) */}
      <group position={[0, -1.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <mesh material={mat}>
          <cylinderGeometry args={[0.06, 0.06, 2, 6]} />
        </mesh>
        <mesh position={[0, 1, 0]} material={mat}>
          <sphereGeometry args={[0.12, 6, 6]} />
        </mesh>
        <mesh position={[0, -1, 0]} material={mat}>
          <sphereGeometry args={[0.12, 6, 6]} />
        </mesh>
      </group>
    </group>
  );
}

export default function SkullCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, -0.3, 4], fov: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: "default" }}
      style={{ background: "transparent", touchAction: "none" }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#00ff41" />
      <SkullScene />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate
        autoRotate
        autoRotateSpeed={1}
        enableDamping
        dampingFactor={0.1}
        rotateSpeed={0.8}
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={0.8} levels={3} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
