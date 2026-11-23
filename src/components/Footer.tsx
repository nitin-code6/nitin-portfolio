'use client';

import Link from 'next/link';
import { ArrowUp, Terminal, ShieldCheck, Cpu, ExternalLink, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Top Ambient Glow & Hairline Divider */}
      <div className={styles.topDivider} />

      <div className={styles.container}>
        {/* Main Grid */}
        <div className={styles.grid}>
          {/* Col 1: Developer Brand & Status */}
          <div className={styles.brandCol}>
            <div className={styles.logoRow}>
              <span className={styles.codeLogo}>&lt;NK /&gt;</span>
              <div className={styles.statusPill}>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>Systems Operational</span>
              </div>
            </div>

            <p className={styles.roleTitle}>Backend &amp; System Design Engineer</p>
            <p className={styles.bio}>
              National Institute of Technology, Calicut (Final Year). Architecting high-concurrency event-driven backends, Kafka pipelines, and scalable MERN systems.
            </p>

            <div className={styles.telemetryCard}>
              <div className={styles.telemetryItem}>
                <Terminal size={14} className={styles.telemetryIcon} />
                <span>Node.js • Kafka • Redis • Docker</span>
              </div>
              <div className={styles.telemetryItem}>
                <ShieldCheck size={14} className={styles.telemetryIcon} />
                <span>700+ DSA • 5+ Production PaaS Deploys</span>
              </div>
            </div>

            <div className={styles.socialGroup}>
              <a
                href="https://github.com/nitin-code6"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="GitHub Profile"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/nitbit07/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://x.com/Nitin_5432"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="X Twitter Profile"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="mailto:nitbit710@gmail.com"
                className={styles.socialBtn}
                aria-label="Email Nitin Kumar"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className={styles.navCol}>
            <p className={styles.colHeader}>Architecture &amp; Sections</p>
            <ul className={styles.linkList}>
              <li>
                <Link href="#projects" className={styles.footerLink}>
                  <span>Featured Systems</span>
                  <span className={styles.linkBadge}>14 Projects</span>
                </Link>
              </li>
              <li>
                <Link href="#system-design" className={styles.footerLink}>
                  <span>System Design Deep Dive</span>
                  <span className={styles.linkBadgeAccent}>Blueprint</span>
                </Link>
              </li>
              <li>
                <Link href="#skills" className={styles.footerLink}>
                  <span>Technical Stack</span>
                </Link>
              </li>
              <li>
                <Link href="#about" className={styles.footerLink}>
                  <span>Engineering Journey</span>
                </Link>
              </li>
              <li>
                <Link href="#experience" className={styles.footerLink}>
                  <span>Education &amp; Experience</span>
                </Link>
              </li>
              <li>
                <Link href="#contact" className={styles.footerLink}>
                  <span>Get In Touch</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Architectures & Repos */}
          <div className={styles.navCol}>
            <p className={styles.colHeader}>Flagship Repositories</p>
            <ul className={styles.linkList}>
              <li>
                <a
                  href="https://github.com/nitin-code6/CodeArena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoLink}
                >
                  <div className={styles.repoInfo}>
                    <span className={styles.repoTitle}>CodeArena</span>
                    <span className={styles.repoDesc}>Kafka, BullMQ &amp; Judge0 sandbox</span>
                  </div>
                  <ExternalLink size={13} className={styles.repoArrow} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/nitin-code6/ReelFinder-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoLink}
                >
                  <div className={styles.repoInfo}>
                    <span className={styles.repoTitle}>ReelFinder AI</span>
                    <span className={styles.repoDesc}>Multimodal AI video search RAG</span>
                  </div>
                  <ExternalLink size={13} className={styles.repoArrow} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/nitin-code6/NovaDB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoLink}
                >
                  <div className={styles.repoInfo}>
                    <span className={styles.repoTitle}>NovaDB</span>
                    <span className={styles.repoDesc}>B+ tree storage engine in C++</span>
                  </div>
                  <ExternalLink size={13} className={styles.repoArrow} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/nitin-code6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.allReposLink}
                >
                  <span>Explore all 20+ GitHub Repos</span>
                  <ExternalLink size={13} />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Engineering Proof */}
          <div className={styles.proofCol}>
            <p className={styles.colHeader}>Verified Signals</p>
            <div className={styles.metricsBox}>
              <div className={styles.metricItem}>
                <div className={styles.metricHeader}>
                  <Cpu size={14} className={styles.metricIcon} />
                  <span className={styles.metricVal}>700+ Problems</span>
                </div>
                <span className={styles.metricSub}>LeetCode &amp; GeeksForGeeks (1700+ Rating)</span>
              </div>
              <div className={styles.metricItem}>
                <div className={styles.metricHeader}>
                  <ShieldCheck size={14} className={styles.metricIcon} />
                  <span className={styles.metricVal}>108+ Unit Tests</span>
                </div>
                <span className={styles.metricSub}>PyTest &amp; Jest Test Coverage</span>
              </div>
              <div className={styles.metricItem}>
                <div className={styles.metricHeader}>
                  <Terminal size={14} className={styles.metricIcon} />
                  <span className={styles.metricVal}>5+ Live Apps</span>
                </div>
                <span className={styles.metricSub}>Production PaaS: Render, Vercel &amp; Netlify</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Nitin Kumar. Built with Next.js 16 (Turbopack), React 19 &amp; Three.js.
            </p>
            <span className={styles.locationPill}>NIT Calicut, Kerala, India</span>
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
    </footer>
  );
}
