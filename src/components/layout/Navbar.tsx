"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks } from "@/data/social";
import { personalInfo } from "@/data/personal";
import { X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 xl:px-12 py-6 transition-all duration-500 ${
          isScrolled ? "bg-background/90 backdrop-blur-md" : ""
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="text-foreground font-bold text-xl tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-mono">N ✦ K</span>
          </motion.a>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[60] flex items-center gap-2 group"
          >
            <span className="text-mono text-foreground hidden sm:block">
              {isOpen ? "Close" : "Menu"}
            </span>
            <div className="w-8 h-8 flex items-center justify-center">
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <div className="flex flex-col gap-1.5">
                  <span className="w-6 h-0.5 bg-foreground transition-all group-hover:w-4" />
                  <span className="w-6 h-0.5 bg-foreground" />
                </div>
              )}
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-background"
          >
            <div className="h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
              {/* Nav Items */}
              <div className="container-wide">
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="block text-headline text-foreground hover:text-accent transition-colors text-left"
                      >
                        {item.label}
                      </button>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Footer Info */}
              <motion.div 
                className="container-wide mt-auto pb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border">
                  {/* Find Me */}
                  <div>
                    <p className="text-mono text-muted mb-3">Find Me</p>
                    <div className="space-y-1">
                      <a 
                        href={socialLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-foreground hover:text-accent transition-colors"
                      >
                        GitHub
                      </a>
                      <a 
                        href={socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-foreground hover:text-accent transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <p className="text-mono text-muted mb-3">Location</p>
                    <p className="text-foreground">{personalInfo.location}</p>
                  </div>

                  {/* Contact */}
                  <div>
                    <p className="text-mono text-muted mb-3">Get in Touch</p>
                    <a 
                      href={`mailto:${socialLinks.email}`}
                      className="text-foreground hover:text-accent transition-colors"
                    >
                      {socialLinks.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
