'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink, Play, Sparkles, Layers, Cpu, Cloud, Brain } from 'lucide-react';
import styles from './FeaturedProjects.module.css';

interface Project {
  id: string;
  title: string;
  category: string;
  categoryKey: 'ai' | 'cloud' | 'systems';
  description: string;
  problemSolution: string;
  tech: string[];
  github: string;
  demo?: string;
  platform?: string;
}

const featuredProjects: Project[] = [
  {
    id: 'supportdesk',
    title: "SupportDesk",
    category: "AI & Full-Stack Operations",
    categoryKey: 'ai',
    description: "Intelligent support operations platform designed to streamline ticket management, assist support engineers with automated root-cause diagnostics, and accelerate escalations.",
    problemSolution: "Problem: Support engineering teams spend excessive manual hours triaging repetitive issue logs and writing escalation reports.\nArchitecture: FastAPI microservice connected to dual rotated LLM engines (Gemini & Groq) with structured logging.\nSolution: Automated ticket triage, real-time sentiment analysis, and 1-click engineering escalations with 22 PyTest test suites.",
    tech: ["FastAPI", "Python", "React 18", "TypeScript", "Tailwind CSS", "Docker", "Gemini AI", "Groq API", "Render"],
    github: "https://github.com/nitin-code6/SupportDesk",
    demo: "https://supportdesk-frontend-ecgs.onrender.com/",
    platform: "Render Live"
  },
  {
    id: 'reelfinder',
    title: "ReelFinder AI",
    category: "AI & Screenplay Analytics",
    categoryKey: 'ai',
    description: "AI engine that parses microdrama screenplays to detect, rank, and extract engaging 20–60 second viral hooks, dramatic twists, and cliffhangers for content marketing teams.",
    problemSolution: "Problem: Content marketers manually spend days reading screenplays to find promotional scene cut timestamps for short-form video campaigns.\nArchitecture: Screenplay parsing engine utilizing NLP entity-tracking, scene tension scoring, and LLM comprehension.\nSolution: Generates timestamped cut lists with virality confidence scores, backed by 86 comprehensive unit and integration tests.",
    tech: ["Python", "FastAPI", "React 19", "PostgreSQL", "SQLAlchemy", "Tailwind", "LLMs", "Render"],
    github: "https://github.com/nitin-code6/reelfinder-ai",
    demo: "https://reelfinder-frontend.onrender.com/",
    platform: "Render Live"
  },
  {
    id: 'ferryflow',
    title: "FerryFlow",
    category: "Real-Time Fleet Logistics",
    categoryKey: 'cloud',
    description: "Real-Time Ferry Fleet Operations & Passenger Logistics System deployed for active production use with multi-role dashboards.",
    problemSolution: "Problem: Unsynchronized ferry schedules cause terminal bottlenecks, seat overbooking, and communication delays between captains and port admins.\nArchitecture: Event-driven MERN stack architecture with dual Redis caching and Socket.IO real-time channels.\nSolution: Synchronized workflows for passengers, port staff, and vessel captains with live seat locking and zero-collision booking.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Socket.IO", "Redis", "Netlify"],
    github: "https://github.com/nitin-code6/FerryFlow",
    demo: "https://ferryflow.netlify.app/",
    platform: "Netlify Live"
  },
  {
    id: 'cpulab',
    title: "CPU Scheduler (CPULab)",
    category: "Systems & Algorithm Simulator",
    categoryKey: 'systems',
    description: "Interactive systems visualization platform comparing CPU process scheduling algorithms with real-time Gantt charts.",
    problemSolution: "Problem: Understanding low-level operating system scheduling and context switching latency is difficult from static textbook formulas alone.\nArchitecture: High-performance client-side simulation engine rendering dynamic SVG Gantt charts at 60fps.\nSolution: Real-time interactive simulation of Round Robin, SJF (Preemptive/Non-preemptive), and FCFS with instant turnaround & waiting time telemetry.",
    tech: ["JavaScript", "SVG / Canvas", "OS Algorithms", "CSS Modules", "Vercel"],
    github: "https://github.com/nitin-code6/OS-VISUALIZER",
    demo: "https://cpulab.vercel.app/",
    platform: "Vercel Live"
  },
  {
    id: 'batterylife',
    title: "BatteryLife-AI",
    category: "Deep Learning & Applied AI",
    categoryKey: 'ai',
    description: "Intelligent EV battery degradation and health platform using LSTM-VAE to model aging trajectories, detect anomalies, and forecast Remaining Useful Life (RUL).",
    problemSolution: "Problem: Non-linear electrochemical battery degradation makes traditional Coulomb-counting inaccurate over dynamic thermal cycles.\nArchitecture: Variational Autoencoder with Bidirectional LSTM layers mapping time-series telemetry into a regularized latent manifold.\nSolution: Estimates State of Health (SOH), detects cell micro-anomalies through reconstruction error, and generates synthetic aging lifecycles.",
    tech: ["TypeScript", "Python", "PyTorch", "LSTM-VAE", "Time-Series ML", "Telemetry"],
    github: "https://github.com/nitin-code6/BatteryLife-AI"
  },
  {
    id: 'codearena',
    title: "CodeArena",
    category: "Distributed Online Judge",
    categoryKey: 'cloud',
    description: "Scalable online judge platform for Data Structures and Algorithms practice with asynchronous code execution and live evaluation feedback.",
    problemSolution: "Problem: Running synchronous compiler executions directly on the backend thread blocks the server and crashes under concurrent contest submissions.\nArchitecture: Distributed queue pipeline offloading execution to isolated Judge0 Docker containers with strict memory/CPU cgroups.\nSolution: Implemented BullMQ with Redis for job buffering, Apache Kafka for audit event streaming, and Server-Sent Events (SSE) for real-time live verdict delivery.",
    tech: ["React.js", "Node.js", "MongoDB", "Redis", "BullMQ", "Apache Kafka", "Judge0", "SSE"],
    github: "https://github.com/nitin-code6/CodeArena"
  },
  {
    id: 'novadb',
    title: "NovaDB Engine",
    category: "Core Database Systems (C++)",
    categoryKey: 'systems',
    description: "Lightweight relational database storage engine built from scratch in C++ featuring 4KB block-level storage and B+ Tree indexing.",
    problemSolution: "Problem: Building persistent disk-backed storage requires handling page alignment, cache eviction, and logarithmic key navigation without corruption.\nArchitecture: Layered storage hierarchy with Buffer Pool paging (LRU-K), raw binary disk block I/O, and disk-backed B+ tree balancing.\nSolution: Implemented logarithmic key lookup O(log_B N), node splitting/merging, dirty page writeback, and sequential leaf iteration.",
    tech: ["C++20", "B+ Tree", "Buffer Pool", "Disk Storage", "Systems Programming"],
    github: "https://github.com/nitin-code6/novadb-engine"
  }
];

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'cloud' | 'systems'>('all');

  const filteredProjects = activeFilter === 'all' 
    ? featuredProjects 
    : featuredProjects.filter(p => p.categoryKey === activeFilter);

  return (
    <div className={styles.featuredContainer}>
      <div className={styles.sectionHeading}>
        <div className={styles.headingBadge}>
          <Sparkles size={14} /> Flagship Architectures
        </div>
        <h3 className={styles.subTitle}>Featured Engineering Work</h3>
        <p className={styles.subDesc}>
          Explore my production applications, distributed platforms, and core systems work.
        </p>

        {/* Category Filter Pills */}
        <div className={styles.filterPills}>
          <button 
            onClick={() => setActiveFilter('all')}
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterActive : ''}`}
          >
            <Layers size={14} /> All Projects ({featuredProjects.length})
          </button>
          <button 
            onClick={() => setActiveFilter('ai')}
            className={`${styles.filterBtn} ${activeFilter === 'ai' ? styles.filterActive : ''}`}
          >
            <Brain size={14} /> AI & LLM Systems (3)
          </button>
          <button 
            onClick={() => setActiveFilter('cloud')}
            className={`${styles.filterBtn} ${activeFilter === 'cloud' ? styles.filterActive : ''}`}
          >
            <Cloud size={14} /> Cloud & Distributed (2)
          </button>
          <button 
            onClick={() => setActiveFilter('systems')}
            className={`${styles.filterBtn} ${activeFilter === 'systems' ? styles.filterActive : ''}`}
          >
            <Cpu size={14} /> Systems & C++ (2)
          </button>
        </div>
      </div>

      <motion.div layout className={styles.projectList}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id} 
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className={styles.projectCard}
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
                      <ExternalLink size={13} />
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
                      <FaGithub size={19} />
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
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
