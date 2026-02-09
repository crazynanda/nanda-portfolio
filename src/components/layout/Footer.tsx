"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { socialLinks } from "@/data/social";
import { personalInfo } from "@/data/personal";
import { Github, Linkedin, Twitter, Instagram, Mail, Heart, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const socialIcons = [
  { name: "GitHub", href: socialLinks.github, icon: Github },
  { name: "LinkedIn", href: socialLinks.linkedin, icon: Linkedin },
  { name: "Twitter", href: socialLinks.twitter, icon: Twitter },
  { name: "Instagram", href: socialLinks.instagram, icon: Instagram },
];

const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">{personalInfo.name}</h3>
            <p className="text-muted-foreground mb-6">
              Building AI-powered websites and modern web experiences from Bangalore, India.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-cyan-500 hover:bg-cyan-500/10 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-3">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-cyan-500 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-cyan-500 group-hover:w-4 transition-all duration-300" />
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <motion.a
                href={`mailto:${socialLinks.email}`}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-muted-foreground hover:text-cyan-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {socialLinks.email}
              </motion.a>
              <p className="text-muted-foreground">
                {personalInfo.location}
              </p>
              <p className="text-green-500 text-sm">
                {personalInfo.availability}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"
        />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm flex items-center gap-1"
          >
            © {currentYear} {personalInfo.name}. Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500 inline mx-1" />
            </motion.span>
            in Bangalore
          </motion.p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-cyan-500 transition-colors text-sm"
          >
            Back to top
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
