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
  life: number;
  maxLife: number;
}

interface ArcReactorBackgroundProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  speed?: number;
  connectionDistance?: number;
  mouseInteraction?: boolean;
}

export default function ArcReactorBackground({
  className = "",
  particleCount = 150,
  colors = ["#00F0FF", "#FF0000", "#FFD700"],
  speed = 0.6,
  connectionDistance = 200,
  mouseInteraction = true,
}: ArcReactorBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const mounted = useMounted();
  const [isMobile, setIsMobile] = useState(false);
  const centerRef = useRef({ x: 0, y: 0 });

  // Initialize particles
  const initParticles = useCallback((width: number, height: number, count: number) => {
    centerRef.current = { x: width / 2, y: height / 2 };
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.6 + 0.2,
      life: Math.random() * 100,
      maxLife: 100,
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
    if (reducedMotion) return;

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

      // Arc reactor pulse effect
      const pulseRadius = 100 + Math.sin(Date.now() / 1000) * 20;
      const pulseOpacity = 0.1 + Math.sin(Date.now() / 500) * 0.05;
      
      ctx.beginPath();
      ctx.arc(centerRef.current.x, centerRef.current.y, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${pulseOpacity})`;
      ctx.fill();

      // Particle update and draw loop
      particlesRef.current.forEach((p) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Arc reactor attraction
        const dx = centerRef.current.x - p.x;
        const dy = centerRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 300) {
          const force = (300 - dist) / 5000;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse interaction
        if (mouseInteraction) {
          const mdx = mouseRef.current.x - p.x;
          const mdy = mouseRef.current.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          
          if (mdist < 250) {
            const force = (250 - mdist) / 3000;
            p.vx += mdx * force;
            p.vy += mdy * force;
          }
        }

        // Limit speed
        const maxSpeed = 2;
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed > maxSpeed) {
          p.vx = (p.vx / currentSpeed) * maxSpeed;
          p.vy = (p.vy / currentSpeed) * maxSpeed;
        }

        // Particle life cycle
        p.life -= 0.1;
        if (p.life <= 0) {
          p.life = p.maxLife;
          p.x = centerRef.current.x + (Math.random() - 0.5) * 200;
          p.y = centerRef.current.y + (Math.random() - 0.5) * 200;
        }
        p.opacity = (p.life / p.maxLife) * 0.8;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // Connection loop
      ctx.lineWidth = 0.5;
      
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
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.8 * (1 - dist / connectionDistance)})`;
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
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.8 * (1 - mdist / connectionDistance)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
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
      className={cn("fixed inset-0 pointer-events-none z-0", className)}
    />
  );
}
