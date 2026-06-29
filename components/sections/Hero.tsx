"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { email } from "@/lib/config";
import { navDelay } from "@/lib/utils";

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const items = [
    <h1
      key="greeting"
      className="mb-[30px] ml-[4px] text-green font-mono text-[clamp(var(--fz-sm),5vw,var(--fz-md))] font-normal"
    >
      Hi, my name is
    </h1>,

    <h2 key="name" className="big-heading text-lightest-slate">
      Antonijo Dod.
    </h2>,

    <h3
      key="tagline"
      className="big-heading text-slate mt-[10px] leading-[0.9]"
    >
      I build things for the web.
    </h3>,

    <p key="desc" className="mt-5 max-w-[500px]">
      I&apos;m a frontend web developer, specializing in building exceptional
      websites, applications, and everything in between.
    </p>,

    <a key="cta" href={`mailto:${email}`} className="btn mt-[50px]">
      Get In Touch
    </a>,
  ];

  return (
    <section
      className="flex flex-col items-start justify-center min-h-screen"
      style={{ marginTop: "calc(-1 * var(--main-padding-top))" }}
    >
      <AnimatePresence>
        {isMounted &&
          items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: (i + 1) * 0.1,
                ease: [0.645, 0.045, 0.355, 1],
              }}
            >
              {item}
            </motion.div>
          ))}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
