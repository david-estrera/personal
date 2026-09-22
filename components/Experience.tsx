"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

const experiences = [
  {
    title: "Shared Tech DevOps Engineer Intern",
    company: "ING",
    period: "May 2026 – Sept 2026",
    description: [
      "Enabled GitHub provisioning to streamline developer onboarding and repository access across shared tech teams",
      "Supported Azure DevOps to GitHub migration initiatives, helping move pipelines, repos, and workflows onto the new platform",
      "Collaborated with Shared Tech on operational DevOps tasks that improved consistency and delivery readiness",
    ],
  },
  {
    title: "SMO IT AI Data Engineer Intern",
    company: "Procter & Gamble (P&G)",
    period: "May 2025 – Oct 2025",
    description: [
      "Developed end-to-end data pipelines using Databricks, integrating diverse data sources to feed directly into Power BI for real-time visualization and analytics",
      "Built interactive Power BI dashboards to visualize key metrics for cross-functional decision-making",
      "Collaborated on AI/ML and LLM models that optimized business processes and surfaced actionable insights",
      "Leveraged cloud and big data tooling to process large datasets within the SMO IT function",
    ],
  },
  {
    title: "RTS Technology Developer Intern",
    company: "Willis Towers Watson (WTW)",
    period: "June 2024 – Dec 2024",
    description: [
      "Developed a progress tracking system that increased employee engagement by 50% through clearer reporting metrics",
      "Integrated Power BI for real-time visualization with dynamic dashboards",
      "Automated offboarding reminders with Power Automate to improve compliance and notification speed",
    ],
  },
  {
    title: "Research Associate",
    company: "TE3D House, DLSU",
    period: "Sept 2023 – Dec 2025",
    description: [
      "Designed and implemented end-to-end data pipelines using Databricks into Power BI for analytics",
      "Developed interactive Power BI dashboards for cross-functional stakeholders",
      "Collaborated on AI/ML and LLM models that optimized research and operational workflows",
    ],
  },
  {
    title: "Research Associate",
    company: "Center for Human-Computer Innovations (CeHCI), DLSU",
    period: "Aug 2024 – Nov 2024",
    description: [
      "Developed a computer vision application for the visually impaired using OpenCV and machine learning",
      "Presented the work at an international conference, leading to a published paper on its development and impact",
    ],
  },
  {
    title: "Student Assistant and Resource Person",
    company: "Information Technology Services, DLSU",
    period: "Sept 2023 – June 2024",
    description: [
      "Managed and updated student records using a Microsoft Visual FoxPro application",
      "Provided administrative support including organizing materials and scheduling",
    ],
  },
  {
    title: "Freelance Developer",
    company: "Self-Employed",
    period: "Sept 2022 – May 2024",
    description: [
      "Designed and implemented software solutions across client projects using varied languages and frameworks",
      "Improved performance and stability through systematic debugging and issue resolution",
      "Partnered with clients on planning so solutions aligned with business objectives",
    ],
  },
];

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
                <h3 className="font-heading text-xl font-semibold text-ink">
                  {exp.title}
                </h3>
                <p className="text-primary-500 font-medium mt-1 mb-4">
                  {exp.company}
                </p>
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
