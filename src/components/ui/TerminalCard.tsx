"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TerminalCardProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  delay?: number;
}

export default function TerminalCard({ 
  children, 
  title, 
  icon, 
  delay = 0 
}: TerminalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className="bg-stark-black/80 border border-arc-reactor/30 rounded-lg overflow-hidden backdrop-blur-sm"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-stark-dark/80 border-b border-arc-reactor/20">
        <div className="w-2 h-2 rounded-full bg-stark-red/80"></div>
        <div className="w-2 h-2 rounded-full bg-stark-gold/80"></div>
        <div className="w-2 h-2 rounded-full bg-arc-reactor/80"></div>
        <div className="ml-auto flex items-center gap-2">
          {icon && <span className="text-arc-reactor/70">{icon}</span>}
          <span className="text-xs font-mono text-arc-reactor/70">{title}</span>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm text-gray-300">
        {children}
      </div>
      
      {/* Terminal Footer */}
      <div className="px-4 py-2 bg-stark-dark/50 border-t border-arc-reactor/10 text-[10px] font-mono text-arc-reactor/40">
        LAST UPDATED: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>
    </motion.div>
  );
}
