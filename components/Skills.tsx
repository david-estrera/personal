"use client";

import { motion } from "motion/react";
import {
  Brain,
  Database,
  Code,
  Cloud,
  BarChart3,
  Cpu,
} from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

const skillCategories = [
  {
    title: "AI & Automation",
    icon: Brain,
    skills: [
      "Machine Learning",
      "Data Science",
      "Power Automate",
      "n8n",
      "Zapier",
      "AI Model Integration",
      "Predictive Analytics",
    ],
  },
  {
    title: "Data Analysis & Visualization",
    icon: BarChart3,
    skills: [
      "Power BI",
      "SQL",
      "DAX",
      "Power Query",
      "Data Modeling",
      "Microsoft Excel",
    ],
  },
  {
    title: "Programming Languages",
    icon: Code,
    skills: ["Python", "Java", "JavaScript", "C", "C#", "x86-64 Assembly"],
  },
  {
    title: "Data Technologies",
    icon: Database,
    skills: ["Databricks", "Supabase", "Firebase", "MongoDB"],
  },
  {
    title: "Frameworks & Tools",
    icon: Cpu,
    skills: [
      "React",
      "Node.js",
      "Express",
      "Git",
      "GitHub",
      "RESTful APIs",
      "Figma",
      "Linux",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      "GitHub Provisioning",
      "Azure DevOps",
      "CI/CD Migrations",
      "Cloud Computing",
      "Data Pipelines",
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
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
            Skills
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-4">
            Technical toolkit
          </h2>
          <p className="text-ink-muted text-lg">
            From models and pipelines to platforms and delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={fadeInUp}
                className="border-t border-line pt-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon
                    size={20}
                    className="text-primary-500 shrink-0"
                    aria-hidden="true"
                  />
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-ink-muted text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
