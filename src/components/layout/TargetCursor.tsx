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
  const cornersRef = useRef<HTMLDivElement>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const isHoveringRef = useRef(false);
  const currentTargetRef = useRef<HTMLElement | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const INTERACTIVE_SELECTORS = 'a, button, input, textarea, select, [role="button"], .cursor-target, .featured-title-wrapper';

  // Update corners position to stay locked on target
  const updateCornerPositions = useCallback(() => {
    const target = currentTargetRef.current;
    if (!target || !cornersRef.current) return;

    const rect = target.getBoundingClientRect();
    const padding = 8;

    gsap.set(cornersRef.current, {
      x: rect.left - padding,
      y: rect.top - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    });
  }, []);

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
    if (!target) return;

    isHoveringRef.current = true;
    currentTargetRef.current = target;

    if (cornersRef.current) {
      gsap.killTweensOf(cornersRef.current);
      gsap.set(cornersRef.current, { 
        opacity: 1,
        scale: 1 
      });
    }
    
    spinTl.current?.pause();
    updateCornerPositions();

    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 0.8,
        duration: 0.1,
      });
    }
  }, [updateCornerPositions]);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    currentTargetRef.current = null;

    if (cornersRef.current) {
      gsap.to(cornersRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: hoverDuration,
        ease: "power2.out",
      });
    }

    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 1,
        duration: 0.2,
      });
    }

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

    spinTl.current = gsap.timeline({ repeat: -1 })
      .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    // Mouse move handler
    const moveHandler = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      gsap.set(cursor, {
        x: e.clientX,
        y: e.clientY,
      });

      // Check element under cursor on every move
      checkElementUnderCursor();

      // If hovering, update corner positions
      if (isHoveringRef.current) {
        updateCornerPositions();
      }
    };

    // Scroll handler - check if cursor is now over an element
    const scrollHandler = () => {
      checkElementUnderCursor();
      if (isHoveringRef.current) {
        updateCornerPositions();
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

    // Periodic check for animated elements (like horizontal scrolling)
    checkIntervalRef.current = setInterval(() => {
      if (isHoveringRef.current) {
        updateCornerPositions();
      }
    }, 16); // ~60fps

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
  }, [hideDefaultCursor, spinDuration, checkElementUnderCursor, updateCornerPositions]);

  return (
    <>
      {/* Corners container */}
      <div
        ref={cornersRef}
        className="cursor-corners"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
        }}
      >
        {/* Corner 1 - Top Left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "12px",
            height: "12px",
            border: "2px solid #ed6a5a",
            borderRight: "none",
            borderBottom: "none",
          }}
        />
        {/* Corner 2 - Top Right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "12px",
            height: "12px",
            border: "2px solid #ed6a5a",
            borderLeft: "none",
            borderBottom: "none",
          }}
        />
        {/* Corner 3 - Bottom Right */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "12px",
            height: "12px",
            border: "2px solid #ed6a5a",
            borderLeft: "none",
            borderTop: "none",
          }}
        />
        {/* Corner 4 - Bottom Left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "12px",
            height: "12px",
            border: "2px solid #ed6a5a",
            borderRight: "none",
            borderTop: "none",
          }}
        />
      </div>

      {/* Main cursor with dot */}
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
      </div>
    </>
  );
}
