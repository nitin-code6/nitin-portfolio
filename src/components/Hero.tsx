'use client';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.glow} />
      
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className={styles.badge}>
            <span className={styles.pulse} />
            Available for opportunities
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="heading-hero">
            Building scalable <br />
            <span className="text-gradient">backend systems</span> & <br />
            modern applications.
          </motion.h1>
          
          <motion.p variants={itemVariants} className={styles.subtitle}>
            Hi, I'm Nitin Kumar, a Full-Stack Software Developer currently studying at NIT Calicut. I specialize in building high-performance APIs, asynchronous processing systems, and practical AI integrations.
          </motion.p>
          
          <motion.div variants={itemVariants} className={styles.ctaGroup}>
            <Link href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
            </Link>
            <a href="https://github.com/nitin-code6" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <FaGithub size={18} style={{ marginRight: '0.5rem' }} /> GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
