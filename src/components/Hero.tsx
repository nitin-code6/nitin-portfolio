'use client';
import { useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowDown, Mail, Code2, ShieldCheck, Server, Network, Layers } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import HeroSceneWrapper from './three/HeroSceneWrapper';
import { portfolioData } from '@/data/portfolioData';
import styles from './Hero.module.css';

const proofIcons = [Code2, ShieldCheck, Server, Network];

export default function Hero() {
  const { hero, proofStrip } = portfolioData;
  const [cardTilt, setCardTilt] = useState({ rotX: 0, rotY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCardTilt({
      rotX: -((y - rect.height / 2) / (rect.height / 2)) * 14,
      rotY: ((x - rect.width / 2) / (rect.width / 2)) * 16,
    });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rotX: 0, rotY: 0 });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const coreTech = ['Node.js', 'System Design', 'MERN Stack', 'Express.js', 'Apache Kafka', 'Redis', 'Docker'];

  return (
    <section className={styles.heroSection} aria-label="Introduction">
      {/* 3D Distributed Systems R3F Interactive Scene */}
      <HeroSceneWrapper />

      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.heroGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Headline, Pitch, Quick Tech & CTAs */}
          <motion.div variants={itemVariants} className={styles.infoCol}>
            {/* Single verified badge */}
            <div className={styles.statusBadge}>
              <span className={styles.pulseDot} />
              <span>{hero.statusBadge}</span>
              <span className={styles.badgeDivider}>•</span>
              <span className={styles.badgeLocation}>{hero.location}</span>
            </div>

            <h1 className={styles.name}>
              <span className={styles.name3dWrapper}>
                <span className={styles.whiteText}>Nitin</span>{' '}
                <span className={styles.gradientText3d}>Kumar</span>
              </span>
            </h1>

            <h2 className={styles.role}>{hero.role}</h2>
            
            <p className={styles.pitch}>
              {hero.pitch}
            </p>

            {/* Core Tech Stack Pills */}
            <div className={styles.techPillsRow}>
              {coreTech.map((tech) => (
                <span key={tech} className={styles.techPill}>
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Direct CTAs & Socials (all visible above fold) */}
            <div className={styles.actionsRow}>
              <div className={styles.ctaGroup}>
                <Link href="#projects" className={`btn btn-primary ${styles.primaryCta}`}>
                  View Projects <ArrowDown size={15} />
                </Link>
                <Link href="#system-design" className="btn btn-outline">
                  <Layers size={15} style={{ marginRight: '0.45rem' }} /> System Architecture
                </Link>
              </div>

              <div className={styles.socialLinks} aria-label="Social Profiles">
                <a href={hero.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className={styles.socialBtn}>
                  <FaGithub size={18} />
                </a>
                <a href={hero.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className={styles.socialBtn}>
                  <FaLinkedin size={18} />
                </a>
                <a href={hero.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className={styles.socialBtn}>
                  <FaTwitter size={18} />
                </a>
                <a href={hero.socials.email} aria-label="Send Email" className={styles.socialBtn}>
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Glassmorphic Profile Card */}
          <motion.div variants={itemVariants} className={styles.profileCardCol}>
            <div 
              ref={cardRef}
              className={styles.profileCard}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${cardTilt.rotX}deg) rotateY(${cardTilt.rotY}deg)`,
                transition: cardTilt.rotX === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.08s ease-out'
              }}
            >
              <div className={styles.cardGlow} />
              <div className={styles.portraitWrapper}>
                <Image 
                  src="/profile.png" 
                  alt="Nitin Kumar portrait" 
                  fill
                  sizes="(max-width: 768px) 240px, 320px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
                {/* 3D Vignette overlay to blend indoor portrait with dark glass theme */}
                <div className={styles.portraitVignette} />
              </div>

              {/* Floating Meta Tag: Academic */}
              <div className={styles.floatingTagTop}>
                <span className={styles.tagIcon}>🎓</span>
                <span>NIT Calicut (Final Year)</span>
              </div>

              {/* Floating Meta Tag: Deployed apps */}
              <div className={styles.floatingTagBottom}>
                <span className={styles.liveIndicator} />
                <span>5+ Deployed Apps</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Verifiable Trust / Proof Strip */}
        <motion.div 
          className={styles.proofStrip}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {proofStrip.map((item, idx) => {
            const Icon = proofIcons[idx] || Code2;
            const isLive = item.label.toLowerCase().includes('deployed');
            return (
              <a 
                key={idx} 
                href={item.link || '#'} 
                className={styles.proofItem}
                target={item.link?.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
              >
                <div className={styles.proofHeader}>
                  <div className={styles.iconBadge}>
                    <Icon size={16} />
                  </div>
                  {isLive && <span className={styles.pulseDotSmall} />}
                </div>
                <div className={styles.proofValueRow}>
                  <span className={styles.proofValue}>{item.value}</span>
                  <span className={styles.proofLabel}>{item.label}</span>
                </div>
                <span className={styles.proofDetail}>{item.detail}</span>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
