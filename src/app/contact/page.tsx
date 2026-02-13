"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<Array<{ element: HTMLDivElement; rotation: number; removeTime: number }>>([]);
  const mousePos = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const animationId = useRef<number | null>(null);
  const isDesktop = useRef(typeof window !== "undefined" ? window.innerWidth > 1000 : false);
  const lastRemovalTime = useRef(0);

  // Page transition
  useEffect(() => {
    // Scroll to top on page load/refresh - MUST happen first
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      // Prevent browser from restoring scroll position
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    }

    gsap.set(".transition-overlay", { scaleY: 1, transformOrigin: "top" });
    gsap.to(".transition-overlay", {
      scaleY: 0,
      duration: 0.6,
      stagger: -0.1,
      ease: "power2.inOut",
      delay: 0.2,
    });
  }, []);

  // Mouse trail effect
  const createImage = useCallback(() => {
    if (!containerRef.current) return;
    
    const img = document.createElement("div");
    img.className = "trail-img";
    const images = [
      "/images/work-items/work-item-1.jpg",
      "/images/work-items/work-item-2.jpg",
      "/images/work-items/work-item-3.jpg",
      "/images/work-items/work-item-4.jpg",
      "/images/work-items/work-item-5.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    const rotation = (Math.random() - 0.5) * 40;
    
    img.style.backgroundImage = `url(${images[randomIndex]})`;
    img.style.backgroundSize = "cover";
    img.style.backgroundPosition = "center";
    
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = mousePos.current.x - rect.left;
    const relativeY = mousePos.current.y - rect.top;
    
    img.style.left = `${relativeX}px`;
    img.style.top = `${relativeY}px`;
    img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
    img.style.transition = "transform 600ms cubic-bezier(.07,.5,.5,1)";
    
    containerRef.current.appendChild(img);
    
    setTimeout(() => {
      img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
    }, 10);
    
    trailRef.current.push({
      element: img,
      rotation,
      removeTime: Date.now() + 800,
    });
  }, []);

  const removeOldImages = useCallback(() => {
    const now = Date.now();
    if (now - lastRemovalTime.current < 60 || trailRef.current.length === 0) return;
    
    const oldestImage = trailRef.current[0];
    if (now >= oldestImage.removeTime) {
      const imgToRemove = trailRef.current.shift();
      if (imgToRemove) {
        imgToRemove.element.style.transition = "transform 800ms cubic-bezier(.87, 0, .13, 1)";
        imgToRemove.element.style.transform = `translate(-50%, -50%) rotate(${imgToRemove.rotation}deg) scale(0)`;
        lastRemovalTime.current = now;
        
        setTimeout(() => {
          if (imgToRemove.element.parentNode) {
            imgToRemove.element.parentNode.removeChild(imgToRemove.element);
          }
        }, 800);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isInContainer = 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;
      
      if (isInContainer) {
        const distance = Math.sqrt(
          Math.pow(mousePos.current.x - mousePos.current.lastX, 2) + 
          Math.pow(mousePos.current.y - mousePos.current.lastY, 2)
        );
        
        if (distance > 80) {
          mousePos.current.lastX = mousePos.current.x;
          mousePos.current.lastY = mousePos.current.y;
          createImage();
        }
      }
    };

    const animate = () => {
      removeOldImages();
      animationId.current = requestAnimationFrame(animate);
    };

    if (isDesktop.current) {
      document.addEventListener("mousemove", handleMouseMove);
      animate();
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      trailRef.current.forEach((item) => {
        if (item.element.parentNode) {
          item.element.parentNode.removeChild(item.element);
        }
      });
      trailRef.current = [];
    };
  }, [createImage, removeOldImages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
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

      <div className="page contact-page">
        {/* Navigation */}
        <nav>
          <div className="logo">
            <div className="logo-container">
              <p className="mn">
                <a href="/">N ✦ K</a>
              </p>
            </div>
          </div>
        </nav>

        {/* Contact Section */}
        <section className="contact trail-container" ref={containerRef}>
          <div className="floating-elements">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="floating-element"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${8 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
          
          <div className="contact-left">
            <div className="contact-card-header-main">
              <h1>Let&apos;s Connect</h1>
              <p>
                Got a project idea? Need a stunning website or a robust app? Or just want to geek out over code and design? I&apos;m all in. Drop me a line, and let&apos;s create something extraordinary together.
              </p>
            </div>
            <div className="contact-info">
              <div className="contact-info-item">
                <p className="label">Project Inquiries</p>
                <p>
                  <a href="mailto:nandablr242@gmail.com" target="_blank" rel="noopener noreferrer">
                    nandablr242@gmail.com
                  </a>
                </p>
              </div>
              <div className="contact-info-item">
                <p className="label">Quick Chat</p>
                <p>
                  <a href="https://x.com/nandablr242" target="_blank" rel="noopener noreferrer">
                    @nandablr242
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <div className="form-header">
              <h2>Start a Project</h2>
              <p>Tell me about your vision and let&apos;s make it reality</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" id="firstName" name="firstName" placeholder="Your first name" required />
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-group">
                  <input type="text" id="lastName" name="lastName" placeholder="Your last name" required />
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="email" id="email" name="email" placeholder="your@email.com" required />
                  <label htmlFor="email">Email Address</label>
                </div>
                <div className="form-group">
                  <input type="tel" id="phone" name="phone" placeholder="+91 80736 07257" />
                  <label htmlFor="phone">Phone Number</label>
                </div>
              </div>
              <div className="form-group full-width">
                <select id="projectType" name="projectType" required>
                  <option value="">Select project type</option>
                  <option value="website">Website Development</option>
                  <option value="webapp">Web Application</option>
                  <option value="mobileapp">Mobile Application</option>
                  <option value="ecommerce">E-commerce Platform</option>
                  <option value="redesign">Website Redesign</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </select>
                <label htmlFor="projectType">Project Type</label>
              </div>
              <div className="form-group full-width">
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Tell me about your project, goals, timeline, and budget..." 
                  required
                />
                <label htmlFor="message">Project Details</label>
              </div>
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Message"}
              </button>
              <div className={`success-message ${isSubmitted ? "show" : ""}`}>
                <p>Thanks! Your message has been sent. I&apos;ll get back to you within 24 hours.</p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
