"use client";

import { useEffect, useCallback, useRef, useState, Component, ReactNode } from "react";
import FunHero from "./FunHero";
import FunAbout from "./FunAbout";
import FunJourney from "./FunJourney";
import FunEducation from "./FunEducation";
import FunSkills from "./FunSkills";
import FunContact from "./FunContact";
import FunFooter from "./FunFooter";

interface Props {
  onThemeToggle: () => void;
}

// Error Boundary Class
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("FunPage Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '50px', 
          textAlign: 'center', 
          background: '#ff6b9d', 
          color: 'white',
          minHeight: '100vh'
        }}>
          <h1>Something went wrong</h1>
          <p>Please refresh the page and try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const FunPage = ({ onThemeToggle }: Props) => {
  const handleThemeToggle = useCallback(() => {
    onThemeToggle();
  }, [onThemeToggle]);

  const overlayRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [debugRendered, setDebugRendered] = useState(false);

  useEffect(() => {
    console.log("🎨 FunPage mounted!");
    setDebugRendered(true);

    // Hide entire default page (navbar + content)
    const defaultPage = document.querySelector('.page') as HTMLElement;
    const defaultNav = document.querySelector('.page nav') as HTMLElement;
    const lenisWrapper = document.querySelector('.lenis') as HTMLElement;
    
    console.log("🎨 FunPage - Hiding default page elements:", { defaultPage: !!defaultPage, defaultNav: !!defaultNav, lenisWrapper: !!lenisWrapper });
    
    if (defaultPage) {
      defaultPage.style.display = 'none';
    }
    if (defaultNav) {
      defaultNav.style.display = 'none';
    }
    if (lenisWrapper) {
      (lenisWrapper as HTMLElement).style.display = 'none';
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
      setIsLoading(false);
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
    const timer = setTimeout(hideLoader, 2500);
    
    if (overlay) {
      overlay.addEventListener("scroll", updateProgress);
    }
    updateProgress();

    return () => {
      console.log("🎨 FunPage cleanup!");
      clearTimeout(timer);
      if (overlay) {
        overlay.removeEventListener("scroll", updateProgress);
      }
      // Restore default page
      if (defaultPage) {
        defaultPage.style.display = '';
      }
      if (defaultNav) {
        defaultNav.style.display = '';
      }
      if (lenisWrapper) {
        (lenisWrapper as HTMLElement).style.display = '';
      }
    };
  }, []);

  console.log("🎨 FunPage rendering, isLoading:", isLoading);

  return (
    <ErrorBoundary>
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
          zIndex: 99999,
          background: "#d0d0d0"
        }}
      >
        {/* Debug Indicator - Remove in production */}
        {debugRendered && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 999999,
            background: '#ff6b9d',
            color: 'white',
            padding: '20px 40px',
            fontSize: '24px',
            fontWeight: 'bold',
            border: '4px solid black',
            boxShadow: '8px 8px 0 black',
            display: isLoading ? 'block' : 'none'
          }}>
            🎨 FUN THEME LOADING...
          </div>
        )}

        <div className="fun-theme" style={{ paddingBottom: '40px' }}>
          <div className="page-wrapper" style={{ marginTop: '20px' }}>
            <FunHero onThemeToggle={handleThemeToggle} isLoading={isLoading} />
            
            <div className="container">
              <FunAbout />
              <FunEducation />
              <FunJourney />
              <FunSkills />
              <FunContact />
            </div>
            
            <FunFooter />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default FunPage;
