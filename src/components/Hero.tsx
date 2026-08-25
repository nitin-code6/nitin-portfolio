'use client';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
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
          </motion.div>
          
          {/* Info Area */}
          <motion.div variants={itemVariants} className={styles.infoContainer}>
            <h1 className={styles.name}>
              <span style={{ color: '#fff' }}>Nitin</span> <span className="text-gradient">Kumar</span>
            </h1>
            <h2 className={styles.title}>Full-Stack Software Developer</h2>
            <p className={styles.bio}>
              I build scalable applications and systems-oriented projects. Currently pursuing my B.Tech at NIT Calicut, I specialize in full-stack development, API design, and integrating emerging AI technologies into practical engineering solutions.
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
              <Link href="#projects" className="btn btn-primary">
                View Projects
              </Link>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <Download size={18} style={{ marginRight: '0.5rem' }} /> Resume
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
