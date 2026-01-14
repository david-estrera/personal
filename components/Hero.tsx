"use client";

import { motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { fadeInUp, fadeIn } from "@/lib/animations";
import ParticleSystem from "./ParticleSystem";
import FloatingObjects from "./FloatingObjects";
import TypewriterText from "./TypewriterText";

export default function Hero() {
  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/_Resume.pdf";
    link.download = "David_Joshua_Estrera_Resume.pdf";
    link.click();
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <ParticleSystem />
      <FloatingObjects />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-700/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -25, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="space-y-6 md:space-y-8"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <span className="block text-white">
              <TypewriterText text="Hi I'm David" speed={80} />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            AI & Data Engineer | Full-Stack Developer | Computer Science Researcher
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4"
          >
            Building intelligent solutions and transforming data into actionable insights
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollDown}
              className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg shadow-lg shadow-primary-600/50 hover:bg-primary-700 transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="px-8 py-4 bg-transparent border-2 border-primary-600 text-primary-500 font-semibold rounded-lg hover:bg-primary-600/10 transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
            >
              <Download size={20} />
              Download Resume
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={handleScrollDown}
          className="text-primary-600 hover:text-primary-500 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  );
}
