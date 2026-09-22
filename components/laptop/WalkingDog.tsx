"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Low-poly dog walking a loop on the office floor around the desk.
 */
export default function WalkingDog() {
  const root = useRef<THREE.Group>(null);
  const fl = useRef<THREE.Group>(null);
  const fr = useRef<THREE.Group>(null);
  const bl = useRef<THREE.Group>(null);
  const br = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Group>(null);

  const fur = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c4a574",
        roughness: 0.85,
        metalness: 0.05,
      }),
    []
  );
  const dark = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3d3428",
        roughness: 0.8,
      }),
    []
  );
  const nose = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1512",
        roughness: 0.5,
      }),
    []
  );

  const floorY = -0.72;
  // Rounded rectangle path around the desk (outside the footprint)
  const halfW = 3.2;
  const halfD = 2.4;
  const t = useRef(0);

  useFrame((_, dt) => {
    t.current += dt;
    const time = t.current;

    // Parametric loop 0→1 around the desk
    const u = (time * 0.08) % 1;
    let x = 0;
    let z = 0;
    let heading = 0;

    if (u < 0.25) {
      // Front: left → right (face +X)
      const s = u / 0.25;
      x = THREE.MathUtils.lerp(-halfW, halfW, s);
      z = halfD;
      heading = 0;
    } else if (u < 0.5) {
      // Right: front → back (face -Z)
      const s = (u - 0.25) / 0.25;
      x = halfW;
      z = THREE.MathUtils.lerp(halfD, -halfD, s);
      heading = Math.PI / 2;
    } else if (u < 0.75) {
      // Back: right → left (face -X)
      const s = (u - 0.5) / 0.25;
      x = THREE.MathUtils.lerp(halfW, -halfW, s);
      z = -halfD;
      heading = Math.PI;
    } else {
      // Left: back → front (face +Z)
      const s = (u - 0.75) / 0.25;
      x = -halfW;
      z = THREE.MathUtils.lerp(-halfD, halfD, s);
      heading = -Math.PI / 2;
    }

    if (root.current) {
      root.current.position.set(
        x,
        floorY + Math.abs(Math.sin(time * 6)) * 0.02,
        z
      );
      root.current.rotation.y = heading;
    }

    const swing = Math.sin(time * 6.5) * 0.55;
    if (fl.current) fl.current.rotation.x = swing;
    if (br.current) br.current.rotation.x = swing;
    if (fr.current) fr.current.rotation.x = -swing;
    if (bl.current) bl.current.rotation.x = -swing;

    if (tail.current) {
      tail.current.rotation.y = Math.sin(time * 8) * 0.5;
      tail.current.rotation.x = 0.35 + Math.sin(time * 5) * 0.12;
    }
    if (head.current) {
      head.current.rotation.y = Math.sin(time * 1.1) * 0.12;
    }
  });

  const Leg = ({
    legRef,
    position,
  }: {
    legRef: React.RefObject<THREE.Group | null>;
    position: [number, number, number];
  }) => (
    <group ref={legRef} position={position}>
      <mesh position={[0, -0.12, 0]} material={fur} castShadow>
        <boxGeometry args={[0.07, 0.24, 0.07]} />
      </mesh>
      <mesh position={[0, -0.25, 0.01]} material={dark} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.1]} />
      </mesh>
    </group>
  );

  return (
    <group ref={root} scale={1.05}>
      <mesh position={[0, 0.28, 0]} material={fur} castShadow>
        <boxGeometry args={[0.55, 0.28, 0.28]} />
      </mesh>
      <mesh position={[0.22, 0.26, 0]} material={fur} castShadow>
        <boxGeometry args={[0.2, 0.26, 0.26]} />
      </mesh>

      <group ref={head} position={[0.42, 0.38, 0]}>
        <mesh material={fur} castShadow>
          <boxGeometry args={[0.22, 0.2, 0.2]} />
        </mesh>
        <mesh position={[0.12, -0.02, 0]} material={fur}>
          <boxGeometry args={[0.14, 0.1, 0.12]} />
        </mesh>
        <mesh position={[0.2, -0.02, 0]} material={nose}>
          <boxGeometry args={[0.05, 0.04, 0.06]} />
        </mesh>
        <mesh position={[-0.02, 0.14, 0.08]} material={dark} castShadow>
          <boxGeometry args={[0.06, 0.12, 0.04]} />
        </mesh>
        <mesh position={[-0.02, 0.14, -0.08]} material={dark} castShadow>
          <boxGeometry args={[0.06, 0.12, 0.04]} />
        </mesh>
        <mesh position={[0.08, 0.04, 0.09]} material={nose}>
          <boxGeometry args={[0.03, 0.03, 0.02]} />
        </mesh>
        <mesh position={[0.08, 0.04, -0.09]} material={nose}>
          <boxGeometry args={[0.03, 0.03, 0.02]} />
        </mesh>
      </group>

      <mesh ref={tail} position={[-0.3, 0.34, 0]} material={fur} castShadow>
        <boxGeometry args={[0.22, 0.06, 0.06]} />
      </mesh>

      <Leg legRef={fl} position={[0.2, 0.22, 0.1]} />
      <Leg legRef={fr} position={[0.2, 0.22, -0.1]} />
      <Leg legRef={bl} position={[-0.18, 0.22, 0.1]} />
      <Leg legRef={br} position={[-0.18, 0.22, -0.1]} />
    </group>
  );
}
