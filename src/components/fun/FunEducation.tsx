"use client";

import { type FC } from "react";

const FunEducation: FC = () => {
  const education = {
    degree: "BCA (Bachelor of Computer Application)",
    institution: "Swamy Vivekanada Rural First Grade College",
    year: "2023 - Present",
    location: "Bangalore, India"
  };

  const languages = [
    { name: "English", level: 5 },
    { name: "Tamil", level: 5 },
    { name: "Kannada", level: 4 },
    { name: "Hindi", level: 3 }
  ];

  return (
    <section className="section education-languages-section" id="education">
      <h2 className="section-title">EDUCATION & LANGUAGES</h2>
      <div className="education-languages-grid">
        {/* Education Column */}
        <div className="education-column">
          <div className="education-card">
            <div className="education-header">
              <div>
                <h3 className="education-title">{education.degree}</h3>
                <p className="education-school">{education.institution}</p>
              </div>
              <span className="badge">{education.year}</span>
            </div>
            <p className="education-location">
              <i className="fas fa-map-marker-alt"></i> {education.location}
            </p>
            <p className="text" style={{ marginTop: '1rem', fontSize: '0.95rem' }}>
              Currently pursuing BCA with focus on AI/ML. Building strong foundation in computer science, programming, and software development.
            </p>
          </div>
        </div>

        {/* Languages Column */}
        <div className="languages-column">
          <div className="languages-card">
            <h3 className="education-title" style={{ marginBottom: '1.5rem' }}>Languages</h3>
            {languages.map((lang, index) => (
              <div key={index} className="language-item">
                <span className="language-name-inline">{lang.name}</span>
                <div className="language-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div 
                      key={star} 
                      className={`star ${star <= lang.level ? 'filled' : ''}`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunEducation;
