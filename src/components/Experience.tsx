'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, CheckCircle2, Calendar, MapPin, Building2 } from 'lucide-react';
import styles from './Experience.module.css';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  date: string;
  summary: string;
  contributions: string[];
  tech: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  date: string;
  grade: string;
  highlights: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineering Intern (Web Systems)",
    company: "Unified Mentor",
    location: "Remote",
    date: "2024",
    summary: "Engineered core modules for the FerryFlow operations platform, handling real-time synchronization and responsive full-stack features.",
    contributions: [
      "Engineered real-time state synchronization across ferry scheduling interfaces using Socket.IO.",
      "Designed and integrated RESTful APIs in Express.js for booking management and route tracking.",
      "Implemented modular, reusable React UI components ensuring sub-second rendering performance."
    ],
    tech: ["React.js", "Node.js", "Express.js", "Socket.IO", "REST APIs", "JavaScript"]
  }
];

const education: EducationItem[] = [
  {
    degree: "B.Tech. in Civil Engineering (Software Systems Track)",
    institution: "National Institute of Technology, Calicut (NIT Calicut)",
    location: "Calicut, Kerala, India",
    date: "Aug 2023 — 2027 (Final Year)",
    grade: "CGPA: 7.98",
    highlights: "Transitioned focus into software systems through rigorous self-directed CS coursework in Distributed Computing, Operating Systems, Computer Networks, and Database Management."
  },
  {
    degree: "Senior Secondary (12th Science) — BSEB",
    institution: "Inter College Pipra Nauranga",
    location: "Bihar, India",
    date: "2021 — 2022",
    grade: "Percentage: 90%",
    highlights: "Distinction in Mathematics and Physics with strong analytical foundations."
  }
];

const milestones = [
  {
    title: "700+ Data Structures & Algorithms Solved",
    detail: "Extensive problem-solving across LeetCode & GeeksForGeeks demonstrating algorithmic intuition."
  },
  {
    title: "100 Days of Code Daily Streak on X",
    detail: "Maintained public accountability with daily code submissions and systems architecture notes."
  },
  {
    title: "1700+ Competitive Rating on GeeksForGeeks",
    detail: "Consistently ranked in top percentiles for algorithmic execution and optimization."
  },
  {
    title: "Foundation For Excellence (FFE) Scholar",
    detail: "Selected for prestigious merit-based nationwide engineering fellowship and mentorship."
  },
  {
    title: "LeetCode SQL 50 Advanced Badge",
    detail: "Verified mastery of complex relational joins, aggregations, and window analytical queries."
  }
];

export default function Experience() {
  return (
    <section id="experience" className={`section ${styles.experienceSection}`} aria-label="Experience and Education">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <Briefcase size={14} className={styles.badgeIcon} />
            <span>Career Milestones</span>
          </div>
          <h2 className="sectionTitle">
            Experience &amp; <span className="text-gradient">Education</span>
          </h2>
          <p className={styles.subheading}>
            Proven industry contributions, academic rigor at NIT Calicut, and verified competitive achievements.
          </p>
        </div>

        <div className={styles.mainGrid}>
          {/* Left Column: Work Experience & Milestones */}
          <div className={styles.leftCol}>
            {/* Experience Card */}
            <div className={styles.blockHeader}>
              <Briefcase size={20} className={styles.colHeaderIcon} />
              <h3 className={styles.blockTitle}>Professional Experience</h3>
            </div>

            <div className={styles.expList}>
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  className={styles.experienceCard}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={styles.cardTopRow}>
                    <div>
                      <h4 className={styles.roleTitle}>{exp.title}</h4>
                      <div className={styles.companyRow}>
                        <Building2 size={14} className={styles.inlineIcon} />
                        <span className={styles.companyName}>{exp.company}</span>
                        <span className={styles.dividerDot}>•</span>
                        <MapPin size={14} className={styles.inlineIcon} />
                        <span className={styles.locationText}>{exp.location}</span>
                      </div>
                    </div>
                    <div className={styles.datePill}>
                      <Calendar size={13} />
                      <span>{exp.date}</span>
                    </div>
                  </div>

                  <p className={styles.expSummary}>{exp.summary}</p>

                  <ul className={styles.bulletList}>
                    {exp.contributions.map((bullet, bIdx) => (
                      <li key={bIdx} className={styles.bulletItem}>
                        <CheckCircle2 size={15} className={styles.checkIcon} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.techPillGroup}>
                    {exp.tech.map((t, tIdx) => (
                      <span key={tIdx} className={styles.techPill}>{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Achievements & Honors */}
            <div className={styles.blockHeader} style={{ marginTop: '2.5rem' }}>
              <Award size={20} className={styles.colHeaderIcon} />
              <h3 className={styles.blockTitle}>Engineering Honors &amp; Badges</h3>
            </div>

            <div className={styles.achievementsCard}>
              <div className={styles.milestoneGrid}>
                {milestones.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className={styles.milestoneBox}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <div className={styles.milestoneDot} />
                    <div>
                      <h5 className={styles.milestoneTitle}>{item.title}</h5>
                      <p className={styles.milestoneDesc}>{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Education */}
          <div className={styles.rightCol}>
            <div className={styles.blockHeader}>
              <GraduationCap size={20} className={styles.colHeaderIcon} />
              <h3 className={styles.blockTitle}>Academic Background</h3>
            </div>

            <div className={styles.eduList}>
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  className={styles.educationCard}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={styles.cardTopRow}>
                    <div className={styles.eduMetaLeft}>
                      <span className={styles.gradeBadge}>{edu.grade}</span>
                      <h4 className={styles.eduDegree}>{edu.degree}</h4>
                      <p className={styles.eduInstitution}>{edu.institution}</p>
                    </div>
                    <div className={styles.datePill}>
                      <Calendar size={13} />
                      <span>{edu.date}</span>
                    </div>
                  </div>

                  <p className={styles.eduHighlights}>{edu.highlights}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
