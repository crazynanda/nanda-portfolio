"use client";

import { useTheme } from "@/contexts/ThemeContext";
import FunPage from "@/components/fun/FunPage";
import DefaultTheme from "./DefaultTheme";

interface Props {
  onThemeToggle: () => void;
}

export default function ThemeWrapper({ onThemeToggle }: Props) {
  const { theme } = useTheme();
  
  if (theme === "fun") {
    return <FunPage onThemeToggle={onThemeToggle} />;
  }
  
  return <DefaultTheme onThemeToggle={onThemeToggle} />;
}
