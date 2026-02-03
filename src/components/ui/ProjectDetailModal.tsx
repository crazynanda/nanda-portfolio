"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Calendar, MapPin } from "lucide-react";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-[#0a0f1a] border border-white/10 rounded-2xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="relative h-48 md:h-64 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${project.color || "#333"}40, ${project.color || "#000"}60)`,
                }}
              >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0f1a] to-transparent">
                <span className="font-mono text-arc-cyan text-xs uppercase tracking-[0.2em]">
                  // {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="max-w-3xl mx-auto">
                {/* Tagline */}
                <p className="text-xl text-arc-cyan font-semibold mb-6">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-arc-cyan rounded-full" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status */}
                {project.status && (
                  <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <span className="text-yellow-400 font-semibold">
                      Status: {project.status}
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all",
                        "bg-arc-cyan text-black hover:bg-cyan-400"
                      )}
                    >
                      <ExternalLink size={16} />
                      View Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all",
                        "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                      )}
                    >
                      <Github size={16} />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Decoration */}
            <div className="h-1 bg-gradient-to-r from-transparent via-arc-cyan to-transparent opacity-50" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
