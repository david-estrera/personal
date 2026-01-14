"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Database,
  Code,
  Cloud,
  BarChart3,
  Cpu,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

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
    color: "text-purple-400",
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
    color: "text-blue-400",
  },
  {
    title: "Programming Languages",
    icon: Code,
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "C",
      "C#",
      "x86-64 Assembly",
    ],
    color: "text-green-400",
  },
  {
    title: "Data Technologies",
    icon: Database,
    skills: [
      "Databricks",
      "Supabase",
      "Firebase",
      "MongoDB",
    ],
    color: "text-yellow-400",
  },
  {
    title: "Frameworks & Tools",
    icon: Cpu,
    skills: [
      "React",
      "Node.js",
      "Express",
      "Git",
      "RESTful APIs",
      "Figma",
      "Linux",
      "VS Code",
    ],
    color: "text-primary-400",
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      "Cloud Computing",
      "Big Data Processing",
      "Data Pipelines",
    ],
    color: "text-cyan-400",
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      id="skills"
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
            Technical <span className="text-primary-500">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, intelligent solutions
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-primary-600/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 bg-gray-800 rounded-lg ${category.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-gray-400 text-sm flex items-center gap-2"
                    >
                      <span className="text-primary-600">▹</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
