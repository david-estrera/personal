"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { companyLogos, experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
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
            Experience
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-4">
            Where I&apos;ve worked
          </h2>
          <p className="text-ink-muted text-lg">
            Industry internships, research, and freelance delivery.
          </p>
        </motion.div>

        <motion.ul
          variants={fadeInUp}
          className="mb-14 md:mb-16 flex flex-wrap items-center gap-8 sm:gap-12"
          aria-label="Companies"
        >
          {companyLogos.map((c) => (
            <li key={c.name}>
              <Image
                src={c.logoSrc}
                alt={c.name}
                width={120}
                height={48}
                className="h-10 w-auto max-w-[7.5rem] object-contain sm:h-12 sm:max-w-[9rem]"
              />
            </li>
          ))}
        </motion.ul>

        <div className="space-y-0">
          {experiences.map((exp) => (
            <motion.article
              key={`${exp.company}-${exp.title}-${exp.period}`}
              variants={fadeInUp}
              className="grid md:grid-cols-[11rem_1fr] gap-3 md:gap-10 py-8 border-t border-line first:border-t-0 md:first:border-t md:border-t"
            >
              <p className="text-sm text-ink-faint font-medium pt-1">
                {exp.period}
              </p>
              <div>
                <div className="flex items-start gap-3 mb-1">
                  <Image
                    src={exp.logoSrc}
                    alt=""
                    width={36}
                    height={36}
                    className="mt-0.5 h-9 w-9 shrink-0 object-contain"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <h3 className="font-heading text-xl font-semibold text-ink">
                      {exp.title}
                    </h3>
                    <p className="text-primary-500 font-medium mt-1 mb-4">
                      {exp.company}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {exp.description.map((item) => (
                    <li
                      key={item}
                      className="text-ink-muted text-sm leading-relaxed pl-4 border-l border-line"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
