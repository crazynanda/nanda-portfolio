"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import "@/styles/fun.css";

export default function FunPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState("Hi there! 👋");

  // Add FontAwesome CDN
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    link.integrity = 'sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Matrix typing effect for greeting
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    const targetText = "Hi there! 👋";
    let iteration = 0;
    
    if (!isLoading) {
      const interval = setInterval(() => {
        setGreeting(
          targetText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return targetText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        
        if (iteration >= targetText.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Hide loader after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Scroll progress and checkpoint navigation
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      const progressFill = document.getElementById('progress-fill');
      if (progressFill) {
        progressFill.style.width = scrolled + '%';
      }

      // Update checkpoints based on scroll position
      const sections = ['hero', 'about', 'experience', 'skills', 'contact'];
      const checkpoints = document.querySelectorAll('.checkpoint');
      
      sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            checkpoints.forEach((cp, cpIndex) => {
              if (cpIndex === index) {
                cp.classList.add('active');
              } else {
                cp.classList.remove('active');
              }
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div className="fun-theme">
      {/* Loading Screen */}
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-shapes">
            <div className="loader-shape-svg loader-shape-1">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                <rect x="6" y="6" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4"/>
                <rect x="3" y="3" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4"/>
                <path d="M35 40 L20 50 L35 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M65 40 L80 50 L65 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="55" y1="35" x2="45" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="loader-shape-svg loader-shape-2">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                <rect x="6" y="6" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
                <rect x="3" y="3" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
                <path d="M25 35 L40 50 L25 65" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="50" y1="65" x2="75" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="loader-shape-svg loader-shape-3">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                <rect x="6" y="6" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" strokeWidth="4"/>
                <rect x="3" y="3" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" strokeWidth="4"/>
                <rect x="20" y="20" width="60" height="60" rx="3" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
                <rect x="30" y="20" width="40" height="20" fill="#66d9ef" stroke="#000" strokeWidth="3"/>
                <rect x="35" y="55" width="30" height="15" rx="2" fill="#000"/>
                <circle cx="50" cy="35" r="3" fill="#000"/>
              </svg>
            </div>
          </div>
          <div className="loader-wrapper">
            <div className="loader-letter">N</div>
            <div className="loader-letter">K</div>
          </div>
          <div className="loader-progress-bar">
            <div className="loader-progress-fill"></div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar-fill" id="progress-fill"></div>
            <div className="progress-checkpoints">
              <div className="checkpoint active" data-section="hero" onClick={(e) => scrollToSection(e, 'hero')}>
                <div className="checkpoint-dot"></div>
                <span className="checkpoint-label">Home</span>
              </div>
              <div className="checkpoint" data-section="about" onClick={(e) => scrollToSection(e, 'about')}>
                <div className="checkpoint-dot"></div>
                <span className="checkpoint-label">About</span>
              </div>
              <div className="checkpoint" data-section="experience" onClick={(e) => scrollToSection(e, 'experience')}>
                <div className="checkpoint-dot"></div>
                <span className="checkpoint-label">Journey</span>
              </div>
              <div className="checkpoint" data-section="skills" onClick={(e) => scrollToSection(e, 'skills')}>
                <div className="checkpoint-dot"></div>
                <span className="checkpoint-label">Skills</span>
              </div>
              <div className="checkpoint" data-section="contact" onClick={(e) => scrollToSection(e, 'contact')}>
                <div className="checkpoint-dot"></div>
                <span className="checkpoint-label">Contact</span>
              </div>
            </div>
          </div>

          {/* Navbar */}
          <nav className="navbar">
            <div className="nav-content">
              <a href="#" className="nav-brand">NK</a>
              <div className="nav-right">
                <a href="#hero" className="nav-link" onClick={(e) => scrollToSection(e, 'hero')}>Home</a>
                <a href="#about" className="nav-link" onClick={(e) => scrollToSection(e, 'about')}>About</a>
                <a href="#experience" className="nav-link" onClick={(e) => scrollToSection(e, 'experience')}>Journey</a>
                <a href="#skills" className="nav-link" onClick={(e) => scrollToSection(e, 'skills')}>Skills</a>
                <Link href="/fun/contact" className="nav-link" style={{ background: '#ff6b9d', color: '#000' }}>Contact</Link>
                <Link href="/fun/terminal" className="nav-link" style={{ background: '#66d9ef', color: '#000' }}><i className="fas fa-terminal"></i> Terminal</Link>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="hero" id="hero">
            <div className="hero-content">
              <div className="hero-left">
                <p className="hero-greeting">{greeting}</p>
                <h1 className="hero-name">I&apos;m Nanda Kumar.</h1>
                <p className="hero-description">
                  Based in Bangalore, India, I&apos;m a passionate student and freelancer. Currently pursuing my BCA in AI/ML, 
                  I run my own startup called Zeridex, where we build AI-powered websites and automation systems for modern businesses.
                  I love exploring new technologies and staying on the cutting edge of what&apos;s possible.
                </p>
                <div className="hero-social">
                  <a href="https://github.com/crazynanda" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/nanda-kumar-544500213/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://x.com/nandablr242" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
                <div className="hero-cta-container">
                  <div className="coffee-cta-wrapper">
                    <div className="coffee-arrow">
                      <span className="coffee-arrow-text">Buy me a coffee</span>
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 140'%3E%3Cpath d='M20 40 Q10 40 10 50 Q10 60 20 60 L120 60 Q130 60 130 50 Q130 40 120 40 Z' fill='%23ffd93d' stroke='%23000' stroke-width='4'/%3E%3Cpath d='M15 50 Q25 45 35 50 Q45 55 55 50' stroke='%23000' stroke-width='3' fill='none'/%3E%3Crect x='25' y='35' width='90' height='15' rx='3' fill='%23ff6b9d' stroke='%23000' stroke-width='3'/%3E%3C/svg%3E" alt="arrow" className="coffee-arrow-img" width="140" height="140" />
                    </div>
                    <a href="https://www.buymeacoffee.com/nandakumar" target="_blank" rel="noopener noreferrer" className="btn-coffee">
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52'%3E%3Cpath d='M10 20 Q2 20 2 26 Q2 32 10 32 L42 32 Q50 32 50 26 Q50 20 42 20 Z' fill='%23a8e6cf' stroke='%23000' stroke-width='3'/%3E%3Cpath d='M8 26 Q14 23 20 26 Q26 29 32 26' stroke='%23000' stroke-width='2' fill='none'/%3E%3Crect x='14' y='18' width='24' height='8' rx='2' fill='%23ffd93d' stroke='%23000' stroke-width='2'/%3E%3Ccircle cx='40' cy='10' r='8' fill='%23ff6b9d' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E" alt="Coffee" className="coffee-icon-img" width="52" height="52" />
                    </a>
                  </div>
                  <Link href="/fun/contact" className="btn-cta">Get in Touch!</Link>
                </div>
              </div>
              <div className="hero-right">
                <div className="hero-image-wrapper">
                  <div className="tape-sticker"></div>
                  <img src="/images/about/portrait.jpg" alt="Nanda Kumar" className="hero-photo" width={400} height={400} />
                  <div className="deco-code">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                      <rect x="6" y="6" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4"/>
                      <rect x="3" y="3" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4"/>
                      <path d="M35 40 L20 50 L35 60" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
                      <path d="M65 40 L80 50 L65 60" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
                      <line x1="55" y1="35" x2="45" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="deco-terminal">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                      <rect x="6" y="6" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
                      <rect x="3" y="3" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
                      <path d="M25 35 L40 50 L25 65" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
                      <line x1="50" y1="65" x2="75" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="deco-floppy">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                      <rect x="6" y="6" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" strokeWidth="4"/>
                      <rect x="3" y="3" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" strokeWidth="4"/>
                      <rect x="20" y="20" width="60" height="60" rx="3" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
                    </svg>
                  </div>
                  <div className="deco-label">Web Developer</div>
                </div>
              </div>
            </div>
            <div className="tech-badges">
              <span className="tech-badge"><i className="fab fa-react"></i> React</span>
              <span className="tech-badge"><i className="fab fa-node-js"></i> Node.js</span>
              <span className="tech-badge"><i className="fab fa-python"></i> Python</span>
              <span className="tech-badge"><i className="fab fa-js"></i> JavaScript</span>
              <span className="tech-badge"><i className="fab fa-html5"></i> HTML</span>
              <span className="tech-badge"><i className="fab fa-css3"></i> CSS</span>
              <span className="tech-badge"><i className="fab fa-aws"></i> AWS</span>
              <span className="tech-badge"><i className="fab fa-docker"></i> Docker</span>
            </div>
          </section>

          {/* Paper Tear Top */}
          <div className="paper-tear paper-tear-top">
            <svg width="100%" height="30" viewBox="0 0 1440 30" preserveAspectRatio="none">
              <path d="M0,0 L0,15 Q10,5 20,15 T40,15 Q50,5 60,15 T80,15 Q90,20 100,15 T120,15 Q130,10 140,15 T160,15 Q170,5 180,15 T200,15 Q210,20 220,15 T240,15 Q250,8 260,15 T280,15 Q290,18 300,15 T320,15 Q330,5 340,15 T360,15 Q370,12 380,15 T400,15 Q410,20 420,15 T440,15 Q450,6 460,15 T480,15 Q490,16 500,15 T520,15 Q530,8 540,15 T560,15 Q570,20 580,15 T600,15 Q610,10 620,15 T640,15 Q650,5 660,15 T680,15 Q690,18 700,15 T720,15 Q730,12 740,15 T760,15 Q770,7 780,15 T800,15 Q810,20 820,15 T840,15 Q850,9 860,15 T880,15 Q890,14 900,15 T920,15 Q930,6 940,15 T960,15 Q970,19 980,15 T1000,15 Q1010,11 1020,15 T1040,15 Q1050,5 1060,15 T1080,15 Q1090,17 1100,15 T1120,15 Q1130,8 1140,15 T1160,15 Q1170,13 1180,15 T1200,15 Q1210,20 1220,15 T1240,15 Q1250,7 1260,15 T1280,15 Q1290,16 1300,15 T1320,15 Q1330,10 1340,15 T1360,15 Q1370,5 1380,15 T1400,15 Q1410,18 1420,15 T1440,15 L1440,0 Z" fill="#ffffff"/>
              <path d="M0,30 L0,15 Q10,5 20,15 T40,15 Q50,5 60,15 T80,15 Q90,20 100,15 T120,15 Q130,10 140,15 T160,15 Q170,5 180,15 T200,15 Q210,20 220,15 T240,15 Q250,8 260,15 T280,15 Q290,18 300,15 T320,15 Q330,5 340,15 T360,15 Q370,12 380,15 T400,15 Q410,20 420,15 T440,15 Q450,6 460,15 T480,15 Q490,16 500,15 T520,15 Q530,8 540,15 T560,15 Q570,20 580,15 T600,15 Q610,10 620,15 T640,15 Q650,5 660,15 T680,15 Q690,18 700,15 T720,15 Q730,12 740,15 T760,15 Q770,7 780,15 T800,15 Q810,20 820,15 T840,15 Q850,9 860,15 T880,15 Q890,14 900,15 T920,15 Q930,6 940,15 T960,15 Q970,19 980,15 T1000,15 Q1010,11 1020,15 T1040,15 Q1050,5 1060,15 T1080,15 Q1090,17 1100,15 T1120,15 Q1130,8 1140,15 T1160,15 Q1170,13 1180,15 T1200,15 Q1210,20 1220,15 T1240,15 Q1250,7 1260,15 T1280,15 Q1290,16 1300,15 T1320,15 Q1330,10 1340,15 T1360,15 Q1370,5 1380,15 T1400,15 Q1410,18 1420,15 T1440,15 L1440,30 Z" fill="#d0d0d0"/>
            </svg>
          </div>
          <div className="page-gap"></div>

          {/* Paper Tear Bottom */}
          <div className="paper-tear paper-tear-bottom">
            <svg width="100%" height="30" viewBox="0 0 1440 30" preserveAspectRatio="none">
              <path d="M0,0 L0,15 Q10,5 20,15 T40,15 Q50,5 60,15 T80,15 Q90,20 100,15 T120,15 Q130,10 140,15 T160,15 Q170,5 180,15 T200,15 Q210,20 220,15 T240,15 Q250,8 260,15 T280,15 Q290,18 300,15 T320,15 Q330,5 340,15 T360,15 Q370,12 380,15 T400,15 Q410,20 420,15 T440,15 Q450,6 460,15 T480,15 Q490,16 500,15 T520,15 Q530,8 540,15 T560,15 Q570,20 580,15 T600,15 Q610,10 620,15 T640,15 Q650,5 660,15 T680,15 Q690,18 700,15 T720,15 Q730,12 740,15 T760,15 Q770,7 780,15 T800,15 Q810,20 820,15 T840,15 Q850,9 860,15 T880,15 Q890,14 900,15 T920,15 Q930,6 940,15 T960,15 Q970,19 980,15 T1000,15 Q1010,11 1020,15 T1040,15 Q1050,5 1060,15 T1080,15 Q1090,17 1100,15 T1120,15 Q1130,8 1140,15 T1160,15 Q1170,13 1180,15 T1200,15 Q1210,20 1220,15 T1240,15 Q1250,7 1260,15 T1280,15 Q1290,16 1300,15 T1320,15 Q1330,10 1340,15 T1360,15 Q1370,5 1380,15 T1400,15 Q1410,18 1420,15 T1440,15 L1440,0 Z" fill="#d0d0d0"/>
              <path d="M0,30 L0,15 Q10,5 20,15 T40,15 Q50,5 60,15 T80,15 Q90,20 100,15 T120,15 Q130,10 140,15 T160,15 Q170,5 180,15 T200,15 Q210,20 220,15 T240,15 Q250,8 260,15 T280,15 Q290,18 300,15 T320,15 Q330,5 340,15 T360,15 Q370,12 380,15 T400,15 Q410,20 420,15 T440,15 Q450,6 460,15 T480,15 Q490,16 500,15 T520,15 Q530,8 540,15 T560,15 Q570,20 580,15 T600,15 Q610,10 620,15 T640,15 Q650,5 660,15 T680,15 Q690,18 700,15 T720,15 Q730,12 740,15 T760,15 Q770,7 780,15 T800,15 Q810,20 820,15 T840,15 Q850,9 860,15 T880,15 Q890,14 900,15 T920,15 Q930,6 940,15 T960,15 Q970,19 980,15 T1000,15 Q1010,11 1020,15 T1040,15 Q1050,5 1060,15 T1080,15 Q1090,17 1100,15 T1120,15 Q1130,8 1140,15 T1160,15 Q1170,13 1180,15 T1200,15 Q1210,20 1220,15 T1240,15 Q1250,7 1260,15 T1280,15 Q1290,16 1300,15 T1320,15 Q1330,10 1340,15 T1360,15 Q1370,5 1380,15 T1400,15 Q1410,18 1420,15 T1440,15 L1440,30 Z" fill="#ffffff"/>
            </svg>
          </div>

          <div className="tear-tape-sticker"></div>

          <div className="container">
            {/* About Section */}
            <section className="section" id="about">
              <h2 className="section-title">ABOUT</h2>
              <div className="card">
                <p className="text">
                  Hey there! I&apos;m <span className="highlight highlight-yellow">Nanda Kumar</span>, 
                  a passionate <span className="highlight highlight-pink">student and freelancer</span> based in 
                  <span className="highlight highlight-cyan"> Bangalore, India</span>. 
                  Currently pursuing my <span className="highlight highlight-yellow">BCA in AI/ML</span> at 
                  <span className="highlight highlight-green">Swamy Vivekanada Rural First Grade College</span>, 
                  I&apos;m on an exciting journey to master the art of web development.
                </p>
                <p className="text">
                  I run my own startup called <span className="highlight highlight-green">Zeridex</span>, 
                  where we build <span className="highlight highlight-cyan">AI-powered websites</span> and 
                  automation systems for modern businesses. We specialize in creating stunning, 
                  functional websites that help businesses grow and succeed in the digital landscape. 
                  I love exploring new technologies and staying on the cutting edge of what&apos;s possible.
                </p>
                <p className="text">
                  When I&apos;m not coding, you&apos;ll find me watching <span className="highlight highlight-pink">MCU movies</span> 
                  or getting inspired by <span className="highlight highlight-yellow">Tony Stark&apos;s genius</span>. 
                  Yes, I&apos;m building my own <span className="highlight highlight-cyan">J.A.R.V.I.S.</span> — stay tuned!
                  I believe in the power of technology to transform ideas into reality.
                </p>
              </div>
            </section>

            {/* Journey Section */}
            <section className="section journey-section" id="experience">
              <h2 className="section-title-center">My Journey</h2>
              <div className="journey-container">
                <div className="journey-timeline">
                  <h3 className="timeline-header">Journey Timeline</h3>
                  <div className="timeline-list">
                    <div className="timeline-item-flat" data-country="India">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content-flat">
                        <h4 className="timeline-title">Founder @ Zeridex</h4>
                        <p className="timeline-date">2024 - Present</p>
                        <p className="timeline-description">
                          Founded my own startup Zeridex, building AI-powered websites and automation systems for businesses worldwide. Leading a team of developers and designers.
                        </p>
                        <p className="timeline-location"><i className="fas fa-map-marker-alt"></i> Bangalore, India</p>
                      </div>
                    </div>
                    <div className="timeline-item-flat" data-country="India">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content-flat">
                        <h4 className="timeline-title">Freelance Web Developer</h4>
                        <p className="timeline-date">2024 - Present</p>
                        <p className="timeline-description">
                          Building stunning websites for clients worldwide. Projects include gradfast.in, academicexpert.in, academicseva.org, and langoleaf.com.
                        </p>
                        <p className="timeline-location"><i className="fas fa-map-marker-alt"></i> Bangalore, India</p>
                      </div>
                    </div>
                    <div className="timeline-item-flat" data-country="India">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content-flat">
                        <h4 className="timeline-title">Web Developer @ EduExpert</h4>
                        <p className="timeline-date">2024 - Present</p>
                        <p className="timeline-description">
                          Working at EduExpert and overseas education consultancy, building and maintaining educational platforms.
                        </p>
                        <p className="timeline-location"><i className="fas fa-map-marker-alt"></i> Bangalore, India</p>
                      </div>
                    </div>
                    <div className="timeline-item-flat" data-country="India">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content-flat">
                        <h4 className="timeline-title">Spoken English Instructor</h4>
                        <p className="timeline-date">2023 - Present</p>
                        <p className="timeline-description">
                          Teaching spoken English while also managing web development tasks for the institution.
                        </p>
                        <p className="timeline-location"><i className="fas fa-map-marker-alt"></i> Bangalore, India</p>
                      </div>
                    </div>
                    <div className="timeline-item-flat" data-country="India">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content-flat">
                        <h4 className="timeline-title">Started BCA in AI/ML</h4>
                        <p className="timeline-date">2023</p>
                        <p className="timeline-description">
                          Began pursuing BCA in Artificial Intelligence and Machine Learning at Swamy Vivekanada Rural First Grade College.
                        </p>
                        <p className="timeline-location"><i className="fas fa-map-marker-alt"></i> Bangalore, India</p>
                      </div>
                    </div>
                    <div className="timeline-item-flat" data-country="India">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content-flat">
                        <h4 className="timeline-title">Started Web Development</h4>
                        <p className="timeline-date">2022 - 2023</p>
                        <p className="timeline-description">
                          Started learning HTML, CSS, JavaScript, and modern frameworks. Built foundation in design and coding.
                        </p>
                        <p className="timeline-location"><i className="fas fa-map-marker-alt"></i> Bangalore, India</p>
                      </div>
                    </div>
                    <div className="timeline-item-flat" data-country="India">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content-flat">
                        <h4 className="timeline-title">Completed High School</h4>
                        <p className="timeline-date">2022</p>
                        <p className="timeline-description">
                          Completed my schooling with focus on Computer Science and Mathematics.
                        </p>
                        <p className="timeline-location"><i className="fas fa-map-marker-alt"></i> Bangalore, India</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="journey-timeline-back">
                  <svg className="treasure-map-svg" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <style>
                        {`
                          @keyframes floatCompass {
                            0%, 100% { transform: translate(320px, 80px) rotate(0deg); }
                            25% { transform: translate(320px, 80px) rotate(10deg); }
                            75% { transform: translate(320px, 80px) rotate(-10deg); }
                          }
                          @keyframes pulse {
                            0%, 100% { opacity: 0.3; }
                            50% { opacity: 0.6; }
                          }
                          @keyframes pathDash {
                            to { stroke-dashoffset: 0; }
                          }
                          @keyframes treasureGlow {
                            0%, 100% { filter: drop-shadow(0 0 5px gold); }
                            50% { filter: drop-shadow(0 0 15px gold); }
                          }
                          .compass { animation: floatCompass 4s ease-in-out infinite; transform-origin: center; }
                          .treasure-glow { animation: pulse 2s ease-in-out infinite, treasureGlow 2s ease-in-out infinite; }
                          .path-line { stroke-dasharray: 16; animation: pathDash 3s linear infinite; }
                        `}
                      </style>
                    </defs>
                    <rect width="400" height="600" fill="#f4e7d7"/>
                    <g className="compass">
                      <circle cx="0" cy="0" r="35" fill="none" stroke="#8B4513" strokeWidth="2"/>
                      <circle cx="0" cy="0" r="30" fill="none" stroke="#8B4513" strokeWidth="1"/>
                      <polygon points="0,-30 5,-10 -5,-10" fill="#D2691E"/>
                      <polygon points="0,30 5,10 -5,10" fill="#8B4513"/>
                      <polygon points="30,0 10,5 10,-5" fill="#8B4513"/>
                      <polygon points="-30,0 -10,5 -10,-5" fill="#8B4513"/>
                      <text x="0" y="-40" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#8B4513">N</text>
                    </g>
                    <path className="path-line" d="M 80,150 Q 120,200 100,250 T 140,350 Q 160,400 200,420" stroke="#D2691E" strokeWidth="3" fill="none" strokeDasharray="16" strokeLinecap="round"/>
                    <circle cx="80" cy="150" r="8" fill="#8B4513" stroke="#654321" strokeWidth="2">
                      <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="100" cy="250" r="8" fill="#8B4513" stroke="#654321" strokeWidth="2">
                      <animate attributeName="r" values="8;10;8" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="140" cy="350" r="8" fill="#8B4513" stroke="#654321" strokeWidth="2">
                      <animate attributeName="r" values="8;10;8" dur="2s" begin="1s" repeatCount="indefinite"/>
                    </circle>
                    <g transform="translate(200, 420)" className="treasure-glow">
                      <circle cx="0" cy="0" r="25" fill="#FFD700" opacity="0.5"/>
                      <line x1="-15" y1="-15" x2="15" y2="15" stroke="#DC143C" strokeWidth="4" strokeLinecap="round"/>
                      <line x1="15" y1="-15" x2="-15" y2="15" stroke="#DC143C" strokeWidth="4" strokeLinecap="round"/>
                    </g>
                    <rect x="10" y="10" width="380" height="580" fill="none" stroke="#8B4513" strokeWidth="3" strokeDasharray="10,5"/>
                  </svg>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section className="section" id="skills">
              <h2 className="section-title">SKILLS</h2>
              <div className="skills-grid-modern">
                <div className="skill-box">
                  <div className="skill-box-header">
                    <i className="fab fa-react skill-icon-large"></i>
                    <h3 className="skill-box-title">Frontend</h3>
                  </div>
                  <div className="tech-tags">
                    <span className="tag"><i className="fab fa-react"></i> React.js</span>
                    <span className="tag"><i className="fab fa-html5"></i> HTML</span>
                    <span className="tag"><i className="fab fa-css3"></i> CSS</span>
                    <span className="tag"><i className="fab fa-sass"></i> Sass</span>
                    <span className="tag"><i className="fab fa-bootstrap"></i> Bootstrap</span>
                    <span className="tag"><i className="fab fa-tailwind"></i> Tailwind</span>
                  </div>
                </div>
                <div className="skill-box">
                  <div className="skill-box-header">
                    <i className="fas fa-code skill-icon-large"></i>
                    <h3 className="skill-box-title">Languages</h3>
                  </div>
                  <div className="tech-tags">
                    <span className="tag"><i className="fab fa-js"></i> JavaScript</span>
                    <span className="tag"><i className="fab fa-js"></i> TypeScript</span>
                    <span className="tag"><i className="fab fa-python"></i> Python</span>
                    <span className="tag"><i className="fas fa-code"></i> C</span>
                    <span className="tag"><i className="fas fa-database"></i> SQL</span>
                  </div>
                </div>
                <div className="skill-box">
                  <div className="skill-box-header">
                    <i className="fab fa-node skill-icon-large"></i>
                    <h3 className="skill-box-title">Backend</h3>
                  </div>
                  <div className="tech-tags">
                    <span className="tag"><i className="fab fa-node-js"></i> Node.js</span>
                    <span className="tag"><i className="fas fa-server"></i> Express.js</span>
                    <span className="tag"><i className="fas fa-fire"></i> Firebase</span>
                    <span className="tag"><i className="fas fa-database"></i> Convex</span>
                  </div>
                </div>
                <div className="skill-box">
                  <div className="skill-box-header">
                    <i className="fas fa-cloud skill-icon-large"></i>
                    <h3 className="skill-box-title">Tools & DevOps</h3>
                  </div>
                  <div className="tech-tags">
                    <span className="tag"><i className="fab fa-git-alt"></i> Git</span>
                    <span className="tag"><i className="fab fa-github"></i> GitHub</span>
                    <span className="tag"><i className="fab fa-docker"></i> Docker</span>
                    <span className="tag"><i className="fab fa-aws"></i> AWS</span>
                  </div>
                </div>
                <div className="skill-box">
                  <div className="skill-box-header">
                    <i className="fas fa-palette skill-icon-large"></i>
                    <h3 className="skill-box-title">Design</h3>
                  </div>
                  <div className="tech-tags">
                    <span className="tag"><i className="fab fa-figma"></i> Figma</span>
                    <span className="tag"><i className="fas fa-paint-brush"></i> Adobe XD</span>
                    <span className="tag"><i className="fas fa-vector-square"></i> Vector</span>
                    <span className="tag"><i className="fas fa-eye"></i> UI/UX</span>
                  </div>
                </div>
                <div className="skill-box">
                  <div className="skill-box-header">
                    <i className="fas fa-robot skill-icon-large"></i>
                    <h3 className="skill-box-title">AI & Automation</h3>
                  </div>
                  <div className="tech-tags">
                    <span className="tag"><i className="fas fa-brain"></i> OpenAI</span>
                    <span className="tag"><i className="fas fa-robot"></i> Automation</span>
                    <span className="tag"><i className="fas fa-plug"></i> APIs</span>
                    <span className="tag"><i className="fas fa-cogs"></i> Integrations</span>
                  </div>
                </div>
                <div className="skill-box highlight-box">
                  <div className="skill-box-header">
                    <i className="fas fa-mobile-alt skill-icon-large"></i>
                    <h3 className="skill-box-title">Mobile</h3>
                  </div>
                  <div className="tech-tags">
                    <span className="tag"><i className="fab fa-react"></i> React Native</span>
                    <span className="tag"><i className="fas fa-mobile"></i> PWA</span>
                    <span className="tag"><i className="fas fa-responsive"></i> Responsive</span>
                  </div>
                </div>
                <div className="skill-box highlight-box">
                  <div className="skill-box-header">
                    <i className="fas fa-rocket skill-icon-large"></i>
                    <h3 className="skill-box-title">Performance</h3>
                  </div>
                  <div className="tech-tags">
                    <span className="tag"><i className="fas fa-tachometer-alt"></i> Optimization</span>
                    <span className="tag"><i className="fas fa-bolt"></i> Fast Loading</span>
                    <span className="tag"><i className="fas fa-search"></i> SEO</span>
                  </div>
                </div>
              </div>

              {/* Education & Languages */}
              <div className="education-languages-grid" style={{ marginTop: '3rem' }}>
                <div className="education-column">
                  <h2 className="section-title">EDUCATION</h2>
                  <div className="card education-card">
                    <div className="education-header">
                      <div>
                        <h3 className="education-title">BCA (Bachelor of Computer Application)</h3>
                        <p className="education-school">Swamy Vivekanada Rural First Grade College</p>
                      </div>
                      <span className="badge">2023 - Present</span>
                    </div>
                    <p className="education-location">
                      <i className="fas fa-map-marker-alt"></i> Bangalore, India
                    </p>
                  </div>
                </div>
                <div className="languages-column">
                  <h2 className="section-title">LANGUAGES</h2>
                  <div className="card languages-card">
                    <div className="language-item">
                      <span className="language-name-inline">English</span>
                      <div className="language-stars">
                        <span className="star filled"></span>
                        <span className="star filled"></span>
                        <span className="star filled"></span>
                      </div>
                    </div>
                    <div className="language-item">
                      <span className="language-name-inline">Tamil</span>
                      <div className="language-stars">
                        <span className="star filled"></span>
                        <span className="star filled"></span>
                        <span className="star filled"></span>
                      </div>
                    </div>
                    <div className="language-item">
                      <span className="language-name-inline">Kannada</span>
                      <div className="language-stars">
                        <span className="star filled"></span>
                        <span className="star filled"></span>
                        <span className="star"></span>
                      </div>
                    </div>
                    <div className="language-item">
                      <span className="language-name-inline">Hindi</span>
                      <div className="language-stars">
                        <span className="star filled"></span>
                        <span className="star filled"></span>
                        <span className="star"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="section" id="contact">
              <h2 className="section-title">GET IN TOUCH</h2>
              <div className="contact-container-compact">
                <p className="contact-intro">Let&apos;s build something amazing together</p>
                <div className="contact-grid">
                  <a href="https://www.linkedin.com/in/nanda-kumar-544500213/" target="_blank" rel="noopener noreferrer" className="contact-card">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://github.com/crazynanda" target="_blank" rel="noopener noreferrer" className="contact-card">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a href="mailto:nandablr242@gmail.com" className="contact-card">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </section>
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
                  <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>Home</a>
                  <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
                  <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')}>Journey</a>
                  <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>Skills</a>
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
        </>
      )}
    </div>
  );
}
