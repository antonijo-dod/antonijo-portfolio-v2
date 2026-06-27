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
    <section className="flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[clamp(24px,5vw,var(--fz-heading))]">
        Other Noteworthy Projects
      </motion.h2>

      <Link
        href="/archive"
        className="inline-link archive-link font-mono text-fz-sm">
        view the archive
      </Link>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[15px] relative mt-[50px] w-full">
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
              className="group cursor-default [transition:var(--transition)]">
              <div className="flex justify-between flex-col items-start relative h-full p-8 rounded bg-light-navy [transition:var(--transition)] shadow-[0_10px_30px_-15px_var(--navy-shadow)] group-hover:-translate-y-[5px] group-focus:-translate-y-[5px]">
                <header>
                  <div className="flex justify-between items-center mb-[35px]">
                    <div className="text-green">
                      <span className="block w-10 h-10">
                        <Icon name="Folder" />
                      </span>
                    </div>
                    <div className="flex items-center -mr-[10px] text-light-slate">
                      {github && (
                        <a
                          href={github}
                          aria-label="GitHub Link"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center p-[5px_7px] hover:text-green">
                          <span className="block w-5 h-5">
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
                          className="flex items-center justify-center p-[5px_7px] hover:text-green">
                          <span className="block w-[22px] h-[22px]">
                            <Icon name="External" />
                          </span>
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="mb-[10px] text-lightest-slate text-fz-xxl">
                    {title}
                  </h3>

                  <div
                    className="text-light-slate text-[17px]"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                  />
                </header>

                <footer>
                  {tech && (
                    <ul className="flex items-end flex-wrap p-0 mt-5 list-none">
                      {tech.map((t, j) => (
                        <li
                          key={j}
                          className={[
                            'font-mono text-fz-xxs leading-[1.75]',
                            j < tech.length - 1 ? 'mr-[15px]' : '',
                          ].join(' ')}>
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
          className="btn block mt-[80px] mx-auto">
          Show {showMore ? 'Less' : 'More'}
        </button>
      )}
    </section>
  );
};

export default Projects;
