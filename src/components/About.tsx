'use client';
import { motion } from 'framer-motion';
import { Brain, Server, Database, Cpu } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import styles from './About.module.css';

export default function About() {
  const { about } = portfolioData;

  const highlights = [
    {
      icon: <Server size={22} />,
      title: "Distributed Backends",
      desc: "Asynchronous worker queues, message streaming (Kafka, BullMQ, Redis), and real-time SSE."
    },
    {
      icon: <Brain size={22} />,
      title: "Applied AI Pipelines",
      desc: "Production RAG, FastMCP agent servers, and LSTM-VAE time-series sequence models."
    },
    {
      icon: <Database size={22} />,
      title: "Systems in C++",
      desc: "Relational storage engine internals, buffer pool paging, and disk-backed B+ tree balancing."
    },
    {
      icon: <Cpu size={22} />,
      title: "Algorithmic Rigor",
      desc: "700+ DSA problems solved across LeetCode & GeeksForGeeks (1700+ rating)."
    }
  ];

  return (
    <section id="about" className={`section ${styles.aboutSection}`} aria-label="About Me">
      <div className="container">
        <div className={styles.grid}>
          {/* Text Content */}
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.sectionPill}>
              <span>Engineering Journey</span>
            </div>
            <h2 className={styles.heading}>
              About <span className="text-gradient">Nitin Kumar</span>
            </h2>

            {about.paragraphs.map((p, idx) => (
              <p key={idx} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </motion.div>

          {/* Core Focus Highlights */}
          <motion.div 
            className={styles.featureGrid}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {highlights.map((h, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.iconWrapper}>{h.icon}</div>
                <h3 className={styles.cardTitle}>{h.title}</h3>
                <p className={styles.cardDesc}>{h.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
