'use client';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const skillCategories = [
  {
    title: "Programming",
    skills: ["C++", "JavaScript", "TypeScript"]
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "HTML", "CSS"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs"]
  },
  {
    title: "Databases & Messaging",
    skills: ["MongoDB", "MySQL", "Redis", "Kafka", "BullMQ"]
  },
  {
    title: "AI & Generative AI",
    skills: ["LLM Fundamentals", "Prompt Engineering", "LLM APIs", "RAG Concepts", "Embeddings"]
  },
  {
    title: "System Design & DevOps",
    skills: ["API Design", "Caching", "Scalability", "Git/GitHub", "Docker", "Linux"]
  },
  {
    title: "Core CS",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems"]
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
          <h2 className="sectionTitle">Technical <span className="text-gradient">Skills</span></h2>
          <p>Technologies and concepts I work with to build scalable systems.</p>
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
