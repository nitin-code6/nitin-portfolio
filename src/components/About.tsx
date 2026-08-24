'use client';
import { motion } from 'framer-motion';
import { Code2, Server, Database, Cpu } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  const features = [
    {
      icon: <Server size={24} />,
      title: "Backend Engineering",
      desc: "Building scalable APIs and microservices using Node.js, Express, and message queues."
    },
    {
      icon: <Database size={24} />,
      title: "Database Design",
      desc: "Structuring complex data in MongoDB, MySQL, and optimizing caching with Redis."
    },
    {
      icon: <Cpu size={24} />,
      title: "System Architecture",
      desc: "Designing asynchronous, high-throughput systems capable of handling concurrent loads."
    },
    {
      icon: <Code2 size={24} />,
      title: "Core Fundamentals",
      desc: "Strong grasp of Data Structures, Algorithms, Object-Oriented Programming, and DBMS."
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
              My journey into software engineering is driven by a deep fascination with how complex systems operate under the hood. As a student at the National Institute of Technology, Calicut, I've spent my time mastering both the theoretical foundations of Computer Science and the practical application of modern web technologies.
            </p>
            <p className={styles.paragraph}>
              I don't just build websites; I build systems. My focus is on backend architecture, real-time data processing, and creating scalable infrastructure. Whether it's architecting a robust coding platform with background job queues or designing real-time operational systems, I care deeply about performance, reliability, and clean code.
            </p>
            <p className={styles.paragraph}>
              I'm constantly expanding my toolkit. Recently, I've been diving deep into Generative AI integration, exploring LLMs, RAG architectures, and embeddings to build smarter, more capable applications.
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
