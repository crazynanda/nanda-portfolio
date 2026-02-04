"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  animate?: boolean;
  glow?: boolean;
}

export default function GradientText({
  children,
  className = "",
  gradient = "from-arc-reactor via-stark-gold to-stark-red",
  animate = false,
  glow = false,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        gradient,
        animate && "animate-gradient-x bg-[length:200%_auto]",
        glow && "text-glow",
        className
      )}
    >
      {children}
    </span>
  );
}
