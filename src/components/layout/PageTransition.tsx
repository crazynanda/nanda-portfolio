"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function PageTransition() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Entry animation
    const tl = gsap.timeline();
    
    tl.to(".transition-overlay", {
      scaleY: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.inOut",
      transformOrigin: "top",
    })
    .to(".transition-container", {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setIsLoading(false),
    }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="transition-container fixed inset-0 z-[9999] pointer-events-none">
      <div className="transition-overlay absolute inset-0 bg-[#1a1a1a]" style={{ transformOrigin: "top" }} />
      <div className="transition-overlay absolute inset-0 bg-[#2a2a2a]" style={{ transformOrigin: "top" }} />
      <div className="transition-overlay absolute inset-0 bg-[#3a3a3a]" style={{ transformOrigin: "top" }} />
      <div className="transition-overlay absolute inset-0 bg-[#4a4a4a]" style={{ transformOrigin: "top" }} />
      <div className="transition-overlay absolute inset-0 bg-[#5a5a5a]" style={{ transformOrigin: "top" }} />
    </div>
  );
}
