"use client";
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StarkCardProps extends HTMLMotionProps<"div"> {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function StarkCard({ title, subtitle, className, children, ...props }: StarkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "relative flex flex-col p-8 h-full w-full overflow-hidden",
        "rounded-[2rem] border border-white/10 bg-zinc-900/40 backdrop-blur-3xl",
        "transition-all duration-500 group hover:border-arc-cyan/40",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-2">
           {subtitle && (
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-arc-cyan opacity-70">
                // {subtitle}
            </span>
           )}
          {/* Status Indicator (Always show or conditional? Based on prompt it's unconditional but cleaner to always show) */}
          <div className="w-1 h-1 rounded-full bg-arc-cyan animate-pulse group-hover:shadow-[0_0_10px_#00F0FF] transition-all" />
        </div>
        
        {title && (
            <h3 className="text-2xl font-bold text-white tracking-tight leading-none">{title}</h3>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 h-full min-h-0">
        {children}
      </div>

      {/* Subtle HUD scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-arc-cyan/[0.02] to-transparent h-[200%] w-full -translate-y-full group-hover:translate-y-full transition-transform duration-[2000ms] ease-in-out pointer-events-none" />
    </motion.div>
  );
}
