"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.2, 0.5, 0.8] }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Floating Navigation Dots */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
      >
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${label}`}
          >
            {/* Label */}
            <span className="absolute right-8 text-sm font-medium text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {label}
            </span>

            {/* Dot */}
            <motion.div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === id
                  ? "bg-cyan-500 border-cyan-500 scale-125"
                  : "bg-transparent border-foreground/30 group-hover:border-cyan-500"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          </button>
        ))}
      </motion.div>

      {/* Section Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-6 left-6 z-50 hidden lg:block"
      >
        <div className="glass px-4 py-2 rounded-full text-sm font-medium">
          <span className="text-muted-foreground">
            {sections.find((s) => s.id === activeSection)?.label || "Home"}
          </span>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-gradient font-bold">
            {Math.round((sections.findIndex((s) => s.id === activeSection) + 1) / sections.length * 100)}%
          </span>
        </div>
      </motion.div>
    </>
  );
}
