'use client';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolioData';
import styles from './Skills.module.css';

export default function Skills() {
  const { skills } = portfolioData;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="skills" className={`section ${styles.skillsSection}`} aria-label="Technical Skills">
      <div className="container">
        <div className={styles.header}>
          <h2 className="sectionTitle">Technical <span className="text-gradient">Arsenal</span></h2>
          <p>Grouped by engineering domains, emphasizing distributed systems, AI pipelines, and C++ internals.</p>
        </div>

        <motion.div 
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {skills.map((group, idx) => (
            <motion.div key={idx} variants={item} className={styles.categoryCard}>
              <h3 className={styles.categoryTitle}>{group.name}</h3>
              <p className={styles.groupDesc}>{group.description}</p>
              
              <div className={styles.skillTags}>
                {group.skills.map((skill, sIdx) => (
                  <span key={sIdx} className={styles.tag}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
