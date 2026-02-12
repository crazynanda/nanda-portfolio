"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group block border-t border-border py-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Project Number */}
          <span className="text-mono text-muted w-8">
            {String(index + 1).padStart(2, "0")}
          </span>
          
          {/* Project Info */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-muted mt-1">{project.category}</p>
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <ArrowUpRight className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mt-4 ml-14">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-mono text-xs px-3 py-1 bg-secondary rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

// Horizontal Scrolling Featured Section
function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="py-32 overflow-hidden">
      {/* Section Title */}
      <div className="container-wide mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-mono text-muted mb-4"
        >
          Featured Projects [{projects.filter(p => p.featured).length}]
        </motion.p>
      </div>

      {/* Horizontal Scroll Container */}
      <motion.div 
        style={{ x }}
        className="flex gap-8 pl-4 sm:pl-6 lg:pl-8 xl:pl-12"
      >
        {/* Featured Title Card */}
        <div className="flex-shrink-0 w-[80vw] md:w-[60vw] flex items-center">
          <h2 className="text-display text-foreground">
            Featured<br />Projects
          </h2>
        </div>

        {/* Project Cards */}
        {projects.filter(p => p.featured).map((project, index) => (
          <motion.a
            key={project.id}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-[70vw] md:w-[40vw] group"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Project Image */}
            <div className="aspect-[4/3] bg-secondary rounded-2xl mb-6 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-mono text-muted">{project.title}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Project Info */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted mt-1">{project.tagline}</p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-muted group-hover:text-accent transition-colors" />
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Progress Indicator */}
      <div className="container-wide mt-12">
        <div className="h-px bg-border relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent"
            style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-background">
      {/* Featured Work - Horizontal Scroll */}
      <FeaturedWork />

      {/* All Projects List */}
      <div className="section-padding border-t border-border">
        <div className="container-wide">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-mono text-muted mb-12"
          >
            All Projects [{projects.length}]
          </motion.p>

          <div className="divide-y divide-border">
            {projects.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
