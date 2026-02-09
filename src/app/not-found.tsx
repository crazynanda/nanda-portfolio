"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight, Bot } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <div className="relative inline-block mb-12">
            <motion.h1 
              className="text-[12rem] font-black text-gray-200 tracking-tighter leading-none"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              404
            </motion.h1>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-32 h-32 rounded-3xl bg-white border border-gray-200 flex items-center justify-center relative">
                  <Bot className="w-16 h-16 text-blue-600 animate-pulse" />
               </div>
            </div>
          </div>

          <h2 className="text-4xl font-black text-gray-900 mb-6">
             Page Not Found
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-12">
             The page you are looking for doesn&apos;t exist or may have been moved.
          </p>

          <Link href="/">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-blue-700 transition-colors">
              <Home className="w-5 h-5" />
              Return to Home
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <div className="mt-16 flex items-center justify-center gap-6 opacity-50">
             <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Error_Ref</span>
                <span className="text-xs font-mono text-gray-500">PAGE_NOT_FOUND</span>
             </div>
             <div className="h-8 w-px bg-gray-300" />
             <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Status</span>
                <span className="text-xs font-mono text-gray-500">SAFE_EXIT_READY</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
