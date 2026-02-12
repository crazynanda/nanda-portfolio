"use client";

import { motion } from "framer-motion";
import { skills, Skill } from "@/data/skills";
import { Code2, Palette, Wrench, BookOpen } from "lucide-react";

const categoryIcons = {
  Frontend: Code2,
  "Design & Animation": Palette,
  Tools: Wrench,
  Learning: BookOpen,
};

const serviceData = [
  {
    id: 1,
    title: "Frontend Development",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: Code2,
  },
  {
    id: 2,
    title: "Backend & APIs",
    skills: ["Convex", "PostgreSQL", "REST APIs", "Authentication"],
    icon: Wrench,
  },
  {
    id: 3,
    title: "UI/UX Design",
    skills: ["Figma", "Framer Motion", "GSAP", "Responsive Design"],
    icon: Palette,
  },
  {
    id: 4,
    title: "AI & Automation",
    skills: ["OpenAI API", "AI Integration", "Automation Systems"],
    icon: BookOpen,
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-background">
      {/* Services Header */}
      <div className="section-padding border-t border-border">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-mono text-muted mb-6">Your Vision. My Expertise.</p>
            <h2 className="text-headline text-foreground mb-8">
              Full-stack Development<br />& Design Solutions
            </h2>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Sticky Service Cards */}
      <div className="relative">
        {serviceData.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="sticky top-24 section-padding bg-background border-t border-border"
              style={{ zIndex: index + 1 }}
            >
              <div className="container-wide">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div className="order-2 lg:order-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
                        <Icon className="w-8 h-8 text-foreground" />
                      </div>
                      <span className="text-mono text-muted">
                        {String(index + 1).padStart(2, "0")} / {String(serviceData.length).padStart(2, "0")}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                      {service.title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {service.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-mono text-sm px-4 py-2 bg-secondary rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="order-1 lg:order-2">
                    <div className="aspect-[4/3] bg-secondary rounded-2xl flex items-center justify-center">
                      <span className="text-mono text-muted">{service.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="section-padding border-t border-border bg-secondary">
        <div className="container-wide">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-mono text-muted mb-12 text-center"
          >
            Complete Arsenal
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    {Icon && <Icon className="w-5 h-5 text-accent" />}
                    <h3 className="text-mono text-foreground">{category}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {skillList.map((skill: Skill, index: number) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-foreground font-medium">{skill.name}</span>
                          <span className="text-mono text-muted text-sm">{skill.level}%</span>
                        </div>
                        <div className="h-1 bg-background rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.05 }}
                            className="h-full bg-accent rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
