"use client";

import { useEffect, useCallback } from "react";
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

  useEffect(() => {
    // Add fun-theme-scroll class to html for proper scrolling
    document.documentElement.classList.add("fun-theme-scroll");
    document.body.classList.add("fun-theme-body");

    // Enable scrolling
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    const loader = document.getElementById("loader");
    const progressFill = document.getElementById("progress-fill");
    const checkpoints = document.querySelectorAll(".checkpoint");

    const hideLoader = () => {
      if (loader) {
        loader.classList.add("hidden");
      }
    };

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      if (progressFill) {
        progressFill.style.width = `${progress}%`;
      }

      checkpoints.forEach((checkpoint) => {
        const section = checkpoint.getAttribute("data-section");
        const element = section ? document.getElementById(section) : null;
        
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            checkpoint.classList.add("active");
          } else {
            checkpoint.classList.remove("active");
          }
        }
      });
    };

    // Hide loader after animation
    const timer = setTimeout(hideLoader, 2000);
    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove("fun-theme-scroll");
      document.body.classList.remove("fun-theme-body");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div 
      className="fun-theme-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        zIndex: 9999,
        background: "#d0d0d0"
      }}
    >
      <div className="fun-theme">
        <div className="page-wrapper" style={{ maxWidth: "1400px", margin: "0 auto", background: "#fff", border: "6px solid #000", boxShadow: "12px 12px 0 #000", marginBottom: "20px" }}>
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
