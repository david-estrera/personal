"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 80,
  className = "",
}: TypewriterTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState(text);
  const [isComplete, setIsComplete] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setStarted(true);
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    setDisplayedText("");
    setIsComplete(false);
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, prefersReducedMotion]);

  return (
    <span className={`inline-block ${className}`}>
      {started ? displayedText : text}
      {started && !prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          animate={isComplete ? { opacity: [1, 0] } : { opacity: 1 }}
          transition={
            isComplete
              ? { duration: 0.8, repeat: Infinity, repeatType: "reverse" }
              : undefined
          }
          className="inline-block w-[3px] ml-1 align-baseline bg-primary-500"
          style={{ height: "0.85em" }}
        />
      )}
    </span>
  );
}
