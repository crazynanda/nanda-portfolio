"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  // Handle case where ThemeProvider might not be available (e.g., during static generation)
  let themeContext;
  try {
    themeContext = useTheme();
  } catch (e) {
    // Return a placeholder during static generation
    return (
      <div className={cn(
        "relative p-2 rounded-full glass transition-all duration-300",
        className
      )}>
        <Sun className="w-5 h-5 text-orange-500" />
      </div>
    );
  }

  const { theme, setTheme, resolvedTheme } = themeContext;

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-full glass transition-all duration-300 hover:scale-110",
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: resolvedTheme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-5 h-5 text-cyan-400" />
        ) : (
          <Sun className="w-5 h-5 text-orange-500" />
        )}
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: resolvedTheme === "dark"
            ? "0 0 20px rgba(34, 211, 238, 0.5)"
            : "0 0 20px rgba(249, 115, 22, 0.5)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

// Advanced theme toggle with all three options
export function ThemeToggleAdvanced({ className }: ThemeToggleProps) {
  // Handle case where ThemeProvider might not be available
  let themeContext;
  try {
    themeContext = useTheme();
  } catch (e) {
    return (
      <div className={cn("flex items-center gap-1 p-1 rounded-full glass", className)}>
        <Sun className="w-4 h-4 text-orange-500" />
      </div>
    );
  }

  const { theme, setTheme } = themeContext;

  const options = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ] as const;

  return (
    <div className={cn("flex items-center gap-1 p-1 rounded-full glass", className)}>
      {options.map(({ value, icon: Icon, label }) => (
        <motion.button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "relative p-2 rounded-full transition-all duration-300",
            theme === value ? "text-white" : "text-muted-foreground hover:text-foreground"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Set ${label} mode`}
        >
          {theme === value && (
            <motion.div
              layoutId="activeTheme"
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <Icon className="relative z-10 w-4 h-4" />
        </motion.button>
      ))}
    </div>
  );
}
