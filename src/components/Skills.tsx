'use client';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["C++", "JavaScript", "TypeScript"]
  },
  {
    title: "Backend & Systems",
    skills: ["Node.js", "Express.js", "REST APIs", "System Design", "Caching"]
  },
  {
    title: "Databases & Message Queues",
    skills: ["MongoDB", "MySQL", "Redis", "Kafka", "BullMQ"]
  },
  {
    title: "Frontend Development",
    skills: ["React.js", "Next.js", "HTML", "CSS"]
  },
  {
    title: "AI & Generative AI",
    skills: ["LLM fundamentals", "Prompt engineering", "LLM APIs", "RAG concepts"]
  },
  {
    title: "Core CS & DevOps",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "OS", "Git/GitHub", "Docker", "Linux"]
  }
];

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className={`section ${styles.skillsSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>Technical <span className="text-gradient">Arsenal</span></h2>
          <p>Technologies and systems I work with to build scalable applications.</p>
        </div>

        <motion.div 
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category, idx) => (
            <motion.div key={idx} variants={item} className={`glass-panel ${styles.categoryCard}`}>
              <h3>{category.title}</h3>
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
