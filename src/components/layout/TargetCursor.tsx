"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

interface TargetCursorProps {
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
}

export default function TargetCursor({
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const corner1Ref = useRef<HTMLDivElement>(null);
  const corner2Ref = useRef<HTMLDivElement>(null);
  const corner3Ref = useRef<HTMLDivElement>(null);
  const corner4Ref = useRef<HTMLDivElement>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const isHoveringRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const listenersAttachedRef = useRef(false);

  const INTERACTIVE_SELECTORS = 'a, button, input, textarea, select, [role="button"], .cursor-target';

  const getCorners = useCallback(() => {
    return [corner1Ref.current, corner2Ref.current, corner3Ref.current, corner4Ref.current];
  }, []);

  const resetCorners = useCallback(() => {
    const corners = getCorners();
    const centerPositions = [
      { x: -10, y: -10 },
      { x: 6, y: -10 },
      { x: 6, y: 6 },
      { x: -10, y: 6 },
    ];

    corners.forEach((corner, i) => {
      if (!corner) return;
      gsap.to(corner, {
        x: centerPositions[i].x,
        y: centerPositions[i].y,
        duration: 0.3,
        ease: "power3.out",
      });
    });
  }, [getCorners]);

  const handleMouseEnter = useCallback((e: Event) => {
    const target = e.currentTarget as HTMLElement;
    if (!target || !cursorRef.current) return;

    isHoveringRef.current = true;
    
    // Pause spinning and reset rotation
    spinTl.current?.pause();
    gsap.to(cursorRef.current, { 
      rotation: 0, 
      duration: 0.3, 
      overwrite: true 
    });

    // Get target bounds
    const rect = target.getBoundingClientRect();
    const cursorX = mousePosRef.current.x;
    const cursorY = mousePosRef.current.y;
    
    // Expand corners to surround the target
    const corners = getCorners();
    const padding = 10;
    
    // Calculate positions relative to cursor center
    const positions = [
      { x: rect.left - cursorX - padding, y: rect.top - cursorY - padding },      // Top Left
      { x: rect.right - cursorX + padding - 10, y: rect.top - cursorY - padding }, // Top Right
      { x: rect.right - cursorX + padding - 10, y: rect.bottom - cursorY + padding - 10 }, // Bottom Right
      { x: rect.left - cursorX - padding, y: rect.bottom - cursorY + padding - 10 }, // Bottom Left
    ];

    corners.forEach((corner, i) => {
      if (!corner) return;
      gsap.to(corner, {
        x: positions[i].x,
        y: positions[i].y,
        duration: hoverDuration,
        ease: "power2.out",
      });
    });
  }, [getCorners, hoverDuration]);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    
    // Reset corners to center
    resetCorners();
    
    // Resume spinning after a short delay
    setTimeout(() => {
      if (!isHoveringRef.current && spinTl.current) {
        spinTl.current.resume();
      }
    }, 50);
  }, [resetCorners]);

  const attachListeners = useCallback(() => {
    if (listenersAttachedRef.current) return;
    
    const elements = document.querySelectorAll(INTERACTIVE_SELECTORS);
    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });
    
    listenersAttachedRef.current = true;
  }, [handleMouseEnter, handleMouseLeave]);

  const detachListeners = useCallback(() => {
    const elements = document.querySelectorAll(INTERACTIVE_SELECTORS);
    elements.forEach((el) => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    });
    listenersAttachedRef.current = false;
  }, [handleMouseEnter, handleMouseLeave]);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;
    
    // Check if mobile/touch device
    const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    if (hasTouchScreen && isSmallScreen) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide default cursor
    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
      const style = document.createElement("style");
      style.textContent = "* { cursor: none !important; }";
      style.id = "cursor-hide-style";
      document.head.appendChild(style);
    }

    // Set initial position to mouse position or center
    mousePosRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    
    gsap.set(cursor, {
      x: mousePosRef.current.x,
      y: mousePosRef.current.y,
    });

    // Start spinning animation
    spinTl.current = gsap.timeline({ repeat: -1 })
      .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    // Mouse move handler - use RAF for smooth performance
    const moveHandler = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.05,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    // Click handlers
    const mouseDownHandler = () => {
      gsap.to([dotRef.current, corner1Ref.current, corner2Ref.current, corner3Ref.current, corner4Ref.current], {
        scale: 0.7,
        duration: 0.1,
      });
    };

    const mouseUpHandler = () => {
      gsap.to([dotRef.current, corner1Ref.current, corner2Ref.current, corner3Ref.current, corner4Ref.current], {
        scale: 1,
        duration: 0.2,
      });
    };

    // Attach listeners to existing elements
    attachListeners();

    // Set up mutation observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (element.matches?.(INTERACTIVE_SELECTORS)) {
              element.addEventListener("mouseenter", handleMouseEnter);
              element.addEventListener("mouseleave", handleMouseLeave);
            }
            // Check for interactive children
            const children = element.querySelectorAll?.(INTERACTIVE_SELECTORS);
            children?.forEach((child) => {
              child.addEventListener("mouseenter", handleMouseEnter);
              child.addEventListener("mouseleave", handleMouseLeave);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Global event listeners
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      detachListeners();
      observer.disconnect();
      spinTl.current?.kill();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.body.style.cursor = "";
      const style = document.getElementById("cursor-hide-style");
      if (style) style.remove();
    };
  }, [hideDefaultCursor, spinDuration, attachListeners, detachListeners, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "20px",
        height: "20px",
        pointerEvents: "none",
        zIndex: 99999,
        marginLeft: "-10px",
        marginTop: "-10px",
      }}
    >
      {/* Center dot - WHITE with glow */}
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "8px",
          height: "8px",
          backgroundColor: "#ffffff",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 12px rgba(255, 255, 255, 0.9), 0 0 24px rgba(237, 106, 90, 0.6)",
        }}
      />
      
      {/* Corner 1 - Top Left */}
      <div
        ref={corner1Ref}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "10px",
          height: "10px",
          border: "2px solid #ed6a5a",
          borderRight: "none",
          borderBottom: "none",
          transform: "translate(-10px, -10px)",
        }}
      />
      
      {/* Corner 2 - Top Right */}
      <div
        ref={corner2Ref}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "10px",
          height: "10px",
          border: "2px solid #ed6a5a",
          borderLeft: "none",
          borderBottom: "none",
          transform: "translate(6px, -10px)",
        }}
      />
      
      {/* Corner 3 - Bottom Right */}
      <div
        ref={corner3Ref}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "10px",
          height: "10px",
          border: "2px solid #ed6a5a",
          borderLeft: "none",
          borderTop: "none",
          transform: "translate(6px, 6px)",
        }}
      />
      
      {/* Corner 4 - Bottom Left */}
      <div
        ref={corner4Ref}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "10px",
          height: "10px",
          border: "2px solid #ed6a5a",
          borderRight: "none",
          borderTop: "none",
          transform: "translate(-10px, 6px)",
        }}
      />
    </div>
  );
}
