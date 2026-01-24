"use client";

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Higher is more movement
  direction?: "up" | "down";
}

/**
 * Component that moves at a different speed than the scroll
 */
export default function Parallax({
  children,
  className = "",
  speed = 1,
  direction = "up",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = direction === "up" ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed];
  
  const y = useTransform(scrollYProgress, [0, 1], range);
  const physics = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const springY = useSpring(y, physics);

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ y: springY }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
