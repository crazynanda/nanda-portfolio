"use client";

import StarkCard from '@/components/ui/StarkCard';
import { Github, Linkedin, MessageSquare, Rocket, Terminal } from 'lucide-react';

export default function BentoGrid() {
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-stark-bg">
      <div className="container-custom relative z-10 px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-arc-cyan tracking-[0.2em] text-sm uppercase mb-4 block">
            // 01 ABOUT
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
            Who I Am
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-arc-cyan to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px]">

          {/* IDENTITY - BIG BOX */}
          <StarkCard title="Identity" subtitle="WHO I AM" className="md:col-span-2 md:row-span-2">
            <div className="flex flex-col justify-between h-full py-4">
              <p className="text-xl text-gray-300 font-medium">
                Full Stack Engineer & Founder. Obsessed with the intersection of design engineering and high-performance systems.
              </p>
              <div className="flex gap-2">
                {['Visionary', 'Builder', 'Architect'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-arc-cyan/30 bg-arc-cyan/5 text-[10px] text-arc-cyan uppercase tracking-widest font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </StarkCard>

          {/* STARTUP - WIDE BOX */}
          <StarkCard title="Zeridex" subtitle="FOUNDER @ 19" className="md:col-span-2">
            <div className="flex flex-col justify-between h-full py-2">
              <p className="text-gray-400">AI-Powered Automation Systems designed to scale enterprises autonomously.</p>
              <a href="https://www.zeridex.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-arc-cyan font-bold text-xs uppercase tracking-widest hover:translate-x-2 transition-transform w-fit">
                <Rocket size={14}/> Visit HQ
              </a>
            </div>
          </StarkCard>

          {/* STATS - SMALL BOX */}
          <StarkCard title="15+" subtitle="DEPLOYMENTS" className="flex flex-col items-center justify-center text-center">
             <Terminal className="text-arc-cyan mb-2" size={32} />
             <p className="text-xs text-gray-500 font-mono">STABLE RELEASES</p>
          </StarkCard>

          {/* STATUS - SMALL BOX */}
          <StarkCard title="Available" subtitle="FREELANCE" className="flex flex-col justify-center">
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 p-3 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="font-mono text-xs text-green-400">CORE SYSTEMS ONLINE</span>
            </div>
          </StarkCard>

          {/* TECH - TALL BOX */}
          <StarkCard id="skills" title="Arsenal" subtitle="STACK" className="md:row-span-1">
             <div className="grid grid-cols-2 gap-2 mt-2">
                {['Next.js', 'React', 'TS', 'Tailwind'].map(i => (
                  <div key={i} className="text-[10px] font-mono p-2 border border-white/5 bg-white/5 rounded text-gray-400">
                    {i}
                  </div>
                ))}
             </div>
          </StarkCard>

          {/* CONNECT - WIDE BOX */}
          <StarkCard title="Uplink" subtitle="CONNECT" className="md:col-span-3">
            <div className="flex items-center justify-between h-full pt-4">
              <div className="flex gap-6">
                <Github className="hover:text-arc-cyan cursor-pointer transition-colors" />
                <Linkedin className="hover:text-arc-cyan cursor-pointer transition-colors" />
                <MessageSquare className="hover:text-arc-cyan cursor-pointer transition-colors" />
              </div>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-tighter">
                Encryption: AES-256 Enabled // Link Active
              </div>
            </div>
          </StarkCard>

        </div>
      </div>
    </section>
  );
}
