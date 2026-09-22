"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="h-full origin-left bg-primary-600"
        style={{ scaleX }}
      />
    </div>
  );
}
