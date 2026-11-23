'use client';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["C++", "C", "Python", "TypeScript", "JavaScript", "SQL"]
  },
  {
    title: "Applied AI, LLMs & RAG",
    skills: ["RAG Pipelines", "FastMCP", "LangChain", "Vector Search", "Embeddings", "Agentic AI", "PyTorch", "LSTM-VAE"]
  },
  {
    title: "Backend & Distributed Systems",
    skills: ["Node.js", "Express.js", "FastAPI", "Apache Kafka", "BullMQ", "Redis", "Socket.IO", "Server-Sent Events (SSE)", "REST APIs"]
  },
  {
    title: "Systems & Low-Level Design",
    skills: ["B+ Tree Storage", "Buffer Pool Paging", "SOLID Principles", "Strategy Pattern", "Factory Pattern", "Singleton Pattern", "Object-Oriented Design (OOD)"]
  },
  {
    title: "Databases & Storage",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite", "Block-Level Disk Storage"]
  },
  {
    title: "Frontend Architecture",
    skills: ["React 19 / 18", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "CSS Modules", "Redux Toolkit"]
  },
  {
    title: "Cloud, DevOps & Tooling",
    skills: ["Docker", "Linux CLI", "Git & GitHub", "Render PaaS", "Netlify", "Vercel", "PyTest", "Jest"]
  },
  {
    title: "Core Computer Science",
    skills: ["700+ DSA Solved", "Database Management Systems", "Operating Systems Internals", "Computer Networks", "Concurrency & Multithreading"]
  }
];

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className={`section ${styles.skillsSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="sectionTitle">Technical <span className="text-gradient">Arsenal</span></h2>
          <p>Technologies, distributed frameworks, and systems engineering concepts I work with.</p>
        </div>

        <motion.div 
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category, idx) => (
            <motion.div key={idx} variants={item} className={styles.categoryCard}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={styles.skillTags}>
                {category.skills.map((skill, sIdx) => (
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
