"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const experiences = [
  {
    title: "SMO IT AI Data Engineer Intern",
    company: "Procter & Gamble (P&G)",
    period: "May 2025 - Oct 2025",
    description: [
      "Developed end-to-end data pipelines using Databricks, integrating diverse data sources to feed directly into Power BI for real-time visualization and analytics",
      "Developed interactive Power BI dashboards to visualize key metrics, enabling data-driven decision-making for cross-functional teams",
      "Collaborated with teams to develop AI/ML & LLM models that optimized business processes and provided actionable insights for strategic decision-making",
      "Leveraged cloud-based technologies and big data tools to process and analyze large datasets, driving efficiency and innovation within the SMO IT function",
    ],
  },
  {
    title: "RTS Technology Developer Intern",
    company: "Willis Towers Watson (WTW)",
    period: "June 2024 - Dec 2024",
    description: [
      "Developed a progress tracking system, increasing employee engagement by 50% by facilitating clear reporting metrics",
      "Integrated Power BI for real-time data visualization, enhancing data-driven decision-making with intuitive, dynamic dashboards",
      "Automated offboarding reminders with Power Automate, ensuring compliance and prompt notifications through process efficiency",
    ],
  },
  {
    title: "Research Associate",
    company: "TE3D House, DLSU",
    period: "Sept 2023 - Dec 2025",
    description: [
      "Designed and implemented end-to-end data pipelines using Databricks, integrating diverse data sources to feed directly into Power BI for real-time visualization and analytics",
      "Developed interactive Power BI dashboards to visualize key metrics, enabling data-driven decision-making for cross-functional teams",
      "Collaborated with teams to develop AI/ML & LLM models that optimized business processes and provided actionable insights for strategic decision-making",
      "Leveraged cloud-based technologies and big data tools to process and analyze large datasets, driving efficiency and innovation within the SMO IT function",
    ],
  },
  {
    title: "Research Associate",
    company: "Center for Human-Computer Innovations (CeHCI), DLSU",
    period: "Aug 2024 - Nov 2024",
    description: [
      "Developed a computer vision application for the visually impaired using OpenCV and Machine Learning, enhancing accessibility and user independence",
      "Presented the accessible computer vision application for the visually impaired at an international conference, leading to a published paper on its development and impact",
    ],
  },
  {
    title: "Student Assistant and Resource Person",
    company: "Information Technology Services, DLSU",
    period: "Sept 2023 - June 2024",
    description: [
      "Managed and updated student records using a Microsoft Visual FoxPro Application, improving data accuracy and accessibility",
      "Executed administrative support tasks, such as organizing materials and scheduling, ensuring smooth class operations",
    ],
  },
  {
    title: "Freelance Developer",
    company: "Self-Employed",
    period: "Sept 2022 - May 2024",
    description: [
      "Designed and implemented software solutions across diverse projects, utilizing different languages and frameworks to meet client needs",
      "Enhanced software performance and stability through systematic debugging and issue resolution",
      "Engaged with clients on project planning, aligning solutions with business objectives",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Work <span className="text-primary-500">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            Building impactful solutions across research, industry, and freelance projects
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 hidden md:block"></div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-8 md:space-y-12"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                variants={fadeInUp}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full -translate-x-1/2 -translate-y-1 z-10 border-4 border-black"></div>

                <div
                  className={`ml-12 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-auto md:pr-8 md:w-1/2" : "md:ml-auto md:pl-8 md:w-1/2"
                  }`}
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-primary-500/50 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="text-primary-500" size={20} />
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <p className="text-primary-400 font-semibold mb-4">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.description.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-gray-400 text-sm flex items-start gap-2"
                        >
                          <span className="text-primary-500 mt-1">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
