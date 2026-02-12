"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { AnimatedSection, SlideIn, TextReveal } from "@/components/animation/AnimatedSection";
import { Film, Glasses, Rocket, Hash } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Film,
  Glasses,
  Rocket,
  Hash,
};

const stats = [
  { label: "Projects", value: "4+", suffix: "" },
  { label: "Years Learning", value: "1+", suffix: "" },
  { label: "Startups", value: "1", suffix: "" },
  { label: "Curiosity", value: "∞", suffix: "" },
];

// Counter animation component
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="text-4xl md:text-5xl font-bold text-gradient"
    >
      {value}{suffix}
    </motion.span>
  );
}

export default function About() {
  return (
    <AnimatedSection id="about" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SlideIn direction="up" className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-cyan-500 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <TextReveal>The Story So Far</TextReveal>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </SlideIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Bio Section */}
          <SlideIn direction="left" delay={0.1}>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Who I Am</h3>
              <div className="space-y-4">
                {personalInfo.bio.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-muted-foreground leading-relaxed text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </SlideIn>

          {/* Stats Section */}
          <SlideIn direction="right" delay={0.2}>
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-8">System Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-background/50"
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>

        {/* Fun Facts Grid */}
        <div className="mt-16">
          <SlideIn direction="up" className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-foreground">Quick Facts</h3>
          </SlideIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalInfo.funFacts.map((fact, index) => {
              const IconComponent = iconMap[fact.icon];
              return (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    y: -10, 
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="group glass rounded-xl p-6 text-center perspective-1000"
                >
                  <motion.div
                    className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
                  </motion.div>
                  <h4 className="font-semibold text-foreground mb-2">{fact.title}</h4>
                  <p className="text-sm text-muted-foreground">{fact.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
