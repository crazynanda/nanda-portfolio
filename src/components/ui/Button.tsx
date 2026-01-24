"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", size = "md", glow = false, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl overflow-hidden";

    const variants = {
      primary:
        "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white hover:opacity-90 hover:scale-105",
      secondary:
        "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:scale-105",
      outline:
        "bg-transparent border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 hover:scale-105",
      ghost:
        "bg-transparent text-white hover:bg-white/10 hover:scale-105",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          glow && "shadow-lg shadow-cyan-500/25",
          className
        )}
        {...props}
      >
        {glow && (
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
        )}
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
