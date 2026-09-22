"use client";

import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function Projects() {
  return (
    <section
      id="projects"
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
            Projects
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-4">
            Selected work
          </h2>
          <p className="text-ink-muted text-lg">
            Products across AI, commerce, and education — from idea to live deploy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line rounded-md overflow-hidden">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeInUp}
              className="group bg-surface-raised p-6 sm:p-8 flex flex-col min-h-[14rem] hover:bg-surface-muted transition-colors duration-200"
            >
              <h3 className="font-heading text-xl font-semibold text-ink group-hover:text-primary-500 transition-colors mb-2">
                {project.title}
              </h3>
              <p className="text-ink-muted text-sm leading-relaxed flex-1 mb-5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-ink-faint border border-line px-2.5 py-1 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-5 pt-4 border-t border-line">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors cursor-pointer"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  Live
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
                >
                  <Github size={16} aria-hidden="true" />
                  Code
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
