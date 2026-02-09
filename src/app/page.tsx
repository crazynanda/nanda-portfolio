import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import Guestbook from '@/components/sections/Guestbook';
import ScrollProgress from '@/components/layout/ScrollProgress';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
        <Guestbook />
      </main>
    </>
  );
}
