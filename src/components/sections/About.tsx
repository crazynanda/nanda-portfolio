"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { Film, Glasses, Rocket, Hash } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Film,
  Glasses,
  Rocket,
  Hash,
};

export default function About() {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-wide">
        {/* About Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-2 mb-8">
              <h2 className="text-headline text-foreground">Hi, I&apos;m</h2>
              <h2 className="text-headline text-accent">{personalInfo.name.split(" ")[0]}</h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-muted leading-relaxed max-w-xl">
                {personalInfo.bio[0]}
              </p>
              <p className="text-mono text-accent">
                Code / Design / Build / Repeat
              </p>
            </div>
          </motion.div>

          {/* Right - Portrait Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] bg-secondary rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-mono text-muted">Portrait</span>
            </div>
            {/* Decorative border */}
            <div className="absolute inset-4 border border-border rounded-xl" />
          </motion.div>
        </div>

        {/* Extended Bio */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-32"
        >
          <p className="text-xl md:text-2xl text-foreground leading-relaxed">
            {personalInfo.bio[1]}
          </p>
        </motion.div>

        {/* Fun Facts */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-mono text-muted text-center mb-12"
          >
            Quick Facts
          </motion.p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {personalInfo.funFacts.map((fact, index) => {
              const IconComponent = iconMap[fact.icon];
              return (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="text-center group"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                      {IconComponent && (
                        <IconComponent className="w-7 h-7 text-foreground" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-foreground font-semibold mb-1">{fact.title}</h3>
                  <p className="text-sm text-muted">{fact.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
