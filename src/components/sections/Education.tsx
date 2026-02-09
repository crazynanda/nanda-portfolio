"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, SlideIn, TextReveal } from "@/components/animation/AnimatedSection";
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const educationData = [
  {
    id: 1,
    degree: "BCA - AI & Machine Learning",
    field: "Computer Science",
    institution: "Swamy Vivekananda Rural First Grade College",
    location: "Bangalore, India",
    year: "2025 - Present",
    description: "Pursuing advanced studies in Artificial Intelligence and Machine Learning. Focused on neural networks, automation systems, and full-stack integration.",
    tags: ["AI/ML", "Web Development", "System Design"],
    achievements: [
      "Learning neural network architectures",
      "Building automation systems",
      "Full-stack project development"
    ]
  }
];

// 3D Flip Card Component
function EducationCard({ 
  edu, 
  index 
}: { 
  edu: typeof educationData[0];
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative h-[400px] perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full preserve-3d cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full glass rounded-2xl p-8 flex flex-col">
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-green-500/25"
            >
              <GraduationCap className="w-8 h-8 text-white" />
            </motion.div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-foreground mb-2">{edu.degree}</h3>
            <p className="text-lg text-green-500 font-medium mb-4">{edu.field}</p>
            
            <div className="space-y-2 mb-6">
              <p className="text-foreground font-medium">{edu.institution}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {edu.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {edu.year}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground flex-grow">{edu.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {edu.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Flip hint */}
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Click to see achievements
            </p>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="h-full glass rounded-2xl p-8 flex flex-col bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold text-foreground">Achievements</h3>
            </div>

            <div className="flex-grow">
              <ul className="space-y-4">
                {edu.achievements.map((achievement, i) => (
                  <motion.li
                    key={achievement}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -20 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <BookOpen className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              Click to flip back
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <AnimatedSection id="education" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-l from-green-500/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SlideIn direction="up" className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-emerald-500 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Foundation
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <TextReveal text="Education" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic background and learning journey
          </p>
        </SlideIn>

        {/* Education Cards */}
        <div className="max-w-2xl mx-auto">
          {educationData.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>

        {/* Additional info */}
        <SlideIn direction="up" delay={0.4} className="mt-12 text-center">
          <p className="text-muted-foreground">
            Continuously learning and exploring new technologies through online courses, 
            documentation, and hands-on projects.
          </p>
        </SlideIn>
      </div>
    </AnimatedSection>
  );
}
