"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  animate?: boolean;
}

export default function GradientText({
  children,
  className = "",
  gradient = "from-cyan-400 via-blue-500 to-purple-600",
  animate = false,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        gradient,
        animate && "animate-gradient-x bg-[length:200%_auto]",
        className
      )}
    >
      {children}
    </span>
  );
}
