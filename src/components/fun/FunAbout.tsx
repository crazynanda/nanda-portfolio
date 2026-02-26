"use client";

import { type FC, useEffect, useRef, useState } from "react";

const FunAbout: FC = () => {
  const [visibleHighlights, setVisibleHighlights] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const highlights = entry.target.querySelectorAll('.highlight');
            highlights.forEach((_, index) => {
              setTimeout(() => {
                setVisibleHighlights(prev => new Set([...prev, index]));
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="about" ref={sectionRef}>
      {/* Header */}
      <div className="header">
        <img 
          src="/images/about/portrait.jpg" 
          alt="Nanda Kumar" 
          className="avatar"
          width={120}
          height={120}
        />
        <div className="header-content">
          <h2 className="name">Nanda Kumar</h2>
          <p className="tagline">Web Designer & Developer | Vibe Coder | Founder of Zeridex</p>
          <p className="location">
            <i className="fas fa-map-marker-alt"></i> Bangalore, India
          </p>
        </div>
        <div className="header-actions">
          <a href="#contact" className="btn btn-primary">
            <i className="fas fa-paper-plane"></i> Get in Touch
          </a>
          <a href="/resume.pdf" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-download"></i> Resume
          </a>
        </div>
      </div>

      {/* Bio */}
      <div className="card">
        <p className="text">
          Hey there! I&apos;m <span className={`highlight highlight-yellow ${visibleHighlights.has(0) ? 'visible' : ''}`}>Nanda Kumar</span>, 
          a passionate <span className={`highlight highlight-pink ${visibleHighlights.has(1) ? 'visible' : ''}`}>student and freelancer</span> based in 
          <span className={`highlight highlight-cyan ${visibleHighlights.has(2) ? 'visible' : ''}`}> Bangalore, India</span>. 
          Currently pursuing my <span className={`highlight highlight-yellow ${visibleHighlights.has(3) ? 'visible' : ''}`}>BCA in AI/ML</span>, 
          I&apos;m on a journey to master the art of web development.
        </p>
        <p className="text">
          I run my own startup called <span className={`highlight highlight-green ${visibleHighlights.has(4) ? 'visible' : ''}`}>Zeridex</span>, 
          where we build <span className={`highlight highlight-cyan ${visibleHighlights.has(5) ? 'visible' : ''}`}>AI-powered websites</span> and 
          automation systems for modern businesses. I love exploring new technologies and staying on the cutting edge of what&apos;s possible.
        </p>
        <p className="text">
          When I&apos;m not coding, you&apos;ll find me watching <span className={`highlight highlight-pink ${visibleHighlights.has(6) ? 'visible' : ''}`}>MCU movies</span> 
          or getting inspired by <span className={`highlight highlight-yellow ${visibleHighlights.has(7) ? 'visible' : ''}`}>Tony Stark&apos;s genius</span>. 
          Yes, I&apos;m building my own <span className={`highlight highlight-cyan ${visibleHighlights.has(8) ? 'visible' : ''}`}>J.A.R.V.I.S.</span> — stay tuned!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">1+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">10+</div>
          <div className="stat-label">Projects Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">4+</div>
          <div className="stat-label">Happy Clients</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">500+</div>
          <div className="stat-label">Coffees Consumed</div>
        </div>
      </div>

      {/* Location Card */}
      <div className="map-card">
        <div className="map-header">
          <i className="fas fa-map-marked-alt"></i>
          <span>Based in Bangalore</span>
        </div>
        <div className="location-info">
          <div className="location-pin">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <div className="location-details">
            <h3>Bangalore, India</h3>
            <p>Available for remote work & freelance projects</p>
          </div>
        </div>
        <div className="journey-map">
          <div className="journey-item">
            <span className="journey-flag">🎓</span>
            <span className="journey-label">Pursuing BCA</span>
          </div>
          <div className="journey-item">
            <span className="journey-flag">💼</span>
            <span className="journey-label">Freelancing</span>
          </div>
          <div className="journey-item">
            <span className="journey-flag">🚀</span>
            <span className="journey-label">Zeridex Founder</span>
          </div>
          <div className="journey-item">
            <span className="journey-flag">🤖</span>
            <span className="journey-label">AI/ML Enthusiast</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunAbout;
