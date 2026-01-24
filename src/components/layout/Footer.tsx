"use client";

import Link from "next/link";
import { Linkedin, Twitter, Github, Instagram, Mail } from "lucide-react";
import { socialLinks } from "@/data/social";
import { personalInfo } from "@/data/personal";

// Screw/Bolt SVG Component - Using inline SVG for guaranteed rendering
const Screw = () => (
  <div style={{ width: '24px', height: '24px' }}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="screwGradient" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#d1d5db"/> {/* Lighter gray for visibility */}
          <stop offset="100%" stopColor="#4b5563"/>
        </radialGradient>
        <radialGradient id="screwInner" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#374151"/>
          <stop offset="100%" stopColor="#111827"/>
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill="url(#screwGradient)" stroke="#1f2937" strokeWidth="1"/>
      <circle cx="12" cy="12" r="6" fill="url(#screwInner)" stroke="#4b5563" strokeWidth="0.5"/>
      <rect x="11" y="4" width="2" height="16" rx="1" fill="#1f2937" transform="rotate(45 12 12)"/>
      <rect x="11" y="4" width="2" height="16" rx="1" fill="#1f2937" transform="rotate(-45 12 12)"/>
    </svg>
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" style={{ 
      position: 'relative', 
      padding: '48px 16px',  
      backgroundColor: '#050505', // Site theme background
      display: 'flex',
      justifyContent: 'center'
    }}>
      {/* Main Footer Card - Metal Board Effect */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1024px',
        borderRadius: '16px',
        overflow: 'hidden',
        // Metal Board Look: Dark gradient with metallic shine
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%)',
        boxShadow: `
          0 10px 15px -3px rgba(0, 0, 0, 0.5), 
          0 4px 6px -2px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
          0 0 0 1px rgba(255, 255, 255, 0.05)
        `,
        border: '1px solid rgba(75, 85, 99, 0.4)'
      }}>
        {/* Brushed Metal Texture Overlay (Simulated with noise/pattern) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 10px)',
          pointerEvents: 'none'
        }} />

        {/* Corner Screws - Absolute Positioning */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10 }}><Screw /></div>
        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}><Screw /></div>
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', zIndex: 10 }}><Screw /></div>
        <div style={{ position: 'absolute', bottom: '16px', right: '16px', zIndex: 10 }}><Screw /></div>

        {/* Footer Content */}
        <div style={{ position: 'relative', zIndex: 1, padding: '40px 48px' }}>
          
          {/* Top Section: Flex Layout */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '40px'
          }}>
            
            {/* Brand Column */}
            <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '900',
                  color: 'white',
                  fontSize: '20px',
                  boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'
                }}>NK</div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0, lineHeight: 1.2 }}>{personalInfo.name}</h3>
                  <p style={{ fontSize: '14px', color: '#22d3ee', margin: 0, fontWeight: '500' }}>{personalInfo.title}</p>
                </div>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                Building AI-powered websites and modern web experiences from Bangalore, India.
              </p>
              
              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { icon: Github, href: socialLinks.github },
                  { icon: Linkedin, href: socialLinks.linkedin },
                  { icon: Twitter, href: socialLinks.twitter },
                  { icon: Instagram, href: socialLinks.instagram },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9ca3af',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none'
                    }}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns Container */}
            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
              
              {/* Navigation */}
              <div style={{ minWidth: '100px' }}>
                <h4 style={{ color: '#22d3ee', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Navigation</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                    <Link
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div style={{ minWidth: '120px' }}>
                <h4 style={{ color: '#c084fc', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Projects</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="https://www.zeridex.space" target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Zeridex</a>
                  <a href="https://www.academicexpert.in" target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Academic Expert</a>
                  <a href="https://www.academicseva.org" target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Academic Seva</a>
                </div>
              </div>

              {/* Connect */}
              <div style={{ minWidth: '100px' }}>
                <h4 style={{ color: '#f472b6', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Connect</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>GitHub</a>
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>LinkedIn</a>
                  <a href={`mailto:${socialLinks.email}`} style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Email</a>
                </div>
              </div>

            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', margin: '32px 0' }} />

          {/* Bottom Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>© {currentYear} {personalInfo.name}</span>
              <span style={{ color: 'rgba(255,255,255,0.1)' }}>•</span>
              <span>Made with <span style={{ color: '#3b82f6' }}>💙</span> in India 🇮🇳</span>
            </div>
            
            <a href={`mailto:${socialLinks.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', textDecoration: 'none' }}>
              <Mail size={16} />
              <span>{socialLinks.email}</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
