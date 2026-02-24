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
      const progress = (scrollTop / docHeight) * 100;
      
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

    setTimeout(hideLoader, 1500);
    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="fun-theme">
      <div className="page-wrapper">
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
  );
};

export default FunPage;
