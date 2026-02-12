"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2, MessageSquare } from "lucide-react";
import { socialLinks } from "@/data/social";
import { personalInfo } from "@/data/personal";
import { AnimatedSection, SlideIn, TextReveal } from "@/components/animation/AnimatedSection";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

// Animated input component
function AnimatedInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  isTextarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder: string;
  isTextarea?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  const InputComponent = isTextarea ? "textarea" : "input";

  return (
    <div className="relative">
      <motion.label
        animate={{
          y: isFocused || value ? -24 : 0,
          scale: isFocused || value ? 0.85 : 1,
          color: isFocused ? "#06b6d4" : "#64748b",
        }}
        className="absolute left-4 top-3 text-sm font-medium origin-left pointer-events-none transition-colors"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </motion.label>
      
      <InputComponent
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        placeholder={isFocused ? placeholder : ""}
        rows={isTextarea ? 4 : undefined}
        className={cn(
          "w-full px-4 pt-6 pb-2 bg-foreground/5 border-2 rounded-xl text-foreground placeholder:text-transparent focus:outline-none transition-all duration-300",
          isFocused
            ? "border-cyan-500 bg-cyan-500/5"
            : "border-transparent hover:border-foreground/10",
          isTextarea && "resize-none min-h-[120px]"
        )}
      />

      {/* Focus indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
        initial={{ width: "0%" }}
        animate={{ width: isFocused ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

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

  const contactInfo = [
    { icon: Mail, label: "Email", value: socialLinks.email, href: `mailto:${socialLinks.email}` },
    { icon: Phone, label: "Phone", value: socialLinks.phone, href: `tel:${socialLinks.phone}` },
    { icon: MapPin, label: "Location", value: personalInfo.location },
  ];

  return (
    <AnimatedSection id="contact" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SlideIn direction="up" className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-cyan-500 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Connect
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <TextReveal>Get in Touch</TextReveal>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s work together to bring your ideas to life.
          </p>
        </SlideIn>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <SlideIn direction="left">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
                <p className="text-muted-foreground mb-8">
                  I'm currently available for freelance projects and internships. 
                  Feel free to reach out!
                </p>
              </div>

              {/* Contact cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="glass rounded-xl p-4 flex items-center gap-4 group cursor-pointer"
                    onClick={() => info.href && window.open(info.href, "_blank")}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center"
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium text-foreground group-hover:text-cyan-500 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-4 flex items-center gap-3"
              >
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-500 font-medium">{personalInfo.availability}</span>
              </motion.div>
            </div>
          </SlideIn>

          {/* Contact Form */}
          <SlideIn direction="right">
            <div className="glass rounded-2xl p-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">I'll get back to you within 24 hours.</p>
                    <MagneticButton
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                    >
                      Send Another Message
                    </MagneticButton>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <AnimatedInput
                        label="Name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                      <AnimatedInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-foreground/5 border-2 border-transparent rounded-xl text-foreground focus:outline-none focus:border-cyan-500 transition-all"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Project Discussion">Project Discussion</option>
                        <option value="Freelance Work">Freelance Work</option>
                        <option value="Collaboration">Collaboration</option>
                      </select>
                    </div>

                    <AnimatedInput
                      label="Message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project..."
                      isTextarea
                    />

                    <MagneticButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </SlideIn>
        </div>
      </div>
    </AnimatedSection>
  );
}
