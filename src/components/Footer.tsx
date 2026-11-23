'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUp, Mail, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import ResumeModal from './ResumeModal';
import styles from './Footer.module.css';

export default function Footer() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      {/* Subtle top hairline divider with cyan center highlight */}
      <div className={styles.topDivider} />

      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.mainContent}>
          {/* Brand & Focus Statement */}
          <div className={styles.brandBlock}>
            <Link href="/" className={styles.brandTitle}>
              Nitin Kumar
            </Link>
            <p className={styles.roleSubtitle}>Backend &amp; System Design Engineer</p>
            <p className={styles.statement}>
              Focused on high-concurrency event-driven backends, Kafka pipelines, and scalable distributed architectures.
            </p>
          </div>

          {/* Clean Navigation & Actions */}
          <div className={styles.linksBlock}>
            <div className={styles.navGroup}>
              <span className={styles.groupLabel}>Navigation</span>
              <nav className={styles.navLinks} aria-label="Footer Navigation">
                <Link href="#projects" className={styles.linkItem}>Work</Link>
                <Link href="#system-design" className={styles.linkItem}>System Design</Link>
                <Link href="#skills" className={styles.linkItem}>Skills</Link>
                <Link href="#about" className={styles.linkItem}>About</Link>
                <Link href="#contact" className={styles.linkItem}>Contact</Link>
              </nav>
            </div>

            <div className={styles.socialGroup}>
              <span className={styles.groupLabel}>Connect</span>
              <div className={styles.socialIcons}>
                <a
                  href="https://github.com/nitin-code6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconBtn}
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/nitbit07/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconBtn}
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="https://x.com/Nitin_5432"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconBtn}
                  aria-label="Twitter / X"
                  title="Twitter / X"
                >
                  <FaTwitter size={18} />
                </a>
                <a
                  href="mailto:nitbit710@gmail.com"
                  className={styles.iconBtn}
                  aria-label="Email"
                  title="Email"
                >
                  <Mail size={18} />
                </a>
                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(true)}
                  className={styles.resumePill}
                  aria-label="Select and Download Resume Version"
                  title="View Resume Options"
                  style={{ cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  <FileText size={14} />
                  <span>Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyrightBlock}>
            <p className={styles.copyrightText}>
              &copy; {new Date().getFullYear()} Nitin Kumar. Built with Next.js, React &amp; Three.js.
            </p>
            <span className={styles.metaText}>NIT Calicut, Kerala, India</span>
          </div>

          <button
            onClick={scrollToTop}
            className={styles.backToTopBtn}
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      {/* Resume Selection Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </footer>
  );
}
