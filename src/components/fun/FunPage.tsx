"use client";

import { useEffect, useCallback, useRef } from "react";
import FunHero from "./FunHero";
import FunAbout from "./FunAbout";
import FunJourney from "./FunJourney";
import FunSkills from "./FunSkills";
import FunContact from "./FunContact";
import FunFooter from "./FunFooter";

interface Props {
  onThemeToggle: () => void;
}

const FunPage = ({ onThemeToggle }: Props) => {
  const handleThemeToggle = useCallback(() => {
    onThemeToggle();
  }, [onThemeToggle]);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide the default page temporarily
    const defaultPage = document.querySelector('.page');
    if (defaultPage) {
      (defaultPage as HTMLElement).style.display = 'none';
    }

    const loader = document.getElementById("loader");
    const progressFill = document.getElementById("progress-fill");
    const checkpoints = document.querySelectorAll(".checkpoint");

    const hideLoader = () => {
      if (loader) {
        loader.classList.add("hidden");
        // Remove loader from DOM after animation
        setTimeout(() => {
          if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
          }
        }, 500);
      }
    };

    const updateProgress = () => {
      if (!overlayRef.current) return;
      
      const overlay = overlayRef.current;
      const scrollTop = overlay.scrollTop;
      const docHeight = overlay.scrollHeight - overlay.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      if (progressFill) {
        progressFill.style.width = `${progress}%`;
      }

      checkpoints.forEach((checkpoint) => {
        const section = checkpoint.getAttribute("data-section");
        const element = section ? document.getElementById(section) : null;
        
        if (element) {
          const rect = element.getBoundingClientRect();
          const overlayRect = overlay.getBoundingClientRect();
          if (rect.top - overlayRect.top <= overlay.clientHeight / 2) {
            checkpoint.classList.add("active");
          } else {
            checkpoint.classList.remove("active");
          }
        }
      });
    };

    // Hide loader after animation
    const timer = setTimeout(hideLoader, 2000);
    
    if (overlayRef.current) {
      overlayRef.current.addEventListener("scroll", updateProgress);
    }
    updateProgress();

    return () => {
      clearTimeout(timer);
      if (overlayRef.current) {
        overlayRef.current.removeEventListener("scroll", updateProgress);
      }
      // Restore default page
      if (defaultPage) {
        (defaultPage as HTMLElement).style.display = '';
      }
    };
  }, []);

  return (
    <div 
      ref={overlayRef}
      className="fun-theme-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        overflowX: "hidden",
        zIndex: 9999,
        background: "#d0d0d0"
      }}
    >
      <div className="fun-theme">
        <div 
          className="page-wrapper" 
          style={{ 
            maxWidth: "1400px", 
            margin: "0 auto", 
            background: "#fff", 
            border: "6px solid #000", 
            boxShadow: "12px 12px 0 #000", 
            marginBottom: "20px",
            marginTop: "20px",
            minHeight: "calc(100vh - 40px)"
          }}
        >
          <FunHero onThemeToggle={handleThemeToggle} />
          
          <div className="container" style={{ padding: "2rem 3rem" }}>
            <FunAbout />
            <FunJourney />
            <FunSkills />
            <FunContact />
          </div>
          
          <FunFooter />
        </div>
      </div>
    </div>
  );
};

export default FunPage;
