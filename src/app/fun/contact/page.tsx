"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/fun.css";

export default function FunContactPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add FontAwesome CDN
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    link.integrity = 'sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      document.head.removeChild(link);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="fun-theme" style={{ minHeight: '100vh', background: '#ffd93d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem' }}>
        <div className="loader-wrapper">
          <div className="loader-letter">N</div>
          <div className="loader-letter">K</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fun-theme">
      {/* Navbar */}
      <nav className="navbar" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <div className="nav-content">
          <Link href="/fun" className="nav-brand">NK</Link>
          <div className="nav-right">
            <Link href="/fun" className="nav-link">Home</Link>
            <Link href="/fun#about" className="nav-link" onClick={(e) => scrollToSection(e, 'about')}>About</Link>
            <Link href="/fun#experience" className="nav-link" onClick={(e) => scrollToSection(e, 'experience')}>Journey</Link>
            <Link href="/fun#skills" className="nav-link" onClick={(e) => scrollToSection(e, 'skills')}>Skills</Link>
            <Link href="/fun/contact" className="nav-cta" style={{ background: '#ff6b9d' }}>Contact</Link>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: '80px' }}>
        {/* Paper Tear Top */}
        <div className="paper-tear paper-tear-top">
          <svg width="100%" height="30" viewBox="0 0 1440 30" preserveAspectRatio="none">
            <path d="M0,0 L0,15 Q10,5 20,15 T40,15 Q50,5 60,15 T80,15 Q90,20 100,15 T120,15 Q130,10 140,15 T160,15 Q170,5 180,15 T200,15 Q210,20 220,15 T240,15 Q250,8 260,15 T280,15 Q290,18 300,15 T320,15 Q330,5 340,15 T360,15 Q370,12 380,15 T400,15 Q410,20 420,15 T440,15 Q450,6 460,15 T480,15 Q490,16 500,15 T520,15 Q530,8 540,15 T560,15 Q570,20 580,15 T600,15 Q610,10 620,15 T640,15 Q650,5 660,15 T680,15 Q690,18 700,15 T720,15 Q730,12 740,15 T760,15 Q770,7 780,15 T800,15 Q810,20 820,15 T840,15 Q850,9 860,15 T880,15 Q890,14 900,15 T920,15 Q930,6 940,15 T960,15 Q970,19 980,15 T1000,15 Q1010,11 1020,15 T1040,15 Q1050,5 1060,15 T1080,15 Q1090,17 1100,15 T1120,15 Q1130,8 1140,15 T1160,15 Q1170,13 1180,15 T1200,15 Q1210,20 1220,15 T1240,15 Q1250,7 1260,15 T1280,15 Q1290,16 1300,15 T1320,15 Q1330,10 1340,15 T1360,15 Q1370,5 1380,15 T1400,15 Q1410,18 1420,15 T1440,15 L1440,0 Z" fill="#ffffff"/>
          </svg>
        </div>

        {/* Contact Header */}
        <section style={{ background: '#fff', padding: '4rem 2rem', borderBottom: '3px solid #000' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '1rem', fontFamily: "'Space Grotesk', sans-serif" }}>
              Get In Touch
            </h1>
            <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>
              Have a project in mind? Want to collaborate? Or just want to say hi? 
              I&apos;d love to hear from you!
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section style={{ background: '#d0d0d0', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {/* Email */}
              <a 
                href="mailto:nandablr242@gmail.com"
                style={{
                  background: '#fff',
                  border: '3px solid #000',
                  boxShadow: '8px 8px 0 #000',
                  padding: '2.5rem',
                  textDecoration: 'none',
                  color: '#000',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translate(-4px, -4px)';
                  e.currentTarget.style.boxShadow = '12px 12px 0 #000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '8px 8px 0 #000';
                }}
              >
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: '#ffd93d', 
                  border: '3px solid #000', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Email</h3>
                <p style={{ opacity: 0.7 }}>nandablr242@gmail.com</p>
                <span style={{ 
                  background: '#66d9ef', 
                  padding: '0.5rem 1rem', 
                  border: '2px solid #000',
                  fontWeight: 600,
                  marginTop: '0.5rem'
                }}>
                  Send an Email
                </span>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/nanda-kumar-544500213/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#fff',
                  border: '3px solid #000',
                  boxShadow: '8px 8px 0 #000',
                  padding: '2.5rem',
                  textDecoration: 'none',
                  color: '#000',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translate(-4px, -4px)';
                  e.currentTarget.style.boxShadow = '12px 12px 0 #000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '8px 8px 0 #000';
                }}
              >
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: '#0077b5', 
                  border: '3px solid #000', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg viewBox="0 0 24 24" fill="white" width="40" height="40">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>LinkedIn</h3>
                <p style={{ opacity: 0.7 }}>Connect with me</p>
                <span style={{ 
                  background: '#66d9ef', 
                  padding: '0.5rem 1rem', 
                  border: '2px solid #000',
                  fontWeight: 600,
                  marginTop: '0.5rem'
                }}>
                  View Profile
                </span>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/crazynanda"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#fff',
                  border: '3px solid #000',
                  boxShadow: '8px 8px 0 #000',
                  padding: '2.5rem',
                  textDecoration: 'none',
                  color: '#000',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translate(-4px, -4px)';
                  e.currentTarget.style.boxShadow = '12px 12px 0 #000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '8px 8px 0 #000';
                }}
              >
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: '#333', 
                  border: '3px solid #000', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg viewBox="0 0 24 24" fill="white" width="40" height="40">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>GitHub</h3>
                <p style={{ opacity: 0.7 }}>Check my code</p>
                <span style={{ 
                  background: '#66d9ef', 
                  padding: '0.5rem 1rem', 
                  border: '2px solid #000',
                  fontWeight: 600,
                  marginTop: '0.5rem'
                }}>
                  View Repos
                </span>
              </a>

              {/* Twitter */}
              <a 
                href="https://x.com/nandablr242"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#fff',
                  border: '3px solid #000',
                  boxShadow: '8px 8px 0 #000',
                  padding: '2.5rem',
                  textDecoration: 'none',
                  color: '#000',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translate(-4px, -4px)';
                  e.currentTarget.style.boxShadow = '12px 12px 0 #000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '8px 8px 0 #000';
                }}
              >
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: '#000', 
                  border: '3px solid #000', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg viewBox="0 0 24 24" fill="white" width="40" height="40">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Twitter / X</h3>
                <p style={{ opacity: 0.7 }}>Follow me</p>
                <span style={{ 
                  background: '#66d9ef', 
                  padding: '0.5rem 1rem', 
                  border: '2px solid #000',
                  fontWeight: 600,
                  marginTop: '0.5rem'
                }}>
                  View Profile
                </span>
              </a>
            </div>

            {/* Buy Me A Coffee */}
            <div style={{ 
              background: '#fff',
              border: '3px solid #000',
              boxShadow: '8px 8px 0 #000',
              padding: '3rem',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Like My Work?</h2>
              <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
                If you&apos;d like to support my work and keep me motivated, 
                you can buy me a coffee!
              </p>
              <a 
                href="https://www.buymeacoffee.com/nandakumar"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#ff6b9d',
                  border: '3px solid #000',
                  boxShadow: '4px 4px 0 #000',
                  padding: '1rem 2rem',
                  textDecoration: 'none',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0 #000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '4px 4px 0 #000';
                }}
              >
                <i className="fas fa-coffee"></i> Buy Me a Coffee
              </a>
            </div>
          </div>
        </section>

        {/* Paper Tear Bottom */}
        <div className="paper-tear paper-tear-bottom">
          <svg width="100%" height="30" viewBox="0 0 1440 30" preserveAspectRatio="none">
            <path d="M0,0 L0,15 Q10,5 20,15 T40,15 Q50,5 60,15 T80,15 Q90,20 100,15 T120,15 Q130,10 140,15 T160,15 Q170,5 180,15 T200,15 Q210,20 220,15 T240,15 Q250,8 260,15 T280,15 Q290,18 300,15 T320,15 Q330,5 340,15 T360,15 Q370,12 380,15 T400,15 Q410,20 420,15 T440,15 Q450,6 460,15 T480,15 Q490,16 500,15 T520,15 Q530,8 540,15 T560,15 Q570,20 580,15 T600,15 Q610,10 620,15 T640,15 Q650,5 660,15 T680,15 Q690,18 700,15 T720,15 Q730,12 740,15 T760,15 Q770,7 780,15 T800,15 Q810,20 820,15 T840,15 Q850,9 860,15 T880,15 Q890,14 900,15 T920,15 Q930,6 940,15 T960,15 Q970,19 980,15 T1000,15 Q1010,11 1020,15 T1040,15 Q1050,5 1060,15 T1080,15 Q1090,17 1100,15 T1120,15 Q1130,8 1140,15 T1160,15 Q1170,13 1180,15 T1200,15 Q1210,20 1220,15 T1240,15 Q1250,7 1260,15 T1280,15 Q1290,16 1300,15 T1320,15 Q1330,10 1340,15 T1360,15 Q1370,5 1380,15 T1400,15 Q1410,18 1420,15 T1440,15 L1440,0 Z" fill="#d0d0d0"/>
          </svg>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-compact">
            <div className="footer-main">
              <div className="footer-brand-compact">
                <strong>NK</strong>
                <span>Web Designer & Developer</span>
              </div>
              <div className="footer-nav-compact">
                <Link href="/fun">Home</Link>
                <Link href="/fun#about">About</Link>
                <Link href="/fun#experience">Journey</Link>
                <Link href="/fun#skills">Skills</Link>
              </div>
              <div className="footer-social-compact">
                <a href="https://github.com/crazynanda" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/nanda-kumar-544500213/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://x.com/nandablr242" target="_blank" rel="noopener noreferrer" title="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="mailto:nandablr242@gmail.com" title="Email">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-bottom-compact">
              <span>&copy; 2025 Nanda Kumar</span>
              <Link href="/fun/terminal" className="footer-terminal-link-compact">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zM7 10h2v2H7v-2zm0 4h2v2H7v-2zm4-4h6v2h-6v-2zm0 4h6v2h-6v-2z"/>
                </svg> Terminal
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
