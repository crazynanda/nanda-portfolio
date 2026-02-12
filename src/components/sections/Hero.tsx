"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { personalInfo } from "@/data/personal";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    // Animate name on load
    const ctx = gsap.context(() => {
      gsap.from(".hero-name-line", {
        y: 200,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 1.5,
      });

      gsap.from(".hero-footer-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background"
    >
      {/* Main Content */}
      <motion.div 
        className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 pt-24"
        style={{ opacity, scale, y }}
      >
        <div ref={nameRef} className="container-wide">
          {/* Name Split Layout */}
          <div className="overflow-hidden">
            <motion.h1 
              className="hero-name-line hero-name text-foreground"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {personalInfo.name.split(" ")[0]}
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 
              className="hero-name-line hero-name text-foreground"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
            >
              {personalInfo.name.split(" ")[1]}
            </motion.h1>
          </div>

          {/* Title Line */}
          <motion.div 
            className="mt-6 md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <p className="text-subhead text-muted max-w-2xl">
              {personalInfo.title}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Footer */}
      <motion.div 
        className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-border pt-6">
            {/* Left - Status */}
            <div className="hero-footer-item flex items-center gap-3">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-mono text-muted">{personalInfo.availability}</span>
            </div>

            {/* Center - Tagline */}
            <div className="hero-footer-item">
              <span className="text-mono text-muted">{personalInfo.tagline}</span>
            </div>

            {/* Right - Location */}
            <div className="hero-footer-item flex items-center gap-2">
              <span className="text-mono text-muted">{personalInfo.location}</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <button
              onClick={scrollToAbout}
              className="group flex flex-col items-center gap-2 text-muted hover:text-foreground transition-colors"
            >
              <span className="text-mono">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
