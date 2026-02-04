"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

interface ParallaxHeroProps {
  children?: ReactNode; // Main content (Text)
}

export default function ParallaxHero({ children }: ParallaxHeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  // Parallax speeds
  // Background moves slowly, Middle (Tony) moves against scroll slightly
  // Front moves fast
  const yBg = useParallax(scrollYProgress, 100);
  const yMiddle = useParallax(scrollYProgress, -50); 
  const yFront = useParallax(scrollYProgress, -150); 

  return (
    <section 
      ref={ref} 
      className="relative h-[120vh] overflow-hidden flex items-center justify-center bg-[#030712]"
      style={{ perspective: "100px" }}
    >
        {/* Layer 1: Deep Background (Nebula/Grid + Flying Iron Man) */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 select-none">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-black to-black opacity-80" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat opacity-10" /> 
            
            {/* Flying Iron Man in distance */}
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 1000, opacity: 0.8 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-20 left-0 w-64 h-64 opacity-50 blur-[2px]"
            >
               <Image src="/iron-man-flying.png" alt="Iron Man Flying" width={300} height={300} className="object-contain" />
            </motion.div>
        </motion.div>

        {/* Layer 2: Middle (Tony Stark - The Genius) */}
        <motion.div style={{ y: yMiddle }} className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
             {/* Tony Stark pose - Centered but slightly lower */}
             <div className="relative w-[800px] h-[900px] translate-y-20 opacity-80 mix-blend-screen md:mix-blend-normal">
                <Image 
                  src="/tony-stark.png" 
                  alt="Tony Stark" 
                  fill 
                  className="object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.3)]"
                  priority
                />
             </div>
        </motion.div>

        {/* Layer 3: Foreground (Floating HUD Arc Reactors) */}
        <motion.div style={{ y: yFront }} className="absolute inset-0 z-20 pointer-events-none select-none">
            {/* Blue Arc Reactor - Left HUD */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-[5%] w-48 h-48 opacity-50 mix-blend-screen"
            >
               <Image src="/arc-reactor-2.png" alt="Arc Reactor HUD" width={200} height={200} />
            </motion.div>

             {/* Red Arc Reactor Core - Right Bottom */}
            <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="absolute bottom-1/4 right-[5%] w-32 h-32 opacity-80 mix-blend-screen"
            >
               <Image src="/arc-reactor-1.png" alt="Arc Reactor Core" width={150} height={150} />
            </motion.div>
        </motion.div>

        {/* Content Layer (Text) */}
         <div className="relative z-30 container-custom text-center mt-[-10vh]">
            {/* Scrim for visibility */}
            <div className="absolute inset-0 -z-10 bg-gradient-radial from-black/80 via-black/40 to-transparent blur-3xl rounded-full scale-150 opacity-60 pointer-events-none" />
            {children}
        </div>
        
        {/* Fog/Fade at bottom to blend into next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030712] to-transparent z-40" />
    </section>
  );
}
