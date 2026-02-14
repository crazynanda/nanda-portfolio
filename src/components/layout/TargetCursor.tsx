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
  const corner1Ref = useRef<HTMLDivElement>(null);
  const corner2Ref = useRef<HTMLDivElement>(null);
  const corner3Ref = useRef<HTMLDivElement>(null);
  const corner4Ref = useRef<HTMLDivElement>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const isHoveringRef = useRef(false);
  const currentTargetRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number>(0);

  const INTERACTIVE_SELECTORS = 'a, button, input, textarea, select, [role="button"], .cursor-target';

  // Update corners position to stay locked on target
  const updateCornerPositions = useCallback(() => {
    const target = currentTargetRef.current;
    if (!target || !cornersRef.current) return;

    const rect = target.getBoundingClientRect();
    const padding = 8;

    // Position corners container to cover the target area
    gsap.set(cornersRef.current, {
      x: rect.left - padding,
      y: rect.top - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    });
  }, []);

  const handleMouseEnter = useCallback((e: Event) => {
    const target = e.currentTarget as HTMLElement;
    if (!target) return;

    isHoveringRef.current = true;
    currentTargetRef.current = target;

    // Immediate response - no animation delay
    if (cornersRef.current) {
      gsap.killTweensOf(cornersRef.current);
      gsap.set(cornersRef.current, { 
        opacity: 1,
        scale: 1 
      });
    }
    
    // Stop spinning
    spinTl.current?.pause();

    // Update corner positions immediately
    updateCornerPositions();

    // Scale down dot slightly to indicate interaction
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

    // Hide corners container
    if (cornersRef.current) {
      gsap.to(cornersRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: hoverDuration,
        ease: "power2.out",
      });
    }

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

    // Check if mobile
    const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    if (hasTouchScreen && isSmallScreen) return;

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

    // Set initial cursor position
    gsap.set(cursor, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    // Start spinning animation
    spinTl.current = gsap.timeline({ repeat: -1 })
      .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    // Mouse move handler
    const moveHandler = (e: MouseEvent) => {
      // Update cursor position immediately
      gsap.set(cursor, {
        x: e.clientX,
        y: e.clientY,
      });

      // If hovering, update corner positions to stay locked on target
      if (isHoveringRef.current && currentTargetRef.current) {
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

    // Attach listeners to elements
    const attachListeners = () => {
      const elements = document.querySelectorAll(INTERACTIVE_SELECTORS);
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    attachListeners();

    // Mutation observer for dynamic elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (element.matches?.(INTERACTIVE_SELECTORS)) {
              element.addEventListener("mouseenter", handleMouseEnter);
              element.addEventListener("mouseleave", handleMouseLeave);
            }
            const children = element.querySelectorAll?.(INTERACTIVE_SELECTORS);
            children?.forEach((child) => {
              child.addEventListener("mouseenter", handleMouseEnter);
              child.addEventListener("mouseleave", handleMouseLeave);
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Global event listeners
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      observer.disconnect();
      spinTl.current?.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
      const style = document.getElementById("cursor-hide-style");
      if (style) style.remove();
    };
  }, [hideDefaultCursor, spinDuration, handleMouseEnter, handleMouseLeave, updateCornerPositions]);

  return (
    <>
      {/* Corners container - positioned independently */}
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
          ref={corner1Ref}
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
          ref={corner2Ref}
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
          ref={corner3Ref}
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
          ref={corner4Ref}
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
