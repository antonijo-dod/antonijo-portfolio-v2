'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const skills = ['JavaScript (ES6+)', 'HTML & (S)CSS', 'React', 'Node.js', 'WordPress'];

const About = () => (
  <motion.section
    id="about"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
    style={{ maxWidth: '900px' }}>
    <h2 className="numbered-heading">About Me</h2>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '3fr 2fr',
        gap: '50px',
      }}
      className="block md:grid">
      {/* Text */}
      <div>
        <p>Hello! I&apos;m Antonijo, a self-taught full stack web developer based in Croatia.</p>
        <p>
          I enjoy creating things that live on the internet, whether that be websites, applications,
          or anything in between. My goal is to always build products that provide pixel-perfect,
          performant experiences.
        </p>
        <p>Passionate about connecting things.</p>
        <p>Here are a few technologies I&apos;ve been working with recently:</p>

        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(140px, 200px))',
            padding: 0,
            margin: '20px 0 0 0',
            overflow: 'hidden',
            listStyle: 'none',
          }}>
          {skills.map((skill, i) => (
            <li
              key={i}
              style={{
                position: 'relative',
                marginBottom: '10px',
                paddingLeft: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fz-xs)',
              }}
              className="before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)] before:text-[var(--fz-sm)] before:leading-3">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Profile photo */}
      <div
        style={{ position: 'relative', maxWidth: '300px' }}
        className="mt-12 mx-auto w-[70%] md:mt-0 md:w-full md:max-w-[300px]">
        <div
          style={{ position: 'relative', borderRadius: 'var(--border-radius)', backgroundColor: 'var(--green)', display: 'block' }}
          className="group after:content-[''] after:block after:absolute after:w-full after:h-full after:rounded after:border-2 after:border-[var(--green)] after:top-5 after:left-5 after:-z-10 after:transition-[var(--transition)] hover:after:top-[15px] hover:after:left-[15px]">
          <Image
            src="/images/me.png"
            alt="Antonijo Đođ"
            width={500}
            height={500}
            style={{
              position: 'relative',
              borderRadius: 'var(--border-radius)',
              mixBlendMode: 'multiply',
              filter: 'grayscale(100%) contrast(1)',
              transition: 'var(--transition)',
              display: 'block',
              width: '100%',
              height: 'auto',
            }}
            className="group-hover:filter-none group-hover:mix-blend-normal"
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: 'var(--border-radius)',
              backgroundColor: 'var(--navy)',
              mixBlendMode: 'screen',
              transition: 'var(--transition)',
            }}
            className="group-hover:bg-transparent"
          />
        </div>
      </div>
    </div>
  </motion.section>
);

export default About;
