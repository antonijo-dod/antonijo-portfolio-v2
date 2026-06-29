"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { KEY_CODES } from "@/lib/utils";

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
      setTabFocus((prev) => (prev ?? activeTabId) - 1);
    } else if (e.key === KEY_CODES.ARROW_DOWN) {
      e.preventDefault();
      setTabFocus((prev) => (prev ?? activeTabId) + 1);
    }
  };

  return (
    <motion.section
      id="jobs"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
      className="max-w-[700px]"
    >
      <h2 className="numbered-heading">Where I&apos;ve Worked</h2>

      <div className="flex flex-col sm:flex-row">
        {/* Tab list */}
        <ul
          role="tablist"
          aria-label="Job tabs"
          onKeyDown={onKeyDown}
          className="relative z-[3] w-max p-0 m-0 list-none flex overflow-x-auto sm:block w-[calc(100%+100px)] -ml-[50px] mb-[30px] sm:mb-0 sm:ml-0 sm:w-max"
        >
          {jobs.map(({ company }, i) => (
            <li
              key={i}
              className="first:ml-[50px] last:pr-[50px] sm:first:ml-0 sm:last:pr-0"
            >
              <button
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`tab-${i}`}
                role="tab"
                aria-selected={activeTabId === i}
                aria-controls={`panel-${i}`}
                tabIndex={activeTabId === i ? 0 : -1}
                onClick={() => setActiveTabId(i)}
                className={[
                  "flex items-center w-full h-[var(--tab-height)] px-5 pb-0.5",
                  "border-l-0 border-b-2 sm:border-l-2 sm:border-b-0 border-lightest-navy",
                  "bg-transparent font-mono text-fz-xs text-left whitespace-nowrap cursor-pointer",
                  "min-w-[120px] sm:min-w-0 [transition:var(--transition)]",
                  "hover:bg-light-navy focus:bg-light-navy",
                  activeTabId === i ? "text-green" : "text-slate",
                ].join(" ")}
              >
                {company}
              </button>
            </li>
          ))}

          {/* Active indicator */}
          <div
            aria-hidden
            className="hidden sm:block absolute top-0 left-0 z-[10] w-[2px] h-[var(--tab-height)] rounded bg-green"
            style={{
              transform: `translateY(calc(${activeTabId} * var(--tab-height)))`,
              transition:
                "transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s",
            }}
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
            className="w-full pt-[10px] pl-0 sm:pl-[30px]"
          >
            <h3 className="mb-[5px] text-fz-xxl font-medium text-lightest-slate">
              <span>{title}</span>
              <span className="text-green">
                &nbsp;@&nbsp;
                <a href={url} className="inline-link">
                  {company}
                </a>
              </span>
            </h3>

            <p className="mb-[30px] text-light-slate font-mono text-fz-xs">
              {range}
            </p>

            <div
              className="fancy-list mt-4"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Jobs;
