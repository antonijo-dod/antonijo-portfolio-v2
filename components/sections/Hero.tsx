'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { email } from '@/lib/config';
import { navDelay } from '@/lib/utils';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const items = [
    <h1
      key="greeting"
      style={{
        margin: '0 0 30px 4px',
        color: 'var(--green)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(var(--fz-sm), 5vw, var(--fz-md))',
        fontWeight: 400,
      }}>
      Hi, my name is
    </h1>,

    <h2 key="name" className="big-heading" style={{ color: 'var(--lightest-slate)' }}>
      Antonijo Đođ.
    </h2>,

    <h3 key="tagline" className="big-heading" style={{ color: 'var(--slate)', marginTop: '10px', lineHeight: 0.9 }}>
      I build things for the web.
    </h3>,

    <p key="desc" style={{ margin: '20px 0 0', maxWidth: '500px' }}>
      I&apos;m a frontend web developer, specializing in building exceptional websites, applications,
      and everything in between.
    </p>,

    <a
      key="cta"
      href={`mailto:${email}`}
      style={{
        marginTop: '50px',
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
        display: 'inline-block',
      }}
      className="hover:bg-[var(--green-tint)]">
      Get In Touch
    </a>,
  ];

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
      <AnimatePresence>
        {isMounted &&
          items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: (i + 1) * 0.1,
                ease: [0.645, 0.045, 0.355, 1],
              }}>
              {item}
            </motion.div>
          ))}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
