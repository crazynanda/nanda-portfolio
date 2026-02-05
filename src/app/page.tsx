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
import ArcReactorBackground from '@/components/ui/ArcReactorBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-stark-bg text-white selection:bg-arc-cyan selection:text-black overflow-x-hidden">
      {/* Fixed Background Elements */}
      <div className="fixed inset-0 z-0">
        <ArcReactorBackground
          particleCount={150}
          connectionDistance={200}
          speed={0.6}
          mouseInteraction={true}
        />
      </div>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay z-0"></div>
      
      {/* Terminal Grid Overlay */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

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
