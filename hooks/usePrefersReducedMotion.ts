'use client';

import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';

const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    setPrefersReducedMotion(!mediaQueryList.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(!e.matches);
    };

    mediaQueryList.addEventListener('change', onChange);
    return () => mediaQueryList.removeEventListener('change', onChange);
  }, []);

  return prefersReducedMotion;
};

export default usePrefersReducedMotion;
