'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/icons/Icon';

interface Project {
  slug: string;
  title?: string;
  tech?: string[];
  github?: string;
  external?: string;
  contentHtml: string;
  showInProjects?: boolean;
}

interface ProjectsProps {
  projects: Project[];
}

const GRID_LIMIT = 6;

const Projects = ({ projects }: ProjectsProps) => {
  const [showMore, setShowMore] = useState(false);

  const visibleProjects = showMore ? projects : projects.slice(0, GRID_LIMIT);

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'clamp(24px, 5vw, var(--fz-heading))' }}>
        Other Noteworthy Projects
      </motion.h2>

      <Link
        href="/archive"
        className="inline-link archive-link"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fz-sm)',
        }}>
        view the archive
      </Link>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '15px',
          position: 'relative',
          marginTop: '50px',
          width: '100%',
        }}>
        <AnimatePresence>
          {visibleProjects.map(({ title, tech, github, external, contentHtml }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.3,
                delay: i >= GRID_LIMIT ? (i - GRID_LIMIT) * 0.1 : 0,
              }}
              tabIndex={0}
              style={{ cursor: 'default', transition: 'var(--transition)' }}
              className="group">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  position: 'relative',
                  height: '100%',
                  padding: '2rem 1.75rem',
                  borderRadius: 'var(--border-radius)',
                  backgroundColor: 'var(--light-navy)',
                  transition: 'var(--transition)',
                  boxShadow: '0 10px 30px -15px var(--navy-shadow)',
                }}
                className="group-hover:-translate-y-[5px] group-focus:-translate-y-[5px]">
                <header>
                  {/* Top row: folder icon + links */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '35px',
                    }}>
                    <div style={{ color: 'var(--green)' }}>
                      <span style={{ display: 'block', width: '40px', height: '40px' }}>
                        <Icon name="Folder" />
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '-10px',
                        color: 'var(--light-slate)',
                      }}>
                      {github && (
                        <a
                          href={github}
                          aria-label="GitHub Link"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 7px' }}
                          className="hover:text-[var(--green)]">
                          <span style={{ display: 'block', width: '20px', height: '20px' }}>
                            <Icon name="GitHub" />
                          </span>
                        </a>
                      )}
                      {external && (
                        <a
                          href={external}
                          aria-label="External Link"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 7px' }}
                          className="hover:text-[var(--green)]">
                          <span style={{ display: 'block', width: '22px', height: '22px' }}>
                            <Icon name="External" />
                          </span>
                        </a>
                      )}
                    </div>
                  </div>

                  <h3
                    style={{
                      margin: '0 0 10px',
                      color: 'var(--lightest-slate)',
                      fontSize: 'var(--fz-xxl)',
                    }}>
                    {title}
                  </h3>

                  <div
                    style={{ color: 'var(--light-slate)', fontSize: '17px' }}
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                </header>

                <footer>
                  {tech && (
                    <ul
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexWrap: 'wrap',
                        padding: 0,
                        margin: '20px 0 0',
                        listStyle: 'none',
                      }}>
                      {tech.map((t, j) => (
                        <li
                          key={j}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--fz-xxs)',
                            lineHeight: 1.75,
                            marginRight: j < tech.length - 1 ? '15px' : 0,
                          }}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </footer>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {projects.length > GRID_LIMIT && (
        <button
          onClick={() => setShowMore(!showMore)}
          style={{
            color: 'var(--green)',
            backgroundColor: 'transparent',
            border: '1px solid var(--green)',
            borderRadius: 'var(--border-radius)',
            padding: '1.25rem 1.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fz-sm)',
            lineHeight: 1,
            cursor: 'pointer',
            margin: '80px auto 0',
            transition: 'var(--transition)',
            display: 'block',
          }}
          className="hover:bg-[var(--green-tint)]">
          Show {showMore ? 'Less' : 'More'}
        </button>
      )}
    </section>
  );
};

export default Projects;
