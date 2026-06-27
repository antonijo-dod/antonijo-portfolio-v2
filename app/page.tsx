import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Jobs from '@/components/sections/Jobs';
import Featured from '@/components/sections/Featured';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import { getMarkdownFiles } from '@/lib/markdown';

export default function Home() {
  const jobs = getMarkdownFiles('jobs').sort((a, b) => {
    const dateA = new Date(String(a.date ?? 0)).getTime();
    const dateB = new Date(String(b.date ?? 0)).getTime();
    return dateB - dateA;
  });

  const featured = getMarkdownFiles('featured').sort((a, b) => {
    return Number(a.date ?? 99) - Number(b.date ?? 99);
  });

  const projects = getMarkdownFiles('projects')
    .filter(p => p.showInProjects !== false)
    .sort((a, b) => {
      const dateA = new Date(String(a.date ?? 0)).getTime();
      const dateB = new Date(String(b.date ?? 0)).getTime();
      return dateB - dateA;
    });

  return (
    <main>
      <Hero />
      <About />
      <Jobs jobs={jobs as Parameters<typeof Jobs>[0]['jobs']} />
      <Featured projects={featured as Parameters<typeof Featured>[0]['projects']} />
      <Projects projects={projects as Parameters<typeof Projects>[0]['projects']} />
      <Contact />
    </main>
  );
}
