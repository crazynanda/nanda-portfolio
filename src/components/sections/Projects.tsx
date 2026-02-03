"use client";

import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { projects, Project } from "@/data/projects";
import ProjectDetailModal from "@/components/ui/ProjectDetailModal";

const StarkProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col h-full bg-white/[0.02] border border-white/10 rounded-[24px] overflow-hidden hover:border-arc-cyan/50 hover:bg-white/[0.05] transition-all duration-500 cursor-pointer"
    >
      {/* Image/Preview - Using gradient fallback for now */}
      <div
        className="h-48 md:h-56 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color || "#333"}20, ${project.color || "#000"}40)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Tech HUD Scanline */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <h3 className="text-2xl md:text-3xl font-black text-white/10 uppercase tracking-tighter group-hover:text-arc-cyan/20 transition-colors">
            {project.title.substring(0, 3)}
          </h3>
        </div>

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {project.featured && (
            <span className="px-2 py-1 rounded bg-arc-cyan text-black text-[10px] font-bold uppercase tracking-widest">
              Featured
            </span>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-arc-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-arc-cyan font-bold uppercase tracking-widest text-sm">View Details</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-arc-cyan">
            // {project.category}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-arc-cyan shadow-[0_0_10px_#00F0FF]" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-arc-cyan transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="px-2 py-1 text-[10px] font-mono text-gray-500 border border-white/5 rounded bg-white/[0.02]">
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-1 text-[10px] font-mono text-arc-cyan border border-arc-cyan/30 rounded bg-arc-cyan/10">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-arc-cyan transition-colors">
                <ExternalLink size={14} /> LIVE SYSTEM
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                <Github size={14} /> SOURCE
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section id="projects" className="relative py-24 lg:py-32 bg-stark-bg">
        <div className="container-custom relative z-10 px-6 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <span className="font-mono text-arc-cyan tracking-[0.2em] text-sm uppercase mb-4 block">
              // 02 PORTFOLIO
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
              Selected<br />Works
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-arc-cyan to-transparent" />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <StarkProjectCard key={project.id} project={project} onClick={() => handleProjectClick(project)} />
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
