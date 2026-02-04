"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [hasVisited, setHasVisited] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;

    // Check if session storage has 'visited'
    const visited = sessionStorage.getItem("portfolio-visited");
    if (visited) {
      setHasVisited(true);
      setIsLoading(false);
      return;
    }

    // Faster progress for better UX
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Faster increment
      });
    }, 10); 

    // Text sequence logic (Stark Industries themed)
    const textTimers = [
      setTimeout(() => setLoadingText("SYSTEM CHECK..."), 300),
      setTimeout(() => setLoadingText("LOADING ASSETS..."), 600),
      setTimeout(() => setLoadingText("ARC REACTOR ONLINE"), 1000),
      setTimeout(() => setLoadingText("WELCOME"), 1300),
    ];

    // Final exit
    const exitTimer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("portfolio-visited", "true");
    }, 1800);

    return () => {
      clearInterval(interval);
      textTimers.forEach((t) => clearTimeout(t));
      clearTimeout(exitTimer);
    };
  }, [mounted]);

  const handleSkip = () => {
    setIsLoading(false);
    sessionStorage.setItem("portfolio-visited", "true");
  };

  if (!mounted || hasVisited) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-stark-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 grid-background opacity-20 animate-grid" />
          
          {/* Arc Reactor Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-arc-reactor/10 rounded-full blur-[150px] animate-pulse-slow" />

          {/* Particles (Stark Industries themed) */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-arc-reactor/40 rounded-full"
                initial={{ 
                  x: Math.random() * 100 + "vw", 
                  y: Math.random() * 100 + "vh",
                  opacity: 0 
                }}
                animate={{ 
                  y: [null, Math.random() * -100 - 50 + "vh"],
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: Math.random() * 2 + 1, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Center content */}
          <div className="relative flex flex-col items-center">
            {/* Arc Reactor Container */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Spinning Red Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-40 h-40 rounded-full border border-dashed border-stark-red/30" 
              />
              
              {/* Spinning Gold Ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 rounded-full border border-dashed border-stark-gold/40" 
              />

              {/* Main Arc Reactor */}
              <div className="w-24 h-24 rounded-full border-2 border-arc-reactor/40 arc-glow flex items-center justify-center bg-arc-reactor/5 backdrop-blur-sm animate-pulse-slow">
                 {/* Inner Core */}
                 <div className="w-12 h-12 rounded-full bg-white shadow-[0_0_40px_#fff,0_0_80px_#0ff] blur-[2px] animate-pulse" />
              </div>
            </div>

            {/* Percentage & Status Text */}
            <div className="mt-16 text-center flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                 <motion.span className="text-5xl font-mono font-bold text-white tracking-widest">
                   {progress}%
                 </motion.span>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingText}
                  className="text-[12px] font-bold uppercase tracking-[0.6em] text-arc-reactor min-h-[1.5em]"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  {loadingText}
                </motion.p>
              </AnimatePresence>

              {/* Skip Button */}
              <motion.button
                onClick={handleSkip}
                className="mt-8 px-8 py-3 stark-border rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-white hover:border-arc-reactor/50 transition-all pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                SKIP INTRO
              </motion.button>
            </div>

            {/* Technical HUD Decor */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-arc-reactor to-transparent" />
            <motion.div 
               className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-arc-reactor/20 to-transparent"
               animate={{ opacity: [0.2, 0.5, 0.2] }}
               transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          {/* Stark Industries Corner Elements */}
          <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-stark-gold/20" />
          <div className="absolute top-10 right-10 w-24 h-24 border-t border-r border-stark-gold/20" />
          <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l border-stark-gold/20" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-stark-gold/20" />

          {/* Scan Lines Effect */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
