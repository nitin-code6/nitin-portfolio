import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechLogosStrip from '@/components/TechLogosStrip';
import UnifiedProjectsCarousel from '@/components/UnifiedProjectsCarousel';
import SystemDesign from '@/components/SystemDesign';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main id="main-content" tabIndex={-1}>
        {/* 1. Recruiter-Focused Hero with R3F 3D Distributed Systems Scene */}
        <Hero />

        {/* Clean Tech Logos Row */}
        <TechLogosStrip />

        {/* 2. Unified Swipeable Projects Carousel */}
        <UnifiedProjectsCarousel />

        {/* 3. Deep-Dive Systems Architecture Blueprints */}
        <SystemDesign />

        {/* 4. Grouped Technical Skills (Systems, Distributed, AI, Storage) */}
        <Skills />

        {/* 5. Honest Engineering Story (3 paragraphs) */}
        <About />

        {/* 6. Education & Work Experience */}
        <Experience />

        {/* 7. Contact Form & Direct Channels */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
