"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();
  
  // Spring configuration for smooth movement
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Track active section on scroll
  useEffect(() => {
    const observers = new Map();
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-20% 0px -70% 0px", // Trigger when section is in the middle of viewport
      threshold: 0,
    });

    NAV_LINKS.forEach((link) => {
      const sectionId = link.href.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
        observers.set(sectionId, element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Option 1: Top Bar Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-[1000] shadow-glow-cyan/20"
        style={{ scaleX }}
      />

      {/* Option 2: Side Dots (Section Indicator) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-6">
        {/* Continuous background line */}
        <div className="absolute top-0 bottom-0 w-px bg-white/5 left-1/2 -translate-x-1/2" />
        
        {NAV_LINKS.map((link, index) => {
          const sectionId = link.href.replace("#", "");
          const isActive = activeSection === sectionId;

          return (
            <div key={link.href} className="relative group flex items-center justify-center">
              {/* Active Dot HUD */}
              {isActive && (
                <motion.div
                  layoutId="activeSideDot"
                  className="absolute inset-[-8px] border border-cyan-500/50 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                   <motion.div 
                     className="absolute inset-0 rounded-full bg-cyan-500/10"
                     animate={{ opacity: [0.1, 0.3, 0.1] }}
                     transition={{ duration: 2, repeat: Infinity }}
                   />
                </motion.div>
              )}

              {/* Section Dot */}
              <button
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "relative w-2 h-2 rounded-full transition-all duration-500 z-10",
                  isActive ? "bg-cyan-500 shadow-glow-cyan" : "bg-white/20 group-hover:bg-white/40"
                )}
              />

              {/* Hover Label */}
              <div className="absolute right-full mr-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <div className="glass border border-white/10 px-4 py-2 rounded-xl whitespace-nowrap">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                     <span className="text-cyan-400 mr-2">0{index + 1}</span> {link.label}
                   </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Option 3: Circular Progress (Bottom Left) */}
      <div className="fixed bottom-8 left-8 z-[100] hidden md:block group cursor-default">
         <div className="relative w-16 h-16 flex items-center justify-center glass border border-white/5 rounded-2xl overflow-hidden">
            <svg className="w-12 h-12 -rotate-90">
               <circle
                 cx="24"
                 cy="24"
                 r="20"
                 stroke="currentColor"
                 strokeWidth="2"
                 fill="transparent"
                 className="text-white/5"
               />
               <motion.circle
                 cx="24"
                 cy="24"
                 r="20"
                 stroke="url(#progressGradient)"
                 strokeWidth="2"
                 fill="transparent"
                 strokeDasharray="125.66"
                 style={{ pathLength: scrollYProgress }}
                 strokeLinecap="round"
               />
               <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#06b6d4" />
                     <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
               </defs>
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <motion.span className="text-[9px] font-black text-white">
                  {Math.round(scrollYProgress.get() * 100)}%
               </motion.span>
               <span className="text-[6px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Sync</span>
            </div>

            {/* Corner Decor */}
            <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-cyan-500/40" />
            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-cyan-500/40" />
         </div>
      </div>
    </>
  );
}
