'use client';

import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down';

interface UseScrollDirectionOptions {
  initialDirection?: ScrollDirection;
  thresholdPixels?: number;
  off?: boolean;
}

const useScrollDirection = ({
  initialDirection = 'down',
  thresholdPixels = 0,
  off = false,
}: UseScrollDirectionOptions = {}): ScrollDirection => {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>(initialDirection);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < thresholdPixels) {
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    if (!off) {
      window.addEventListener('scroll', onScroll);
    } else {
      setScrollDir(initialDirection);
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [initialDirection, thresholdPixels, off]);

  return scrollDir;
};

export default useScrollDirection;
