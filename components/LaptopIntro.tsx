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
import { useIsMobileUi } from "@/lib/simple-mode";

/**
 * 0–0.35 open · 0.32–0.48 zoom to black screen ·
 * 0.54–0.62 Hero fades in · held pinned until sticky ends.
 */
function ScrollRig({
  openRef,
  progressRef,
  mobile,
}: {
  openRef: React.MutableRefObject<number>;
  progressRef: React.MutableRefObject<number>;
  mobile: boolean;
}) {
  const { camera } = useThree();
  const start = mobile
    ? { pos: [0, 2.9, 7.2] as const, look: [0, 0.05, 0.15] as const, fov: 48 }
    : { pos: [0, 2.55, 5.6] as const, look: [0, -0.05, 0.2] as const, fov: 42 };

  const pos = useRef(new THREE.Vector3(...start.pos));
  const look = useRef(new THREE.Vector3(...start.look));
  const posTarget = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());

  useFrame((_, dt) => {
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const open = THREE.MathUtils.smoothstep(p, 0.0, 0.35);
    openRef.current = open;

    const zoom = THREE.MathUtils.smoothstep(p, 0.32, 0.48);
    const openE = open * open * (3 - 2 * open);
    const zoomE = zoom * zoom * (3 - 2 * zoom);

    // Mobile stays a bit further out so the framed laptop still reads in portrait
    const midY = mobile ? 2.05 : 1.85;
    const midZ = mobile ? 4.2 : 3.5;
    const endY = mobile ? 1.35 : 1.22;
    const endZ = mobile ? 1.75 : 1.35;
    const endLookY = mobile ? 1.0 : 1.08;
    const endFov = mobile ? 28 : 24;

    posTarget.current.set(
      0,
      THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(start.pos[1], midY, openE),
        endY,
        zoomE
      ),
      THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(start.pos[2], midZ, openE),
        endZ,
        zoomE
      )
    );
    lookTarget.current.set(
      0,
      THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(start.look[1], 0.7, openE),
        endLookY,
        zoomE
      ),
      THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(start.look[2], -0.2, openE),
        -0.55,
        zoomE
      )
    );

    const k = Math.min(1, dt * 5.5);
    pos.current.lerp(posTarget.current, k);
    look.current.lerp(lookTarget.current, k);
    camera.position.copy(pos.current);
    camera.lookAt(look.current);

    if ("fov" in camera) {
      const cam = camera as THREE.PerspectiveCamera;
      cam.fov = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(start.fov, mobile ? 40 : 34, openE),
        endFov,
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
  mobile,
}: {
  openRef: React.MutableRefObject<number>;
  progressRef: React.MutableRefObject<number>;
  mobile: boolean;
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
        castShadow={!mobile}
        shadow-mapSize={mobile ? [512, 512] : [1024, 1024]}
      />
      <directionalLight position={[4, 5, 3]} intensity={0.4} color="#eef2f7" />

      <OfficeEnvironment />
      <WalkingDog />
      <WavingPerson />

      <group position={[0, 0.045, 0.05]}>
        <Laptop openRef={openRef} />
      </group>

      {!mobile && (
        <ContactShadows
          position={[0, 0.042, 0.05]}
          opacity={0.38}
          scale={11}
          blur={2.4}
          far={4}
          color="#3d3428"
        />
      )}

      <ScrollRig openRef={openRef} progressRef={progressRef} mobile={mobile} />
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
  const mobile = useIsMobileUi();

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
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

  const canvasOpacity = useTransform(progressMv, [0.46, 0.54], [1, 0]);
  const heroOpacity = useTransform(progressMv, [0.54, 0.62], [0, 1]);
  const cueOpacity = useTransform(progressMv, [0, 0.06, 0.28], [1, 0.65, 0]);

  return (
    <section
      ref={sectionRef}
      id="laptop-intro"
      className={`relative z-30 ${mobile ? "h-[260vh]" : "h-[360vh]"}`}
      aria-label="Laptop open animation"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#0c0c0e]">
        {keepCanvas && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 bg-[#e4dfd5]"
            style={{ opacity: canvasOpacity }}
          >
            <Canvas
              dpr={mobile ? [1, 1.25] : [1, 1.6]}
              shadows={!mobile}
              camera={{
                position: mobile ? [0, 2.9, 7.2] : [0, 2.55, 5.6],
                fov: mobile ? 48 : 42,
                near: 0.05,
                far: 50,
              }}
              gl={{
                antialias: !mobile,
                alpha: false,
                powerPreference: mobile ? "low-power" : "high-performance",
              }}
              style={{ width: "100%", height: "100%" }}
              onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.05;
              }}
            >
              <Suspense fallback={null}>
                <Scene
                  openRef={openRef}
                  progressRef={progressRef}
                  mobile={mobile}
                />
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
          className="pointer-events-none absolute bottom-[max(2.5rem,calc(env(safe-area-inset-bottom)+1.5rem))] left-1/2 z-30 -translate-x-1/2 px-4 text-center font-heading text-[11px] uppercase tracking-[0.22em] text-emerald-800/90"
          style={{ opacity: cueOpacity }}
        >
          {mobile ? "Swipe up to open" : "Scroll to open"}
        </motion.p>
      </div>
    </section>
  );
}
