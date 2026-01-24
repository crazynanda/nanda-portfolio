"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  mode?: "word" | "letter";
}

/**
 * Component to reveal text word by word or letter by letter
 */
export default function TextReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.03,
  once = true,
  mode = "letter",
}: TextRevealProps) {
  const items = mode === "letter" ? text.split("") : text.split(" ");

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: mode === "letter" ? duration : duration * 5,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block"
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
        >
          {item === " " ? "\u00A0" : mode === "word" ? `${item}\u00A0` : item}
        </motion.span>
      ))}
    </motion.span>
  );
}
