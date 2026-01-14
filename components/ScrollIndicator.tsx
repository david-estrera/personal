"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50">
      {/* Always visible base line */}
      <div className="absolute inset-0 bg-primary-500/30" />
      {/* Progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-full bg-primary-500 origin-left shadow-md shadow-primary-500/40"
        style={{ scaleX, width: '100%' }}
      >
        <div className="absolute inset-0 bg-primary-500 blur-sm opacity-60" />
      </motion.div>
    </div>
  );
}
