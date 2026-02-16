"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Disable smooth scroll on potential performance-heavy touch devices or small screens
    // const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // const isSmallScreen = window.innerWidth <= 1024;
    
    // if (isTouchDevice || isSmallScreen) return;

    const lenis = new Lenis({
      lerp: 0.1, // Smoothness
      duration: 1.5,
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
      touchMultiplier: 2,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
