'use client';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import styles from './Experience.module.css';

export default function Experience() {
  const experiences = [
    {
      title: "Web Development Intern",
      company: "Unified Mentor",
      date: "Recent",
      description: "Contributed to full-stack web applications and gained practical experience in modern web development.",
      icon: <Briefcase size={20} />
    }
  ];

  const education = [
    {
      title: "B.Tech. in Civil Engineering",
      institution: "National Institute of Technology, Calicut",
      date: "Aug 2023 — Present",
      description: "CGPA: 7.98",
      icon: <GraduationCap size={20} />
    },
    {
      title: "12th — BSEB",
      institution: "Inter College Pipra Nauranga, Khagaria",
      date: "2021 — 2022",
      description: "Percentage: 90%",
      icon: <GraduationCap size={20} />
    }
  ];

  const achievements = [
    "Solved 700+ Data Structures and Algorithms problems (GeeksForGeeks/LeetCode).",
    "Achieved 1700+ rating on GeeksForGeeks competitive programming platform.",
    "Earned SQL 50 Badge on LeetCode.",
    "Foundation For Excellence Scholar and Mentee."
  ];

  return (
    <section id="experience" className={`section ${styles.experienceSection}`}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Journey & <span className="text-gradient">Experience</span></h2>
        
        <div className={styles.grid}>
          {/* Experience Column */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Experience</h3>
            <div className={styles.timeline}>
              {experiences.map((exp, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>{exp.icon}</div>
                  <div className={`glass-panel ${styles.timelineContent}`}>
                    <h4>{exp.title}</h4>
                    <p className={styles.subtitle}>{exp.company} &bull; {exp.date}</p>
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className={styles.columnTitle} style={{ marginTop: '3rem' }}>Achievements</h3>
            <div className={`glass-panel ${styles.achievementsCard}`}>
              <ul>
                {achievements.map((achieve, idx) => (
                  <li key={idx}>
                    <Award size={18} className={styles.bulletIcon} />
                    <span>{achieve}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Education Column */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Education</h3>
            <div className={styles.timeline}>
              {education.map((edu, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>{edu.icon}</div>
                  <div className={`glass-panel ${styles.timelineContent}`}>
                    <h4>{edu.title}</h4>
                    <p className={styles.subtitle}>{edu.institution}</p>
                    <div className={styles.metaRow}>
                      <span>{edu.date}</span>
                      <span className={styles.grade}>{edu.description}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
