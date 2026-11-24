'use client';

import { motion } from 'framer-motion';
import { Terminal, Globe, Brain, Cpu, Compass, Sparkles, Quote } from 'lucide-react';
import styles from './About.module.css';

interface Milestone {
  phase: string;
  question: string;
  title: string;
  tech: string;
  detail: string;
  icon: typeof Terminal;
  badge: string;
}

const milestones: Milestone[] = [
  {
    phase: "01",
    question: "How can logic break down any complex problem?",
    title: "Algorithmic Discipline",
    tech: "C++20 • 100 Days on X • 700+ DSA",
    detail: "Transitioned from Civil Engineering by taking on a daily public coding challenge. Solved 700+ problems across LeetCode & GFG.",
    icon: Cpu,
    badge: "The Foundation"
  },
  {
    phase: "02",
    question: "How do the applications we use every day actually work?",
    title: "Full-Stack & Systems Reality",
    tech: "MERN Stack • Node.js • Production Internship",
    detail: "Built real applications, broke things, debugged event loops, and completed a software engineering internship shipping live features.",
    icon: Globe,
    badge: "Production Code"
  },
  {
    phase: "03",
    question: "How do AI assistants understand instructions & use tools?",
    title: "Applied AI & RAG Pipelines",
    tech: "FastMCP • RAG • LangChain • Vector DBs",
    detail: "Dove deep into LLM internals, semantic search, and the Model Context Protocol to create practical tools solving real user pain.",
    icon: Brain,
    badge: "AI Systems"
  },
  {
    phase: "04",
    question: "How do we make systems reliable and autonomous at scale?",
    title: "DevOps & Agentic AI",
    tech: "Kubernetes • CI/CD • Multi-Agent Workflows",
    detail: "Currently deep-diving into infrastructure reliability, cloud container orchestration, and autonomous multi-agent tool execution.",
    icon: Sparkles,
    badge: "Active Frontier"
  }
];

export default function About() {
  return (
    <section id="about" className={`section ${styles.aboutSection}`} aria-label="A Journey Driven by Curiosity">
      <div className="container">
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionPill}>
            <Compass size={14} className={styles.pillIcon} />
            <span>Engineering Story</span>
          </div>
          <h2 className={styles.heading}>
            A Journey Driven by <span className="text-gradient">Curiosity</span>
          </h2>
          <p className={styles.subheading}>
            From Civil Engineering at NIT Calicut to building distributed backends, AI pipelines, and scalable cloud systems.
          </p>
        </div>

        <div className={styles.mainGrid}>
          {/* Narrative Column */}
          <motion.div 
            className={styles.narrativeCol}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.storyCard}>
              <p className={styles.storyLead}>
                When I joined NIT Calicut as a Civil Engineering student, I didn&apos;t know that coding would become my life&apos;s passion.
              </p>

              <p className={styles.paragraph}>
                It started with a coding workshop. I was captivated by how any problem, no matter how intimidating, could be broken down into small, deterministic pieces through pure logic. That spark led me to C++, Data Structures, and Algorithms.
              </p>

              <p className={styles.paragraph}>
                To build discipline, I committed to solving at least one DSA problem every single day for 100 days, publicly sharing my progress on X (Twitter). That consistency scaled into <strong>700+ problems solved across LeetCode and GeeksForGeeks</strong>, giving me a deep algorithmic intuition.
              </p>

              <div className={styles.quoteBlock}>
                <Quote size={20} className={styles.quoteIcon} />
                <p className={styles.quoteText}>
                  <em>&ldquo;How do the websites and applications we use every day actually work under high traffic?&rdquo;</em>
                </p>
              </div>

              <p className={styles.paragraph}>
                That question pulled me beyond algorithmic puzzles into software engineering. I mastered the MERN stack and Node.js, built architectures from scratch, broke them, fixed them, and earned my first Web Development Internship delivering real-world code.
              </p>

              <p className={styles.paragraph}>
                When AI coding assistants emerged, my next question was immediate: <em>How do they reason, call tools, and generate precise code?</em> That launched my deep-dive into Generative AI—authoring RAG pipelines, FastMCP servers, and practical AI applications.
              </p>

              {/* Concluding Philosophy Callout */}
              <div className={styles.philosophyBox}>
                <div className={styles.philosophyIndicator} />
                <p className={styles.philosophyText}>
                  Looking back, my path has never been about following a rigid template. Each new skill started with a question, and every answer sparked another. <strong>I started in Civil Engineering, found my true calling in software, and I&apos;m still exploring how far curiosity can take me.</strong>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Visual Milestone Progression Column */}
          <motion.div 
            className={styles.timelineCol}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={styles.timelineWrapper}>
              {/* Connecting Glow Line */}
              <div className={styles.connectingLine} />

              {milestones.map((m, idx) => {
                const IconComponent = m.icon;
                const isCurrent = idx === milestones.length - 1;
                return (
                  <div key={idx} className={`${styles.milestoneItem} ${isCurrent ? styles.currentMilestone : ''}`}>
                    {/* Node Dot / Icon */}
                    <div className={styles.milestoneIconWrap}>
                      <IconComponent size={16} />
                      <span className={styles.phaseNumber}>{m.phase}</span>
                    </div>

                    {/* Milestone Card */}
                    <div className={styles.milestoneCard}>
                      <div className={styles.milestoneHeader}>
                        <span className={styles.milestoneBadge}>{m.badge}</span>
                        <span className={styles.milestoneQuestion}>&ldquo;{m.question}&rdquo;</span>
                      </div>

                      <h4 className={styles.milestoneTitle}>{m.title}</h4>
                      <p className={styles.milestoneTech}>{m.tech}</p>
                      <p className={styles.milestoneDetail}>{m.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
