"use client";

import { type FC, useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  onThemeToggle: () => void;
  isLoading?: boolean;
}

const FunHero: FC<Props> = ({ onThemeToggle, isLoading = true }) => {
  const [greeting, setGreeting] = useState("Hi there! 👋");
  const [isDark, setIsDark] = useState(false);
  const [coffeeHovered, setCoffeeHovered] = useState(false);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    const targetText = "Hi there! 👋";
    let iteration = 0;
    let interval: NodeJS.Timeout;

    if (!isLoading) {
      interval = setInterval(() => {
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

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <div className="loader-overlay" id="loader" style={{ display: isLoading ? 'flex' : 'none' }}>
        <div className="loader-shapes">
          <div className="loader-shape-svg loader-shape-1">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4"/>
              <rect x="3" y="3" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4"/>
              <path d="M35 40 L20 50 L35 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M65 40 L80 50 L65 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="55" y1="35" x2="45" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="loader-shape-svg loader-shape-2">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
              <rect x="3" y="3" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
              <path d="M25 35 L40 50 L25 65" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="50" y1="65" x2="75" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="loader-shape-svg loader-shape-3">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar-fill" id="progress-fill"></div>
        <div className="progress-checkpoints">
          <div className="checkpoint" data-section="hero" onClick={() => scrollToSection('hero')}>
            <div className="checkpoint-dot"></div>
            <span className="checkpoint-label">Home</span>
          </div>
          <div className="checkpoint" data-section="about" onClick={() => scrollToSection('about')}>
            <div className="checkpoint-dot"></div>
            <span className="checkpoint-label">About</span>
          </div>
          <div className="checkpoint" data-section="experience" onClick={() => scrollToSection('experience')}>
            <div className="checkpoint-dot"></div>
            <span className="checkpoint-label">Journey</span>
          </div>
          <div className="checkpoint" data-section="skills" onClick={() => scrollToSection('skills')}>
            <div className="checkpoint-dot"></div>
            <span className="checkpoint-label">Skills</span>
          </div>
          <div className="checkpoint" data-section="contact" onClick={() => scrollToSection('contact')}>
            <div className="checkpoint-dot"></div>
            <span className="checkpoint-label">Contact</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar" ref={overlayRef}>
        <div className="nav-content">
          <Link href="/" className="nav-brand">NK</Link>
          <div className="nav-right">
            <Link href="#hero" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Home</Link>
            <Link href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</Link>
            <Link href="#experience" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}>Journey</Link>
            <Link href="#skills" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Skills</Link>
            <Link href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Get in Touch!</Link>
            <button className="theme-toggle-nav" onClick={toggleDarkMode} aria-label="Toggle dark mode" title={isDark ? "Light Mode" : "Dark Mode"}>
              <i className={isDark ? "fas fa-sun" : "fas fa-moon"}></i>
            </button>
            <button className="theme-toggle-nav" onClick={onThemeToggle} aria-label="Switch to Default Theme" title="Switch to Default Theme">
              <i className="fas fa-palette"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-left">
            <p className="hero-greeting">{greeting}</p>
            <h1 className="hero-name">I&apos;m Nanda Kumar.</h1>
            <p className="hero-tagline">Web Designer & Developer</p>
            <p className="hero-description">
              Based in Bangalore, India, I&apos;m a passionate student and freelancer. Currently pursuing my BCA in AI/ML, 
              I run my own startup called Zeridex, where we build AI-powered websites and automation systems for modern businesses.
            </p>
            <div className="hero-social">
              <a href="https://github.com/crazynanda" target="_blank" rel="noopener noreferrer" className="social-btn">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/nanda-kumar-544500213/" target="_blank" rel="noopener noreferrer" className="social-btn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://x.com/nandablr242" target="_blank" rel="noopener noreferrer" className="social-btn">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <div className="hero-cta-container">
              <Link href="#contact" className="btn-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Get in Touch!</Link>
              
              {/* Coffee CTA */}
              <div className="coffee-cta-wrapper">
                <span className="coffee-arrow-text">Buy me a coffee!</span>
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20 40 Q10 40 10 50 Q10 60 20 60 L80 60 Q90 60 90 50 Q90 40 80 40 Z' fill='%23ff6b9d' stroke='%23000' stroke-width='3'/%3E%3Cpath d='M15 50 Q25 45 35 50 Q45 55 55 50' stroke='%23000' stroke-width='2' fill='none'/%3E%3Crect x='25' y='35' width='50' height='10' rx='2' fill='%23ffd93d' stroke='%23000' stroke-width='2'/%3E%3Ccircle cx='70' cy='20' r='8' fill='%23ff6b9d' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E" 
                      alt="Arrow" 
                      className="coffee-arrow-img"
                      style={{ transform: coffeeHovered ? 'rotate(-30deg) translateX(10px)' : 'rotate(-45deg)' }}
                />
                <a href="https://www.buymeacoffee.com/nandakumar" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="btn-coffee"
                   onMouseEnter={() => setCoffeeHovered(true)}
                   onMouseLeave={() => setCoffeeHovered(false)}
                >
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20 40 Q10 40 10 50 Q10 60 20 60 L80 60 Q90 60 90 50 Q90 40 80 40 Z' fill='%23a8e6cf' stroke='%23000' stroke-width='4'/%3E%3Cpath d='M15 50 Q25 45 35 50 Q45 55 55 50' stroke='%23000' stroke-width='3' fill='none'/%3E%3Crect x='25' y='35' width='50' height='10' rx='2' fill='%23ffd93d' stroke='%23000' stroke-width='3'/%3E%3Ccircle cx='70' cy='20' r='10' fill='%23ff6b9d' stroke='%23000' stroke-width='3'/%3E%3C/svg%3E" 
                       alt="Coffee" 
                       className="coffee-icon-img"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-image-wrapper">
              <div className="tape-sticker"></div>
              <img 
                src="/images/about/portrait.jpg" 
                alt="Nanda Kumar" 
                className="hero-photo"
                width={400}
                height={400}
              />
              <div className="deco-code">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4"/>
                  <rect x="3" y="3" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4"/>
                  <path d="M35 40 L20 50 L35 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M65 40 L80 50 L65 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="55" y1="35" x2="45" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="deco-terminal">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
                  <rect x="3" y="3" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
                  <path d="M25 35 L40 50 L25 65" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="50" y1="65" x2="75" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="deco-floppy">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" strokeWidth="4"/>
                  <rect x="3" y="3" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" strokeWidth="4"/>
                  <rect x="20" y="20" width="60" height="60" rx="3" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
                  <rect x="30" y="20" width="40" height="20" fill="#66d9ef" stroke="#000" strokeWidth="3"/>
                  <rect x="35" y="55" width="30" height="15" rx="2" fill="#000"/>
                  <circle cx="50" cy="35" r="3" fill="#000"/>
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
        <svg width="100%" height="30" viewBox="0 0 1440 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 L0,15 Q10,5 20,15 T40,15 Q50,5 60,15 T80,15 Q90,20 100,15 T120,15 Q130,10 140,15 T160,15 Q170,5 180,15 T200,15 Q210,20 220,15 T240,15 Q250,8 260,15 T280,15 Q290,18 300,15 T320,15 Q330,5 340,15 T360,15 Q370,12 380,15 T400,15 Q410,20 420,15 T440,15 Q450,6 460,15 T480,15 Q490,16 500,15 T520,15 Q530,8 540,15 T560,15 Q570,20 580,15 T600,15 Q610,10 620,15 T640,15 Q650,5 660,15 T680,15 Q690,18 700,15 T720,15 Q730,12 740,15 T760,15 Q770,7 780,15 T800,15 Q810,20 820,15 T840,15 Q850,9 860,15 T880,15 Q890,14 900,15 T920,15 Q930,6 940,15 T960,15 Q970,19 980,15 T1000,15 Q1010,11 1020,15 T1040,15 Q1050,5 1060,15 T1080,15 Q1090,17 1100,15 T1120,15 Q1130,8 1140,15 T1160,15 Q1170,13 1180,15 T1200,15 Q1210,20 1220,15 T1240,15 Q1250,7 1260,15 T1280,15 Q1290,16 1300,15 T1320,15 Q1330,10 1340,15 T1360,15 Q1370,5 1380,15 T1400,15 Q1410,18 1420,15 T1440,15 L1440,0 Z" fill="#ffffff"/>
          <path d="M0,30 L0,15 Q10,5 20,15 T40,15 Q50,5 60,15 T80,15 Q90,20 100,15 T120,15 Q130,10 140,15 T160,15 Q170,5 180,15 T200,15 Q210,20 220,15 T240,15 Q250,8 260,15 T280,15 Q290,18 300,15 T320,15 Q330,5 340,15 T360,15 Q370,12 380,15 T400,15 Q410,20 420,15 T440,15 Q450,6 460,15 T480,15 Q490,16 500,15 T520,15 Q530,8 540,15 T560,15 Q570,20 580,15 T600,15 Q610,10 620,15 T640,15 Q650,5 660,15 T680,15 Q690,18 700,15 T720,15 Q730,12 740,15 T760,15 Q770,7 780,15 T800,15 Q810,20 820,15 T840,15 Q850,9 860,15 T880,15 Q890,14 900,15 T920,15 Q930,6 940,15 T960,15 Q970,19 980,15 T1000,15 Q1010,11 1020,15 T1040,15 Q1050,5 1060,15 T1080,15 Q1090,17 1100,15 T1120,15 Q1130,8 1140,15 T1160,15 Q1170,13 1180,15 T1200,15 Q1210,20 1220,15 T1240,15 Q1250,7 1260,15 T1280,15 Q1290,16 1300,15 T1320,15 Q1330,10 1340,15 T1360,15 Q1370,5 1380,15 T1400,15 Q1410,18 1420,15 T1440,15 L1440,30 Z" fill="#d0d0d0"/>
        </svg>
      </div>

      <div className="page-gap"></div>

      <div className="paper-tear paper-tear-bottom">
        <svg width="100%" height="30" viewBox="0 0 1440 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 L0,15 Q10,5 20,15 T40,15 Q50,5 60,15 T80,15 Q90,20 100,15 T120,15 Q130,10 140,15 T160,15 Q170,5 180,15 T200,15 Q210,20 220,15 T240,15 Q250,8 260,15 T280,15 Q290,18 300,15 T320,15 Q330,5 340,15 T360,15 Q370,12 380,15 T400,15 Q410,20 420,15 T440,15 Q450,6 460,15 T480,15 Q490,16 500,15 T520,15 Q530,8 540,15 T560,15 Q570,20 580,15 T600,15 Q610,10 620,15 T640,15 Q650,5 660,15 T680,15 Q690,18 700,15 T720,15 Q730,12 740,15 T760,15 Q770,7 780,15 T800,15 Q810,20 820,15 T840,15 Q850,9 860,15 T880,15 Q890,14 900,15 T920,15 Q930,6 940,15 T960,15 Q970,19 980,15 T1000,15 Q1010,11 1020,15 T1040,15 Q1050,5 1060,15 T1080,15 Q1090,17 1100,15 T1120,15 Q1130,8 1140,15 T1160,15 Q1170,13 1180,15 T1200,15 Q1210,20 1220,15 T1240,15 Q1250,7 1260,15 T1280,15 Q1290,16 1300,15 T1320,15 Q1330,10 1340,15 T1360,15 Q1370,5 1380,15 T1400,15 Q1410,18 1420,15 T1440,15 L1440,0 Z" fill="#d0d0d0"/>
          <path d="M0,30 L0,15 Q10,5 20,15 T40,15 Q50,5 60,15 T80,15 Q90,20 100,15 T120,15 Q130,10 140,15 T160,15 Q170,5 180,15 T200,15 Q210,20 220,15 T240,15 Q250,8 260,15 T280,15 Q290,18 300,15 T320,15 Q330,5 340,15 T360,15 Q370,12 380,15 T400,15 Q410,20 420,15 T440,15 Q450,6 460,15 T480,15 Q490,16 500,15 T520,15 Q530,8 540,15 T560,15 Q570,20 580,15 T600,15 Q610,10 620,15 T640,15 Q650,5 660,15 T680,15 Q690,18 700,15 T720,15 Q730,12 740,15 T760,15 Q770,7 780,15 T800,15 Q810,20 820,15 T840,15 Q850,9 860,15 T880,15 Q890,14 900,15 T920,15 Q930,6 940,15 T960,15 Q970,19 980,15 T1000,15 Q1010,11 1020,15 T1040,15 Q1050,5 1060,15 T1080,15 Q1090,17 1100,15 T1120,15 Q1130,8 1140,15 T1160,15 Q1170,13 1180,15 T1200,15 Q1210,20 1220,15 T1240,15 Q1250,7 1260,15 T1280,15 Q1290,16 1300,15 T1320,15 Q1330,10 1340,15 T1360,15 Q1370,5 1380,15 T1400,15 Q1410,18 1420,15 T1440,15 L1440,30 Z" fill="#ffffff"/>
        </svg>
      </div>

      <div className="tear-tape-sticker"></div>
    </>
  );
};

export default FunHero;
