"use client";

import { type FC } from "react";

const FunJourney: FC = () => {
  return (
    <section className="section journey-section" id="experience">
      <h2 className="section-title-center">My Journey</h2>
      <div className="journey-container">
        <div className="journey-timeline">
          <h3 className="timeline-header">Journey Timeline</h3>
          <div className="timeline-list">
            <div className="timeline-item-flat">
              <div className="timeline-dot"></div>
              <div className="timeline-content-flat">
                <h4 className="timeline-title">Freelance Web Developer</h4>
                <p className="timeline-date">2023 - Present</p>
                <p className="timeline-description">
                  Building stunning websites and web applications for clients worldwide. 
                  Specializing in React, Next.js, and modern web technologies.
                </p>
                <p className="timeline-location"><i className="fas fa-map-marker-alt"></i> Bangalore, India</p>
              </div>
            </div>
            <div className="timeline-item-flat">
              <div className="timeline-dot"></div>
              <div className="timeline-content-flat">
                <h4 className="timeline-title">Web Development Projects</h4>
                <p className="timeline-date">2022 - 2023</p>
                <p className="timeline-description">
                  Created multiple successful projects including Zeridex, Academic Expert, 
                  Academic Seva, and Lango. Focus on modern UI/UX and performance.
                </p>
                <p className="timeline-location"><i className="fas fa-map-marker-alt"></i> Remote</p>
              </div>
            </div>
            <div className="timeline-item-flat">
              <div className="timeline-dot"></div>
              <div className="timeline-content-flat">
                <h4 className="timeline-title">Learning & Development</h4>
                <p className="timeline-date">2020 - 2022</p>
                <p className="timeline-description">
                  Started journey in web development. Mastered HTML, CSS, JavaScript, 
                  and modern frameworks. Built foundation in design and coding.
                </p>
                <p className="timeline-location"><i className="fas fa-map-marker-alt"></i> Bangalore, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunJourney;
