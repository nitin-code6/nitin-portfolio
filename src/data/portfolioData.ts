export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  category: 'ai' | 'distributed' | 'systems';
  tagline: string;
  whyItMatters: string;
  measurableOutcome: string;
  problem: string;
  architecture: string;
  solution: string;
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
  verifiedBadge?: string;
}

export interface SkillGroup {
  name: string;
  description: string;
  skills: string[];
}

export interface PortfolioData {
  hero: {
    name: string;
    role: string;
    pitch: string;
    statusBadge: string;
    location: string;
    socials: {
      github: string;
      linkedin: string;
      twitter: string;
      email: string;
    };
  };
  proofStrip: {
    label: string;
    value: string;
    detail: string;
    link?: string;
  }[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  about: {
    paragraphs: string[];
  };
  education: {
    degree: string;
    institution: string;
    period: string;
    grade: string;
    note: string;
  }[];
  experience: {
    role: string;
    organization: string;
    period: string;
    summary: string;
  }[];
}

export const portfolioData: PortfolioData = {
  hero: {
    name: "Nitin Kumar",
    role: "Backend & System Design Engineer | MERN Stack",
    pitch: "I architect high-concurrency backend systems, scalable MERN stack applications, and distributed event-driven pipelines with Node.js, Express, Kafka, and Redis.",
    statusBadge: "Open to 2027 roles",
    location: "NIT Calicut, India",
    socials: {
      github: "https://github.com/nitin-code6",
      linkedin: "https://www.linkedin.com/in/nitbit07/",
      twitter: "https://x.com/Nitin_5432",
      email: "mailto:nitbit710@gmail.com"
    }
  },
  proofStrip: [
    {
      label: "DSA Solved",
      value: "700+",
      detail: "LeetCode & GFG (1700+ Rating)",
      link: "https://github.com/nitin-code6"
    },
    {
      label: "Passing Tests",
      value: "108+",
      detail: "86 ReelFinder + 22 SupportDesk PyTests",
      link: "https://github.com/nitin-code6/reelfinder-ai"
    },
    {
      label: "Deployed Apps",
      value: "5+ Live",
      detail: "Render, Vercel & Netlify PaaS",
      link: "#projects"
    },
    {
      label: "System Design",
      value: "Event-Driven",
      detail: "Kafka, BullMQ & Node.js Microservices",
      link: "#system-design"
    }
  ],
  projects: [
    {
      id: "codearena",
      title: "CodeArena",
      role: "Distributed Online Judge",
      category: "distributed",
      tagline: "High-throughput asynchronous code execution engine with live SSE feedback.",
      whyItMatters: "Running untrusted compilation directly on the HTTP server thread blocks the event loop and risks host compromise under contest load.",
      measurableOutcome: "Offloads concurrent submissions to isolated Judge0 Docker worker sandboxes with 256MB RAM and 2s CPU cgroups; delivers live execution telemetry via Server-Sent Events.",
      problem: "Synchronous compiler executions block the main server thread, causing catastrophic request timeouts when multiple users submit code simultaneously.",
      architecture: "Client &rarr; API Gateway (Validation) &rarr; BullMQ + Redis Queue &rarr; Isolated Judge0 Worker Containers &rarr; Kafka Event Stream &rarr; SSE Real-Time Channel.",
      solution: "Decoupled submission ingestion from execution with a Redis-backed priority queue. Execution events publish to Kafka, streaming live verdict state transitions without client polling.",
      tech: ["Node.js", "Express", "Redis", "BullMQ", "Apache Kafka", "Judge0", "Docker", "SSE", "MongoDB"],
      githubUrl: "https://github.com/nitin-code6/CodeArena",
      verifiedBadge: "Queue + Kafka Pipeline"
    },
    {
      id: "batterylife-ai",
      title: "BatteryLife-AI",
      role: "Applied Deep Learning & Anomaly Platform",
      category: "ai",
      tagline: "EV battery health platform using LSTM-VAE for degradation modeling and RUL forecasting.",
      whyItMatters: "Lithium-ion cell decay is non-linear and sensitive to thermal shifts; simple Coulomb-counting drifts and misses internal resistance degradation.",
      measurableOutcome: "Processes multi-channel battery telemetry through a Bidirectional LSTM-VAE to estimate State of Health (SOH) and detect micro-anomalies through reconstruction error.",
      problem: "Physical battery degradation testing requires 3–5 years of real-world drive cycles, making real-time health estimation hard without synthetic sequence modeling.",
      architecture: "BMS Sensor Telemetry (Voltage, Current, Temp) &rarr; Sliding Window Normalizer &rarr; Bi-LSTM Variational Autoencoder &rarr; Dynamic 3σ Anomaly Thresholding &rarr; Remaining Useful Life (RUL) Curve Fitting.",
      solution: "Trained an LSTM-VAE to generate synthetic aging trajectories, map operational parameters into a smooth latent manifold, and identify anomalous battery cycles weeks before failure.",
      tech: ["TypeScript", "Python", "PyTorch", "LSTM-VAE", "Time-Series ML", "Data Pipelines"],
      githubUrl: "https://github.com/nitin-code6/BatteryLife-AI",
      verifiedBadge: "LSTM-VAE Telemetry"
    },
    {
      id: "novadb-engine",
      title: "NovaDB Engine",
      role: "Relational Storage Engine in C++",
      category: "systems",
      tagline: "From-scratch disk-backed database engine with B+ tree indexing and 4KB paging.",
      whyItMatters: "Understanding memory-to-disk hierarchies, cache eviction, and logarithmic tree balancing is the foundation of high-performance database engineering.",
      measurableOutcome: "Implements logarithmic key lookups O(log_B N), buffer pool LRU paging, and atomic 4KB sector-aligned binary block storage from first principles.",
      problem: "In-memory maps do not survive process crashes, and naive file appending causes unindexed O(N) scan bottlenecks on disk.",
      architecture: "Key Evaluator &rarr; Templated B+ Tree Index Layer (Node Split / Merge) &rarr; Buffer Pool Manager (LRU Page Frames) &rarr; Block-Level Disk Storage Manager (4KB Paged Files).",
      solution: "Engineered a layered C++ architecture with frame pinning to prevent eviction of active traversal paths and disk-backed B+ tree index pages for efficient range queries.",
      tech: ["C++20", "B+ Tree", "Buffer Pool", "Disk Storage", "Systems Programming"],
      githubUrl: "https://github.com/nitin-code6/novadb-engine",
      verifiedBadge: "C++ B+ Tree"
    },
    {
      id: "supportdesk",
      title: "SupportDesk",
      role: "AI Support Operations Platform",
      category: "ai",
      tagline: "Intelligent support triage and automated engineering escalation engine.",
      whyItMatters: "Engineers lose hours reviewing raw support tickets with missing reproduction steps, ambiguous logs, and manual context retrieval.",
      measurableOutcome: "22 passing PyTests; deployed live on Render with automated triage, root-cause diagnosis, and structured 1-click engineering escalations.",
      problem: "Unstructured customer tickets create communication friction between front-line support and core engineering teams, inflating MTTR.",
      architecture: "FastAPI Microservice Backend &rarr; Rotated Groq & Gemini LLM Pipeline &rarr; Automated Ticket Ingestion & Structured Escalation Generator &rarr; React 18 UI.",
      solution: "Engineered an intelligent triage pipeline that classifies ticket urgency, extracts reproducible context, and generates verified engineering summaries.",
      tech: ["FastAPI", "Python", "React 18", "TypeScript", "Tailwind CSS", "Docker", "Gemini AI", "Groq API"],
      liveUrl: "https://supportdesk-frontend-ecgs.onrender.com/",
      githubUrl: "https://github.com/nitin-code6/SupportDesk",
      verifiedBadge: "22 PyTests • Render Live"
    },
    {
      id: "reelfinder",
      title: "ReelFinder AI",
      role: "Screenplay Viral Moment Extraction",
      category: "ai",
      tagline: "AI screenplay analyzer ranking 20–60s viral hooks and climax timestamps.",
      whyItMatters: "Content teams manually parse hundreds of screenplay pages to identify promotional cuts for short-form social campaigns.",
      measurableOutcome: "86 passing unit & integration tests; deployed live on Render with automated narrative tension scoring and timestamped cut exports.",
      problem: "Locating high-engagement moments across multi-episode episodic screenplays requires significant manual editorial review.",
      architecture: "Screenplay Text Parser &rarr; Character & Entity Tracking &rarr; Narrative Tension & Cliffhanger Scorer &rarr; PostgreSQL Store &rarr; React 19 Frontend.",
      solution: "Built a screenplay analysis pipeline that parses scenes, identifies dramatic cliffhangers and twists, and outputs timestamped promo lists.",
      tech: ["Python", "FastAPI", "React 19", "PostgreSQL", "SQLAlchemy", "Tailwind", "LLMs"],
      liveUrl: "https://reelfinder-frontend.onrender.com/",
      githubUrl: "https://github.com/nitin-code6/reelfinder-ai",
      verifiedBadge: "86 Tests • Render Live"
    },
    {
      id: "ferryflow",
      title: "FerryFlow",
      role: "Real-Time Fleet & Logistics Engine",
      category: "distributed",
      tagline: "Operational ferry fleet passenger booking and real-time vessel telemetry.",
      whyItMatters: "Uncoordinated maritime ticketing causes terminal congestion, double-booking race conditions, and lack of live schedule visibility.",
      measurableOutcome: "Active production deployment on Netlify; coordinates live vessel locations, seat locks, and ticketing across staff and passenger roles.",
      problem: "Concurrent booking requests without atomic locking lead to seat overbooking on high-traffic commuter routes.",
      architecture: "React.js Client &rarr; Node.js/Express Backend &rarr; Redis State Cache &rarr; Socket.IO Real-Time Broadcast &rarr; MongoDB Storage.",
      solution: "Implemented WebSocket broadcasting for live boat telemetry and Redis-backed seat locking to guarantee conflict-free booking.",
      tech: ["React.js", "Node.js", "Express", "MongoDB", "Socket.IO", "Redis"],
      liveUrl: "https://ferryflow.netlify.app/",
      githubUrl: "https://github.com/nitin-code6/FerryFlow",
      verifiedBadge: "Socket.IO • Netlify Live"
    },
    {
      id: "cpulab",
      title: "CPU Scheduler (CPULab)",
      role: "OS Kernel Algorithm Simulator",
      category: "systems",
      tagline: "Interactive operating system CPU scheduling simulator with dynamic real-time Gantt charts.",
      whyItMatters: "Understanding low-level OS process scheduling, turnaround metrics, and context-switch latency is tough from textbook math alone.",
      measurableOutcome: "Deployed live on Vercel; visualizes Round Robin, Preemptive/Non-preemptive SJF, and FCFS with instant turnaround & waiting time telemetry.",
      problem: "Static formula calculations make it challenging to analyze how algorithmic starvation, burst time variance, and quantum sizes impact CPU utilization.",
      architecture: "Simulation Engine &rarr; Ready/Wait/Execute Queue Dispatcher &rarr; 60fps Dynamic SVG Gantt Renderer &rarr; Statistical Latency Analytics.",
      solution: "Engineered an interactive client-side simulation suite with step-by-step cycle tracking, quantum tuning, and comparative scheduling metrics.",
      tech: ["JavaScript", "React", "SVG Canvas", "OS Algorithms", "CSS Modules", "Vercel"],
      liveUrl: "https://cpulab.vercel.app/",
      githubUrl: "https://github.com/nitin-code6/OS-VISUALIZER",
      verifiedBadge: "OS Simulator • Vercel Live"
    }
  ],
  skills: [
    {
      name: "Backend Architecture & System Design",
      description: "Scalable microservices, asynchronous queues, and distributed system design (HLD/LLD)",
      skills: ["System Design (HLD & LLD)", "Node.js", "Express.js", "MERN Stack", "Apache Kafka", "Redis", "BullMQ", "Docker", "RESTful APIs", "Microservices", "Server-Sent Events (SSE)", "Socket.IO"]
    },
    {
      name: "Full-Stack & Languages",
      description: "Modern JavaScript/TypeScript ecosystem, Python, and compiled languages",
      skills: ["JavaScript (ES6+)", "TypeScript", "React.js", "MongoDB", "Python", "FastAPI", "C++20", "SQL", "Data Structures & Algorithms", "SOLID Principles", "OOP"]
    },
    {
      name: "Applied AI & RAG Engineering",
      description: "Production LLM workflows, sequence modeling, and agent protocols",
      skills: ["RAG Pipelines", "FastMCP", "LangChain", "Vector Embeddings", "PyTorch", "LSTM-VAE", "Prompt Engineering", "Rotated LLM APIs"]
    },
    {
      name: "Databases & Cloud Infrastructure",
      description: "Relational, document, and cache stores with deployment pipelines",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis Caching", "Linux CLI", "Git & GitHub", "Render PaaS", "Vercel", "Netlify", "PyTest", "CI/CD"]
    }
  ],
  about: {
    paragraphs: [
      "I am a final-year undergraduate at the National Institute of Technology, Calicut (NIT Calicut). Although my formal degree path began in Civil Engineering, my true passion lies in backend architecture, system design, and scalable software systems — a discipline I have pursued through thousands of hours of self-directed study, open-source development, and rigorous engineering practice.",
      "My work centers on high-concurrency backend engineering, system design, and practical full-stack solutions. I specialize in Node.js, the MERN stack, and distributed event-driven systems: message queues with BullMQ and Kafka, isolated container execution with Judge0, real-time telemetry over SSE/WebSockets, and test-driven API development.",
      "To date, I have solved 700+ Data Structures and Algorithms problems across LeetCode and GeeksForGeeks, built 5+ active production deployments, and authored test-driven backend systems with over 100 passing unit tests. I am actively seeking 2027 software engineering opportunities in backend infrastructure, system design, and applied AI."
    ]
  },
  education: [
    {
      degree: "B.Tech. Undergraduate (Final Year)",
      institution: "National Institute of Technology, Calicut (NIT Calicut)",
      period: "2023 — 2027",
      grade: "CGPA: 7.98",
      note: "Transitioning focus into Software Systems & Distributed Engineering through self-driven computer science coursework."
    },
    {
      degree: "Senior Secondary (12th) — BSEB",
      institution: "Inter College Pipra Nauranga",
      period: "2021 — 2022",
      grade: "90%",
      note: "Focus in Mathematics and Physics."
    }
  ],
  experience: [
    {
      role: "Web Development Intern",
      organization: "Unified Mentor",
      period: "2024",
      summary: "Contributed to full-stack web applications, focusing on the FerryFlow operations system. Handled frontend component architecture, backend API integrations, and real-time Socket.IO synchronization."
    }
  ]
};
