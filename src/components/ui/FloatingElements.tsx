"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingShapeProps {
  type: "cube" | "sphere" | "ring" | "pyramid" | "hexagon";
  size: number;
  position: { top?: string | number; left?: string | number; right?: string | number; bottom?: string | number };
  color: string; // Tailwind class or hex
  delay?: number;
  parallaxIntensity?: number;
  className?: string;
}

const FloatingShape = ({
  type,
  size,
  position,
  color,
  delay = 0,
  parallaxIntensity = 1,
  className,
}: FloatingShapeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 5000], [0, -1000 * parallaxIntensity]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 25,
        y: (e.clientY - window.innerHeight / 2) / 25,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const renderShape = () => {
    switch (type) {
      case "cube":
        return (
          <div className="relative preserve-3d" style={{ width: size, height: size }}>
            {[
              "translateZ(50px)",
              "rotateY(90deg) translateZ(50px)",
              "rotateY(180deg) translateZ(50px)",
              "rotateY(-90deg) translateZ(50px)",
              "rotateX(90deg) translateZ(50px)",
              "rotateX(-90deg) translateZ(50px)",
            ].map((transform, i) => (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 glass border border-white/20 opacity-40",
                  color.startsWith("#") ? "" : color
                )}
                style={{
                  transform: `scale(${size / 100}) ${transform}`,
                  backgroundColor: color.startsWith("#") ? `${color}20` : undefined,
                }}
              />
            ))}
          </div>
        );
      case "sphere":
        return (
          <div
            className={cn(
              "rounded-full blur-md opacity-30 animate-pulse-soft",
              color.startsWith("#") ? "" : color
            )}
            style={{
              width: size,
              height: size,
              background: color.startsWith("#") ? `radial-gradient(circle, ${color}, transparent)` : undefined,
              boxShadow: `0 0 ${size / 2}px ${color.startsWith("#") ? color : "currentColor"}30`,
            }}
          />
        );
      case "ring":
        return (
          <div
            className={cn(
              "rounded-full border-2 opacity-20",
              color.startsWith("#") ? "border-current" : color
            )}
            style={{
              width: size,
              height: size,
              borderColor: color.startsWith("#") ? color : undefined,
              transform: "rotateX(60deg)",
              boxShadow: `inset 0 0 ${size / 4}px ${color.startsWith("#") ? color : "currentColor"}20`,
            }}
          />
        );
      case "pyramid":
        return (
          <div className="relative preserve-3d" style={{ width: size, height: size }}>
            {[
              "rotateY(0deg) rotateX(30deg) translateZ(0)",
              "rotateY(120deg) rotateX(30deg) translateZ(0)",
              "rotateY(240deg) rotateX(30deg) translateZ(0)",
            ].map((transform, i) => (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 glass border border-white/20 opacity-40",
                  color.startsWith("#") ? "" : color
                )}
                style={{
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  transform: `scale(${size / 100}) ${transform} translateY(-25%)`,
                  backgroundColor: color.startsWith("#") ? `${color}20` : undefined,
                }}
              />
            ))}
          </div>
        );
      case "hexagon":
        return (
          <div
            className={cn(
              "glass border border-white/20 opacity-30",
              color.startsWith("#") ? "" : color
            )}
            style={{
              width: size,
              height: size,
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              backgroundColor: color.startsWith("#") ? `${color}20` : undefined,
            }}
          />
        );
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn("absolute pointer-events-none select-none", className)}
      style={{
        ...position,
        y: smoothY,
      }}
    >
      <motion.div
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          y: [0, -20, 0],
          x: [mousePos.x * parallaxIntensity, mousePos.x * parallaxIntensity], // Sync mouse parallax
        }}
        transition={{
          rotateX: { duration: 15 + delay, repeat: Infinity, ease: "linear" },
          rotateY: { duration: 20 + delay, repeat: Infinity, ease: "linear" },
          y: { duration: 4 + delay, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          x: mousePos.x * parallaxIntensity,
          y: mousePos.y * parallaxIntensity,
        }}
      >
        {renderShape()}
      </motion.div>
    </motion.div>
  );
};

export default function FloatingElements() {
  const shapes: FloatingShapeProps[] = [
    { type: "cube", size: 60, position: { top: "15%", left: "10%" }, color: "#06b6d4", delay: 1, parallaxIntensity: 1.2 },
    { type: "sphere", size: 150, position: { top: "25%", right: "15%" }, color: "#a855f7", delay: 2, parallaxIntensity: 0.8 },
    { type: "ring", size: 100, position: { bottom: "20%", left: "12%" }, color: "#ec4899", delay: 3, parallaxIntensity: 1.5 },
    { type: "pyramid", size: 80, position: { top: "45%", right: "25%" }, color: "#6366f1", delay: 0.5, parallaxIntensity: 1.1 },
    { type: "hexagon", size: 70, position: { bottom: "40%", right: "10%" }, color: "#00d9ff", delay: 1.5, parallaxIntensity: 0.9 },
    // Accents for other sections
    { type: "ring", size: 200, position: { top: "120%", left: "5%" }, color: "#06b6d4", delay: 4, parallaxIntensity: 0.4 },
    { type: "cube", size: 40, position: { top: "180%", right: "5%" }, color: "#a855f7", delay: 5, parallaxIntensity: 0.6 },
    { type: "hexagon", size: 120, position: { top: "250%", left: "15%" }, color: "#ec4899", delay: 2.5, parallaxIntensity: 0.3 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
      
      {/* Global Style for 3D preservation */}
      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
