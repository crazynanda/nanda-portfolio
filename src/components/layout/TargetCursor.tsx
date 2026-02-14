"use client";

import React, { useEffect, useRef } from "react";
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
  const isActiveRef = useRef(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;
    
    // Check if mobile/touch device
    const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    if (hasTouchScreen && isSmallScreen) {
      return; // Don't initialize on mobile
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide default cursor
    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
      // Also hide on all elements
      const style = document.createElement("style");
      style.textContent = `
        * { cursor: none !important; }
      `;
      style.id = "cursor-hide-style";
      document.head.appendChild(style);
    }

    // Set initial position to mouse position or center
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    
    gsap.set(cursor, {
      x: initialX,
      y: initialY,
    });

    // Start spinning animation
    spinTl.current = gsap.timeline({ repeat: -1 })
      .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    // Mouse move handler - follows mouse precisely
    const moveHandler = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "power2.out",
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

    // Hover detection
    let activeTarget: Element | null = null;

    const enterHandler = (e: MouseEvent) => {
      const target = (e.target as Element).closest(targetSelector);
      if (!target || activeTarget === target) return;

      activeTarget = target;
      isActiveRef.current = true;
      
      // Stop spinning
      spinTl.current?.pause();
      gsap.to(cursor, { rotation: 0, duration: 0.3, overwrite: true });

      // Get target bounds
      const rect = target.getBoundingClientRect();
      const cursorX = gsap.getProperty(cursor, "x") as number;
      const cursorY = gsap.getProperty(cursor, "y") as number;
      
      // Expand corners to surround the target
      const corners = [corner1Ref.current, corner2Ref.current, corner3Ref.current, corner4Ref.current];
      const offset = 8;
      const positions = [
        { x: rect.left - cursorX - offset, y: rect.top - cursorY - offset },
        { x: rect.right - cursorX + offset - 10, y: rect.top - cursorY - offset },
        { x: rect.right - cursorX + offset - 10, y: rect.bottom - cursorY + offset - 10 },
        { x: rect.left - cursorX - offset, y: rect.bottom - cursorY + offset - 10 },
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
        isActiveRef.current = false;
        
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

        // Resume spinning
        setTimeout(() => {
          if (!isActiveRef.current && spinTl.current) {
            spinTl.current.resume();
          }
        }, 50);

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
      const style = document.getElementById("cursor-hide-style");
      if (style) style.remove();
    };
  }, [hideDefaultCursor, spinDuration, hoverDuration, targetSelector]);

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
