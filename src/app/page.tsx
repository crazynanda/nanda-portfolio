import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import ContactCTA from '@/components/sections/ContactCTA';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <ContactCTA />
      <Contact />
    </main>
  );
}
