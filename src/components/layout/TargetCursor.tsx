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
  const cornersContainerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const isHoveringRef = useRef(false);
  const currentTargetRef = useRef<HTMLElement | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const INTERACTIVE_SELECTORS = 'a, button, input, textarea, select, [role="button"], .cursor-target, .featured-title-wrapper';

  // Define handlers first to avoid reference issues
  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    currentTargetRef.current = null;

    if (!cursorRef.current || !cornersContainerRef.current) return;

    // Resume spinning
    spinTl.current?.resume();

    // Reset corners container to center
    gsap.to(cornersContainerRef.current, {
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      rotation: 0,
      duration: hoverDuration,
      ease: "power2.out",
    });

    // Reset dot
    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 1,
        duration: 0.2,
      });
    }
  }, [hoverDuration]);

  const handleMouseEnter = useCallback((target: HTMLElement) => {
    if (!target || !cursorRef.current || !cornersContainerRef.current) return;

    isHoveringRef.current = true;
    currentTargetRef.current = target;

    // Stop spinning animation
    spinTl.current?.pause();

    // Get current rotation and animate to 0 (straight)
    const currentRotation = gsap.getProperty(cursorRef.current, "rotation") as number;
    gsap.to(cursorRef.current, {
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    // Get target bounds
    const rect = target.getBoundingClientRect();
    const padding = 10;

    // Position corners container to cover the target
    gsap.to(cornersContainerRef.current, {
      x: rect.left + rect.width / 2 - mousePosRef.current.x,
      y: rect.top + rect.height / 2 - mousePosRef.current.y,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
      rotation: -currentRotation, // Counter-rotate to stay straight
      duration: hoverDuration,
      ease: "power2.out",
    });

    // Scale down dot
    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 0.8,
        duration: 0.1,
      });
    }
  }, [hoverDuration]);

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
      handleMouseLeave();
      handleMouseEnter(target);
    }
  }, [handleMouseEnter, handleMouseLeave]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    if (hasTouchScreen && isSmallScreen) return;

    const cursor = cursorRef.current;
    const cornersContainer = cornersContainerRef.current;
    if (!cursor || !cornersContainer) return;

    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
      const style = document.createElement("style");
      style.textContent = "* { cursor: none !important; }";
      style.id = "cursor-hide-style";
      document.head.appendChild(style);
    }

    // Set initial positions
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mousePosRef.current = { x: centerX, y: centerY };

    gsap.set(cursor, { x: centerX, y: centerY });
    gsap.set(cornersContainer, { x: 0, y: 0, width: 40, height: 40 });

    // Start spinning animation for corners container only
    spinTl.current = gsap.timeline({ repeat: -1 })
      .to(cornersContainer, { rotation: "+=360", duration: spinDuration, ease: "none" });

    // Mouse move handler
    const moveHandler = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      gsap.set(cursor, {
        x: e.clientX,
        y: e.clientY,
      });

      checkElementUnderCursor();

      // If hovering, update corners container position to follow target
      if (isHoveringRef.current && currentTargetRef.current) {
        const target = currentTargetRef.current;
        const rect = target.getBoundingClientRect();
        const padding = 10;
        const currentRotation = gsap.getProperty(cursor, "rotation") as number;

        gsap.set(cornersContainerRef.current, {
          x: rect.left + rect.width / 2 - e.clientX,
          y: rect.top + rect.height / 2 - e.clientY,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
          rotation: -currentRotation,
        });
      }
    };

    // Scroll handler
    const scrollHandler = () => {
      checkElementUnderCursor();
      
      if (isHoveringRef.current && currentTargetRef.current) {
        const target = currentTargetRef.current;
        const rect = target.getBoundingClientRect();
        const padding = 10;
        const currentRotation = gsap.getProperty(cursor, "rotation") as number;

        gsap.set(cornersContainerRef.current, {
          x: rect.left + rect.width / 2 - mousePosRef.current.x,
          y: rect.top + rect.height / 2 - mousePosRef.current.y,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
          rotation: -currentRotation,
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
        const padding = 10;
        const currentRotation = gsap.getProperty(cursor, "rotation") as number;

        gsap.set(cornersContainerRef.current, {
          x: rect.left + rect.width / 2 - mousePosRef.current.x,
          y: rect.top + rect.height / 2 - mousePosRef.current.y,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
          rotation: -currentRotation,
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
  }, [hideDefaultCursor, spinDuration, hoverDuration, checkElementUnderCursor]);

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
      
      {/* Corners container - spins independently */}
      <div
        ref={cornersContainerRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "40px",
          height: "40px",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
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
    </div>
  );
}
