'use client';
import { 
  SiNodedotjs,
  SiReact,
  SiExpress,
  SiMongodb,
  SiApachekafka, 
  SiRedis, 
  SiDocker, 
  SiTypescript,
  SiPython, 
  SiPostgresql, 
  SiFastapi, 
  SiNextdotjs,
  SiCplusplus,
  SiKubernetes
} from 'react-icons/si';
import styles from './TechLogosStrip.module.css';

const techLogos = [
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'React (MERN)', icon: SiReact, color: '#61dafb' },
  { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
  { name: 'Apache Kafka', icon: SiApachekafka, color: '#e0e7ff' },
  { name: 'Redis', icon: SiRedis, color: '#ef4444' },
  { name: 'Docker', icon: SiDocker, color: '#38bdf8' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326ce5' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#60a5fa' },
  { name: 'TypeScript', icon: SiTypescript, color: '#38bdf8' },
  { name: 'Python', icon: SiPython, color: '#fbbf24' },
  { name: 'FastAPI', icon: SiFastapi, color: '#34d399' },
  { name: 'C++20', icon: SiCplusplus, color: '#38bdf8' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
];

export default function TechLogosStrip() {
  const extendedLogos = [...techLogos, ...techLogos];

  return (
    <div className={styles.stripSection} aria-label="Core Technology Stack">
      <div className={styles.streamContainer}>
        <div className={styles.labelCol}>
          <span className={styles.pulseDot} />
          <span className={styles.stripLabel}>Core Stack</span>
        </div>

        <div className={styles.marqueeTrack}>
          <div className={styles.trackContent}>
            {extendedLogos.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={idx} className={styles.logoItem} title={tech.name}>
                  <Icon size={16} className={styles.logoIcon} style={{ color: tech.color }} />
                  <span className={styles.logoName}>{tech.name}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.trackContent} aria-hidden="true">
            {extendedLogos.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={idx} className={styles.logoItem} title={tech.name}>
                  <Icon size={16} className={styles.logoIcon} style={{ color: tech.color }} />
                  <span className={styles.logoName}>{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
