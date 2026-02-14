"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";

export interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
}

const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
      const mobile = (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize cursor
  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const cursor = cursorRef.current;
    
    // Set initial position to center of screen
    gsap.set(cursor, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    // Make cursor visible
    setIsVisible(true);

    // Hide default cursor
    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
    }

    // Create spinning animation
    spinTl.current = gsap.timeline({ repeat: -1 })
      .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    // Mouse move handler
    const moveHandler = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power3.out",
      });
    };

    // Mouse down/up handlers for click effect
    const mouseDownHandler = () => {
      if (dotRef.current) {
        gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      }
      gsap.to(cursor, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      if (dotRef.current) {
        gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      }
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    // Hover detection
    let activeTarget: Element | null = null;

    const enterHandler = (e: MouseEvent) => {
      const target = (e.target as Element).closest(targetSelector);
      if (!target || activeTarget === target || !cursor) return;

      activeTarget = target;
      
      // Stop spinning
      spinTl.current?.pause();
      gsap.to(cursor, { rotation: 0, duration: 0.3 });

      // Get target bounds
      const rect = target.getBoundingClientRect();
      const cursorX = gsap.getProperty(cursor, "x") as number;
      const cursorY = gsap.getProperty(cursor, "y") as number;
      
      // Expand corners to surround the target
      cornersRef.current.forEach((corner, i) => {
        if (!corner) return;
        
        const positions = [
          { x: rect.left - cursorX - 8, y: rect.top - cursorY - 8 },
          { x: rect.right - cursorX - 8, y: rect.top - cursorY - 8 },
          { x: rect.right - cursorX - 8, y: rect.bottom - cursorY - 8 },
          { x: rect.left - cursorX - 8, y: rect.bottom - cursorY - 8 },
        ];

        gsap.to(corner, {
          x: positions[i].x,
          y: positions[i].y,
          duration: hoverDuration,
          ease: "power2.out",
        });
      });

      // Add leave handler
      const leaveHandler = () => {
        activeTarget = null;
        
        // Reset corners to center
        cornersRef.current.forEach((corner, i) => {
          if (!corner) return;
          const offset = 12;
          const positions = [
            { x: -offset, y: -offset },
            { x: offset, y: -offset },
            { x: offset, y: offset },
            { x: -offset, y: offset },
          ];
          gsap.to(corner, {
            x: positions[i].x,
            y: positions[i].y,
            duration: 0.3,
            ease: "power3.out",
          });
        });

        // Resume spinning
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
    window.addEventListener("mouseover", enterHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("mouseover", enterHandler);
      spinTl.current?.kill();
      document.body.style.cursor = "";
    };
  }, [isMobile, hideDefaultCursor, spinDuration, hoverDuration, targetSelector]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        width: "24px",
        height: "24px",
        marginLeft: "-12px",
        marginTop: "-12px",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Center dot */}
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#ed6a5a] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ boxShadow: "0 0 8px rgba(237, 106, 90, 0.6)" }}
      />
      
      {/* Corner 1 - Top Left */}
      <div
        ref={(el) => { if (el) cornersRef.current[0] = el; }}
        className="absolute top-1/2 left-1/2 w-3 h-3 border-2 border-[#ed6a5a]"
        style={{
          transform: "translate(-12px, -12px)",
          borderRight: "none",
          borderBottom: "none",
        }}
      />
      
      {/* Corner 2 - Top Right */}
      <div
        ref={(el) => { if (el) cornersRef.current[1] = el; }}
        className="absolute top-1/2 left-1/2 w-3 h-3 border-2 border-[#ed6a5a]"
        style={{
          transform: "translate(4px, -12px)",
          borderLeft: "none",
          borderBottom: "none",
        }}
      />
      
      {/* Corner 3 - Bottom Right */}
      <div
        ref={(el) => { if (el) cornersRef.current[2] = el; }}
        className="absolute top-1/2 left-1/2 w-3 h-3 border-2 border-[#ed6a5a]"
        style={{
          transform: "translate(4px, 4px)",
          borderLeft: "none",
          borderTop: "none",
        }}
      />
      
      {/* Corner 4 - Bottom Left */}
      <div
        ref={(el) => { if (el) cornersRef.current[3] = el; }}
        className="absolute top-1/2 left-1/2 w-3 h-3 border-2 border-[#ed6a5a]"
        style={{
          transform: "translate(-12px, 4px)",
          borderRight: "none",
          borderTop: "none",
        }}
      />
    </div>
  );
};

export default TargetCursor;
