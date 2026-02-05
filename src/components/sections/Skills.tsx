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
import TerminalCard from "../ui/TerminalCard";

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
  "React": "bg-arc-reactor/10 text-arc-reactor",
  "Next": "bg-white/10 text-white",
  "TS": "bg-blue-500/10 text-blue-400",
  "Tailwind": "bg-teal-500/10 text-teal-400",
  "Framer": "bg-purple-500/10 text-purple-400",
  "Figma": "bg-pink-500/10 text-pink-400",
  "Git": "bg-stark-red/10 text-stark-red",
  "VSCode": "bg-blue-500/10 text-blue-400",
  "AI": "bg-arc-cyan/10 text-arc-cyan",
  "Node": "bg-green-500/10 text-green-400",
  "Python": "bg-yellow-500/10 text-yellow-400",
  "DB": "bg-indigo-500/10 text-indigo-400"
};

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const Icon = iconMap[skill.icon] || Code2;
  const colorClass = colorMap[skill.icon] || "bg-gray-500/10 text-gray-400";

  return (
    <div className="p-4 bg-stark-dark border border-arc-reactor/10 rounded-xl hover:border-arc-reactor/30 transition-all group">
      <div className="flex items-start gap-4">
        <div className={cn("p-2 rounded-lg flex-shrink-0", colorClass)}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-semibold text-sm truncate font-mono">{skill.name}</h4>
            <span className="text-arc-reactor font-bold text-xs font-mono">{skill.level}%</span>
          </div>
          <p className="text-xs text-gray-500 mb-2 line-clamp-2 font-mono">{skill.description}</p>
          <div className="h-1 w-full bg-stark-dark rounded-full overflow-hidden border border-arc-reactor/20">
            <motion.div
              className="h-full bg-gradient-to-r from-arc-reactor to-arc-cyan"
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
    <section id="skills" className="relative py-24 lg:py-32 bg-stark-black">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-arc-reactor/5 rounded-full blur-[150px]" />
      </div>

       <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-arc-reactor tracking-[0.2em] text-sm uppercase mb-4 block">
            // 03 SYSTEM_SKILLS
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 font-mono">
            TECH_STACK.TXT
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-arc-reactor to-transparent" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Featured Card */}
          <div className="lg:col-span-12 mb-8">
            <TerminalCard title="SYSTEM_FEATURE" icon={<Sparkles className="w-4 h-4" />} delay={0.1}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-arc-reactor/20 rounded-xl">
                  <Sparkles className="w-6 h-6 text-arc-reactor" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 font-mono">VIBE_CODING.EXE</h3>
                  <p className="text-gray-400 leading-relaxed font-mono">
                    COLLABORATING WITH AI TO BUILD FASTER AND SMARTER. IT'S NOT JUST ABOUT TYPING CODE ANYMORE;
                    IT'S ABOUT ENGINEERING THE RIGHT VIBES AND PROMPTS FOR EFFICIENT DEVELOPMENT.
                  </p>
                </div>
              </div>
            </TerminalCard>
          </div>

          {/* Skills by Category */}
          {categories.map((category, catIndex) => (
            <div key={category.title} className="lg:col-span-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-mono">
                <span className="text-arc-reactor font-mono text-sm">//</span>
                {category.title.toUpperCase()}_MODULES
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
