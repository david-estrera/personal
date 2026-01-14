"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Astronaut() {
  // Track scroll from the entire page, not just this component
  const { scrollYProgress } = useScroll();

  // Smooth journey path from hero section to contact section
  // Calculate positions that will align with moon at bottom-8 right-8 (32px from edges)
  // At 100vh viewport: bottom-8 = ~97% from top, right-8 = ~98% from left (on 1920px screen)
  const x = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [5, 15, 25, 40, 55, 70, 80, 98] // Final position matches moon (right-8 ≈ 98% from left)
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [85, 75, 60, 45, 35, 25, 20, 97] // Final position matches moon (bottom-8 ≈ 97% from top)
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [45, 30, 15, 0, -5, -10] // Gradually rotate from takeoff angle to landing angle
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1.0, 1.2] // Grow as it approaches moon
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [1, 1, 1, 1] // Always visible throughout the journey
  );

  const xPercent = useTransform(x, (val) => `${val}%`);
  const yPercent = useTransform(y, (val) => `${val}%`);

  // Moon opacity - only visible at the very end (contact section)
  const moonOpacity = useTransform(
    scrollYProgress,
    [0, 0.85, 0.95, 1],
    [0, 0, 0.5, 1] // Fade in near the end
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Moon at the bottom right - appears at contact section */}
      <motion.div
        className="absolute bottom-8 right-8 text-8xl md:text-9xl"
        style={{
          opacity: moonOpacity,
        }}
      >
        🌕
      </motion.div>

      {/* Rocket - smooth journey from start to end */}
      <motion.div
        className="absolute text-6xl md:text-8xl"
        style={{
          left: xPercent,
          top: yPercent,
          rotate,
          scale,
          opacity,
          transform: "translate(-50%, -50%)", // Center the rocket on its position
        }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🚀
      </motion.div>
    </div>
  );
}
