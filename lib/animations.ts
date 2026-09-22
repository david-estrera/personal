import { Variants } from "motion/react";

/**
 * Keep opacity at 1 so content stays readable if JS fails to load.
 * Motion only eases a small vertical offset.
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 1,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -40px 0px",
} as const;
