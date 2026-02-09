"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { AnimatedSection, SlideIn, TextReveal } from "@/components/animation/AnimatedSection";
import MagneticButton from "@/components/ui/MagneticButton";
import { ExternalLink, Github, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// 3D Card Component with tilt effect
function ProjectCard3D({ 
  project, 
  index,
  featured = false 
}: { 
  project: Project; 
  index: number;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative group rounded-2xl overflow-hidden transition-all duration-300",
        featured ? "h-[500px] min-w-[400px]" : "h-[400px]"
      )}
    >
      {/* Background Gradient */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity duration-500",
          project.gradient
        )} 
      />
      
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 h-full p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-2">
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 ml-2 px-3 py-1 rounded-full bg-yellow-500/80 text-white text-xs font-bold">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>
          {project.status && (
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs">
              {project.status}
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-white/80 text-sm mb-4">{project.tagline}</p>

        {/* Description - only on featured or hover */}
        <motion.p 
          className="text-white/70 text-sm mb-4 flex-grow"
          animate={{ opacity: isHovered || featured ? 1 : 0.7 }}
        >
          {project.description}
        </motion.p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.slice(0, featured ? 6 : 4).map((tech) => (
            <span 
              key={tech}
              className="px-2 py-1 rounded-md bg-white/10 text-white/90 text-xs backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > (featured ? 6 : 4) && (
            <span className="px-2 py-1 rounded-md bg-white/10 text-white/90 text-xs">
              +{project.tech.length - (featured ? 6 : 4)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          {project.liveUrl && (
            <MagneticButton
              href={project.liveUrl}
              variant="primary"
              size="sm"
              className="bg-white text-gray-900 hover:bg-white/90"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </MagneticButton>
          )}
          {project.githubUrl && (
            <MagneticButton
              href={project.githubUrl}
              variant="outline"
              size="sm"
              className="border-white/50 text-white hover:bg-white/20"
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </MagneticButton>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 + rotateX * 2}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
        }}
      />

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/30 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}

// Horizontal Scroll Section for Featured Projects
function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div ref={containerRef} className="relative py-12 overflow-hidden">
      <motion.div 
        style={{ x }}
        className="flex gap-6 px-4"
      >
        {featuredProjects.map((project, index) => (
          <ProjectCard3D 
            key={project.id} 
            project={project} 
            index={index}
            featured={true}
          />
        ))}
        {/* Duplicate for infinite scroll effect */}
        {featuredProjects.map((project, index) => (
          <ProjectCard3D 
            key={`${project.id}-dup`} 
            project={project} 
            index={index + featuredProjects.length}
            featured={true}
          />
        ))}
      </motion.div>
    </div>
  );
}

// All Projects Grid
function AllProjectsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <ProjectCard3D 
          key={project.id} 
          project={project} 
          index={index}
          featured={false}
        />
      ))}
    </div>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  return (
    <AnimatedSection id="projects" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SlideIn direction="up" className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-purple-500 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <TextReveal text="Featured Work" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects I&apos;ve built, from startups to AI applications
          </p>
        </SlideIn>

        {/* Featured Projects - Horizontal Scroll */}
        {!showAll && (
          <>
            <SlideIn direction="up" delay={0.2}>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                Highlighted Projects
              </h3>
            </SlideIn>
            <FeaturedProjects />
          </>
        )}

        {/* Toggle View */}
        <SlideIn direction="up" delay={0.3} className="text-center my-12">
          <MagneticButton
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            size="lg"
          >
            {showAll ? (
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Show Featured
              </>
            ) : (
              <>
                View All Projects
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </MagneticButton>
        </SlideIn>

        {/* All Projects Grid */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AllProjectsGrid />
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
}
