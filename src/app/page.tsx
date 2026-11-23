import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SkillsMarquee from '@/components/SkillsMarquee';
import Showcase3D from '@/components/Showcase3D';
import SystemDesign from '@/components/SystemDesign';
import FeaturedProjects from '@/components/FeaturedProjects';
import GithubProjects from '@/components/GithubProjects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* In-Demand Skills & Capabilities Infinite Marquee */}
        <SkillsMarquee />

        {/* 3D Interactive Deployed Websites Showcase */}
        <Showcase3D />

        {/* System Design & Core Architecture Blueprints */}
        <SystemDesign />
        
        {/* Featured Projects & Open Source Repositories */}
        <section id="projects" className="section">
          <div className="container">
            <FeaturedProjects />
            
            {/* Dynamic GitHub repos */}
            <GithubProjects />
          </div>
        </section>

        {/* Technical Skills & Arsenal */}
        <Skills />

        {/* About Nitin Kumar */}
        <About />

        {/* Experience & Education */}
        <Experience />

        {/* Contact Form */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
