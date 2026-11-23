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
  SiCplusplus 
} from 'react-icons/si';
import styles from './TechLogosStrip.module.css';

const techLogos = [
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'React (MERN)', icon: SiReact, color: '#61dafb' },
  { name: 'Express', icon: SiExpress, color: '#ffffff' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
  { name: 'Kafka', icon: SiApachekafka, color: '#231f20' },
  { name: 'Redis', icon: SiRedis, color: '#dc382d' },
  { name: 'Docker', icon: SiDocker, color: '#2496ed' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Python', icon: SiPython, color: '#3776ab' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'C++', icon: SiCplusplus, color: '#00599c' },
];

export default function TechLogosStrip() {
  return (
    <div className={styles.stripSection} aria-label="Core Technology Stack">
      <div className="container">
        <div className={styles.wrapper}>
          <span className={styles.stripLabel}>Core Stack:</span>
          <div className={styles.logosRow}>
            {techLogos.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={idx} className={styles.logoItem} title={tech.name}>
                  <Icon size={18} className={styles.logoIcon} />
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
