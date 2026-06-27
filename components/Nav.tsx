'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { navLinks } from '@/lib/config';
import useScrollDirection from '@/hooks/useScrollDirection';
import IconLogo from './icons/IconLogo';
import Menu from './Menu';

const Nav = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const scrollDirection = useScrollDirection({ initialDirection: 'down', thresholdPixels: 0 });

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 100);

    const handleScroll = () => setScrolledToTop(window.pageYOffset < 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isScrolledUp = scrollDirection === 'up' && !scrolledToTop;
  const isScrolledDown = scrollDirection === 'down' && !scrolledToTop;

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 11,
        padding: '0 50px',
        width: '100%',
        height: isScrolledDown || isScrolledUp ? 'var(--nav-scroll-height)' : 'var(--nav-height)',
        backgroundColor: isScrolledUp
          ? 'rgba(10, 25, 47, 0.85)'
          : 'var(--navy)',
        backdropFilter: 'blur(10px)',
        filter: 'none',
        pointerEvents: 'auto',
        userSelect: 'auto',
        boxShadow: isScrolledUp || isScrolledDown ? '0 10px 30px -10px var(--navy-shadow)' : 'none',
        transform: isScrolledDown
          ? 'translateY(calc(var(--nav-scroll-height) * -1))'
          : 'translateY(0px)',
        transition: 'var(--transition)',
      }}
      className="md:px-10 sm:px-[25px]">
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          color: 'var(--lightest-slate)',
          fontFamily: 'var(--font-mono)',
          counterReset: 'item 0',
          zIndex: 12,
        }}>
        {/* Logo */}
        {isMounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link
              href="/"
              aria-label="home"
              style={{ color: 'var(--green)', width: '42px', height: '42px', display: 'block' }}
              className="hover:[&_svg]:fill-[var(--green-tint)] focus:[&_svg]:fill-[var(--green-tint)] [&_svg]:transition-[var(--transition)] [&_svg]:fill-none">
              <IconLogo />
            </Link>
          </motion.div>
        )}

        {/* Desktop nav links */}
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className="hidden md:flex">
          <ol
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 0,
              margin: 0,
              listStyle: 'none',
              counterReset: 'item 0',
            }}>
            {isMounted &&
              navLinks.map(({ url, name }, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  style={{ margin: '0 5px', position: 'relative', counterIncrement: 'item 1', fontSize: 'var(--fz-xs)' }}
                  className="before:content-['0'_counter(item_decimal)_'.'] [&_a]:before:mr-[5px] [&_a]:before:text-[var(--green)] [&_a]:before:text-[var(--fz-xxs)]">
                  <Link
                    href={url}
                    style={{ padding: '10px', display: 'inline-block' }}
                    className="before:content-['0'_counter(item_decimal)_'.'] before:mr-[5px] before:text-[var(--green)] before:text-[var(--fz-xxs)]">
                    {name}
                  </Link>
                </motion.li>
              ))}
          </ol>

          {isMounted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
              style={{ marginLeft: '15px' }}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--green)',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--green)',
                  borderRadius: 'var(--border-radius)',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--fz-xs)',
                  lineHeight: 1,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
                className="hover:bg-[var(--green-tint)]">
                Resume
              </a>
            </motion.div>
          )}
        </div>

        {/* Mobile hamburger */}
        {isMounted && <Menu />}
      </nav>
    </header>
  );
};

export default Nav;
