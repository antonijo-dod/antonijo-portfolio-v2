"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { navLinks } from "@/lib/config";
import useScrollDirection from "@/hooks/useScrollDirection";
import IconLogo from "./icons/IconLogo";
import Menu from "./Menu";

const Nav = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const scrollDirection = useScrollDirection({
    initialDirection: "down",
    thresholdPixels: 0,
  });

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 100);
    const handleScroll = () => setScrolledToTop(window.pageYOffset < 50);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isScrolledUp = scrollDirection === "up" && !scrolledToTop;
  const isScrolledDown = scrollDirection === "down" && !scrolledToTop;

  return (
    <header
      className={[
        "flex justify-between items-center fixed top-0 z-[11] w-full",
        "px-[50px] md:px-10 sm:px-[25px]",
        "backdrop-blur-[10px] filter-none pointer-events-auto select-auto",
        "[transition:var(--transition)]",
        isScrolledDown || isScrolledUp
          ? "h-[var(--nav-scroll-height)]"
          : "h-[var(--nav-height)]",
        isScrolledUp ? "bg-[rgba(10,25,47,0.85)]" : "bg-navy",
        isScrolledUp || isScrolledDown
          ? "shadow-[0_10px_30px_-15px_var(--navy-shadow)]"
          : "shadow-none",
      ].join(" ")}
      style={{
        transform: isScrolledDown
          ? "translateY(calc(var(--nav-scroll-height) * -1))"
          : "translateY(0px)",
      }}
    >
      <nav
        className="flex justify-between items-center relative w-full text-lightest-slate font-mono z-[12]"
        style={{ counterReset: "item 0" }}
      >
        {isMounted && (
          <>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              <Link
                href="/"
                aria-label="home"
                className="text-green w-10.5 h-10.5 block [transition:var(--transition)] hover:text-green-tint focus:text-green-tint"
              >
                <IconLogo />
              </Link>
            </motion.div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center">
              <ol
                className="flex justify-between items-center p-0 m-0 list-none"
                style={{ counterReset: "item 0" }}
              >
                {navLinks.map(({ url, name }, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="mx-1.25 relative text-fz-xs"
                    style={{ counterIncrement: "item 1" }}
                  >
                    <Link
                      href={url}
                      className="px-2.5 py-2.5 inline-block before:content-['0'_counter(item)_'.'] before:mr-1.25 before:text-green before:text-fz-xxs"
                    >
                      {name}
                    </Link>
                  </motion.li>
                ))}
              </ol>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                className="ml-3.75"
              >
                <a
                  href="/Antonijo_Dod_CV_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green bg-transparent border border-green rounded px-4 py-3 font-mono text-fz-xs leading-none no-underline cursor-pointer [transition:var(--transition)] hover:bg-green-tint"
                >
                  Resume
                </a>
              </motion.div>
            </div>

            {/* Mobile hamburger */}
            <Menu />
          </>
        )}
      </nav>
    </header>
  );
};

export default Nav;
