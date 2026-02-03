"use client";

import Hero from '@/components/sections/Hero';
import BentoGrid from '@/components/sections/BentoGrid';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import Guestbook from '@/components/sections/Guestbook';
import JarvisDock from '@/components/ui/JarvisDock';
import Footer from '@/components/layout/Footer';
import Antigravity from '@/components/animations/Antigravity';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-stark-bg text-white selection:bg-arc-cyan selection:text-black overflow-x-hidden">
      {/* Fixed Background Elements */}
      <div className="fixed inset-0 z-0">
        <Antigravity
           count={150}
           magnetRadius={20}
           ringRadius={20}
           color="#00F0FF"
           particleSize={4}
           autoAnimate={true}
        />
      </div>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay z-0"></div>

      <div className="relative z-10 flex flex-col gap-0 pb-32">
         <Hero />
         <BentoGrid />
         <Projects />
         <Skills />
         <Experience />
         <Education />
         <Contact />
         <Guestbook />
         <Footer />
      </div>

      <JarvisDock />
    </main>
  );
}
