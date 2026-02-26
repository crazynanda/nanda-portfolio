"use client";

import { type FC, useState, useEffect, useRef } from "react";

const FunJourney: FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isFlipped) {
            setIsFlipped(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isFlipped]);

  const handleTimelineClick = (location: string) => {
    setActiveLocation(location);
  };

  const journeyItems = [
    {
      title: "Freelance Web Developer",
      company: "Self-employed",
      date: "2024 - Present",
      location: "Bangalore, India",
      description: "Building stunning websites and web applications for clients worldwide. Working on projects for gradfast.in, academicexpert.in, academicseva.org, and langoleaf.com.",
      flag: "💼"
    },
    {
      title: "Web Developer",
      company: "EduExpert",
      date: "2024 - Present",
      location: "Bangalore, India",
      description: "Working at EduExpert and overseas education consultancy, building and maintaining educational platforms.",
      flag: "🎓"
    },
    {
      title: "Web Developer",
      company: "Academic Expert",
      date: "2023 - Present",
      location: "Remote",
      description: "Developing academic websites and portals for students and educational institutions.",
      flag: "📚"
    },
    {
      title: "Spoken English Instructor",
      company: "Spoken English Institution",
      date: "2023 - Present",
      location: "Bangalore, India",
      description: "Teaching spoken English while also managing web development tasks for the institution.",
      flag: "🗣️"
    },
    {
      title: "Started Web Development Journey",
      company: "Self-learning",
      date: "2022 - 2023",
      location: "Bangalore, India",
      description: "Started learning HTML, CSS, JavaScript, and modern frameworks. Built foundation in design and coding.",
      flag: "🚀"
    }
  ];

  return (
    <section className="section journey-section" id="experience" ref={containerRef}>
      <h2 className="section-title-center">My Journey</h2>
      <div className={`journey-container ${isFlipped ? 'flipped' : ''}`}>
        {/* Timeline (Front) */}
        <div className="journey-timeline">
          <h3 className="timeline-header">Career Timeline</h3>
          <div className="timeline-list">
            {journeyItems.map((item, index) => (
              <div 
                key={index}
                className="timeline-item-flat"
                onClick={() => handleTimelineClick(item.location)}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content-flat">
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-date">{item.date}</p>
                  <p className="timeline-description">{item.description}</p>
                  <p className="timeline-location">
                    <i className="fas fa-map-marker-alt"></i> {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Treasure Map (Back) */}
        <div className="journey-timeline-back">
          <svg className="treasure-map-svg" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Map background */}
            <rect width="400" height="600" fill="#f4e4bc"/>
            <rect x="10" y="10" width="380" height="580" fill="none" stroke="#8b4513" strokeWidth="3"/>
            
            {/* Map decorations */}
            <path d="M0 100 Q100 80 200 100 T400 100" stroke="#8b4513" strokeWidth="2" fill="none" opacity="0.5"/>
            <path d="M0 200 Q100 180 200 200 T400 200" stroke="#8b4513" strokeWidth="2" fill="none" opacity="0.5"/>
            <path d="M0 300 Q100 280 200 300 T400 300" stroke="#8b4513" strokeWidth="2" fill="none" opacity="0.5"/>
            <path d="M0 400 Q100 380 200 400 T400 400" stroke="#8b4513" strokeWidth="2" fill="none" opacity="0.5"/>
            <path d="M0 500 Q100 480 200 500 T400 500" stroke="#8b4513" strokeWidth="2" fill="none" opacity="0.5"/>
            
            {/* X marks the spot */}
            <path d="M180 250 L220 290 M220 250 L180 290" stroke="#ff6b9d" strokeWidth="4"/>
            <path d="M100 350 L140 390 M140 350 L100 390" stroke="#ff6b9d" strokeWidth="4"/>
            <path d="M280 150 L320 190 M320 150 L280 190" stroke="#ff6b9d" strokeWidth="4"/>
            <path d="M250 450 L290 490 M290 450 L250 490" stroke="#ff6b9d" strokeWidth="4"/>
            
            {/* Compass */}
            <circle cx="350" cy="80" r="30" fill="#fff8dc" stroke="#8b4513" strokeWidth="2"/>
            <text x="350" y="75" textAnchor="middle" fill="#8b4513" fontSize="12">N</text>
            <text x="350" y="95" textAnchor="middle" fill="#8b4513" fontSize="10">S</text>
            <text x="335" y="83" textAnchor="middle" fill="#8b4513" fontSize="10">W</text>
            <text x="365" y="83" textAnchor="middle" fill="#8b4513" fontSize="10">E</text>
            
            {/* Pirate marker */}
            <text x="200" y="280" fontSize="40" textAnchor="middle">☠️</text>
            
            {/* Title */}
            <text x="200" y="550" textAnchor="middle" fill="#8b4513" fontSize="18" fontWeight="bold">Adventure Map</text>
            <text x="200" y="575" textAnchor="middle" fill="#8b4513" fontSize="12">Click timeline to explore!</text>
          </svg>
        </div>

        {/* Map Container (for desktop) */}
        <div className="journey-map-container">
          <div className="journey-map-overlay">
            <div className="journey-map-points">
              {journeyItems.map((item, index) => (
                <div 
                  key={index}
                  className={`journey-map-point ${activeLocation === item.location ? 'active' : ''}`}
                  style={{
                    left: `${20 + (index * 15)}%`,
                    top: `${15 + (index * 18)}%`
                  }}
                  onClick={() => handleTimelineClick(item.location)}
                >
                  <span className="map-marker">{item.flag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunJourney;
