"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-stark-black">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 grid-background opacity-30"></div>
      
      {/* Animated Particle System */}
      <div className="absolute inset-0 z-0 animate-grid opacity-10"></div>

      {/* Background Giant Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[15vw] font-black text-white/5 opacity-10 mix-blend-overlay select-none tracking-tighter whitespace-nowrap blur-sm">
          NANDA KUMAR
        </h1>
      </div>

      {/* THE ARC REACTOR */}
      <div className="relative flex items-center justify-center z-10">
         {/* Outer Rotating Ring (Red) */}
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute w-96 h-96 rounded-full border border-dashed border-stark-red/20" 
         />
         
         {/* Middle Rotating Ring (Gold) */}
         <motion.div 
           animate={{ rotate: -360 }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="absolute w-80 h-80 rounded-full border border-dashed border-stark-gold/30" 
         />

         {/* Main Glowing Ring */}
         <div className="w-72 h-72 rounded-full border-2 border-arc-reactor/30 arc-glow flex items-center justify-center bg-arc-reactor/5 backdrop-blur-sm animate-pulse-slow">
            {/* Inner Ring */}
            <div className="w-56 h-56 rounded-full border border-arc-reactor/10 flex items-center justify-center">
               {/* The Core */}
               <div className="w-16 h-16 rounded-full bg-white shadow-[0_0_40px_#fff,0_0_80px_#0ff] blur-[2px] animate-pulse" />
            </div>
         </div>
      </div>

      {/* Floating Text */}
      <div className="mt-16 text-center z-10">
        <p className="font-mono text-arc-reactor tracking-[0.6em] text-xs uppercase mb-6 animate-pulse">
          STARK INDUSTRIES // SYSTEM ONLINE
        </p>
        <h2 className="text-5xl font-bold text-white uppercase tracking-widest text-glow mb-4">
          NANDA KUMAR
        </h2>
        <p className="font-mono text-stark-gold text-lg tracking-[0.3em] uppercase mb-8">
          WEB DESIGNER & DEVELOPER
        </p>
        <div className="animate-bounce opacity-70">
           <div className="w-px h-16 bg-gradient-to-b from-arc-reactor to-transparent mx-auto" />
        </div>
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
    </section>
  );
}
