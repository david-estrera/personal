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
    description:
      "AI-powered application for intelligent content processing and analysis",
    liveUrl: "https://sharpcutsai.vercel.app/",
    githubUrl: "https://github.com/david-estrera/SharpCuts.git",
    tags: ["AI", "Next.js", "TypeScript"],
  },
  {
    title: "Perfume Recommender AI",
    description:
      "AI-driven perfume recommendation system using machine learning",
    liveUrl: "https://perfumerecommenderai.netlify.app/",
    githubUrl: "https://github.com/david-estrera/perfume-recommender",
    tags: ["AI", "Machine Learning", "React"],
  },
  {
    title: "Japan Shohin",
    description:
      "Japanese collectibles storefront with QRPh checkout and tracked delivery in the Philippines",
    liveUrl: "https://japan-shohin.vercel.app/",
    githubUrl: "https://github.com/david-estrera/generic-store.git",
    tags: ["E-commerce", "Next.js", "QRPh"],
  },
  {
    title: "USAP TAU",
    description: "Educational platform and application system",
    liveUrl: "https://usaptau.netlify.app/",
    githubUrl: "https://github.com/david-estrera/usap-tau.git",
    tags: ["Education", "React", "Web App"],
  },
];
