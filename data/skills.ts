export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Automation",
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
    skills: ["Python", "Java", "JavaScript", "C", "C#", "x86-64 Assembly"],
  },
  {
    title: "Data Technologies",
    skills: ["Databricks", "Supabase", "Firebase", "MongoDB"],
  },
  {
    title: "Frameworks & Tools",
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
    skills: [
      "GitHub Provisioning",
      "Azure DevOps",
      "CI/CD Migrations",
      "Cloud Computing",
      "Data Pipelines",
    ],
  },
];
