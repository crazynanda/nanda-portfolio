"use client";

import { type FC } from "react";

const FunContact: FC = () => {
  const contactCards = [
    {
      icon: "fab fa-linkedin",
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/nanda-kumar-544500213/",
      color: "#0077b5"
    },
    {
      icon: "fab fa-github",
      label: "GitHub",
      link: "https://github.com/crazynanda",
      color: "#333"
    },
    {
      icon: "fab fa-twitter",
      label: "Twitter/X",
      link: "https://x.com/nandablr242",
      color: "#1da1f2"
    },
    {
      icon: "fas fa-envelope",
      label: "Email",
      link: "mailto:nandablr242@gmail.com",
      color: "#ea4335"
    },
    {
      icon: "fas fa-coffee",
      label: "Buy Me a Coffee",
      link: "https://www.buymeacoffee.com/nandakumar",
      color: "#ff6b9d"
    },
    {
      icon: "fas fa-globe",
      label: "Website",
      link: "https://nandakumar.me",
      color: "#66d9ef"
    }
  ];

  return (
    <section className="section" id="contact">
      <h2 className="section-title">GET IN TOUCH</h2>
      <div className="contact-container-compact">
        <p className="contact-intro">Let&apos;s build something amazing together! Feel free to reach out for collaborations, projects, or just to say hello.</p>
        <div className="contact-grid">
          {contactCards.map((card, index) => (
            <a 
              key={index}
              href={card.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-card"
              style={{ '--card-color': card.color } as React.CSSProperties}
            >
              <i className={card.icon}></i>
              <span>{card.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunContact;
