"use client";

import { useState, useEffect, ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import FunPage from "@/components/fun/FunPage";

interface Props {
  onThemeToggle: () => void;
}

// Simple error boundary wrapper
function ErrorBoundary({ children }: { children: ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        background: '#ff6b9d', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 999999
      }}>
        <div style={{ 
          background: 'white', 
          padding: '40px', 
          border: '4px solid black',
          boxShadow: '8px 8px 0 black',
          textAlign: 'center'
        }}>
          <h1>Something went wrong</h1>
          <p>Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#66d9ef',
              border: '2px solid black',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function ThemeToggleController({ onThemeToggle }: Props) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (theme === "fun") {
    return (
      <ErrorBoundary>
        <FunPage onThemeToggle={onThemeToggle} />
      </ErrorBoundary>
    );
  }

  return null;
}
