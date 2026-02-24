"use client";

import { type FC } from "react";

const FunSkills: FC = () => {
  return (
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
            <span className="tag"><i className="fas fa-terminal"></i> CLI</span>
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
            <span className="tag"><i className="fas fa-chart-line"></i> Analytics</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunSkills;
