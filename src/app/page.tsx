"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Page Transition - Reveal
    const revealTransition = () => {
      gsap.set(".transition-overlay", { scaleY: 1, transformOrigin: "top" });
      gsap.to(".transition-overlay", {
        scaleY: 0,
        duration: 0.6,
        stagger: -0.1,
        ease: "power2.inOut",
        delay: 0.2,
      });
    };

    revealTransition();

    // Scroll to top on page load/refresh
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      // Prevent browser from restoring scroll position
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    }

    // Menu Toggle
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    const navOverlay = document.querySelector(".nav-overlay");
    const openLabel = document.querySelector(".open-label");
    const closeLabel = document.querySelector(".close-label");
    let isMenuOpen = false;
    let scrollY = 0;

    if (menuToggleBtn && navOverlay) {
      menuToggleBtn.addEventListener("click", () => {
        if (!isMenuOpen) {
          // Open menu
          navOverlay.classList.add("active");
          menuToggleBtn.classList.add("menu-open");
          scrollY = window.scrollY;
          document.body.style.position = "fixed";
          document.body.style.top = `-${scrollY}px`;
          document.body.style.width = "100%";

          gsap.to([openLabel, closeLabel], {
            y: "-1rem",
            duration: 0.3,
          });

          isMenuOpen = true;
        } else {
          // Close menu
          navOverlay.classList.remove("active");
          menuToggleBtn.classList.remove("menu-open");
          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.width = "";
          window.scrollTo(0, scrollY);

          gsap.to([openLabel, closeLabel], {
            y: "0rem",
            duration: 0.3,
          });

          isMenuOpen = false;
        }
      });
    }

    // Hero Image Cycling Animation (every 250ms)
    const heroImg = document.querySelector(".hero-img");
    if (heroImg) {
      const heroImages = [
        "/images/projects/zeridex.png",
        "/images/projects/academicexpert.png",
        "/images/projects/academicseva.png",
        "/images/projects/lango.png"
      ];
      let currentImageIndex = 0;
      
      setInterval(() => {
        currentImageIndex = currentImageIndex >= heroImages.length - 1 ? 0 : currentImageIndex + 1;
        const imgElement = heroImg.querySelector("img");
        if (imgElement) {
          imgElement.src = heroImages[currentImageIndex];
        }
      }, 250);
    }

    // Hero Image Scroll Animation
    ScrollTrigger.create({
      trigger: ".hero-img-holder",
      start: "top bottom",
      end: "top top",
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(".hero-img", {
          y: `${-110 + 110 * progress}%`,
          scale: 0.25 + 0.75 * progress,
          rotation: -15 + 15 * progress,
        });
      },
    });

    // Featured Work Horizontal Scroll
    if (window.innerWidth > 1000) {
      const featuredTitles = document.querySelector(".featured-titles");
      const moveDistance = window.innerWidth * 4;

      // Create indicators
      const indicatorContainer = document.querySelector(".featured-work-indicator");
      if (indicatorContainer) {
        indicatorContainer.innerHTML = "";
        for (let section = 1; section <= 5; section++) {
          const sectionNumber = document.createElement("p");
          sectionNumber.className = "mn";
          sectionNumber.textContent = `0${section}`;
          indicatorContainer.appendChild(sectionNumber);
          for (let i = 0; i < 10; i++) {
            const indicator = document.createElement("div");
            indicator.className = "indicator";
            indicatorContainer.appendChild(indicator);
          }
        }
      }

      // Set initial state for image cards
      const featuredImgCards = document.querySelectorAll(".featured-img-card");
      featuredImgCards.forEach((card) => {
        gsap.set(card, { z: -1500, scale: 0 });
      });

      ScrollTrigger.create({
        trigger: ".featured-work",
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Move titles
          if (featuredTitles) {
            gsap.set(featuredTitles, { x: -moveDistance * self.progress });
          }

          // Animate image cards
          featuredImgCards.forEach((card, index) => {
            const staggerOffset = index * 0.075;
            const scaledProgress = (self.progress - staggerOffset) * 2;
            const individualProgress = Math.max(0, Math.min(1, scaledProgress));
            const newZ = -1500 + 3000 * individualProgress;
            const scale = Math.max(0, Math.min(1, individualProgress * 10));
            gsap.set(card, { z: newZ, scale: scale });
          });

          // Update indicators
          const indicators = document.querySelectorAll(".indicator");
          const totalIndicators = indicators.length;
          const progressPerIndicator = 1 / totalIndicators;
          indicators.forEach((indicator, index) => {
            const indicatorStart = index * progressPerIndicator;
            if (self.progress > indicatorStart) {
              indicator.classList.add("active");
            } else {
              indicator.classList.remove("active");
            }
          });
        },
      });
    }

    // Services Sticky Cards
    if (window.innerWidth > 1000) {
      const services = gsap.utils.toArray(".service-card");
      services.forEach((service, index) => {
        const isLastServiceCard = index === services.length - 1;
        const serviceCardInner = (service as Element).querySelector(".service-card-inner");

        if (!isLastServiceCard && serviceCardInner) {
          ScrollTrigger.create({
            trigger: service as Element,
            start: "top 45%",
            endTrigger: ".contact-cta",
            end: "top 90%",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(serviceCardInner, {
            y: `-${(services.length - index) * 14}vh`,
            ease: "none",
            scrollTrigger: {
              trigger: service as Element,
              start: "top 45%",
              endTrigger: ".contact-cta",
              end: "top 90%",
              scrub: true,
            },
          });
        }
      });
    }

    // About Portrait Animation (desktop only)
    if (window.innerWidth > 1000) {
      gsap.to(".about-hero-portrait", {
        y: -200,
        rotation: -25,
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Footer Explosion Animation
    const footer = document.querySelector("footer");
    const explosionContainer = document.querySelector(".explosion-container");
    
    if (footer && explosionContainer) {
      let hasExploded = false;
      
      const config = {
        gravity: 0.25,
        friction: 0.99,
        imageSize: 150,
        horizontalForce: 20,
        verticalForce: 15,
        rotationSpeed: 10,
      };
      
      const imagePaths = [
        "/images/projects/zeridex.png",
        "/images/projects/academicexpert.png",
        "/images/projects/academicseva.png",
        "/images/projects/lango.png",
        "/images/frontend.jpg",
        "/images/backend.jpg",
        "/images/UIUXdesign.jpg",
        "/images/AIintegration.png",
        "/images/about/portrait.jpg",
        "/images/projects/zeridex.png"
      ];
      
      // Preload images
      imagePaths.forEach((path) => {
        const img = new Image();
        img.src = path;
      });
      
      class Particle {
        element: HTMLImageElement;
        x: number;
        y: number;
        vx: number;
        vy: number;
        rotation: number;
        rotationSpeed: number;
        
        constructor(element: HTMLImageElement) {
          this.element = element;
          this.x = 0;
          this.y = 0;
          this.vx = (Math.random() - 0.5) * config.horizontalForce;
          this.vy = -config.verticalForce - Math.random() * 10;
          this.rotation = 0;
          this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
        }
        
        update() {
          this.vy += config.gravity;
          this.vx *= config.friction;
          this.vy *= config.friction;
          this.rotationSpeed *= config.friction;
          this.x += this.vx;
          this.y += this.vy;
          this.rotation += this.rotationSpeed;
          this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${this.rotation}deg)`;
        }
      }
      
      const createParticles = () => {
        explosionContainer.innerHTML = "";
        const containerWidth = (explosionContainer as HTMLElement).offsetWidth;
        const containerHeight = (explosionContainer as HTMLElement).offsetHeight;
        const centerX = containerWidth / 2 - config.imageSize / 2;
        const centerY = containerHeight / 2 - config.imageSize / 2;
        
        imagePaths.forEach((path, index) => {
          const particle = document.createElement("img");
          particle.src = path;
          particle.classList.add("explosion-particle-img");
          // Position in center with slight offset for each particle
          const offsetX = (Math.random() - 0.5) * 50;
          const offsetY = (Math.random() - 0.5) * 50;
          particle.style.cssText = `
            position: absolute;
            width: ${config.imageSize}px;
            height: ${config.imageSize}px;
            object-fit: cover;
            border-radius: 0.75em;
            border: 2px solid var(--fg);
            box-shadow: 4px 4px 0px var(--fg);
            left: ${centerX + offsetX}px;
            top: ${centerY + offsetY}px;
          `;
          explosionContainer.appendChild(particle);
        });
      };
      
      const explode = () => {
        if (hasExploded) return;
        hasExploded = true;
        
        createParticles();
        const particleElements = document.querySelectorAll(".explosion-particle-img");
        const particles = Array.from(particleElements).map(
          (element) => new Particle(element as HTMLImageElement)
        );
        
        let animationId: number;
        let frameCount = 0;
        const maxFrames = 300; // Maximum animation duration (~5 seconds at 60fps)
        
        const animate = () => {
          particles.forEach((particle) => particle.update());
          frameCount++;
          
          // Continue animation until all particles fall below container or max frames reached
          const allParticlesFallen = particles.every((particle) => 
            particle.y > (explosionContainer as HTMLElement).offsetHeight + 200
          );
          
          if (!allParticlesFallen && frameCount < maxFrames) {
            animationId = requestAnimationFrame(animate);
          } else {
            cancelAnimationFrame(animationId);
            // Clean up particles after animation completes
            setTimeout(() => {
              explosionContainer.innerHTML = "";
            }, 100);
          }
        };
        animate();
      };
      
      const checkFooterPosition = () => {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (footerRect.top > viewportHeight + 100) {
          hasExploded = false;
        }
        
        if (!hasExploded && footerRect.top <= viewportHeight + 250) {
          explode();
        }
      };
      
      let checkTimeout: NodeJS.Timeout;
      window.addEventListener("scroll", () => {
        clearTimeout(checkTimeout);
        checkTimeout = setTimeout(checkFooterPosition, 5);
      });
      
      window.addEventListener("resize", () => {
        hasExploded = false;
      });
      
      createParticles();
      setTimeout(checkFooterPosition, 500);
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Page Transition */}
      <div className="transition">
        <div className="transition-overlay"></div>
        <div className="transition-overlay"></div>
        <div className="transition-overlay"></div>
        <div className="transition-overlay"></div>
        <div className="transition-overlay"></div>
      </div>

      <div className="page home-page">
        {/* Navigation */}
        <nav>
          <div className="logo">
            <div className="logo-container">
              <p className="mn">
                <a href="/">N ✦ K</a>
              </p>
            </div>
          </div>
          <div className="menu-toggle-btn">
            <div className="menu-toggle-btn-wrapper">
              <p className="mn open-label">Menu</p>
              <p className="mn close-label">Close</p>
            </div>
          </div>
        </nav>

        <div className="nav-overlay">
          <div className="nav-items">
            <div className="nav-item active">
              <p>
                <a href="/">Home</a>
              </p>
            </div>
            <div className="nav-item">
              <p>
                <a href="/contact">Contact</a>
              </p>
            </div>
          </div>
          <div className="nav-footer">
            <div className="nav-footer-item">
              <div className="nav-footer-item-header">
                <p className="mn">Find Me</p>
              </div>
              <div className="nav-footer-item-copy">
                <p className="mn">
                  <a href="https://github.com/crazynanda" target="_blank" rel="noopener noreferrer">
                    Github
                  </a>
                </p>
                <p className="mn">
                  <a href="https://www.linkedin.com/in/nanda-kumar-544500213/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
            <div className="nav-footer-item">
              <div className="nav-footer-item-header">
                <p className="mn"></p>
              </div>
              <div className="nav-footer-item-copy">
                <p className="mn"></p>
              </div>
            </div>
            <div className="nav-footer-item">
              <div className="nav-footer-item-header">
                <p className="mn">Get in Touch</p>
              </div>
              <div className="nav-footer-item-copy">
                <p className="mn">
                  <a href="mailto:nandablr242@gmail.com" target="_blank">
                    nandablr242@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-header-wrapper">
            <div className="hero-header hero-header-1">
              <h1>Nanda</h1>
            </div>
            <div className="hero-header hero-header-2">
              <h1>Kumar</h1>
            </div>
          </div>
          <div className="hero-footer">
            <div className="hero-footer-symbols">
              <p className="mn">Available for Work</p>
            </div>
            <div className="hero-footer-scroll-down">
              <p className="mn">
                <a href="#about" className="resume-link">
                  Fetch // Resume
                </a>
              </p>
            </div>
            <div className="hero-footer-tags">
              <p className="mn">Showcase Mode: ON</p>
            </div>
          </div>
        </section>

        {/* Hero Image Holder */}
        <section className="hero-img-holder">
          <div className="hero-img" style={{ transform: "translateY(-110%) scale(0.25) rotate(-15deg)" }}>
            <img 
              src="/images/projects/zeridex.png" 
              alt="Portfolio Preview" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </section>

        {/* About Section */}
        <section className="about-hero" id="about">
          <div className="about-hero-header">
            <h1>Hi, I&apos;m</h1>
            <h1>Nanda</h1>
          </div>
          <div className="about-hero-bio">
            <p className="ss">
              I&apos;m a web designer and developer who&apos;s obsessed with creating 
              award-worthy digital experiences. From crafting pixel-perfect interfaces 
              to building AI-powered automation systems, I live at the intersection where 
              beautiful design meets clean code. My work draws inspiration from the best 
              of modern web design — those jaw-dropping sites that make you pause mid-scroll.
            </p>
            <p className="mn">Code / Design / Craft / Repeat</p>
          </div>
          <div className="about-hero-portrait">
            <img 
              src="/images/about/portrait.jpg" 
              alt="Nanda Kumar Portrait" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </section>

        {/* Featured Work */}
        <section className="featured-work">
          <div className="featured-images">
            {[
              { src: "/images/projects/zeridex.png", alt: "Zeridex" },
              { src: "/images/projects/academicexpert.png", alt: "Academic Expert" },
              { src: "/images/projects/academicseva.png", alt: "Academic Seva" },
              { src: "/images/projects/lango.png", alt: "Lango" }
            ].map((project, index) => (
              <div key={index} className={`featured-img-card featured-img-card-${index + 1}`}>
                <img 
                  src={project.src} 
                  alt={project.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
          <div className="featured-titles">
            <div className="featured-title-wrapper">
              <h1 className="featured-title">Featured Projects</h1>
            </div>
            <div className="featured-title-wrapper">
              <div className="featured-title-img">
                <img src="/images/projects/zeridex.png" alt="Zeridex" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h1 className="featured-title">Zeridex</h1>
            </div>
            <div className="featured-title-wrapper">
              <div className="featured-title-img">
                <img src="/images/projects/academicexpert.png" alt="Academic Expert" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h1 className="featured-title">Academic Expert</h1>
            </div>
            <div className="featured-title-wrapper">
              <div className="featured-title-img">
                <img src="/images/projects/academicseva.png" alt="Academic Seva" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h1 className="featured-title">Academic Seva</h1>
            </div>
            <div className="featured-title-wrapper">
              <div className="featured-title-img">
                <img src="/images/projects/lango.png" alt="Lango" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h1 className="featured-title">Lango</h1>
            </div>
          </div>
          <div className="featured-work-indicator"></div>
          <div className="featured-work-footer">
            <p className="mn">Project Portfolio [ 5 ]</p>
            <p className="mn">///////////////////</p>
            <p className="mn">
              <a href="#">View All Projects</a>
            </p>
          </div>
        </section>

        {/* Services Header */}
        <section className="services-header">
          <div className="services-header-content">
            <div className="services-profile-icon">
              <div style={{ width: "100%", height: "100%", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p className="mn">NK</p>
              </div>
            </div>
            <p>Your Vision. My Expertise.</p>
            <div className="services-header-title">
              <h1>Full-stack development</h1>
              <h1>& Design Solutions</h1>
            </div>
            <div className="services-header-arrow-icon">
              <h1>&#8595;</h1>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="services">
          <div className="service-card" id="service-card-1">
            <div className="service-card-inner">
              <div className="service-card-content">
                <h1>Frontend Development</h1>
                <p className="ss">
                  Building modern, responsive user interfaces with React, Next.js, and TypeScript. 
                  Focus on performance, accessibility, and smooth animations.
                </p>
              </div>
              <div className="service-card-img">
                <img src="/images/frontend.jpg" alt="Frontend Development" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
          <div className="service-card" id="service-card-2">
            <div className="service-card-inner">
              <div className="service-card-content">
                <h1>Backend Development</h1>
                <p className="ss">
                  Creating robust server-side solutions with Convex, PostgreSQL, and modern APIs. 
                  Secure authentication and efficient data management.
                </p>
              </div>
              <div className="service-card-img">
                <img src="/images/backend.jpg" alt="Backend Development" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
          <div className="service-card" id="service-card-3">
            <div className="service-card-inner">
              <div className="service-card-content">
                <h1>UI/UX Design</h1>
                <p className="ss">
                  Crafting beautiful, intuitive interfaces with Figma. Focus on user experience, 
                  design systems, and attention to detail.
                </p>
              </div>
              <div className="service-card-img">
                <img src="/images/UIUXdesign.jpg" alt="UI/UX Design" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
          <div className="service-card" id="service-card-4">
            <div className="service-card-inner">
              <div className="service-card-content">
                <h1>AI Integration</h1>
                <p className="ss">
                  Leveraging OpenAI API and modern AI tools to build intelligent applications
                  and automation systems that enhance user experiences.
                </p>
              </div>
              <div className="service-card-img">
                <img src="/images/AIintegration.png" alt="AI Integration" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="contact-cta">
          <a href="/contact" className="contact-button">
            <div className="contact-text-small">
              <p>Let&apos;s build something amazing together</p>
            </div>
            <div className="contact-text-large">
              <h1>Get in touch</h1>
            </div>
          </a>
        </section>

        {/* Footer */}
        <footer>
          <div className="footer-container">
            <div className="footer-header">
              <h1>Nanda Kumar</h1>
            </div>
            <div className="footer-row">
              <div className="footer-col">
                <p className="mn">Explore</p>
                <p>
                  <a href="/">Home</a>
                </p>
                <p>
                  <a href="/contact">Contact</a>
                </p>
              </div>
              <div className="footer-col">
                <p className="mn">Creative Hub</p>
                <p>
                  <a href="https://www.zeridex.space" target="_blank" rel="noopener noreferrer">
                    View Portfolio
                  </a>
                </p>
                <p>
                  <a href="https://github.com/crazynanda" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </p>
              </div>
              <div className="footer-col">
                <p className="mn">Connect</p>
                <p>
                  <a href="https://www.linkedin.com/in/nanda-kumar-544500213/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </p>
                <p>
                  <a href="https://github.com/crazynanda" target="_blank" rel="noopener noreferrer">
                    Github
                  </a>
                </p>
                <p>
                  <a href="https://x.com/nandablr242" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </p>
              </div>
              <div className="footer-col">
                <p className="mn">Extras</p>
                <p>
                  <a href="https://www.awwwards.com" target="_blank" rel="noopener noreferrer">
                    Design Archive
                  </a>
                </p>
                <p>
                  <a href="https://www.pillarstack.com" target="_blank" rel="noopener noreferrer">
                    Basic References
                  </a>
                </p>
              </div>
            </div>
            <div className="copyright-info">
              <p className="mn">© - Nanda Kumar // 2025</p>
              <p className="mn"></p>
            </div>
            <div className="explosion-container" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "hidden" }}></div>
          </div>
        </footer>
      </div>
    </>
  );
}
