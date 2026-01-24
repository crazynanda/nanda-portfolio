"use client";

import { motion, useSpring, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Distance content can move
}

/**
 * Component that makes any element magnetic on hover
 */
export default function MagneticWrapper({
  children,
  className = "",
  strength = 0.35,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const physics = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseX = useSpring(x, physics);
  const mouseY = useSpring(y, physics);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mouseX,
        y: mouseY,
      }}
      className={cn("relative z-10", className)}
    >
      {children}
    </motion.div>
  );
}
