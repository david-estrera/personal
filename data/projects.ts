export interface Project {
  title: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "SharpCuts AI",
    description: "AI-powered application for intelligent content processing and analysis",
    liveUrl: "https://sharpcutsai.vercel.app/",
    githubUrl: "https://github.com/david-estrera/SharpCuts.git",
    tags: ["AI", "Next.js", "TypeScript"],
  },
  {
    title: "Perfume Recommender AI",
    description: "AI-driven perfume recommendation system using machine learning",
    liveUrl: "https://perfumerecommenderai.netlify.app/",
    githubUrl: "https://github.com/david-estrera/perfume-recommender",
    tags: ["AI", "Machine Learning", "React"],
  },
  {
    title: "Generic Store",
    description: "E-commerce platform with modern UI and seamless shopping experience",
    liveUrl: "https://generic-store-dj.vercel.app/",
    githubUrl: "https://github.com/david-estrera/generic-store.git",
    tags: ["E-commerce", "Next.js", "Commerce"],
  },
  {
    title: "USAP TAU",
    description: "Educational platform and application system",
    liveUrl: "https://usaptau.netlify.app/",
    githubUrl: "https://github.com/david-estrera/usap-tau.git",
    tags: ["Education", "React", "Web App"],
  },
];
