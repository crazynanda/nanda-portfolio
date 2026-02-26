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
    // Hide default page
    const defaultPage = document.querySelector('.page') as HTMLElement;
    if (defaultPage) {
      defaultPage.style.display = 'none';
    }

    // Setup scroll handler
    const overlay = overlayRef.current;
    const progressFill = document.getElementById("progress-fill");
    const checkpoints = document.querySelectorAll(".checkpoint");

    const hideLoader = () => {
      const loader = document.getElementById("loader");
      if (loader) {
        loader.classList.add("hidden");
        setTimeout(() => {
          if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
          }
        }, 500);
      }
    };

    const updateProgress = () => {
      if (!overlay) return;
      const scrollTop = overlay.scrollTop;
      const docHeight = overlay.scrollHeight - overlay.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      if (progressFill) {
        (progressFill as HTMLElement).style.width = `${progress}%`;
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
    
    if (overlay) {
      overlay.addEventListener("scroll", updateProgress);
    }
    updateProgress();

    return () => {
      clearTimeout(timer);
      if (overlay) {
        overlay.removeEventListener("scroll", updateProgress);
      }
      // Restore default page
      if (defaultPage) {
        defaultPage.style.display = '';
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
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 9999,
        background: "#d0d0d0"
      }}
    >
      <div className="fun-theme" style={{ paddingBottom: '40px' }}>
        <div className="page-wrapper" style={{ marginTop: '20px' }}>
          <FunHero onThemeToggle={handleThemeToggle} />
          
          <div className="container">
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
