'use client';
import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  Brain, 
  Zap, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { portfolioData, ProjectItem } from '@/data/portfolioData';
import styles from './UnifiedProjectsCarousel.module.css';

// 3D Perspective Tilt Card Wrapper
function ProjectCard3D({ 
  project, 
  isExpanded, 
  onToggleExpand 
}: { 
  project: ProjectItem; 
  isExpanded: boolean; 
  onToggleExpand: () => void;
}) {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRotX(-((y - rect.height / 2) / (rect.height / 2)) * 6);
    setRotY(((x - rect.width / 2) / (rect.width / 2)) * 8);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlare({ x: 50, y: 50 });
  };

  return (
    <div 
      className={styles.perspectiveContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        className={styles.projectCard}
        animate={{ rotateX: rotX, rotateY: rotY }}
        transition={{ type: 'spring', stiffness: 220, damping: 25 }}
      >
        {/* Dynamic Specular Glare */}
        <div 
          className={styles.cardGlare}
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.12) 0%, transparent 65%)`
          }}
        />

        {/* Card Header */}
        <div className={styles.cardHeader}>
          <div className={styles.metaRow}>
            <span className={styles.categoryBadge}>{project.role}</span>
            {project.verifiedBadge && (
              <span className={styles.verifiedBadge}>
                <ShieldCheck size={13} /> {project.verifiedBadge}
              </span>
            )}
          </div>

          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.tagline}>{project.tagline}</p>
        </div>

        {/* Measurable Outcome / Why it Matters */}
        <div className={styles.outcomeBox}>
          <span className={styles.outcomeLabel}>Why This Matters & Outcome:</span>
          <p className={styles.outcomeText}>{project.measurableOutcome}</p>
        </div>

        {/* Tech Chips */}
        <div className={styles.techList}>
          {project.tech.map((t, idx) => (
            <span key={idx} className={styles.techChip}>{t}</span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className={styles.cardActions}>
          <div className={styles.linkButtons}>
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`btn btn-primary ${styles.liveBtn}`}
              >
                <Play size={14} fill="currentColor" /> Live Demo <ExternalLink size={13} />
              </a>
            )}
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <FaGithub size={16} /> Code
            </a>
          </div>

          {/* Expand Deep Dive Toggle */}
          <button 
            onClick={onToggleExpand}
            className={styles.expandBtn}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Hide Architecture' : 'Problem & Solution'}</span>
            <ChevronDown 
              size={16} 
              style={{ 
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease' 
              }} 
            />
          </button>
        </div>

        {/* Expandable Engineering Depth Accordion */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={styles.deepDiveContainer}
            >
              <div className={styles.deepDiveContent}>
                <div className={styles.deepDiveSection}>
                  <span className={styles.deepDiveHeading}>
                    <AlertTriangle size={14} style={{ color: '#f59e0b' }} /> The Engineering Problem:
                  </span>
                  <p className={styles.deepDiveText}>{project.problem}</p>
                </div>

                <div className={styles.deepDiveSection}>
                  <span className={styles.deepDiveHeading}>
                    <Layers size={14} style={{ color: '#38bdf8' }} /> Architectural Pipeline:
                  </span>
                  <p className={styles.deepDiveText} dangerouslySetInnerHTML={{ __html: project.architecture }} />
                </div>

                <div className={styles.deepDiveSection}>
                  <span className={styles.deepDiveHeading}>
                    <CheckCircle2 size={14} style={{ color: '#10b981' }} /> Implementation & Tradeoffs:
                  </span>
                  <p className={styles.deepDiveText}>{project.solution}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function UnifiedProjectsCarousel() {
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'distributed' | 'systems'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  // Safe index constraint
  const activeIndex = Math.min(currentIndex, Math.max(0, filtered.length - 1));

  // Autoplay functionality with pause on hover
  useEffect(() => {
    if (isPaused || filtered.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filtered.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, filtered.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  };

  return (
    <section 
      id="projects" 
      className={`section ${styles.projectsSection}`} 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Featured Projects Carousel"
    >
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionPill}>
            <Layers size={14} />
            <span>Unified Engineering Showcase</span>
          </div>
          <h2 className={styles.title}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className={styles.subtitle}>
            A curated showcase of scalable backend architectures, full-stack MERN & AI deployments, and distributed systems.
          </p>

          {/* Category Filter Pills */}
          <div className={styles.filterBar} role="tablist">
            <button
              onClick={() => { setSelectedCategory('all'); setCurrentIndex(0); }}
              className={`${styles.filterBtn} ${selectedCategory === 'all' ? styles.filterActive : ''}`}
              role="tab"
              aria-selected={selectedCategory === 'all'}
            >
              <Layers size={14} /> All Works ({projects.length})
            </button>
            <button
              onClick={() => { setSelectedCategory('ai'); setCurrentIndex(0); }}
              className={`${styles.filterBtn} ${selectedCategory === 'ai' ? styles.filterActive : ''}`}
              role="tab"
              aria-selected={selectedCategory === 'ai'}
            >
              <Brain size={14} /> AI & LLMs (3)
            </button>
            <button
              onClick={() => { setSelectedCategory('distributed'); setCurrentIndex(0); }}
              className={`${styles.filterBtn} ${selectedCategory === 'distributed' ? styles.filterActive : ''}`}
              role="tab"
              aria-selected={selectedCategory === 'distributed'}
            >
              <Zap size={14} /> Distributed Queues (2)
            </button>
            <button
              onClick={() => { setSelectedCategory('systems'); setCurrentIndex(0); }}
              className={`${styles.filterBtn} ${selectedCategory === 'systems' ? styles.filterActive : ''}`}
              role="tab"
              aria-selected={selectedCategory === 'systems'}
            >
              <Cpu size={14} /> Systems in C++ (1)
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className={styles.carouselContainer}>
          {/* Controls Bar */}
          <div className={styles.carouselControls}>
            <div className={styles.progressCounter}>
              Project <span className={styles.activeNum}>0{activeIndex + 1}</span> of 0{filtered.length}
            </div>

            <div className={styles.navButtons}>
              <button 
                onClick={handlePrev}
                className={styles.arrowBtn}
                aria-label="Previous Project"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNext}
                className={styles.arrowBtn}
                aria-label="Next Project"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Active Card with Smooth Slide Reveal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${filtered[activeIndex]?.id || 0}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {filtered[activeIndex] && (
                <ProjectCard3D 
                  project={filtered[activeIndex]}
                  isExpanded={expandedId === filtered[activeIndex].id}
                  onToggleExpand={() => {
                    setExpandedId(expandedId === filtered[activeIndex].id ? null : filtered[activeIndex].id);
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Dot Indicators */}
          <div className={styles.dotIndicators}>
            {filtered.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
