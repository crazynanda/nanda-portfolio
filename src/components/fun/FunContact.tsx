"use client";

import { type FC } from "react";

const FunContact: FC = () => {
  return (
    <section className="section" id="contact">
      <h2 className="section-title">GET IN TOUCH</h2>
      <div className="contact-container-compact">
        <p className="contact-intro">Let&apos;s build something amazing together</p>
        <div className="contact-grid">
          <a href="https://linkedin.com/in/nanda-kumar-544500213/" target="_blank" rel="noopener noreferrer" className="contact-card">
            <i className="fab fa-linkedin"></i>
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/crazynanda" target="_blank" rel="noopener noreferrer" className="contact-card">
            <i className="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <a href="mailto:nandablr242@gmail.com" className="contact-card">
            <i className="fas fa-envelope"></i>
            <span>Email</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FunContact;
