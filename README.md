# Antonijo Dod — Portfolio v2

Personal portfolio website built with Next.js 16, Tailwind CSS 4, and Framer Motion. A ground-up rebuild of the original Gatsby.js portfolio, keeping the design identical while migrating to a modern stack.

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Styling** — Tailwind CSS 4
- **Animations** — Framer Motion
- **Content** — Markdown files via gray-matter + remark
- **Language** — TypeScript
- **Fonts** — Calibre (sans) + SF Mono (mono), self-hosted

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx          # Root layout (Nav, Social, Email, Footer)
  page.tsx            # Homepage (Hero, About, Jobs, Featured, Projects, Contact)
  globals.css         # Global styles, CSS custom properties, Tailwind theme
  archive/            # All projects table
  pensieve/           # Blog listing, posts, tag filtering
  not-found.tsx       # 404 page

components/
  sections/           # Homepage sections (Hero, About, Jobs, Featured, Projects, Contact)
  icons/              # SVG icon components
  Nav.tsx             # Fixed header with scroll-hide behaviour
  Menu.tsx            # Mobile slide-in navigation
  Social.tsx          # Left sidebar — social icon links
  Email.tsx           # Right sidebar — vertical email address
  Footer.tsx          # Minimal footer

content/
  jobs/               # Work experience (Markdown, one folder per job)
  featured/           # Featured projects (Markdown)
  projects/           # Other projects (Markdown)
  posts/              # Blog posts (Markdown)

hooks/
  useScrollDirection  # Returns 'up' | 'down', drives nav hide/show
  useOnClickOutside   # Closes mobile menu on outside click
  usePrefersReducedMotion

lib/
  markdown.ts         # getMarkdownFiles(), getMarkdownBySlug(), getAllSlugs()
  config.ts           # Email, social links, nav links
  utils.ts            # Shared constants and helpers

public/
  fonts/              # Calibre + SF Mono woff/woff2
  images/             # Profile photo, OG image, project screenshots
```

## Adding Content

**New job:** create `content/jobs/<company>/index.md` with frontmatter:
```md
---
title: Job Title
company: Company Name
range: Month Year – Month Year
url: https://company.com
---
- Bullet point describing what you did
```

**New project:** create `content/projects/<slug>.md` with frontmatter:
```md
---
title: Project Name
tech: [React, TypeScript]
github: https://github.com/...
external: https://...
date: '2025-01-01'
---
Short description.
```

**New post:** create `content/posts/<slug>/index.md` with frontmatter:
```md
---
title: Post Title
description: Short summary
date: '2025-01-01'
draft: false
tags: [tag1, tag2]
---
Post content here.
```

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Design Notes

- Color palette and spacing match the original Gatsby v1 portfolio exactly
- CSS custom properties live in `app/globals.css` under `:root`; Tailwind tokens are bridged via `@theme inline`
- Tailwind 4 arbitrary `text-[var(--fz-*)]` resolves to `color`, not `font-size` — use `text-fz-*` tokens instead (defined via `--text-fz-*` in `@theme inline`)
- Framer Motion `whileInView` handles scroll-reveal; `isMounted` guard prevents SSR hydration mismatches
