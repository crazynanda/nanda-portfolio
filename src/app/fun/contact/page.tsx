"use client";

import { useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import FunFooter from "@/components/fun/FunFooter";

export default function FunContactPage() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default page
    const defaultPage = document.querySelector('.page') as HTMLElement;
    if (defaultPage) {
      defaultPage.style.display = 'none';
    }

    const overlay = overlayRef.current;
    const progressFill = document.getElementById("progress-fill");
    const checkpoints = document.querySelectorAll(".checkpoint");

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

    if (overlay) {
      overlay.addEventListener("scroll", updateProgress);
    }
    updateProgress();

    return () => {
      if (overlay) {
        overlay.removeEventListener("scroll", updateProgress);
      }
      if (defaultPage) {
        defaultPage.style.display = '';
      }
    };
  }, []);

  return (
    <div 
      ref={overlayRef}
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
      <div style={{ paddingBottom: '40px' }}>
        <div style={{ 
          marginTop: '20px', 
          maxWidth: '1400px', 
          marginLeft: 'auto', 
          marginRight: 'auto',
          background: '#fff',
          border: '6px solid #000',
          boxShadow: '12px 12px 0 #000',
          marginBottom: '20px'
        }}>
          {/* Navbar */}
          <nav className="navbar">
            <div className="nav-content">
              <Link href="/" className="nav-brand">NK</Link>
              <div className="nav-right">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/fun" className="nav-link">Fun Theme</Link>
                <Link href="/contact" className="nav-cta">Default Contact</Link>
              </div>
            </div>
          </nav>

          {/* Contact Section */}
          <div className="container" style={{ padding: '4rem 3rem' }}>
            <section id="contact">
              <h2 className="section-title-center">GET IN TOUCH</h2>
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <p className="contact-intro" style={{ fontSize: '1.25rem', textAlign: 'center', marginBottom: '2rem' }}>
                  Let&apos;s build something amazing together
                </p>
                <div className="contact-grid" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '1.5rem' 
                }}>
                  <a 
                    href="https://linkedin.com/in/nanda-kumar-544500213/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-card"
                    style={{
                      background: '#fff',
                      border: '3px solid #000',
                      boxShadow: '4px 4px 0 #000',
                      padding: '2rem',
                      textAlign: 'center',
                      textDecoration: 'none',
                      color: '#000',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <i className="fab fa-linkedin" style={{ fontSize: '2.5rem' }}></i>
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://github.com/crazynanda" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-card"
                    style={{
                      background: '#fff',
                      border: '3px solid #000',
                      boxShadow: '4px 4px 0 #000',
                      padding: '2rem',
                      textAlign: 'center',
                      textDecoration: 'none',
                      color: '#000',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <i className="fab fa-github" style={{ fontSize: '2.5rem' }}></i>
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="mailto:nandablr242@gmail.com" 
                    className="contact-card"
                    style={{
                      background: '#fff',
                      border: '3px solid #000',
                      boxShadow: '4px 4px 0 #000',
                      padding: '2rem',
                      textAlign: 'center',
                      textDecoration: 'none',
                      color: '#000',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <i className="fas fa-envelope" style={{ fontSize: '2.5rem' }}></i>
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </section>
          </div>

          <FunFooter />
        </div>
      </div>
    </div>
  );
}
