'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={`section ${styles.contactSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="sectionTitle">Get In <span className="text-gradient">Touch</span></h2>
          <p>I'm currently available for full-time opportunities and interesting projects.</p>
        </div>

        <motion.div 
          className={styles.formContainer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input type="text" id="name" name="name" required className={styles.input} />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input type="email" id="email" name="email" required className={styles.input} />
              </div>
            </div>
            
            <div className={styles.inputWrapper}>
              <label htmlFor="subject" className={styles.label}>Subject</label>
              <input type="text" id="subject" name="subject" required className={styles.input} />
            </div>
            
            <div className={styles.inputWrapper}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea id="message" name="message" rows={5} required className={styles.textarea}></textarea>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary ${styles.submitBtn}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'} 
              {!status && <Send size={18} style={{ marginLeft: '0.5rem' }} />}
            </button>

            {status === 'success' && (
              <div className={styles.successMessage}>
                <CheckCircle size={20} />
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {status === 'error' && (
              <div className={styles.errorMessage}>
                <AlertCircle size={20} />
                Failed to send message. Please try again or email me directly.
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
