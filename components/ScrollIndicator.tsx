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
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 bg-primary-500 origin-left z-50 shadow-lg shadow-primary-500/60"
      style={{ scaleX }}
    >
      <div className="absolute inset-0 bg-primary-500 blur-md opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 opacity-80" />
    </motion.div>
  );
}
