"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { projects } from "@/data/projects"; // Assuming this exists or pass as prop
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function HorizontalProjects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[300vh] bg-[#030712]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Section Header (Fixed position or moving with scroll?) 
            Shopify keeps the header fixed then fades out. 
            For simplicity, let's have it as the first item in the horizontal list.
        */}
        
        <motion.div style={{ x }} className="flex gap-16 px-16 will-change-transform">
          
          {/* Title Card */}
          <div className="flex-shrink-0 w-[400px] h-[70vh] flex flex-col justify-center">
             <span className="text-cyan-500 font-mono uppercase text-sm tracking-widest mb-4 block">
                04 — Selected Works
            </span>
            <h2 className="text-8xl font-serif text-white mb-8 italic">Selected<br/>Works</h2>
            <p className="text-gray-400 max-w-sm text-lg">
              A collection of projects pushing the boundaries of web design and development.
            </p>
            <div className="mt-8 text-cyan-400 font-mono text-sm"> SCROLL TO EXPLORE &rarr;</div>
          </div>

          {/* Project Cards */}
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative flex-shrink-0 w-[80vw] md:w-[60vw] h-[70vh] rounded-3xl overflow-hidden bg-white/5 border border-white/10"
            >
              {/* Dynamic Gradient Background instead of Image */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-700`} />
              
              {/* Glass Overlay */}
              <div className="absolute inset-0 backdrop-blur-3xl" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-cyan-400 font-mono text-xs uppercase tracking-wider">{project.category}</span>
                      {project.status && (
                        <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500 text-[10px] border border-yellow-500/30">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-space font-bold text-white mb-3 tracking-tight">{project.title}</h3>
                    <p className="text-gray-300 max-w-lg text-lg line-clamp-3 mb-6 font-light">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                                {t}
                            </span>
                        ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    {project.githubUrl && (
                        <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white border border-white/10 group-hover:scale-110"
                        >
                        <Github size={24} />
                        </a>
                    )}
                    {project.liveUrl && (
                        <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        className="p-4 bg-cyan-500 rounded-full hover:bg-cyan-400 transition-colors text-black shadow-glow-cyan group-hover:scale-110"
                        >
                        <ExternalLink size={24} />
                        </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Number Overlay */}
              <div className="absolute top-8 right-12 text-9xl font-serif text-white/5 font-italic pointer-events-none select-none">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}

          {/* End Card */}
          <div className="flex-shrink-0 w-[400px] h-[70vh] flex items-center justify-center">
             <div className="text-center">
                <h3 className="text-3xl font-space text-white mb-4">You have reached the end.</h3>
                <p className="text-gray-400 mb-8">Want to see more?</p>
                <a href="https://github.com" className="inline-block border border-white/20 px-8 py-4 rounded-full text-white hover:bg-white/10 transition-colors">
                    Visit GitHub Profile
                </a>
             </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
