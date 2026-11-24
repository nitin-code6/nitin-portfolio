'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, CheckCircle2, Calendar, MapPin, Building2, Sparkles, Terminal, Code2 } from 'lucide-react';
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
    summary: "Engineered core modules for the FerryFlow operations platform, handling real-time synchronization, backend API services, and responsive client interfaces.",
    contributions: [
      "Engineered real-time state synchronization across ferry scheduling interfaces using Socket.IO.",
      "Designed and integrated RESTful APIs in Express.js for booking management and route tracking.",
      "Implemented modular, reusable React UI components ensuring sub-second rendering performance.",
      "Collaborated on database query optimization and event error-handling to prevent scheduling race conditions."
    ],
    tech: ["React.js", "Node.js", "Express.js", "Socket.IO", "REST APIs", "JavaScript", "Git"]
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

const honorsList = [
  {
    title: "Foundation For Excellence (FFE) Scholar",
    detail: "Awarded prestigious merit-based nationwide engineering fellowship and mentorship for academic excellence."
  },
  {
    title: "700+ Data Structures & Algorithms Solved",
    detail: "Extensive problem-solving across LeetCode & GeeksForGeeks demonstrating algorithmic intuition."
  },
  {
    title: "1700+ Competitive Rating on GeeksForGeeks",
    detail: "Consistently ranked in the top percentiles nationwide for algorithmic speed and optimization."
  },
  {
    title: "100 Days of Code Daily Streak on X",
    detail: "Maintained public accountability with daily code submissions, system designs, and DSA writeups."
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
            Proven industry contributions, academic rigor at NIT Calicut, and verified nationwide competitive honors.
          </p>
        </div>

        <div className={styles.mainGrid}>
          {/* Left Column: Work Experience & Engineering Practice */}
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

              {/* Engineering Standards & Practice Card (fills left column gracefully) */}
              <motion.div
                className={styles.practiceCard}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className={styles.practiceHeader}>
                  <Terminal size={18} className={styles.practiceIcon} />
                  <h4 className={styles.practiceTitle}>Engineering Invariants &amp; Delivery Standards</h4>
                </div>
                <p className={styles.practiceDesc}>
                  Every system is built with automated testing, containerized sandboxes, and continuous delivery:
                </p>
                <div className={styles.practicePillGrid}>
                  <div className={styles.practicePill}>
                    <Code2 size={13} className={styles.pillIcon} />
                    <span>108+ PyTests &amp; Jest Unit Tests</span>
                  </div>
                  <div className={styles.practicePill}>
                    <Terminal size={13} className={styles.pillIcon} />
                    <span>Docker Container Sandboxes</span>
                  </div>
                  <div className={styles.practicePill}>
                    <CheckCircle2 size={13} className={styles.pillIcon} />
                    <span>Non-blocking I/O Event Loops</span>
                  </div>
                  <div className={styles.practicePill}>
                    <Sparkles size={13} className={styles.pillIcon} />
                    <span>5+ Production PaaS Deployments</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Academic Rigor & National Certifications */}
          <div className={styles.rightCol}>
            <div className={styles.blockHeader}>
              <GraduationCap size={20} className={styles.colHeaderIcon} />
              <h3 className={styles.blockTitle}>Academic Rigor &amp; Honors</h3>
            </div>

            <div className={styles.eduList}>
              {/* Featured National Certification Card: NPTEL Top 1% */}
              <motion.div
                className={`${styles.educationCard} ${styles.nptelCard}`}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.cardTopRow}>
                  <div className={styles.eduMetaLeft}>
                    <div className={styles.goldBadgeRow}>
                      <span className={styles.goldBadge}>
                        <Award size={13} />
                        <span>Top 1% Across India • Elite + Gold</span>
                      </span>
                    </div>
                    <h4 className={styles.eduDegree}>Design and Analysis of Algorithms</h4>
                    <p className={styles.nptelIssuer}>NPTEL • Ministry of Education &amp; IITs</p>
                  </div>
                  <div className={styles.datePillGold}>
                    <span>National Certification</span>
                  </div>
                </div>
                <p className={styles.eduHighlights}>
                  Achieved Top 1% percentile standing across India among thousands of candidates in advanced algorithmic analysis, asymptotic bounds, dynamic programming, and network flows.
                </p>
              </motion.div>

              {/* NIT Calicut Degree */}
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  className={styles.educationCard}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx + 1) * 0.1 }}
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

              {/* Verified Engineering Honors Box */}
              <motion.div
                className={styles.achievementsCard}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className={styles.achievementsHeader}>
                  <Award size={16} className={styles.achieveIcon} />
                  <span className={styles.achieveTitle}>Verified Competitive Milestones</span>
                </div>
                <div className={styles.milestoneGrid}>
                  {honorsList.map((item, idx) => (
                    <div key={idx} className={styles.milestoneBox}>
                      <div className={styles.milestoneDot} />
                      <div>
                        <h5 className={styles.milestoneTitle}>{item.title}</h5>
                        <p className={styles.milestoneDesc}>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
