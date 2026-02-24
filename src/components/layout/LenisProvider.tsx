"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isFunTheme, setIsFunTheme] = useState(false);

  useEffect(() => {
    // Check if fun theme is active
    const checkFunTheme = () => {
      const funTheme = document.querySelector('.fun-theme-overlay');
      setIsFunTheme(!!funTheme);
    };
    
    // Initial check
    checkFunTheme();
    
    // Check periodically for theme changes
    const interval = setInterval(checkFunTheme, 500);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Skip Lenis initialization for fun theme
    if (isFunTheme) {
      return;
    }

    // Determine if device is mobile (width <= 900px)
    const isMobile = window.innerWidth <= 900;

    // Define scroll settings for mobile and desktop
    const scrollSettings = isMobile
      ? {
          duration: 1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical" as const,
          gestureOrientation: "vertical" as const,
          smoothWheel: true,
          touchMultiplier: 1.5,
          lerp: 0.05,
        }
      : {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical" as const,
          gestureOrientation: "vertical" as const,
          smoothWheel: true,
          touchMultiplier: 2,
          lerp: 0.1,
        };

    // Initialize Lenis
    const lenis = new Lenis(scrollSettings);
    lenisRef.current = lenis;

    // Update ScrollTrigger on Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Integrate Lenis with GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing
    gsap.ticker.lagSmoothing(0);

    // Handle window resize
    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [isFunTheme]);

  return <>{children}</>;
}
