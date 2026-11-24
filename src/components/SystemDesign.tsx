'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Cpu, Database, ArrowRight, CheckCircle2, AlertTriangle, Layers, Server, ShieldAlert } from 'lucide-react';
import styles from './SystemDesign.module.css';

interface ArchitectureFlowStep {
  name: string;
  role: string;
  detail: string;
  tech: string;
  invariant: string;
}

interface SystemArchitecture {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: 'network' | 'ai' | 'database';
  problemStatement: string;
  highLevelArchitecture: string;
  flowSteps: ArchitectureFlowStep[];
  engineeringTradeoffs: {
    decision: string;
    reason: string;
    alternativeRejected: string;
  }[];
  resilienceMechanisms: string[];
}

const systems: SystemArchitecture[] = [
  {
    id: 'codearena',
    title: 'CodeArena: Distributed Asynchronous Online Judge',
    subtitle: 'Event-driven evaluation engine processing concurrent untrusted code submissions.',
    badge: 'Distributed Systems & Queues',
    icon: 'network',
    problemStatement: 'Directly running untrusted code on a web server blocks the event loop, introduces arbitrary code execution vulnerabilities, and causes catastrophic denial of service under concurrent user submissions.',
    highLevelArchitecture: 'A distributed producer-consumer architecture. The API Gateway acts as a non-blocking queue producer. Submissions are pushed to Redis-backed BullMQ queues and dispatched across isolated sandboxed worker containers, while evaluation verdicts stream back over Server-Sent Events (SSE).',
    flowSteps: [
      {
        name: '1. API Gateway',
        role: 'Ingestion & Validation',
        detail: 'Validates source code, checks rate limits, and creates a submission record in MongoDB with status PENDING.',
        tech: 'Express.js / Node.js',
        invariant: 'Non-blocking I/O; returns 202 Accepted in < 15ms'
      },
      {
        name: '2. BullMQ Queue',
        role: 'Job Buffering & Priority',
        detail: 'Serializes execution payload into Redis. Enforces FIFO queueing with concurrency limits per worker to prevent CPU starvation.',
        tech: 'BullMQ + Redis',
        invariant: 'At-least-once job delivery with exponential backoff'
      },
      {
        name: '3. Worker Sandboxes',
        role: 'Isolated Execution',
        detail: 'Dispatches payload to isolated Judge0 Docker containers with strict cgroup limits: 256MB RAM, 2s CPU timeout, and disabled socket networking.',
        tech: 'Judge0 / Docker Cgroups',
        invariant: 'Zero host compromise; hard timeouts on infinite loops'
      },
      {
        name: '4. Kafka Event Stream',
        role: 'Verdict Publishing',
        detail: 'Execution metrics (wall time, memory consumed, standard out/error) are emitted into the submission-verdicts Kafka topic for analytics and persistence.',
        tech: 'Apache Kafka',
        invariant: 'Immutable audit log of all evaluation runs'
      },
      {
        name: '5. SSE Dispatcher',
        role: 'Real-Time Client Streaming',
        detail: 'Streams live status transitions (QUEUED -> RUNNING -> ACCEPTED/WRONG_ANSWER) directly into the browser over a persistent SSE connection.',
        tech: 'Server-Sent Events',
        invariant: 'Zero polling overhead; real-time feedback'
      }
    ],
    engineeringTradeoffs: [
      {
        decision: 'Server-Sent Events (SSE) over WebSockets',
        reason: 'Client-bound unidirectional telemetry is simpler, traverses firewalls without proxy issues, and reconnects automatically natively.',
        alternativeRejected: 'Full duplex WebSockets (unnecessary protocol overhead for evaluation updates)'
      },
      {
        decision: 'BullMQ + Redis over Direct Execution',
        reason: 'Prevents CPU saturation and drops submission spikes during live coding contests without failing incoming HTTP requests.',
        alternativeRejected: 'In-memory process spawns (crashes host on memory spikes)'
      }
    ],
    resilienceMechanisms: [
      'Dead-letter queues (DLQ) for malformed compiler outputs',
      'Process timeout kills with SIGKILL after 2.5 seconds',
      'Automatic fallback to polling if client disconnects SSE'
    ]
  },
  {
    id: 'batterylife',
    title: 'BatteryLife-AI: Deep Learning EV Battery Telemetry',
    subtitle: 'LSTM-VAE pipeline for degradation forecasting, SOH estimation, and anomaly detection.',
    badge: 'Applied AI & Temporal ML',
    icon: 'ai',
    problemStatement: 'Lithium-ion battery degradation is non-linear and sensitive to ambient thermal fluctuations and discharge spikes. Standard rule-based BMS systems fail to detect early internal cell resistance drift before critical failures.',
    highLevelArchitecture: 'A deep generative sequence pipeline. Time-series battery telemetry is windowed and passed through a Bidirectional LSTM-VAE network. The model maps multi-parameter curves into a regularized latent space, estimating State of Health (SOH) and detecting micro-anomalies through reconstruction error.',
    flowSteps: [
      {
        name: '1. BMS Telemetry Stream',
        role: 'High-Frequency Ingestion',
        detail: 'Collects voltage, current, cell temperatures, and discharge rates sampled across continuous drive cycles.',
        tech: 'TypeScript / REST Telemetry',
        invariant: 'Raw sensor readings cleaned & outlier-clipped'
      },
      {
        name: '2. Sliding Window Extractor',
        role: 'Temporal Normalization',
        detail: 'Transforms sequential sensor readings into overlapping sliding windows (T=64 time steps) normalized via rolling z-scores.',
        tech: 'NumPy / Pandas Pipelines',
        invariant: 'Uniform feature vectors preserving charge dynamics'
      },
      {
        name: '3. LSTM-VAE Network',
        role: 'Latent Space Modeling',
        detail: 'Bi-LSTM encoder compresses input into variational mean (μ) and log-variance (σ). The decoder reconstructs expected normal degradation.',
        tech: 'PyTorch / LSTM-VAE',
        invariant: 'Continuous latent manifold regularized with KL-Divergence'
      },
      {
        name: '4. Anomaly Thresholding',
        role: 'Early Fault Discovery',
        detail: 'Computes Mean Squared Error (MSE) between actual and reconstructed cycles. Spikes above dynamic 3σ threshold trigger thermal run-away warnings.',
        tech: 'Statistical Inference',
        invariant: 'Unsupervised anomaly detection without labeled fault data'
      },
      {
        name: '5. SOH & RUL Prognostics',
        role: 'Remaining Useful Life',
        detail: 'Fits latent decay trajectory against exponential capacity degradation to predict cycles remaining before battery hits 80% capacity threshold.',
        tech: 'Analytical Curve Modeling',
        invariant: 'Predictive maintenance alert issued weeks in advance'
      }
    ],
    engineeringTradeoffs: [
      {
        decision: 'Variational Autoencoder (VAE) over Classical Regression',
        reason: 'VAE handles multi-modal sensor noise and provides probabilistic uncertainty bounds on battery health rather than a brittle point estimate.',
        alternativeRejected: 'Linear Regression / Static Coulomb Counting (drifts heavily with temperature)'
      },
      {
        decision: 'Synthetic Aging Trajectories',
        reason: 'Enables model training across millions of simulated battery lifecycles when physical multi-year physical test data is scarce.',
        alternativeRejected: 'Waiting for 5+ years of live laboratory cell degradation'
      }
    ],
    resilienceMechanisms: [
      'Sliding sensor validation to reject noisy thermocouple drops',
      'Confidence score metrics on every RUL forecast',
      'Dynamic threshold recalibration based on ambient climate'
    ]
  },
  {
    id: 'novadb',
    title: 'NovaDB: Relational Storage Engine Internals (C++)',
    subtitle: 'From-scratch disk storage manager with B+ Tree indexing and buffer pool paging.',
    badge: 'Core Systems Programming',
    icon: 'database',
    problemStatement: 'Standard in-memory hash tables lose all data on crash and cannot scale beyond RAM. Designing a disk-backed storage engine requires handling raw 4KB page alignment, dirty write-back, and logarithmic index search without memory leaks.',
    highLevelArchitecture: 'A layered storage system built in C++. Block-level storage manages paged files on disk. A Buffer Pool Manager coordinates an in-memory frame cache with LRU eviction. A disk-backed B+ Tree maintains index ordering with automatic node splitting and merging.',
    flowSteps: [
      {
        name: '1. Query / Key Evaluator',
        role: 'Execution Layer',
        detail: 'Receives key-value lookup, range scan, or insertion commands and delegates to the B+ Tree index interface.',
        tech: 'C++ Modern OOP',
        invariant: 'Clean abstraction decoupling storage from query evaluation'
      },
      {
        name: '2. B+ Tree Index Layer',
        role: 'Logarithmic Indexing',
        detail: 'Navigates internal index nodes to locate target leaf node. Handles split operations when a leaf overflows capacity and borrow/merge on underflow.',
        tech: 'C++ Templated B+ Tree',
        invariant: 'Logarithmic search O(log_B N); all leaf nodes sequentially linked'
      },
      {
        name: '3. Buffer Pool Manager',
        role: 'Page Frame Caching',
        detail: 'Maintains an in-memory pool of disk pages. Pins active pages to prevent eviction and implements Clock / LRU replacement for unpinned frames.',
        tech: 'C++ Memory Paging',
        invariant: 'Disk reads avoided on cached hot pages; pin-count safety'
      },
      {
        name: '4. Disk Storage Manager',
        role: 'Block-Level Disk I/O',
        detail: 'Allocates and reads/writes 4096-byte pages directly to binary database files using posix/win32 raw file offsets.',
        tech: 'Low-Level Binary File I/O',
        invariant: '4KB hardware sector alignment for atomic page writes'
      }
    ],
    engineeringTradeoffs: [
      {
        decision: 'B+ Tree over B-Tree',
        reason: 'Storing records strictly in leaf nodes maximizes fan-out in internal nodes (fewer disk seeks) and allows high-speed sequential range scans.',
        alternativeRejected: 'B-Tree (stores keys in internal nodes, hurting fan-out and range scans)'
      },
      {
        decision: 'Buffer Pool Pinning over Direct mmap',
        reason: 'Gives explicit control over dirty page flush ordering and write-ahead synchronization, which OS mmap cannot guarantee reliably.',
        alternativeRejected: 'mmap file mapping (uncontrolled OS paging spikes)'
      }
    ],
    resilienceMechanisms: [
      'Dirty page tracking with explicit disk sync on eviction',
      'Pin-count guards preventing eviction of active traversal pages',
      'Strict 4KB binary serialization invariants'
    ]
  }
];

