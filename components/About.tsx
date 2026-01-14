"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            About <span className="text-primary-500">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInLeft}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-primary-500/50 shadow-lg shadow-primary-500/20">
              <Image
                src="/personal pic.png"
                alt="David Joshua Estrera"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <motion.div
              className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary-500/30 rounded-lg -z-10"
              animate={{
                x: [0, 10, 0],
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInRight}
            className="space-y-6 text-gray-300"
          >
            <p className="text-lg sm:text-xl leading-relaxed">
              I'm a Computer Science student at De La Salle University, pursuing a Bachelor of Science (Honors) 
              with a Minor in Data Science and a Master of Science in Computer Science.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed">
              My passion lies at the intersection of AI, data engineering, and full-stack development. 
              I specialize in building intelligent systems that transform complex data into actionable insights, 
              creating solutions that make a real impact.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed">
              Currently working as a Research Associate at DLSU's Center for Human-Computer Innovations 
              and TE3D House, I've contributed to projects involving computer vision, machine learning, 
              and data pipeline development.
            </p>
            <div className="pt-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-200 shadow-lg shadow-primary-500/50"
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
