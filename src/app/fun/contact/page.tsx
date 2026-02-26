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
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  <i className="fas fa-envelope"></i>
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
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: '#fff'
                }}>
                  <i className="fab fa-linkedin"></i>
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
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: '#fff'
                }}>
                  <i className="fab fa-github"></i>
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
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: '#fff'
                }}>
                  <i className="fab fa-x-twitter"></i>
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
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/nanda-kumar-544500213/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://x.com/nandablr242" target="_blank" rel="noopener noreferrer" title="Twitter">
                  <i className="fab fa-x-twitter"></i>
                </a>
                <a href="mailto:nandablr242@gmail.com" title="Email">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
            <div className="footer-bottom-compact">
              <span>&copy; 2025 Nanda Kumar</span>
              <Link href="/fun/terminal" className="footer-terminal-link-compact">
                <i className="fas fa-terminal"></i> Terminal
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
