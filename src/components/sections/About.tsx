import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BlurReveal from "../animations/BlurReveal";
import { 
  Rocket, 
  Cpu, 
  Film, 
  Hash, 
  Glasses, 
} from "lucide-react";
import { personalInfo } from "@/data/personal";
import { cn } from "@/lib/utils";

const CountUp = ({ end, duration = 2 }: { end: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const isInfinity = end === "∞";
  const numericEnd = isInfinity ? 100 : parseInt(end.replace(/\D/g, ""));
  const suffix = end.replace(/\d/g, "");

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        countRef.current = Math.floor(progress * numericEnd);
        setCount(countRef.current);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericEnd);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [numericEnd, duration]);

  return (
    <span>
      {isInfinity ? "∞" : `${count}${suffix}`}
    </span>
  );
};

const iconMap: Record<string, any> = {
  Film,
  Glasses,
  Rocket,
  Hash
};

export default function About() {
  const stats = [
    { label: "Projects", value: "4+", color: "text-cyan-400" },
    { label: "Years Learning", value: "1+", color: "text-purple-400" },
    { label: "Startups", value: "1", color: "text-pink-400" },
    { label: "Curiosity", value: "∞", color: "text-indigo-400" },
  ];

  return (
    <section 
      id="about" 
      className="relative py-32 bg-[#030712] overflow-hidden"
    >
      {/* Background Iron Man Element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] pointer-events-none opacity-20 hidden lg:block">
         <Image 
            src="/iron-man-flying.png" 
            alt="Iron Man Flying" 
            fill 
            className="object-contain" // mix-blend-screen?
         />
      </div>

       {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom px-6 max-w-[1800px] mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
             {/* Sticky Header - Left Column */}
            <div className="lg:col-span-4 relative">
                <div className="sticky top-32">
                    <BlurReveal>
                         <p className="text-cyan-500 font-mono uppercase text-sm tracking-widest mb-4 block">
                            01 — About Me
                        </p>
                    </BlurReveal>
                    <BlurReveal delay={0.1}>
                        <h2 className="text-6xl md:text-7xl font-serif font-medium text-white italic tracking-tight mb-8">
                            Who I Am
                        </h2>
                    </BlurReveal>
                    <BlurReveal delay={0.2}>
                         <div className="w-24 h-1 bg-cyan-500 rounded-full" />
                    </BlurReveal>
                </div>
            </div>

            {/* Content - Right Column */}
            <div className="lg:col-span-8 flex flex-col pt-12 lg:pt-0">
                 {/* Holographic Profile Card */}
                <BlurReveal delay={0.3} className="relative bg-[#0a0f1a]/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8 mb-8 shadow-[0_0_30px_rgba(6,182,212,0.1)] group hover:shadow-[0_0_50px_rgba(6,182,212,0.2)] transition-all duration-500">
                    {/* Tech Corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-500" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-500" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-500" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-500" />

                    <div className="flex items-center gap-6 mb-6">
                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-900 to-black flex items-center justify-center flex-shrink-0 border border-cyan-500/50 shadow-inner overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-500/20 animate-pulse" />
                        <span className="relative text-2xl font-bold text-cyan-100 z-10">NK</span>
                        </div>
                        <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">{personalInfo.name}</h3>
                        <p className="text-cyan-400 text-sm tracking-widest uppercase mb-1">{personalInfo.title}</p>
                        <p className="text-gray-500 text-xs font-mono">LOCATION: BANGALORE, INDIA</p>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-4 text-gray-300 text-sm leading-relaxed font-light">
                        {personalInfo.bio.map((para, i) => (
                        <p key={i}>{para}</p>
                        ))}
                    </div>
                </BlurReveal>

                {/* Grid for Stats and Facts */}
                <div className="grid md:grid-cols-2 gap-8">
                     {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 h-fit">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-[#0a0f1a] border border-white/10 rounded-lg p-4 text-center hover:bg-white/5 transition-colors group">
                            <div className={cn("text-2xl font-bold mb-1 group-hover:scale-110 transition-transform", stat.color)}>
                                <CountUp end={stat.value} />
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                                {stat.label}
                            </p>
                            </div>
                        ))}
                    </div>

                    {/* Fun Facts */}
                    <div className="space-y-4">
                         <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="text-cyan-500">///</span>
                            Additional Data
                        </h3>
                         {personalInfo.funFacts.map((fact, i) => {
                            const Icon = iconMap[fact.icon] || Hash;
                            return (
                            <div 
                                key={i}
                                className="flex items-start gap-4 p-4 bg-[#0a0f1a] border border-white/5 rounded-xl hover:border-cyan-500/30 transition-all hover:translate-x-2"
                            >
                                <div className="p-2 bg-cyan-500/10 rounded-lg flex-shrink-0">
                                <Icon className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                <h4 className="text-white font-medium mb-1">{fact.title}</h4>
                                <p className="text-gray-500 text-sm">{fact.text}</p>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
