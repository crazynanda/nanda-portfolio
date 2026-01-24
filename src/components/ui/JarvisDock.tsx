"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { Home, Briefcase, User, Mail, LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function JarvisDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000]">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "flex h-16 items-end gap-4 rounded-full px-6 pb-3",
          "bg-black/60 backdrop-blur-xl border border-white/10",
          "shadow-[0_0_30px_rgba(0,0,0,0.3)]"
        )}
      >
        <DockIcon mouseX={mouseX} title="Home" icon={Home} href="#hero" />
        <DockIcon mouseX={mouseX} title="Work" icon={Briefcase} href="#projects" />
        <DockIcon mouseX={mouseX} title="About" icon={User} href="#bento" />
        <DockIcon mouseX={mouseX} title="Contact" icon={Mail} href="#contact" />
      </motion.div>
    </div>
  );
}

function DockIcon({
  mouseX,
  title,
  icon: Icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: LucideIcon;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height: width }}
        className="group relative flex aspect-square items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-arc-cyan/20 hover:border-arc-cyan/50 transition-colors"
      >
        <span className="absolute -top-10 hidden rounded border border-white/10 bg-black/90 px-2 py-1 text-[10px] font-mono text-arc-cyan group-hover:block whitespace-nowrap">
            {title}
        </span>
        <Icon className="h-5 w-5 text-gray-400 group-hover:text-arc-cyan transition-colors" />
      </motion.div>
    </Link>
  );
}
