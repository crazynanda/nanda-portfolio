"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "I" },
  { id: "about", label: "II" },
  { id: "capabilities", label: "III" }, // Bento Grid
  { id: "skills", label: "IV" },
  { id: "projects", label: "V" },
  { id: "experience", label: "VI" },
  { id: "contact", label: "VII" },
];

export default function StickyNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -20% 0px", // Trigger when section is near center
        threshold: 0.1,
      }
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
      // Use Lenis scroll if available, otherwise native smooth scroll
      // window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-center mix-blend-difference">
      {/* Decorative vertical line */}
      <div className="w-px h-12 bg-white/20" />

      <div className="flex flex-col gap-4">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex items-center justify-center w-8 h-8"
          >
            <span
              className={`absolute font-serif text-sm transition-all duration-300 ${
                activeSection === id 
                  ? "opacity-100 scale-125 text-cyan-400 font-bold italic" 
                  : "opacity-40 scale-100 text-white hover:opacity-100 hover:scale-110"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Decorative vertical line */}
      <div className="w-px h-12 bg-white/20" />
    </div>
  );
}
