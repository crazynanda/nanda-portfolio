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
      {/* Centered Anime Navbar */}
      <AnimeNavBar items={navItems} defaultActive="Home" />

      {/* Desktop Only: Stark Identity Elements - JS Conditionally Rendered */}
      <AnimatePresence>
        {isDesktop && (
          <div className="fixed top-8 left-0 right-0 w-full px-8 md:px-12 z-[10000] flex justify-between pointer-events-none">
            <motion.div 
              className="pointer-events-auto flex items-center gap-4 group cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onClick={() => handleScroll("#hero")}
            >
              <div className="relative w-10 h-10 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-arc-cyan/50 transition-colors backdrop-blur-md shadow-lg">
                <span className="font-space font-black text-white group-hover:text-arc-cyan transition-colors">NK</span>
              </div>
              <div className="flex flex-col">
                <span className="font-space font-bold text-sm text-white tracking-tight leading-none group-hover:text-arc-cyan transition-colors">
                  NANDA_KUMAR
                </span>
                <span className="text-[9px] font-mono text-gray-500 tracking-[0.2em] uppercase group-hover:text-white transition-colors">
                  SYSTEM_ONLINE
                </span>
              </div>
            </motion.div>

            <motion.div 
              className="pointer-events-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <button
                onClick={() => handleScroll("#contact")}
                className="px-6 py-2 bg-black/50 text-white border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-arc-cyan hover:text-black hover:scale-105 transition-all shadow-lg"
              >
                Connect
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
