"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Zap } from "lucide-react";

export default function EasterEggs() {
  const [showJarvis, setShowJarvis] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);
  
  const konamiCode = [
    "ArrowUp", "ArrowUp", 
    "ArrowDown", "ArrowDown", 
    "ArrowLeft", "ArrowRight", 
    "ArrowLeft", "ArrowRight", 
    "b", "a"
  ];

  useEffect(() => {
    // 1. Console Message
    console.log(
      "%c" + 
      " ███╗   ██╗██╗  ██╗\n" +
      " ████╗  ██║██║ ██╔╝\n" +
      " ██╔██╗ ██║█████╔╝ \n" +
      " ██║╚██╗██║██╔═██╗ \n" +
      " ██║ ╚████║██║  ██╗\n" +
      " ╚═╝  ╚═══╝╚═╝  ╚═╝",
      "color: #06b6d4; font-weight: bold; font-size: 1.2rem;"
    );
    console.log(
      "%cHey developer! Looking at my code? Let's connect and build something amazing together.",
      "color: #a855f7; font-size: 1rem;"
    );
    console.log("Contact: nandablr242@gmail.com");
    console.log("GitHub: https://github.com/crazynanda");

    // 2. Konami Code Listener
    const handleKeyDown = (e: KeyboardEvent) => {
      const newProgress = [...konamiProgress, e.key].slice(-10);
      setKonamiProgress(newProgress);

      if (JSON.stringify(newProgress) === JSON.stringify(konamiCode)) {
        triggerJarvis();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiProgress]);

  const triggerJarvis = () => {
    setShowJarvis(true);
    // Play a subtle sound if we had one, but for now just visual
    setTimeout(() => setShowJarvis(false), 5000);
  };

  return (
    <AnimatePresence>
      {showJarvis && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-3xl pointer-events-none"
        >
          <div className="relative text-center p-12 max-w-2xl">
            {/* Holographic Circle */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
               <motion.div 
                 className="w-[500px] h-[500px] rounded-full border border-cyan-500/50"
                 animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               />
               <motion.div 
                 className="absolute w-[400px] h-[400px] rounded-full border border-purple-500/30"
                 animate={{ rotate: -360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               />
            </div>

            <div className="relative z-10">
               <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center mx-auto mb-8 shadow-glow-cyan/50">
                  <Zap className="w-12 h-12 text-cyan-400" />
               </div>
               
               <h3 className="text-4xl font-black font-space text-white uppercase tracking-tighter mb-6 leading-tight">
                  <span className="text-cyan-400">Quantum Protocol</span> Overridden
               </h3>
               
               <p className="text-xl font-mono text-gray-300 tracking-widest leading-relaxed mb-8">
                  &quot;Everything is doable. If you cannot do it, it is not doable. I am Iron Man.&quot;
               </p>

               <div className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-500/50">
                  <Terminal className="w-4 h-4" />
                  STARK_INDUSTRIES // ENCRYPTED_CHANNEL
               </div>
            </div>

            {/* Scanlines Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
