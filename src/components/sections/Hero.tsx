"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [terminalText, setTerminalText] = useState('');
  const fullText = 'STARK INDUSTRIES SYSTEM INITIALIZING...';
  const [isTyping, setIsTyping] = useState(true);
  const [cursorBlink, setCursorBlink] = useState(true);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);

    const cursorInterval = setInterval(() => {
      setCursorBlink(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-stark-black">
      {/* Terminal Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Animated Particle System */}
      <div className="absolute inset-0 z-0 animate-grid opacity-10"></div>

      {/* Background Giant Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[15vw] font-black text-white/5 opacity-10 mix-blend-overlay select-none tracking-tighter whitespace-nowrap blur-sm">
          NANDA KUMAR
        </h1>
      </div>

      {/* Terminal Style Hero Content */}
      <div className="relative z-10 w-full max-w-4xl px-6">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-stark-dark/80 border border-arc-reactor/30 rounded-t-lg">
          <div className="w-3 h-3 rounded-full bg-stark-red/80"></div>
          <div className="w-3 h-3 rounded-full bg-stark-gold/80"></div>
          <div className="w-3 h-3 rounded-full bg-arc-reactor/80"></div>
          <div className="ml-auto text-arc-reactor font-mono text-xs opacity-70">
            terminal.starkindustries.com
          </div>
        </div>

        {/* Terminal Body */}
        <div className="bg-stark-black/90 border border-arc-reactor/30 rounded-b-lg p-8 backdrop-blur-sm relative overflow-hidden">
          {/* Arc Reactor in Terminal */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-48 h-48">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-full rounded-full border border-dashed border-stark-red/30" 
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-40 h-40 rounded-full border border-dashed border-stark-gold/40" 
            />
            <div className="w-full h-full rounded-full border-2 border-arc-reactor/40 arc-glow flex items-center justify-center bg-arc-reactor/5 backdrop-blur-sm animate-pulse-slow">
              <div className="w-32 h-32 rounded-full border border-arc-reactor/20 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white shadow-[0_0_40px_#fff,0_0_80px_#0ff] blur-[2px] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Terminal Text */}
          <div className="font-mono text-sm md:text-base text-arc-reactor space-y-3 max-w-2xl">
            <p className="opacity-70">
              <span className="text-stark-red">$</span> system-check --all
            </p>
            <p className="text-stark-gold">✓ ARC REACTOR: ONLINE</p>
            <p className="text-stark-gold">✓ JARVIS: ACTIVE</p>
            <p className="text-stark-gold">✓ SUIT SYSTEMS: READY</p>
            <p className="text-stark-gold">✓ WEBSITE: OPERATIONAL</p>
            <div className="h-4 mt-2">
              <span>{terminalText}</span>
              <span className={`inline-block w-2 h-4 bg-arc-reactor ${cursorBlink ? 'opacity-100' : 'opacity-0'}`}></span>
            </div>

            {/* Main Heading */}
            <div className="mt-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-widest text-glow mb-4">
                NANDA KUMAR
              </h1>
              <p className="text-stark-gold text-lg tracking-[0.3em] uppercase font-mono">
                WEB DESIGNER & DEVELOPER
              </p>
              <div className="mt-8 flex gap-4">
                <a href="#projects" className="px-6 py-3 border border-arc-reactor/50 text-arc-reactor hover:bg-arc-reactor/10 transition-all duration-300 font-mono text-sm">
                  VIEW PROJECTS
                </a>
                <a href="#contact" className="px-6 py-3 bg-arc-reactor/20 border border-arc-reactor/50 text-white hover:bg-arc-reactor/30 transition-all duration-300 font-mono text-sm">
                  CONTACT ME
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Input Line */}
      <div className="mt-8 flex items-center gap-2 font-mono text-arc-reactor">
        <span className="text-stark-red">$</span>
        <input 
          type="text" 
          placeholder="Type 'help' for available commands..."
          className="bg-transparent border-none outline-none text-sm w-64 text-arc-reactor"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.value = '';
            }
          }}
        />
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      
      {/* CRT Effect */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]"></div>
    </section>
  );
}
