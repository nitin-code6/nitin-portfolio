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
      description: "Contributed to full-stack web applications, specifically focusing on the FerryFlow operations system. Handled frontend component design, backend API integrations, and real-time features using Socket.IO.",
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
      institution: "Inter College Pipra Nauranga",
      date: "2021 — 2022",
      description: "Percentage: 90%",
      icon: <GraduationCap size={20} />
    },
    {
      title: "10th — CBSE",
      institution: "Patliputra Central School",
      date: "2019 — 2020",
      description: "Percentage: 87.2%",
      icon: <GraduationCap size={20} />
    }
  ];

  const achievements = [
    "Solved 700+ Data Structures and Algorithms problems (GeeksForGeeks & LeetCode).",
    "Achieved 1700+ rating on GeeksForGeeks competitive programming platform.",
    "Earned SQL 50 Badge on LeetCode.",
    "Selected as Foundation For Excellence Scholar and Mentee."
  ];

  return (
    <section id="experience" className={`section ${styles.experienceSection}`}>
      <div className="container">
        <h2 className="sectionTitle">Experience & <span className="text-gradient">Education</span></h2>
        
        <div className={styles.grid}>
          {/* Experience Column */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <Briefcase className={styles.headerIcon} size={24} />
              <h3 className={styles.columnTitle}>Experience</h3>
            </div>
            
            <div className={styles.timeline}>
              {experiences.map((exp, idx) => (
                <motion.div 
                  key={idx} 
                  className={styles.timelineItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <h4>{exp.title}</h4>
                    <div className={styles.meta}>
                      <span className={styles.company}>{exp.company}</span>
                      <span className={styles.date}>{exp.date}</span>
                    </div>
                    <p>{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.columnHeader} style={{ marginTop: '4rem' }}>
              <Award className={styles.headerIcon} size={24} />
              <h3 className={styles.columnTitle}>Achievements</h3>
            </div>
            <div className={styles.achievementsCard}>
              <ul>
                {achievements.map((achieve, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className={styles.bullet}></span>
                    <span>{achieve}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Education Column */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <GraduationCap className={styles.headerIcon} size={24} />
              <h3 className={styles.columnTitle}>Education</h3>
            </div>
            
            <div className={styles.timeline}>
              {education.map((edu, idx) => (
                <motion.div 
                  key={idx} 
                  className={styles.timelineItem}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <h4>{edu.title}</h4>
                    <div className={styles.meta}>
                      <span className={styles.company}>{edu.institution}</span>
                      <span className={styles.date}>{edu.date}</span>
                    </div>
                    <div className={styles.grade}>{edu.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
