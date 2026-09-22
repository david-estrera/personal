"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { motion, useMotionValue, useTransform } from "motion/react";
import * as THREE from "three";
import Laptop from "./laptop/Laptop";
import OfficeEnvironment from "./laptop/OfficeEnvironment";
import WalkingDog from "./laptop/WalkingDog";
import WavingPerson from "./laptop/WavingPerson";
import Hero from "./Hero";

/**
 * 0–0.35 open · 0.32–0.48 zoom to black screen ·
 * 0.54–0.62 Hero fades in · held pinned until sticky ends (~0.72).
 */
function ScrollRig({
  openRef,
  progressRef,
}: {
  openRef: React.MutableRefObject<number>;
  progressRef: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3(0, 2.55, 5.6));
  const look = useRef(new THREE.Vector3(0, -0.05, 0.2));
  const posTarget = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());

  useFrame((_, dt) => {
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const open = THREE.MathUtils.smoothstep(p, 0.0, 0.35);
    openRef.current = open;

    const zoom = THREE.MathUtils.smoothstep(p, 0.32, 0.48);
    const openE = open * open * (3 - 2 * open);
    const zoomE = zoom * zoom * (3 - 2 * zoom);

    posTarget.current.set(
      0,
      THREE.MathUtils.lerp(THREE.MathUtils.lerp(2.55, 1.85, openE), 1.22, zoomE),
      THREE.MathUtils.lerp(THREE.MathUtils.lerp(5.6, 3.5, openE), 1.35, zoomE)
    );
    lookTarget.current.set(
      0,
      THREE.MathUtils.lerp(THREE.MathUtils.lerp(-0.05, 0.75, openE), 1.08, zoomE),
      THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.2, -0.2, openE), -0.58, zoomE)
    );

    const k = Math.min(1, dt * 5.5);
    pos.current.lerp(posTarget.current, k);
    look.current.lerp(lookTarget.current, k);
    camera.position.copy(pos.current);
    camera.lookAt(look.current);

    if ("fov" in camera) {
      const cam = camera as THREE.PerspectiveCamera;
      cam.fov = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(42, 34, openE),
        24,
        zoomE
      );
      cam.updateProjectionMatrix();
    }
  });

  return null;
}

function Scene({
  openRef,
  progressRef,
}: {
  openRef: React.MutableRefObject<number>;
  progressRef: React.MutableRefObject<number>;
}) {
  return (
    <>
      <color attach="background" args={["#e4dfd5"]} />
      <fog attach="fog" args={["#e4dfd5", 12, 26]} />
      <ambientLight intensity={0.58} />
      <hemisphereLight args={["#f5f7fa", "#b5a890", 0.65]} />
      <directionalLight
        position={[-5, 6, 2]}
        intensity={1.5}
        color="#fff4e6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[4, 5, 3]} intensity={0.4} color="#eef2f7" />

      <OfficeEnvironment />
      <WalkingDog />
      <WavingPerson />

      <group position={[0, 0.045, 0.05]}>
        <Laptop openRef={openRef} />
      </group>

      <ContactShadows
        position={[0, 0.042, 0.05]}
        opacity={0.38}
        scale={11}
        blur={2.4}
        far={4}
        color="#3d3428"
      />

      <ScrollRig openRef={openRef} progressRef={progressRef} />
    </>
  );
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export default function LaptopIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const openRef = useRef(0);
  const progressRef = useRef(0);
  const progressMv = useMotionValue(0);
  const [keepCanvas, setKeepCanvas] = useState(true);
  const [heroLive, setHeroLive] = useState(false);

  // Manual progress: useScroll(target) was stuck near 0 in this layout
  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // 0 when section top hits viewport top; 1 when section bottom hits viewport top
      const p = clamp01(-rect.top / el.offsetHeight);
      progressRef.current = p;
      progressMv.set(p);
      setKeepCanvas(p < 0.72);
      setHeroLive(p >= 0.58);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progressMv]);

  // Black cover → Hero fully in while still sticky, then hold before release
  const canvasOpacity = useTransform(progressMv, [0.46, 0.54], [1, 0]);
  const heroOpacity = useTransform(progressMv, [0.54, 0.62], [0, 1]);
  const cueOpacity = useTransform(progressMv, [0, 0.06, 0.28], [1, 0.65, 0]);

  return (
    <section
      ref={sectionRef}
      id="laptop-intro"
      className="relative z-30 h-[360vh]"
      aria-label="Laptop open animation"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#0c0c0e]">
        {keepCanvas && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 bg-[#e4dfd5]"
            style={{ opacity: canvasOpacity }}
          >
            <Canvas
              dpr={[1, 1.6]}
              shadows
              camera={{ position: [0, 2.55, 5.6], fov: 42, near: 0.05, far: 50 }}
              gl={{
                antialias: true,
                alpha: false,
                powerPreference: "high-performance",
              }}
              style={{ width: "100%", height: "100%" }}
              onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.05;
              }}
            >
              <Suspense fallback={null}>
                <Scene openRef={openRef} progressRef={progressRef} />
              </Suspense>
            </Canvas>
          </motion.div>
        )}

        <motion.div
          className="absolute inset-0 z-20 overflow-hidden bg-[#0c0c0e]"
          style={{
            opacity: heroOpacity,
            pointerEvents: heroLive ? "auto" : "none",
          }}
        >
          <Hero preview />
        </motion.div>

        <motion.p
          className="pointer-events-none absolute bottom-10 left-1/2 z-30 -translate-x-1/2 font-heading text-[11px] uppercase tracking-[0.22em] text-emerald-800/90"
          style={{ opacity: cueOpacity }}
        >
          Scroll to open
        </motion.p>
      </div>
    </section>
  );
}
