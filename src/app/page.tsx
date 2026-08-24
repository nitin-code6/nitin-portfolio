import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import FeaturedProjects from '@/components/FeaturedProjects';
import GithubProjects from '@/components/GithubProjects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        
        {/* Projects Section encapsulates both Featured and Dynamic GitHub repos */}
        <section id="projects" className="section">
          <div className="container">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw + 1rem, 3rem)', textAlign: 'center', marginBottom: '4rem' }}>
              Selected <span className="text-gradient">Works</span>
            </h2>
            <FeaturedProjects />
            
            {/* Server Component that fetches GitHub repos */}
            <GithubProjects />
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </>
  );
}
