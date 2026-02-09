"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { AnimatedSection, SlideIn, TextReveal } from "@/components/animation/AnimatedSection";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// Timeline item component
function TimelineItem({ 
  experience, 
  index,
  isLast 
}: { 
  experience: typeof experiences[0];
  index: number;
  isLast: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className={cn(
        "relative flex items-start gap-8",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Timeline line */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          className="absolute left-6 top-12 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-purple-500 origin-top hidden md:block"
          style={{ 
            left: isEven ? "24px" : "auto",
            right: isEven ? "auto" : "24px"
          }}
        />
      )}

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/25"
      >
        <Briefcase className="w-6 h-6 text-white" />
      </motion.div>

      {/* Content card */}
      <motion.div
        whileHover={{ y: -5 }}
        className={cn(
          "flex-1 glass rounded-2xl p-6",
          isEven ? "md:text-left" : "md:text-right"
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex flex-col gap-2 mb-4",
          isEven ? "md:items-start" : "md:items-end"
        )}>
          <h3 className="text-xl font-bold text-foreground">{experience.title}</h3>
          <p className="text-lg text-cyan-500 font-medium">{experience.company}</p>
          
          {/* Meta info */}
          <div className={cn(
            "flex flex-wrap items-center gap-4 text-sm text-muted-foreground",
            isEven ? "md:justify-start" : "md:justify-end"
          )}>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {experience.startDate} — {experience.endDate || "Present"}
            </span>
            {experience.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {experience.description}
        </p>

        {/* Technologies */}
        <div className={cn(
          "flex flex-wrap gap-2",
          isEven ? "md:justify-start" : "md:justify-end"
        )}>
          {experience.technologies.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 rounded-full bg-foreground/5 text-foreground/70 text-sm"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <AnimatedSection id="experience" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-1/4 h-1/2 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SlideIn direction="up" className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-blue-500 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Journey
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <TextReveal text="Work Experience" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and career highlights
          </p>
        </SlideIn>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              experience={exp}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
