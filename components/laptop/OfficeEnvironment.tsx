"use client";

import { useMemo } from "react";
import * as THREE from "three";

/** Daylight office — desk cleared so props never collide with the laptop */
export default function OfficeEnvironment() {
  const wallMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e8e4dc",
        roughness: 0.92,
        metalness: 0.02,
      }),
    []
  );
  const floorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c4b8a5",
        roughness: 0.85,
        metalness: 0.05,
      }),
    []
  );
  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8b6914",
        roughness: 0.7,
        metalness: 0.08,
      }),
    []
  );
  const woodDark = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#5c4510",
        roughness: 0.75,
        metalness: 0.06,
      }),
    []
  );
  const plantPot = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#6b7280",
        roughness: 0.8,
      }),
    []
  );
  const foliage = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3f7a4e",
        roughness: 0.85,
      }),
    []
  );
  const mugMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f5f5f4",
        roughness: 0.6,
      }),
    []
  );

  const deskTop = 0.08;
  const deskH = 0.72;

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -deskH, 0]}
        receiveShadow
        material={floorMat}
      >
        <planeGeometry args={[28, 28]} />
      </mesh>

      <mesh position={[0, 2.2 - deskH, -6]} receiveShadow material={wallMat}>
        <boxGeometry args={[28, 8, 0.2]} />
      </mesh>
      <mesh
        position={[-8, 2.2 - deskH, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
        material={wallMat}
      >
        <boxGeometry args={[20, 8, 0.2]} />
      </mesh>
      <mesh
        position={[8, 2.2 - deskH, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
        material={wallMat}
      >
        <boxGeometry args={[20, 8, 0.2]} />
      </mesh>

      {/* Soft window light (no bulky frame clipping into scene) */}
      <mesh position={[-7.9, 1.6 - deskH * 0.3, -2]}>
        <planeGeometry args={[0.1, 4]} />
        <meshBasicMaterial color="#fff8e7" />
      </mesh>

      {/* Desk — laptop stays centered with clear margins */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0, 0.1]}
        material={woodMat}
      >
        <boxGeometry args={[5.6, deskTop, 3.2]} />
      </mesh>
      {[
        [-2.4, -deskH / 2, 1.2],
        [2.4, -deskH / 2, 1.2],
        [-2.4, -deskH / 2, -1.0],
        [2.4, -deskH / 2, -1.0],
      ].map((p, i) => (
        <mesh
          key={i}
          position={p as [number, number, number]}
          material={woodDark}
          castShadow
        >
          <boxGeometry args={[0.12, deskH - 0.04, 0.12]} />
        </mesh>
      ))}

      {/* Plant — far left rear, clear of laptop + dog path */}
      <group position={[-2.45, deskTop / 2 + 0.01, -1.15]}>
        <mesh position={[0, 0.1, 0]} material={plantPot} castShadow>
          <cylinderGeometry args={[0.1, 0.085, 0.18, 16]} />
        </mesh>
        <mesh position={[0, 0.32, 0]} material={foliage} castShadow>
          <sphereGeometry args={[0.18, 12, 12]} />
        </mesh>
        <mesh position={[0.1, 0.36, 0.06]} material={foliage}>
          <sphereGeometry args={[0.1, 10, 10]} />
        </mesh>
      </group>

      {/* Mug — far right rear */}
      <group position={[2.45, deskTop / 2 + 0.01, -1.1]}>
        <mesh position={[0, 0.08, 0]} material={mugMat} castShadow>
          <cylinderGeometry args={[0.065, 0.055, 0.14, 16]} />
        </mesh>
        <mesh position={[0.085, 0.08, 0]} material={mugMat}>
          <torusGeometry args={[0.04, 0.01, 8, 16]} />
        </mesh>
      </group>
    </group>
  );
}
