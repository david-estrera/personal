"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-line"
    >
      <motion.div
        className="max-w-content mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-14 md:mb-16 max-w-2xl">
          <p className="font-heading text-sm uppercase tracking-[0.18em] text-primary-500 mb-3">
            About
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Building at the intersection of AI, data, and delivery
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[minmax(0,20rem)_1fr] gap-10 md:gap-16 items-start">
          <motion.div variants={fadeInUp} className="relative w-full max-w-sm mx-auto md:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-line bg-surface-muted">
              <Image
                src="/personal pic.png"
                alt="David Joshua Estrera"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-5 text-ink-muted text-base sm:text-lg leading-relaxed">
            <p>
              I&apos;m a Computer Science student at De La Salle University,
              pursuing a Bachelor of Science (Honors) with a Minor in Data
              Science and a Master of Science in Computer Science.
            </p>
            <p>
              My work spans AI systems, data engineering, full-stack products,
              and DevOps — most recently as a Shared Tech DevOps Engineer Intern
              at ING, enabling GitHub provisioning and supporting Azure DevOps
              to GitHub migrations.
            </p>
            <p>
              I&apos;ve also contributed as a Research Associate at DLSU&apos;s
              TE3D House and Center for Human-Computer Innovations, and shipped
              data and AI work at P&amp;G and WTW.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors cursor-pointer"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
