'use client';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';
import styles from './FeaturedProjects.module.css';

const featuredProjects = [
  {
    title: "CodeArena",
    description: "Scalable online coding platform for Data Structures and Algorithms practice. Designed to handle asynchronous code execution and real-time evaluation feedback.",
    problemSolution: "Problem: Synchronous code execution blocks the main thread and struggles under concurrent submissions.\nArchitecture: Offloaded execution to isolated Judge0 API environments and utilized a message queue.\nSolution: Implemented BullMQ with Redis for background processing, Kafka for message streaming, and Server-Sent Events (SSE) for real-time notifications.",
    tech: ["React.js", "Node.js", "MongoDB", "Redis", "BullMQ", "Kafka", "SSE", "Judge0", "Gemini AI"],
    github: "https://github.com/nitin-code6/CodeArena",
    demo: "", 
    featured: true
  },
  {
    title: "Deep Packet Inspection",
    description: "Network Security and Traffic Analysis Engine built to parse and classify network packets efficiently at the lower levels of the network stack.",
    problemSolution: "Architecture: A multi-threaded packet processing system in C++.\nSolution: Parses Ethernet, IPv4, TCP, and UDP headers natively. Uses worker threads and thread-safe queues to analyze flow-based traffic in real-time.",
    tech: ["C++", "TCP/IP", "PCAP", "Linux", "Multithreading"],
    github: "https://github.com/nitin-code6/Deep-Packet-Inspection",
    demo: "",
    featured: true
  },
  {
    title: "FerryFlow",
    description: "Real-Time Ferry Operations & Passenger Management System deployed for active use.",
    problemSolution: "Solution: Full-stack platform featuring distinct workflows for passengers, staff, and administrators. Integrates real-time operational updates, scheduling, and live booking mechanics using Socket.IO.",
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
      <div className={styles.projectList}>
        {featuredProjects.map((project, idx) => (
          <motion.div 
            key={idx} 
            className={styles.projectCard}
            initial={{ opacity: 0, y: 15 }}
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
            
            {project.problemSolution && (
              <div className={styles.engineeringDetails}>
                {project.problemSolution.split('\n').map((line, i) => (
                  <p key={i}>
                    <strong>{line.split(':')[0]}:</strong> {line.substring(line.indexOf(':') + 1)}
                  </p>
                ))}
              </div>
            )}
            
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
