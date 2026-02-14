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
  hoverDuration = 0.15,
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const corner1Ref = useRef<HTMLDivElement>(null);
  const corner2Ref = useRef<HTMLDivElement>(null);
  const corner3Ref = useRef<HTMLDivElement>(null);
  const corner4Ref = useRef<HTMLDivElement>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const isHoveringRef = useRef(false);
  const currentTargetRef = useRef<HTMLElement | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const INTERACTIVE_SELECTORS = 'a, button, input, textarea, select, [role="button"], .cursor-target, .featured-title-wrapper';

  // Check what element is under the cursor
  const checkElementUnderCursor = useCallback(() => {
    if (!mousePosRef.current.x && !mousePosRef.current.y) return;

    const elementUnderCursor = document.elementFromPoint(
      mousePosRef.current.x,
      mousePosRef.current.y
    );

    if (!elementUnderCursor) {
      if (isHoveringRef.current) {
        handleMouseLeave();
      }
      return;
    }

    const target = elementUnderCursor.closest(INTERACTIVE_SELECTORS) as HTMLElement;

    if (target && !isHoveringRef.current) {
      handleMouseEnter(target);
    } else if (!target && isHoveringRef.current) {
      handleMouseLeave();
    } else if (target && isHoveringRef.current && target !== currentTargetRef.current) {
      // Switching to a different target
      handleMouseLeave();
      handleMouseEnter(target);
    }
  }, []);

  const handleMouseEnter = useCallback((target: HTMLElement) => {
    if (!target || !cursorRef.current) return;

    isHoveringRef.current = true;
    currentTargetRef.current = target;

    // Stop spinning
    spinTl.current?.pause();

    // Get target bounds
    const rect = target.getBoundingClientRect();
    const cursorX = mousePosRef.current.x;
    const cursorY = mousePosRef.current.y;
    const padding = 8;
    
    // Expand corners to surround the target
    const corners = [corner1Ref.current, corner2Ref.current, corner3Ref.current, corner4Ref.current];
    const positions = [
      { x: rect.left - cursorX - padding, y: rect.top - cursorY - padding },           // Top Left
      { x: rect.right - cursorX + padding - 12, y: rect.top - cursorY - padding },     // Top Right  
      { x: rect.right - cursorX + padding - 12, y: rect.bottom - cursorY + padding - 12 }, // Bottom Right
      { x: rect.left - cursorX - padding, y: rect.bottom - cursorY + padding - 12 },   // Bottom Left
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

    // Scale down dot
    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 0.8,
        duration: 0.1,
      });
    }
  }, [hoverDuration]);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    currentTargetRef.current = null;

    // Reset corners to their original spinning positions
    const corners = [corner1Ref.current, corner2Ref.current, corner3Ref.current, corner4Ref.current];
    const centerPositions = [
      { x: -12, y: -12 },
      { x: 4, y: -12 },
      { x: 4, y: 4 },
      { x: -12, y: 4 },
    ];

    corners.forEach((corner, i) => {
      if (!corner) return;
      gsap.to(corner, {
        x: centerPositions[i].x,
        y: centerPositions[i].y,
        duration: hoverDuration,
        ease: "power2.out",
      });
    });

    // Reset dot
    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 1,
        duration: 0.2,
      });
    }

    // Resume spinning
    spinTl.current?.resume();
  }, [hoverDuration]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    if (hasTouchScreen && isSmallScreen) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
      const style = document.createElement("style");
      style.textContent = "* { cursor: none !important; }";
      style.id = "cursor-hide-style";
      document.head.appendChild(style);
    }

    gsap.set(cursor, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    // Start spinning animation for the whole cursor container
    spinTl.current = gsap.timeline({ repeat: -1 })
      .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    // Mouse move handler
    const moveHandler = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      gsap.set(cursor, {
        x: e.clientX,
        y: e.clientY,
      });

      checkElementUnderCursor();

      // If hovering, update corner positions to stay locked on target
      if (isHoveringRef.current && currentTargetRef.current) {
        const target = currentTargetRef.current;
        const rect = target.getBoundingClientRect();
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        const padding = 8;
        
        const corners = [corner1Ref.current, corner2Ref.current, corner3Ref.current, corner4Ref.current];
        const positions = [
          { x: rect.left - cursorX - padding, y: rect.top - cursorY - padding },
          { x: rect.right - cursorX + padding - 12, y: rect.top - cursorY - padding },
          { x: rect.right - cursorX + padding - 12, y: rect.bottom - cursorY + padding - 12 },
          { x: rect.left - cursorX - padding, y: rect.bottom - cursorY + padding - 12 },
        ];

        corners.forEach((corner, i) => {
          if (!corner) return;
          gsap.set(corner, {
            x: positions[i].x,
            y: positions[i].y,
          });
        });
      }
    };

    // Scroll handler
    const scrollHandler = () => {
      checkElementUnderCursor();
      if (isHoveringRef.current && currentTargetRef.current) {
        const target = currentTargetRef.current;
        const rect = target.getBoundingClientRect();
        const cursorX = mousePosRef.current.x;
        const cursorY = mousePosRef.current.y;
        const padding = 8;
        
        const corners = [corner1Ref.current, corner2Ref.current, corner3Ref.current, corner4Ref.current];
        const positions = [
          { x: rect.left - cursorX - padding, y: rect.top - cursorY - padding },
          { x: rect.right - cursorX + padding - 12, y: rect.top - cursorY - padding },
          { x: rect.right - cursorX + padding - 12, y: rect.bottom - cursorY + padding - 12 },
          { x: rect.left - cursorX - padding, y: rect.bottom - cursorY + padding - 12 },
        ];

        corners.forEach((corner, i) => {
          if (!corner) return;
          gsap.set(corner, {
            x: positions[i].x,
            y: positions[i].y,
          });
        });
      }
    };

    // Click handlers
    const mouseDownHandler = () => {
      gsap.to(dotRef.current, {
        scale: isHoveringRef.current ? 0.6 : 0.7,
        duration: 0.08,
      });
    };

    const mouseUpHandler = () => {
      gsap.to(dotRef.current, {
        scale: isHoveringRef.current ? 0.8 : 1,
        duration: 0.15,
      });
    };

    // Periodic check for animated elements
    checkIntervalRef.current = setInterval(() => {
      if (isHoveringRef.current && currentTargetRef.current) {
        const target = currentTargetRef.current;
        const rect = target.getBoundingClientRect();
        const cursorX = mousePosRef.current.x;
        const cursorY = mousePosRef.current.y;
        const padding = 8;
        
        const corners = [corner1Ref.current, corner2Ref.current, corner3Ref.current, corner4Ref.current];
        const positions = [
          { x: rect.left - cursorX - padding, y: rect.top - cursorY - padding },
          { x: rect.right - cursorX + padding - 12, y: rect.top - cursorY - padding },
          { x: rect.right - cursorX + padding - 12, y: rect.bottom - cursorY + padding - 12 },
          { x: rect.left - cursorX - padding, y: rect.bottom - cursorY + padding - 12 },
        ];

        corners.forEach((corner, i) => {
          if (!corner) return;
          gsap.set(corner, {
            x: positions[i].x,
            y: positions[i].y,
          });
        });
      }
    }, 16);

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("scroll", scrollHandler, { passive: true });
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      spinTl.current?.kill();
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      document.body.style.cursor = "";
      const style = document.getElementById("cursor-hide-style");
      if (style) style.remove();
    };
  }, [hideDefaultCursor, spinDuration, checkElementUnderCursor, hoverDuration]);

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
      {/* Center dot */}
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
          width: "12px",
          height: "12px",
          border: "2px solid #ed6a5a",
          borderRight: "none",
          borderBottom: "none",
          transform: "translate(-12px, -12px)",
        }}
      />
      
      {/* Corner 2 - Top Right */}
      <div
        ref={corner2Ref}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "12px",
          height: "12px",
          border: "2px solid #ed6a5a",
          borderLeft: "none",
          borderBottom: "none",
          transform: "translate(4px, -12px)",
        }}
      />
      
      {/* Corner 3 - Bottom Right */}
      <div
        ref={corner3Ref}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "12px",
          height: "12px",
          border: "2px solid #ed6a5a",
          borderLeft: "none",
          borderTop: "none",
          transform: "translate(4px, 4px)",
        }}
      />
      
      {/* Corner 4 - Bottom Left */}
      <div
        ref={corner4Ref}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "12px",
          height: "12px",
          border: "2px solid #ed6a5a",
          borderRight: "none",
          borderTop: "none",
          transform: "translate(-12px, 4px)",
        }}
      />
    </div>
  );
}
