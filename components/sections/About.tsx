"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const skills = [
  "JavaScript (ES6+)",
  "HTML & (S)CSS",
  "React",
  "Node.js",
  "WordPress",
];

const About = () => (
  <motion.section
    id="about"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
    className="max-w-[900px]"
  >
    <h2 className="numbered-heading">About Me</h2>

    <div className="block md:grid md:grid-cols-[3fr_2fr] gap-[50px]">
      {/* Text */}
      <div>
        <p>
          Hello! I&apos;m Antonijo, a self-taught full stack web developer based
          in Ireland.
        </p>
        <p>
          I enjoy creating things that live on the internet, whether that be
          websites, applications, or anything in between. My goal is to always
          build products that provide pixel-perfect, performant experiences.
        </p>
        <p>Passionate about connecting things.</p>
        <p>Here are a few technologies I&apos;ve been working with recently:</p>

        <ul className="grid grid-cols-[repeat(2,minmax(140px,200px))] p-0 mt-5 mb-0 overflow-hidden list-none">
          {skills.map((skill, i) => (
            <li
              key={i}
              className="relative mb-[10px] pl-5 font-mono text-fz-xs before:content-['▹'] before:absolute before:left-0 before:text-green before:text-fz-sm before:leading-3"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Profile photo */}
      <div className="mt-12 mx-auto w-[70%] md:mt-0 md:w-full md:max-w-[300px] relative max-w-[300px]">
        <div className="group relative rounded bg-green block after:content-[''] after:block after:absolute after:w-full after:h-full after:rounded after:border-2 after:border-green after:top-5 after:left-5 after:-z-10 after:[transition:var(--transition)] hover:after:top-[15px] hover:after:left-[15px]">
          <Image
            src="/images/me.png"
            alt="Antonijo Dod"
            width={500}
            height={500}
            className="relative rounded w-full h-auto block [transition:var(--transition)] [mix-blend-mode:multiply] [filter:grayscale(100%)_contrast(1)] group-hover:filter-none group-hover:[mix-blend-mode:normal]"
          />
          <div className="absolute inset-0 rounded bg-navy [mix-blend-mode:screen] [transition:var(--transition)] group-hover:bg-transparent" />
        </div>
      </div>
    </div>
  </motion.section>
);

export default About;
