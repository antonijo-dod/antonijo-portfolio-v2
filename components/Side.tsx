'use client';

import { motion } from 'framer-motion';

interface SideProps {
  children: React.ReactNode;
  orientation: 'left' | 'right';
}

const Side = ({ children, orientation }: SideProps) => (
  <div
    style={{
      width: '40px',
      position: 'fixed',
      bottom: 0,
      left: orientation === 'left' ? '40px' : 'auto',
      right: orientation === 'left' ? 'auto' : '40px',
      zIndex: 10,
      color: 'var(--light-slate)',
    }}
    className="hidden lg:block">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 1.2 }}>
      {children}
    </motion.div>
  </div>
);

export default Side;
