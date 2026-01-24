"use client";

import { useCallback } from "react";

/**
 * Hook to lock or unlock body scroll
 * Useful for modals, mobile menus, etc.
 */
export function useScrollLock() {
  const lockScroll = useCallback(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
}
