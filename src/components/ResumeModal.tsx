'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, BarChart3, Download, ExternalLink, X, FileText } from 'lucide-react';
import styles from './ResumeModal.module.css';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.backdrop} onClick={onClose} role="presentation">
          <motion.div
            ref={modalRef}
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerIconWrapper}>
                <FileText size={20} className={styles.headerIcon} />
              </div>
              <div className={styles.headerText}>
                <h3 id="resume-modal-title" className={styles.title}>
                  Select Resume Version
                </h3>
                <p className={styles.subtitle}>
                  Choose the resume tailored to your team&apos;s role
                </p>
              </div>
              <button
                onClick={onClose}
                className={styles.closeBtn}
                aria-label="Close resume dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Options Grid */}
            <div className={styles.optionsList}>
              {/* Option 1: SDE / Systems */}
              <div className={styles.optionCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.roleIconWrapper}>
                    <Terminal size={20} className={styles.sdeIcon} />
                  </div>
                  <div className={styles.roleMeta}>
                    <div className={styles.roleTitleRow}>
                      <h4 className={styles.roleTitle}>Software Development Engineer</h4>
                      <span className={styles.roleBadgeSde}>SDE Track</span>
                    </div>
                    <p className={styles.roleDesc}>
                      Backend infrastructure, distributed event streaming (Kafka, BullMQ, Redis), C++ database engine, and 700+ DSA.
                    </p>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <a
                    href="/Resume/Nitin_Kumar_Resume_SDE_v2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewBtn}
                  >
                    <span>View PDF</span>
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href="/Resume/Nitin_Kumar_Resume_SDE_v2.pdf"
                    download="Nitin_Kumar_Resume_SDE.pdf"
                    className={styles.downloadBtn}
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </a>
                </div>
              </div>

              {/* Option 2: Data Analytics */}
              <div className={styles.optionCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.roleIconWrapper}>
                    <BarChart3 size={20} className={styles.analyticsIcon} />
                  </div>
                  <div className={styles.roleMeta}>
                    <div className={styles.roleTitleRow}>
                      <h4 className={styles.roleTitle}>Data Analytics &amp; ML</h4>
                      <span className={styles.roleBadgeAnalytics}>Analytics Track</span>
                    </div>
                    <p className={styles.roleDesc}>
                      Data processing pipelines, statistical modeling, Python (PyTorch, Pandas), SQL databases, and business metrics.
                    </p>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <a
                    href="/Resume/Nitin_Kumar_Resume_Analytics_v2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewBtn}
                  >
                    <span>View PDF</span>
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href="/Resume/Nitin_Kumar_Resume_Analytics_v2.pdf"
                    download="Nitin_Kumar_Resume_Analytics.pdf"
                    className={styles.downloadBtn}
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className={styles.modalFooter}>
              <span>All versions are verified and updated for 2026–2027 recruitment.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
