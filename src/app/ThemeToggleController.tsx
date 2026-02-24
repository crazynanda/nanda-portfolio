"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import FunPage from "@/components/fun/FunPage";

export default function ThemeToggleController() {
  const { theme, toggleTheme, startTransition, endTransition } = useTheme();
  const [isFunActive, setIsFunActive] = useState(false);

  const handleThemeToggle = useCallback(() => {
    startTransition();
    setTimeout(() => {
      toggleTheme();
      setIsFunActive(!isFunActive);
      setTimeout(() => {
        endTransition();
      }, 100);
    }, 300);
  }, [toggleTheme, startTransition, endTransition, isFunActive]);

  useEffect(() => {
    const handleToggle = () => {
      handleThemeToggle();
    };

    window.addEventListener("toggle-theme", handleToggle);
    return () => window.removeEventListener("toggle-theme", handleToggle);
  }, [handleThemeToggle]);

  // Always show the FunPage when theme is "fun"
  if (theme === "fun") {
    return <FunPage onThemeToggle={handleThemeToggle} />;
  }

  return null;
}
