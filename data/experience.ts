export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
  /** Path under /public */
  logoSrc: string;
}

export const experiences: ExperienceItem[] = [
  {
    title: "Shared Tech DevOps Engineer Intern",
    company: "ING",
    period: "May 2026 – Sept 2026",
    logoSrc: "/logos/ing-logo.png",
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
    logoSrc: "/logos/pg-logo.webp",
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
    logoSrc: "/logos/wtw-logo.png",
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
    logoSrc: "/logos/dlsu-logo.webp",
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
    logoSrc: "/logos/dlsu-logo.webp",
    description: [
      "Developed a computer vision application for the visually impaired using OpenCV and machine learning",
      "Presented the work at an international conference, leading to a published paper on its development and impact",
    ],
  },
  {
    title: "Student Assistant and Resource Person",
    company: "Information Technology Services, DLSU",
    period: "Sept 2023 – June 2024",
    logoSrc: "/logos/dlsu-logo.webp",
    description: [
      "Managed and updated student records using a Microsoft Visual FoxPro application",
      "Provided administrative support including organizing materials and scheduling",
    ],
  },
  {
    title: "Freelance Developer",
    company: "Self-Employed",
    period: "Sept 2022 – May 2024",
    logoSrc: "/logos/freelance.svg",
    description: [
      "Designed and implemented software solutions across client projects using varied languages and frameworks",
      "Improved performance and stability through systematic debugging and issue resolution",
      "Partnered with clients on planning so solutions aligned with business objectives",
    ],
  },
];

/** Unique companies for the logo strip. */
export const companyLogos = [
  { name: "ING", logoSrc: "/logos/ing-logo.png" },
  { name: "Procter & Gamble", logoSrc: "/logos/pg-logo.webp" },
  { name: "Willis Towers Watson", logoSrc: "/logos/wtw-logo.png" },
  { name: "De La Salle University", logoSrc: "/logos/dlsu-logo.webp" },
];
