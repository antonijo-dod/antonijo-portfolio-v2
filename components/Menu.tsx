'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { navLinks } from '@/lib/config';
import { KEY_CODES } from '@/lib/utils';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  // Don't close when clicking inside the portaled sidebar
  useOnClickOutside(wrapperRef, (e) => {
    if (sidebarRef.current?.contains(e.target as Node)) return;
    setMenuOpen(false);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === KEY_CODES.ESCAPE) {
        setMenuOpen(false);
      }
    };
    const onResize = (e: UIEvent) => {
      if ((e.currentTarget as Window).innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const sidebar = (
    <aside
      ref={sidebarRef as React.RefObject<HTMLElement>}
      aria-hidden={!menuOpen}
      tabIndex={menuOpen ? 1 : -1}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        padding: '50px 10px',
        width: 'min(75vw, 400px)',
        height: '100vh',
        outline: 0,
        backgroundColor: 'var(--light-navy)',
        boxShadow: '-10px 0px 30px -15px var(--navy-shadow)',
        zIndex: 9999,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100vw)',
        visibility: menuOpen ? 'visible' : 'hidden',
        transition: 'var(--transition)',
      }}>
      <nav
        ref={navRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'column',
          color: 'var(--lightest-slate)',
          fontFamily: 'var(--font-mono)',
          textAlign: 'center',
        }}>
        <ol
          style={{
            padding: 0,
            margin: 0,
            listStyle: 'none',
            width: '100%',
            counterReset: 'item 0',
          }}>
          {navLinks.map(({ url, name }, i) => (
            <li
              key={i}
              style={{ position: 'relative', margin: '0 auto 20px', fontSize: 'clamp(var(--fz-sm), 4vw, var(--fz-lg))', counterIncrement: 'item 1' }}
              className="before:content-['0'_counter(item_decimal)_'.'] before:block before:mb-1.5 before:text-[var(--green)] before:text-[var(--fz-sm)]">
              <Link
                href={url}
                onClick={() => setMenuOpen(false)}
                style={{ width: '100%', padding: '3px 20px 20px', display: 'inline-block' }}>
                {name}
              </Link>
            </li>
          ))}
        </ol>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '18px 50px',
            marginTop: '10%',
            width: 'max-content',
            color: 'var(--green)',
            backgroundColor: 'transparent',
            border: '1px solid var(--green)',
            borderRadius: 'var(--border-radius)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fz-sm)',
            lineHeight: 1,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
          className="hover:bg-[var(--green-tint)]">
          Resume
        </a>
      </nav>
    </aside>
  );

  return (
    <div className="md:hidden">
      <div ref={wrapperRef}>
        {/* Hamburger button */}
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          aria-label="Menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            marginRight: '-15px',
            padding: '15px',
            border: 0,
            backgroundColor: 'transparent',
            color: 'inherit',
            cursor: 'pointer',
            transitionTimingFunction: 'linear',
            transitionDuration: '0.15s',
            transitionProperty: 'opacity, filter',
          }}>
          <div
            style={{
              display: 'inline-block',
              position: 'relative',
              width: 'var(--hamburger-width)',
              height: '24px',
            }}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                width: 'var(--hamburger-width)',
                height: '2px',
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'var(--green)',
                transitionDuration: '0.22s',
                transitionProperty: 'transform',
                transitionDelay: menuOpen ? '0.12s' : '0s',
                transform: menuOpen ? 'rotate(225deg)' : 'rotate(0deg)',
                transitionTimingFunction: menuOpen
                  ? 'cubic-bezier(0.215, 0.61, 0.355, 1)'
                  : 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
              }}
              className={[
                'before:content-[\'\'] before:block before:absolute before:right-0 before:h-0.5 before:rounded before:bg-[var(--green)] before:ease-in before:duration-[0.15s]',
                'after:content-[\'\'] after:block after:absolute after:right-0 after:h-0.5 after:rounded after:bg-[var(--green)] after:ease-in after:duration-[0.15s]',
                menuOpen
                  ? 'before:w-full before:top-0 before:opacity-0 before:[transition:var(--ham-before-active)] after:w-full after:bottom-0 after:rotate-[-90deg] after:[transition:var(--ham-after-active)]'
                  : 'before:w-[120%] before:top-[-10px] before:opacity-100 before:[transition:var(--ham-before)] after:w-[80%] after:bottom-[-10px] after:rotate-0 after:[transition:var(--ham-after)]',
              ].join(' ')}
            />
          </div>
        </button>
      </div>

      {/* Portaled sidebar — rendered in document.body to escape the Nav header's stacking context */}
      {mounted && createPortal(sidebar, document.body)}
    </div>
  );
};

export default Menu;
