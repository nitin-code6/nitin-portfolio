'use client';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink, Play, Sparkles } from 'lucide-react';
import styles from './FeaturedProjects.module.css';

interface Project {
  title: string;
  category: string;
  description: string;
  problemSolution: string;
  tech: string[];
  github: string;
  demo?: string;
  platform?: string;
  featured: boolean;
}

const featuredProjects: Project[] = [
  {
    title: "SupportDesk",
    category: "AI & Full-Stack Cloud",
    description: "Intelligent support operations platform designed to streamline ticket management, assist support engineers with automated root-cause diagnostics, and accelerate escalations.",
    problemSolution: "Problem: Support engineering teams spend excessive manual hours triaging repetitive issue logs and writing escalation reports.\nArchitecture: Implemented a FastAPI microservice backend connected to dual rotated LLM engines (Gemini & Groq) with structured logging.\nSolution: Automated ticket triage, real-time sentiment analysis, and 1-click engineering escalations with 22 automated PyTest test suites.",
    tech: ["FastAPI", "Python", "React 18", "TypeScript", "Tailwind CSS", "Docker", "Gemini AI", "Groq API", "Render"],
    github: "https://github.com/nitin-code6/SupportDesk",
    demo: "https://supportdesk-frontend-ecgs.onrender.com/",
    platform: "Render Live",
    featured: true
  },
  {
    title: "ReelFinder AI",
    category: "AI & Screenplay Analytics",
    description: "AI engine that parses microdrama screenplays to detect, rank, and extract engaging 20–60 second viral hooks, dramatic twists, and cliffhangers for content marketing teams.",
    problemSolution: "Problem: Content marketers manually spend days reading screenplays to find promotional scene cut timestamps for short-form video campaigns.\nArchitecture: Built a screenplay parsing engine utilizing NLP entity-tracking, scene tension scoring, and LLM comprehension.\nSolution: Generates timestamped cut lists with virality confidence scores, backed by 86 comprehensive unit and integration tests.",
    tech: ["Python", "FastAPI", "React 19", "PostgreSQL", "SQLAlchemy", "Tailwind", "LLMs", "Render"],
    github: "https://github.com/nitin-code6/reelfinder-ai",
    demo: "https://reelfinder-frontend.onrender.com/",
    platform: "Render Live",
    featured: true
  },
  {
    title: "FerryFlow",
    category: "Real-Time Logistics",
    description: "Real-Time Ferry Fleet Operations & Passenger Logistics System deployed for active production use.",
    problemSolution: "Problem: Unsynchronized ferry schedules cause terminal bottlenecks, seat overbooking, and communication delays between captains and port admins.\nArchitecture: Event-driven MERN stack architecture with dual Redis caching and Socket.IO real-time channels.\nSolution: Synchronized workflows for passengers, port staff, and vessel captains with live seat locking and zero-collision booking.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Socket.IO", "Redis", "Netlify"],
    github: "https://github.com/nitin-code6/FerryFlow",
    demo: "https://ferryflow.netlify.app/",
    platform: "Netlify Live",
    featured: true
  },
  {
    title: "CPU Scheduler (CPULab)",
    category: "Systems & Algorithm Simulator",
    description: "Interactive systems visualization platform comparing CPU process scheduling algorithms with real-time Gantt charts.",
    problemSolution: "Problem: Understanding low-level operating system scheduling and context switching latency is difficult from static textbook formulas alone.\nArchitecture: High-performance client-side simulation engine rendering dynamic SVG Gantt charts at 60fps.\nSolution: Real-time interactive simulation of Round Robin, SJF (Preemptive/Non-preemptive), and FCFS with instant turnaround & waiting time telemetry.",
    tech: ["JavaScript", "SVG / Canvas", "OS Algorithms", "CSS Modules", "Vercel"],
    github: "https://github.com/nitin-code6/OS-VISUALIZER",
    demo: "https://cpulab.vercel.app/",
    platform: "Vercel Live",
    featured: true
  },
  {
    title: "BatteryLife-AI",
    category: "Deep Learning & Applied AI",
    description: "Intelligent EV battery degradation and health platform using LSTM-VAE to model aging trajectories, detect anomalies, and forecast Remaining Useful Life (RUL).",
    problemSolution: "Problem: Non-linear electrochemical battery degradation makes traditional Coulomb-counting inaccurate over dynamic thermal cycles.\nArchitecture: Variational Autoencoder with Bidirectional LSTM layers mapping time-series telemetry into a regularized latent manifold.\nSolution: Estimates State of Health (SOH), detects cell micro-anomalies through reconstruction error, and generates synthetic aging lifecycles.",
    tech: ["TypeScript", "Python", "PyTorch", "LSTM-VAE", "Time-Series ML", "Telemetry"],
    github: "https://github.com/nitin-code6/BatteryLife-AI",
    featured: true
  },
  {
    title: "CodeArena",
    category: "Distributed Systems",
    description: "Scalable online judge platform for Data Structures and Algorithms practice with asynchronous code execution and live evaluation feedback.",
    problemSolution: "Problem: Running synchronous compiler executions directly on the backend thread blocks the server and crashes under concurrent contest submissions.\nArchitecture: Distributed queue pipeline offloading execution to isolated Judge0 Docker containers with strict memory/CPU cgroups.\nSolution: Implemented BullMQ with Redis for job buffering, Apache Kafka for audit event streaming, and Server-Sent Events (SSE) for real-time live verdict delivery.",
    tech: ["React.js", "Node.js", "MongoDB", "Redis", "BullMQ", "Apache Kafka", "Judge0", "SSE"],
    github: "https://github.com/nitin-code6/CodeArena",
    featured: true
  },
  {
    title: "NovaDB Engine",
    category: "Core Database Systems (C++)",
    description: "Lightweight relational database storage engine built from scratch in C++ featuring 4KB block-level storage and B+ Tree indexing.",
    problemSolution: "Problem: Building persistent disk-backed storage requires handling page alignment, cache eviction, and logarithmic key navigation without corruption.\nArchitecture: Layered storage hierarchy with Buffer Pool paging (LRU-K), raw binary disk block I/O, and disk-backed B+ tree balancing.\nSolution: Implemented logarithmic key lookup O(log_B N), node splitting/merging, dirty page writeback, and sequential leaf iteration.",
    tech: ["C++20", "B+ Tree", "Buffer Pool", "Disk Storage", "Systems Programming"],
    github: "https://github.com/nitin-code6/novadb-engine",
    featured: true
  }
];

