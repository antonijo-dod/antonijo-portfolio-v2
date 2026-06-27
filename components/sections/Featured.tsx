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
            style={{
              display: 'grid',
              gridGap: '10px',
              gridTemplateColumns: 'repeat(12, 1fr)',
              alignItems: 'center',
              marginBottom: i < projects.length - 1 ? '100px' : 0,
            }}>
            {/* Content */}
            <div
              style={{
                position: 'relative',
                gridRow: '1 / -1',
                gridColumn: isOdd ? '7 / -1' : '1 / 7',
                zIndex: 2,
                textAlign: isOdd ? 'right' : 'left',
              }}
              className="col-span-full md:col-auto p-[40px_40px_30px] md:p-0">
              <p
                style={{
                  margin: '10px 0',
                  color: 'var(--green)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--fz-xs)',
                  fontWeight: 400,
                }}>
                Featured Project
              </p>

              <h3
                style={{
                  color: 'var(--lightest-slate)',
                  fontSize: 'clamp(24px, 5vw, 28px)',
                  margin: '0 0 20px',
                }}>
                {title}
              </h3>

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '25px',
                  borderRadius: 'var(--border-radius)',
                  backgroundColor: 'var(--light-navy)',
                  color: 'var(--light-slate)',
                  fontSize: 'var(--fz-lg)',
                  boxShadow: '0 10px 30px -15px var(--navy-shadow)',
                }}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {tech && (
                <ul
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    position: 'relative',
                    zIndex: 2,
                    margin: '25px 0 10px',
                    padding: 0,
                    listStyle: 'none',
                    justifyContent: isOdd ? 'flex-end' : 'flex-start',
                  }}>
                  {tech.map((t, j) => (
                    <li
                      key={j}
                      style={{
                        margin: isOdd ? '0 0 5px 20px' : '0 20px 5px 0',
                        color: 'var(--light-slate)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--fz-xs)',
                        whiteSpace: 'nowrap',
                      }}>
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  marginTop: '10px',
                  marginLeft: isOdd ? 0 : '-10px',
                  marginRight: isOdd ? '-10px' : 0,
                  color: 'var(--lightest-slate)',
                  justifyContent: isOdd ? 'flex-end' : 'flex-start',
                }}>
                {github && (
                  <a
                    href={github}
                    aria-label="GitHub Link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}
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
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}
                    className="hover:text-[var(--green)]">
                    <span style={{ display: 'block', width: '22px', height: '22px' }}>
                      <Icon name="External" />
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Image */}
            <div
              style={{
                gridRow: '1 / -1',
                gridColumn: isOdd ? '1 / 8' : '6 / -1',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 10px 30px -15px var(--navy-shadow)',
              }}
              className="col-span-full md:col-auto opacity-25 md:opacity-100">
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  width: '100%',
                  backgroundColor: 'var(--green)',
                  borderRadius: 'var(--border-radius)',
                  position: 'relative',
                }}
                className="group">
                <div
                  style={{
                    content: '',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    zIndex: 3,
                    transition: 'var(--transition)',
                    backgroundColor: 'var(--navy)',
                    mixBlendMode: 'screen',
                    borderRadius: 'var(--border-radius)',
                  }}
                  className="group-hover:bg-transparent"
                />
                {coverFilename && (
                  <Image
                    src={imageSrc}
                    alt={title ?? ''}
                    width={700}
                    height={438}
                    style={{
                      borderRadius: 'var(--border-radius)',
                      mixBlendMode: 'multiply',
                      filter: 'grayscale(100%) contrast(1) brightness(90%)',
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                    }}
                    className="group-hover:filter-none group-hover:mix-blend-normal"
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
