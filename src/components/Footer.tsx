import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className="text-gradient">Nitin Kumar</span>
            </Link>
            <p className={styles.bio}>
              Full-Stack Software Developer building scalable applications and systems-oriented projects.
            </p>
          </div>
          
          <div className={styles.socialLinks}>
            <a href="https://github.com/nitin-code6" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/nitbit07/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="https://x.com/Nitin_5432" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <FaTwitter size={20} />
            </a>
            <a href="mailto:nitbit710@gmail.com" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Nitin Kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
