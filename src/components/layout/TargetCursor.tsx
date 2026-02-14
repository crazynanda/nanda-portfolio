"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
}

export default function TargetCursor({
  targetSelector = ".cursor-target",
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
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if mobile
    const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    if (hasTouchScreen && isSmallScreen) {
      return;
    }

    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    
    // Set initial position
    gsap.set(cursor, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    // Hide default cursor
    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
    }

    // Create spinning animation for the corners container
    spinTl.current = gsap.timeline({ repeat: -1 })
      .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    // Mouse move handler
    const moveHandler = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });
    };

    // Click handlers
    const mouseDownHandler = () => {
      gsap.to([dotRef.current, corner1Ref.current, corner2Ref.current, corner3Ref.current, corner4Ref.current], {
        scale: 0.8,
        duration: 0.15,
      });
    };

    const mouseUpHandler = () => {
      gsap.to([dotRef.current, corner1Ref.current, corner2Ref.current, corner3Ref.current, corner4Ref.current], {
        scale: 1,
        duration: 0.15,
      });
    };

    // Hover detection
    let activeTarget: Element | null = null;

    const enterHandler = (e: MouseEvent) => {
      const target = (e.target as Element).closest(targetSelector);
      if (!target || activeTarget === target) return;

      activeTarget = target;
      
      // Stop spinning
      spinTl.current?.pause();
      gsap.to(cursor, { rotation: 0, duration: 0.3, overwrite: true });

      // Get target bounds
      const rect = target.getBoundingClientRect();
      const cursorX = gsap.getProperty(cursor, "x") as number;
      const cursorY = gsap.getProperty(cursor, "y") as number;
      
      // Expand corners to surround the target
      const corners = [corner1Ref.current, corner2Ref.current, corner3Ref.current, corner4Ref.current];
      const positions = [
        { x: rect.left - cursorX - 6, y: rect.top - cursorY - 6 },
        { x: rect.right - cursorX + 6, y: rect.top - cursorY - 6 },
        { x: rect.right - cursorX + 6, y: rect.bottom - cursorY + 6 },
        { x: rect.left - cursorX - 6, y: rect.bottom - cursorY + 6 },
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

      // Leave handler
      const leaveHandler = () => {
        activeTarget = null;
        
        // Reset corners to center positions
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

        // Resume spinning after a short delay
        setTimeout(() => {
          if (!activeTarget) {
            spinTl.current?.resume();
          }
        }, 100);

        target.removeEventListener("mouseleave", leaveHandler);
      };

      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    document.addEventListener("mouseover", enterHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      document.removeEventListener("mouseover", enterHandler);
      spinTl.current?.kill();
      document.body.style.cursor = "";
    };
  }, [hideDefaultCursor, spinDuration, hoverDuration, targetSelector]);

  // Don't render on server or mobile
  if (!mounted) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        width: "20px",
        height: "20px",
        zIndex: 99999,
        marginLeft: "-10px",
        marginTop: "-10px",
      }}
    >
      {/* Center dot - WHITE for visibility */}
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
        style={{
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(237, 106, 90, 0.4)",
        }}
      />
      
      {/* Corner 1 - Top Left */}
      <div
        ref={corner1Ref}
        className="absolute top-1/2 left-1/2 w-2.5 h-2.5 border-2"
        style={{
          transform: "translate(-10px, -10px)",
          borderColor: "#ed6a5a",
          borderRight: "none",
          borderBottom: "none",
        }}
      />
      
      {/* Corner 2 - Top Right */}
      <div
        ref={corner2Ref}
        className="absolute top-1/2 left-1/2 w-2.5 h-2.5 border-2"
        style={{
          transform: "translate(6px, -10px)",
          borderColor: "#ed6a5a",
          borderLeft: "none",
          borderBottom: "none",
        }}
      />
      
      {/* Corner 3 - Bottom Right */}
      <div
        ref={corner3Ref}
        className="absolute top-1/2 left-1/2 w-2.5 h-2.5 border-2"
        style={{
          transform: "translate(6px, 6px)",
          borderColor: "#ed6a5a",
          borderLeft: "none",
          borderTop: "none",
        }}
      />
      
      {/* Corner 4 - Bottom Left */}
      <div
        ref={corner4Ref}
        className="absolute top-1/2 left-1/2 w-2.5 h-2.5 border-2"
        style={{
          transform: "translate(-10px, 6px)",
          borderColor: "#ed6a5a",
          borderRight: "none",
          borderTop: "none",
        }}
      />
    </div>
  );
}
