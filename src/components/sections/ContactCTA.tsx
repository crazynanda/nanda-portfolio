"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="section-padding bg-background border-t border-border">
      <div className="container-wide">
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group block text-center py-20"
        >
          {/* Small Text */}
          <p className="text-mono text-muted mb-6">
            Let&apos;s build something amazing together
          </p>

          {/* Large CTA */}
          <div className="relative inline-block">
            <h2 className="text-display text-foreground group-hover:text-accent transition-colors duration-500">
              Get in touch
            </h2>
            
            {/* Arrow */}
            <motion.div
              className="absolute -right-16 top-0 w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors"
              whileHover={{ scale: 1.1, rotate: 45 }}
            >
              <ArrowUpRight className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
