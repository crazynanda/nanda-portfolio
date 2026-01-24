"use client";

import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";
import { socialLinks } from "@/data/social";
import { personalInfo } from "@/data/personal";

// Black Tape SVG Decoration
const Tape = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="95" height="80" viewBox="0 0 95 80" fill="none">
    <path d="M1 45L70.282 5L88.282 36.1769L19 76.1769L1 45Z" fill="#222222"/>
    <path d="M69.6829 39.997C74.772 36.9233 80.2799 35.022 85.4464 32.0415C85.5584 31.9769 85.6703 31.912 85.782 31.8468L83.9519 38.6769C80.2833 32.3886 75.7064 26.4975 72.2275 20.0846C70.0007 15.9783 67.7966 11.8425 65.6183 7.69261L72.9746 9.66373C70.566 10.9281 68.1526 12.1837 65.7375 13.4301C59.1543 16.828 52.5477 20.1634 45.9059 23.4675C39.2779 26.7637 32.6138 30.0293 25.946 33.2683C21.417 35.4683 16.8774 37.6611 12.3408 39.8468C10.3494 40.8065 8.36335 41.7623 6.37228 42.7203C4.88674 43.4348 3.40117 44.1492 1.91563 44.8637C1.70897 44.9628 1.48389 45.0108 1.28779 44.994C1.0916 44.977 0.940536 44.8975 0.866099 44.7681C0.791689 44.6386 0.798739 44.4674 0.882816 44.289C0.966978 44.111 1.12195 43.9408 1.31146 43.8119L69.6829 39.997Z" fill="#222222"/>
  </svg>
);

export default function FooterTapedDesign() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4" style={{ backgroundColor: '#F0F0F0' }}>
      {/* Main Footer Card - White with rounded corners */}
      <div className="relative bg-white rounded-3xl max-w-5xl mx-auto px-4 py-10">
        
        {/* Decorative Black Tapes at corners */}
        <div className="hidden md:block absolute -top-4 -left-8 w-[80px] h-[36px] scale-75">
          <Tape />
        </div>
        <div className="hidden md:block absolute -top-4 -right-8 rotate-90 w-[80px] h-[36px] scale-75">
          <Tape />
        </div>

        {/* Footer Content - Horizontal Layout */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-10 px-2 md:px-8">
          
          {/* Brand Column - Left Side */}
          <div className="flex flex-col items-start gap-2">
            <Link
              href="/"
              className="flex flex-row gap-1 items-center justify-start text-2xl font-extrabold"
              style={{ color: '#0A0A0A' }}
            >
              {personalInfo.name}
            </Link>
            <p className="font-medium text-base w-full md:w-4/5" style={{ color: 'rgba(34, 34, 34, 0.5)' }}>
              {personalInfo.title} based in {personalInfo.location}. Building AI-powered websites and modern web experiences.
            </p>
          </div>

          {/* Right Side - Link Columns */}
          <div className="flex flex-col md:mx-4 md:flex-row gap-2 md:gap-20 items-start md:items-start">
            
            {/* Navigation Column */}
            <div className="flex flex-col gap-1 md:gap-4">
              <h4 className="uppercase text-md font-semibold" style={{ color: 'rgba(34, 34, 34, 0.5)' }}>Navigation</h4>
              <div className="flex flex-wrap md:flex-col gap-2 text-sm items-start">
                <Link className="whitespace-nowrap font-medium hover:opacity-100 transition-opacity" style={{ color: 'rgba(34, 34, 34, 0.5)' }} href="#about">About</Link>
                <Link className="whitespace-nowrap font-medium hover:opacity-100 transition-opacity" style={{ color: 'rgba(34, 34, 34, 0.5)' }} href="#skills">Skills</Link>
                <Link className="whitespace-nowrap font-medium hover:opacity-100 transition-opacity" style={{ color: 'rgba(34, 34, 34, 0.5)' }} href="#projects">Projects</Link>
                <Link className="whitespace-nowrap font-medium hover:opacity-100 transition-opacity" style={{ color: 'rgba(34, 34, 34, 0.5)' }} href="#experience">Experience</Link>
                <Link className="whitespace-nowrap font-medium hover:opacity-100 transition-opacity" style={{ color: 'rgba(34, 34, 34, 0.5)' }} href="#contact">Contact</Link>
              </div>
            </div>

            {/* Projects Column */}
            <div className="flex flex-col gap-1 md:gap-4">
              <h4 className="uppercase whitespace-nowrap text-md font-semibold" style={{ color: 'rgba(34, 34, 34, 0.5)' }}>Projects</h4>
              <div className="flex gap-2 flex-wrap md:flex-col text-sm items-start">
                <a className="whitespace-nowrap font-medium hover:opacity-100 transition-opacity" style={{ color: 'rgba(34, 34, 34, 0.5)' }} href="https://www.zeridex.space" target="_blank" rel="noopener noreferrer">Zeridex</a>
                <a className="whitespace-nowrap font-medium hover:opacity-100 transition-opacity" style={{ color: 'rgba(34, 34, 34, 0.5)' }} href="https://www.academicexpert.in" target="_blank" rel="noopener noreferrer">Academic Expert</a>
                <a className="whitespace-nowrap font-medium hover:opacity-100 transition-opacity" style={{ color: 'rgba(34, 34, 34, 0.5)' }} href="https://www.academicseva.org" target="_blank" rel="noopener noreferrer">Academic Seva</a>
              </div>
            </div>

            {/* Connect Column */}
            <div className="flex flex-col gap-1 md:gap-4">
              <h4 className="uppercase whitespace-nowrap text-md font-semibold" style={{ color: 'rgba(34, 34, 34, 0.5)' }}>Connect</h4>
              <div className="flex flex-col gap-2 text-sm items-start">
                <a className="whitespace-nowrap font-medium hover:opacity-100 transition-opacity" style={{ color: 'rgba(34, 34, 34, 0.5)' }} href={socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="whitespace-nowrap font-medium hover:opacity-100 transition-opacity" style={{ color: 'rgba(34, 34, 34, 0.5)' }} href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="whitespace-nowrap font-medium hover:opacity-100 transition-opacity" style={{ color: 'rgba(34, 34, 34, 0.5)' }} href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                <a className="whitespace-nowrap font-medium hover:opacity-100 transition-opacity" style={{ color: 'rgba(34, 34, 34, 0.5)' }} href={`mailto:${socialLinks.email}`}>Email</a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Row - Copyright & Social Icons */}
      <div className="my-3 px-4 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm max-w-5xl mx-auto" style={{ color: '#222222' }}>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-start sm:items-center">
          <p className="whitespace-nowrap">
            ©{currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex flex-row gap-4">
            <Link href="#contact">Contact</Link>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              {personalInfo.name.split(' ')[0]}
            </a>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:opacity-70 transition-opacity"
          >
            <Linkedin className="w-5 h-5 fill-current" style={{ color: '#222222' }} />
          </a>
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:opacity-70 transition-opacity"
          >
            <Twitter className="w-5 h-5 fill-current" style={{ color: '#222222' }} />
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:opacity-70 transition-opacity"
          >
            <Github className="w-5 h-5" style={{ color: '#222222' }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
