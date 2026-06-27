import Link from 'next/link';
import type { Metadata } from 'next';
import { getMarkdownFiles } from '@/lib/markdown';
import Icon from '@/components/icons/Icon';

export const metadata: Metadata = {
  title: 'Archive | Antonijo Đođ',
};

export default function Archive() {
  const projects = getMarkdownFiles('projects');
  const featured = getMarkdownFiles('featured');

  const all = [...projects, ...featured].sort((a, b) => {
    const dateA = new Date(String(a.date ?? 0)).getTime();
    const dateB = new Date(String(b.date ?? 0)).getTime();
    return dateB - dateA;
  });

  return (
    <main className="fill-height pt-[200px] pb-[100px]">
      <div className="breadcrumb">
        <span className="arrow">&larr;</span>
        <Link href="/">Antonijo Đođ</Link>
      </div>

      <h1 className="mb-5 text-lightest-slate text-[clamp(40px,8vw,80px)]">
        All Projects
      </h1>

      <table className="w-full border-collapse mt-[40px]">
        <thead>
          <tr className="text-left text-green font-mono text-fz-xs">
            <th className="py-[10px] pr-5">Year</th>
            <th className="p-[10px]">Title</th>
            <th className="p-[10px] hidden md:table-cell">Built with</th>
            <th className="p-[10px] hidden sm:table-cell">Link</th>
          </tr>
        </thead>
        <tbody>
          {all.map((project, i) => {
            const parsedYear = project.date
              ? new Date(String(project.date)).getFullYear()
              : NaN;
            const year = parsedYear && parsedYear >= 2010 ? parsedYear : '—';
            const tech = project.tech as string[] | undefined;
            const external = project.external as string | undefined;
            const github = project.github as string | undefined;
            const link = external || github;

            return (
              <tr
                key={i}
                className="border-t border-lightest-navy text-light-slate text-fz-sm [transition:var(--transition)] hover:bg-light-navy hover:text-white">
                <td className="py-3 pr-5 font-mono text-fz-xs text-green">
                  {String(year)}
                </td>
                <td className="p-[10px] text-lightest-slate font-semibold">
                  {String(project.title ?? '')}
                </td>
                <td className="p-[10px] font-mono text-fz-xxs hidden md:table-cell">
                  {tech?.join(' · ')}
                </td>
                <td className="p-[10px] hidden sm:table-cell">
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="External Link"
                      className="flex items-center hover:text-green">
                      <span className="block w-5 h-5">
                        <Icon name={external ? 'External' : 'GitHub'} />
                      </span>
                    </a>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
