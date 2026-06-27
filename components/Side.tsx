'use client';

import { motion } from 'framer-motion';

interface SideProps {
  children: React.ReactNode;
  orientation: 'left' | 'right';
}

const Side = ({ children, orientation }: SideProps) => (
  <div
    className={[
      'w-[40px] fixed bottom-0 z-[10] text-light-slate hidden lg:block',
      orientation === 'left' ? 'left-[40px]' : 'right-[40px]',
    ].join(' ')}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 1.2 }}>
      {children}
    </motion.div>
  </div>
);

export default Side;
