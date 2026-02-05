"use client";

import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { projects, Project } from "@/data/projects";
import ProjectDetailModal from "@/components/ui/ProjectDetailModal";
import TerminalCard from "../ui/TerminalCard";

const TerminalProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <TerminalCard title={project.title.toUpperCase()} icon={<ExternalLink className="w-4 h-4" />}>
      <div onClick={onClick} className="group cursor-pointer">
        {/* Project Status */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] text-arc-reactor">
            // {project.category.toUpperCase()}
          </span>
          {project.featured && (
            <span className="px-2 py-1 rounded bg-arc-reactor text-black text-[10px] font-bold uppercase tracking-widest">
              FEATURED
            </span>
          )}
        </div>

        {/* Project Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-mono">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="px-2 py-1 text-[10px] font-mono text-gray-500 border border-arc-reactor/20 rounded bg-stark-dark">
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-1 text-[10px] font-mono text-arc-reactor border border-arc-reactor/30 rounded bg-arc-reactor/10">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-arc-reactor/10">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-arc-reactor transition-colors font-mono">
              <ExternalLink size={14} /> LIVE_SYSTEM
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors font-mono">
              <Github size={14} /> SOURCE_CODE
            </a>
          )}
        </div>
      </div>
    </TerminalCard>
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
      <section id="projects" className="relative py-24 lg:py-32 bg-stark-black">
         <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="mb-16">
            <span className="font-mono text-arc-reactor tracking-[0.2em] text-sm uppercase mb-4 block">
              // 02 PROJECT_PORTFOLIO
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 font-mono">
              SELECTED_WORKS
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-arc-reactor to-transparent" />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <TerminalProjectCard key={project.id} project={project} onClick={() => handleProjectClick(project)} />
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
