"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Figma, 
  GitBranch, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Zap,
  Globe,
  Database,
  Search,
  Layout,
  Smartphone
} from "lucide-react";
import { skills, Skill } from "@/data/skills";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  "HTML": Layout,
  "JS": Terminal,
  "React": Layers,
  "Next": Globe,
  "TS": Code2,
  "Tailwind": Smartphone,
  "Framer": Zap,
  "Figma": Figma,
  "Git": GitBranch,
  "VSCode": Code2,
  "AI": Sparkles,
  "Node": Cpu,
  "Python": Search,
  "DB": Database
};

const colorMap: Record<string, string> = {
  "HTML": "bg-orange-500/10 text-orange-400",
  "JS": "bg-yellow-500/10 text-yellow-400",
  "React": "bg-cyan-500/10 text-cyan-400",
  "Next": "bg-white/10 text-white",
  "TS": "bg-blue-500/10 text-blue-400",
  "Tailwind": "bg-teal-500/10 text-teal-400",
  "Framer": "bg-purple-500/10 text-purple-400",
  "Figma": "bg-pink-500/10 text-pink-400",
  "Git": "bg-red-500/10 text-red-400",
  "VSCode": "bg-blue-500/10 text-blue-400",
  "AI": "bg-cyan-500/10 text-cyan-400",
  "Node": "bg-green-500/10 text-green-400",
  "Python": "bg-yellow-500/10 text-yellow-400",
  "DB": "bg-indigo-500/10 text-indigo-400"
};

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const Icon = iconMap[skill.icon] || Code2;
  const colorClass = colorMap[skill.icon] || "bg-gray-500/10 text-gray-400";

  return (
    <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-xl flex-shrink-0", colorClass)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-semibold truncate">{skill.name}</h4>
            <span className="text-cyan-400 font-bold text-sm">{skill.level}%</span>
          </div>
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{skill.description}</p>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  const categories = [
    { title: "Frontend", skills: skills.frontend },
    { title: "Design & Animation", skills: skills.animationAndDesign },
    { title: "Tools", skills: skills.tools },
    { title: "Learning", skills: skills.learning },
  ];

  return (
    <section id="skills" className="relative py-24 lg:py-32 bg-[#030712]">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-custom relative z-10 px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-cyan-500 tracking-[0.2em] text-sm uppercase mb-4 block">
            // 03 TECHNOLOGIES
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
            Tech Stack
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-transparent" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Featured Card */}
          <div className="lg:col-span-12 mb-8">
            <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-xl">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Vibe Coding</h3>
                  <p className="text-gray-400 leading-relaxed">
                    I collaborate with AI to build faster and smarter. It's not just about typing code anymore;
                    it's about engineering the right vibes and prompts for efficient development.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills by Category */}
          {categories.map((category, catIndex) => (
            <div key={category.title} className="lg:col-span-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-cyan-400 font-mono text-sm">//</span>
                {category.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
