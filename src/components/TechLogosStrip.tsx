'use client';
import { 
  SiCplusplus, 
  SiPython, 
  SiApachekafka, 
  SiRedis, 
  SiFastapi, 
  SiDocker, 
  SiPostgresql, 
  SiPytorch, 
  SiNextdotjs,
  SiTypescript
} from 'react-icons/si';
import styles from './TechLogosStrip.module.css';

const techLogos = [
  { name: 'C++20', icon: SiCplusplus, color: '#00599c' },
  { name: 'Python', icon: SiPython, color: '#3776ab' },
  { name: 'Kafka', icon: SiApachekafka, color: '#231f20' },
  { name: 'Redis', icon: SiRedis, color: '#dc382d' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Docker', icon: SiDocker, color: '#2496ed' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1' },
  { name: 'PyTorch', icon: SiPytorch, color: '#ee4c2c' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
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
