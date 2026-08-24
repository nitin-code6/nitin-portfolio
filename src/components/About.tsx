'use client';
import { motion } from 'framer-motion';
import { Code, Server, Database, Brain } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  const features = [
    { icon: <Server size={24} />, title: 'Backend Engineering', desc: 'Designing scalable APIs and asynchronous background jobs.' },
    { icon: <Code size={24} />, title: 'Full-Stack Dev', desc: 'Building seamless frontends connected to robust backends.' },
    { icon: <Database size={24} />, title: 'Systems & Data', desc: 'Working with databases, caching, and system architecture.' },
    { icon: <Brain size={24} />, title: 'AI Integration', desc: 'Implementing LLMs and generative AI in practical apps.' }
  ];

  return (
    <section id="about" className={`section ${styles.aboutSection}`}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.title}>About <span className="text-gradient">Me</span></h2>
          
          <div className={styles.grid}>
            <div className={styles.story}>
              <p>
                I am currently an engineering student at <strong>NIT Calicut</strong> (B.Tech in Civil Engineering), with a passionate focus and strong foundations in software engineering. My transition into tech has been driven by an intense curiosity for how complex systems work under the hood.
              </p>
              <p>
                I thrive on building scalable applications involving APIs, databases, asynchronous processing, and performance optimization. With over <strong>700+ Data Structures and Algorithms problems</strong> solved across various platforms and a 1700+ rating on GeeksForGeeks, I bring strong problem-solving skills to real-world engineering challenges.
              </p>
              <p>
                Beyond standard web development, I explore system design fundamentals and practical integrations of emerging AI technologies to build modern, intelligent platforms.
              </p>
            </div>
            
            <div className={styles.featureGrid}>
              {features.map((feat, i) => (
                <div key={i} className={`glass-panel ${styles.featureCard}`}>
                  <div className={styles.iconWrapper}>{feat.icon}</div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
