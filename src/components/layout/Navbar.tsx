"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Home, 
  User, 
  Cpu, 
  Briefcase, 
  Rocket, 
  GraduationCap, 
  Mail,
  Terminal,
  type LucideIcon 
} from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { AnimeNavBar } from "@/components/ui/anime-navbar";

// Icon mapping for navigation items
const ICONS: Record<string, LucideIcon> = {
  Home: Home,
  About: User,
  Skills: Cpu,
  Projects: Briefcase,
  Experience: Rocket,
  Education: GraduationCap,
  Contact: Mail
};

export default function Navbar() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = NAV_LINKS.map(link => ({
    name: link.label,
    url: link.href,
    icon: ICONS[link.label] || Home
  }));

  return (
    <>
      {/* Terminal Style Navigation */}
      <div className="fixed top-0 left-0 right-0 z-[10000] bg-stark-black/95 backdrop-blur-md border-b border-arc-reactor/20">
        <div className="container-custom mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Terminal Header Left */}
            <motion.div 
              className="flex items-center gap-3 pointer-events-auto"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onClick={() => handleScroll("#hero")}
            >
              <div className="relative w-10 h-10 rounded flex items-center justify-center bg-stark-dark border border-arc-reactor/30 arc-glow group">
                <Terminal className="w-5 h-5 text-arc-reactor group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-sm text-white tracking-tight">
                  NANDA_KUMAR
                </span>
                <span className="text-[9px] font-mono text-arc-reactor/60 tracking-[0.3em] uppercase">
                  STARK_TERMINAL
                </span>
              </div>
            </motion.div>

            {/* Terminal Navigation Buttons */}
            <AnimatePresence>
              {isDesktop && (
                <motion.div 
                  className="flex items-center gap-1 pointer-events-auto"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {NAV_LINKS.map((link, index) => (
                    <button
                      key={link.label}
                      onClick={() => handleScroll(link.href)}
                      className="px-4 py-2 text-xs font-mono text-arc-reactor/70 hover:text-arc-reactor hover:bg-arc-reactor/10 border border-arc-reactor/20 hover:border-arc-reactor/40 rounded transition-all duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {link.label.toUpperCase()}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Terminal Status Indicator */}
            <motion.div 
              className="flex items-center gap-2 pointer-events-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 px-3 py-1 bg-stark-dark border border-stark-red/30 rounded text-[10px] font-mono">
                <div className="w-2 h-2 rounded-full bg-stark-red animate-pulse"></div>
                <span className="text-stark-red">SYSTEM: ONLINE</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Terminal Style */}
      <AnimatePresence>
        {!isDesktop && (
          <motion.div
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[10000]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="bg-stark-black/95 backdrop-blur-md border border-arc-reactor/30 rounded-full px-4 py-3 shadow-glow-cyan">
              <AnimeNavBar items={navItems} defaultActive="Home" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
