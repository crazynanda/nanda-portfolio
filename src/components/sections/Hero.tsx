"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Giant Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[15vw] font-black text-white/5 opacity-10 mix-blend-overlay select-none tracking-tighter whitespace-nowrap blur-sm">
          NANDA KUMAR
        </h1>
      </div>

      {/* THE ARC REACTOR */}
      <div className="relative flex items-center justify-center z-10">
         {/* Outer Rotating Ring */}
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute w-80 h-80 rounded-full border border-dashed border-arc-cyan/20" 
         />
         {/* Main Glowing Ring */}
         <div className="w-64 h-64 rounded-full border-2 border-arc-cyan/30 shadow-[0_0_50px_rgba(0,240,255,0.2)] flex items-center justify-center bg-arc-cyan/5 backdrop-blur-sm">
            {/* Inner Ring */}
            <div className="w-48 h-48 rounded-full border border-arc-cyan/10 flex items-center justify-center">
               {/* The Core */}
               <div className="w-12 h-12 rounded-full bg-white shadow-[0_0_30px_#fff,0_0_60px_#0ff] blur-[2px] animate-pulse" />
            </div>
         </div>
      </div>

      {/* Floating Text */}
      <div className="mt-12 text-center z-10">
        <p className="font-mono text-arc-cyan tracking-[0.5em] text-xs uppercase mb-4 animate-pulse">
          Core System V7 // Online
        </p>
        <h2 className="text-4xl font-bold text-white uppercase tracking-widest text-glow-cyan">
          Initialize Interface
        </h2>
        <div className="mt-8 animate-bounce opacity-50">
           <div className="w-px h-12 bg-gradient-to-b from-arc-cyan to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
}
