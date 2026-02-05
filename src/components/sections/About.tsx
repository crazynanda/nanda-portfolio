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
import TerminalCard from "../ui/TerminalCard";

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
    { label: "Projects", value: "4+", color: "text-arc-reactor" },
    { label: "Years Learning", value: "1+", color: "text-stark-gold" },
    { label: "Startups", value: "1", color: "text-stark-red" },
    { label: "Curiosity", value: "∞", color: "text-arc-cyan" },
  ];

  return (
    <section 
      id="about" 
      className="relative py-32 bg-stark-black overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-arc-reactor/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-stark-red/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
             {/* Sticky Header - Left Column */}
            <div className="lg:col-span-4 relative">
                <div className="sticky top-32">
                    <BlurReveal>
                         <p className="text-arc-reactor font-mono uppercase text-sm tracking-widest mb-4 block">
                            01 — SYSTEM INFO
                        </p>
                    </BlurReveal>
                    <BlurReveal delay={0.1}>
                        <h2 className="text-6xl md:text-7xl font-mono font-bold text-white tracking-tight mb-8">
                            ABOUT.NK
                        </h2>
                    </BlurReveal>
                    <BlurReveal delay={0.2}>
                         <div className="w-24 h-1 bg-arc-reactor rounded-full" />
                    </BlurReveal>
                </div>
            </div>

            {/* Content - Right Column */}
            <div className="lg:col-span-8 flex flex-col pt-12 lg:pt-0">
                 {/* Terminal Profile Card */}
                <TerminalCard title="PERSONAL_PROFILE" icon={<Cpu className="w-4 h-4" />} delay={0.3}>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="relative w-20 h-20 rounded-full bg-stark-dark flex items-center justify-center flex-shrink-0 border border-arc-reactor/50 shadow-inner overflow-hidden arc-glow">
                        <div className="absolute inset-0 bg-arc-reactor/20 animate-pulse" />
                        <span className="relative text-2xl font-bold text-arc-reactor z-10">NK</span>
                        </div>
                        <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">{personalInfo.name}</h3>
                        <p className="text-arc-reactor text-sm tracking-widest uppercase mb-1">{personalInfo.title}</p>
                        <p className="text-gray-500 text-xs font-mono">LOCATION: BANGALORE, INDIA</p>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-4 text-gray-300 text-sm leading-relaxed font-mono">
                        {personalInfo.bio.map((para, i) => (
                        <p key={i} className="leading-relaxed">
                            <span className="text-stark-red">$</span> {para}
                        </p>
                        ))}
                    </div>
                </TerminalCard>

                {/* Grid for Stats and Facts */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                     {/* Stats Grid */}
                    <TerminalCard title="SYSTEM_STATS" icon={<Rocket className="w-4 h-4" />} delay={0.5}>
                        <div className="grid grid-cols-2 gap-3 h-fit">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-stark-dark border border-arc-reactor/20 rounded-lg p-4 text-center hover:bg-arc-reactor/5 transition-colors group">
                                <div className={cn("text-2xl font-bold mb-1 group-hover:scale-110 transition-transform", stat.color)}>
                                    <CountUp end={stat.value} />
                                </div>
                                <p className="text-[10px] text-arc-reactor/60 uppercase tracking-wider font-mono">
                                    {stat.label}
                                </p>
                                </div>
                            ))}
                        </div>
                    </TerminalCard>

                    {/* Fun Facts */}
                    <TerminalCard title="ADDITIONAL_DATA" icon={<Hash className="w-4 h-4" />} delay={0.7}>
                         {personalInfo.funFacts.map((fact, i) => {
                            const Icon = iconMap[fact.icon] || Hash;
                            return (
                            <div 
                                key={i}
                                className="flex items-start gap-4 p-4 bg-stark-dark border border-arc-reactor/10 rounded-xl hover:border-arc-reactor/30 transition-all hover:translate-x-2"
                            >
                                <div className="p-2 bg-arc-reactor/10 rounded-lg flex-shrink-0">
                                <Icon className="w-5 h-5 text-arc-reactor" />
                                </div>
                                <div>
                                <h4 className="text-white font-medium mb-1 font-mono">{fact.title}</h4>
                                <p className="text-gray-500 text-sm font-mono">{fact.text}</p>
                                </div>
                            </div>
                            );
                        })}
                    </TerminalCard>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
