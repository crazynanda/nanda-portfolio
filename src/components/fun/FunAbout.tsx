"use client";

import { type FC } from "react";

const FunAbout: FC = () => {
  return (
    <section className="section" id="about">
      <h2 className="section-title">ABOUT</h2>
      <div className="card">
        <p className="text">
          I&apos;m a passionate <span className="highlight highlight-yellow">Web Designer & Developer</span> with expertise in creating 
          award-worthy digital experiences. Based in <span className="highlight highlight-pink">Bangalore, India</span>, 
          I specialize in building modern, responsive websites and applications using cutting-edge technologies like 
          <span className="highlight highlight-cyan"> React, Next.js, and TypeScript</span>.
        </p>
        <p className="text">
          My journey in web development started with a fascination for creating beautiful, functional interfaces. 
          I thrive on <span className="highlight highlight-cyan">continuous learning and innovation</span>, always staying updated with the 
          <span className="highlight highlight-pink"> latest trends and technologies</span> in the ever-evolving web landscape.
        </p>
        <p className="text">
          I bring a unique blend of <span className="highlight highlight-yellow">technical expertise</span>, 
          <span className="highlight highlight-green"> creative design skills</span>, and genuine enthusiasm for building 
          <span className="highlight highlight-cyan"> impactful digital solutions</span> that make a difference.
        </p>
      </div>
    </section>
  );
};

export default FunAbout;
