import Link from "next/link";
import { Linkedin, Twitter, Github, Instagram, Mail } from "lucide-react";
import { socialLinks } from "@/data/social";
import { personalInfo } from "@/data/personal";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">NK</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{personalInfo.name}</h3>
                <p className="text-blue-600 font-medium">{personalInfo.title}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Building AI-powered websites and modern web experiences from Bangalore, India.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
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
                  className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <div className="space-y-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="space-y-2">
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                GitHub
              </a>
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                LinkedIn
              </a>
              <a 
                href={`mailto:${socialLinks.email}`}
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </div>
          
          <a 
            href={`mailto:${socialLinks.email}`} 
            className="flex items-center gap-2 text-gray-500 text-sm hover:text-blue-600"
          >
            <Mail size={16} />
            <span>{socialLinks.email}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
