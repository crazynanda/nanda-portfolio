"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { AnimatedSection, SlideIn, TextReveal } from "@/components/animation/AnimatedSection";
import { Code2, Palette, Wrench, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryIcons = {
  Frontend: Code2,
  "Design & Animation": Palette,
  Tools: Wrench,
  Learning: BookOpen,
};

const categoryColors: Record<string, string> = {
  Frontend: "from-cyan-500 to-blue-500",
  "Design & Animation": "from-purple-500 to-pink-500",
  Tools: "from-green-500 to-emerald-500",
  Learning: "from-orange-500 to-yellow-500",
};

// Animated skill bar component
function SkillBar({ 
  name, 
  level, 
  description, 
  index,
  color 
}: { 
  name: string; 
  level: number; 
  description: string;
  index: number;
  color: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{name}</span>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            className="text-xs text-muted-foreground bg-foreground/5 px-2 py-0.5 rounded-full"
          >
            {description}
          </motion.span>
        </div>
        <span className="text-sm font-bold text-gradient">{level}%</span>
      </div>
      
      {/* Progress bar background */}
      <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ 
            delay: 0.2 + index * 0.05, 
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }}
          className={cn(
            "h-full rounded-full bg-gradient-to-r relative overflow-hidden",
            color
          )}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Category card component
function CategoryCard({ 
  title, 
  skills: categorySkills, 
  index 
}: { 
  title: string; 
  skills: typeof skills.frontend;
  index: number;
}) {
  const Icon = categoryIcons[title as keyof typeof categoryIcons];
  const color = categoryColors[title] || "from-cyan-500 to-purple-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="glass rounded-2xl p-6 perspective-1000"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center",
            color
          )}
        >
          {Icon && <Icon className="w-6 h-6 text-white" />}
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{categorySkills.length} skills</p>
        </div>
      </div>

      {/* Skills list */}
      <div className="space-y-4">
        {categorySkills.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            description={skill.description}
            index={skillIndex}
            color={color}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const categories = [
    { title: "Frontend", skills: skills.frontend },
    { title: "Design & Animation", skills: skills.animationAndDesign },
    { title: "Tools", skills: skills.tools },
    { title: "Learning", skills: skills.learning },
  ];

  return (
    <AnimatedSection id="skills" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SlideIn direction="up" className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-green-500 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Arsenal
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <TextReveal text="Skills & Technologies" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </SlideIn>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>

        {/* Bottom stats */}
        <SlideIn direction="up" delay={0.4} className="mt-16">
          <div className="glass rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Technologies", value: "15+" },
                { label: "Frameworks", value: "8+" },
                { label: "Projects Built", value: "4+" },
                { label: "Cups of Coffee", value: "∞" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </SlideIn>
      </div>
    </AnimatedSection>
  );
}
