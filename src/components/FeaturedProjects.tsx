'use client';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import styles from './FeaturedProjects.module.css';

const featuredProjects = [
  {
    title: "CodeArena",
    description: "Scalable online coding platform for DSA practice with automated code execution, submission evaluation, real-time notifications, and AI-powered coding guidance.",
    tech: ["React.js", "Node.js", "MongoDB", "Redis", "BullMQ", "Kafka", "SSE", "Judge0 API", "Gemini AI"],
    github: "https://github.com/nitin-code6/CodeArena", // Adjust if actual URL is different
    demo: "", // Add if demo exists
    featured: true
  },
  {
    title: "Deep Packet Inspection",
    description: "Network Security and Traffic Analysis Engine with multi-threaded packet processing, flow-based traffic analysis, and packet classification.",
    tech: ["C++", "TCP/IP", "PCAP", "Linux", "Multithreading"],
    github: "https://github.com/nitin-code6/Deep-Packet-Inspection",
    demo: "",
    featured: true
  },
  {
    title: "FerryFlow",
    description: "Real-Time Ferry Operations & Passenger Management System featuring passenger/staff workflows, scheduling, bookings, and real-time operational updates.",
    tech: ["React.js", "Node.js", "MongoDB", "Socket.IO", "Redis"],
    github: "https://github.com/nitin-code6/FerryFlow",
    demo: "https://ferryflow.netlify.app/",
    featured: true
  }
];

export default function FeaturedProjects() {
  return (
    <div className={styles.featuredContainer}>
      <h3 className={styles.subTitle}>Featured Work</h3>
      <div className={styles.grid}>
        {featuredProjects.map((project, idx) => (
          <motion.div 
            key={idx} 
            className={`glass-panel ${styles.projectCard}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className={styles.cardHeader}>
              <h4>{project.title}</h4>
              <div className={styles.links}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub size={20} />
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.techStack}>
              {project.tech.map((tech, tIdx) => (
                <span key={tIdx} className={styles.techTag}>{tech}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
