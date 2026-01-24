export interface Skill {
  name: string;
  level: number;
  description: string;
  icon: string;
}

export interface SkillCategories {
  frontend: Skill[];
  animationAndDesign: Skill[];
  tools: Skill[];
  learning: Skill[];
}

export const skills: SkillCategories = {
  frontend: [
    { name: "HTML/CSS", level: 85, description: "The foundation of everything", icon: "HTML" },
    { name: "JavaScript", level: 75, description: "Making things interactive", icon: "JS" },
    { name: "React.js", level: 70, description: "Building modern UIs", icon: "React" },
    { name: "Next.js", level: 70, description: "Full-stack React framework", icon: "Next" },
    { name: "TypeScript", level: 65, description: "Type-safe development", icon: "TS" },
    { name: "Tailwind CSS", level: 80, description: "Rapid styling", icon: "Tailwind" },
  ],
  animationAndDesign: [
    { name: "Framer Motion", level: 60, description: "Smooth animations", icon: "Framer" },
    { name: "Figma", level: 50, description: "UI/UX Design", icon: "Figma" },
  ],
  tools: [
    { name: "Git/GitHub", level: 70, description: "Version control", icon: "Git" },
    { name: "VS Code / Antigravity", level: 85, description: "Code editor / AI assistant", icon: "VSCode" },
    { name: "AI Tools", level: 80, description: "Vibe coding with LLMs", icon: "AI" },
  ],
  learning: [
    { name: "Node.js", level: 40, description: "Currently exploring", icon: "Node" },
    { name: "Python", level: 35, description: "AI/ML basics", icon: "Python" },
    { name: "Databases", level: 40, description: "PostgreSQL, MongoDB", icon: "DB" },
  ],
};
