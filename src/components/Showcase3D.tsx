'use client';
import { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, Terminal, Activity, Layers, ShieldCheck, Play, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import styles from './Showcase3D.module.css';

interface DeployedProject {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  platform: 'Render' | 'Netlify' | 'Vercel';
  badgeColor: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  features: string[];
  previewTheme: {
    accent: string;
    bgGradient: string;
  };
}

const deployedApps: DeployedProject[] = [
  {
    id: 'supportdesk',
    name: 'SupportDesk',
    category: 'AI Support Operations & Escalation',
    tagline: 'Intelligent support operations reducing MTTR through automated root-cause diagnostics.',
    description: 'Autonomous support platform designed for modern engineering teams. Automatically analyzes incoming customer tickets, gathers multi-turn context, triggers rotated LLM diagnostics (Gemini + Groq), and structures engineering escalation reports with full audit logs.',
    liveUrl: 'https://supportdesk-frontend-ecgs.onrender.com/',
    githubUrl: 'https://github.com/nitin-code6/SupportDesk',
    platform: 'Render',
    badgeColor: '#10b981',
    metrics: [
      { label: 'Test Suite', value: '22 PyTest Passed' },
      { label: 'Architecture', value: 'FastAPI + React 18' },
      { label: 'AI Engine', value: 'Rotated Groq & Gemini' }
    ],
    techStack: ['FastAPI', 'React 18', 'TypeScript', 'Tailwind CSS', 'Docker', 'Gemini AI', 'Groq API'],
    features: [
      'Automated triage & sentiment classification',
      'One-click engineering escalation summaries',
      'Context-aware suggestion engine for support agents'
    ],
    previewTheme: {
      accent: '#06b6d4',
      bgGradient: 'radial-gradient(ellipse at 80% 20%, rgba(6, 182, 212, 0.25) 0%, rgba(15, 23, 42, 0.95) 70%)'
    }
  },
  {
    id: 'reelfinder',
    name: 'ReelFinder AI',
    category: 'Applied AI & Screenplay Analytics',
    tagline: 'Automated 20–60s viral moment discovery and scene ranker for microdramas.',
    description: 'AI-driven screenplay comprehension pipeline. Parses multi-episode screenplays, extracts narrative tension curves, and identifies high-converting promotional clips (cliffhangers, dramatic twists, strong hooks) with exact episode references and timestamps for social marketing teams.',
    liveUrl: 'https://reelfinder-frontend.onrender.com/',
    githubUrl: 'https://github.com/nitin-code6/reelfinder-ai',
    platform: 'Render',
    badgeColor: '#8b5cf6',
    metrics: [
      { label: 'Unit & E2E Tests', value: '86 Passing' },
      { label: 'Data Store', value: 'PostgreSQL + SQLAlchemy' },
      { label: 'Processing', value: 'FastAPI Microservice' }
    ],
    techStack: ['Python', 'FastAPI', 'React 19', 'PostgreSQL', 'Tailwind', 'LLMs', 'NLP'],
    features: [
      'Algorithmic virality & cliffhanger scoring',
      'Precise timestamped social media cut lists',
      'Multi-episode batch ingestion with structured metadata'
    ],
    previewTheme: {
      accent: '#a855f7',
      bgGradient: 'radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.25) 0%, rgba(15, 23, 42, 0.95) 70%)'
    }
  },
  {
    id: 'ferryflow',
    name: 'FerryFlow',
    category: 'Real-Time Logistics & Fleet Management',
    tagline: 'Operational passenger booking and live ferry fleet telemetry system.',
    description: 'End-to-end maritime logistics system in active deployment. Features distinct synchronized interfaces for passengers, vessel captains, and port ticketing administrators. Manages live seat availability, dynamic ticketing, and real-time status updates via WebSocket channels.',
    liveUrl: 'https://ferryflow.netlify.app/',
    githubUrl: 'https://github.com/nitin-code6/ferryflow',
    platform: 'Netlify',
    badgeColor: '#38bdf8',
    metrics: [
      { label: 'Real-Time Sync', value: 'Socket.IO Engine' },
      { label: 'Concurrency', value: 'Redis State Store' },
      { label: 'Deployment', value: 'Active Netlify PaaS' }
    ],
    techStack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Redis'],
    features: [
      'Live vessel position & schedule broadcast',
      'Zero-collision seat booking concurrency control',
      'Multi-role administrative portal (Admin / Staff / Passenger)'
    ],
    previewTheme: {
      accent: '#38bdf8',
      bgGradient: 'radial-gradient(ellipse at 80% 20%, rgba(56, 189, 248, 0.25) 0%, rgba(15, 23, 42, 0.95) 70%)'
    }
  },
  {
    id: 'cpulab',
    name: 'CPU Scheduler (CPULab)',
    category: 'Systems & OS Visualizer',
    tagline: 'Interactive CPU scheduling simulator with dynamic real-time Gantt charts.',
    description: 'Systems visualization platform that makes complex operating system process management crystal clear. Simulates and contrasts Round Robin (preemptive), Shortest Job First (SJF), and First-Come-First-Served (FCFS) algorithms with real-time process state transitions and statistical turnaround/waiting times.',
    liveUrl: 'https://cpulab.vercel.app/',
    githubUrl: 'https://github.com/nitin-code6/OS-VISUALIZER',
    platform: 'Vercel',
    badgeColor: '#f59e0b',
    metrics: [
      { label: 'Algorithms', value: 'Round Robin, SJF, FCFS' },
      { label: 'Visualization', value: 'Real-Time SVG Gantt' },
      { label: 'Performance', value: '100% Client-Side 60fps' }
    ],
    techStack: ['JavaScript', 'HTML5 Canvas/SVG', 'CSS Modules', 'Vercel'],
    features: [
      'Configurable time quantum & arrival bursts',
      'Comparative average waiting & turnaround time analysis',
      'Step-by-step interactive algorithm debugger'
    ],
    previewTheme: {
      accent: '#f59e0b',
      bgGradient: 'radial-gradient(ellipse at 80% 20%, rgba(245, 158, 11, 0.25) 0%, rgba(15, 23, 42, 0.95) 70%)'
    }
  }
];

export default function Showcase3D() {
  const [activeTab, setActiveTab] = useState<string>(deployedApps[0].id);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const activeApp = deployedApps.find((app) => app.id === activeTab) || deployedApps[0];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 8;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <section id="showcase" className={`section ${styles.showcaseSection}`}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.pillBadge}>
            <Sparkles size={14} className={styles.sparkleIcon} />
            <span>Interactive 3D Deployment Showcase</span>
          </div>
          <h2 className={styles.title}>
            Live Production <span className="text-gradient">Deployments</span>
          </h2>
          <p className={styles.subtitle}>
            Explore my deployed web applications. Hover and tilt to inspect telemetry and live endpoints.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabBar}>
          {deployedApps.map((app) => {
            const isActive = app.id === activeTab;
            return (
              <button
                key={app.id}
                onClick={() => setActiveTab(app.id)}
                className={`${styles.tabBtn} ${isActive ? styles.tabActive : ''}`}
              >
                <span className={styles.statusDot} style={{ background: app.badgeColor }}></span>
                <span className={styles.tabName}>{app.name}</span>
                <span className={styles.tabPlatform}>{app.platform}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Viewport Showcase Card */}
        <div 
          className={styles.perspectiveWrapper}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={cardRef}
            className={styles.mockup3D}
            animate={{
              rotateX: rotateX,
              rotateY: rotateY
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 25 }}
            style={{
              background: activeApp.previewTheme.bgGradient
            }}
          >
            {/* Dynamic Specular Glare */}
            <div 
              className={styles.specularGlare}
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.16) 0%, transparent 60%)`
              }}
            />

            {/* Browser Top Bar */}
            <div className={styles.browserBar}>
              <div className={styles.trafficLights}>
                <span className={styles.lightRed}></span>
                <span className={styles.lightYellow}></span>
                <span className={styles.lightGreen}></span>
              </div>
              <div className={styles.urlBar}>
                <ShieldCheck size={14} className={styles.sslIcon} />
                <span className={styles.urlText}>{activeApp.liveUrl}</span>
              </div>
              <div className={styles.liveTag}>
                <span className={styles.pulseDot}></span>
                <span>LIVE</span>
              </div>
            </div>

            {/* Content Display Area with Animated Switch */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeApp.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className={styles.cardContent}
              >
                <div className={styles.infoCol}>
                  <div className={styles.badgeRow}>
                    <span className={styles.categoryBadge} style={{ color: activeApp.previewTheme.accent, borderColor: `${activeApp.previewTheme.accent}40` }}>
                      {activeApp.category}
                    </span>
                    <span className={styles.platformBadge}>
                      Deployed on {activeApp.platform}
                    </span>
                  </div>

                  <h3 className={styles.appName}>{activeApp.name}</h3>
                  <p className={styles.tagline}>{activeApp.tagline}</p>
                  <p className={styles.description}>{activeApp.description}</p>

                  {/* Key Features */}
                  <div className={styles.featuresBlock}>
                    <span className={styles.featureLabel}>Engineered Highlights:</span>
                    <ul className={styles.featureList}>
                      {activeApp.features.map((feat, idx) => (
                        <li key={idx}>
                          <span className={styles.checkIcon}>✓</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className={styles.techList}>
                    {activeApp.techStack.map((tech, idx) => (
                      <span key={idx} className={styles.techPill}>{tech}</span>
                    ))}
                  </div>

                  {/* Call-to-Action Buttons */}
                  <div className={styles.actionButtons}>
                    <a
                      href={activeApp.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-primary ${styles.launchBtn}`}
                    >
                      <Play size={15} fill="currentColor" /> Open Live Application
                      <ArrowUpRight size={14} />
                    </a>
                    <a
                      href={activeApp.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                    >
                      <FaGithub size={17} /> Source Code
                    </a>
                  </div>
                </div>

                {/* Metrics & Architecture Telemetry Visual */}
                <div className={styles.previewCol}>
                  <div className={styles.telemetryCard}>
                    <div className={styles.telemetryHeader}>
                      <Activity size={18} style={{ color: activeApp.previewTheme.accent }} />
                      <span>Production Architecture Telemetry</span>
                    </div>

                    <div className={styles.metricsGrid}>
                      {activeApp.metrics.map((m, idx) => (
                        <div key={idx} className={styles.metricItem}>
                          <span className={styles.metricLabel}>{m.label}</span>
                          <span className={styles.metricValue} style={{ color: activeApp.previewTheme.accent }}>
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.interactiveBox}>
                      <div className={styles.boxHeader}>
                        <Terminal size={14} />
                        <span>Live Health Status</span>
                      </div>
                      <pre className={styles.terminalOutput}>
                        <code>
{`> GET ${activeApp.liveUrl}
> HTTP/2 200 OK
> SSL: TLS_AES_256_GCM_SHA384
> STATUS: HEALTHY (Latency < 75ms)
> SERVICE: OPERATIONAL`}
                        </code>
                      </pre>
                    </div>

                    <div className={styles.tiltNotice}>
                      <Layers size={13} />
                      <span>Hover & tilt mouse to adjust 3D angle</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
