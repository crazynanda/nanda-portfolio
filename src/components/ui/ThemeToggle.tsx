"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10" />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group outline-none"
      whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.2)" }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle System Theme"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="relative z-10"
          >
            {/* Custom Sun SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
            >
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
              <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
              <line x1="17.66" y1="4.93" x2="19.07" y2="6.34" />
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="relative z-10"
          >
            {/* Custom Moon SVG with Crater Details */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" />
              <circle cx="8" cy="12" r="1.5" fill="black" fillOpacity="0.2" stroke="none" />
              <circle cx="12" cy="15" r="1" fill="black" fillOpacity="0.2" stroke="none" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Technical HUD Corner Decor */}
      <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-white/20" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-white/20" />
      
      {/* Invisible Screen Reader Text */}
      <span className="sr-only">Toggle {isDark ? "Light" : "Dark"} Mode</span>
    </motion.button>
  );
}
