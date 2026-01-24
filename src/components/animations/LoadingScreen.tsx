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

    // Text sequence logic
    const textTimers = [
      setTimeout(() => setLoadingText("System Check..."), 300),
      setTimeout(() => setLoadingText("Loading Assets..."), 600),
      setTimeout(() => setLoadingText("System Ready"), 1000),
      setTimeout(() => setLoadingText("Welcome"), 1300),
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
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#030712] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-pattern opacity-10" />
          
          {/* Subtle glow orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

          {/* Particles (Minimalist implementation) */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
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
            {/* Logo/Initials Container */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Spinning Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.1)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="url(#loaderGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="377" // 2 * pi * 60
                  initial={{ strokeDashoffset: 377 }}
                  animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
                  transition={{ duration: 0.1 }}
                />
                <defs>
                  <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Initials Text */}
              <motion.div
                className="relative z-10 text-4xl font-black font-space tracking-tighter text-white"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                NK<span className="text-cyan-400">.</span>
              </motion.div>

              {/* Glowing Background Pulse */}
              <motion.div
                className="absolute inset-4 rounded-full bg-cyan-500/5 blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Percentage & Status Text */}
            <div className="mt-12 text-center flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                 <motion.span className="text-4xl font-mono font-bold text-white tracking-widest">
                   {progress}%
                 </motion.span>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingText}
                  className="text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-400 min-h-[1.5em]"
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
                className="mt-8 px-6 py-2 glass border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Skip Intro
              </motion.button>
            </div>

            {/* Technical HUD Decor */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-cyan-500/50 to-transparent" />
            <motion.div 
               className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
               animate={{ opacity: [0.2, 0.5, 0.2] }}
               transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          {/* Corner Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-white/10" />
          <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-white/10" />
          <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-white/10" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
