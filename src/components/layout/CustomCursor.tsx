"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "link" | "button" | "project" | "clicking">("default");
  const [cursorText, setCursorText] = useState("");
  const mounted = useMounted();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth following
  const dotX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const dotY = useSpring(mouseY, { damping: 20, stiffness: 300 });
  
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const onMouseDown = () => setCursorType("clicking");
  const onMouseUp = () => setCursorType("default");

  useEffect(() => {
    if (!mounted) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for links
      if (target.closest("a")) {
        setCursorType("link");
        return;
      }
      
      // Check for buttons
      if (target.closest("button")) {
        setCursorType("button");
        setCursorText("CLICK");
        return;
      }

      // Check for projects (based on data-cursor or class)
      if (target.closest("[data-project-card]")) {
        setCursorType("project");
        setCursorText("VIEW");
        return;
      }

      setCursorType("default");
      setCursorText("");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mounted, onMouseMove]);

  if (!mounted) return null;

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  const variants = {
    default: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(6, 182, 212, 0.05)",
      borderColor: "rgba(6, 182, 212, 0.3)",
    },
    link: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(168, 85, 247, 0.1)",
      borderColor: "rgba(168, 85, 247, 0.5)",
    },
    button: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(6, 182, 212, 0.9)",
      borderColor: "rgba(6, 182, 212, 1)",
    },
    project: {
      width: 120,
      height: 120,
      backgroundColor: "rgba(6, 182, 212, 0.2)",
      borderColor: "rgba(6, 182, 212, 0.6)",
      backdropFilter: "blur(4px)",
    },
    clicking: {
      width: 30,
      height: 30,
      backgroundColor: "rgba(6, 182, 212, 0.2)",
      borderColor: "rgba(6, 182, 212, 0.8)",
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 flex items-center justify-center mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          ...variants[cursorType]
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              key={cursorText}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={cn(
                "text-[10px] font-black tracking-widest uppercase",
                cursorType === "button" ? "text-black" : "text-cyan-400"
              )}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 z-10 mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Safer approach: only hide default cursor if CustomCursor is definitely mounted and functional */}
    </div>
  );
}
