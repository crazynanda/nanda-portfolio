"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    setIsMuted(!isMuted);
    // Logic for global sound state would go here
  };

  return (
    <motion.button
      onClick={toggleSound}
      className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group outline-none"
      whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.2)" }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle Sound Effects"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors" />
      ) : (
        <Volume2 className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      )}

      {/* Pulsing indicator when active */}
      {!isMuted && (
        <span className="absolute top-2 right-2 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
      )}
    </motion.button>
  );
}
