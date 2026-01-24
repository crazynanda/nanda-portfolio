"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: "default" | "glass" | "gradient" | "bordered";
  hover?: boolean;
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = "glass", hover = true, glow = false, ...props }, ref) => {
    const baseStyles = "relative rounded-2xl overflow-hidden";

    const variants = {
      default: "bg-gray-900 border border-gray-800",
      glass:
        "bg-white/5 backdrop-blur-xl border border-white/10",
      gradient:
        "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10",
      bordered:
        "bg-transparent border-2 border-gray-700 hover:border-cyan-500/50",
    };

    const hoverStyles = hover
      ? "transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10"
      : "";

    const glowStyles = glow
      ? "before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/20 before:via-purple-500/20 before:to-pink-500/20 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 before:blur-xl before:-z-10"
      : "";

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, glowStyles, className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;
