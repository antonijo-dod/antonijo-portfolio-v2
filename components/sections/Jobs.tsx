'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { KEY_CODES } from '@/lib/utils';

interface Job {
  slug: string;
  title?: string;
  company?: string;
  range?: string;
  url?: string;
  contentHtml: string;
}

interface JobsProps {
  jobs: Job[];
}

const Jobs = ({ jobs }: JobsProps) => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (tabFocus === null) return;
    const count = tabs.current.length;
    const idx = ((tabFocus % count) + count) % count;
    tabs.current[idx]?.focus();
    setTabFocus(idx);
  }, [tabFocus]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === KEY_CODES.ARROW_UP) {
      e.preventDefault();
      setTabFocus(prev => (prev ?? activeTabId) - 1);
    } else if (e.key === KEY_CODES.ARROW_DOWN) {
      e.preventDefault();
      setTabFocus(prev => (prev ?? activeTabId) + 1);
    }
  };

  return (
    <motion.section
      id="jobs"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
      style={{ maxWidth: '700px' }}>
      <h2 className="numbered-heading">Where I&apos;ve Worked</h2>

      <div style={{ display: 'flex' }} className="flex-col sm:flex-row">
        {/* Tab list */}
        <ul
          role="tablist"
          aria-label="Job tabs"
          onKeyDown={onKeyDown}
          style={{
            position: 'relative',
            zIndex: 3,
            width: 'max-content',
            padding: 0,
            margin: 0,
            listStyle: 'none',
          }}
          className="flex overflow-x-auto sm:block sm:w-max w-[calc(100%+100px)] -ml-[50px] mb-[30px] sm:mb-0 sm:ml-0">
          {jobs.map(({ company }, i) => (
            <li key={i} className="first:ml-[50px] last:pr-[50px] sm:first:ml-0 sm:last:pr-0">
              <button
                ref={el => { tabs.current[i] = el; }}
                id={`tab-${i}`}
                role="tab"
                aria-selected={activeTabId === i}
                aria-controls={`panel-${i}`}
                tabIndex={activeTabId === i ? 0 : -1}
                onClick={() => setActiveTabId(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  height: 'var(--tab-height)',
                  padding: '0 20px 2px',
                  borderLeft: '2px solid var(--lightest-navy)',
                  backgroundColor: 'transparent',
                  color: activeTabId === i ? 'var(--green)' : 'var(--slate)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--fz-xs)',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
                className="hover:bg-[var(--light-navy)] focus:bg-[var(--light-navy)] sm:border-l-2 border-l-0 border-b-2 sm:border-b-0 border-b-[var(--lightest-navy)] min-w-[120px] sm:min-w-0">
                {company}
              </button>
            </li>
          ))}

          {/* Active indicator */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 10,
              width: '2px',
              height: 'var(--tab-height)',
              borderRadius: 'var(--border-radius)',
              background: 'var(--green)',
              transform: `translateY(calc(${activeTabId} * var(--tab-height)))`,
              transition: 'transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s',
            }}
            className="hidden sm:block"
          />
        </ul>

        {/* Tab panels */}
        {jobs.map(({ title, url, company, range, contentHtml }, i) => (
          <div
            key={i}
            id={`panel-${i}`}
            role="tabpanel"
            tabIndex={activeTabId === i ? 0 : -1}
            aria-labelledby={`tab-${i}`}
            aria-hidden={activeTabId !== i}
            hidden={activeTabId !== i}
            style={{
              width: '100%',
              paddingTop: '10px',
              paddingLeft: '30px',
            }}
            className="sm:pl-[30px] pl-0">
            <h3
              style={{
                marginBottom: '5px',
                fontSize: 'var(--fz-xxl)',
                fontWeight: 500,
                color: 'var(--lightest-slate)',
              }}>
              <span>{title}</span>
              <span style={{ color: 'var(--green)' }}>
                &nbsp;@&nbsp;
                <a href={url} className="inline-link">
                  {company}
                </a>
              </span>
            </h3>

            <p
              style={{
                marginBottom: '30px',
                color: 'var(--light-slate)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fz-xs)',
              }}>
              {range}
            </p>

            <div
              className="fancy-list"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Jobs;