export default function SystemDesign() {
  const [selectedSys, setSelectedSys] = useState<string>(systems[0].id);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [cardTilt, setCardTilt] = useState({ rotX: 0, rotY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardTilt({
      rotX: -(y / (rect.height / 2)) * 2,
      rotY: (x / (rect.width / 2)) * 2
    });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rotX: 0, rotY: 0 });
  };

  const activeSystem = systems.find((s) => s.id === selectedSys) || systems[0];

  return (
    <section id="system-design" className={`section ${styles.systemSection}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.sectionBadge}>
            <Network size={14} className={styles.badgeIcon} />
            <span>Architecture &amp; System Design</span>
          </div>
          <h2 className={styles.title}>
            Engineering Depth &amp; <span className="text-gradient">Systems Architecture</span>
          </h2>
          <p className={styles.subtitle}>
            Production-grade distributed pipelines, asynchronous queues, and database engine internals designed from first principles.
          </p>
        </div>

        {/* System Selector Tabs */}
        <div className={styles.systemTabs}>
          {systems.map((sys) => {
            const isSelected = sys.id === selectedSys;
            return (
              <button
                key={sys.id}
                onClick={() => {
                  setSelectedSys(sys.id);
                  setActiveStep(0);
                }}
                className={`${styles.sysTabBtn} ${isSelected ? styles.sysTabActive : ''}`}
              >
                <div className={styles.tabIconWrapper}>
                  {sys.icon === 'network' && <Network size={18} />}
                  {sys.icon === 'ai' && <Cpu size={18} />}
                  {sys.icon === 'database' && <Database size={18} />}
                </div>
                <div className={styles.tabTextCol}>
                  <div className={styles.tabHeadingRow}>
                    <span className={styles.tabHeading}>{sys.title.split(':')[0]}</span>
                    {isSelected && <span className={styles.activeLedDot} />}
                  </div>
                  <span className={styles.tabBadge}>{sys.badge}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3D Interactive System Design Blueprint Card */}
        <div 
          ref={cardRef}
          className={styles.blueprintCard}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={{
            transform: `perspective(1200px) rotateX(${cardTilt.rotX}deg) rotateY(${cardTilt.rotY}deg)`
          }}
        >
          {/* Top Bar: Problem Statement & Summary */}
          <div className={styles.problemBanner}>
            <div className={styles.problemCol}>
              <div className={styles.cardHeaderBadge}>
                <AlertTriangle size={14} className={styles.alertIcon} />
                <span className={styles.problemBadgeLabel}>The Engineering Problem</span>
              </div>
              <p className={styles.problemText}>{activeSystem.problemStatement}</p>
            </div>
            <div className={styles.solutionCol}>
              <div className={styles.cardHeaderBadge}>
                <CheckCircle2 size={14} className={styles.checkIcon} />
                <span className={styles.solutionBadgeLabel}>Architectural Solution</span>
              </div>
              <p className={styles.solutionText}>{activeSystem.highLevelArchitecture}</p>
            </div>
          </div>

          {/* Interactive Pipeline Steps */}
          <div className={styles.pipelineArea}>
            <div className={styles.pipelineHeader}>
              <span className={styles.pipelineTitle}>
                <Layers size={16} /> End-to-End Data Flow Pipeline (Click steps to inspect)
              </span>
              <span className={styles.stepCounter}>
                Step {activeStep + 1} of {activeSystem.flowSteps.length}
              </span>
            </div>

            {/* Step Bubbles Flow */}
            <div className={styles.flowTrack}>
              {activeSystem.flowSteps.map((step, idx) => {
                const isCurrent = idx === activeStep;
                return (
                  <div key={idx} className={styles.stepNodeContainer}>
                    <button
                      onClick={() => setActiveStep(idx)}
                      className={`${styles.stepNode} ${isCurrent ? styles.stepNodeActive : ''}`}
                    >
                      <div className={styles.stepNodeHeader}>
                        <span className={styles.stepNumber}>Step {idx + 1}</span>
                        {isCurrent && <span className={styles.activeDot} />}
                      </div>
                      <span className={styles.stepNodeTitle}>{step.name.split('. ')[1] || step.name}</span>
                      <span className={styles.stepTechMini}>{step.tech.split(' / ')[0]}</span>
                      <span className={styles.stepRole}>{step.role}</span>
                    </button>
                    {idx < activeSystem.flowSteps.length - 1 && (
                      <div className={styles.flowArrow}>
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Active Step Deep-Dive Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSystem.id}-${activeStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={styles.stepDetailCard}
              >
                <div className={styles.stepDetailTop}>
                  <div>
                    <span className={styles.stepTechBadge}>{activeSystem.flowSteps[activeStep].tech}</span>
                    <h4 className={styles.stepDetailName}>
                      {activeSystem.flowSteps[activeStep].name} — {activeSystem.flowSteps[activeStep].role}
                    </h4>
                  </div>
                  <div className={styles.invariantBox}>
                    <div className={styles.invariantHeader}>
                      <ShieldAlert size={14} className={styles.invariantIcon} />
                      <span className={styles.invariantLabel}>Critical Invariant</span>
                    </div>
                    <span className={styles.invariantText}>{activeSystem.flowSteps[activeStep].invariant}</span>
                  </div>
                </div>
                <p className={styles.stepDetailDesc}>
                  {activeSystem.flowSteps[activeStep].detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Grid: Engineering Tradeoffs & Resilience */}
          <div className={styles.tradeoffGrid}>
            <div className={styles.tradeoffCol}>
              <h4 className={styles.colHeader}>
                <Server size={16} /> Key Engineering Tradeoffs
              </h4>
              <div className={styles.tradeoffList}>
                {activeSystem.engineeringTradeoffs.map((item, idx) => (
                  <div key={idx} className={styles.tradeoffItem}>
                    <div className={styles.tradeoffDecision}>
                      <span className={styles.decisionLabel}>Decision:</span> {item.decision}
                    </div>
                    <div className={styles.tradeoffReason}>
                      <span className={styles.reasonLabel}>Rationale:</span> {item.reason}
                    </div>
                    <div className={styles.tradeoffRejected}>
                      <span className={styles.rejectedBadge}>Evaluated &amp; Rejected</span>
                      <span className={styles.rejectedText}>{item.alternativeRejected}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.resilienceCol}>
              <h4 className={styles.colHeader}>
                <ShieldAlert size={16} /> Fault-Tolerance &amp; Resilience
              </h4>
              <ul className={styles.resilienceList}>
                {activeSystem.resilienceMechanisms.map((mech, idx) => (
                  <li key={idx} className={styles.resilienceItem}>
                    <CheckCircle2 size={16} className={styles.resilienceIcon} />
                    <span>{mech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
