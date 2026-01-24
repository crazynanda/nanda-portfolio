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
import BlurReveal from "../animations/BlurReveal";

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

      <div className="container-custom max-w-[1800px] relative z-10 px-6 mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
             {/* Sticky Header - Left Column */}
            <div className="lg:col-span-4 relative">
                <div className="sticky top-32">
                    <BlurReveal>
                         <p className="text-cyan-500 font-mono uppercase text-sm tracking-widest mb-4 block">
                            03 — Technologies
                        </p>
                    </BlurReveal>
                    <BlurReveal delay={0.1}>
                        <h2 className="text-6xl md:text-7xl font-serif font-medium text-white mb-6 uppercase tracking-tight italic">
                            My<br/>Tech Stack
                        </h2>
                    </BlurReveal>
                    <BlurReveal delay={0.2}>
                         <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                            The tools I use to build universe-denting software.
                        </p>
                    </BlurReveal>
                </div>
            </div>

            {/* Content - Right Column */}
            <div className="lg:col-span-8 flex flex-col pt-12 lg:pt-0">
                 {/* Featured Card */}
                <BlurReveal delay={0.1} className="mb-12 p-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-3xl">
                    <div className="flex items-start gap-6">
                        <div className="p-4 bg-cyan-500/20 rounded-2xl flex-shrink-0">
                        <Sparkles className="w-8 h-8 text-cyan-400" />
                        </div>
                        <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Vibe Coding</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            I collaborate with AI to build faster and smarter. It's not just about typing code anymore; 
                            it's about engineering the right vibes and prompts for efficient development.
                        </p>
                        </div>
                    </div>
                </BlurReveal>

                {/* Skills by Category */}
                <div className="space-y-16">
                    {categories.map((category, catIndex) => (
                    <BlurReveal delay={0.2 + (catIndex * 0.1)} key={category.title}>
                        <h3 className="text-2xl font-serif font-medium text-white mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
                            <span className="text-cyan-400 font-mono text-sm">//</span>
                            {category.title}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            {category.skills.map((skill, index) => (
                                <SkillCard key={skill.name} skill={skill} index={index} />
                            ))}
                        </div>
                    </BlurReveal>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
