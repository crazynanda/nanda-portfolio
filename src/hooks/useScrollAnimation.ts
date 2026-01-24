"use client";

import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";

/**
 * Hook to track scroll progress, direction, and current active section
 */
export function useScrollAnimation() {
  const { scrollYProgress, scrollY } = useScroll();
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Track Progress
    const unsubscribeProgress = scrollYProgress.on("change", (latest) => {
      setProgress(latest);
    });

    // Track Direction
    let lastScrollY = window.scrollY;
    const unsubscribeDirection = scrollY.on("change", (latest) => {
      if (latest > lastScrollY) {
        setDirection("down");
      } else if (latest < lastScrollY) {
        setDirection("up");
      }
      lastScrollY = latest;
    });

    // Track Active Section
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

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      unsubscribeProgress();
      unsubscribeDirection();
      observer.disconnect();
    };
  }, [scrollYProgress, scrollY]);

  return {
    progress,
    direction,
    activeSection,
    scrollY: scrollY.get(),
  };
}