export default function FeaturedProjects() {
  return (
    <div className={styles.featuredContainer}>
      <div className={styles.sectionHeading}>
        <div className={styles.headingBadge}>
          <Sparkles size={14} /> Flagship Architectures
        </div>
        <h3 className={styles.subTitle}>Featured Engineering Work</h3>
        <p className={styles.subDesc}>
          Production applications, distributed systems, and low-level engineering built with robust architectures.
        </p>
      </div>

      <div className={styles.projectList}>
        {featuredProjects.map((project, idx) => (
          <motion.div 
            key={idx} 
            className={styles.projectCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: idx * 0.08 }}
          >
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.metaRow}>
                  <span className={styles.categoryBadge}>{project.category}</span>
                  {project.platform && (
                    <span className={styles.liveIndicator}>
                      <span className={styles.pulseDot}></span>
                      {project.platform}
                    </span>
                  )}
                </div>
                <h4 className={styles.projectTitle}>{project.title}</h4>
              </div>

              <div className={styles.links}>
                {project.demo && (
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.liveBtn}
                    aria-label={`Open ${project.title} Live Demo`}
                  >
                    <Play size={14} fill="currentColor" /> Live Demo
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.githubIconBtn}
                    aria-label={`GitHub repo for ${project.title}`}
                  >
                    <FaGithub size={20} />
                  </a>
                )}
              </div>
            </div>
            
            <p className={styles.description}>{project.description}</p>
            
            {project.problemSolution && (
              <div className={styles.engineeringDetails}>
                {project.problemSolution.split('\n').map((line, i) => {
                  const colonIndex = line.indexOf(':');
                  if (colonIndex === -1) return <p key={i}>{line}</p>;
                  const label = line.substring(0, colonIndex);
                  const content = line.substring(colonIndex + 1);
                  return (
                    <p key={i}>
                      <strong>{label}:</strong> {content}
                    </p>
                  );
                })}
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
