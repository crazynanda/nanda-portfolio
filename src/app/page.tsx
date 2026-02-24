"use client";

import { useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeWrapper from "./ThemeWrapper";

export default function Home() {
  const { toggleTheme, startTransition, endTransition } = useTheme();

  const handleThemeToggle = useCallback(() => {
    startTransition();
    setTimeout(() => {
      toggleTheme();
      setTimeout(() => {
        endTransition();
      }, 100);
    }, 300);
  }, [toggleTheme, startTransition, endTransition]);

  return <ThemeWrapper onThemeToggle={handleThemeToggle} />;
}
