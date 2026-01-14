"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FloatingObject {
  id: number;
  shape: "circle" | "triangle" | "square";
  size: number;
  x: number;
  y: number;
  speed: number;
}

const objects: FloatingObject[] = [
  { id: 1, shape: "circle", size: 80, x: 10, y: 20, speed: 0.3 },
  { id: 2, shape: "triangle", size: 60, x: 85, y: 15, speed: 0.4 },
  { id: 3, shape: "square", size: 70, x: 20, y: 70, speed: 0.25 },
  { id: 4, shape: "circle", size: 50, x: 75, y: 60, speed: 0.35 },
  { id: 5, shape: "triangle", size: 90, x: 50, y: 40, speed: 0.3 },
  { id: 6, shape: "square", size: 55, x: 90, y: 80, speed: 0.4 },
];

export default function FloatingObjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const renderShape = (shape: string, size: number) => {
    const baseClasses = "border-2 border-primary-600/30";
    
    switch (shape) {
      case "circle":
        return (
          <div
            className={`${baseClasses} rounded-full bg-primary-700/10`}
            style={{ width: size, height: size }}
          />
        );
      case "triangle":
        return (
          <div
            className={baseClasses}
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid rgba(21, 128, 61, 0.1)`,
              borderTop: "none",
            }}
          />
        );
      case "square":
        return (
          <div
            className={`${baseClasses} bg-primary-700/10`}
            style={{ width: size, height: size }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {objects.map((obj, index) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [obj.y, obj.y - obj.speed * 50]
        );
        const x = useTransform(
          scrollYProgress,
          [0, 1],
          [obj.x, obj.x + obj.speed * 20]
        );
        const opacity = useTransform(
          scrollYProgress,
          [0, 0.3, 0.7, 1],
          [0.3, 0.6, 0.6, 0.3]
        );
        const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

        return (
          <motion.div
            key={obj.id}
            className="absolute"
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              y,
              x,
              opacity,
              rotate,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
            }}
            transition={{
              duration: 5 + index * 0.5,
              repeat: Infinity,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {renderShape(obj.shape, obj.size)}
          </motion.div>
        );
      })}
    </div>
  );
}
