'use client';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Download, Mail, Play, Network, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.profileGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Avatar Area */}
          <motion.div variants={itemVariants} className={styles.avatarContainer}>
            <div className={styles.avatarPlaceholder} style={{ position: 'relative', overflow: 'hidden' }}>
              <Image 
                src="/profile.jpg" 
                alt="Nitin Kumar" 
                fill
                sizes="(max-width: 768px) 200px, 280px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            {/* Quick Stat Pill */}
            <div style={{
              marginTop: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '9999px',
              padding: '0.35rem 0.85rem',
              fontSize: '0.8rem',
              color: '#10b981',
              fontWeight: 600
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }}></span>
              4 Live Production Deployments
            </div>
          </motion.div>
          
          {/* Info Area */}
          <motion.div variants={itemVariants} className={styles.infoContainer}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              background: 'rgba(14, 165, 233, 0.1)',
              border: '1px solid rgba(14, 165, 233, 0.25)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#38bdf8',
              marginBottom: '0.75rem'
            }}>
              <Sparkles size={13} /> NIT Calicut • 700+ DSA Problems Solved
            </div>

            <h1 className={styles.name}>
              <span style={{ color: '#fff' }}>Nitin</span> <span className="text-gradient">Kumar</span>
            </h1>
            <h2 className={styles.title}>Full-Stack, Applied AI & Systems Engineer</h2>
            <p className={styles.bio}>
              I architect high-throughput backend infrastructure, applied AI pipelines (RAG, agentic workflows, FastMCP), and core systems in C++ (database engines & B+ trees). Currently pursuing my B.Tech at <strong>NIT Calicut</strong>, I focus on turning complex distributed engineering problems into reliable, high-performing software.
            </p>
            
            <div className={styles.socialLinks}>
              <a href="https://github.com/nitin-code6" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub size={22} />
              </a>
              <a href="https://www.linkedin.com/in/nitbit07/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={22} />
              </a>
              <a href="https://x.com/Nitin_5432" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter size={22} />
              </a>
              <a href="mailto:nitbit710@gmail.com" aria-label="Email">
                <Mail size={22} />
              </a>
            </div>
            
            <div className={styles.ctaGroup}>
              <Link href="#showcase" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Play size={16} fill="currentColor" /> 3D Live Apps
              </Link>
              <Link href="#system-design" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Network size={16} /> System Design
              </Link>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <Download size={16} style={{ marginRight: '0.4rem' }} /> Resume
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
