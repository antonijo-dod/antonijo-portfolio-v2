'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Icon from '@/components/icons/Icon';

interface FeaturedProject {
  slug: string;
  title?: string;
  cover?: string;
  tech?: string[];
  github?: string;
  external?: string;
  contentHtml: string;
}

interface FeaturedProps {
  projects: FeaturedProject[];
}

const Featured = ({ projects }: FeaturedProps) => (
  <section id="projects">
    <motion.h2
      className="numbered-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}>
      Some Things I&apos;ve Built
    </motion.h2>

    <div>
      {projects.map(({ slug, title, cover, tech, github, external, contentHtml }, i) => {
        const isOdd = i % 2 !== 0;
        const coverFilename = cover?.replace('./', '');
        const imageSrc = `/images/projects/${slug}/${coverFilename}`;
        const projectUrl = external || github || '#';

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="grid gap-[10px] grid-cols-12 items-center"
            style={{ marginBottom: i < projects.length - 1 ? '100px' : 0 }}>

            {/* Content */}
            <div
              className={[
                'relative z-[2] col-span-full md:col-auto p-[40px_40px_30px] md:p-0',
                isOdd ? 'md:col-start-7 md:col-end-[-1] text-right' : 'md:col-start-1 md:col-end-7 text-left',
              ].join(' ')}
              style={{ gridRow: '1 / -1' }}>
              <p className="my-[10px] text-green font-mono text-fz-xs font-normal">
                Featured Project
              </p>

              <h3 className="text-lightest-slate text-[clamp(24px,5vw,28px)] mb-5">
                {title}
              </h3>

              <div
                className="relative z-[2] p-[25px] rounded bg-light-navy text-light-slate text-fz-lg shadow-[0_10px_30px_-15px_var(--navy-shadow)]"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {tech && (
                <ul
                  className={[
                    'flex flex-wrap relative z-[2] mt-[25px] mb-[10px] p-0 list-none',
                    isOdd ? 'justify-end' : 'justify-start',
                  ].join(' ')}>
                  {tech.map((t, j) => (
                    <li
                      key={j}
                      className={[
                        'text-light-slate font-mono text-fz-xs whitespace-nowrap mb-[5px]',
                        isOdd ? 'ml-5' : 'mr-5',
                      ].join(' ')}>
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              <div
                className={[
                  'flex items-center relative mt-[10px] text-lightest-slate',
                  isOdd ? 'justify-end -mr-[10px]' : 'justify-start -ml-[10px]',
                ].join(' ')}>
                {github && (
                  <a
                    href={github}
                    aria-label="GitHub Link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-[10px] hover:text-green">
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
                    className="flex items-center justify-center p-[10px] hover:text-green">
                    <span className="block w-[22px] h-[22px]">
                      <Icon name="External" />
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Image */}
            <div
              className="col-span-full md:col-auto relative z-[1] shadow-[0_10px_30px_-15px_var(--navy-shadow)] opacity-25 md:opacity-100"
              style={{
                gridRow: '1 / -1',
                gridColumn: isOdd ? '1 / 8' : '6 / -1',
              }}>
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full bg-green rounded relative">
                <div className="absolute inset-0 z-[3] rounded bg-navy [mix-blend-mode:screen] [transition:var(--transition)] group-hover:bg-transparent" />
                {coverFilename && (
                  <Image
                    src={imageSrc}
                    alt={title ?? ''}
                    width={700}
                    height={438}
                    className="rounded w-full h-auto block [mix-blend-mode:multiply] [filter:grayscale(100%)_contrast(1)_brightness(90%)] group-hover:filter-none group-hover:[mix-blend-mode:normal]"
                  />
                )}
              </a>
            </div>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default Featured;
