"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  speed?: number;
  connected?: boolean;
  connectionDistance?: number;
  mouseInteraction?: boolean;
}

export default function ParticleBackground({
  className = "",
  particleCount = 70,
  colors = ["#06b6d4", "#a855f7", "#ec4899"], // Cyan, Purple, Pink
  speed = 0.4,
  connected = true,
  connectionDistance = 150,
  mouseInteraction = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const mounted = useMounted();
  const [isMobile, setIsMobile] = useState(false);

  // Initialize particles
  const initParticles = useCallback((width: number, height: number, count: number) => {
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, [colors, speed]);

  useEffect(() => {
    if (!mounted) return;

    // Check for mobile and reduced motion
    const checkPerformance = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return { mobile, reducedMotion };
    };

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { mobile, reducedMotion } = checkPerformance();
    if (reducedMotion) return; // Exit if user prefers reduced motion

    const count = mobile ? Math.floor(particleCount / 2) : particleCount;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height, count);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Particle update and draw loop
      particlesRef.current.forEach((p) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse interaction (Attraction)
        if (mouseInteraction) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200) {
            const force = (200 - dist) / 2000;
            p.vx += dx * force;
            p.vy += dy * force;
            
            // Limit speed
            const maxSpeed = 1.5;
            const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (currentSpeed > maxSpeed) {
              p.vx = (p.vx / currentSpeed) * maxSpeed;
              p.vy = (p.vy / currentSpeed) * maxSpeed;
            }
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // Connection loop
      if (connected) {
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"; // White connection lines

        for (let i = 0; i < particlesRef.current.length; i++) {
          const p1 = particlesRef.current[i];
          
          // Connect to other particles
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p2 = particlesRef.current[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              ctx.globalAlpha = 0.1 * (1 - dist / connectionDistance);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          // Connect to mouse
          if (mouseInteraction) {
            const mdx = p1.x - mouseRef.current.x;
            const mdy = p1.y - mouseRef.current.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            
            if (mdist < connectionDistance) {
              ctx.globalAlpha = 0.2 * (1 - mdist / connectionDistance);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mounted, particleCount, connectionDistance, mouseInteraction, initParticles]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 pointer-events-none -z-10", className)}
    />
  );
}
