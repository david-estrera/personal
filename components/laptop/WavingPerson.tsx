"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Low-poly person behind the desk, waving hello.
 */
export default function WavingPerson() {
  const arm = useRef<THREE.Group>(null);
  const hand = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);

  const skin = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c4a484",
        roughness: 0.75,
        metalness: 0.05,
      }),
    []
  );
  const shirt = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2f6fed",
        roughness: 0.7,
        metalness: 0.05,
      }),
    []
  );
  const pants = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2a3340",
        roughness: 0.8,
        metalness: 0.05,
      }),
    []
  );
  const hair = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1f1712",
        roughness: 0.9,
      }),
    []
  );
  const shoe = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1a1a",
        roughness: 0.7,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Friendly wave
    if (arm.current) {
      arm.current.rotation.z = -0.35 + Math.sin(t * 5.2) * 0.55;
      arm.current.rotation.x = 0.15 + Math.sin(t * 2.4) * 0.08;
    }
    if (hand.current) {
      hand.current.rotation.z = Math.sin(t * 5.2 + 0.4) * 0.35;
    }
    if (body.current) {
      body.current.position.y = Math.sin(t * 1.6) * 0.012;
      body.current.rotation.y = Math.sin(t * 0.7) * 0.04;
    }
  });

  return (
    // Behind desk, slightly to the right so they’re visible past the laptop
    <group position={[1.15, -0.72, -1.55]} rotation={[0, -0.35, 0]} scale={1.05}>
      <group ref={body}>
        {/* Legs */}
        <mesh position={[-0.1, 0.32, 0]} material={pants} castShadow>
          <boxGeometry args={[0.14, 0.55, 0.14]} />
        </mesh>
        <mesh position={[0.1, 0.32, 0]} material={pants} castShadow>
          <boxGeometry args={[0.14, 0.55, 0.14]} />
        </mesh>
        <mesh position={[-0.1, 0.04, 0.02]} material={shoe} castShadow>
          <boxGeometry args={[0.16, 0.08, 0.22]} />
        </mesh>
        <mesh position={[0.1, 0.04, 0.02]} material={shoe} castShadow>
          <boxGeometry args={[0.16, 0.08, 0.22]} />
        </mesh>

        {/* Torso */}
        <mesh position={[0, 0.78, 0]} material={shirt} castShadow>
          <boxGeometry args={[0.42, 0.5, 0.24]} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1.18, 0]} material={skin} castShadow>
          <boxGeometry args={[0.28, 0.3, 0.26]} />
        </mesh>
        <mesh position={[0, 1.3, -0.02]} material={hair} castShadow>
          <boxGeometry args={[0.3, 0.12, 0.28]} />
        </mesh>

        {/* Left arm (down / resting) */}
        <group position={[-0.28, 0.92, 0]}>
          <mesh position={[0, -0.18, 0]} material={shirt} castShadow>
            <boxGeometry args={[0.12, 0.36, 0.12]} />
          </mesh>
          <mesh position={[0, -0.4, 0]} material={skin} castShadow>
            <boxGeometry args={[0.1, 0.14, 0.1]} />
          </mesh>
        </group>

        {/* Right arm (waving) — pivot at shoulder */}
        <group ref={arm} position={[0.28, 0.95, 0]} rotation={[0, 0, -0.4]}>
          <mesh position={[0.02, 0.2, 0]} material={shirt} castShadow>
            <boxGeometry args={[0.12, 0.38, 0.12]} />
          </mesh>
          <group ref={hand} position={[0.02, 0.42, 0]}>
            <mesh material={skin} castShadow>
              <boxGeometry args={[0.11, 0.14, 0.1]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
