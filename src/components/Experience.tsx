'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, CheckCircle2, Calendar, MapPin, Building2, Trophy, Star } from 'lucide-react';
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
    highlights: "Distinction in Mathematics and Physics with strong analytical and problem-solving foundations."
  }
];

const honorsList = [
  {
    title: "Introduction to Algorithms and Analysis",
    issuer: "NPTEL • Ministry of Education & IITs",
    badge: "Top 1% in India • Elite + Gold",
    detail: "Ranked in the top 1% percentile nationwide across premier institutes in rigorous algorithmic analysis, asymptotic bounds, and dynamic programming.",
    isFeatured: true
  },
  {
    title: "Foundation For Excellence (FFE) Scholar",
    issuer: "FFE India Trust",
    badge: "Nationwide Fellowship",
    detail: "Awarded prestigious merit-based nationwide engineering fellowship and mentorship for academic and technical excellence.",
    isFeatured: false
  },
  {
    title: "700+ Data Structures & Algorithms Solved",
    issuer: "LeetCode & GeeksForGeeks",
    badge: "Competitive DSA",
    detail: "Extensive problem-solving across LeetCode & GeeksForGeeks demonstrating deep algorithmic intuition.",
    isFeatured: false
  },
  {
    title: "1700+ Competitive Rating on GeeksForGeeks",
    issuer: "GeeksForGeeks",
    badge: "Top Percentile",
    detail: "Consistently ranked in the top percentiles nationwide for algorithmic speed and optimization.",
    isFeatured: false
  },
  {
    title: "100 Days of Code Daily Streak on X",
    issuer: "Public Engineering on X (Twitter)",
    badge: "Consistency",
    detail: "Maintained public accountability with daily code submissions, system designs, and DSA writeups.",
    isFeatured: false
  },
  {
    title: "LeetCode SQL 50 Advanced Badge",
    issuer: "LeetCode",
    badge: "Database Mastery",
    detail: "Verified mastery of complex relational joins, aggregations, and window analytical queries.",
    isFeatured: false
  }
];

export default function Experience() {
  return (
    <section id="experience" className={`section ${styles.experienceSection}`} aria-label="Experience, Education and Honors">
      <div className="container">
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <Briefcase size={14} className={styles.badgeIcon} />
            <span>Career &amp; Credentials</span>
          </div>
          <h2 className="sectionTitle">
            Experience &amp; <span className="text-gradient">Education</span>
          </h2>
          <p className={styles.subheading}>
            Proven industry contributions, academic rigor at NIT Calicut, and verified nationwide competitive honors.
          </p>
        </div>

        {/* Tier 1: Symmetrical Top Grid (Experience & Education) */}
        <div className={styles.topGrid}>
          {/* Left Column: Work Experience */}
          <div className={styles.col}>
            <div className={styles.blockHeader}>
              <Briefcase size={20} className={styles.colHeaderIcon} />
              <h3 className={styles.blockTitle}>Professional Experience</h3>
            </div>

            <div className={styles.cardList}>
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
          </div>

          {/* Right Column: Academic Background */}
          <div className={styles.col}>
            <div className={styles.blockHeader}>
              <GraduationCap size={20} className={styles.colHeaderIcon} />
              <h3 className={styles.blockTitle}>Academic Background</h3>
            </div>

            <div className={styles.cardList}>
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  className={styles.educationCard}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
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

        {/* Tier 2: Full-Width Verified Honors & Certifications Grid (Zero Empty Space) */}
        <div className={styles.honorsSection}>
          <div className={styles.blockHeader}>
            <Trophy size={20} className={styles.colHeaderIconGold} />
            <h3 className={styles.blockTitle}>Honors, Certifications &amp; Competitive Milestones</h3>
          </div>

          <div className={styles.honorsGrid}>
            {honorsList.map((item, idx) => (
              <motion.div
                key={idx}
                className={`${styles.honorCard} ${item.isFeatured ? styles.featuredGoldCard : ''}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <div className={styles.honorHeader}>
                  <span className={item.isFeatured ? styles.badgeGold : styles.badgeCyan}>
                    {item.isFeatured && <Star size={12} className={styles.starIcon} />}
                    <span>{item.badge}</span>
                  </span>
                  <span className={styles.honorIssuer}>{item.issuer}</span>
                </div>

                <h4 className={styles.honorTitle}>{item.title}</h4>
                <p className={styles.honorDetail}>{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
