'use client';

import { portfolioData } from '@/data/portfolioData';
import styles from './Skills.module.css';

export default function Skills() {
  const { skills } = portfolioData;

  const renderCard = (group: typeof skills[0], key: string) => {
    const isExploring = group.name.includes('Exploring');
    return (
      <div
        key={key}
        className={`${styles.categoryCard} ${isExploring ? styles.exploringCard : ''}`}
      >
        <div className={styles.cardHeaderRow}>
          <h3 className={styles.categoryTitle}>{group.name}</h3>
          {isExploring && (
            <span className={styles.exploringCardPill}>
              <span className={styles.cardPulseDot} />
              <span>Active R&amp;D</span>
            </span>
          )}
        </div>
        <p className={styles.groupDesc}>{group.description}</p>

        <div className={styles.skillTags}>
          {group.skills.map((skill, sIdx) => {
            const isHighlight = skill === 'DevOps' || skill === 'Agentic AI';
            return (
              <span
                key={sIdx}
                className={`${styles.tag} ${isHighlight ? styles.highlightTag : ''}`}
              >
                {skill}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className={`section ${styles.skillsSection}`} aria-label="Technical Skills">
      <div className="container">
        <div className={styles.header}>
          <h2 className="sectionTitle">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p>
            Continuous circular stream across distributed backends, AI pipelines, systems, and active R&amp;D. Hover to pause.
          </p>
        </div>

        {/* Single-Row Circular Moving Track */}
        <div className={styles.carouselContainer} role="region" aria-label="Skills circular carousel">
          <div className={styles.track}>
            <div className={styles.group}>
              {skills.map((group, idx) => renderCard(group, `group1-${idx}`))}
            </div>
            <div className={styles.group} aria-hidden="true">
              {skills.map((group, idx) => renderCard(group, `group2-${idx}`))}
            </div>
          </div>
        </div>

        {/* Micro-Interaction Hint */}
        <div className={styles.hintRow}>
          <span className={styles.hintDot} />
          <span>Continuous Circular Stream • Hover any card to pause</span>
        </div>
      </div>
    </section>
  );
}
