"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight, Bot, Zap, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import ParticleBackground from "@/components/ui/ParticleBackground";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] py-20">
      {/* Background / Tech Aesthetics */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground particleCount={40} />
        <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          {/* 404 Visual HUD */}
          <div className="relative inline-block mb-12">
            <motion.h1 
              className="text-[12rem] font-black font-space tracking-tighter leading-none opacity-5"
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              404
            </motion.h1>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-32 h-32 rounded-3xl glass border border-red-500/30 flex items-center justify-center relative rotate-12">
                  <Bot className="w-16 h-16 text-red-500 animate-pulse" />
                  {/* Corner Markings */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-red-500/50" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-red-500/50" />
               </div>
            </div>
          </div>

          <h2 className="text-4xl font-black font-space tracking-tight text-white mb-6 uppercase">
             Quantum Realm Access <span className="text-red-500">Denied</span>
          </h2>
          
          <p className="text-gray-400 text-lg font-inter font-light leading-relaxed mb-12">
             The coordinates you provided lead into the Quantum Realm. This sequence has been terminated to preserve your timeline.
          </p>

          <Link href="/">
            <Button
              variant="primary"
              size="lg"
              className="px-10 h-16 text-xs font-black uppercase tracking-[0.2em] rounded-2xl glow-cyan group"
            >
              <Home className="w-4 h-4 mr-3" />
              Return to Base
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          {/* System Warning Decoration */}
          <div className="mt-16 flex items-center justify-center gap-6 opacity-30">
             <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-black">Error_Ref</span>
                <span className="text-xs font-mono text-gray-500">PAGE_NOT_FOUND</span>
             </div>
             <div className="h-8 w-px bg-white/10" />
             <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest font-black">Status</span>
                <span className="text-xs font-mono text-gray-500">SAFE_EXIT_READY</span>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative HUD Markers */}
      <div className="absolute bottom-10 left-10 text-[8px] font-mono text-white/5 uppercase tracking-[0.4em]">
         SYSTEM_FAILSAFE_ACTIVE // v1.0.404
      </div>
      <div className="absolute top-10 right-10 text-[8px] font-mono text-white/5 uppercase tracking-[0.4em]">
         LOC: VOID_DIMENSION_00
      </div>
    </div>
  );
}
