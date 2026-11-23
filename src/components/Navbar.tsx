'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Download } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple, robust scroll-spy
      const sections = ['projects', 'system-design', 'skills', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#projects', id: 'projects' },
    { name: 'Systems', href: '#system-design', id: 'system-design' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      {/* Skip to Content for Keyboard Accessibility */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* Global Scroll Progress Bar */}
      <motion.div 
        className={styles.progressBar} 
        style={{ scaleX: scrollYProgress }} 
        aria-hidden="true"
      />

      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} role="banner">
        <div className={`container ${styles.navContainer}`}>
          <Link href="/" className={styles.logo} aria-label="Nitin Kumar Home">
            <span style={{ color: '#fff' }}>Nitin</span> <span className="text-gradient">Kumar</span>
          </Link>

          {/* Minimal Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Primary Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`${styles.navLink} ${isActive ? styles.navActive : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator" 
                      className={styles.activeDot} 
                    />
                  )}
                </Link>
              );
            })}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary" 
              style={{ padding: '0.45rem 1rem', fontSize: '0.84rem' }}
            >
              <Download size={13} style={{ marginRight: '0.35rem' }} /> Resume
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileToggle} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Accessible Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <nav className={styles.mobileNav} aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={styles.mobileNavLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center' }}
            >
              <Download size={14} style={{ marginRight: '0.35rem' }} /> Download Resume
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
