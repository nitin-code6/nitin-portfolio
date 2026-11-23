'use client';
import { 
  Sparkles, 
  Cpu, 
  Brain, 
  Database, 
  Server, 
  Layers, 
  Zap, 
  Code2, 
  Flame,
  ShieldCheck,
  LucideIcon
} from 'lucide-react';
import styles from './SkillsMarquee.module.css';

interface SkillPill {
  name: string;
  category: string;
  icon: LucideIcon;
  color: string;
}

const skillsRow1: SkillPill[] = [
  { name: 'RAG Pipelines & Vector Search', category: 'GenAI', icon: Brain, color: '#38bdf8' },
  { name: 'Agentic AI & FastMCP Protocols', category: 'AI Systems', icon: Sparkles, color: '#818cf8' },
  { name: 'Apache Kafka & BullMQ Streams', category: 'Messaging', icon: Zap, color: '#f59e0b' },
  { name: 'C++ B+ Tree Storage Engines', category: 'Systems', icon: Database, color: '#10b981' },
  { name: 'PyTorch & LSTM-VAE Telemetry', category: 'ML', icon: Flame, color: '#ef4444' },
  { name: 'FastAPI Microservices & Docker', category: 'Backend', icon: Server, color: '#06b6d4' },
  { name: 'Distributed Queue Architecture', category: 'Architecture', icon: Layers, color: '#a855f7' }
];

const skillsRow2: SkillPill[] = [
  { name: '700+ DSA Problems Solved', category: 'Algorithms', icon: Code2, color: '#f97316' },
  { name: 'Next.js 16 & React 19 Architecture', category: 'Frontend', icon: Layers, color: '#38bdf8' },
  { name: 'Real-Time WebSockets & SSE', category: 'Streaming', icon: Zap, color: '#10b981' },
  { name: 'Low-Level Design (SOLID & Patterns)', category: 'Design', icon: Cpu, color: '#818cf8' },
  { name: 'Redis Cache & Concurrency Control', category: 'Performance', icon: ShieldCheck, color: '#ef4444' },
  { name: 'PostgreSQL & Vector Databases', category: 'Storage', icon: Database, color: '#0ea5e9' },
  { name: 'NIT Calicut Engineering', category: 'Academics', icon: Sparkles, color: '#ec4899' }
];

export default function SkillsMarquee() {
  return (
    <div className={styles.marqueeSection}>
      <div className={styles.glowOverlayLeft}></div>
      <div className={styles.glowOverlayRight}></div>

      {/* Row 1: Left to Right infinite scroll */}
      <div className={styles.trackWrapper}>
        <div className={`${styles.track} ${styles.scrollLeft}`}>
          {[...skillsRow1, ...skillsRow1, ...skillsRow1].map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <div key={idx} className={styles.skillCard}>
                <div className={styles.iconBox} style={{ color: skill.color, borderColor: `${skill.color}35`, background: `${skill.color}15` }}>
                  <Icon size={15} />
                </div>
                <div className={styles.textWrap}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillCategory}>{skill.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Right to Left infinite scroll */}
      <div className={styles.trackWrapper} style={{ marginTop: '0.85rem' }}>
        <div className={`${styles.track} ${styles.scrollRight}`}>
          {[...skillsRow2, ...skillsRow2, ...skillsRow2].map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <div key={idx} className={styles.skillCard}>
                <div className={styles.iconBox} style={{ color: skill.color, borderColor: `${skill.color}35`, background: `${skill.color}15` }}>
                  <Icon size={15} />
                </div>
                <div className={styles.textWrap}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillCategory}>{skill.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
