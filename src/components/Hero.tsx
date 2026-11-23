'use client';
import { motion, Variants } from 'framer-motion';
import { Download, Mail, Play, Network, Sparkles, Code2, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Canvas3D from './Canvas3D';
import styles from './Hero.module.css';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 16 }
    }
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section className={styles.heroSection}>
      {/* Ambient background glows */}
      <div className={styles.ambientGlowPrimary}></div>
      <div className={styles.ambientGlowSecondary}></div>
      
      {/* Interactive 3D Neural Constellation Canvas */}
      <Canvas3D />

      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.profileGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Avatar Area with Animated Gradient Ring */}
          <motion.div variants={itemVariants} className={styles.avatarContainer}>
            <motion.div 
              className={styles.avatarWrapper}
              variants={floatingVariants}
              animate="animate"
            >
              {/* Rotating iridescent glowing border */}
              <div className={styles.avatarGlowRing}></div>
              
              <div className={styles.avatarInner}>
                <Image 
                  src="/profile.png" 
                  alt="Nitin Kumar" 
                  fill
                  sizes="(max-width: 768px) 210px, 290px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>

              {/* Floating Status Pill */}
              <motion.div 
                className={styles.floatingStatusPill}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className={styles.pulseDot}></span>
                <span>4 Production Apps Live</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Info Area */}
          <motion.div variants={itemVariants} className={styles.infoContainer}>
            <motion.div 
              className={styles.academicBadge}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Sparkles size={14} className={styles.sparkleIcon} />
              <span>NIT Calicut • 700+ DSA Problems • Systems & AI</span>
            </motion.div>

            <h1 className={styles.name}>
              <span className={styles.whiteText}>Nitin</span> <span className="text-gradient">Kumar</span>
            </h1>
            <h2 className={styles.title}>Full-Stack, Applied AI & Systems Engineer</h2>
            
            <p className={styles.bio}>
              I architect high-throughput distributed backends, applied AI pipelines (RAG, multi-agent workflows, FastMCP), and core systems in C++ (database engines & B+ trees). Passionate about turning complex distributed engineering challenges into resilient, production-ready systems.
            </p>
            
            {/* Socials & Profiles */}
            <div className={styles.socialLinks}>
              <a href="https://github.com/nitin-code6" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialBtn}>
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/nitbit07/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialBtn}>
                <FaLinkedin size={20} />
              </a>
              <a href="https://x.com/Nitin_5432" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.socialBtn}>
                <FaTwitter size={20} />
              </a>
              <a href="mailto:nitbit710@gmail.com" aria-label="Email" className={styles.socialBtn}>
                <Mail size={20} />
              </a>
            </div>
            
            {/* CTAs */}
            <div className={styles.ctaGroup}>
              <Link href="#showcase" className={`btn btn-primary ${styles.primaryCta}`}>
                <Play size={15} fill="currentColor" /> 3D Live Deployments
                <ArrowUpRight size={14} />
              </Link>
              <Link href="#system-design" className="btn btn-outline">
                <Network size={16} /> Systems Architecture
              </Link>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <Download size={15} /> Resume
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
