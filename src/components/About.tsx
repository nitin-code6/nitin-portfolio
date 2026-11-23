'use client';
import { motion } from 'framer-motion';
import { Code2, Server, Database, Cpu, Brain, Network } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  const features = [
    {
      icon: <Brain size={24} />,
      title: "Applied AI & RAG",
      desc: "Architecting autonomous LLM agents, FastMCP server bridges, vector retrieval, and temporal neural networks."
    },
    {
      icon: <Server size={24} />,
      title: "Distributed Backend",
      desc: "Building high-concurrency event-driven microservices using Kafka, BullMQ, Redis, Node.js, and FastAPI."
    },
    {
      icon: <Database size={24} />,
      title: "Database Internals",
      desc: "Built a C++ relational storage engine with 4KB block paging and disk B+ Tree indexing from scratch."
    },
    {
      icon: <Network size={24} />,
      title: "Real-Time & Telemetry",
      desc: "Full-duplex WebSockets, Server-Sent Events (SSE), and time-series battery health monitoring pipelines."
    },
    {
      icon: <Code2 size={24} />,
      title: "Low-Level Design (LLD)",
      desc: "Clean modular architecture applying SOLID principles, Design Patterns (Strategy, Factory, Singleton) in C++."
    },
    {
      icon: <Cpu size={24} />,
      title: "Algorithmic Rigor",
      desc: "Solved 700+ Data Structures and Algorithms problems across LeetCode & GeeksForGeeks (1700+ rating)."
    }
  ];

  return (
    <section id="about" className={`section ${styles.aboutSection}`}>
      <div className="container">
        <div className={styles.grid}>
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="sectionTitle">About <span className="text-gradient">Me</span></h2>
            <p className={styles.paragraph}>
              My journey into software engineering is driven by a deep fascination with how complex systems operate under the hood. As an engineer at the <strong>National Institute of Technology, Calicut (NIT Calicut)</strong>, I have paired fundamental computer science principles with high-stakes, production-level software development.
            </p>
            <p className={styles.paragraph}>
              I don&apos;t just build surface-level web applications; I design complete, scalable systems. My engineering spans distributed message queues, isolated sandboxed execution pipelines, real-time logistics systems with live socket synchronizations, and low-level database storage engines built from first principles.
            </p>
            <p className={styles.paragraph}>
              With <strong>4 production applications currently deployed</strong> (SupportDesk, ReelFinder AI, FerryFlow, and CPULab) and an active portfolio in applied Generative AI, RAG, and MCP, I thrive at the intersection of cutting-edge intelligence and bulletproof backend reliability.
            </p>
          </motion.div>

          <motion.div 
            className={styles.featureGrid}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {features.map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.iconWrapper}>{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
