'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please reach out directly via email.');
    }
  };

  return (
    <section id="contact" className={`section ${styles.contactSection}`} aria-label="Contact Section">
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.sectionPill}>
            <Sparkles size={14} />
            <span>Direct Channels</span>
          </div>
          <h2 className={styles.title}>
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className={styles.subtitle}>
            Open to 2027 software engineering opportunities in backend infrastructure, distributed systems, and applied AI.
          </p>
        </div>

        {/* 2-Column Responsive Card Grid */}
        <div className={styles.grid}>
          {/* Left Column: Direct Info & Socials */}
          <motion.div 
            className={styles.infoCol}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={styles.infoHeading}>Let&apos;s Build Something Resilient</h3>
            <p className={styles.infoText}>
              Whether you are looking for an engineer for high-concurrency systems, queue architectures, or practical AI tooling, I&apos;d love to connect.
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <div className={styles.iconBox}>
                  <Mail size={18} />
                </div>
                <div className={styles.itemTextCol}>
                  <span className={styles.itemLabel}>Email Directly</span>
                  <a href="mailto:nitbit710@gmail.com" className={styles.itemVal}>
                    nitbit710@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconBox}>
                  <MapPin size={18} />
                </div>
                <div className={styles.itemTextCol}>
                  <span className={styles.itemLabel}>Location</span>
                  <span className={styles.itemVal}>NIT Calicut, Kerala, India</span>
                </div>
              </div>
            </div>

            <div className={styles.socialStrip}>
              <span className={styles.socialLabel}>Professional Profiles:</span>
              <div className={styles.socialBtnGroup}>
                <a href="https://github.com/nitin-code6" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className={styles.socialBtn}>
                  <FaGithub size={18} />
                </a>
                <a href="https://www.linkedin.com/in/nitbit07/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className={styles.socialBtn}>
                  <FaLinkedin size={18} />
                </a>
                <a href="https://x.com/Nitin_5432" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className={styles.socialBtn}>
                  <FaTwitter size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Beautifully Styled Contact Form */}
          <motion.div 
            className={styles.formCol}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>Your Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="2027 Engineering Opportunities"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your team or project..."
                  className={styles.textarea}
                />
              </div>

              {status === 'success' && (
                <div className={styles.successMessage}>
                  <CheckCircle2 size={18} />
                  <span>Message sent successfully! I&apos;ll get back to you promptly.</span>
                </div>
              )}

              {status === 'error' && (
                <div className={styles.errorMessage}>
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className={styles.submitRow}>
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`btn btn-primary ${styles.submitBtn}`}
                >
                  {status === 'loading' ? 'Sending Message...' : (
                    <>
                      <Send size={15} style={{ marginRight: '0.45rem' }} /> Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
