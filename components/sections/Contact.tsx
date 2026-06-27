'use client';

import { motion } from 'framer-motion';
import { email } from '@/lib/config';

const Contact = () => (
  <motion.section
    id="contact"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
    style={{
      maxWidth: '600px',
      margin: '0 auto 100px',
      textAlign: 'center',
    }}>
    <h2
      className="numbered-heading overline"
      style={{ display: 'block', marginBottom: '20px' }}>
      What&apos;s Next?
    </h2>

    <h2
      style={{ fontSize: 'clamp(40px, 5vw, 60px)', margin: 0 }}>
      Get In Touch
    </h2>

    <p style={{ marginTop: '20px' }}>I&apos;m currently looking for new opportunities.</p>

    <a
      href={`mailto:${email}`}
      style={{
        marginTop: '50px',
        display: 'inline-block',
        color: 'var(--green)',
        backgroundColor: 'transparent',
        border: '1px solid var(--green)',
        borderRadius: 'var(--border-radius)',
        padding: '1.25rem 1.75rem',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fz-sm)',
        lineHeight: 1,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'var(--transition)',
      }}
      className="hover:bg-[var(--green-tint)]">
      Say Hello
    </a>
  </motion.section>
);

export default Contact;
