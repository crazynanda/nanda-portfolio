"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function BlurReveal({ children, className = "", delay = 0 }: BlurRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ filter: "blur(20px)", opacity: 0, y: 50 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.4, 0.25, 1], // Cubic bezier for "weighty" feel
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxText({ children, baseVelocity = 100 }: { children: string; baseVelocity?: number }) {
  // A marquee-like text effect often seen in high-end sites
  return (
    <div className="parallax-text-container overflow-hidden whitespace-nowrap flex flex-nowrap">
        <motion.div className="scroller font-space font-bold uppercase text-9xl text-white/5" style={{ x: 0 }}>
            <span className="block mr-8">{children}</span>
            <span className="block mr-8">{children}</span>
            <span className="block mr-8">{children}</span>
            <span className="block mr-8">{children}</span>
        </motion.div>
    </div>
  );
}
