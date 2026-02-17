"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Particle class for footer explosion animation
interface ParticleConfig {
  gravity: number;
  friction: number;
  imageSize: number;
  horizontalForce: number;
  verticalForce: number;
  rotationSpeed: number;
}

class Particle {
  element: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  config: ParticleConfig;
  
  constructor(element: HTMLImageElement, config: ParticleConfig) {
    this.element = element;
    this.config = config;
    this.x = 0;
    this.y = 0;
    this.vx = (Math.random() - 0.5) * config.horizontalForce;
    this.vy = -config.verticalForce - Math.random() * 10;
    this.rotation = 0;
    this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
  }
  
  update() {
    this.vy += this.config.gravity;
    this.vx *= this.config.friction;
    this.vy *= this.config.friction;
    this.rotationSpeed *= this.config.friction;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${this.rotation}deg)`;
  }
}

export default function Home() {
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const imageIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasExplodedRef = useRef(false);
  const isMenuOpenRef = useRef(false);
  const scrollYRef = useRef(0);

  const clearAllScrollTriggers = useCallback(() => {
    scrollTriggersRef.current.forEach(trigger => {
      if (trigger) trigger.kill();
    });
    scrollTriggersRef.current = [];
  }, []);

  useEffect(() => {
    // Scroll to top on page load/refresh
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    }

    gsap.registerPlugin(ScrollTrigger);
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth <= 1000;
    const isSmallMobile = window.innerWidth <= 768;

    // Page Transition - Reveal
    const revealTransition = () => {
      gsap.set(".transition-overlay", { scaleY: 1, transformOrigin: "top" });
      gsap.to(".transition-overlay", {
        scaleY: 0,
        duration: 0.6,
        stagger: -0.1,
        ease: "power2.inOut",
        delay: 0.2,
        onComplete: () => {
          // Hide transition overlays after animation completes
          document.querySelector(".page")?.classList.add("loaded");
        },
      });
    };

    revealTransition();

    // Menu Toggle with GSAP animations
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    const navOverlay = document.querySelector(".nav-overlay");
    const openLabel = document.querySelector(".open-label");
    const closeLabel = document.querySelector(".close-label");

    if (menuToggleBtn && navOverlay) {
      menuToggleBtn.addEventListener("click", () => {
        if (!isMenuOpenRef.current) {
          // Open menu
          navOverlay.classList.add("active");
          menuToggleBtn.classList.add("menu-open");
          scrollYRef.current = window.scrollY;
          document.body.style.position = "fixed";
          document.body.style.top = `-${scrollYRef.current}px`;
          document.body.style.width = "100%";

          // GSAP animation for menu labels
          gsap.to([openLabel, closeLabel], {
            y: "-1rem",
            duration: 0.3,
            ease: "power2.out",
          });

          isMenuOpenRef.current = true;
        } else {
          // Close menu
          navOverlay.classList.remove("active");
          menuToggleBtn.classList.remove("menu-open");
          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.width = "";
          window.scrollTo(0, scrollYRef.current);

          // GSAP animation for menu labels
          gsap.to([openLabel, closeLabel], {
            y: "0rem",
            duration: 0.3,
            ease: "power2.out",
          });

          isMenuOpenRef.current = false;
        }
      });
    }

    // Hero Image Cycling Animation (every 250ms) - Only project images
    setTimeout(() => {
      const heroImg = document.querySelector(".hero-img img") as HTMLImageElement;
      
      if (heroImg && !prefersReducedMotion) {
        const heroImages = [
          "/images/projects/zeridex.png",
          "/images/projects/academicexpert.png",
          "/images/projects/academicseva.png",
          "/images/projects/lango.png",
          "/images/projects/zeridex.png",
          "/images/projects/academicexpert.png",
          "/images/projects/academicseva.png",
          "/images/projects/lango.png",
          "/images/projects/zeridex.png",
          "/images/projects/academicexpert.png",
        ];
        let currentImageIndex = 0;
        
        imageIntervalRef.current = setInterval(() => {
          currentImageIndex = currentImageIndex >= heroImages.length - 1 ? 0 : currentImageIndex + 1;
          if (heroImg) {
            heroImg.src = heroImages[currentImageIndex];
          }
        }, 250);
      }
    }, 100);

    // Hero Image Scroll Animation - Pin and move from top to bottom
    if (!prefersReducedMotion) {
      const heroSection = document.querySelector(".hero-img-holder");
      if (heroSection) {
        const heroTrigger = ScrollTrigger.create({
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          pin: ".hero-img-holder",
          pinSpacing: false,
          scrub: 1,
        });
        scrollTriggersRef.current.push(heroTrigger);

        // Also animate the hero-img inner element
        const heroImgAnim = ScrollTrigger.create({
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            gsap.set(".hero-img", {
              y: `${-110 + 110 * self.progress}%`,
              scale: 0.25 + 0.75 * self.progress,
              rotation: -15 + 15 * self.progress,
            });
          },
        });
        scrollTriggersRef.current.push(heroImgAnim);
      }
    }

    // Featured Work Section - 10 Cards with 3D Animation
    if (!prefersReducedMotion && !isSmallMobile) {
      const initFeaturedWork = () => {
        // Clear existing
        clearAllScrollTriggers();

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

        // Define image card positions for different screen sizes
        const featuredCardPosSmall = [
          { y: 100, x: 1000 },
          { y: 1500, x: 100 },
          { y: 1250, x: 1950 },
          { y: 1500, x: 850 },
          { y: 200, x: 2100 },
          { y: 250, x: 600 },
          { y: 1100, x: 1650 },
          { y: 1000, x: 800 },
          { y: 900, x: 2200 },
          { y: 150, x: 1600 },
        ];
        
        const featuredCardPosLarge = [
          { y: 800, x: 5000 },
          { y: 2000, x: 3000 },
          { y: 240, x: 4450 },
          { y: 1200, x: 3450 },
          { y: 500, x: 2200 },
          { y: 750, x: 1100 },
          { y: 1850, x: 3350 },
          { y: 2200, x: 1300 },
          { y: 3000, x: 1950 },
          { y: 500, x: 4500 },
        ];
        
        const featuredCardPos = window.innerWidth >= 1600 ? featuredCardPosLarge : featuredCardPosSmall;

        // Create image cards dynamically
        const imagesContainer = document.querySelector(".featured-images");
        if (imagesContainer) {
          imagesContainer.innerHTML = "";
          const projectImages = [
            "/images/projects/zeridex.png",
            "/images/projects/academicexpert.png",
            "/images/projects/academicseva.png",
            "/images/projects/lango.png",
            "/images/frontend.jpg",
            "/images/backend.jpg",
            "/images/UIUXdesign.jpg",
            "/images/AIintegration.png",
            "/images/about/portrait.jpg",
            "/images/projects/zeridex.png",
          ];
          
          for (let i = 0; i < 10; i++) {
            const featuredImgCard = document.createElement("div");
            featuredImgCard.className = `featured-img-card featured-img-card-${i + 1}`;
            const img = document.createElement("img");
            img.src = projectImages[i];
            img.alt = `featured work image ${i + 1}`;
            featuredImgCard.appendChild(img);
            
            const position = featuredCardPos[i];
            gsap.set(featuredImgCard, {
              x: position.x,
              y: position.y,
              z: -1500,
              scale: 0,
            });
            
            imagesContainer.appendChild(featuredImgCard);
          }
        }

        const featuredTitles = document.querySelector(".featured-titles") as HTMLElement;
        const moveDistance = window.innerWidth * 4;
        const scrollEnd = `+=${window.innerHeight * 5}px`;

        const featuredTrigger = ScrollTrigger.create({
          trigger: ".featured-work",
          start: "top top",
          end: scrollEnd,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Move titles horizontally
            if (featuredTitles) {
              gsap.set(featuredTitles, { x: -moveDistance * self.progress });
            }

            // Animate image cards
            const featuredImgCards = document.querySelectorAll(".featured-img-card");
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
        scrollTriggersRef.current.push(featuredTrigger);
      };

      initFeaturedWork();
    }

    // Services Sticky Cards
    if (!prefersReducedMotion && !isMobile) {
      const services = gsap.utils.toArray(".service-card");
      services.forEach((service, index) => {
        const isLastServiceCard = index === services.length - 1;
        const serviceCardInner = (service as Element).querySelector(".service-card-inner");

        if (!isLastServiceCard && serviceCardInner) {
          const pinTrigger = ScrollTrigger.create({
            trigger: service as Element,
            start: "top 45%",
            endTrigger: ".contact-cta",
            end: "top 90%",
            pin: true,
            pinSpacing: false,
          });
          scrollTriggersRef.current.push(pinTrigger);

          const scrollAnim = gsap.to(serviceCardInner, {
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
          if (scrollAnim.scrollTrigger) {
            scrollTriggersRef.current.push(scrollAnim.scrollTrigger);
          }
        }
      });
    }

    // About Portrait Animation (desktop only)
    if (!isMobile && !prefersReducedMotion) {
      const aboutAnim = gsap.to(".about-hero-portrait", {
        y: -200,
        rotation: -25,
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      if (aboutAnim.scrollTrigger) {
        scrollTriggersRef.current.push(aboutAnim.scrollTrigger);
      }
    }

    // Footer Explosion Animation
    const footer = document.querySelector("footer");
    const explosionContainer = document.querySelector(".explosion-container");
    
    if (footer && explosionContainer && !prefersReducedMotion && !isMobile) {
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
        "/images/projects/zeridex.png",
      ];
      
      // Preload images
      imagePaths.forEach((path) => {
        const img = new Image();
        img.src = path;
      });
      
      const createParticles = () => {
        explosionContainer.innerHTML = "";
        const containerWidth = (explosionContainer as HTMLElement).offsetWidth;
        const containerHeight = (explosionContainer as HTMLElement).offsetHeight;
        const centerX = containerWidth / 2 - config.imageSize / 2;
        const centerY = containerHeight / 2 - config.imageSize / 2;
        
        imagePaths.forEach((path) => {
          const particle = document.createElement("img");
          particle.src = path;
          particle.classList.add("explosion-particle-img");
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
        if (hasExplodedRef.current) return;
        hasExplodedRef.current = true;
        
        createParticles();
        const particleElements = document.querySelectorAll(".explosion-particle-img");
        const particles = Array.from(particleElements).map(
          (element) => new Particle(element as HTMLImageElement, config)
        );
        
        let animationId: number;
        let frameCount = 0;
        const maxFrames = 300;
        
        const animate = () => {
          particles.forEach((particle) => particle.update());
          frameCount++;
          
          const allParticlesFallen = particles.every((particle) => 
            particle.y > (explosionContainer as HTMLElement).offsetHeight + 200
          );
          
          if (!allParticlesFallen && frameCount < maxFrames) {
            animationId = requestAnimationFrame(animate);
          } else {
            cancelAnimationFrame(animationId);
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
          hasExplodedRef.current = false;
        }
        
        if (!hasExplodedRef.current && footerRect.top <= viewportHeight + 250) {
          explode();
        }
      };
      
      let checkTimeout: NodeJS.Timeout;
      const handleScroll = () => {
        clearTimeout(checkTimeout);
        checkTimeout = setTimeout(checkFooterPosition, 5);
      };
      
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", () => {
        hasExplodedRef.current = false;
      });
      
      createParticles();
      setTimeout(checkFooterPosition, 500);
    }

    // Cleanup
    return () => {
      clearAllScrollTriggers();
      if (imageIntervalRef.current) clearInterval(imageIntervalRef.current);
    };
  }, [clearAllScrollTriggers]);

  const handleContactClick = () => {
    gsap.set(".transition-overlay", { scaleY: 0, transformOrigin: "bottom" });
    gsap.to(".transition-overlay", {
      scaleY: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.inOut",
      onComplete: () => {
        window.location.href = "/contact";
      }
    });
  };

  return (
    <>
      {/* Page Transition */}
      <div className="transition">
        <div className="transition-overlay overlay-1"></div>
        <div className="transition-overlay overlay-2"></div>
        <div className="transition-overlay overlay-3"></div>
        <div className="transition-overlay overlay-4"></div>
        <div className="transition-overlay overlay-5"></div>
      </div>

      <div className="page home-page">
        {/* Navigation */}
        <nav>
          <div className="logo">
            <div className="logo-container cursor-target">
              <p className="mn">
                <Link href="/">N ✦ K</Link>
              </p>
            </div>
          </div>
          <div className="menu-toggle-btn cursor-target">
            <div className="menu-toggle-btn-wrapper">
              <p className="mn open-label">Menu</p>
              <p className="mn close-label">Close</p>
            </div>
          </div>
        </nav>

        <div className="nav-overlay">
          <div className="nav-items">
            <div className="nav-item active cursor-target">
              <p>
                <Link href="/">Home</Link>
              </p>
            </div>
            <div className="nav-item cursor-target">
              <p>
                <Link href="/contact">Contact</Link>
              </p>
            </div>
          </div>
          <div className="nav-footer">
            <div className="nav-footer-item">
              <div className="nav-footer-item-header">
                <p className="mn">Find Me</p>
              </div>
              <div className="nav-footer-item-copy">
                <p className="mn cursor-target">
                  <a href="https://github.com/crazynanda" target="_blank" rel="noopener noreferrer">
                    Github
                  </a>
                </p>
                <p className="mn cursor-target">
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
                <p className="mn cursor-target">
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
            <div className="hero-footer-scroll-down cursor-target">
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/projects/zeridex.png" 
              alt="Portfolio Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover", padding: "2em" }}
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
            <NextImage 
              src="/images/about/portrait.jpg" 
              alt="Nanda Kumar Portrait"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 35vw"
            />
          </div>
        </section>

        {/* Featured Work */}
        <section className="featured-work">
          <div className="featured-images"></div>
          <div className="featured-titles">
            <div className="featured-title-wrapper">
              <h1 className="featured-title">Featured Projects</h1>
            </div>
            <div className="featured-title-wrapper cursor-target">
              <div className="featured-title-img">
                <NextImage src="/images/projects/zeridex.png" alt="Zeridex" fill style={{ objectFit: "cover" }} sizes="150px" />
              </div>
              <h1 className="featured-title">
                <a href="https://zeridex.space" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>Zeridex</a>
              </h1>
            </div>
            <div className="featured-title-wrapper cursor-target">
              <div className="featured-title-img">
                <NextImage src="/images/projects/academicexpert.png" alt="Academic Expert" fill style={{ objectFit: "cover" }} sizes="150px" />
              </div>
              <h1 className="featured-title">
                <a href="https://academicexpert.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>Academic Expert</a>
              </h1>
            </div>
            <div className="featured-title-wrapper cursor-target">
              <div className="featured-title-img">
                <NextImage src="/images/projects/academicseva.png" alt="Academic Seva" fill style={{ objectFit: "cover" }} sizes="150px" />
              </div>
              <h1 className="featured-title">
                <a href="https://academicseva.org" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>Academic Seva</a>
              </h1>
            </div>
            <div className="featured-title-wrapper cursor-target">
              <div className="featured-title-img">
                <NextImage src="/images/projects/lango.png" alt="Lango" fill style={{ objectFit: "cover" }} sizes="150px" />
              </div>
              <h1 className="featured-title">
                <a href="https://langoleaf.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>Lango</a>
              </h1>
            </div>
          </div>
          <div className="featured-work-indicator"></div>
          <div className="featured-work-footer">
            <p className="mn">Project Portfolio [ 5 ]</p>
            <p className="mn">{"///////////////////"}</p>
            <p className="mn cursor-target">
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
                <NextImage src="/images/frontend.jpg" alt="Frontend Development" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
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
                <NextImage src="/images/backend.jpg" alt="Backend Development" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
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
                <NextImage src="/images/UIUXdesign.jpg" alt="UI/UX Design" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
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
                <NextImage src="/images/AIintegration.png" alt="AI Integration" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="contact-cta">
          <button 
            className="contact-button cursor-target"
            onClick={handleContactClick}
          >
            <div className="contact-text-small">
              <p>Let&apos;s build something amazing together</p>
            </div>
            <div className="contact-text-large">
              <h1>Get in touch</h1>
            </div>
          </button>
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
                <p className="cursor-target">
                  <Link href="/">Home</Link>
                </p>
                <p className="cursor-target">
                  <Link href="/contact">Contact</Link>
                </p>
              </div>
              <div className="footer-col">
                <p className="mn">Creative Hub</p>
                <p className="cursor-target">
                  <a href="https://www.zeridex.space" target="_blank" rel="noopener noreferrer">
                    View Portfolio
                  </a>
                </p>
                <p className="cursor-target">
                  <a href="https://github.com/crazynanda" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </p>
              </div>
              <div className="footer-col">
                <p className="mn">Connect</p>
                <p className="cursor-target">
                  <a href="https://www.linkedin.com/in/nanda-kumar-544500213/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </p>
                <p className="cursor-target">
                  <a href="https://github.com/crazynanda" target="_blank" rel="noopener noreferrer">
                    Github
                  </a>
                </p>
                <p className="cursor-target">
                  <a href="https://x.com/nandablr242" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </p>
              </div>
              <div className="footer-col">
                <p className="mn">Extras</p>
                <p className="cursor-target">
                  <a href="https://www.awwwards.com" target="_blank" rel="noopener noreferrer">
                    Design Archive
                  </a>
                </p>
                <p className="cursor-target">
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
