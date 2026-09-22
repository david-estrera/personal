"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const W = 3.5;
const D = 2.3;
const T = 0.075;
const BEZEL = 0.11;

type Props = {
  openRef: React.MutableRefObject<number>;
};

/**
 * Procedural notebook. Lid angle is updated in useFrame from openRef
 * so scroll never re-renders the mesh tree (avoids shake).
 */
export default function Laptop({ openRef }: Props) {
  const lidPivot = useRef<THREE.Group>(null);
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);

  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#5c636c",
        metalness: 0.55,
        roughness: 0.42,
      }),
    []
  );
  const lidMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#6a7078",
        metalness: 0.58,
        roughness: 0.38,
      }),
    []
  );
  const darkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#141618",
        metalness: 0.4,
        roughness: 0.55,
      }),
    []
  );
  const keyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2e3338",
        metalness: 0.3,
        roughness: 0.6,
      }),
    []
  );
  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#16a34a",
        metalness: 0.5,
        roughness: 0.35,
        emissive: "#14532d",
        emissiveIntensity: 0.4,
      }),
    []
  );

  const keys = useMemo(() => {
    const list: { x: number; z: number; w: number; d: number }[] = [];
    const kw = 0.185;
    const kd = 0.165;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 14; c++) {
        list.push({
          x: -1.38 + c * (kw + 0.028),
          z: -0.55 + r * (kd + 0.028),
          w: kw,
          d: kd,
        });
      }
    }
    return list;
  }, []);

  useFrame((_, dt) => {
    const target = THREE.MathUtils.clamp(openRef.current, 0, 1);
    // Closed ≈ 0, open ≈ -75°
    const closed = 0.02;
    const open = -1.3;
    const desired = THREE.MathUtils.lerp(closed, open, target);

    if (lidPivot.current) {
      // Critically damped feel
      const k = Math.min(1, dt * 8);
      lidPivot.current.rotation.x = THREE.MathUtils.lerp(
        lidPivot.current.rotation.x,
        desired,
        k
      );
    }
    if (screenMat.current) {
      const wake = THREE.MathUtils.smoothstep(target, 0.25, 0.85);
      // Dark “powered on” panel (site surface), not green flood
      screenMat.current.color.set("#0c0c0e");
      screenMat.current.emissive.set("#141416");
      screenMat.current.emissiveIntensity = 0.15 + wake * 0.55;
    }
  });

  const screenW = W - BEZEL * 2;
  const screenH = D - BEZEL * 2;

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, T / 2, 0]} material={bodyMat}>
        <boxGeometry args={[W, T, D]} />
      </mesh>
      {keys.map((k, i) => (
        <mesh key={i} position={[k.x, T + 0.016, k.z]} material={keyMat}>
          <boxGeometry args={[k.w, 0.02, k.d]} />
        </mesh>
      ))}
      <mesh position={[0, T + 0.01, 0.6]} material={darkMat}>
        <boxGeometry args={[1.1, 0.01, 0.65]} />
      </mesh>
      <mesh position={[0, T + 0.008, -D / 2 + 0.05]} material={accentMat}>
        <boxGeometry args={[W * 0.5, 0.01, 0.03]} />
      </mesh>

      <group ref={lidPivot} position={[0, T, -D / 2 + 0.02]}>
        <mesh castShadow position={[0, T * 0.4, D / 2 - 0.02]} material={lidMat}>
          <boxGeometry args={[W, T * 0.85, D]} />
        </mesh>
        <mesh position={[0, -0.008, D / 2 - 0.02]} material={darkMat}>
          <boxGeometry args={[W - 0.05, 0.018, D - 0.05]} />
        </mesh>
        <mesh
          position={[0, T * 0.85, D / 2 - 0.02]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={accentMat}
        >
          <circleGeometry args={[0.08, 28]} />
        </mesh>
        {/* Dark powered-on panel only — real site takes over in DOM */}
        <mesh
          position={[0, -0.022, D / 2 - 0.02]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[screenW, screenH]} />
          <meshStandardMaterial
            ref={screenMat}
            color="#0c0c0e"
            emissive="#141416"
            emissiveIntensity={0.2}
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>
      </group>
    </group>
  );
}
