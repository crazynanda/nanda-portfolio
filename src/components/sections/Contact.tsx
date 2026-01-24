"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircle
} from "lucide-react";
import { socialLinks } from "@/data/social";
import { personalInfo } from "@/data/personal";
import Button from "@/components/ui/Button";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", subject: "General Inquiry", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const socialIcons = [
    { icon: Github, href: socialLinks.github },
    { icon: Linkedin, href: socialLinks.linkedin },
    { icon: Twitter, href: socialLinks.twitter },
    { icon: Instagram, href: socialLinks.instagram },
  ];

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[#030712]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 px-6">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-cyan-500 text-sm font-semibold tracking-wider uppercase mb-2">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Get in Touch
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl">
            Have a project in mind? Let's talk! I'm always open to discussing new opportunities.
          </p>
          <div className="w-12 h-1 bg-cyan-500 mt-4 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <a 
              href={`mailto:${socialLinks.email}`}
              className="flex items-center gap-4 p-4 bg-[#0a0f1a] border border-white/5 rounded-xl hover:border-cyan-500/30 transition-colors"
            >
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Email</p>
                <p className="text-white font-medium">{socialLinks.email}</p>
              </div>
            </a>

            <a 
              href={`tel:${socialLinks.phone}`}
              className="flex items-center gap-4 p-4 bg-[#0a0f1a] border border-white/5 rounded-xl hover:border-purple-500/30 transition-colors"
            >
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Phone className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Phone</p>
                <p className="text-white font-medium">{socialLinks.phone}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 bg-[#0a0f1a] border border-white/5 rounded-xl">
              <div className="p-3 bg-pink-500/10 rounded-lg">
                <MapPin className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Location</p>
                <p className="text-white font-medium">{personalInfo.location}</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Connect with me</p>
              <div className="flex gap-2">
                {socialIcons.map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#0a0f1a] border border-white/5 rounded-lg flex items-center justify-center hover:border-cyan-500/30 transition-colors"
                  >
                    <social.icon className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <a 
              href={socialLinks.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm hover:bg-green-500/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>

            {/* Availability */}
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 text-sm">{personalInfo.availability}</span>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-[#0a0f1a] border border-white/5 rounded-xl p-6">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm mb-4">I'll get back to you within 24 hours.</p>
                  <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formState.name} 
                        onChange={handleChange} 
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formState.email} 
                        onChange={handleChange} 
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subject</label>
                    <select 
                      name="subject" 
                      value={formState.subject} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500/50"
                    >
                      <option value="General Inquiry" className="bg-[#0a0f1a]">General Inquiry</option>
                      <option value="Project Discussion" className="bg-[#0a0f1a]">Project Discussion</option>
                      <option value="Freelance Work" className="bg-[#0a0f1a]">Freelance Work</option>
                      <option value="Collaboration" className="bg-[#0a0f1a]">Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Message</label>
                    <textarea 
                      name="message" 
                      value={formState.message} 
                      onChange={handleChange} 
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div 
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
